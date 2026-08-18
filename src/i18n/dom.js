/**
 * Traduccion del contenido estatico de index.html.
 *
 * El HTML se escribe en castellano y lleva las claves marcadas con atributos
 * `data-i18n*`. Esto no es indireccion por gusto: el castellano tiene que
 * seguir estando **en el fichero**, no en un catalogo, porque es lo unico que
 * ve un rastreador que no ejecute JavaScript. El bloque «Que es este mapa»
 * existe justamente para eso —sin el, un rastreador veia once palabras— y
 * vaciarlo para rellenarlo desde JS lo devolveria a cero.
 *
 * Asi que el castellano es lo que hay escrito y lo demas es una sustitucion
 * encima. Cuando el idioma activo es el castellano, esta funcion no toca nada.
 */

import { IDIOMA, IDIOMA_BASE, LOCALE, t } from './index.js';

/**
 * Atributo `data-i18n*` -> como se aplica.
 *
 * `data-i18n` escribe texto y `data-i18n-html` marcado. Estan separados a
 * proposito: casi todo es texto, y que el caso por defecto sea el que no
 * interpreta etiquetas es la unica forma de que anadir una cadena manana no
 * sea una decision de seguridad.
 */
const APLICADORES = {
  'data-i18n': (nodo, texto) => {
    nodo.textContent = texto;
  },
  'data-i18n-html': (nodo, texto) => {
    nodo.innerHTML = texto;
  },
  'data-i18n-aria-label': (nodo, texto) => nodo.setAttribute('aria-label', texto),
  'data-i18n-placeholder': (nodo, texto) => nodo.setAttribute('placeholder', texto),
  'data-i18n-title': (nodo, texto) => nodo.setAttribute('title', texto),
};

/**
 * Aplica el idioma activo al documento ya cargado.
 *
 * Se llama antes de montar el mapa, para que no haya un fotograma con la
 * cabecera en un idioma y el panel en otro.
 */
export function traduceDocumento(raiz = document) {
  // `lang` se pone siempre, tambien en castellano: el documento declara `es` en
  // el HTML y si el usuario elige otro idioma hay que corregirlo, o el lector
  // de pantalla leera aleman con fonetica castellana y el navegador partira las
  // palabras por las reglas equivocadas.
  document.documentElement.lang = LOCALE;

  if (IDIOMA === IDIOMA_BASE) return;

  for (const [atributo, aplica] of Object.entries(APLICADORES)) {
    for (const nodo of raiz.querySelectorAll(`[${atributo}]`)) {
      aplica(nodo, t(nodo.getAttribute(atributo)));
    }
  }

  document.title = t('app.tituloDocumento');

  // La descripcion no la lee nadie con la pagina abierta, pero si el navegador
  // al guardarla en favoritos y quien comparte el enlace desde el propio
  // navegador. Cuesta una linea.
  const descripcion = document.querySelector('meta[name="description"]');
  if (descripcion) descripcion.setAttribute('content', t('app.metaDescripcion'));
}
