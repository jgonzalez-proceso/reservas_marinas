#!/usr/bin/env node
/**
 * Descarga las fuentes activas del registro y genera los ficheros de datos.
 *
 *   src/data/protected-areas.geojson   polígonos normalizados
 *   src/data/hitos.geojson             hitos oficiales (vértices publicados)
 *   src/data/manifest.json             procedencia, fecha, hash y recuentos
 *
 * Estos tres ficheros son GENERADOS. No se editan a mano.
 *
 * El script falla, en vez de decidir por su cuenta, cuando dos geometrías
 * canónicamente idénticas traen atributos jurídicos distintos.
 */

import { createHash } from 'node:crypto';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import area from '@turf/area';
import { SOURCES } from '../src/sources/registry.js';
import {
  canonicalGeometryKey,
  fusionaDesignaciones,
  normalizeAttrs,
  normasDesdeAtributos,
  zoneIdFor,
} from '../src/sources/normalize.js';
import { ISLAS, ISLAS_POR_ZONA, zonaEnIsla } from '../src/data/islas.js';
import { N2000_MARINO } from '../src/data/natura2000-marino.js';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PAGINA = 1000;
const ATRIBUTOS_JURIDICOS = ['proteccion', 'competencia', 'ambito', 'normaTitulo', 'normaUrl'];

/**
 * Área mínima, en m², para considerar una geometría utilizable.
 *
 * La capa oficial arrastra registros residuales de figuras derogadas reducidos
 * a un cuadrado de pocos centímetros: «Reserva Marina Illes Malgrats»
 * (OBJECTID 3566) mide 10 cm × 10 cm y no lleva norma asociada, resto de la
 * reserva antigua que sustituyó el Decret 26/2025.
 *
 * Una geometría así no puede contener ningún punto, así que es invisible para
 * el motor, pero ocupa una línea del listado de zonas como si fuera real. Se
 * descarta, y se deja constancia en consola y en manifest.json: un dato oficial
 * nunca se elimina en silencio.
 */
const AREA_MINIMA_M2 = 100;

/** Subdirectorio de src/data con las capas que descarga el navegador. */
const CAPAS_WEB = 'capas';

/** A partir de aquí, el listado de descartadas se resume en consola. */
const MAX_DESCARTADAS_EN_CONSOLA = 20;

/** Registro de lo descartado, para dejarlo escrito en manifest.json. */
const descartadas = [];

const log = (...a) => console.log(...a);

