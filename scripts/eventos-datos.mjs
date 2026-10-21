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

// -- Visitas: Cloudflare Web Analytics ----------------------------------------

const HOST = 'reservas.pecesmediterraneo.com';

/**
 * Visitas de Cloudflare Web Analytics por la API GraphQL. Sirve el mismo
 * token: el permiso «Account Analytics: Read» cubre también este dataset.
 *
 * **Son estimaciones, y con poco tráfico muy gruesas.** Web Analytics
 * muestrea de forma adaptativa: cada baliza registrada cuenta por
 * `sampleInterval` visitas, y con este volumen ese factor es 20 o 100 según
 * el periodo que se pida. Por eso salen cifras redondas (20, 100, 300) y la
 * misma semana puede dar números distintos pedida dentro de un mes o de tres.
 * Además el script de la baliza lo bloquean los bloqueadores de anuncios.
 * Se devuelve el factor para que el panel lo diga, en vez de presentar la
 * cifra como exacta.
 *
 * Devuelve `null` si la API falla: el panel de consultas no debe caerse por
 * no poder leer las visitas.
 */
export async function leeVisitas(dias) {
  const desde = new Date();
  desde.setUTCDate(desde.getUTCDate() - (dias - 1));
  const filtro = `{ date_geq: "${desde.toISOString().slice(0, 10)}", requestHost: "${HOST}" }`;
  const grupo = (alias, dimension, limite = 10) =>
    `${alias}: rumPageloadEventsAdaptiveGroups(limit: ${limite}, filter: ${filtro}, orderBy: [sum_visits_DESC]) {
       count sum { visits } dimensions { ${dimension} } }`;
  const consulta = `query($cuenta: String!) { viewer { accounts(filter: { accountTag: $cuenta }) {
    porDia: rumPageloadEventsAdaptiveGroups(limit: 200, filter: ${filtro}, orderBy: [date_ASC]) {
      count sum { visits } avg { sampleInterval } dimensions { date } }
    ${grupo('paises', 'countryName')}
    ${grupo('dispositivos', 'deviceType')}
    ${grupo('navegadores', 'userAgentBrowser')}
    ${grupo('origenes', 'refererHost')}
  } } }`;

  try {
    const r = await fetch('https://api.cloudflare.com/client/v4/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.CF_API_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: consulta, variables: { cuenta: process.env.CF_ACCOUNT_ID } }),
    });
    const j = await r.json();
    if (!r.ok || j.errors?.length) throw new Error(JSON.stringify(j.errors ?? r.status));
    const a = j.data.viewer.accounts[0];
    // Las filas a cero son recargas dentro de una visita ya contada (p. ej. la
    // propia web como origen): no aportan nada a un reparto de visitas.
    const plano = (filas, dim) =>
      filas.filter((f) => f.sum.visits > 0).map((f) => ({ clave: f.dimensions[dim], n: f.sum.visits, cargas: f.count }));

    const porDia = new Map(a.porDia.map((f) => [f.dimensions.date, { visitas: f.sum.visits, cargas: f.count }]));
    const serie = [];
    for (let i = dias - 1; i >= 0; i--) {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - i);
      const dia = d.toISOString().slice(0, 10);
      serie.push({ dia, n: porDia.get(dia)?.visitas ?? 0 });
    }
    const factores = a.porDia.map((f) => f.avg.sampleInterval).filter(Boolean);
    return {
      total: a.porDia.reduce((s, f) => s + f.sum.visits, 0),
      cargas: a.porDia.reduce((s, f) => s + f.count, 0),
      porDia: serie,
      factorMuestreo: factores.length ? Math.max(...factores) : null,
      paises: plano(a.paises, 'countryName'),
      dispositivos: plano(a.dispositivos, 'deviceType'),
      navegadores: plano(a.navegadores, 'userAgentBrowser'),
      origenes: plano(a.origenes, 'refererHost'),
    };
  } catch (e) {
    console.warn(`No se han podido leer las visitas de Web Analytics: ${e.message}`);
    return null;
  }
}
