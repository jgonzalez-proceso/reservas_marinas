/**
 * Capas base y superposiciones náuticas.
 *
 * El mapa arranca sobre el satélite mundial de Esri, y la ortofoto oficial del
 * Govern (IDEIB) es una base **activable** desde el selector de capas. La
 * oficial enseña el fondo marino a través del agua —posidonia, roquedo—, que
 * en un mapa de reservas marinas es información útil y el satélite no da: ahí
 * el mar es una masa plana. A cambio, su mosaico está cosido a partir de
 * vuelos de distintas fechas y las costuras entre bloques se notan sobre todo
 * en mar abierto, donde el tono del agua depende del día del vuelo. Por eso no
 * es la base de arranque: quien quiera el detalle del fondo la enciende.
 *
 * El servicio REST del IDEIB es un caché teselado en EPSG:25831, que obligaría
 * a montar todo el mapa en ese CRS y dejaría fuera OpenStreetMap y OpenSeaMap,
 * que solo existen en Web Mercator. Su WMS, en cambio, sí anuncia EPSG:3857,
 * así que se consume por WMS y el mapa sigue siendo Web Mercator estándar.
 *
 * Endpoint correcto: /geoserveis/services/... (sin /rest). El de /rest/ es el
 * directorio de servicios ArcGIS y devuelve HTML, no capacidades WMS.
 *
 * La ortofoto NO cubre todo lo que el usuario puede querer mirar, y sus huecos
 * no son nodata sino color, medido tesela a tesela contra el servicio:
 *
 *   - hasta z11 el mosaico sirve un ráster de batimetría que rellena su bbox
 *     declarado (0,96–4,45 E / 38,28–40,30 N) con las esquinas en blanco
 *     opaco: sobre cualquier fondo se veía como un rectángulo flotante;
 *   - desde z12 pasa al vuelo fotográfico real, que cubre tierra y una franja
 *     costera de pocos kilómetros. Mar adentro las teselas llegan vacías
 *     (transparentes de verdad), pero las del borde del vuelo llevan el blanco
 *     horneado en los píxeles donde acaba la foto. `transparent: true` no
 *     puede eliminarlo porque para el WMS ese blanco es imagen, no ausencia.
 *
 * Por eso la base «Ortofoto oficial» es un grupo de dos capas: el satélite de
 * Esri debajo (satélite bajo satélite integra; un callejero debajo de una foto
 * aérea, no) y la ortofoto IDEIB encima, limitada a z≥12 —el umbral donde el
 * propio servicio cambia de batimetría a vuelo— y con el blanco filtrado en
 * cliente píxel a píxel. El filtrado exige leer los píxeles de la tesela, y
 * eso solo lo permite el navegador porque el WMS del IDEIB responde con CORS
 * abierto (comprobado con la cabecera Access-Control-Allow-Origin).
 */

import L from 'leaflet';

const ATRIB_IDEIB =
  '<a href="https://ideib.caib.es/">IDEIB</a> — Govern de les Illes Balears';

// Umbral del filtro de blanco. Los falsos positivos (tejados claros, espuma,
// salinas) son inofensivos por construcción: debajo está la imagen de Esri del
// mismo lugar, así que un píxel filtrado de más muestra la misma escena.
const CASI_BLANCO = 250;

// El borde del vuelo deja una franja de píxeles antialiasados (blanco mezclado
// con foto) que el umbral no captura, y un corte duro entre la foto del IDEIB
// y el satélite de Esri. Se limpia en dos pasos sobre cada tesela: los píxeles
// claros pegados a la zona transparente también se vuelven transparentes
// (BORDE_CLARO, PASADAS_BORDE) y después el alfa se degrada en rampa hacia el
// límite (PASADAS_DIFUMINADO píxeles), fundiendo la foto con el fondo.
const BORDE_CLARO = 210;
const PASADAS_BORDE = 2;
const PASADAS_DIFUMINADO = 10;

// Para que la limpieza vea el otro lado de un límite que caiga justo en el
// borde de la tesela, cada tesela se pide con un margen extra que luego se
// recorta. Debe ser mayor que el alcance de las pasadas anteriores.
const MARGEN = 14;

// El vuelo del IDEIB llega notablemente más pálido que el satélite de Esri
// (velo blanco, negros levantados, poca saturación; comprobado comparando la
// misma tesela de ambos servicios a varios zooms). Como Esri carga primero y
// el vuelo se pinta encima, sin corregir parecía que al mapa «le caía
// niebla» al terminar de cargar. Se corrige por tesela: se recoloca el punto
// negro (quita el velo y recupera contraste) y se sube la saturación.
// La corrección va DESPUÉS del filtro de blanco, que debe decidir sobre los
// píxeles originales.
const PUNTO_NEGRO = 24;
const SATURACION = 1.35;

