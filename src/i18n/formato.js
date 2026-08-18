/**
 * Formato de numeros, importes, distancias y horas segun el idioma activo.
 *
 * Antes de esto habia dos formateadores de distancia —uno en el panel y otro
 * en el veredicto de ubicacion— que hacian lo mismo con
 * `.toFixed(1).replace('.', ',')`. Ese `replace` es un separador decimal
 * castellano escrito a mano, y en aleman acierta por casualidad mientras que
 * en ingles produce «1,4 km» donde toca «1.4 km». Va todo por `Intl`, que sabe
 * lo que hace cada idioma.
 *
 * Las unidades no se convierten: metros y kilometros en los cuatro idiomas.
 * Esta web se usa a bordo en aguas espanolas, donde la carta nautica, la
 * norma y el GPS hablan en metros; dar millas a quien lee en ingles seria
 * traducir tambien la realidad.
 */

import { LOCALE, t } from './index.js';

/** Numero con los decimales que se le pidan, en el formato del idioma. */
export function numero(valor, decimales = 0) {
  return new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(valor);
}

/** Importes siempre con dos decimales: «53,90 €», nunca «53,9 EUR». */
export function moneda(importe, divisa = 'EUR') {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: divisa,
    minimumFractionDigits: 2,
  }).format(importe);
}

/**
 * Distancia legible: metros redondeados hasta el kilometro, y a partir de ahi
 * kilometros con un decimal.
 *
 * El corte esta en 1.000 m porque por debajo la precision importa —a 300 m de
 * un limite se decide si se cala o no— y por encima estorba: «12,4 km» dice lo
 * mismo que «12.437 m» y se lee de un vistazo.
 */
export function distancia(metros) {
  return metros >= 1000
    ? t('unidad.km', { valor: numero(metros / 1000, 1) })
    : t('unidad.m', { valor: numero(Math.round(metros)) });
}

/** Superficie en km², con un decimal como mucho. */
export function superficie(km2) {
  return t('unidad.km2', {
    valor: new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 }).format(km2),
  });
}

/** Hora local corta, para fechar la lectura del GPS. */
export function hora(ts) {
  return new Date(ts).toLocaleTimeString(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Grados y minutos decimales, que es como los pide una carta nautica y como
 * los muestra cualquier plotter de a bordo.
 *
 * El hemisferio va en la letra que le pasa quien llama, no traducida: N, S, E
 * y W son las mismas en las cartas de los cuatro idiomas.
 */
export function gradosLegibles(valor, positivo, negativo) {
  const abs = Math.abs(valor);
  const g = Math.floor(abs);
  const m = (abs - g) * 60;
  return `${g}° ${numero(m, 3)}' ${valor >= 0 ? positivo : negativo}`;
}
