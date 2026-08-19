/**
 * Banner de consentimiento para la cookie de analítica.
 *
 * Tres estados posibles, y solo tres: aceptado, rechazado o sin responder.
 * Sin responder es el único que muestra el banner; los otros dos son
 * silenciosos —incluido «aceptado», que en la siguiente visita carga
 * Analytics sin volver a preguntar—. La preferencia es una cookie funcional
 * más, como el idioma o la isla, y usa el mismo envoltorio de `cookies.js`.
 */

import { t } from '../i18n/index.js';
import { leeCookie, escribeCookie } from './cookies.js';
import { cargaAnalytics } from './analytics.js';

const COOKIE_CONSENTIMIENTO = 'consentimiento-analitica';

export function creaConsentimiento() {
  const guardado = leeCookie(COOKIE_CONSENTIMIENTO);

  if (guardado === 'aceptado') {
    cargaAnalytics();
    return;
  }
  if (guardado === 'rechazado') return;

  const aviso = document.createElement('div');
  aviso.className = 'cookies';
  aviso.setAttribute('role', 'region');
  aviso.setAttribute('aria-label', t('cookies.aceptar'));

  const mensaje = document.createElement('p');
  mensaje.className = 'cookies__mensaje';
  mensaje.textContent = t('cookies.mensaje');

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
  };

  rechazar.addEventListener('click', () => cierra('rechazado'));
  aceptar.addEventListener('click', () => {
    cierra('aceptado');
    cargaAnalytics();
  });

  acciones.append(rechazar, aceptar);
  aviso.append(mensaje, acciones);
  document.body.append(aviso);
}