/** Acerca el tono lavado del vuelo IDEIB al del satélite que tiene debajo. */
function corrigeColor(px) {
  const escala = 255 / (255 - PUNTO_NEGRO);
  for (let i = 0; i < px.length; i += 4) {
    if (px[i + 3] === 0) continue;
    let r = (px[i] - PUNTO_NEGRO) * escala;
    let g = (px[i + 1] - PUNTO_NEGRO) * escala;
    let b = (px[i + 2] - PUNTO_NEGRO) * escala;
    const gris = 0.299 * r + 0.587 * g + 0.114 * b;
    r = gris + (r - gris) * SATURACION;
    g = gris + (g - gris) * SATURACION;
    b = gris + (b - gris) * SATURACION;
    px[i] = r < 0 ? 0 : r > 255 ? 255 : r;
    px[i + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
    px[i + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
  }
}

/** Vuelve transparente el casi-blanco, come la franja clara y difumina el borde. */
function filtraBlanco(px, ancho, alto) {
  let transparentes = 0;
  for (let i = 0; i < px.length; i += 4) {
    if (px[i] >= CASI_BLANCO && px[i + 1] >= CASI_BLANCO && px[i + 2] >= CASI_BLANCO) {
      px[i + 3] = 0;
      transparentes++;
    }
  }
  // Tesela sin nada de blanco (interior) o vacía del todo: no hay borde que tratar.
  if (transparentes === 0 || transparentes === px.length / 4) return;

  const idx = (x, y) => (y * ancho + x) * 4;
  for (let pasada = 0; pasada < PASADAS_BORDE; pasada++) {
    const comidos = [];
    for (let y = 1; y < alto - 1; y++) {
      for (let x = 1; x < ancho - 1; x++) {
        const i = idx(x, y);
        if (px[i + 3] === 0) continue;
        if (px[i] < BORDE_CLARO || px[i + 1] < BORDE_CLARO || px[i + 2] < BORDE_CLARO) continue;
        if (
          px[idx(x - 1, y) + 3] === 0 || px[idx(x + 1, y) + 3] === 0 ||
          px[idx(x, y - 1) + 3] === 0 || px[idx(x, y + 1) + 3] === 0
        ) {
          comidos.push(i);
        }
      }
    }
    for (const i of comidos) px[i + 3] = 0;
    if (comidos.length === 0) break;
  }

  // Rampa de alfa: cada pasada permite como mucho `salto` más de alfa que el
  // vecino más transparente, lo que tras N pasadas deja un degradado de N px.
  const salto = Math.ceil(255 / PASADAS_DIFUMINADO);
  for (let pasada = 0; pasada < PASADAS_DIFUMINADO; pasada++) {
    const rebajas = [];
    for (let y = 1; y < alto - 1; y++) {
      for (let x = 1; x < ancho - 1; x++) {
        const i = idx(x, y);
        const propio = px[i + 3];
        if (propio === 0) continue;
        const vecino = Math.min(
          px[idx(x - 1, y) + 3], px[idx(x + 1, y) + 3],
          px[idx(x, y - 1) + 3], px[idx(x, y + 1) + 3],
        );
        if (propio > vecino + salto) rebajas.push([i, vecino + salto]);
      }
    }
    for (const [i, a] of rebajas) px[i + 3] = a;
    if (rebajas.length === 0) break;
  }
}

/**
 * TileLayer.WMS que devuelve cada tesela como <canvas> con los píxeles casi
 * blancos vueltos transparentes. Si la lectura de píxeles falla por un canvas
 * contaminado, la tesela se muestra sin filtrar: el peor caso es el blanco de
 * siempre, nunca un mapa roto. Hay dos formas de contaminación y hace falta
 * cubrir las dos:
 *
 *   - la imagen carga con `crossOrigin` puesto pero el canvas queda
 *     contaminado igualmente (rara, pero posible): lo cubre el try/catch de
 *     `createTile` alrededor de `getImageData`;
 *   - el WMS deja de anunciar CORS abierto: entonces la carga con
 *     `crossOrigin` ni siquiera llega a completarse (dispara `onerror`, no un
 *     canvas contaminado) y el try/catch nunca se ejecuta. `onerror` reintenta
 *     sin `crossOrigin` para poder seguir pintando la tesela sin filtrar.
 */
const OrtofotoFiltrada = L.TileLayer.WMS.extend({
  // Como L.TileLayer.WMS.getTileUrl, pero pidiendo el margen extra alrededor.
  getTileUrl(coords) {
    const tam = this.getTileSize();
    const [nw, se] = this._tileCoordsToNwSe(coords);
    const b = L.bounds(this._crs.project(nw), this._crs.project(se));
    const mx = ((b.max.x - b.min.x) / tam.x) * MARGEN;
    const my = ((b.max.y - b.min.y) / tam.y) * MARGEN;
    const bbox = [b.min.x - mx, b.min.y - my, b.max.x + mx, b.max.y + my].join(',');
    const params = L.extend({}, this.wmsParams, {
      width: tam.x + 2 * MARGEN,
      height: tam.y + 2 * MARGEN,
    });
    const url = L.TileLayer.prototype.getTileUrl.call(this, coords);
    return (
      url +
      L.Util.getParamString(params, url, this.options.uppercase) +
      (this.options.uppercase ? '&BBOX=' : '&bbox=') +
      bbox
    );
  },

  createTile(coords, done) {
    const tam = this.getTileSize();
    const total = { x: tam.x + 2 * MARGEN, y: tam.y + 2 * MARGEN };
    const canvas = document.createElement('canvas');
    canvas.width = tam.x;
    canvas.height = tam.y;

    // Recorta el margen y pinta, sin pasar por el filtro de blanco: se usa
    // tanto para el reintento sin CORS como para un canvas que resultó
    // contaminado a pesar de tener crossOrigin puesto.
    const pintaSinFiltrar = (imagen) => {
      canvas.getContext('2d').drawImage(imagen, MARGEN, MARGEN, tam.x, tam.y, 0, 0, tam.x, tam.y);
      done(null, canvas);
    };

    const img = new Image(total.x, total.y);
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // El filtrado se hace sobre la imagen con margen y después se recorta,
      // para que un límite del vuelo que caiga en el borde de la tesela
      // también quede limpio y difuminado.
      const previo = document.createElement('canvas');
      previo.width = total.x;
      previo.height = total.y;
      const ctxPrevio = previo.getContext('2d');
      ctxPrevio.drawImage(img, 0, 0, total.x, total.y);
      try {
        const datos = ctxPrevio.getImageData(0, 0, total.x, total.y);
        filtraBlanco(datos.data, total.x, total.y);
        corrigeColor(datos.data);
        ctxPrevio.putImageData(datos, 0, 0);
      } catch {
        // Canvas contaminado a pesar del crossOrigin: se queda sin filtrar.
      }
      pintaSinFiltrar(previo);
    };
    img.onerror = () => {
      // La carga con CORS ha fallado —normalmente porque el WMS ha dejado de
      // anunciar Access-Control-Allow-Origin—, así que la imagen ni ha
      // llegado a pintarse: no hay canvas que filtrar. Se reintenta sin
      // crossOrigin para poder seguir mostrando la tesela, aunque no se
      // pueda leer sus píxeles para filtrar el blanco.
      const sinCors = new Image(total.x, total.y);
      sinCors.onload = () => pintaSinFiltrar(sinCors);
      sinCors.onerror = (e) => done(e, canvas);
      sinCors.src = this.getTileUrl(coords);
    };
    img.src = this.getTileUrl(coords);

    return canvas;
  },
});

// Hacen falta dos instancias distintas: una es la base de arranque y otra el
// fondo dentro del grupo de la ortofoto. Una misma capa de Leaflet no puede
// estar en el mapa dos veces.
function creaSatelite({ zIndex } = {}) {
  return L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: 'Esri, Maxar, Earthstar Geographics, and the GIS User Community',
      maxZoom: 19,
      zIndex,
    },
  );
}

