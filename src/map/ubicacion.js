/**
 * Geolocalización: "¿estoy dentro?".
 *
 * Un sí/no es engañoso en el mar. A 8 m del límite con una precisión GPS de
 * ±15 m no se puede afirmar de qué lado se está, y una embarcación que se fía
 * de una certeza inventada acaba sancionada. Aquí se devuelve siempre la
 * distancia al límite junto a la precisión del receptor, y cuando la una cae
 * dentro de la otra se dice claramente que no es determinable.
 */

import { evaluaPosicion, PRECISION_DESCONOCIDA_M } from '../engine/locate.js';
import { t } from '../i18n/index.js';
import { distancia as formateaDistancia, hora } from '../i18n/formato.js';

export function pideUbicacion() {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error(t('ubicacion.noSoportada')));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          precisionMetros: pos.coords.accuracy,
          // Momento de la lectura, no de la respuesta: con maximumAge la
          // posición puede venir de caché y ser anterior a la pulsación.
          obtenidaEn: pos.timestamp,
        }),
      (err) => {
        // Los códigos son los de la especificación: 1 PERMISSION_DENIED,
        // 2 POSITION_UNAVAILABLE, 3 TIMEOUT.
        const mensajes = {
          1: 'ubicacion.denegada',
          2: 'ubicacion.noDeterminada',
          3: 'ubicacion.tiempoAgotado',
        };
        reject(new Error(t(mensajes[err.code] ?? 'ubicacion.errorGenerico')));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 },
    );
  });
}

/**
 * Traduce la evaluación geométrica a un veredicto legible.
 * Devuelve { nivel, titulo, detalle } donde nivel ∈ dentro | fuera | dudosa.
 */
export function veredictoUbicacion(punto, features, precisionMetros, { obtenidaEn = null } = {}) {
  const ev = evaluaPosicion(punto, features, precisionMetros);
  // El veredicto es una foto, no un seguimiento: una embarcación deriva, y
  // «estás 40 m dentro» envejece sin avisar. Fechar la lectura deja claro de
  // cuándo es la respuesta y que para saber dónde se está AHORA hay que volver
  // a pulsar.
  const sello = Number.isFinite(obtenidaEn) ? t('ubicacion.sello', { hora: hora(obtenidaEn) }) : '';
  // Cuando el receptor no declara su precisión, el motor asume un radio
  // conservador; el texto lo dice tal cual, en vez de callarse el margen con
  // el que se ha decidido el veredicto.
  const precision = Number.isFinite(precisionMetros)
    ? `±${Math.round(precisionMetros)} m`
    : t('ubicacion.precisionDesconocida', { metros: PRECISION_DESCONOCIDA_M });

  if (ev.certeza === 'dudosa' && ev.masCercana) {
    return {
      nivel: 'dudosa',
      titulo: t('ubicacion.dudosaTitulo'),
      detalle:
        t('ubicacion.dudosaDetalle', {
          distancia: formateaDistancia(Math.abs(ev.masCercana.distancia)),
          nombre: ev.masCercana.nombre,
          precision,
        }) + sello,
      evaluacion: ev,
    };
  }

  if (ev.dentroDe.length > 0) {
    const principal = ev.dentroDe[ev.dentroDe.length - 1];
    return {
      nivel: 'dentro',
      titulo: t('ubicacion.dentroTitulo', { nombre: principal.nombre }),
      detalle:
        t('ubicacion.dentroDetalle', { distancia: formateaDistancia(principal.metrosAlBorde) }) +
        (ev.dentroDe.length > 1
          ? t('ubicacion.dentroVarias', { n: ev.dentroDe.length })
          : '') +
        t('ubicacion.precisionGps', { precision }) +
        sello,
      evaluacion: ev,
    };
  }

  return {
    nivel: 'fuera',
    titulo: t('ubicacion.fueraTitulo'),
    detalle:
      (ev.masCercana
        ? t('ubicacion.fueraDetalle', {
            nombre: ev.masCercana.nombre,
            distancia: formateaDistancia(Math.abs(ev.masCercana.distancia)),
          })
        : '') +
      t('ubicacion.precisionGps', { precision }).trimStart() +
      sello,
    evaluacion: ev,
  };
}
