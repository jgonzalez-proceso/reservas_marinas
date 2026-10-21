/**
 * Lectura del contador anónimo de consultas (Workers Analytics Engine).
 *
 * Lo comparten `informe-eventos.mjs` (consola) y `panel-eventos.mjs` (HTML),
 * para que los dos cuenten exactamente lo mismo.
 *
 * - Los recuentos son `SUM(_sample_interval)` y no `count()`: con mucho
 *   tráfico Analytics Engine muestrea, y cada fila representa entonces a
 *   varias. Contar filas daría menos consultas de las que hubo.
 * - Los nombres de columna salen de BLOBS y DOUBLES de la propia función,
 *   para que nunca se lea una columna por otra si el esquema crece.
 * - Se excluye la vista `prueba`: es la marca de los eventos que se mandan a
 *   mano para comprobar que el contador escribe. No son uso real.
 * - Las horas se agrupan en UTC en el servidor y se pasan a hora de Madrid
 *   aquí, que es la que importa para leer «a qué hora se usa».
 */

import { BLOBS, DOUBLES, ACTIVIDADES } from '../functions/api/evento.js';

const DATASET = 'reservas_consultas';
const ZONA_HORARIA = 'Europe/Madrid';

// Primer día con el contador en producción. Los días anteriores no son días
// sin uso, son días sin medir: contarlos como ceros hundiría la media diaria.
export const INICIO_CONTADOR = '2026-10-19';

export function compruebaCredenciales() {
  if (!process.env.CF_ACCOUNT_ID || !process.env.CF_API_TOKEN) {
    console.error('Faltan CF_ACCOUNT_ID y CF_API_TOKEN (en el entorno o en .env).');
    process.exit(1);
  }
}

export function leeDias(argumento, porDefecto = 30) {
  const dias = Number.parseInt(argumento ?? String(porDefecto), 10);
  if (!Number.isInteger(dias) || dias < 1 || dias > 92) {
    console.error('El número de días va de 1 a 92 (Analytics Engine guarda tres meses).');
    process.exit(1);
  }
  return dias;
}

const col = (nombre) => {
  const b = BLOBS.indexOf(nombre);
  if (b >= 0) return `blob${b + 1}`;
  const d = DOUBLES.indexOf(nombre);
  if (d >= 0) return `double${d + 1}`;
  throw new Error(`Columna desconocida: ${nombre}`);
};

async function sql(consulta) {
  const r = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/analytics_engine/sql`,
    { method: 'POST', headers: { Authorization: `Bearer ${process.env.CF_API_TOKEN}` }, body: consulta },
  );
  const texto = await r.text();
  if (!r.ok) throw new Error(`Analytics Engine contestó HTTP ${r.status}: ${texto}`);
  return JSON.parse(texto).data.map((fila) => {
    // Los enteros llegan como texto (UInt64); se pasan a número aquí una vez.
    const limpia = {};
    for (const [k, v] of Object.entries(fila)) limpia[k] = /^-?\d+(\.\d+)?$/.test(v) ? Number(v) : v;
    return limpia;
  });
}

// «2026-10-19 16:00:00» es UTC; se devuelve día y hora en Madrid.
const formatoMadrid = new Intl.DateTimeFormat('en-CA', {
  timeZone: ZONA_HORARIA,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  hourCycle: 'h23',
});
function aMadrid(textoUtc) {
  const partes = Object.fromEntries(
    formatoMadrid.formatToParts(new Date(`${textoUtc.replace(' ', 'T')}Z`)).map((p) => [p.type, p.value]),
  );
  return { dia: `${partes.year}-${partes.month}-${partes.day}`, hora: Number(partes.hour) };
}

/**
 * Todo lo que enseñan el informe y el panel, en una sola pasada.
 */
export async function leeEventos(dias) {
  const filtro = `timestamp > NOW() - INTERVAL '${dias}' DAY AND ${col('isla')} != 'prueba'`;
  const de = `FROM ${DATASET} WHERE ${filtro}`;

  const [porHora, vistas, figuras, estados, gps, celdas] = await Promise.all([
    sql(`SELECT toStartOfHour(timestamp) AS h, ${col('tipo')} AS tipo, SUM(_sample_interval) AS n
         ${de} GROUP BY h, tipo ORDER BY h`),
    sql(`SELECT ${col('isla')} AS isla, ${col('idioma')} AS idioma, SUM(_sample_interval) AS n
         ${de} GROUP BY isla, idioma ORDER BY n DESC`),
    sql(`SELECT ${col('figuraPrincipal')} AS figura, SUM(_sample_interval) AS n
         ${de} GROUP BY figura ORDER BY n DESC LIMIT 30`),
    sql(`SELECT ${ACTIVIDADES.map((a) => `${col(a)} AS ${a}`).join(', ')}, SUM(_sample_interval) AS n
         ${de} GROUP BY ${ACTIVIDADES.join(', ')}`),
    sql(`SELECT ${col('nivelGps')} AS nivel, SUM(_sample_interval) AS n
         ${de} AND ${col('tipo')} = 'gps' GROUP BY nivel ORDER BY n DESC`),
    sql(`SELECT ${col('celdaLat')} AS lat, ${col('celdaLon')} AS lon, SUM(_sample_interval) AS n
         ${de} AND ${col('tipo')} = 'mapa' AND ${col('celdaLat')} != 0
         GROUP BY lat, lon ORDER BY n DESC LIMIT 1000`),
  ]);

  // Por día y por hora del día, en hora de Madrid, separando mapa y GPS.
  const porDia = new Map();
  const horaDelDia = Array.from({ length: 24 }, () => 0);
  const porTipo = { mapa: 0, gps: 0 };
  for (const { h, tipo, n } of porHora) {
    const { dia, hora } = aMadrid(h);
    const d = porDia.get(dia) ?? { dia, mapa: 0, gps: 0 };
    if (tipo === 'gps') d.gps += n;
    else d.mapa += n;
    porDia.set(dia, d);
    horaDelDia[hora] += n;
    porTipo[tipo === 'gps' ? 'gps' : 'mapa'] += n;
  }

  // Se rellenan los días sin consultas: un día a cero también es un dato.
  const hoy = aMadrid(new Date().toISOString().slice(0, 19).replace('T', ' ')).dia;
  const dias_ = [];
  for (let i = dias - 1; i >= 0; i--) {
    const fecha = new Date(`${hoy}T12:00:00Z`);
    fecha.setUTCDate(fecha.getUTCDate() - i);
    const dia = fecha.toISOString().slice(0, 10);
    if (dia < INICIO_CONTADOR) continue;
    dias_.push(porDia.get(dia) ?? { dia, mapa: 0, gps: 0 });
  }

  // Estado por actividad: de la agrupación conjunta se saca el reparto de cada una.
  const porActividad = Object.fromEntries(ACTIVIDADES.map((a) => [a, {}]));
  for (const fila of estados) {
    for (const a of ACTIVIDADES) porActividad[a][fila[a]] = (porActividad[a][fila[a]] ?? 0) + fila.n;
  }

  return {
    dias,
    hoy,
    total: porTipo.mapa + porTipo.gps,
    porTipo,
    porDia: dias_,
    horaDelDia,
    vistas,
    figuras,
    porActividad,
    gps,
    celdas,
  };
}
