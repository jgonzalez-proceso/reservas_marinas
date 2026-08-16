/**
 * Geolocalización: "¿estoy dentro?".
 *
 * Un sí/no es engañoso en el mar. A 8 m del límite con una precisión GPS de
 * ±15 m no se puede afirmar de qué lado se está, y una embarcación que se fía
 * de una certeza inventada acaba sancionada. Aquí se devuelve siempre la
 * distancia al límite junto a la precisión del receptor, y cuando la una cae
 * dentro de la otra se dice claramente que no es determinable.
 */

import { evaluaPosicion } from '../engine/locate.js';

export function pideUbicacion() {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Este navegador no permite obtener la ubicación.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          precisionMetros: pos.coords.accuracy,
        }),
      (err) => {
        const mensajes = {
          1: 'Has denegado el acceso a la ubicación.',
          2: 'No se ha podido determinar la posición.',
          3: 'La obtención de la posición ha tardado demasiado.',
        };
        reject(new Error(mensajes[err.code] ?? 'No se ha podido obtener la ubicación.'));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 },
    );
  });
}

const metros = (m) =>
  m >= 1000 ? `${(m / 1000).toFixed(1).replace('.', ',')} km` : `${Math.round(m)} m`;

/**
 * Traduce la evaluación geométrica a un veredicto legible.
 * Devuelve { nivel, titulo, detalle } donde nivel ∈ dentro | fuera | dudosa.
 */
export function veredictoUbicacion(punto, features, precisionMetros) {
  const ev = evaluaPosicion(punto, features, precisionMetros);
  const precision = Number.isFinite(precisionMetros) ? `±${Math.round(precisionMetros)} m` : null;

  if (ev.certeza === 'dudosa' && ev.masCercana) {
    return {
      nivel: 'dudosa',
      titulo: 'Posición dudosa',
      detalle:
        `Estás aproximadamente a ${metros(Math.abs(ev.masCercana.distancia))} del límite de ` +
        `${ev.masCercana.nombre}. Precisión GPS actual: ${precision ?? 'desconocida'}. ` +
        'No es posible determinar con seguridad si estás dentro o fuera.',
      evaluacion: ev,
    };
  }

  if (ev.dentroDe.length > 0) {
    const principal = ev.dentroDe[ev.dentroDe.length - 1];
    return {
      nivel: 'dentro',
      titulo: `Dentro de ${principal.nombre}`,
      detalle:
        `Estás aproximadamente ${metros(principal.metrosAlBorde)} dentro del límite.` +
        (ev.dentroDe.length > 1
          ? ` Este punto está afectado por ${ev.dentroDe.length} figuras de protección.`
          : '') +
        (precision ? ` Precisión GPS: ${precision}.` : ''),
      evaluacion: ev,
    };
  }

  return {
    nivel: 'fuera',
    titulo: 'Fuera de las zonas cargadas',
    detalle:
      (ev.masCercana
        ? `El límite más cercano, ${ev.masCercana.nombre}, está a ${metros(Math.abs(ev.masCercana.distancia))}. `
        : '') +
      (precision ? `Precisión GPS: ${precision}. ` : ''),
    evaluacion: ev,
  };
}
