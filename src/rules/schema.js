/**
 * Esquema y validación del modelo de reglas.
 *
 * Principios que esta validación hace cumplir:
 *
 *  1. El estado de una actividad es un enum, no una combinación de booleanos.
 *     `permitida: true` + `requiereAutorizacion: true` + `salvoEnZonaX: true`
 *     es ambiguo de leer y fácil de contradecir; un solo estado no lo es.
 *  2. Ninguna afirmación sin fuente. Toda actividad con estado distinto de
 *     `unknown` debe citar al menos una fuente.
 *  3. Las tasas viven dentro de cada `permit`, con su `ultimaVerificacion`.
 *     No hay constante global de importes: no todas las reservas permiten las
 *     mismas modalidades y los importes cambian.
 *  4. `normas` siempre es una lista. Una figura puede estar afectada por su
 *     norma de creación, modificaciones posteriores y normativa general.
 */

export const ESTADOS_VALIDOS = [
  'allowed',
  'allowed_with_authorization',
  'restricted',
  'prohibited',
  // Distinto de `unknown`: aquí SÍ se ha consultado la norma de la zona, y esa
  // norma concreta no dice nada sobre esta actividad. Es una afirmación
  // positiva (por eso exige fuente), no un hueco. `unknown` significa "no lo
  // hemos investigado"; `not_regulated` significa "lo hemos investigado y esta
  // figura no impone nada — puede seguir aplicando normativa general u otra
  // figura superpuesta".
  'not_regulated',
  'unknown',
];

export const ACTIVIDADES_VALIDAS = [
  'pescaRecreativaEmbarcacion',
  'pescaSubmarina',
  'pescaDesdeCosta',
  'buceo',
  'fondeo',
  'navegacion',
];

// `derogada` no describe un papel distinto de los otros tres, sino una norma
// que ya no puede sostener ninguna afirmación y que solo se conserva como
// antecedente: el caso del Decret 38/2022, cuyo articulado deroga entero el
// Decret 26/2025 pero bajo el que IDEIB sigue publicando dos geometrías. Se
// declara para que una norma así no pueda pasar por vigente en una ficha.
export const TIPOS_NORMA = ['creacion', 'modificacion', 'general', 'derogada'];

/**
 * Valida una ficha. Devuelve la lista de problemas encontrados; vacía si es
 * correcta.
 */
export function validaFicha(ficha, { zoneIdsConocidos } = {}) {
  const p = [];
  const donde = ficha?.zoneId ?? '(sin zoneId)';

  if (!ficha?.zoneId) p.push('falta zoneId');
  else if (zoneIdsConocidos && !zoneIdsConocidos.has(ficha.zoneId)) {
    p.push(`${donde}: zoneId huérfano, no existe en protected-areas.geojson`);
  }

  if (!ficha?.nombreCorto) p.push(`${donde}: falta nombreCorto`);
  if (!ficha?.ultimaRevision) p.push(`${donde}: falta ultimaRevision`);

  if (ficha?.heredaDe) {
    if (ficha.heredaDe === ficha.zoneId) {
      p.push(`${donde}: heredaDe apunta a sí misma`);
    } else if (zoneIdsConocidos && !zoneIdsConocidos.has(ficha.heredaDe)) {
      p.push(`${donde}: heredaDe "${ficha.heredaDe}" no existe en protected-areas.geojson`);
    }
  }

  if (!Array.isArray(ficha?.normas)) {
    p.push(`${donde}: normas debe ser un array`);
  } else {
    for (const n of ficha.normas) {
      if (!n.titulo) p.push(`${donde}: una norma no tiene título`);
      if (n.tipo && !TIPOS_NORMA.includes(n.tipo)) {
        p.push(`${donde}: tipo de norma no válido "${n.tipo}"`);
      }
    }
  }

  const acts = ficha?.actividades ?? {};
  for (const [clave, regla] of Object.entries(acts)) {
    if (!ACTIVIDADES_VALIDAS.includes(clave)) {
      p.push(`${donde}: actividad desconocida "${clave}"`);
      continue;
    }
    if (!ESTADOS_VALIDOS.includes(regla?.status)) {
      p.push(`${donde}/${clave}: status no válido "${regla?.status}"`);
      continue;
    }
    if (regla.status !== 'unknown') {
      if (!Array.isArray(regla.sources) || regla.sources.length === 0) {
        p.push(`${donde}/${clave}: estado "${regla.status}" sin ninguna fuente citada`);
      }
      if (!regla.motivo) {
        p.push(`${donde}/${clave}: falta motivo en lenguaje llano`);
      }
    }
    if (regla.status === 'allowed_with_authorization' && !regla.permit) {
      p.push(`${donde}/${clave}: requiere autorización pero no describe el permiso`);
    }
    if (regla.permit && !regla.permit.ultimaVerificacion) {
      p.push(`${donde}/${clave}: el permiso no lleva ultimaVerificacion`);
    }
    if (regla.conditions && !Array.isArray(regla.conditions)) {
      p.push(`${donde}/${clave}: conditions debe ser un array`);
    }
  }

  return p;
}

