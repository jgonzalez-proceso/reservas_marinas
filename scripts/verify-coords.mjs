#!/usr/bin/env node
/**
 * Contrasta las coordenadas oficiales publicadas por el Govern contra la
 * geometría descargada de IDEIB.
 *
 * Usa @turf/point-to-polygon-distance, que mide contra el borde de Polygon y
 * MultiPolygon, maneja agujeros y devuelve valor NEGATIVO si el punto está
 * dentro. (pointToLineDistance no sirve aquí: exige un LineString.)
 *
 * Un vértice publicado debe caer sobre el contorno de alguna de las zonas de
 * su reserva. Se toma la distancia mínima en valor absoluto y se clasifica:
 *
 *     ≤  5 m   ok
 *     ≤ 20 m   aviso
 *     ≤ 50 m   revisar manualmente
 *     >  50 m  error, el script falla
 *
 * También contrasta cada punto con la capa oficial de hitos, que publica las
 * mismas coordenadas en notación sexagesimal.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import pointToPolygonDistance from '@turf/point-to-polygon-distance';
import {
  DISCREPANCIAS_CONOCIDAS,
  TABLAS_OFICIALES,
  TOTAL_PUNTOS,
} from '../src/data/coordenadas-oficiales.js';

/**
 * Distancia al hito oficial por debajo de la cual se considera que la
 * transcripción de la coordenada está confirmada por la propia capa del
 * Govern. Si el hito coincide y el polígono no, la diferencia está en la
 * geometría publicada, no en la tabla.
 */
const TOLERANCIA_HITO = 5;

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const UMBRALES = [
  { hasta: 5, clave: 'ok', etiqueta: 'ok' },
  { hasta: 20, clave: 'aviso', etiqueta: 'aviso' },
  { hasta: 50, clave: 'revisar', etiqueta: 'revisar' },
  { hasta: Infinity, clave: 'error', etiqueta: 'ERROR' },
];

const clasifica = (m) => UMBRALES.find((u) => m <= u.hasta);

const leerJson = (p) => JSON.parse(readFileSync(resolve(RAIZ, p), 'utf8'));

