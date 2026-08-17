/**
 * Localización: de un punto a las figuras de protección que lo contienen.
 *
 * Un punto en el mar puede caer a la vez dentro de varias figuras superpuestas
 * (una reserva marina y, dentro de ella, una reserva integral; o una zona de
 * alta protección y una zona especial de buceo con el mismo perímetro). Todas
 * aplican simultáneamente, así que aquí se devuelven todas, nunca solo una.
 */

import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import pointToLineDistance from '@turf/point-to-line-distance';

import { zonaEnIsla } from '../data/islas.js';

/** Filtra las geometrías de una isla concreta. */
export function filtraPorIsla(features, isla) {
  if (!isla) return features;
  return features.filter((f) => zonaEnIsla(isla, f.properties.isla));
}

// ---------------------------------------------------------------------------
// Índice de contorno por bloques
//
// La distancia al borde se calcula segmento a segmento, y con Natura 2000
// cargado hay contornos enormes: la ZEPA del norte de Mallorca tiene 171.000
// vértices porque su límite de tierra recorre toda la costa. Medir contra todos
// ellos, para las 47 figuras de la isla, tardaba 1,4 s en un portátil — varios
// segundos en el móvil de quien está en el agua pulsando «mi ubicación».
//
// El contorno se trocea en bloques de pocos vértices, cada uno con su caja
// envolvente. La distancia a esa caja es una cota INFERIOR de la distancia real
// al trozo, así que un bloque cuya caja ya está más lejos que el mejor
// resultado conocido no puede mejorarlo y se descarta sin medirlo.
//
// La poda es exacta, no una aproximación: el resultado es el mismo que medir
// todos los segmentos. Se recorre además por cota creciente, para dar pronto
// con un buen candidato y poder cortar antes.
// ---------------------------------------------------------------------------

/** Vértices por bloque. Menos poda mejor pero engorda el índice. */
const VERTICES_POR_BLOQUE = 128;

/**
 * Metros por grado por debajo del valor real en TODO el ámbito, no solo en su
 * centro. El caso que manda es la longitud en el extremo norte: 1° de latitud
 * son siempre ~111.132 m, pero 1° de longitud encoge con el coseno de la
 * latitud, y a 40,30° N —el borde norte del ámbito, las ZEPA de Menorca— son
 * ~84.900 m. El valor anterior, 85.000, dejaba de ser cota inferior justo ahí
 * y podía podar de más (un 0,13 % como mucho, pero el invariante es absoluto,
 * no estadístico). 84.000 conserva la cota hasta pasado 41° N. Quedarse corto
 * poda de menos, nunca de más; no subirlo para ganar velocidad.
 */
const METROS_POR_GRADO_MINIMO = 84000;

const indices = new WeakMap();

function anillosDe(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'Polygon') return geometry.coordinates;
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flat();
  return [];
}

function construyeIndice(feature) {
  const bloques = [];

  for (const anilloOriginal of anillosDe(feature.geometry)) {
    if (!Array.isArray(anilloOriginal) || anilloOriginal.length < 2) continue;

    // GeoJSON exige anillos cerrados, pero si alguno llegara abierto se
    // perdería su último segmento, y con él la posibilidad de que el borde más
    // cercano fuese justo ese.
    const primero = anilloOriginal[0];
    const ultimo = anilloOriginal[anilloOriginal.length - 1];
    const anillo =
      primero[0] === ultimo[0] && primero[1] === ultimo[1]
        ? anilloOriginal
        : [...anilloOriginal, primero];

    // El +1 del corte solapa un vértice entre bloques consecutivos: sin él, el
    // segmento que los une no pertenecería a ninguno.
    for (let i = 0; i < anillo.length - 1; i += VERTICES_POR_BLOQUE) {
      const puntos = anillo.slice(i, Math.min(i + VERTICES_POR_BLOQUE + 1, anillo.length));
      if (puntos.length < 2) continue;

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const [x, y] of puntos) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }

      bloques.push({
        minX,
        minY,
        maxX,
        maxY,
        linea: { type: 'LineString', coordinates: puntos },
      });
    }
  }

  return bloques;
}

function indiceDe(feature) {
  let indice = indices.get(feature);
  if (!indice) {
    indice = construyeIndice(feature);
    indices.set(feature, indice);
  }
  return indice;
}

/** Cota inferior, en metros, de la distancia del punto a una caja envolvente. */
function cotaInferior(punto, caja) {
  const dx = Math.max(caja.minX - punto.lon, 0, punto.lon - caja.maxX);
  const dy = Math.max(caja.minY - punto.lat, 0, punto.lat - caja.maxY);
  return Math.hypot(dx, dy) * METROS_POR_GRADO_MINIMO;
}

const cajas = new WeakMap();

/** Caja envolvente de una figura entera, para podar antes de entrar en ella. */
function cajaDe(feature) {
  let caja = cajas.get(feature);
  if (caja) return caja;

  caja = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  for (const b of indiceDe(feature)) {
    if (b.minX < caja.minX) caja.minX = b.minX;
    if (b.minY < caja.minY) caja.minY = b.minY;
    if (b.maxX > caja.maxX) caja.maxX = b.maxX;
    if (b.maxY > caja.maxY) caja.maxY = b.maxY;
  }
  cajas.set(feature, caja);
  return caja;
}

/**
 * Distancia con signo del punto al borde del polígono, en metros.
 * Negativa si el punto está dentro. Es la magnitud que permite responder
 * "estás 430 m dentro" y contrastarla con la precisión del GPS.
 */
