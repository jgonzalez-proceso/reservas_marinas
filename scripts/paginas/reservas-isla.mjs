/**
 * Página estática «Reservas marinas de <isla>», generada en el build.
 *
 * Existe para los buscadores. La web es una sola URL con un mapa: quien busca
 * «reservas marinas de mallorca» quiere leer cuáles hay y qué se puede hacer en
 * cada una, y Google contesta con páginas de texto. Esta página da ese texto
 * sin escribirlo a mano: sale entero de las fichas de `src/rules/`, ya
 * resueltas con su herencia, así que corregir una ficha corrige su página y
 * los mismos gates del build (`rules:check`, `npm test`) la protegen.
 *
 * No enlaza al bundle, por el mismo motivo que `public/404.html`: los nombres
 * de `assets/` llevan hash y una página que dependa de ellos se rompe cuando
 * cambian. Los estilos van dentro y son los tokens de `main.css`.
 *
 * Todo el texto pasa por `esc()`. Las fichas son nuestras, pero el día que un
 * motivo lleve un «<» o un «&» no debe convertirse en marcado.
 */

import { readFileSync } from 'node:fs';

import { FICHAS } from '../../src/rules/index.js';
import { ACTIVIDADES, ESTADOS } from '../../src/engine/resolve.js';
import { ISLAS, ISLAS_POR_ZONA, zonaEnIsla } from '../../src/data/islas.js';

import { RESERVAS_POR_ISLA, anclaZona, rutaIsla } from '../../src/paginas/reservas.js';

export { RESERVAS_POR_ISLA, rutaIsla };

export const SITIO = 'https://reservas.pecesmediterraneo.com/';

/**
 * Fecha en que cambió por última vez lo que dice la página: la más reciente
 * entre la revisión de sus fichas y la descarga de la cartografía. Es el
 * `lastmod` del sitemap, por el mismo motivo que el de la portada.
 */
export function fechaPagina(isla) {
  const manifiesto = JSON.parse(readFileSync(new URL('../../src/data/manifest.json', import.meta.url), 'utf8'));
  const revisiones = RESERVAS_POR_ISLA[isla].flatMap((r) => r.fichas.map((f) => FICHAS[f.zoneId].ultimaRevision));
  return [...revisiones, manifiesto.generado.slice(0, 10)].filter(Boolean).sort().at(-1);
}

const esc = (s) =>
  String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const fechaLarga = (iso) =>
  new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso.slice(0, 10)}T00:00:00Z`),
  );

const euros = (n) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);

const enlace = (url, texto) =>
  url ? `<a href="${esc(url)}" rel="noopener noreferrer">${esc(texto)}</a>` : esc(texto);

const ancla = anclaZona;

// En la matriz del resumen caben seis columnas solo con etiquetas cortas; la
// etiqueta completa va en el `title` y en el detalle de cada zona.
const CORTA = {
  allowed_with_authorization: 'Con autorización',
  not_regulated: 'Sin restricción',
};

const COLUMNA = {
  pescaRecreativaEmbarcacion: 'Pesca desde barca',
  pescaSubmarina: 'Pesca submarina',
  pescaDesdeCosta: 'Pesca desde costa',
  buceo: 'Buceo',
  fondeo: 'Fondeo',
  navegacion: 'Navegación',
};

function insignia(status, { corta = false } = {}) {
  const e = ESTADOS[status] ?? ESTADOS.unknown;
  const texto = corta ? (CORTA[status] ?? e.etiqueta) : e.etiqueta;
  return `<span class="estado estado--${e.nivel}" title="${esc(e.etiqueta)}">${esc(texto)}</span>`;
}

/** Mismo criterio que el panel: 0 es gratis, null es «no publicado». */
function textoPermiso(p) {
  const partes = [];
  if (p.importe === 0) partes.push('Autorización gratuita');
  else if (p.importe == null) partes.push('Requiere autorización · importe no publicado');
  else partes.push(`Tasa: ${euros(p.importe)}`);
  if (p.vigencia) partes.push(`vigencia: ${p.vigencia}`);
  return partes.join(' · ');
}

function bloqueActividad(clave, regla) {
  const condiciones = regla.conditions ?? [];
  const p = regla.permit;
  if (!condiciones.length && !p) return '';
  return `
          <h5>${esc(ACTIVIDADES[clave])}</h5>
          ${condiciones.length ? `<ul>${condiciones.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
          ${
            p
              ? `<p class="permiso"><strong>${esc(textoPermiso(p))}</strong>${p.nota ? `. ${esc(p.nota)}` : ''}${
                  p.url ? ` ${enlace(p.url, 'Cómo se tramita')}` : ''
                }</p>`
              : ''
          }`;
}

