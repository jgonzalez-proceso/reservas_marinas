#!/usr/bin/env node
/**
 * Panel del contador anónimo de consultas: genera un HTML y lo abre en Chrome.
 *
 *   npm run panel [-- días]      o doble clic en ver_consultas.bat
 *
 * Lee los mismos datos que `npm run eventos` (ver `eventos-datos.mjs`) y los
 * pinta con gráficos, un mapa de las zonas pulsadas y los nombres oficiales
 * de las figuras en lugar de sus zoneId.
 *
 * El HTML se escribe en la carpeta temporal del sistema, no en el proyecto:
 * es una foto de un momento, se regenera cada vez y no tiene sentido
 * versionarlo. No lleva credenciales: el token solo lo usa este script.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

import { compruebaCredenciales, leeDias, leeEventos, leeVisitas, INICIO_CONTADOR } from './eventos-datos.mjs';
import { ACTIVIDADES } from '../src/engine/resolve.js';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

compruebaCredenciales();
const dias = leeDias(process.argv[2]);
console.log(`Leyendo las consultas de los últimos ${dias} días…`);
const [datos, visitas] = await Promise.all([leeEventos(dias), leeVisitas(dias)]);

// -- Nombres legibles de las figuras -------------------------------------------
// El evento guarda el zoneId; el nombre oficial y el tipo de protección salen
// de la cartografía combinada que ya está en el repositorio.
const nombres = new Map();
try {
  const geo = JSON.parse(readFileSync(join(RAIZ, 'src/data/protected-areas.geojson'), 'utf8'));
  for (const { properties: p } of geo.features) {
    if (!nombres.has(p.zoneId)) nombres.set(p.zoneId, { nombre: p.nombre, proteccion: p.proteccion });
  }
} catch {
  // Sin cartografía se enseña el zoneId; el panel sigue siendo útil.
}

// -- Utilidades de pintado -----------------------------------------------------
const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const num = (n) => new Intl.NumberFormat('es-ES').format(n);
const pct = (n, total) => (total ? `${Math.round((n / total) * 100)} %` : '—');
const fechaCorta = (iso) =>
  new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${iso}T12:00:00Z`));
const diaSemana = (iso) =>
  new Intl.DateTimeFormat('es-ES', { weekday: 'short', timeZone: 'UTC' }).format(new Date(`${iso}T12:00:00Z`));

const ESTADOS = {
  prohibited: { texto: 'Prohibida', color: 'var(--prohibida)' },
  restricted: { texto: 'Restringida', color: 'var(--restringida)' },
  allowed_with_authorization: { texto: 'Con autorización', color: 'var(--autorizacion)' },
  allowed: { texto: 'Permitida', color: 'var(--permitida)' },
  not_regulated: { texto: 'Sin regulación específica', color: 'var(--sinregular)' },
  unknown: { texto: 'Sin determinar', color: 'var(--desconocido)' },
  '': { texto: 'Fuera de toda figura', color: 'var(--vacio)' },
};
const ORDEN_ESTADOS = Object.keys(ESTADOS);

const NIVELES_GPS = {
  dentro: 'Dentro de una zona',
  fuera: 'Fuera de toda zona',
  dudosa: 'Posición dudosa (cerca del límite)',
  '': 'Sin veredicto',
};
const IDIOMAS = { es: 'Castellano', ca: 'Català', en: 'English', de: 'Deutsch', '': 'Sin dato' };
const VISTAS = {
  todas: 'Todas las islas',
  mallorca: 'Mallorca',
  menorca: 'Menorca',
  eivissa: 'Eivissa',
  formentera: 'Formentera',
  cabrera: 'Cabrera',
  '': 'Sin dato',
};

/** Lista de barras horizontales: [{ etiqueta, detalle?, n }]. */
function barras(filas, { vacio = 'Sin consultas en este periodo.' } = {}) {
  if (!filas.length) return `<p class="vacio">${vacio}</p>`;
  const max = Math.max(...filas.map((f) => f.n));
  const total = filas.reduce((s, f) => s + f.n, 0);
  return `<ul class="barras">${filas
    .map(
      (f) => `<li>
        <div class="barras__texto"><span class="barras__etiqueta">${esc(f.etiqueta)}</span>${
          f.detalle ? `<span class="barras__detalle">${esc(f.detalle)}</span>` : ''
        }</div>
        <div class="barras__pista"><div class="barras__relleno" style="width:${(f.n / max) * 100}%"></div></div>
        <div class="barras__valor">${num(f.n)} <span>${pct(f.n, total)}</span></div>
      </li>`,
    )
    .join('')}</ul>`;
}

