#!/usr/bin/env node
/**
 * Informe del contador anónimo de consultas (Workers Analytics Engine).
 *
 *   npm run eventos [-- días]
 *
 * Lee CF_ACCOUNT_ID y CF_API_TOKEN del entorno o de un `.env` en la raíz
 * (ignorado por git; nunca se versiona).
 *
 * El token necesita el permiso «Account Analytics: Read». Por defecto, los
 * últimos 30 días; Analytics Engine guarda tres meses.
 *
 * Los recuentos son `SUM(_sample_interval)` y no `count()`: con mucho tráfico
 * Analytics Engine muestrea, y cada fila representa entonces a varias. Contar
 * filas daría menos consultas de las que hubo.
 *
 * Los nombres de columna salen de BLOBS y DOUBLES de la propia función, para
 * que el informe no pueda leer una columna por otra si el esquema crece.
 */

import { BLOBS, DOUBLES } from '../functions/api/evento.js';

const DATASET = 'reservas_consultas';
const cuenta = process.env.CF_ACCOUNT_ID;
const token = process.env.CF_API_TOKEN;
const dias = Number.parseInt(process.argv[2] ?? '30', 10);

if (!cuenta || !token) {
  console.error('Faltan CF_ACCOUNT_ID y CF_API_TOKEN en el entorno.');
  process.exit(1);
}
if (!Number.isInteger(dias) || dias < 1 || dias > 92) {
  console.error('El número de días va de 1 a 92.');
  process.exit(1);
}

const col = (nombre) => {
  const b = BLOBS.indexOf(nombre);
  if (b >= 0) return `blob${b + 1}`;
  const d = DOUBLES.indexOf(nombre);
  if (d >= 0) return `double${d + 1}`;
  throw new Error(`Columna desconocida: ${nombre}`);
};

const desde = `timestamp > NOW() - INTERVAL '${dias}' DAY`;

async function sql(consulta) {
  const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cuenta}/analytics_engine/sql`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: consulta,
  });
  const texto = await r.text();
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${texto}`);
  return JSON.parse(texto).data;
}

const INFORMES = [
  [
    'Consultas por tipo',
    `SELECT ${col('tipo')} AS tipo, SUM(_sample_interval) AS consultas
     FROM ${DATASET} WHERE ${desde} GROUP BY tipo ORDER BY consultas DESC`,
  ],
  [
    'Consultas por día',
    `SELECT toDate(timestamp) AS dia, SUM(_sample_interval) AS consultas
     FROM ${DATASET} WHERE ${desde} GROUP BY dia ORDER BY dia`,
  ],
  [
    'Vista e idioma',
    `SELECT ${col('isla')} AS isla, ${col('idioma')} AS idioma, SUM(_sample_interval) AS consultas
     FROM ${DATASET} WHERE ${desde} GROUP BY isla, idioma ORDER BY consultas DESC`,
  ],
  [
    'Figuras más consultadas (la más específica del punto)',
    `SELECT ${col('figuraPrincipal')} AS figura, SUM(_sample_interval) AS consultas
     FROM ${DATASET} WHERE ${desde} GROUP BY figura ORDER BY consultas DESC LIMIT 25`,
  ],
  [
    'Pesca submarina: qué se contestó',
    `SELECT ${col('pescaSubmarina')} AS estado, SUM(_sample_interval) AS consultas
     FROM ${DATASET} WHERE ${desde} GROUP BY estado ORDER BY consultas DESC`,
  ],
  [
    'GPS: dentro, fuera o dudosa',
    `SELECT ${col('nivelGps')} AS nivel, SUM(_sample_interval) AS consultas
     FROM ${DATASET} WHERE ${desde} AND ${col('tipo')} = 'gps' GROUP BY nivel ORDER BY consultas DESC`,
  ],
  [
    'Celdas de ~1 km más pulsadas en el mapa',
    `SELECT ${col('celdaLat')} AS lat, ${col('celdaLon')} AS lon, SUM(_sample_interval) AS consultas
     FROM ${DATASET} WHERE ${desde} AND ${col('tipo')} = 'mapa' AND ${col('celdaLat')} != 0
     GROUP BY lat, lon ORDER BY consultas DESC LIMIT 25`,
  ],
];

console.log(`Contador anónimo de consultas · últimos ${dias} días\n`);
for (const [titulo, consulta] of INFORMES) {
  console.log(`## ${titulo}`);
  const filas = await sql(consulta);
  if (!filas.length) console.log('(sin datos)');
  else console.table(filas);
  console.log();
}
