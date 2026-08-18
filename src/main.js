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
import { ISLAS, ISLA_ACTIVA, TODAS_LAS_ISLAS } from './data/islas.js';
import { creaPanel } from './ui/panel.js';
import { creaLeyenda } from './ui/leyenda.js';
import { creaBuscador } from './ui/buscador.js';
import { creaMenu } from './ui/menu.js';
import {
  t,
  existeClave,
  IDIOMA,
  IDIOMAS,
  IDIOMAS_SOPORTADOS,
  cambiaIdioma,
} from './i18n/index.js';
import { traduceDocumento } from './i18n/dom.js';
import { cargaNormativa } from './i18n/normativa.js';

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
  const isla = m[1];
  if (isla === TODAS_LAS_ISLAS) return isla;
  // No basta con que la isla exista: tiene que tener cartografía en el
  // manifiesto. El selector ya filtraba por esto, pero una URL compartida con
  // una isla declarada y sin ficheros acababa en «El manifiesto no declara
  // cartografía para esta vista» como pantalla final. Ante un hash inservible
  // se cae a la vista por defecto, igual que ante un hash desconocido.
  if (ISLAS[isla] && manifest.porIsla?.[isla]?.ficheros?.length) return isla;
  return ISLA_ACTIVA;
}

const ISLA = islaDelHash();
const TODAS = ISLA === TODAS_LAS_ISLAS;

// El hash cambia solo (navegación dentro del mismo documento) cuando el
// usuario usa atrás/adelante del navegador, y eso no recarga la página por sí
// solo: sin este listener el mapa se quedaba mostrando la isla anterior con la
// URL ya apuntando a otra. `ISLA` se lee una sola vez al arrancar, así que la
// única forma de que el hash y el mapa vuelvan a estar de acuerdo es recargar.
window.addEventListener('hashchange', () => window.location.reload());

/**
 * Nombre legible de la vista actual.
 *
 * «Todas las islas» se traduce; los nombres de las islas no. Mallorca se llama
 * Mallorca en los cuatro idiomas, y las formas castellanizadas —Ibiza,
 * Menorca— no son las que lleva la cartografía oficial ni las que hay que
 * buscar en el BOIB.
 */
const NOMBRE_VISTA = TODAS ? t('islas.todas') : ISLAS[ISLA];

/**
 * Título de una fuente de cartografía en el idioma activo.
 *
 * El respaldo es el título del manifiesto, que es un fichero generado y por
 * tanto se queda en castellano: una fuente nueva aparecerá en el control de
 * capas con su nombre castellano hasta que se le escriba la clave, que es
 * mejor que aparecer con su identificador.
 */
function tituloFuente(id, respaldo) {
  return existeClave(`fuente.${id}`) ? t(`fuente.${id}`) : (respaldo ?? id);
}

/**
 * Selector de isla.
 *
 * Cambiar de isla recarga la página en vez de reconstruir el mapa en caliente.
 * Cada fuente tiene su propio plano de Leaflet y su propio lienzo de canvas, y
 * desmontarlos y volverlos a crear sin dejar restos es mucho más frágil que
 * empezar de cero; el coste es una recarga que además reaprovecha la caché del
 * navegador para las capas ya descargadas.
 */
/**
 * Vistas que se pueden elegir, en el orden en que se ofrecen.
 *
 * Una isla declarada pero sin cartografía en el manifiesto no se ofrece: la
 * vista existiría y acabaría en «El manifiesto no declara cartografía para
 * esta vista» como pantalla final.
 *
 * Vive aparte porque la usan dos interfaces —el desplegable de la cabecera y
 * el menú de móvil— y dos listas de islas que pudieran divergir serían dos
 * mapas distintos según por dónde se entre.
 */
function vistasDisponibles() {
  const conCartografia = Object.keys(ISLAS).filter((i) => manifest.porIsla?.[i]?.ficheros?.length);
  return [[TODAS_LAS_ISLAS, t('islas.todas')], ...conCartografia.map((i) => [i, ISLAS[i]])];
}

/** Cambiar de isla: el hash es la fuente de la verdad y la recarga la aplica. */
function vaAIsla(valor) {
  window.location.hash = `isla=${valor}`;
  window.location.reload();
}

function montaSelectorIsla() {
  const select = $('#selector-isla');
  if (!select) return;

  for (const [valor, etiqueta] of vistasDisponibles()) {
    const op = document.createElement('option');
    op.value = valor;
    op.textContent = etiqueta;
    op.selected = valor === ISLA;
    select.append(op);
  }

  select.addEventListener('change', () => vaAIsla(select.value));

  const subtitulo = $('#subtitulo');
  if (subtitulo) {
    subtitulo.textContent = TODAS
      ? t('app.subtitulo')
      : t('app.subtituloIsla', { isla: NOMBRE_VISTA });
  }
}

/**
 * Selector de idioma.
 *
 * Cambiarlo recarga, igual que el de isla y por el mismo motivo: el control de
 * capas de Leaflet, la leyenda y el panel llevan texto ya pintado. La
 * cartografía ya está en la caché del navegador, así que la recarga no vuelve
 * a bajar los megabytes.
 *
 * Cada idioma se escribe en su propio idioma. Quien busca el suyo en una lista
 * lo busca escrito como él lo escribe, no traducido al idioma que tiene
 * delante y que precisamente no entiende.
 */
