/**
 * Arranque de la aplicación.
 *
 * El flujo es siempre el mismo: un punto entra (por clic o por GPS), el motor
 * resuelve todas las figuras que lo contienen y el panel presenta la
 * conclusión. La interfaz no interpreta normas por su cuenta.
 */

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './styles/main.css';

import { creaCapasBase } from './map/baselayers.js';
import { creaCapaAreas, creaMarcadorConsulta } from './map/areas-layer.js';
import { pideUbicacion, veredictoUbicacion } from './map/ubicacion.js';
import { resolver } from './engine/resolve.js';
import { FICHAS, afectaALaPesca } from './rules/index.js';
import { ISLAS, ISLA_ACTIVA, TODAS_LAS_ISLAS, ETIQUETA_TODAS } from './data/islas.js';
import { creaPanel } from './ui/panel.js';
import { creaLeyenda } from './ui/leyenda.js';
import { creaBuscador } from './ui/buscador.js';

import manifest from './data/manifest.json';

// La cartografía va partida por isla y por fuente, así que los ficheros no se
// pueden importar uno a uno: los decide el manifiesto. `import.meta.glob` deja
// que Vite siga viéndolos como assets —los versiona y los copia al build— sin
// tener que repetir aquí la lista.
const URLS_GEOJSON = import.meta.glob('./data/capas/*.geojson', {
  query: '?url',
  import: 'default',
  eager: true,
});

const VISTA_INICIAL = { centro: [39.55, 2.95], zoom: 9 };

const $ = (sel) => document.querySelector(sel);

/**
 * Isla que se está mostrando.
 *
 * Va en el hash de la URL para que una isla concreta se pueda compartir o
 * guardar en favoritos, y para que el botón de atrás del navegador funcione.
 * `ISLA_ACTIVA` es solo el valor por defecto cuando no hay hash.
 */