async function consultaCapa(servicio, capaId, where = '1=1') {
  const acumulado = [];
  let offset = 0;

  for (;;) {
    const url =
      `${servicio}/${capaId}/query?` +
      new URLSearchParams({
        where,
        outFields: '*',
        outSR: '4326',
        returnGeometry: 'true',
        geometryPrecision: '6',
        resultOffset: String(offset),
        resultRecordCount: String(PAGINA),
        f: 'geojson',
      });

    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} en ${servicio}/${capaId}`);
    const json = await res.json();
    if (json.error) throw new Error(`Servicio devolvió error: ${JSON.stringify(json.error)}`);

    const lote = json.features ?? [];
    acumulado.push(...lote);
    if (lote.length < PAGINA) return acumulado;
    offset += lote.length;
    if (offset > 100000) throw new Error('Paginación desbocada; abortando.');
  }
}

const seleccion = (attrs) =>
  Object.fromEntries(ATRIBUTOS_JURIDICOS.map((c) => [c, attrs[c] ?? null]));

/**
 * Deduplicación conservadora.
 *
 * Geometría idéntica NO implica duplicado. Sobre un mismo trozo de mar pueden
 * recaer varias figuras jurídicas distintas con el mismo perímetro: l'Illa del
 * Toro y les Illes Malgrats son a la vez zona d'alta protecció (Decret 26/2025)
 * y zona especial de busseig (Decret 38/2022), con geometría coincidente. Las
 * dos están vigentes y las dos deben conservarse.
 *
 * Por tanto la clave de deduplicación es geometría canónica + zoneId:
 *
 *   misma geometría, mismo zoneId, mismos atributos  -> duplicado, se descarta
 *   misma geometría, mismo zoneId, atributos distintos -> CONTRADICCIÓN, falla
 *   misma geometría, distinto zoneId                 -> figuras superpuestas,
 *                                                       se conservan ambas
 *
 * El caso fatal es real: una misma figura legal no puede estar regida a la vez
 * por dos normas distintas. Eso requiere revisión humana contra el BOIB/BOE.
 * "El OBJECTID mayor gana" no tiene ninguna garantía jurídica y no se usa.
 */
function deduplica(entradas) {
  const porClave = new Map();
  const conflictos = [];
  const superpuestas = new Map();

  for (const e of entradas) {
    const clave = `${e.claveGeom}||${e.zoneId}`;
    const previo = porClave.get(clave);

    if (!previo) {
      porClave.set(clave, e);
      const lista = superpuestas.get(e.claveGeom) ?? [];
      lista.push(e);
      superpuestas.set(e.claveGeom, lista);
      continue;
    }

    const difieren = ATRIBUTOS_JURIDICOS.filter(
      (campo) => (previo.attrs[campo] ?? null) !== (e.attrs[campo] ?? null),
    );

    if (difieren.length > 0) {
      conflictos.push({
        campos: difieren,
        a: { objectId: previo.objectId, attrs: previo.attrs },
        b: { objectId: e.objectId, attrs: e.attrs },
      });
    }
    // Misma geometría, mismo zoneId, mismos atributos: duplicado limpio.
  }

  const solapes = [...superpuestas.values()].filter((g) => g.length > 1);
  return { unicas: [...porClave.values()], conflictos, solapes };
}

function informeConflictos(conflictos) {
  const lineas = [
    '',
    '  DEDUPLICACIÓN DETENIDA',
    '',
    `  ${conflictos.length} par(es) de geometrías idénticas traen atributos jurídicos distintos.`,
    '  El script no elige por su cuenta: requiere revisión manual contra el BOIB/BOE.',
    '',
  ];
  for (const c of conflictos.slice(0, 10)) {
    lineas.push(`  Campos en conflicto: ${c.campos.join(', ')}`);
    lineas.push(`    OBJECTID ${c.a.objectId}: ${JSON.stringify(seleccion(c.a.attrs))}`);
    lineas.push(`    OBJECTID ${c.b.objectId}: ${JSON.stringify(seleccion(c.b.attrs))}`);
    lineas.push('');
  }
  if (conflictos.length > 10) lineas.push(`  … y ${conflictos.length - 10} más.`);
  return lineas.join('\n');
}

/**
 * Fusiona las designaciones de un mismo espacio repartidas por varias capas.
 *
 * Un espacio Natura 2000 declarado a la vez LIC y ZEPA lo publica el servicio
 * dos veces, una por capa, con el mismo código, el mismo OBJECTID y la misma
 * geometría. Es una sola figura jurídica: el art. 2 del Decret 91/2023 la
 * lista una vez como «LIC i ZEPA». Aquí se le da esa denominación única antes
 * de calcular el zoneId, de modo que las dos copias colapsen luego en la
 * deduplicación normal en vez de convertirse en dos zonas con la misma ficha.
 */
function fusionaPorCodigo(entradas) {
  const porCodigo = new Map();
  for (const e of entradas) {
    const c = e.attrs.codigo;
    if (!c) continue;
    if (!porCodigo.has(c)) porCodigo.set(c, []);
    porCodigo.get(c).push(e);
  }

  const fusionados = [];
  for (const [codigo, grupo] of porCodigo) {
    const proteccion = fusionaDesignaciones(grupo.map((e) => e.attrs.designacion));
    if (grupo.length > 1) {
      log(`    ${codigo} aparece en ${grupo.length} capas -> «${proteccion}»`);
    }
    for (const e of grupo) e.attrs.proteccion = proteccion;
    fusionados.push(...grupo);
  }
  return fusionados;
}

async function procesaFuente(source) {
  const hitos = [];
  const capasInfo = [];
  const crudas = [];

  for (const capa of source.capas) {
    log(`  · capa ${capa.id} (${capa.rol}) — ${capa.nombre}`);
    const features = await consultaCapa(source.servicio, capa.id, source.filtroWhere);
    log(`    ${features.length} features crudas`);
    capasInfo.push({ id: capa.id, rol: capa.rol, nombre: capa.nombre, crudas: features.length });

    const entradas = features.map((f) => {
      const attrs = normalizeAttrs(capa, f.properties);
      return {
        objectId: f.properties?.OBJECTID ?? f.properties?.OBJECTID_12 ?? f.id ?? null,
        attrs,
        geometry: f.geometry,
        claveGeom: canonicalGeometryKey(f.geometry),
        capa,
      };
    });

    if (capa.rol === 'hitos') {
      for (const e of entradas) e.zoneId = zoneIdFor(source, e.attrs);
      hitos.push(...entradas);
      continue;
    }

    crudas.push(...entradas);
  }

  // El filtro de la fuente se aplica también aquí, y no solo en la consulta:
  // `filtroWhere` es una optimización de red, `incluye` es la regla.
  const admitidas = source.incluye ? crudas.filter((e) => source.incluye(e.attrs)) : crudas;
  if (admitidas.length < crudas.length) {
    log(`    ${crudas.length - admitidas.length} descartada(s) por no estar en la lista blanca`);
  }

  // La fusión ocurre antes del zoneId porque forma parte de la identidad.
  const preparadas = source.fusionaPor === 'codigo' ? fusionaPorCodigo(admitidas) : admitidas;
  for (const e of preparadas) e.zoneId = zoneIdFor(source, e.attrs);

  const { unicas, conflictos, solapes } = deduplica(preparadas);
  if (conflictos.length > 0) {
    console.error(informeConflictos(conflictos));
    process.exit(1);
  }
  log(`    ${unicas.length} tras deduplicar (${preparadas.length - unicas.length} duplicados)`);

  const utiles = [];
  for (const e of unicas) {
    const m2 = area({ type: 'Feature', geometry: e.geometry, properties: {} });
    if (m2 < AREA_MINIMA_M2) {
      descartadas.push({
        objectId: e.objectId,
        nombre: e.attrs.nombre,
        proteccion: e.attrs.proteccion,
        areaM2: Number(m2.toFixed(3)),
        motivo: `Geometría degenerada: ${m2.toFixed(2)} m², por debajo del mínimo de ${AREA_MINIMA_M2} m². No puede contener ningún punto.`,
      });
      continue;
    }
    utiles.push(e);
  }
  if (utiles.length < unicas.length) {
    const nuevas = descartadas.slice(-(unicas.length - utiles.length));
    log(`    ${nuevas.length} descartada(s) por geometría degenerada:`);
    // La zonificación de s'Albufera des Grau trae cientos de esquirlas de pocos
    // metros cuadrados del recorte marino/terrestre. Enumerarlas una a una
    // sepulta el resto del log, así que en consola se resumen; el detalle
    // completo, con su OBJECTID, se escribe en src/data/descartadas.json.
    if (nuevas.length > MAX_DESCARTADAS_EN_CONSOLA) {
      const porTipo = new Map();
      for (const d of nuevas) {
        const k = `${d.nombre} [${d.proteccion}]`;
        const p = porTipo.get(k) ?? { n: 0, max: 0 };
        p.n += 1;
        p.max = Math.max(p.max, d.areaM2);
        porTipo.set(k, p);
      }
      for (const [k, v] of porTipo) log(`      ${v.n} × ${k} (la mayor, ${v.max} m²)`);
    } else {
      for (const d of nuevas) log(`      OBJECTID ${d.objectId} — ${d.nombre} (${d.areaM2} m²)`);
    }
  }
  for (const grupo of solapes) {
    log(
      `    figuras superpuestas sobre geometría idéntica: ${grupo
        .map((g) => `${g.attrs.nombre} [${g.attrs.proteccion}]`)
        .join('  +  ')}`,
    );
  }

  return { areas: utiles, hitos, capasInfo };
}

/**
 * Isla de una zona.
 *
 * `src/data/islas.js` es la tabla de las reservas marinas. Los espacios Natura
 * 2000 declaran la suya en `src/data/natura2000-marino.js`, junto al motivo por
 * el que entran en el mapa, porque ambas cosas se deciden a la vez y escribirlas
 * en dos sitios sería invitar a que se desincronicen. En ningún caso se deduce
 * de la geometría.
 */
function islaDe(e) {
  if (ISLAS_POR_ZONA[e.zoneId]) return ISLAS_POR_ZONA[e.zoneId];
  const marino = e.attrs.codigo ? N2000_MARINO[e.attrs.codigo] : null;
  return marino?.isla ?? null;
}

function aFeatureArea(e, source, ordinales) {
  const n = (ordinales.get(e.zoneId) ?? 0) + 1;
  ordinales.set(e.zoneId, n);

  const feature = { type: 'Feature', geometry: e.geometry, properties: {} };
  const m2 = area(feature);
  const marino = e.attrs.codigo ? N2000_MARINO[e.attrs.codigo] : null;

  feature.properties = {
    featureId: `${e.zoneId}--${String(n).padStart(2, '0')}`,
    zoneId: e.zoneId,
    fuente: source.id,
    fuenteTitulo: source.titulo,
    nombre: e.attrs.nombre,
    proteccion: e.attrs.proteccion,
    competencia: e.attrs.competencia ?? null,
    isla: islaDe(e),
    areaKm2: Number((m2 / 1e6).toFixed(4)),
    normas: normasDesdeAtributos(e.attrs),
    objectIdOrigen: e.objectId,
  };

  // Solo para las fuentes que los publican; no se inventan campos vacíos.
  if (e.attrs.ambito) feature.properties.ambito = e.attrs.ambito;
  if (e.attrs.codigo) feature.properties.codigo = e.attrs.codigo;
  if (e.attrs.fichaUrl) feature.properties.fichaUrl = e.attrs.fichaUrl;
  if (e.attrs.planEstado) feature.properties.planEstado = e.attrs.planEstado;
  if (marino) feature.properties.motivoInclusion = marino.motivo;

  return feature;
}

async function main() {
  const activas = SOURCES.filter((s) => s.activa);
  log(`Fuentes activas: ${activas.map((s) => s.id).join(', ')}\n`);

  const featuresArea = [];
  const featuresHito = [];
  const manifiesto = {
    generado: new Date().toISOString(),
    aviso: 'Fichero generado por scripts/fetch-sources.mjs. No editar a mano.',
    fuentes: [],
  };

  for (const source of activas) {
    log(`${source.id} — ${source.titulo}`);
    const { areas, hitos, capasInfo } = await procesaFuente(source);

    // Orden estable por zoneId para que el ordinal de featureId no baile entre
    // ejecuciones y el diff del GeoJSON versionado sea legible.
    areas.sort(
      (a, b) =>
        a.zoneId.localeCompare(b.zoneId) || String(a.objectId).localeCompare(String(b.objectId)),
    );

    const ordinales = new Map();
    for (const e of areas) featuresArea.push(aFeatureArea(e, source, ordinales));

    for (const h of hitos) {
      featuresHito.push({
        type: 'Feature',
        geometry: h.geometry,
        properties: {
          zoneId: h.zoneId,
          fuente: source.id,
          nombre: h.attrs.nombre,
          proteccion: h.attrs.proteccion,
          latitudTexto: h.attrs.latitudTexto,
          longitudTexto: h.attrs.longitudTexto,
        },
      });
    }

    manifiesto.fuentes.push({
      id: source.id,
      titulo: source.titulo,
      servicio: source.servicio,
      catalogo: source.catalogo ?? null,
      descargado: new Date().toISOString(),
      capas: capasInfo,
      areas: areas.length,
      hitos: hitos.length,
    });
    log('');
  }

  const dir = resolve(RAIZ, 'src/data');
  mkdirSync(dir, { recursive: true });

  // Se escribe minificado: el pretty-print multiplicaba por dos el tamano de
  // unos ficheros dominados por coordenadas de costa. La geometria NO se
  // simplifica en ningun momento: de su exactitud depende la respuesta
  // "estas dentro o fuera", asi que se conserva tal cual la publica el Govern.
  const escribe = (nombre, obj) => {
    const texto = JSON.stringify(obj);
    writeFileSync(resolve(dir, nombre), texto);
    return createHash('sha256').update(texto).digest('hex').slice(0, 16);
  };

  // Las capas que sirve la web viven en su propio directorio, aparte de los
  // ficheros combinados que solo usan los scripts. La web las importa con un
  // `import.meta.glob`, y un glob sobre todo src/data metía en el build los
  // 16 MB de protected-areas.geojson, que el navegador no llega a pedir nunca.
  const dirCapas = resolve(dir, CAPAS_WEB);
  mkdirSync(dirCapas, { recursive: true });
  const escribeCapa = (nombre, obj) => {
    const texto = JSON.stringify(obj);
    writeFileSync(resolve(dirCapas, nombre), texto);
    return createHash('sha256').update(texto).digest('hex').slice(0, 16);
  };

  const coleccion = (features) => ({ type: 'FeatureCollection', features });

  manifiesto.hashes = {
    'protected-areas.geojson': escribe('protected-areas.geojson', coleccion(featuresArea)),
    'hitos.geojson': escribe('hitos.geojson', coleccion(featuresHito)),
  };

  // Un fichero por isla y por fuente.
  //
  // Por isla, para que la web no descargue cartografía que no muestra. Por
  // fuente, porque pesan de forma muy desigual: las reservas marinas de
  // Mallorca ocupan 2,7 MB y los espacios Natura 2000 con ámbito marino diez
  // veces más, sobre todo por las ZEPA estatales, cuyo límite de tierra sigue
  // toda la costa vértice a vértice. Separarlos permite pintar primero lo
  // ligero y deja que cada capa se revalide en el navegador por su cuenta.
  //
  // La geometría NO se simplifica para que ocupe menos: de su exactitud depende
  // la respuesta "estás dentro o fuera".
  manifiesto.porIsla = {};
  for (const isla of Object.keys(ISLAS)) {
    const deIsla = featuresArea.filter((f) => zonaEnIsla(isla, f.properties.isla));
    if (deIsla.length === 0) continue;

    const ficheros = [];
    for (const source of activas) {
      const deFuente = deIsla.filter((f) => f.properties.fuente === source.id);
      if (deFuente.length === 0) continue;
      const nombre = `${source.id}.${isla}.geojson`;
      manifiesto.hashes[`${CAPAS_WEB}/${nombre}`] = escribeCapa(nombre, coleccion(deFuente));
      ficheros.push({ fuente: source.id, fichero: nombre, features: deFuente.length });
    }
    manifiesto.porIsla[isla] = { features: deIsla.length, ficheros };
  }
  manifiesto.totales = { areas: featuresArea.length, hitos: featuresHito.length };

  // El detalle de lo descartado va en su propio fichero y no en el manifiesto.
  // `main.js` importa manifest.json, así que todo lo que se meta ahí viaja al
  // navegador: las 442 esquirlas de la zonificación de s'Albufera des Grau
  // pesaban 120 kB de JavaScript que ningún visitante llega a leer. El manifiesto
  // conserva el recuento y el resumen —para que el descarte siga siendo visible
  // desde donde se mira todo lo demás— y remite al fichero con el detalle.
  const detalle = {
    aviso: 'Fichero generado por scripts/fetch-sources.mjs. No editar a mano.',
    generado: manifiesto.generado,
    areaMinimaM2: AREA_MINIMA_M2,
    descartadas,
  };
  const resumenDescartes = new Map();
  for (const d of descartadas) {
    const k = `${d.nombre}||${d.proteccion}`;
    const p = resumenDescartes.get(k) ?? { nombre: d.nombre, proteccion: d.proteccion, n: 0, areaMaximaM2: 0 };
    p.n += 1;
    p.areaMaximaM2 = Math.max(p.areaMaximaM2, d.areaM2);
    resumenDescartes.set(k, p);
  }
  manifiesto.descartadas = {
    total: descartadas.length,
    areaMinimaM2: AREA_MINIMA_M2,
    detalle: 'descartadas.json',
    porFigura: [...resumenDescartes.values()],
  };
  manifiesto.hashes['descartadas.json'] = escribe('descartadas.json', detalle);
  writeFileSync(resolve(dir, 'manifest.json'), JSON.stringify(manifiesto, null, 2));

  // -- Resumen ---------------------------------------------------------------
  log('Resumen por tipo de protección y competencia:');
  const tabla = new Map();
  for (const f of featuresArea) {
    const k = `${f.properties.proteccion} | ${f.properties.competencia ?? '—'}`;
    tabla.set(k, (tabla.get(k) ?? 0) + 1);
  }
  for (const [k, v] of [...tabla].sort()) log(`  ${String(v).padStart(3)}  ${k}`);

  const porIsla = new Map();
  for (const f of featuresArea) {
    const isla = f.properties.isla;
    const k = !isla ? 'SIN ASIGNAR' : Array.isArray(isla) ? isla.join(' + ') : isla;
    porIsla.set(k, (porIsla.get(k) ?? 0) + 1);
  }
  log('\nGeometrías por isla:');
  for (const [k, v] of [...porIsla].sort()) log(`  ${String(v).padStart(3)}  ${k}`);

  const sinAsignar = [
    ...new Set(featuresArea.filter((f) => !f.properties.isla).map((f) => f.properties.zoneId)),
  ].sort();

  if (sinAsignar.length > 0) {
    log(`\n${sinAsignar.length} zoneId sin isla asignada en src/data/islas.js:\n`);
    for (const z of sinAsignar) log(`  '${z}': '',`);
  }

  log(`\n${featuresArea.length} áreas y ${featuresHito.length} hitos escritos en src/data/.`);
}

main().catch((e) => {
  console.error('\nFallo en la descarga:', e.message);
  process.exit(1);
});