function seccionZona(ficha) {
  const filas = Object.keys(ACTIVIDADES)
    .map((clave) => {
      const r = ficha.actividades[clave];
      if (!r) return '';
      const heredada = r.heredadaDe ? ` <span class="nota">(régimen general de ${esc(r.heredadaDe.nombreCorto)})</span>` : '';
      return `
            <tr>
              <th scope="row">${esc(ACTIVIDADES[clave])}</th>
              <td>${insignia(r.status)}</td>
              <td>${esc(r.motivo)}${heredada}</td>
            </tr>`;
    })
    .join('');

  const detalle = Object.keys(ACTIVIDADES)
    .map((clave) => (ficha.actividades[clave] ? bloqueActividad(clave, ficha.actividades[clave]) : ''))
    .join('');

  const normas = (ficha.normas ?? []).filter((n) => n.titulo?.trim());

  return `
        <section class="zona" id="${esc(ancla(ficha.zoneId))}">
          <h3>${esc(ficha.nombreCorto)}</h3>
          ${ficha.resumen ? `<p>${esc(ficha.resumen)}</p>` : ''}
          <div class="tabla">
            <table>
              <thead><tr><th scope="col">Actividad</th><th scope="col">Estado</th><th scope="col">Qué dice la norma</th></tr></thead>
              <tbody>${filas}
              </tbody>
            </table>
          </div>
          ${
            detalle
              ? `<details>
            <summary>Condiciones y autorizaciones</summary>${detalle}
          </details>`
              : ''
          }
          ${
            normas.length
              ? `<p class="normas"><strong>Normas:</strong> ${normas.map((n) => enlace(n.url, n.titulo)).join('; ')}.</p>`
              : ''
          }
        </section>`;
}

function filaResumen(ficha) {
  const celdas = Object.keys(ACTIVIDADES)
    .map((clave) => `<td>${insignia(ficha.actividades[clave]?.status ?? 'unknown', { corta: true })}</td>`)
    .join('');
  return `<tr><th scope="row"><a href="#${esc(ancla(ficha.zoneId))}">${esc(ficha.nombreCorto)}</a></th>${celdas}</tr>`;
}

/** Fichas resueltas (con herencia) de una reserva, en el orden del fichero. */
function fichasDe(reserva) {
  return reserva.fichas.map((f) => FICHAS[f.zoneId]);
}

/** Las demás figuras con ficha sobre el mar de la isla que restringen algo. */
function otrasFiguras(isla) {
  return Object.entries(ISLAS_POR_ZONA)
    .filter(([zoneId, v]) => zoneId.startsWith('enp-') && zonaEnIsla(isla, v) && FICHAS[zoneId])
    .map(([zoneId]) => FICHAS[zoneId])
    .filter((f) => f.zoneId.endsWith('--mari'));
}

