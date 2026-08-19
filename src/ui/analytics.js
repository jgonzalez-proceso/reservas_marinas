/**
 * Google Analytics, cargado solo si el usuario lo acepta.
 *
 * `gtag.js` escribe una cookie de seguimiento, y en España eso exige
 * consentimiento previo (RGPD/LSSI). Por eso este módulo no toca la red hasta
 * que `cargaAnalytics()` se llama explícitamente desde el banner de
 * consentimiento tras un «Aceptar» — nunca al arrancar la aplicación, y nunca
 * si el usuario rechaza o no ha respondido todavía.
 */

const ID_MEDICION = 'G-WFJXV7DW2Z';

let cargado = false;

export function cargaAnalytics() {
  if (cargado) return;
  cargado = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', ID_MEDICION);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID_MEDICION}`;
  document.head.append(script);
}