function montaSelectorIdioma() {
  const select = $('#selector-idioma');
  if (!select) return;

  for (const [valor, etiqueta] of Object.entries(IDIOMAS)) {
    const op = document.createElement('option');
    op.value = valor;
    op.textContent = etiqueta;
    op.selected = valor === IDIOMA;
    select.append(op);
  }

  select.addEventListener('change', () => cambiaIdioma(select.value));
}

/**
 * Menú de hamburguesa de la cabecera, solo visible por debajo de 560px.
 *
 * Recoge lo mismo que los controles de al lado y llama a las mismas funciones:
 * no es una segunda implementación del cambio de isla o de idioma, es otra
 * manera de llegar a la primera. «Zonas» delega en su botón —incluida la
 * comprobación de si ya se puede pulsar— por el mismo motivo.
 */
function montaMenuMovil() {
  const boton = $('#btn-menu');
  const btnLista = $('#btn-lista');
  if (!boton || !btnLista) return;

  creaMenu(boton, [
    {
      etiqueta: t('cabecera.idioma'),
      valor: IDIOMAS[IDIOMA],
      opciones: IDIOMAS_SOPORTADOS.map((id) => ({
        valor: id,
        etiqueta: IDIOMAS[id],
        activa: id === IDIOMA,
      })),
      onElegir: (id) => cambiaIdioma(id),
    },
    {
      etiqueta: t('cabecera.isla'),
      valor: NOMBRE_VISTA,
      opciones: vistasDisponibles().map(([valor, etiqueta]) => ({
        valor,
        etiqueta,
        activa: valor === ISLA,
      })),
      onElegir: (valor) => vaAIsla(valor),
    },
    {
      etiqueta: t('cabecera.zonas'),
      accion: () => btnLista.click(),
      deshabilitada: () => btnLista.disabled,
    },
  ]);
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

  if (ficheros.length === 0) throw new Error(t('app.errorManifiesto'));

  const lotes = await Promise.all(
    ficheros.map(async (fichero) => {
      const url = URLS_GEOJSON[`./data/capas/${fichero}`];
      if (!url) throw new Error(t('app.errorFalta', { fichero }));
      const res = await fetch(url);
      if (!res.ok) throw new Error(t('app.errorDescarga', { fichero, estado: res.status }));
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
  const fecha = manifest.generado?.slice(0, 10) ?? t('pie.fechaDesconocida');
  const fuentes = manifest.fuentes?.map((f) => tituloFuente(f.id, f.titulo)).join(', ') ?? '';
  // Se parte en trozos para poder recortarlo en móvil sin perder lo que
  // importa. La enumeración de fuentes ocupaba seis renglones en una pantalla
  // estrecha, tapando mapa a cambio de una lista que ya está en la leyenda.
  // La fecha de descarga no se recorta nunca: es la regla del proyecto, y es
  // lo que permite saber si lo que se está leyendo está al día.
  const detalle = (texto) => {
    const s = document.createElement('span');
    s.className = 'pie__detalle';
    s.textContent = texto;
    return s;
  };
  $('#estado-datos').innerHTML = '';
  $('#estado-datos').append(
    document.createTextNode(t('pie.geometrias', { n: features.length })),
    detalle(t('pie.deVista', { vista: NOMBRE_VISTA })),
    document.createTextNode(t('pie.datos')),
    detalle(t('pie.deFuentes', { fuentes })),
    document.createTextNode(t('pie.delDia', { fecha })),
  );
}

async function main() {
  // Lo primero de todo: el documento arranca en castellano —que es lo que ve
  // un rastreador sin JavaScript— y hay que pasarlo al idioma activo antes de
  // montar nada, o habría un fotograma con la cabecera en un idioma y el panel
  // en otro.
  traduceDocumento();
  montaSelectorIdioma();
  montaSelectorIsla();
  montaMenuMovil();

  // El texto normativo traducido va aparte del bundle. Se espera aquí, junto a
  // la cartografía, y no en el primer pintado del panel: si llegara tarde, la
  // primera consulta saldría en castellano y la segunda en catalán, que parece
  // un fallo aunque las dos digan lo mismo.
  const normativa = cargaNormativa();

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

  // «Zonas» y «¿Estoy dentro?» arrancan deshabilitados en el HTML y solo se
  // habilitan con todas las capas cargadas: durante la descarga (6,5 MB gzip
  // en la vista de todas las islas) no pueden responder, y si la carga falla
  // el retorno temprano los dejaba con aspecto de vivos y ningún listener
  // detrás. Deshabilitados cuentan la verdad en los dos casos.
  let features = [];
  try {
    [features] = await Promise.all([cargaAreas(), normativa]);
  } catch (e) {
    $('#carga').textContent = t('app.cargaError', { mensaje: e.message });
    $('#carga').classList.add('carga--error');
    return;
  }

  $('#carga').remove();
  $('#btn-ubicacion').disabled = false;
  $('#btn-lista').disabled = false;
  pintaEstadoDatos(features);

  const marcador = creaMarcadorConsulta(mapa);
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
  for (const [id, entrada] of areas.porFuente.entries()) {
    const pesa = entrada.features.some((f) => afectaALaPesca(f.properties.zoneId));
    const titulo = tituloFuente(id, entrada.titulo);
    control.addOverlay(entrada.capa, pesa ? titulo : t('capa.sinEfectoPesca', { titulo }));
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
      const { lat, lon, precisionMetros, obtenidaEn } = await pideUbicacion();
      const punto = { lat, lon };
      const veredicto = veredictoUbicacion(punto, features, precisionMetros, { obtenidaEn });
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
