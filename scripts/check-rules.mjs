#!/usr/bin/env node
/**
 * Validación de integridad, previa al build.
 *
 * Comprueba que:
 *  - toda zona de una fuente activa tiene isla asignada explícitamente;
 *  - ninguna ficha apunta a un zoneId inexistente;
 *  - los estados son del enum y ninguna afirmación va sin fuente;
 *  - las fuentes citadas existen en el registro de fuentes.
 *
 * Además informa de la cobertura de fichas en la isla activa, para que el
 * porcentaje de zonas sin regla redactada sea siempre visible y no una
 * sorpresa en producción.
 */

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

import { FICHAS_DECLARADAS, FICHAS_LISTA } from '../src/rules/index.js';
import { FUENTES } from '../src/rules/fuentes.js';
import { validaFicha } from '../src/rules/schema.js';
import { ISLAS, ISLA_ACTIVA, zonaEnIsla } from '../src/data/islas.js';
import { N2000_MARINO, MOTIVOS_INCLUSION } from '../src/data/natura2000-marino.js';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const areas = JSON.parse(
  readFileSync(resolve(RAIZ, 'src/data/protected-areas.geojson'), 'utf8'),
);

const problemas = [];

// -- 1. Toda zona debe tener isla asignada ------------------------------------
const sinIsla = [
  ...new Set(areas.features.filter((f) => !f.properties.isla).map((f) => f.properties.zoneId)),
];
for (const z of sinIsla) {
  problemas.push(`${z}: sin isla asignada en src/data/islas.js`);
}

// -- 2. Fichas: esquema, zoneId y fuentes -------------------------------------
const zoneIds = new Set(areas.features.map((f) => f.properties.zoneId));
const vistos = new Set();

for (const ficha of FICHAS_LISTA) {
  problemas.push(...validaFicha(ficha, { zoneIdsConocidos: zoneIds }));

  if (vistos.has(ficha.zoneId)) problemas.push(`${ficha.zoneId}: ficha duplicada`);
  vistos.add(ficha.zoneId);

  for (const [clave, regla] of Object.entries(ficha.actividades ?? {})) {
    for (const s of regla.sources ?? []) {
      if (!FUENTES[s]) {
        problemas.push(`${ficha.zoneId}/${clave}: fuente no registrada "${s}"`);
      }
    }
  }
}

// -- 3. Herencia: la hija debe estar realmente dentro de la madre --------------
//
// Declarar `heredaDe` sobre zonas que no están anidadas es un error de
// modelado, no un matiz: aplicaría a una zona el régimen de una reserva que no
// la contiene. La comprobación es geométrica y muestrea puntos interiores de la
// hija; basta con que uno caiga fuera de la madre para rechazarlo.

const porZona = new Map();
for (const f of areas.features) {
  const lista = porZona.get(f.properties.zoneId) ?? [];
  lista.push(f);
  porZona.set(f.properties.zoneId, lista);
}

function puntoInterior(feature) {
  const coords = [];
  const recorre = (x) => (typeof x[0] === 'number' ? coords.push(x) : x.forEach(recorre));
  recorre(feature.geometry.coordinates);
  const lons = coords.map((c) => c[0]);
  const lats = coords.map((c) => c[1]);
  const [w, e] = [Math.min(...lons), Math.max(...lons)];
  const [s, n] = [Math.min(...lats), Math.max(...lats)];

  for (let i = 1; i < 24; i++) {
    for (let j = 1; j < 24; j++) {
      const punto = {
        type: 'Point',
        coordinates: [w + ((e - w) * j) / 24, s + ((n - s) * i) / 24],
      };
      if (booleanPointInPolygon(punto, feature)) return punto;
    }
  }
  return null;
}

for (const ficha of FICHAS_DECLARADAS) {
  if (!ficha.heredaDe) continue;

  const hijas = porZona.get(ficha.zoneId) ?? [];
  const madres = porZona.get(ficha.heredaDe) ?? [];
  if (hijas.length === 0 || madres.length === 0) continue; // ya lo señala validaFicha

  for (const hija of hijas) {
    const punto = puntoInterior(hija);
    if (!punto) continue;
    const dentro = madres.some((m) => booleanPointInPolygon(punto, m));
    if (!dentro) {
      problemas.push(
        `${ficha.zoneId}: declara heredaDe "${ficha.heredaDe}" pero su geometría ` +
          `(${hija.properties.featureId}) no está contenida en ella. ` +
          `La herencia se declara, pero debe corresponderse con zonas realmente anidadas.`,
      );
    }
  }
}

// -- 4. La lista blanca de Natura 2000 debe cuadrar con lo descargado ---------
//
// Si un código deja de aparecer en la capa oficial, el espacio ha cambiado de
// designación, se ha fusionado con otro o el servicio ha dejado de publicarlo.
// Cualquiera de las tres cosas exige mirar qué ha pasado, no seguir adelante
// con un mapa al que le falta un espacio en silencio.
const codigosDescargados = new Set(
  areas.features.map((f) => f.properties.codigo).filter(Boolean),
);
for (const [codigo, decl] of Object.entries(N2000_MARINO)) {
  if (!codigosDescargados.has(codigo)) {
    problemas.push(
      `${codigo} (${decl.nombre}): declarado en src/data/natura2000-marino.js pero ausente ` +
        `de la capa descargada. Comprueba si el espacio sigue publicándose.`,
    );
  }
  if (!MOTIVOS_INCLUSION[decl.motivo]) {
    problemas.push(`${codigo}: motivo de inclusión desconocido "${decl.motivo}"`);
  }
}

// -- 5. Cobertura, isla por isla ----------------------------------------------
//
// Se informa de todas y no solo de la activa desde que la web lleva selector de
// isla: cualquiera de ellas puede estar delante del usuario, así que un hueco
// en Eivissa importa tanto como uno en Mallorca.
const zonasDe = (isla) =>
  [
    ...new Set(
      areas.features
        .filter((f) => zonaEnIsla(isla, f.properties.isla))
        .map((f) => f.properties.zoneId),
    ),
  ].sort();

const pendientes = [];
console.log(`Isla por defecto: ${ISLA_ACTIVA}\n`);

for (const isla of Object.keys(ISLAS)) {
  const zonas = zonasDe(isla);
  if (zonas.length === 0) continue;
  const sinFicha = zonas.filter((z) => !vistos.has(z));
  const marca = sinFicha.length === 0 ? '✓' : ' ';
  console.log(
    `${marca} ${isla.padEnd(11)} ${String(zonas.length - sinFicha.length).padStart(3)}/${String(zonas.length).padEnd(3)} con ficha`,
  );
  pendientes.push(...sinFicha.map((z) => `${isla}: ${z}`));
}

if (pendientes.length > 0) {
  console.log('\nZonas sin ficha redactada (se resuelven como "no determinable"):');
  for (const z of [...new Set(pendientes)]) console.log(`  ${z}`);
}

if (problemas.length > 0) {
  console.error(`\n${problemas.length} problema(s) de integridad:\n`);
  for (const p of problemas) console.error(`  ${p}`);
  process.exit(1);
}

console.log('\nIntegridad correcta.');