function islaDelHash() {
  const m = /(?:^|[#&])isla=([a-z]+)/.exec(window.location.hash);
  if (!m) return ISLA_ACTIVA;
  return ISLAS[m[1]] || m[1] === TODAS_LAS_ISLAS ? m[1] : ISLA_ACTIVA;
}

const ISLA = islaDelHash();
const TODAS = ISLA === TODAS_LAS_ISLAS;

/** Nombre legible de la vista actual. */
const NOMBRE_VISTA = TODAS ? ETIQUETA_TODAS : ISLAS[ISLA];

/**
 * Selector de isla.
 *
 * Cambiar de isla recarga la página en vez de reconstruir el mapa en caliente.
 * Cada fuente tiene su propio plano de Leaflet y su propio lienzo de canvas, y
 * desmontarlos y volverlos a crear sin dejar restos es mucho más frágil que
 * empezar de cero; el coste es una recarga que además reaprovecha la caché del
 * navegador para las capas ya descargadas.
 */
function montaSelectorIsla() {
  const select = $('#selector-isla');
  if (!select) return;

  const disponibles = Object.keys(ISLAS).filter((i) => manifest.porIsla?.[i]?.ficheros?.length);
  for (const [valor, etiqueta] of [
    [TODAS_LAS_ISLAS, ETIQUETA_TODAS],
    ...disponibles.map((i) => [i, ISLAS[i]]),
  ]) {
    const op = document.createElement('option');
    op.value = valor;
    op.textContent = etiqueta;
    op.selected = valor === ISLA;
    select.append(op);
  }

  select.addEventListener('change', () => {
    window.location.hash = `isla=${select.value}`;
    window.location.reload();
  });

  const subtitulo = $('#subtitulo');
  if (subtitulo) subtitulo.textContent = TODAS ? 'Illes Balears' : `Illes Balears · ${NOMBRE_VISTA}`;
}

/**
 * Carga todas las capas de la isla activa.
 *
 * Se descargan en paralelo y se espera a tenerlas todas antes de permitir
 * consultar. Resolver un punto con parte de las capas cargadas daría una
 * respuesta que parece completa sin serlo, que es justo lo que esta aplicación
 * no puede hacer.
 */
async function cargaAreas() {
  // En la vista de todas las islas se piden los ficheros de cada una. Algunos
  // se repiten a propósito: una figura que recae sobre dos islas está en los
  // dos ficheros —el canal de Menorca en Mallorca y en Menorca, els Freus en
  // Eivissa y en Formentera—, así que hay que quedarse con una sola copia. Sin
  // deduplicar, el panel enseñaría la misma reserva dos veces y el motor la
  // contaría dos veces al listar las figuras que afectan al punto.
  const ficheros = TODAS
    ? [...new Set(Object.values(manifest.porIsla ?? {}).flatMap((i) => i.ficheros.map((f) => f.fichero)))]
    : (manifest.porIsla?.[ISLA]?.ficheros ?? []).map((f) => f.fichero);

  if (ficheros.length === 0) throw new Error('El manifiesto no declara cartografía para esta vista.');

  const lotes = await Promise.all(
    ficheros.map(async (fichero) => {
      const url = URLS_GEOJSON[`./data/capas/${fichero}`];
      if (!url) throw new Error(`Falta ${fichero}; ejecuta "npm run data".`);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`No se ha podido cargar ${fichero} (${res.status}).`);
      return (await res.json()).features;
    }),
  );

  const porFeatureId = new Map();
  for (const f of lotes.flat()) {
    if (!porFeatureId.has(f.properties.featureId)) porFeatureId.set(f.properties.featureId, f);
  }
  return [...porFeatureId.values()];
}

function pintaEstadoDatos(features) {
  const fecha = manifest.generado?.slice(0, 10) ?? 'desconocida';
  const fuentes = manifest.fuentes?.map((f) => f.titulo).join(', ') ?? '';
  $('#estado-datos').innerHTML = '';
  $('#estado-datos').append(
    document.createTextNode(
      `${features.length} geometrías de ${NOMBRE_VISTA} · datos de ${fuentes} descargados el ${fecha}`,
    ),
  );
}

async function main() {
  montaSelectorIsla();

  const mapa = L.map('mapa', {
    center: VISTA_INICIAL.centro,
    zoom: VISTA_INICIAL.zoom,
    zoomControl: false,
    attributionControl: true,
  });
  L.control.zoom({ position: 'bottomright' }).addTo(mapa);

  const { bases, overlays, porDefecto } = creaCapasBase();
  porDefecto.addTo(mapa);
  // autoZIndex reasignaría el z de cada base por orden de aparición, y sobre un
  // L.layerGroup lo propaga a todos sus hijos por igual: dejaría el fondo
  // mundial y la ortofoto en el mismo plano. El apilado lo fija baselayers.js.
  const control = L.control
    .layers(bases, overlays, { position: 'topright', collapsed: true, autoZIndex: false })
    .addTo(mapa);

  let features = [];
  try {
    features = await cargaAreas();
  } catch (e) {
    $('#carga').textContent = e.message;
    $('#carga').classList.add('carga--error');
    return;
  }

  $('#carga').remove();
  pintaEstadoDatos(features);

  const marcador = creaMarcadorConsulta();
  marcador.grupo.addTo(mapa);

  const panelEl = $('#panel');
  const panel = creaPanel(panelEl, {
    onCerrar: () => {
      document.body.classList.remove('con-panel');
      areas.limpiaResaltado();
      marcador.limpia();
      panel.pintaVacio();
    },
  });

  function consulta(punto, { precisionMetros = null, veredicto = null } = {}) {
    const resultado = resolver(punto, features, FICHAS);
    areas.resalta(resultado.figuras.map((f) => f.zoneId));
    marcador.situa(punto, { precisionMetros });
    panel.pintaResultado(resultado, { veredicto });
    document.body.classList.add('con-panel');
    return resultado;
  }

  const areas = creaCapaAreas(features, { mapa, onSeleccion: (punto) => consulta(punto) });
  areas.conectaMapa();

  // Cada fuente es una capa conmutable. Arrancan encendidas las que imponen
  // algo propio a la pesca; las demás quedan disponibles pero apagadas, porque
  // si no tapan el mapa sin decir nada: los espacios Natura 2000 marinos suman
  // más de 5.000 km² sobre Mallorca y ninguno restringe la pesca recreativa,
  // que los arts. 4 y 5 del Decret 91/2023 remiten a la normativa general.
  //
  // Apagar una capa NO la saca del cálculo: `consulta` resuelve siempre contra
  // `features` al completo, y una figura oculta sigue apareciendo en el panel
  // al pulsar un punto suyo. La leyenda lo advierte.
  for (const entrada of areas.porFuente.values()) {
    const pesa = entrada.features.some((f) => afectaALaPesca(f.properties.zoneId));
    control.addOverlay(entrada.capa, pesa ? entrada.titulo : `${entrada.titulo} — sin efecto en la pesca`);
    if (pesa) entrada.capa.addTo(mapa);
  }

  // Se prefiere encuadrar sobre las reservas marinas, pero Cabrera no tiene
  // ninguna: allí manda el parque nacional. Se usa la primera fuente disponible
  // por orden de preferencia, y nunca el conjunto, que incluiría las ZEPA
  // estatales y dejaría el mapa demasiado lejos para ver nada útil.
  const encuadre =
    areas.limitesDe('reservas-marinas') ??
    areas.limitesDe('espacios-naturales') ??
    areas.limitesDe('natura2000');

  // El encuadre se aplaza un fotograma y se fuerza `invalidateSize` antes.
  // Leaflet calcula el zoom a partir del tamaño del contenedor, y en el primer
  // ciclo la disposición flexible todavía no ha asentado el ancho: con la vista
  // de todas las islas eso daba zoom 9 en vez de 8 y dejaba Eivissa y
  // Formentera fuera de pantalla. Sin animación, además, el mapa aparece ya
  // colocado en vez de llegar volando desde la vista inicial.
  if (encuadre) {
    requestAnimationFrame(() => {
      mapa.invalidateSize({ animate: false });
      mapa.fitBounds(encuadre, { padding: [20, 20], animate: false });
    });
  }

  // La leyenda enumera solo lo que está dibujado; con las capas apagadas,
  // listar sus colores sería otra forma de ruido.
  const leyenda = creaLeyenda($('#leyenda'), areas.featuresVisibles());
  mapa.on('overlayadd overlayremove', () => leyenda.actualiza(areas.featuresVisibles()));

  creaBuscador($('#buscador'), features, {
    tieneFicha: (zoneId) => Boolean(FICHAS[zoneId]),
    onElegir: (zoneId) => {
      areas.encuadra(zoneId);
      areas.resalta([zoneId]);
      document.body.classList.remove('con-lista');
    },
  });

  // -- Botón de ubicación ------------------------------------------------------
  const btnUbicacion = $('#btn-ubicacion');
  btnUbicacion.addEventListener('click', async () => {
    btnUbicacion.disabled = true;
    btnUbicacion.classList.add('cargando');
    try {
      const { lat, lon, precisionMetros } = await pideUbicacion();
      const punto = { lat, lon };
      const veredicto = veredictoUbicacion(punto, features, precisionMetros);
      consulta(punto, { precisionMetros, veredicto });
      mapa.setView([lat, lon], Math.max(mapa.getZoom(), 13));
    } catch (e) {
      window.alert(e.message);
    } finally {
      btnUbicacion.disabled = false;
      btnUbicacion.classList.remove('cargando');
    }
  });

  // -- Alternador de la lista en móvil ----------------------------------------
  $('#btn-lista').addEventListener('click', () => {
    document.body.classList.toggle('con-lista');
  });

  // Expuesto para poder verificar el motor desde la consola del navegador sin
  // depender de la interfaz.
  window.__restriccions = { mapa, features, consulta, resolver, FICHAS, areas };
}

main();