/**
 * Resuelve la herencia de reglas entre una zona y la reserva que la contiene.
 *
 * Una zona interior se rige por el régimen general de su reserva salvo en lo
 * que su propia norma modifique. Sin esto habría que duplicar las reglas
 * generales en cada ficha hija, o dejarlas en `unknown` y mostrar «información
 * incompleta» allí donde en realidad sí se sabe qué se aplica.
 *
 * Dos decisiones importantes:
 *
 *  - **Una regla propia `unknown` NO borra la heredada.** Que la norma
 *    específica calle sobre el fondeo significa que rige el régimen general de
 *    la reserva, no que se desconozca.
 *  - **Las normas se acumulan.** La hija queda sujeta a su norma y a la de la
 *    reserva, así que el panel debe poder enseñar las dos.
 *
 * La herencia se DECLARA en cada ficha. Nunca se deduce de la geometría: en el
 * Migjorn las zonas de veda e integral son polígonos adyacentes al perímetro
 * general, no interiores, y heredar allí sería jurídicamente falso.
 */
export function resuelveHerencia(fichas) {
  const porId = new Map(fichas.map((f) => [f.zoneId, f]));
  const resueltas = new Map();
  const enCurso = new Set();

  function resolverUna(zoneId, cadena = []) {
    if (resueltas.has(zoneId)) return resueltas.get(zoneId);

    const ficha = porId.get(zoneId);
    if (!ficha) return null;

    if (enCurso.has(zoneId)) {
      throw new Error(`Ciclo de herencia: ${[...cadena, zoneId].join(' -> ')}`);
    }
    enCurso.add(zoneId);

    const base = {};
    const normas = [...(ficha.normas ?? [])];

    if (ficha.heredaDe) {
      const madre = resolverUna(ficha.heredaDe, [...cadena, zoneId]);
      if (!madre) {
        throw new Error(`${zoneId} declara heredaDe "${ficha.heredaDe}", que no tiene ficha`);
      }
      for (const [clave, regla] of Object.entries(madre.actividades ?? {})) {
        if (!regla || regla.status === 'unknown') continue;
        base[clave] = {
          ...regla,
          heredadaDe: { zoneId: madre.zoneId, nombreCorto: madre.nombreCorto },
        };
      }
      const vistas = new Set(normas.map((n) => `${n.titulo}|${n.url}`));
      for (const n of madre.normas ?? []) {
        const k = `${n.titulo}|${n.url}`;
        if (!vistas.has(k)) {
          vistas.add(k);
          normas.push(n);
        }
      }
    }

    const actividades = { ...base };
    for (const [clave, regla] of Object.entries(ficha.actividades ?? {})) {
      const propiaVacia = !regla || regla.status === 'unknown';
      if (propiaVacia && base[clave]) continue;
      actividades[clave] = regla;
    }

    const resuelta = { ...ficha, actividades, normas };
    enCurso.delete(zoneId);
    resueltas.set(zoneId, resuelta);
    return resuelta;
  }

  return fichas.map((f) => resolverUna(f.zoneId));
}

/** Ayuda para declarar un permiso de forma homogénea. */
export function permiso({ importe, moneda = 'EUR', nota, vigencia, url, ultimaVerificacion }) {
  return { importe, moneda, nota, vigencia, url, ultimaVerificacion };
}
