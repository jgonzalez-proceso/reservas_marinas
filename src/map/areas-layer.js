/**
 * Capa de áreas protegidas.
 *
 * Cuatro decisiones importantes:
 *
 *  1. Orden de dibujo por área descendente, para que las zonas interiores
 *     pequeñas queden encima de los perímetros generales y sean visibles y
 *     alcanzables con el dedo. Las fuentes se apilan en el orden de
 *     `ORDEN_FUENTES`: los espacios Natura 2000, que son enormes, van debajo.
 *  2. El clic NO se resuelve por el polígono de encima. Se escucha en el mapa
 *     y se delega en el motor, que devuelve todas las figuras que contienen el
 *     punto. Un punto dentro de una reserva integral está también dentro de la
 *     reserva marina que la envuelve, y las dos normas aplican.
 *  3. Se dibuja sobre canvas y no sobre SVG. Con Natura 2000 cargado, Mallorca
 *     pasa de unos pocos miles de vértices a más de cuatrocientos mil: la ZEPA
 *     del norte de Mallorca sola tiene 171.000, porque su límite de tierra
 *     recorre toda la costa. Un elemento SVG por polígono con esa densidad
 *     bloquea el navegador en un móvil.
 *  4. Cada fuente es una capa conmutable, pero **ocultar una capa no la
 *     desactiva**: el motor resuelve siempre contra todas las geometrías
 *     cargadas. La visibilidad es una comodidad de lectura, no un filtro
 *     jurídico, y sería peligroso que apagar una capa hiciera desaparecer una
 *     prohibición de la respuesta.
 */

import L from 'leaflet';

import { estiloDe } from './estilos-proteccion.js';

/**
 * De abajo arriba. Cada fuente se dibuja en su propio plano de Leaflet con un
 * z fijo, y no según el orden en que se añade al mapa.
 *
 * Sin planos, apagar y volver a encender una capa desde el control la
 * recolocaría encima de todo: los 981 km² de la ZEPA del norte taparían las
 * zonas pequeñas, que son las que llevan las prohibiciones.
 */
const ORDEN_FUENTES = [
  'natura2000',
  'zonificacion-enp',
  'espacios-naturales',
  'reservas-marinas',
  'regulacion-fondeo',
  // Arriba del todo la capa que contesta directamente a la pregunta de esta
  // web: son dos polígonos pequeños dentro del parque y quedar debajo de él los
  // haría invisibles justo donde importan.
  'regulacion-pesca-submarina',
];

const pesoFuente = (id) => {
  const i = ORDEN_FUENTES.indexOf(id);
  return i === -1 ? -1 : i;
};

