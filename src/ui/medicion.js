/**
 * Contador anónimo de consultas, sin cookies. Lo recibe `functions/api/evento.js`.
 *
 * Va aparte de `analytics.js` y no pasa por el banner de consentimiento, y es
 * deliberado: no guarda nada en el dispositivo ni lleva ningún identificador,
 * así que no hay seguimiento que consentir. Es lo que permite contar todas las
 * consultas y no solo las de quien acepta Google Analytics.
 *
 * Para que siga siendo así, este módulo no debe:
 *  - escribir cookies, localStorage ni nada persistente;
 *  - mandar un identificador de sesión, de visitante o de dispositivo;
 *  - mandar la posición del GPS. De una consulta por GPS solo sale el
 *    veredicto. De un clic en el mapa, una celda de ~1 km.
 *
 * Si algún día hace falta algo de eso, ya no es este contador: es analítica
 * con seguimiento y va detrás del consentimiento, en `analytics.js`.
 */

import { IDIOMA, esRastreador } from '../i18n/index.js';

const RUTA = '/api/evento';

/**
 * @param {object} resultado  lo que devuelve `resolver()`
 * @param {object} opciones
 * @param {'mapa'|'gps'} opciones.tipo
 * @param {string} opciones.isla       vista activa
 * @param {object} [opciones.veredicto] el de `veredictoUbicacion()`, solo GPS
 */
export function registraConsulta(resultado, { tipo, isla, veredicto = null }) {
  // En desarrollo no hay función que conteste, y un rastreador que renderiza
  // la página no es una consulta de nadie.
  if (import.meta.env.DEV || esRastreador()) return;

  try {
    const figuras = resultado.figuras.map((f) => f.zoneId);
    // La más específica es la de menor área: la que mejor dice dónde se
    // estaba mirando cuando hay varias apiladas.
    const principal = resultado.figuras.reduce(
      (min, f) => (min && min.areaKm2 <= f.areaKm2 ? min : f),
      null,
    );
    const estados = {};
    for (const [clave, a] of Object.entries(resultado.actividades)) estados[clave] = a.status;

    const evento = {
      tipo,
      isla,
      idioma: IDIOMA,
      figuras,
      figuraPrincipal: principal?.zoneId ?? null,
      estados,
    };
    if (tipo === 'gps') {
      evento.nivelGps = veredicto?.nivel ?? null;
    } else {
      evento.lat = Math.round(resultado.punto.lat * 100) / 100;
      evento.lon = Math.round(resultado.punto.lon * 100) / 100;
    }

    // text/plain y no application/json: es un tipo «simple» y sendBeacon no
    // tiene que negociar nada. La función lee el cuerpo como texto igualmente.
    const cuerpo = new Blob([JSON.stringify(evento)], { type: 'text/plain' });
    if (!navigator.sendBeacon?.(RUTA, cuerpo)) {
      fetch(RUTA, { method: 'POST', body: cuerpo, keepalive: true }).catch(() => {});
    }
  } catch {
    // Medir nunca puede romper una consulta que ya está en pantalla.
  }
}
