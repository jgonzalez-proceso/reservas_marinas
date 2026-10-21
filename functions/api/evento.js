/**
 * Contador anónimo de consultas: Pages Function en `/api/evento`.
 *
 * Existe para medir el uso real sin depender del consentimiento de cookies.
 * Google Analytics solo ve a quien pulsa «Aceptar»; esto cuenta todas las
 * consultas, y puede hacerlo porque no identifica a nadie:
 *
 *  - **No hay cookie, ni localStorage, ni identificador de ningún tipo.** El
 *    cliente no guarda nada en el dispositivo y el evento no lleva nada que
 *    permita unir dos consultas de la misma persona.
 *  - **No se guarda la IP ni el user-agent.** Cloudflare los ve —es quien
 *    sirve la web—, pero esta función no los lee ni los escribe.
 *  - **La posición del GPS no sale nunca del navegador.** De una consulta por
 *    GPS solo se registra el veredicto (dentro, fuera, dudosa) y las figuras.
 *    De un clic en el mapa se registra una celda de 0,01° (~1 km), redondeada
 *    otra vez aquí: el redondeo del cliente no se da por bueno.
 *  - **Una carga de página es solo eso.** El tipo `carga` cuenta entradas a
 *    la web (no recargas: el cliente ya las descarta) y lleva como mucho el
 *    host de la web de origen —`www.google.com`—, nunca la ruta ni la
 *    consulta, que pueden llevar términos de búsqueda o identificadores.
 *
 * Todo lo que llega se valida contra listas cerradas y longitudes máximas. Un
 * campo inesperado se descarta; un evento sin tipo válido se ignora entero.
 * La respuesta es siempre 204: quien envía no necesita saber nada, y un error
 * aquí nunca puede afectar a la consulta, que ya se ha contestado en pantalla.
 *
 * Se escribe en Workers Analytics Engine, con el binding `EVENTOS` declarado
 * en el panel del proyecto Pages (ver docs/publicacion.md). Sin binding la
 * función responde igual y no escribe nada: así un despliegue de preview o un
 * `wrangler pages dev` sin configurar no rompen ni ensucian los datos.
 *
 * El orden de `blobs` y `doubles` ES el esquema: Analytics Engine no tiene
 * nombres de columna, solo `blob1…blob20` y `double1…double20`. Cambiar el
 * orden mezcla datos viejos y nuevos en la misma columna. Para añadir un campo
 * se añade al final; `scripts/informe-eventos.mjs` usa estos mismos nombres.
 */

export const TIPOS = ['mapa', 'gps', 'carga'];
export const IDIOMAS = ['es', 'ca', 'en', 'de'];
export const NIVELES_GPS = ['dentro', 'fuera', 'dudosa'];
export const ESTADOS = [
  'not_regulated',
  'allowed',
  'allowed_with_authorization',
  'restricted',
  'prohibited',
  'unknown',
];
export const ACTIVIDADES = [
  'pescaRecreativaEmbarcacion',
  'pescaSubmarina',
  'pescaDesdeCosta',
  'buceo',
  'fondeo',
  'navegacion',
];

export const BLOBS = ['tipo', 'isla', 'idioma', 'nivelGps', 'figuraPrincipal', 'figuras', ...ACTIVIDADES, 'origen'];
export const DOUBLES = ['numFiguras', 'celdaLat', 'celdaLon'];

const MAX_BYTES = 4096;
const MAX_FIGURAS = 20;
const RE_ZONE_ID = /^[a-z0-9-]{1,160}$/;
const RE_ISLA = /^[a-z]{1,20}$/;
const RE_HOST = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?)+$/;

// Recuadro holgado de Baleares. Una celda fuera de él no es una consulta de
// esta web, y guardarla sería guardar lo que alguien haya querido mandar.
const BBOX = { latMin: 38.0, latMax: 40.5, lonMin: 0.5, lonMax: 5.0 };

const enLista = (lista, v) => (lista.includes(v) ? v : '');
const celda = (v) => Math.round(v * 100) / 100;

/**
 * Convierte el cuerpo recibido en un punto de datos, o `null` si no vale.
 * Exportada para las pruebas: es toda la lógica de la función.
 */
export function normalizaEvento(datos) {
  if (!datos || typeof datos !== 'object') return null;
  const tipo = enLista(TIPOS, datos.tipo);
  if (!tipo) return null;

  const figuras = Array.isArray(datos.figuras)
    ? [...new Set(datos.figuras.filter((z) => typeof z === 'string' && RE_ZONE_ID.test(z)))].slice(0, MAX_FIGURAS)
    : [];
  const principal =
    typeof datos.figuraPrincipal === 'string' && figuras.includes(datos.figuraPrincipal)
      ? datos.figuraPrincipal
      : '';

  const estados = datos.estados && typeof datos.estados === 'object' ? datos.estados : {};

  // Solo un clic en el mapa lleva celda. Si una consulta por GPS trajera
  // coordenadas, se tiran: es la posición de una persona.
  let lat = 0;
  let lon = 0;
  if (
    tipo === 'mapa' &&
    Number.isFinite(datos.lat) &&
    Number.isFinite(datos.lon) &&
    datos.lat >= BBOX.latMin &&
    datos.lat <= BBOX.latMax &&
    datos.lon >= BBOX.lonMin &&
    datos.lon <= BBOX.lonMax
  ) {
    lat = celda(datos.lat);
    lon = celda(datos.lon);
  }

  return {
    indexes: [tipo],
    blobs: [
      tipo,
      typeof datos.isla === 'string' && RE_ISLA.test(datos.isla) ? datos.isla : '',
      enLista(IDIOMAS, datos.idioma),
      tipo === 'gps' ? enLista(NIVELES_GPS, datos.nivelGps) : '',
      principal,
      figuras.join(' '),
      ...ACTIVIDADES.map((a) => enLista(ESTADOS, estados[a])),
      tipo === 'carga' && typeof datos.origen === 'string' && datos.origen.length <= 100 && RE_HOST.test(datos.origen)
        ? datos.origen
        : '',
    ],
    doubles: [figuras.length, lat, lon],
  };
}

const vacia = () => new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });

export async function onRequestPost({ request, env }) {
  // Solo la propia web. No es seguridad —cualquiera puede falsear la
  // cabecera con curl—, pero deja fuera los formularios y scripts de otros
  // sitios que intenten escribir desde el navegador de un visitante.
  const origen = request.headers.get('Origin');
  if (origen && origen !== new URL(request.url).origin) return vacia();

  const texto = await request.text();
  if (texto.length > MAX_BYTES) return vacia();

  let datos;
  try {
    datos = JSON.parse(texto);
  } catch {
    return vacia();
  }

  const punto = normalizaEvento(datos);
  if (punto && env?.EVENTOS) {
    try {
      env.EVENTOS.writeDataPoint(punto);
    } catch {
      // Analytics Engine no garantiza la escritura y no hay nada útil que
      // hacer con un fallo aquí: la medición se pierde, la web sigue.
    }
  }
  return vacia();
}