export function creaCapaAreas(features, { mapa, onSeleccion }) {
  const porFuente = new Map();

  for (const f of features) {
    const id = f.properties.fuente;
    if (!porFuente.has(id)) {
      porFuente.set(id, {
        id,
        titulo: f.properties.fuenteTitulo ?? id,
        features: [],
      });
    }
    porFuente.get(id).features.push(f);
  }

  for (const entrada of porFuente.values()) {
    // El plano fija el apilado; el canvas evita que cientos de miles de
    // vértices se conviertan en otros tantos nodos SVG.
    const nombrePlano = `areas-${entrada.id}`;
    const plano = mapa.createPane(nombrePlano);
    plano.style.zIndex = String(401 + pesoFuente(entrada.id));
    // El plano no recibe eventos: el clic lo escucha el mapa y lo resuelve el
    // motor, para que la respuesta incluya todas las figuras superpuestas.
    plano.style.pointerEvents = 'none';

    // Dentro de cada fuente, de mayor a menor área: así las zonas interiores
    // pequeñas quedan encima de los perímetros que las contienen.
    const ordenadas = [...entrada.features].sort(
      (a, b) => (b.properties.areaKm2 ?? 0) - (a.properties.areaKm2 ?? 0),
    );

    entrada.capa = L.geoJSON(
      { type: 'FeatureCollection', features: ordenadas },
      {
        pane: nombrePlano,
        renderer: L.canvas({ padding: 0.3, pane: nombrePlano }),
        style: (f) => estiloDe(f),
        interactive: false,
      },
    );
  }

  const cadaPoligono = (fn) => {
    for (const { capa: sub } of porFuente.values()) sub.eachLayer(fn);
  };

  let resaltadas = new Set();

  function resalta(zoneIds) {
    const nuevas = new Set(zoneIds);
    cadaPoligono((layer) => {
      const p = layer.feature.properties;
      const activo = nuevas.size === 0 || nuevas.has(p.zoneId);
      layer.setStyle(
        estiloDe(layer.feature, {
          resaltado: nuevas.has(p.zoneId),
          atenuado: nuevas.size > 0 && !activo,
        }),
      );
    });
    resaltadas = nuevas;
  }

  function limpiaResaltado() {
    resalta([]);
  }

  /**
   * Encuadra una zona. Si su capa está apagada se enciende primero: buscarla en
   * el listado y que el mapa no enseñe nada sería desconcertante.
   */
  function encuadra(zoneId) {
    const capas = [];
    for (const entrada of porFuente.values()) {
      entrada.capa.eachLayer((layer) => {
        if (layer.feature.properties.zoneId !== zoneId) return;
        capas.push(layer);
        if (!mapa.hasLayer(entrada.capa)) entrada.capa.addTo(mapa);
      });
    }
    if (capas.length === 0) return;
    const bounds = capas.reduce((b, l) => b.extend(l.getBounds()), capas[0].getBounds());
    mapa.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }

  function conectaMapa() {
    mapa.on('click', (e) => {
      onSeleccion({ lat: e.latlng.lat, lon: e.latlng.lng }, { origen: 'clic' });
    });
  }

  /** Límites de una sola fuente, para encuadrar sin que mande la más extensa. */
  function limitesDe(fuenteId) {
    const entrada = porFuente.get(fuenteId);
    return entrada ? entrada.capa.getBounds() : null;
  }

  /** Features de las capas encendidas ahora mismo. Solo para la leyenda. */
  function featuresVisibles() {
    return [...porFuente.values()]
      .filter((e) => mapa.hasLayer(e.capa))
      .flatMap((e) => e.features);
  }

  return {
    porFuente,
    resalta,
    limpiaResaltado,
    encuadra,
    conectaMapa,
    limitesDe,
    featuresVisibles,
    resaltadas: () => resaltadas,
  };
}

/** Marcador del punto consultado. */
export function creaMarcadorConsulta(mapa) {
  // El marcador y el círculo de precisión van en un plano propio por ENCIMA de
  // los de las fuentes, que ocupan de 401 en adelante — una por cada entrada de
  // ORDEN_FUENTES, así que este z sube con ellas. En el overlayPane por defecto (z 400)
  // quedaban debajo de todos los rellenos, y el resaltado —que sube la
  // opacidad de la figura pulsada— terminaba de tapar el punto que se acababa
  // de consultar: en s'Albufera des Grau, con tres capas apiladas, el marcador
  // casi desaparecía.
  const PLANO_CONSULTA = 'consulta';
  const plano = mapa.createPane(PLANO_CONSULTA);
  plano.style.zIndex = String(401 + ORDEN_FUENTES.length);
  plano.style.pointerEvents = 'none';

  const grupo = L.layerGroup();

  function situa(punto, { precisionMetros = null } = {}) {
    grupo.clearLayers();
    const latlng = [punto.lat, punto.lon];

    if (precisionMetros) {
      L.circle(latlng, {
        pane: PLANO_CONSULTA,
        radius: precisionMetros,
        color: '#ffffff',
        weight: 1,
        opacity: 0.8,
        fillColor: '#ffffff',
        fillOpacity: 0.12,
      }).addTo(grupo);
    }

    L.circleMarker(latlng, {
      pane: PLANO_CONSULTA,
      radius: 6,
      color: '#ffffff',
      weight: 2.5,
      fillColor: '#111820',
      fillOpacity: 1,
    }).addTo(grupo);
  }

  function limpia() {
    grupo.clearLayers();
  }

  return { grupo, situa, limpia };
}