/** Columnas verticales en SVG: por día (apiladas mapa/GPS) o por hora. */
function columnas(serie, { alto = 180, ancho = 1000, etiqueta, apiladas = false }) {
  const n = serie.length;
  const margenInf = 34;
  const zona = alto - margenInf - 14;
  const max = Math.max(1, ...serie.map((s) => (apiladas ? s.mapa + s.gps : s.n)));
  const paso = ancho / n;
  const barra = Math.max(2, Math.min(paso * 0.72, 44));
  // Cada cuántas columnas se rotula el eje para que no se pisen.
  const cada = Math.ceil(n / Math.max(4, Math.floor(ancho / 60)));
  const piezas = serie.map((s, i) => {
    const x = i * paso + (paso - barra) / 2;
    const total = apiladas ? s.mapa + s.gps : s.n;
    const hMapa = apiladas ? (s.mapa / max) * zona : (s.n / max) * zona;
    const hGps = apiladas ? (s.gps / max) * zona : 0;
    const base = alto - margenInf;
    const titulo = apiladas
      ? `${etiqueta(s, i)}: ${num(total)} consultas (${num(s.mapa)} mapa, ${num(s.gps)} GPS)`
      : `${etiqueta(s, i)}: ${num(total)} consultas`;
    return `<g><title>${esc(titulo)}</title>
      <rect x="${x}" y="${base - hMapa}" width="${barra}" height="${hMapa}" rx="3" class="col-mapa"/>
      ${hGps ? `<rect x="${x}" y="${base - hMapa - hGps}" width="${barra}" height="${hGps}" rx="3" class="col-gps"/>` : ''}
      ${total && n <= 31 ? `<text x="${x + barra / 2}" y="${base - hMapa - hGps - 5}" class="col-num">${num(total)}</text>` : ''}
      ${i % cada === 0 ? `<text x="${x + barra / 2}" y="${alto - 12}" class="col-eje">${esc(etiqueta(s, i))}</text>` : ''}
    </g>`;
  });
  return `<svg viewBox="0 0 ${ancho} ${alto}" class="columnas" role="img">
    <line x1="0" x2="${ancho}" y1="${alto - margenInf}" y2="${alto - margenInf}" class="col-base"/>
    ${piezas.join('')}
  </svg>`;
}

function repartoActividad(clave) {
  const reparto = datos.porActividad[clave] ?? {};
  const total = Object.values(reparto).reduce((s, n) => s + n, 0);
  if (!total) return '';
  const tramos = ORDEN_ESTADOS.filter((e) => reparto[e])
    .map(
      (e) =>
        `<div class="tramo" style="flex:${reparto[e]};background:${ESTADOS[e].color}" title="${esc(
          `${ESTADOS[e].texto}: ${num(reparto[e])} (${pct(reparto[e], total)})`,
        )}">${reparto[e] / total >= 0.12 ? pct(reparto[e], total) : ''}</div>`,
    )
    .join('');
  return `<div class="actividad"><div class="actividad__nombre">${esc(ACTIVIDADES[clave] ?? clave)}</div><div class="actividad__barra">${tramos}</div></div>`;
}

// -- Cifras de cabecera --------------------------------------------------------
const consultasHoy = datos.porDia.find((d) => d.dia === datos.hoy);
const hoyN = consultasHoy ? consultasHoy.mapa + consultasHoy.gps : 0;
const diasConUso = datos.porDia.filter((d) => d.mapa + d.gps > 0).length;
const mejorDia = datos.porDia.reduce((m, d) => (d.mapa + d.gps > (m ? m.mapa + m.gps : 0) ? d : m), null);
const horaPunta = datos.horaDelDia.indexOf(Math.max(...datos.horaDelDia));

