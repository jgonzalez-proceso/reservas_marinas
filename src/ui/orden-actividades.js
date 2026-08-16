/**
 * Orden de las tarjetas de actividad, elegido por el usuario y persistido en
 * cookie para que sobreviva a cerrar la pestaña o la app.
 *
 * La cookie guarda solo las claves de `ACTIVIDADES`. Si esa lista cambia en
 * una versión futura (se añade o se retira una actividad), el orden guardado
 * se depura contra la lista vigente: las claves desconocidas se descartan y
 * las nuevas se añaden al final, en vez de perder el resto del orden guardado
 * o dejar una actividad sin tarjeta.
 */

import { ACTIVIDADES } from '../engine/resolve.js';
import { leeCookie, escribeCookie } from './cookies.js';

const COOKIE_ORDEN = 'orden-actividades';

export function leeOrdenActividades() {
  const claves = Object.keys(ACTIVIDADES);
  const guardado = leeCookie(COOKIE_ORDEN);
  if (!guardado) return claves;

  let orden;
  try {
    orden = JSON.parse(guardado);
  } catch {
    return claves;
  }
  if (!Array.isArray(orden)) return claves;

  const conocidas = orden.filter((c) => claves.includes(c));
  const faltan = claves.filter((c) => !conocidas.includes(c));
  return [...conocidas, ...faltan];
}

export function guardaOrdenActividades(orden) {
  escribeCookie(COOKIE_ORDEN, JSON.stringify(orden));
}
