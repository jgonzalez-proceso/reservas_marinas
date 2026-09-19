#!/usr/bin/env node
/**
 * Comprobación de los enlaces que la web publica.
 *
 * Esta web manda a la gente a tramitar autorizaciones y a leer normas. Un
 * enlace muerto ahí no es un detalle estético: el panel ofrece «Tramitar en la
 * Seu Electrònica» y quien lo pulsa acaba en una página que no existe. Pasó de
 * verdad —la URL de permisos de buceo llevaba meses devolviendo 404 en siete
 * fichas— y ningún control lo detectó, porque nada comprobaba las URLs.
 *
 * Recorre las tres familias de enlaces publicados:
 *   - `url` de cada entrada de src/rules/fuentes.js;
 *   - `url` de cada norma de cada ficha;
 *   - `url` de cada permiso (`permit`) de cada actividad.
 *
 * NO se engancha al build a propósito. `npm run build` tiene que funcionar sin
 * red y de forma determinista; esto depende de servidores ajenos y de que el
 * CAIB esté en pie, así que va en su propio comando y se ejecuta cuando se
 * tocan fuentes o permisos.
 *
 * Criterio de fallo, deliberadamente asimétrico:
 *   - 4xx (salvo 429) hace fallar: el recurso no está donde decimos.
 *   - 5xx, 429 y los fallos de red solo avisan: son del servidor o del momento,
 *     y hacer fallar por ellos enseñaría a ignorar este script, que es la peor
 *     manera de perder un 404 real. Con --estricto también fallan.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FICHAS_LISTA } from '../src/rules/index.js';
import { FUENTES } from '../src/rules/fuentes.js';
import { SUSTITUCIONES } from '../src/sources/normalize.js';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const ESTRICTO = process.argv.includes('--estricto');

// El CAIB responde 403 a las peticiones sin identificar. No es una treta: es
// exactamente lo que enviaría el navegador de quien pulse el enlace, que es lo
// que queremos comprobar.
const CABECERAS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  'Accept-Language': 'es,ca;q=0.9',
};

const TIMEOUT_MS = 25_000;

// Cuatro y no más: con seis en paralelo el eboibfront empieza a desviar
// peticiones legítimas a su página de error, y un verificador que acusa en
// falso se acaba ignorando, que es la forma segura de perder un 404 de verdad.
const CONCURRENCIA = 4;

// Por eso mismo, nada se declara roto a la primera. Medido contra el BOIB: la
// misma URL que devolvía `pdfError` bajo carga responde un PDF de 27 MB
// cuando se le pregunta sola.
const REINTENTOS = 2;
const ESPERA_REINTENTO_MS = 1500;

// Un 200 no basta: el eboibfront contesta a un documento inexistente con un
// 200 y una redirección a su propia página de error, así que el enlace parece
// sano sin estarlo. Se mira el destino final, no solo el código.
const DESTINOS_DE_ERROR = [/\/pdfError/i, /\/error(\.|\/|$)/i, /\/404(\.|\/|$)/i];
const esDestinoDeError = (destino) => DESTINOS_DE_ERROR.some((r) => r.test(destino ?? ''));

const duerme = (ms) => new Promise((r) => setTimeout(r, ms));

// -- 1. Recolección: una URL puede estar publicada en varios sitios -----------

/** @type {Map<string, Set<string>>} url -> dónde se publica */
const usos = new Map();

/**
 * URLs en claro. No se comprueban: se denuncian.
 *
 * Antes la guarda era `/^https?:/i`, que acepta `http` por construcción, así
 * que una cita en claro se descargaba por cleartext y se daba por sana. Un
 * verificador que bendice el problema que debería encontrar es peor que no
 * tenerlo. `rules:check` ya rechaza el esquema en lo que se escribe a mano y
 * corre dentro del build; esto cubre además lo que llega del IDEIB.
 */
const enClaro = new Map();

const anota = (url, donde) => {
  if (typeof url !== 'string') return;
  if (/^http:/i.test(url)) {
    if (!enClaro.has(url)) enClaro.set(url, new Set());
    enClaro.get(url).add(donde);
    return;
  }
  if (!/^https:/i.test(url)) return;
  if (!usos.has(url)) usos.set(url, new Set());
  usos.get(url).add(donde);
};

for (const [clave, f] of Object.entries(FUENTES)) {
  anota(f.url, `fuentes.js → ${clave}`);
}

for (const ficha of FICHAS_LISTA) {
  const quien = ficha.nombreCorto ?? ficha.zoneId;
  for (const n of ficha.normas ?? []) {
    anota(n.url, `${quien} → norma «${(n.titulo ?? '').slice(0, 50)}…»`);
  }
  for (const [actividad, regla] of Object.entries(ficha.actividades ?? {})) {
    anota(regla?.permit?.url, `${quien} → permiso de ${actividad}`);
  }
}

// Las capas servidas, que es lo que el navegador descarga y lo que el panel
// convierte en enlaces. Se quedaban fuera: este script solo miraba lo escrito a
// mano en `src/rules/`, y las URLs de norma que vienen del campo de texto libre
// del IDEIB —siete figuras con host interno o en claro— no las veía nadie.
const dirCapas = resolve(RAIZ, 'src/data/capas');
for (const fichero of readdirSync(dirCapas).filter((n) => n.endsWith('.geojson'))) {
  const capa = JSON.parse(readFileSync(resolve(dirCapas, fichero), 'utf8'));
  for (const f of capa.features ?? []) {
    for (const n of f.properties?.normas ?? []) {
      // Lo que hay que comprobar es el destino al que el panel manda a la
      // gente, no el que el IDEIB dejó escrito. Si no, las dos citas que
      // `SUSTITUCIONES` ya redirige seguirían saliendo rojas para siempre
      // en un informe que precisamente existe para que el rojo signifique
      // algo. Se anota que van sustituidas para que no parezca que el
      // enlace original se ha arreglado solo.
      const sustituta = SUSTITUCIONES.get(n.url);
      const norma = `norma «${(n.titulo ?? '').slice(0, 40)}…»`;
      const donde = `capas/${fichero} → ${f.properties.nombre} → ${norma}`;
      anota(sustituta ?? n.url, sustituta ? `${donde} [sustituida: el enlace del IDEIB da 404]` : donde);
    }
  }
}