export function distanciaAlBorde(punto, feature) {
  const geoPunto = { type: 'Point', coordinates: [punto.lon, punto.lat] };
  const indice = indiceDe(feature);
  if (indice.length === 0) return Infinity;

  // Dos pasadas en vez de ordenar los bloques por cota. Ordenar cuesta
  // k·log k en cada consulta, y con 1.340 bloques eso pesaba más que las pocas
  // medidas exactas que quedan tras podar. La primera pasada calcula las cotas
  // y se queda con el bloque más prometedor; medirlo da un `mejor` ya ajustado
  // con el que la segunda pasada descarta casi todo lo demás.
  const cotas = new Float64Array(indice.length);
  let candidato = 0;
  for (let i = 0; i < indice.length; i++) {
    cotas[i] = cotaInferior(punto, indice[i]);
    if (cotas[i] < cotas[candidato]) candidato = i;
  }

  let mejor = pointToLineDistance(geoPunto, indice[candidato].linea, { units: 'meters' });
  for (let i = 0; i < indice.length; i++) {
    if (i === candidato || cotas[i] >= mejor) continue;
    const d = pointToLineDistance(geoPunto, indice[i].linea, { units: 'meters' });
    if (d < mejor) mejor = d;
  }

  return booleanPointInPolygon(geoPunto, feature) ? -mejor : mejor;
}

/**
 * Figuras que contienen el punto, ordenadas de la más general a la más
 * restrictiva. Se usa el área como proxy de generalidad: el perímetro amplio
 * de una reserva es siempre mayor que las zonas interiores que acota.
 */
export function figurasEn(punto, features) {
  const geoPunto = { type: 'Point', coordinates: [punto.lon, punto.lat] };

  return features
    .filter((f) => booleanPointInPolygon(geoPunto, f))
    .map((f) => ({
      feature: f,
      zoneId: f.properties.zoneId,
      featureId: f.properties.featureId,
      nombre: f.properties.nombre,
      proteccion: f.properties.proteccion,
      competencia: f.properties.competencia,
      fuente: f.properties.fuente,
      normas: f.properties.normas ?? [],
      areaKm2: f.properties.areaKm2,
      metrosAlBorde: Math.abs(distanciaAlBorde(punto, f)),
    }))
    .sort((a, b) => b.areaKm2 - a.areaKm2);
}

/**
 * Radio que se asume cuando el GPS no informa de su precisión.
 *
 * Un receptor de móvil ronda los 5-20 m a cielo abierto y empeora hasta varias
 * decenas con mala geometría de satélites o rebotes; 50 m cubre el peor caso
 * razonable. Se elige por exceso a propósito: no saber la precisión es MENOS
 * información que tener una mala, y el veredicto debe empeorar, no mejorar.
 */
export const PRECISION_DESCONOCIDA_M = 50;

/**
 * Certeza de la posición frente a un límite, dada la precisión del GPS.
 *
 * En el mar un sí/no es engañoso: a 8 m del límite con precisión de ±15 m no se
 * puede afirmar de qué lado se está. Devolver 'dudosa' es la respuesta honesta,
 * y para quien navega vale más que una certeza inventada.
 *
 * Si la precisión llega ausente o no finita (accuracy puede venir undefined,
 * NaN o Infinity según receptor y navegador) NO se trata como precisión
 * perfecta: r = 0 convertía la incertidumbre máxima en certeza máxima, un
 * «estás fuera» rotundo a 2 m del límite. Se asume el radio conservador.
 */
export function certezaFrenteALimite(distanciaFirmada, precisionMetros) {
  const r = Number.isFinite(precisionMetros)
    ? Math.max(precisionMetros, 0)
    : PRECISION_DESCONOCIDA_M;
  if (distanciaFirmada < -r) return 'dentro';
  if (distanciaFirmada > r) return 'fuera';
  return 'dudosa';
}

/**
 * Evalúa la posición del usuario: qué figuras lo contienen, a qué distancia
 * del límite más cercano está y si esa distancia es concluyente con la
 * precisión de su GPS.
 */
export function evaluaPosicion(punto, features, precisionMetros) {
  const dentroDe = figurasEn(punto, features);

  // La misma poda que dentro de cada figura, pero un nivel más arriba: se
  // recorren en orden de caja envolvente más próxima y se abandona en cuanto la
  // caja de la siguiente ya está más lejos que el mejor borde encontrado.
  // Buscando el límite más cercano a un punto de la costa de llevant, así no se
  // llega a tocar la ZEPA del poniente ni la del norte, que son las caras.
  const candidatos = features
    .map((f) => ({ f, cota: cotaInferior(punto, cajaDe(f)) }))
    .sort((a, b) => a.cota - b.cota);

  let masCercana = null;
  for (const { f, cota } of candidatos) {
    if (masCercana && cota >= Math.abs(masCercana.distancia)) break;
    const d = distanciaAlBorde(punto, f);
    if (!masCercana || Math.abs(d) < Math.abs(masCercana.distancia)) {
      masCercana = {
        distancia: d,
        zoneId: f.properties.zoneId,
        nombre: f.properties.nombre,
        proteccion: f.properties.proteccion,
      };
    }
  }

  const certeza = masCercana
    ? certezaFrenteALimite(masCercana.distancia, precisionMetros)
    : 'fuera';

  return {
    dentroDe,
    masCercana,
    certeza,
    precisionMetros: Number.isFinite(precisionMetros) ? precisionMetros : null,
    // Aunque el punto esté claramente dentro de una figura, si el borde de otra
    // queda dentro del margen de error hay que advertirlo igualmente.
    limiteAmbiguo: certeza === 'dudosa',
  };
}