export function creaCapasBase() {
  const satelite = creaSatelite({ zIndex: 1 });

  const ortofotoIdeib = new OrtofotoFiltrada(
    'https://ideib.caib.es/geoserveis/services/imatges/GOIB_Orto_IB/MapServer/WMSServer',
    {
      layers: '0',
      format: 'image/png',
      version: '1.3.0',
      transparent: true,
      attribution: `Ortofoto ${ATRIB_IDEIB}`,
      // Por debajo de z12 el servicio solo tiene la batimetría con esquinas
      // blancas; ahí manda el satélite de Esri.
      minZoom: 12,
      maxZoom: 19,
      // Bbox declarado en las capacidades del WMS: fuera no hay teselas y no
      // tiene sentido pedirlas.
      bounds: L.latLngBounds([38.283951, 0.961612], [40.303625, 4.449876]),
      zIndex: 2,
    },
  );

  // El orden dentro del grupo fija el apilado, pero se declara además con
  // zIndex para no depender del orden de inserción en el DOM del tilePane.
  // Fondo dentro del grupo: donde el vuelo del IDEIB no llega (mar adentro,
  // fuera de Baleares, o por debajo de z12) se ve el satélite.
  const ortofoto = L.layerGroup([creaSatelite({ zIndex: 1 }), ortofotoIdeib]);

  const callejero = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  });

  // Carta náutica: rótulos, balizamiento y sondas. Se superpone a cualquier
  // base, que es como resulta útil a bordo.
  const nautica = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openseamap.org/">OpenSeaMap</a>',
    maxZoom: 18,
    opacity: 0.9,
    zIndex: 3,
  });

  return {
    bases: {
      'Satélite': satelite,
      'Ortofoto oficial (IDEIB)': ortofoto,
      'Mapa (OpenStreetMap)': callejero,
    },
    overlays: {
      'Carta náutica (OpenSeaMap)': nautica,
    },
    porDefecto: satelite,
    nautica,
  };
}