/** Distancia en metros entre dos puntos WGS84 (haversine). */
function metrosEntre(aLat, aLon, bLat, bLon) {
  const R = 6371008.8;
  const rad = Math.PI / 180;
  const dLat = (bLat - aLat) * rad;
  const dLon = (bLon - aLon) * rad;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(aLat * rad) * Math.cos(bLat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function main() {
  const areas = leerJson('src/data/protected-areas.geojson');
  const hitos = leerJson('src/data/hitos.geojson');

  const porZona = new Map();
  for (const f of areas.features) {
    const lista = porZona.get(f.properties.zoneId) ?? [];
    lista.push(f);
    porZona.set(f.properties.zoneId, lista);
  }

  const filas = [];
  const conteo = { ok: 0, aviso: 0, revisar: 0, error: 0, documentados: 0, soloGeometria: 0 };
  const zonasAusentes = new Set();

  for (const tabla of TABLAS_OFICIALES) {
    const candidatas = tabla.zonas.flatMap((z) => {
      const fs = porZona.get(z);
      if (!fs) zonasAusentes.add(z);
      return fs ?? [];
    });

    for (const p of tabla.puntos) {
      const punto = { type: 'Point', coordinates: [p.lon, p.lat] };

      let mejor = { metros: Infinity, dentro: false, zoneId: null, featureId: null };
      for (const f of candidatas) {
        // Unidades en metros; negativo = el punto queda dentro del polígono.
        const d = pointToPolygonDistance(punto, f, { units: 'meters' });
        if (Math.abs(d) < Math.abs(mejor.metros)) {
          mejor = {
            metros: Math.abs(d),
            dentro: d < 0,
            zoneId: f.properties.zoneId,
            featureId: f.properties.featureId,
          };
        }
      }

      // Hito oficial más próximo, como segunda comprobación independiente.
      let hito = { metros: Infinity, etiqueta: null };
      for (const h of hitos.features) {
        const [hLon, hLat] = h.geometry.coordinates;
        const d = metrosEntre(p.lat, p.lon, hLat, hLon);
        if (d < hito.metros) hito = { metros: d, nombre: h.properties.nombre };
      }

      const clase = clasifica(mejor.metros);
      const clave = `${tabla.reserva}|${p.etiqueta}`;
      const conocida = DISCREPANCIAS_CONOCIDAS[clave] ?? null;
      const transcripcionConfirmada = hito.metros <= TOLERANCIA_HITO;

      conteo[clase.clave] += 1;
      if (clase.clave === 'error' && conocida) conteo.documentados += 1;
      if (transcripcionConfirmada && clase.clave !== 'ok') conteo.soloGeometria += 1;

      filas.push({
        reserva: tabla.reserva,
        punto: p,
        mejor,
        hito,
        clase,
        conocida,
        transcripcionConfirmada,
      });
    }
  }

  // -- Salida por consola ----------------------------------------------------
  let reservaActual = null;
  for (const f of filas) {
    if (f.reserva !== reservaActual) {
      reservaActual = f.reserva;
      console.log(`\n${reservaActual}`);
      console.log('  pt   dist. al contorno   hito más próx.   zona que empareja');
    }
    const marca = f.conocida
      ? ' D'
      : { ok: '  ', aviso: ' !', revisar: ' ?', error: ' X' }[f.clase.clave];
    const nota = f.conocida
      ? 'discrepancia documentada'
      : f.transcripcionConfirmada && f.clase.clave !== 'ok'
        ? 'transcripcion confirmada por el hito; difiere el poligono'
        : f.mejor.zoneId ?? '—';
    console.log(
      `${marca} ${f.punto.etiqueta.padEnd(2)} ` +
        `${f.mejor.metros.toFixed(1).padStart(9)} m${f.mejor.dentro ? ' (dentro)' : '        '}  ` +
        `${f.hito.metros.toFixed(1).padStart(8)} m   ` +
        `${nota}`,
    );
  }

  const sinDocumentar = filas.filter((f) => f.clase.clave === 'error' && !f.conocida);

  console.log('\n' + '-'.repeat(78));
  console.log(
    `${TOTAL_PUNTOS} puntos verificados:  ` +
      `${conteo.ok} ok · ${conteo.aviso} aviso · ${conteo.revisar} revisar · ` +
      `${conteo.error} error (${conteo.documentados} documentados)`,
  );
  console.log(
    `${conteo.soloGeometria} punto(s) con la transcripción confirmada por la capa oficial de\n` +
      `hitos: ahí la diferencia está en el polígono publicado, no en la tabla.`,
  );

  if (filas.some((f) => f.conocida)) {
    console.log('\nDiscrepancias documentadas:');
    for (const f of filas.filter((x) => x.conocida)) {
      console.log(`  ${f.reserva} — punto ${f.punto.etiqueta} (${f.mejor.metros.toFixed(0)} m)`);
      console.log(`    ${f.conocida.motivo}`);
    }
  }

  if (zonasAusentes.size > 0) {
    console.log(`\nZonas declaradas en las tablas que no existen en el GeoJSON:`);
    for (const z of zonasAusentes) console.log(`  ${z}`);
  }

  // -- docs/fuentes.md -------------------------------------------------------
  const manifest = leerJson('src/data/manifest.json');
  const md = [
    '# Trazabilidad de fuentes y verificación de coordenadas',
    '',
    '> Documento generado por `npm run verify`. No editar a mano.',
    '',
    `Generado: ${new Date().toISOString()}`,
    '',
    '## Procedencia de los datos',
    '',
    ...manifest.fuentes.flatMap((f) => [
      `### ${f.titulo}`,
      '',
      `- Servicio: ${f.servicio}`,
      f.catalogo ? `- Catálogo de datos abiertos: ${f.catalogo}` : null,
      `- Descargado: ${f.descargado}`,
      `- Geometrías: ${f.areas} · Hitos: ${f.hitos}`,
      '',
    ].filter(Boolean)),
    '## Verificación contra las coordenadas oficiales publicadas',
    '',
    'Distancia de cada vértice publicado por el Govern al contorno más cercano',
    'de su reserva en la geometría de IDEIB. Umbrales: ≤5 m ok, ≤20 m aviso,',
    '≤50 m revisar, >50 m error.',
    '',
    `**${TOTAL_PUNTOS} puntos: ${conteo.ok} ok, ${conteo.aviso} aviso, ${conteo.revisar} revisar, ${conteo.error} error.**`,
    '',
    'La columna *hito* mide la distancia al vértice publicado en la capa oficial de',
    'hitos. Un hito a menos de 5 m confirma que la transcripción de la tabla es',
    'correcta: si aun así el polígono difiere, la diferencia está en la geometría',
    'publicada y no en el dato.',
    '',
    '| Reserva | Punto | Coordenada oficial | Al contorno | Al hito | Estado | Zona |',
    '|---|---|---|---|---|---|---|',
    ...filas.map(
      (f) =>
        `| ${f.reserva} | ${f.punto.etiqueta} | ${f.punto.original} | ` +
        `${f.mejor.metros.toFixed(1)} m${f.mejor.dentro ? ' (dentro)' : ''} | ` +
        `${f.hito.metros.toFixed(1)} m | ` +
        `${f.conocida ? 'documentada' : f.clase.etiqueta} | ${f.mejor.zoneId ?? '—'} |`,
    ),
    '',
    ...(filas.some((f) => f.conocida)
      ? [
          '## Discrepancias documentadas',
          '',
          'Diferencias investigadas y aceptadas. Cualquier discrepancia nueva hace',
          'fallar `npm run verify`.',
          '',
          ...filas
            .filter((f) => f.conocida)
            .flatMap((f) => [
              `### ${f.reserva} — punto ${f.punto.etiqueta}`,
              '',
              `- Distancia al contorno: ${f.mejor.metros.toFixed(1)} m`,
              `- Revisado: ${f.conocida.revisadoEl}`,
              `- ${f.conocida.motivo}`,
              '',
            ]),
        ]
      : []),
  ].join('\n');

  mkdirSync(resolve(RAIZ, 'docs'), { recursive: true });
  writeFileSync(resolve(RAIZ, 'docs/fuentes.md'), md);
  console.log('Informe escrito en docs/fuentes.md');

  if (sinDocumentar.length > 0) {
    console.error(
      `\n${sinDocumentar.length} punto(s) a más de 50 m del contorno oficial sin documentar:`,
    );
    for (const f of sinDocumentar) {
      console.error(
        `  ${f.reserva} — punto ${f.punto.etiqueta}: ${f.mejor.metros.toFixed(1)} m`,
      );
    }
    console.error(
      '\nInvestiga cada caso y, si la diferencia resulta explicable, documéntala en\n' +
        'DISCREPANCIAS_CONOCIDAS de src/data/coordenadas-oficiales.js con su motivo.\n' +
        'Nunca subas el umbral para que dejen de aparecer.',
    );
    process.exit(1);
  }
}

main();
