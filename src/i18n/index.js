/**
 * Idiomas de la interfaz.
 *
 * Cuatro decisiones que conviene no volver a discutir:
 *
 *  - **El idioma vive en una cookie, no en la URL.** Es una preferencia de
 *    interfaz, como el orden de las tarjetas de actividad, y sigue el mismo
 *    camino que aquel. La consecuencia hay que aceptarla con los ojos
 *    abiertos: un enlace compartido no lleva el idioma, y para un buscador
 *    esta web sigue siendo una sola pagina en castellano. El dia que se
 *    quieran rutas propias por idioma —/en/, /de/, /ca/— con su hreflang y su
 *    sitemap, lo que hay que cambiar es de donde sale `idiomaActivo()`; los
 *    catalogos y las llamadas a `t()` valen igual.
 *
 *  - **Cambiar de idioma recarga la pagina.** Es lo mismo que hace el selector
 *    de isla y por el mismo motivo: el control de capas de Leaflet, la leyenda
 *    y el panel llevan texto ya pintado, y volver a montarlos en caliente sin
 *    dejar restos es mucho mas fragil que empezar de cero. La cartografia ya
 *    esta en la cache del navegador, asi que la recarga no vuelve a descargar
 *    los megabytes.
 *
 *  - **Los catalogos de interfaz se importan los cuatro.** Son unos 40 kB sin
 *    comprimir frente a los 6,6 MB de cartografia: partirlos para ahorrar diez
 *    kilobytes obligaria a que `t()` fuera asincrona, y `t()` se llama desde
 *    dentro del pintado del panel. El catalogo normativo, que es diez veces
 *    mayor, si se carga aparte y solo cuando hace falta.
 *
 *  - **Una clave sin traducir cae al castellano, nunca a la clave.** En esta
 *    web ver una frase en otro idioma es un incordio; ver `panel.tasa` es una
 *    pagina rota. El respaldo es siempre texto que se puede leer.
 */

import { leeCookie, escribeCookie } from '../ui/cookies.js';

import es from './catalogos/es.js';
import ca from './catalogos/ca.js';
import en from './catalogos/en.js';
import de from './catalogos/de.js';

const CATALOGOS = { es, ca, en, de };

/** Idioma de respaldo y de redaccion: el original de todo el contenido. */
export const IDIOMA_BASE = 'es';

/**
 * Nombre de cada idioma escrito en ese idioma (endonimo).
 *
 * Un selector que dice «Espagnol» a un frances no le sirve de nada si no lee
 * frances: quien busca su idioma en una lista lo busca escrito como el lo
 * escribe.
 */
export const IDIOMAS = {
  es: 'Castellano',
  ca: 'Català',
  en: 'English',
  de: 'Deutsch',
};

/**
 * Etiqueta BCP-47 para `Intl` y para el atributo `lang` del documento.
 *
 * Importa mas de lo que parece: de ello dependen el separador decimal, el
 * simbolo de moneda y, sobre todo, el corte de linea y la division silabica
 * del navegador.
 */
export const ETIQUETA_BCP47 = {
  es: 'es-ES',
  ca: 'ca-ES',
  en: 'en-GB',
  de: 'de-DE',
};

const COOKIE_IDIOMA = 'idioma';

/** Idiomas soportados, en el orden en que se ofrecen. */
export const IDIOMAS_SOPORTADOS = Object.keys(IDIOMAS);

/**
 * Idioma que pide el navegador, si es uno de los que hablamos.
 *
 * Se mira `navigator.languages` entera y no solo `language`: un usuario con
 * «de-AT, de, en» configurado quiere aleman, y quedarse en el primer elemento
 * exacto fallaria en cuanto la region no coincida. Se compara solo la parte de
 * idioma, que es lo unico que este catalogo distingue.
 */
function idiomaDelNavegador() {
  const pedidos = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const etiqueta of pedidos) {
    const base = String(etiqueta ?? '').toLowerCase().split('-')[0];
    if (IDIOMAS_SOPORTADOS.includes(base)) return base;
  }
  return null;
}

/**
 * Idioma activo: lo elegido a mano manda sobre lo que pida el navegador.
 *
 * Se resuelve una sola vez al cargar el modulo. Cambiarlo recarga la pagina,
 * asi que dentro de una misma vida del documento este valor no cambia y todo
 * lo que se pinte sera coherente.
 */
function resuelveIdioma() {
  const guardado = leeCookie(COOKIE_IDIOMA);
  if (guardado && IDIOMAS_SOPORTADOS.includes(guardado)) return guardado;
  return idiomaDelNavegador() ?? IDIOMA_BASE;
}

export const IDIOMA = resuelveIdioma();

export const LOCALE = ETIQUETA_BCP47[IDIOMA];

/** Guarda la eleccion y recarga; ver la nota de cabecera sobre por que recarga. */
export function cambiaIdioma(idioma) {
  if (!IDIOMAS_SOPORTADOS.includes(idioma)) return;
  escribeCookie(COOKIE_IDIOMA, idioma);
  window.location.reload();
}

const CATALOGO = CATALOGOS[IDIOMA] ?? CATALOGOS[IDIOMA_BASE];
const RESPALDO = CATALOGOS[IDIOMA_BASE];

/**
 * Sustituye `{nombre}` por el valor correspondiente.
 *
 * Deliberadamente tonta: no hay expresiones ni formato dentro de la plantilla.
 * Lo que necesita formato —importes, distancias, fechas— llega ya formateado
 * por quien llama, que es quien sabe si son metros o kilometros.
 */
function interpola(plantilla, params) {
  if (!params) return plantilla;
  return plantilla.replace(/\{(\w+)\}/g, (coincidencia, clave) =>
    Object.hasOwn(params, clave) ? String(params[clave]) : coincidencia,
  );
}

/**
 * Texto de interfaz por clave.
 *
 * @param {string} clave    p. ej. `panel.tasa`
 * @param {Object} [params] valores para los `{marcadores}` de la plantilla
 */
export function t(clave, params) {
  const texto = CATALOGO[clave] ?? RESPALDO[clave];
  if (texto == null) {
    // Una clave que no existe en ningun catalogo es un error de programacion,
    // no un idioma incompleto. Se avisa por consola y se devuelve la clave,
    // porque inventarse un texto lo esconderia.
    console.warn(`i18n: clave desconocida "${clave}"`);
    return clave;
  }
  return interpola(texto, params);
}

/** Plural simple: la mayoria de casos de esta interfaz son «uno» o «varios». */
export function tp(claveUna, claveVarias, n, params) {
  return t(n === 1 ? claveUna : claveVarias, { n, ...params });
}

/**
 * ¿Existe esta clave en algun catalogo?
 *
 * Mira tambien el castellano, no solo el idioma activo: la pregunta que hace
 * quien llama es «¿tengo texto para esto?», y el respaldo es texto. Se usa
 * para decidir entre una descripcion concreta y una generica —p. ej. una
 * figura de proteccion que la cartografia oficial publique manana y para la
 * que todavia no haya descripcion escrita.
 */
export function existeClave(clave) {
  return Object.hasOwn(CATALOGO, clave) || Object.hasOwn(RESPALDO, clave);
}