export function paginaReservasIsla(isla) {
  const reservas = RESERVAS_POR_ISLA[isla];
  if (!reservas) throw new Error(`No hay página de reservas declarada para «${isla}»`);
  const nombreIsla = ISLAS[isla];
  const url = `${SITIO}${rutaIsla(isla)}`;
  const manifiesto = JSON.parse(readFileSync(new URL('../../src/data/manifest.json', import.meta.url), 'utf8'));

  const todas = reservas.flatMap(fichasDe);
  const revision = todas.map((f) => f.ultimaRevision).filter(Boolean).sort().at(-1);
  const otras = otrasFiguras(isla);

  const titulo = `Reservas marinas de ${nombreIsla}: qué se puede hacer en cada una`;
  const descripcion =
    `Las ${reservas.length} reservas marinas de ${nombreIsla} zona por zona: pesca desde embarcación, ` +
    'pesca submarina, pesca desde costa, buceo, fondeo y navegación, con las autorizaciones y la norma que lo dice.';

  const indice = reservas
    .map((r) => `<li><a href="#${esc(r.id)}">${esc(r.nombre)}</a></li>`)
    .join('');

  const resumen = reservas
    .map(
      (r) => `
            <tr class="grupo"><th colspan="${Object.keys(ACTIVIDADES).length + 1}" scope="rowgroup"><a href="#${esc(r.id)}">${esc(r.nombre)}</a></th></tr>
            ${fichasDe(r).map(filaResumen).join('\n            ')}`,
    )
    .join('');

  const cuerpoReservas = reservas
    .map(
      (r) => `
      <section class="reserva" id="${esc(r.id)}">
        <h2>${esc(r.nombre)}</h2>
        <p class="nota">${fichasDe(r).length === 1 ? 'Una zona' : `${fichasDe(r).length} zonas`} con régimen propio. <a href="/#isla=${esc(isla)}">Ver en el mapa</a></p>
        ${fichasDe(r).map(seccionZona).join('')}
      </section>`,
    )
    .join('');

  const otrasHtml = otras.length
    ? `
      <section id="otras-figuras">
        <h2>No solo las reservas: lo que también manda en el mar de ${esc(nombreIsla)}</h2>
        <p>Sobre el mismo trozo de mar pueden recaer varias figuras a la vez, y aplican todas. Estos espacios naturales protegidos tienen ámbito marino en ${esc(nombreIsla)} y regulan la pesca submarina por su cuenta, dentro o fuera de una reserva:</p>
        <ul>
          ${otras
            .map((f) => {
              const r = f.actividades.pescaSubmarina;
              return `<li><strong>${esc(f.nombreCorto)}</strong>: pesca submarina ${insignia(r?.status ?? 'unknown')}${r?.motivo ? ` — ${esc(r.motivo)}` : ''}</li>`;
            })
            .join('\n          ')}
        </ul>
        <p>Los espacios de la Red Natura 2000 marina, en cambio, no prohíben por sí mismos la pesca recreativa: el Decret 91/2023 la remite a la normativa general, salvo donde coinciden con una reserva marina o con un espacio natural protegido. Y en todo el Mediterráneo está prohibido fondear sobre praderas de posidonia y de Cymodocea (Real Decreto 191/2026).</p>
      </section>`
    : '';

  const jsonld = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: titulo,
          url,
          description: descripcion,
          inLanguage: 'es',
          dateModified: revision,
          isPartOf: { '@type': 'WebSite', name: 'Reservas Marinas Baleares', url: SITIO },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Mapa de reservas marinas de Baleares', item: SITIO },
            { '@type': 'ListItem', position: 2, name: `Reservas marinas de ${nombreIsla}`, item: url },
          ],
        },
      ],
    },
    null,
    2,
  );

  return `<!doctype html>
<!--
  GENERADO por scripts/paginas/reservas-isla.mjs en el build, a partir de las
  fichas de src/rules/. No se edita a mano: se corrige la ficha.
-->
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${esc(titulo)}</title>
    <meta name="description" content="${esc(descripcion)}" />
    <meta name="color-scheme" content="dark" />
    <link rel="canonical" href="${esc(url)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:title" content="${esc(titulo)}" />
    <meta property="og:description" content="${esc(descripcion)}" />
    <meta property="og:site_name" content="Reservas Marinas Baleares" />
    <meta property="og:image" content="${SITIO}favicon-512.png" />
    <meta property="og:locale" content="es_ES" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <script type="application/ld+json">
${jsonld}
    </script>
    <style>
      :root {
        --fondo: #0d1620;
        --fondo-2: #131f2b;
        --fondo-3: #1a2836;
        --borde: #26374a;
        --texto: #e8eef4;
        --texto-2: #9fb2c4;
        --acento: #2f8fd0;
        --ok: #3f9268;
        --aviso: #d9a441;
        --stop: #c9453c;
        --desconocido: #6b7d8c;
        --neutro: #5f89ad;
        --radio: 10px;
        --fuente: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      }
      * { box-sizing: border-box; }
      html { scroll-padding-top: 72px; }
      body {
        margin: 0;
        background: var(--fondo);
        color: var(--texto);
        font-family: var(--fuente);
        line-height: 1.55;
        font-size: 16px;
      }
      a { color: #7cc0f0; }
      .barra {
        position: sticky; top: 0; z-index: 10;
        display: flex; align-items: center; justify-content: space-between; gap: 12px;
        padding: 10px 16px;
        background: var(--fondo-2);
        border-bottom: 1px solid var(--borde);
      }
      .barra a.marca { color: var(--texto); font-weight: 700; text-decoration: none; }
      a.boton {
        display: inline-block; padding: 9px 14px; border-radius: var(--radio);
        background: var(--acento); color: #08131c; font-weight: 600; text-decoration: none; white-space: nowrap;
      }
      a.boton:focus-visible, .barra a:focus-visible { outline: 2px solid var(--texto); outline-offset: 2px; }
      main { max-width: 1080px; margin: 0 auto; padding: 24px 16px 48px; }
      h1 { font-size: 1.8rem; line-height: 1.2; margin: 8px 0 12px; }
      h2 { font-size: 1.35rem; margin: 40px 0 8px; padding-top: 8px; border-top: 1px solid var(--borde); }
      h3 { font-size: 1.08rem; margin: 28px 0 6px; }
      h5 { font-size: 0.95rem; margin: 14px 0 4px; }
      p, li { color: var(--texto); }
      .nota, .pie { color: var(--texto-2); font-size: 0.9rem; }
      .entradilla { font-size: 1.05rem; }
      .aviso {
        background: var(--fondo-2); border: 1px solid var(--borde); border-left: 4px solid var(--aviso);
        border-radius: var(--radio); padding: 12px 14px; font-size: 0.92rem;
      }
      .tabla { overflow-x: auto; margin: 10px 0; border: 1px solid var(--borde); border-radius: var(--radio); }
      table { border-collapse: collapse; width: 100%; font-size: 0.9rem; }
      th, td { text-align: left; vertical-align: top; padding: 8px 10px; border-bottom: 1px solid var(--borde); }
      thead th { background: var(--fondo-3); font-weight: 600; }
      tbody tr:last-child > * { border-bottom: 0; }
      tbody th { font-weight: 600; white-space: nowrap; }
      .resumen td { text-align: center; }
      .resumen tbody th { white-space: normal; min-width: 11em; }
      .resumen thead th { text-align: center; }
      .resumen thead th:first-child { text-align: left; }
      .resumen tr.grupo th { background: var(--fondo-3); }
      .estado {
        display: inline-block; padding: 2px 8px; border-radius: 999px;
        font-size: 0.78rem; font-weight: 600; white-space: nowrap; color: #fff;
      }
      .estado--ok { background: var(--ok); }
      .estado--aviso { background: var(--aviso); color: #1d1405; }
      .estado--stop { background: var(--stop); }
      .estado--neutro { background: var(--neutro); }
      .estado--desconocido { background: var(--desconocido); }
      details { background: var(--fondo-2); border: 1px solid var(--borde); border-radius: var(--radio); padding: 8px 14px; margin: 10px 0; }
      summary { cursor: pointer; font-weight: 600; }
      details ul { margin: 4px 0 8px; padding-left: 20px; }
      .permiso { font-size: 0.92rem; }
      .normas { font-size: 0.88rem; color: var(--texto-2); }
      .indice { columns: 2 18em; padding-left: 20px; }
      @media (max-width: 560px) {
        h1 { font-size: 1.45rem; }
        .barra a.marca span { display: none; }
      }
    </style>
  </head>
  <body>
    <header class="barra">
      <a class="marca" href="/">Reservas marinas <span>· Illes Balears</span></a>
      <a class="boton" href="/#isla=${esc(isla)}">Abrir el mapa de ${esc(nombreIsla)}</a>
    </header>
    <main>
      <nav class="nota" aria-label="Ruta"><a href="/">Mapa de reservas marinas de Baleares</a> › Reservas marinas de ${esc(nombreIsla)}</nav>
      <h1>Reservas marinas de ${esc(nombreIsla)}</h1>
      <p class="entradilla">${esc(nombreIsla)} tiene ${reservas.length} reservas marinas: ${reservas
        .map((r) => esc(r.nombre.replace(/^Reserva marina (de la |del |de las |de )/, '')))
        .join(', ')
        .replace(/, ([^,]*)$/, ' y $1')}. Cada una se divide en zonas con normas distintas, y en algunas conviven un ámbito autonómico y otro estatal con regímenes diferentes. Aquí está, zona por zona, qué se puede hacer y qué autorización hace falta, con la norma que lo dice.</p>
      <p class="aviso">Web informativa no oficial. La fuente vinculante es la norma publicada en el BOIB o el BOE. Para saber qué rige en un punto concreto —donde se superponen varias figuras— usa <a href="/#isla=${esc(isla)}">el mapa</a>: pulsa el punto y reúne todas las que lo contienen. Fichas revisadas hasta el ${esc(fechaLarga(revision))}; cartografía oficial del ${esc(fechaLarga(manifiesto.generado))}.</p>

      <h2>Resumen por zona</h2>
      <div class="tabla">
        <table class="resumen">
          <thead><tr><th scope="col">Zona</th>${Object.keys(ACTIVIDADES)
            .map((k) => `<th scope="col" title="${esc(ACTIVIDADES[k])}">${esc(COLUMNA[k])}</th>`)
            .join('')}</tr></thead>
          <tbody>${resumen}
          </tbody>
        </table>
      </div>
      <p class="nota">«Restringida» significa que se puede, pero con límites de días, aparejos, cupos o lugares: el detalle está en cada zona.</p>

      <nav aria-label="Reservas">
        <ul class="indice">${indice}${otras.length ? '<li><a href="#otras-figuras">Otras figuras que también mandan</a></li>' : ''}</ul>
      </nav>
${cuerpoReservas}
${otrasHtml}
      <p class="pie">Generado a partir de las mismas fichas que usa <a href="/">el mapa</a>. Si ves algo que no cuadra con la norma, la norma manda.</p>
    </main>
  </body>
</html>
`;
}
