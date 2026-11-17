/**
 * Google Analytics, cargado solo si el usuario lo acepta.
 *
 * `gtag.js` escribe una cookie de seguimiento, y en España eso exige
 * consentimiento previo (RGPD/LSSI). Por eso este módulo no toca la red hasta
 * que `cargaAnalytics()` se llama explícitamente desde el banner de
 * consentimiento tras un «Aceptar» — nunca al arrancar la aplicación, y nunca
 * si el usuario rechaza o no ha respondido todavía.
 */

export const ID_MEDICION = 'G-WFJXV7DW2Z';

let cargado = false;

export function cargaAnalytics() {
  // Por si se aceptó, se rechazó y se vuelve a aceptar sin recargar.
  window[`ga-disable-${ID_MEDICION}`] = false;
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

/**
 * Deja de medir cuando alguien retira el consentimiento que había dado.
 *
 * `ga-disable-<ID>` es el interruptor documentado de gtag: con él a `true`, el
 * script ya cargado deja de enviar. Se borra además la cookie propia de esta
 * web. **`_ga` no se borra**: Google la escribe en el dominio padre y la
 * comparte con pecesmediterraneo.com, que tiene su propio aviso de cookies;
 * borrarla aquí sería decidir por la otra web. La política de privacidad lo
 * dice tal cual.
 *
 * Una cookie solo se borra si se acierta con el dominio con que se escribió, y
 * gtag elige el más amplio que el navegador le deje. Se prueba con todos los
 * candidatos: los que no casan no hacen nada.
 */
export function desactivaAnalytics() {
  window[`ga-disable-${ID_MEDICION}`] = true;

  const nombre = `_ga_${ID_MEDICION.replace(/^G-/, '')}`;
  const partes = window.location.hostname.split('.');
  const dominios = [''];
  for (let i = 0; i < partes.length - 1; i += 1) dominios.push(`.${partes.slice(i).join('.')}`);
  for (const dominio of dominios) {
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${dominio ? `; domain=${dominio}` : ''}`;
  }
}
