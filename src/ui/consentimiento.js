/**
 * Banner de consentimiento para la cookie de analítica.
 *
 * Tres estados posibles, y solo tres: aceptado, rechazado o sin responder.
 * Sin responder es el único que muestra el banner al entrar; los otros dos son
 * silenciosos —incluido «aceptado», que en la siguiente visita carga
 * Analytics sin volver a preguntar—. La preferencia es una cookie funcional
 * más, como el idioma o la isla, y usa el mismo envoltorio de `cookies.js`.
 *
 * **Retirar el consentimiento tiene que ser tan fácil como darlo**, y durante
 * meses no se podía: una vez contestado, el banner no volvía nunca.
 * `abrePreferenciasCookies()` lo enseña otra vez a quien lo pida, desde «Qué
 * es este mapa» o entrando por `/#cookies`, que es adonde enlaza la política
 * de privacidad.
 */

import { t } from '../i18n/index.js';
import { leeCookie, escribeCookie } from './cookies.js';
import { cargaAnalytics, desactivaAnalytics } from './analytics.js';

const COOKIE_CONSENTIMIENTO = 'consentimiento-analitica';

/**
 * Adónde lleva «Más información». Relativa, como los demás enlaces internos
 * del index: la página legal no pasa por el bundle. Ver
 * `scripts/paginas/legales.mjs`.
 */
const RUTA_POLITICA = 'politica-de-privacidad/#cookies';

let aviso = null;

function muestraBanner() {
  if (aviso) return;
  const anterior = leeCookie(COOKIE_CONSENTIMIENTO);

  aviso = document.createElement('div');
  aviso.className = 'cookies';
  aviso.setAttribute('role', 'region');
  aviso.setAttribute('aria-label', t('legal.cookies'));

  const mensaje = document.createElement('p');
  mensaje.className = 'cookies__mensaje';
  mensaje.append(document.createTextNode(`${t('cookies.mensaje')} `));
  // El aviso es la primera capa: tiene que llevar a la segunda, que es donde
  // se dice quién es el responsable y qué hace exactamente la cookie.
  const masInfo = document.createElement('a');
  masInfo.href = RUTA_POLITICA;
  masInfo.textContent = t('cookies.masInfo');
  mensaje.append(masInfo);

  const acciones = document.createElement('div');
  acciones.className = 'cookies__acciones';

  const rechazar = document.createElement('button');
  rechazar.type = 'button';
  rechazar.className = 'boton';
  rechazar.textContent = t('cookies.rechazar');

  const aceptar = document.createElement('button');
  aceptar.type = 'button';
  aceptar.className = 'boton boton--principal';
  aceptar.textContent = t('cookies.aceptar');

  const cierra = (respuesta) => {
    escribeCookie(COOKIE_CONSENTIMIENTO, respuesta);
    aviso.remove();
    aviso = null;
  };

  rechazar.addEventListener('click', () => {
    cierra('rechazado');
    // Solo hay algo que deshacer si antes se había aceptado.
    if (anterior === 'aceptado') desactivaAnalytics();
  });
  aceptar.addEventListener('click', () => {
    cierra('aceptado');
    cargaAnalytics();
  });

  acciones.append(rechazar, aceptar);
  aviso.append(mensaje, acciones);
  document.body.append(aviso);
}

export function creaConsentimiento() {
  const guardado = leeCookie(COOKIE_CONSENTIMIENTO);

  if (guardado === 'aceptado') {
    cargaAnalytics();
    return;
  }
  if (guardado === 'rechazado') return;

  muestraBanner();
}

/** Vuelve a enseñar el banner, se haya contestado ya o no. */
export function abrePreferenciasCookies() {
  muestraBanner();
}