const urls = [...usos.keys()].sort();

// -- 2. Comprobación ---------------------------------------------------------

async function pide(url, metodo) {
  const corte = AbortSignal.timeout(TIMEOUT_MS);
  return fetch(url, {
    method: metodo,
    redirect: 'follow',
    headers: CABECERAS,
    signal: corte,
  });
}

/** Un veredicto malo se repite antes de darlo por bueno; uno bueno vale ya. */
async function comprueba(url) {
  let ultimo;
  for (let intento = 1; intento <= REINTENTOS; intento++) {
    ultimo = await intenta(url);
    if (ultimo.estado === 'ok' || ultimo.estado === 'redirige') return ultimo;
    if (intento < REINTENTOS) await duerme(ESPERA_REINTENTO_MS);
  }
  return { ...ultimo, detalle: `${ultimo.detalle} (tras ${REINTENTOS} intentos)` };
}

async function intenta(url) {
  try {
    // HEAD primero: no descarga el cuerpo y con los PDF del BOE o del BOIB eso
    // es la diferencia entre unos bytes y varios megas. Bastantes servidores no
    // lo implementan bien, así que su rechazo no se toma por respuesta buena.
    let res = await pide(url, 'HEAD');
    if (res.status === 405 || res.status === 501 || res.status === 403) {
      res = await pide(url, 'GET');
    }

    const redirigida = res.url && res.url !== url;
    if (res.ok) {
      if (esDestinoDeError(res.url)) {
        return { estado: 'roto', detalle: `${res.status} pero acaba en ${res.url}` };
      }
      return redirigida
        ? { estado: 'redirige', detalle: `${res.status} → ${res.url}` }
        : { estado: 'ok', detalle: String(res.status) };
    }
    if (res.status === 429) return { estado: 'aviso', detalle: '429 (limitado por el servidor)' };
    if (res.status >= 500) return { estado: 'aviso', detalle: `${res.status} (error del servidor)` };
    return { estado: 'roto', detalle: `${res.status} ${res.statusText}`.trim() };
  } catch (e) {
    const causa = e.name === 'TimeoutError' ? `sin respuesta en ${TIMEOUT_MS / 1000} s` : e.message;
    return { estado: 'aviso', detalle: `no verificable (${causa})` };
  }
}

/** Cola con concurrencia fija: el objetivo es comprobar, no castigar al CAIB. */
async function enTandas(items, limite, tarea) {
  const salida = new Array(items.length);
  let siguiente = 0;
  const obreros = Array.from({ length: Math.min(limite, items.length) }, async () => {
    while (siguiente < items.length) {
      const i = siguiente++;
      salida[i] = await tarea(items[i]);
    }
  });
  await Promise.all(obreros);
  return salida;
}

console.log(`Comprobando ${urls.length} enlaces publicados (${usos.size} únicos)…\n`);

const resultados = await enTandas(urls, CONCURRENCIA, async (url) => ({
  url,
  ...(await comprueba(url)),
}));

// -- 3. Informe --------------------------------------------------------------

const por = (estado) => resultados.filter((r) => r.estado === estado);
const rotos = por('roto');
const avisos = por('aviso');
const redirigen = por('redirige');

console.log(
  `  ${por('ok').length} correctos · ${redirigen.length} redirigen · ` +
    `${avisos.length} no verificables · ${rotos.length} rotos`,
);

if (redirigen.length > 0) {
  console.log('\nRedirigen (el destino responde, pero la URL publicada ya no es la definitiva):');
  for (const r of redirigen) {
    console.log(`  ${r.url}\n    ${r.detalle}`);
  }
}

if (avisos.length > 0) {
  console.log('\nNo verificables ahora (servidor caído, lento o limitando):');
  for (const r of avisos) {
    console.log(`  ${r.url}\n    ${r.detalle}`);
  }
}

if (rotos.length > 0) {
  console.error('\nENLACES ROTOS:');
  for (const r of rotos) {
    console.error(`\n  ${r.url}`);
    console.error(`    ${r.detalle}`);
    for (const donde of usos.get(r.url)) console.error(`    publicado en: ${donde}`);
  }
}

if (enClaro.size > 0) {
  console.error('\nENLACES EN CLARO (http://):');
  for (const [url, dondes] of enClaro) {
    console.error(`\n  ${url}`);
    for (const donde of dondes) console.error(`    publicado en: ${donde}`);
  }
  console.error(
    '\n  No se han comprobado: se denuncian. Si el host sirve https, cámbialo;' +
      '\n  si viene del IDEIB, lo asciende limpiaUrl al ejecutar npm run data.',
  );
}

if (rotos.length > 0 || enClaro.size > 0 || (ESTRICTO && avisos.length > 0)) {
  const partes = [];
  if (rotos.length > 0) partes.push(`${rotos.length} enlace(s) roto(s)`);
  if (enClaro.size > 0) partes.push(`${enClaro.size} en claro`);
  if (ESTRICTO && avisos.length > 0) partes.push(`${avisos.length} no verificable(s)`);
  console.error(`\n${partes.join(', ')}. Corrige la URL o retírala.`);
  process.exit(1);
}

console.log('\nTodos los enlaces publicados responden, y ninguno viaja en claro.');