// Consultas por visita, solo sobre los días en que existían las dos mediciones.
const visitasDesdeContador = visitas
  ? visitas.porDia.filter((d) => d.dia >= INICIO_CONTADOR).reduce((s, d) => s + d.n, 0)
  : 0;
const consultasPorVisita = visitasDesdeContador
  ? num(Math.round((datos.total / visitasDesdeContador) * 10) / 10)
  : '—';

const PAISES = new Intl.DisplayNames(['es'], { type: 'region' });
const nombrePais = (c) => {
  try {
    return c ? PAISES.of(c) : 'Sin dato';
  } catch {
    return c;
  }
};
const DISPOSITIVOS = { mobile: 'Móvil', desktop: 'Ordenador', tablet: 'Tableta', '': 'Sin dato' };

const kpis = [
  ...(visitas
    ? [
        ['Visitas', `≈ ${num(visitas.total)}`, 'estimación de Cloudflare'],
        ['Consultas por visita', consultasPorVisita, 'aprox., desde ' + fechaCorta(INICIO_CONTADOR)],
      ]
    : []),
  ['Consultas', num(datos.total), `últimos ${dias} días`],
  ['Hoy', num(hoyN), fechaCorta(datos.hoy)],
  ['Media diaria', num(Math.round((datos.total / datos.porDia.length) * 10) / 10), `${diasConUso} de ${datos.porDia.length} días con uso`],
  ['Por GPS', num(datos.porTipo.gps), `${pct(datos.porTipo.gps, datos.total)} de las consultas`],
  [
    'Mejor día',
    mejorDia ? num(mejorDia.mapa + mejorDia.gps) : '—',
    mejorDia ? `${diaSemana(mejorDia.dia)} ${fechaCorta(mejorDia.dia)}` : '',
  ],
  ['Hora punta', datos.total ? `${horaPunta}:00` : '—', 'hora de Madrid'],
];

// -- Agrupaciones para las listas ----------------------------------------------
const sumaPor = (filas, clave) => {
  const m = new Map();
  for (const f of filas) m.set(f[clave], (m.get(f[clave]) ?? 0) + f.n);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

const filasFiguras = datos.figuras.map((f) => {
  if (!f.figura) return { etiqueta: 'Fuera de toda figura', detalle: 'el punto no está en ninguna zona cargada', n: f.n };
  const info = nombres.get(f.figura);
  return info
    ? { etiqueta: info.nombre, detalle: info.proteccion, n: f.n }
    : { etiqueta: f.figura, detalle: 'figura que ya no está en la cartografía', n: f.n };
});

const generado = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: 'Europe/Madrid',
}).format(new Date());

