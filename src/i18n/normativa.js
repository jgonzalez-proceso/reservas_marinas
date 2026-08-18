/**
 * Traduccion del texto normativo de las fichas.
 *
 * -- Por que el catalogo se indexa por la cadena en castellano ---------------
 *
 * La alternativa evidente era poner las traducciones dentro de cada ficha
 * (`motivo: { es: '...', ca: '...' }`) o en un catalogo indexado por
 * zoneId + actividad + campo. Las dos se descartaron por el mismo motivo, que
 * es el riesgo central de traducir texto juridico: **la traduccion caducada**.
 *
 * Si alguien corrige un `motivo` en castellano porque ha releido la norma —y
 * eso pasa: la ficha de la Badia de Palma ya cambio una vez de `allowed` a
 * `allowed_with_authorization` al leer el articulado integro—, con un catalogo
 * por zoneId la version catalana se queda diciendo lo anterior y nadie se
 * entera. El usuario en catalan lee una afirmacion que este proyecto ya sabe
 * que es falsa, y la lee con la misma cita normativa debajo.
 *
 * Indexando por la cadena origen eso no puede ocurrir. Al cambiar el
 * castellano cambia la clave, la entrada catalana deja de casar y el panel cae
 * al castellano corregido. Se pierde la traduccion —hay que rehacerla, y
 * `check-i18n` la enumera como huerfana— pero **nunca se muestra la version
 * antigua**. El fallo es visible y del lado seguro, que es la unica clase de
 * fallo que esta web se puede permitir.
 *
 * De regalo, deduplica: las mismas 2.372 apariciones de texto normativo son
 * 980 cadenas distintas, porque las 78 fichas de la Red Natura 2000 comparten
 * literalmente el motivo de la remision al Decret 91/2023.
 *
 * -- Que idiomas tienen texto normativo -------------------------------------
 *
 * Solo el catalan, y no por comodidad: es la lengua en la que el BOIB publica
 * la mayor parte de estas normas, asi que en muchos casos traducir es volver
 * al original en vez de alejarse de el. En ingles y aleman la interfaz esta
 * traducida y el texto normativo se muestra en castellano, con un aviso que lo
 * dice; inventar una version inglesa de un articulo del PRUG sin nadie que la
 * coteje contra el boletin seria justo lo que este proyecto no hace.
 */

import { IDIOMA, IDIOMA_BASE } from './index.js';

/** Idiomas con texto normativo propio. El resto lo ve en castellano. */
const CON_NORMATIVA = ['ca'];

/** En que idioma se muestran los motivos, condiciones y titulos de norma. */
export const IDIOMA_NORMATIVO = CON_NORMATIVA.includes(IDIOMA) ? IDIOMA : IDIOMA_BASE;

/**
 * Cierto cuando la interfaz va en un idioma pero el texto normativo va en
 * otro. El panel lo dice una vez, arriba, en vez de marcar cada frase.
 */
export const NORMATIVA_EN_OTRO_IDIOMA = IDIOMA !== IDIOMA_NORMATIVO;

let CATALOGO = null;

/**
 * Carga el catalogo normativo del idioma activo, si lo hay.
 *
 * Aparte del bundle y solo cuando hace falta: son unos 300 kB de texto, que
 * junto a los cuatro catalogos de interfaz no tendrian por que viajar a quien
 * consulta el mapa en castellano.
 *
 * Un fallo al cargarlo no puede tumbar la aplicacion: sin catalogo el panel
 * pinta el castellano, que es exactamente lo que hace ya para el ingles y el
 * aleman. Se avisa por consola y se sigue.
 */
export async function cargaNormativa() {
  if (IDIOMA_NORMATIVO === IDIOMA_BASE) return;
  try {
    const modulo = await import(`./normativa/${IDIOMA_NORMATIVO}.js`);
    CATALOGO = modulo.default;
  } catch (e) {
    console.warn(`i18n: no se ha podido cargar el texto normativo en ${IDIOMA_NORMATIVO}`, e);
  }
}

/**
 * Traduce una cadena de texto normativo, o la devuelve tal cual.
 *
 * Sin traduccion se ve el castellano. Eso es correcto y es el punto: el
 * original es siempre una respuesta valida, y una respuesta valida en otro
 * idioma es mejor que una traduccion que no se ha revisado.
 */
export function tn(texto) {
  if (typeof texto !== 'string' || !CATALOGO) return texto;
  return CATALOGO[texto] ?? texto;
}

/** Traduce una lista de condiciones. */
export function tnLista(textos) {
  return (textos ?? []).map(tn);
}