// -- HTML ----------------------------------------------------------------------
const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Consultas · Restricciones marítimas</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<style>
  :root {
    --fondo: #f3f6f8; --tarjeta: #ffffff; --texto: #13222e; --suave: #5b6b78; --linea: #dfe6eb;
    --acento: #0b6e8a; --acento-2: #f0a020; --pista: #e8eef2;
    --prohibida: #c62828; --restringida: #ef6c00; --autorizacion: #f2b705; --permitida: #2e7d32;
    --sinregular: #8aa59a; --desconocido: #9e9e9e; --vacio: #cfd8dc;
  }
  @media (prefers-color-scheme: dark) {
    :root { --fondo: #0e161c; --tarjeta: #16222b; --texto: #e6edf2; --suave: #93a4b1; --linea: #26343f;
      --acento: #3fb3d3; --pista: #22313c; --vacio: #455a64; }
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--fondo); color: var(--texto);
    font: 15px/1.45 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  header { padding: 28px 32px 8px; max-width: 1280px; margin: 0 auto; }
  h1 { margin: 0; font-size: 24px; }
  header p { margin: 4px 0 0; color: var(--suave); }
  main { max-width: 1280px; margin: 0 auto; padding: 16px 32px 40px; display: grid; gap: 18px;
    grid-template-columns: repeat(12, 1fr); }
  section { background: var(--tarjeta); border: 1px solid var(--linea); border-radius: 14px; padding: 18px 20px;
    grid-column: span 12; min-width: 0; }
  .mitad { grid-column: span 6; }
  .tercio { grid-column: span 4; }
  .cuarto { grid-column: span 3; }
  @media (max-width: 1100px) { .cuarto { grid-column: span 6; } }
  @media (max-width: 900px) { .mitad, .tercio, .cuarto { grid-column: span 12; } main, header { padding-left: 16px; padding-right: 16px; } }
  h2 { margin: 0 0 4px; font-size: 16px; }
  .nota { margin: 0 0 14px; color: var(--suave); font-size: 13px; }
  .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px;
    grid-column: span 12; }
  .kpi { background: var(--tarjeta); border: 1px solid var(--linea); border-radius: 14px; padding: 14px 16px; }
  .kpi__titulo { color: var(--suave); font-size: 13px; }
  .kpi__valor { font-size: 30px; font-weight: 700; margin: 2px 0; font-variant-numeric: tabular-nums; }
  .kpi__detalle { color: var(--suave); font-size: 12px; }
  .columnas { width: 100%; height: auto; display: block; }
  .col-mapa { fill: var(--acento); } .col-gps { fill: var(--acento-2); }
  .col-base { stroke: var(--linea); }
  .col-num { fill: var(--suave); font-size: 13px; text-anchor: middle; }
  .col-eje { fill: var(--suave); font-size: 13px; text-anchor: middle; }
  .leyenda { display: flex; gap: 16px; flex-wrap: wrap; font-size: 13px; color: var(--suave); margin-bottom: 8px; }
  .leyenda i { display: inline-block; width: 11px; height: 11px; border-radius: 3px; margin-right: 6px; vertical-align: -1px; }
  .barras { list-style: none; margin: 0; padding: 0; display: grid; gap: 9px; }
  .barras li { display: grid; grid-template-columns: minmax(0, 1.8fr) minmax(70px, 1fr) auto; gap: 12px; align-items: center; }
  .barras__texto { min-width: 0; }
  .barras__etiqueta { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .barras__detalle { display: block; color: var(--suave); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .barras__pista { background: var(--pista); border-radius: 99px; height: 9px; overflow: hidden; }
  .barras__relleno { background: var(--acento); height: 100%; border-radius: 99px; }
  .barras__valor { font-variant-numeric: tabular-nums; font-weight: 600; text-align: right; min-width: 72px; }
  .barras__valor span { color: var(--suave); font-weight: 400; font-size: 12px; margin-left: 4px; }
  .actividad { display: grid; grid-template-columns: 220px 1fr; gap: 14px; align-items: center; margin-bottom: 10px; }
  @media (max-width: 700px) { .actividad { grid-template-columns: 1fr; gap: 4px; } }
  .actividad__barra { display: flex; height: 26px; border-radius: 8px; overflow: hidden; background: var(--pista); }
  .tramo { color: #fff; font-size: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center;
    text-shadow: 0 1px 2px rgba(0,0,0,.35); min-width: 3px; }
  #mapa { height: 460px; border-radius: 10px; }
  .vacio { color: var(--suave); margin: 8px 0; }
  footer { max-width: 1280px; margin: 0 auto; padding: 0 32px 32px; color: var(--suave); font-size: 12px; }
</style>
</head>
<body>
<header>
  <h1>Consultas en el mapa de restricciones marítimas</h1>
  <p>Últimos ${dias} días${
    datos.porDia.length < dias ? ` (el contador funciona desde el ${fechaCorta(datos.porDia[0].dia)})` : ''
  } · generado el ${esc(generado)} · reservas.pecesmediterraneo.com</p>
</header>
<main>
  <div class="kpis">
    ${kpis
      .map(
        ([t, v, d]) =>
          `<div class="kpi"><div class="kpi__titulo">${esc(t)}</div><div class="kpi__valor">${esc(v)}</div><div class="kpi__detalle">${esc(d)}</div></div>`,
      )
      .join('')}
  </div>

  ${
    visitas
      ? `<section>
    <h2>Visitas por día</h2>
    <p class="nota">De Cloudflare Web Analytics, sin cookies. <strong>Son estimaciones gruesas:</strong> con este volumen Cloudflare
    muestrea y cada visita registrada cuenta por ${visitas.factorMuestreo ?? '?'}, así que salen en bloques redondos y un día con una
    sola visita real puede aparecer como ${visitas.factorMuestreo ?? '?'} o como 0. Los bloqueadores de anuncios tampoco cuentan.
    Para tendencias de semanas sirven; para comparar días sueltos, mejor las consultas.</p>
    ${columnas(visitas.porDia, { alto: 200, etiqueta: (s) => fechaCorta(s.dia) })}
  </section>
  <section class="cuarto"><h2>País</h2><p class="nota">Visitas estimadas.</p>
    ${barras(visitas.paises.map((f) => ({ etiqueta: nombrePais(f.clave), n: f.n })))}</section>
  <section class="cuarto"><h2>Dispositivo</h2><p class="nota">Visitas estimadas.</p>
    ${barras(visitas.dispositivos.map((f) => ({ etiqueta: DISPOSITIVOS[f.clave] ?? f.clave, n: f.n })))}</section>
  <section class="cuarto"><h2>Navegador</h2><p class="nota">Visitas estimadas.</p>
    ${barras(visitas.navegadores.map((f) => ({ etiqueta: f.clave || 'Sin dato', n: f.n })))}</section>
  <section class="cuarto"><h2>De dónde vienen</h2><p class="nota">Web de origen; vacío es acceso directo.</p>
    ${barras(visitas.origenes.map((f) => ({ etiqueta: f.clave || 'Directo / app', n: f.n })))}</section>`
      : `<section><h2>Visitas</h2><p class="vacio">No se han podido leer las visitas de Cloudflare Web Analytics. El resto del panel sí está al día.</p></section>`
  }

  <section>
    <h2>Consultas por día</h2>
    <p class="nota">Cada consulta es un punto pulsado en el mapa o una pulsación de «¿Estoy dentro?». Una misma persona puede hacer varias.</p>
    <div class="leyenda"><span><i style="background:var(--acento)"></i>Clic en el mapa</span><span><i style="background:var(--acento-2)"></i>GPS «¿Estoy dentro?»</span></div>
    ${columnas(datos.porDia, { apiladas: true, alto: 220, etiqueta: (s) => fechaCorta(s.dia) })}
  </section>

  <section class="mitad">
    <h2>Dónde pulsa la gente</h2>
    <p class="nota">Celdas de ~1 km. El círculo crece con el número de consultas. Las consultas por GPS no guardan posición.</p>
    ${datos.celdas.length ? '<div id="mapa"></div>' : '<p class="vacio">Todavía no hay clics en el mapa.</p>'}
  </section>

  <section class="mitad">
    <h2>Zonas más consultadas</h2>
    <p class="nota">La figura más específica del punto pulsado (la de menor superficie).</p>
    ${barras(filasFiguras.slice(0, 15))}
  </section>

  <section class="mitad">
    <h2>Hora del día</h2>
    <p class="nota">Hora de Madrid, sumando todo el periodo.</p>
    ${columnas(
      datos.horaDelDia.map((n, h) => ({ n, h })),
      { alto: 260, ancho: 520, etiqueta: (s) => `${s.h}h` },
    )}
  </section>

  <section class="mitad">
    <h2>Qué se le contestó a la gente</h2>
    <p class="nota">Reparto del veredicto de cada actividad en los puntos consultados.</p>
    ${Object.keys(ACTIVIDADES).map(repartoActividad).join('') || '<p class="vacio">Sin consultas en este periodo.</p>'}
    <div class="leyenda" style="margin-top:12px">${ORDEN_ESTADOS.map(
      (e) => `<span><i style="background:${ESTADOS[e].color}"></i>${esc(ESTADOS[e].texto)}</span>`,
    ).join('')}</div>
  </section>

  <section class="tercio">
    <h2>Vista del mapa</h2>
    <p class="nota">Isla seleccionada al consultar.</p>
    ${barras(sumaPor(datos.vistas, 'isla').map(([k, n]) => ({ etiqueta: VISTAS[k] ?? k, n })))}
  </section>

  <section class="tercio">
    <h2>Idioma</h2>
    <p class="nota">Idioma de la interfaz al consultar.</p>
    ${barras(sumaPor(datos.vistas, 'idioma').map(([k, n]) => ({ etiqueta: IDIOMAS[k] ?? k, n })))}
  </section>

  <section class="tercio">
    <h2>Resultado del GPS</h2>
    <p class="nota">Veredicto de «¿Estoy dentro?» según la precisión del GPS.</p>
    ${barras(
      datos.gps.map((g) => ({ etiqueta: NIVELES_GPS[g.nivel] ?? g.nivel, n: g.n })),
      { vacio: 'Nadie ha usado todavía el GPS en este periodo.' },
    )}
  </section>
</main>
<footer>
  Contador anónimo: no usa cookies ni identificadores, así que cuenta consultas, no personas. Se excluyen los eventos de prueba.
  Los datos vienen de Workers Analytics Engine, que guarda tres meses. Las visitas son estimaciones muestreadas de Cloudflare Web Analytics.
</footer>
${
  datos.celdas.length
    ? `<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  const celdas = ${JSON.stringify(datos.celdas.map((c) => [c.lat, c.lon, c.n]))};
  const mapa = L.map('mapa', { scrollWheelZoom: false });
  // Este HTML se abre como file://, sin cabecera Referer, y eso descarta dos
  // proveedores que parecían obvios. openstreetmap.org contesta con un 403
  // pintado en cada tesela («Access blocked»). CARTO contesta 200 con una
  // imagen válida… que dice «API KEY REQUIRED»: un 200 no prueba nada, hay
  // que mirar la tesela. Los lienzos grises de Esri sí sirven sin clave ni
  // Referer —el mismo servidor del satélite de la web—, en claro u oscuro
  // según el tema del sistema, igual que el resto del panel.
  const oscuro = matchMedia('(prefers-color-scheme: dark)').matches;
  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_' +
      (oscuro ? 'Dark' : 'Light') + '_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 16, attribution: 'Esri, HERE, Garmin, &copy; OpenStreetMap' },
  ).addTo(mapa);
  const max = Math.max(...celdas.map((c) => c[2]));
  const capa = L.featureGroup(celdas.map(([lat, lon, n]) =>
    L.circleMarker([lat, lon], {
      radius: 5 + 17 * Math.sqrt(n / max), color: '#0b6e8a', weight: 1.5, fillColor: '#0b6e8a', fillOpacity: 0.45,
    }).bindTooltip(n + (n === 1 ? ' consulta' : ' consultas'))
  )).addTo(mapa);
  // Se encuadra Baleares entero y no los puntos: con pocas consultas el
  // encuadre de los puntos saltaba de un zoom a otro de un día para otro.
  mapa.fitBounds([[38.62, 1.15], [40.12, 4.35]]);
</script>`
    : ''
}
</body>
</html>`;

const salida = join(tmpdir(), 'reservas-panel-consultas.html');
writeFileSync(salida, html);
console.log(`Panel generado: ${salida}`);

// -- Abrir en Chrome (o en el navegador por defecto si no está) ----------------
function rutaChrome() {
  const candidatas = [
    process.env.PROGRAMFILES && join(process.env.PROGRAMFILES, 'Google/Chrome/Application/chrome.exe'),
    process.env['PROGRAMFILES(X86)'] && join(process.env['PROGRAMFILES(X86)'], 'Google/Chrome/Application/chrome.exe'),
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'),
  ].filter(Boolean);
  return candidatas.find((r) => existsSync(r));
}

if (!process.argv.includes('--no-abrir')) {
  const chrome = process.platform === 'win32' ? rutaChrome() : null;
  const hijo = chrome
    ? spawn(chrome, [salida], { detached: true, stdio: 'ignore' })
    : process.platform === 'win32'
      ? spawn('cmd', ['/c', 'start', '""', salida], { detached: true, stdio: 'ignore' })
      : spawn(process.platform === 'darwin' ? 'open' : 'xdg-open', [salida], { detached: true, stdio: 'ignore' });
  hijo.unref();
}
