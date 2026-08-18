/**
 * Integridad de los catalogos de idioma.
 *
 * Comprueba cuatro cosas, y solo una de ellas hace fallar:
 *
 *  1. **Los cuatro catalogos de interfaz tienen las mismas claves.** Esto SI
 *     falla. Una clave que existe en castellano y no en aleman no es un idioma
 *     incompleto sino una linea que alguien olvido copiar, y el respaldo la
 *     esconde: la interfaz sale entera salvo una frase, que nadie nota hasta
 *     que la ve un aleman. Una clave que existe en aleman y no en castellano
 *     es peor todavia, porque no tiene respaldo posible.
 *
 *  2. **Los marcadores `{...}` coinciden entre idiomas.** Tambien falla. Un
 *     `{distancia}` que en la traduccion se escribio `{distancia }` no da
 *     error en ninguna parte: se pinta tal cual, con las llaves, en medio de
 *     la frase. Es el fallo mas tonto de este sistema y el mas facil de ver
 *     desde aqui.
 *
 *  3. **Toda figura de proteccion de la cartografia tiene descripcion.** Falla
 *     igualmente. Si el IDEIB publica manana una figura nueva, el mapa la
 *     dibuja y la leyenda la describe como generica; que el script lo diga es
 *     mas barato que descubrirlo en produccion.
 *
 *  4. **Cobertura del texto normativo.** Esto NO falla, solo informa. Que una
 *     ficha se anada en castellano y todavia no este traducida es el estado
 *     normal de un catalogo vivo, y romper el build por eso desanimaria de
 *     anadir fichas, que es el trabajo que de verdad importa aqui. El usuario
 *     ve el castellano, que es una respuesta correcta.
 *
 * Las **huerfanas** —traducciones cuya cadena origen ya no existe— tampoco
 * hacen fallar, pero se enumeran siempre. Una huerfana significa que alguien
 * corrigio el castellano y la traduccion se quedo atras; el panel ya esta
 * mostrando el castellano corregido, asi que no hay nada roto, pero hay una
 * traduccion que rehacer. Es justo el caso que el indexado por cadena origen
 * existe para hacer visible en vez de silencioso.
 *
 *   node scripts/check-i18n.mjs             informa
 *   node scripts/check-i18n.mjs --estricto  falla tambien con los avisos
 */

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { cadenasNormativas } from './extrae-normativa.mjs';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const IDIOMAS = ['es', 'ca', 'en', 'de'];
const IDIOMA_BASE = 'es';

const problemas = [];
const avisos = [];

// -- 1 y 2. Catalogos de interfaz --------------------------------------------

const catalogos = {};
for (const idioma of IDIOMAS) {
  catalogos[idioma] = (await import(`../src/i18n/catalogos/${idioma}.js`)).default;
}

const clavesBase = Object.keys(catalogos[IDIOMA_BASE]);
console.log(`Interfaz: ${clavesBase.length} claves en ${IDIOMAS.length} idiomas`);

/** `{nombre}` de una plantilla, ordenados, para poder comparar dos idiomas. */
const marcadores = (texto) =>
  [...String(texto).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

for (const idioma of IDIOMAS) {
  if (idioma === IDIOMA_BASE) continue;
  const claves = Object.keys(catalogos[idioma]);

  const faltan = clavesBase.filter((c) => !claves.includes(c));
  const sobran = claves.filter((c) => !clavesBase.includes(c));

  if (faltan.length) problemas.push(`${idioma}: faltan ${faltan.length} claves — ${faltan.join(', ')}`);
  if (sobran.length) {
    problemas.push(
      `${idioma}: ${sobran.length} claves que no existen en ${IDIOMA_BASE} y por tanto no tienen ` +
        `respaldo — ${sobran.join(', ')}`,
    );
  }

  for (const clave of clavesBase) {
    if (!claves.includes(clave)) continue;
    const a = marcadores(catalogos[IDIOMA_BASE][clave]);
    const b = marcadores(catalogos[idioma][clave]);
    if (a.join('|') !== b.join('|')) {
      problemas.push(
        `${idioma}/${clave}: los marcadores no coinciden — ${IDIOMA_BASE} usa {${a.join('}, {')}} ` +
          `y ${idioma} usa {${b.join('}, {')}}`,
      );
    }
  }
}

if (problemas.length === 0) console.log('  todas las claves y sus marcadores coinciden');

// -- 3. Descripciones de las figuras -----------------------------------------

const dirCapas = resolve(raiz, 'src/data/capas');
const protecciones = new Set();
for (const fichero of readdirSync(dirCapas)) {
  if (!fichero.endsWith('.geojson')) continue;
  const capa = JSON.parse(readFileSync(resolve(dirCapas, fichero), 'utf8'));
  for (const f of capa.features) protecciones.add(f.properties.proteccion);
}

const sinDescripcion = [...protecciones].filter(
  (p) => !Object.hasOwn(catalogos[IDIOMA_BASE], `proteccion.${p}`),
);
if (sinDescripcion.length) {
  problemas.push(
    `figuras sin descripcion en el catalogo: ${sinDescripcion.map((p) => `"${p}"`).join(', ')}`,
  );
} else {
  console.log(`  las ${protecciones.size} figuras de la cartografia tienen descripcion`);
}

// -- 4. Texto normativo -------------------------------------------------------

const cadenas = cadenasNormativas();
const apariciones = cadenas.reduce((a, c) => a + c.veces, 0);
const caracteres = cadenas.reduce((a, c) => a + c.texto.length, 0);

console.log(
  `\nTexto normativo: ${cadenas.length} cadenas unicas en ${apariciones} apariciones ` +
    `(${caracteres.toLocaleString('es-ES')} caracteres)`,
);

const porTexto = new Map(cadenas.map((c) => [c.texto, c]));

for (const fichero of readdirSync(resolve(raiz, 'src/i18n/normativa'))) {
  if (!fichero.endsWith('.js')) continue;
  const idioma = fichero.replace(/\.js$/, '');
  const catalogo = (await import(`../src/i18n/normativa/${fichero}`)).default;

  const traducidas = cadenas.filter((c) => Object.hasOwn(catalogo, c.texto));
  const cubiertas = traducidas.reduce((a, c) => a + c.veces, 0);
  const huerfanas = Object.keys(catalogo).filter((k) => !porTexto.has(k));

  const pct = (n, total) => `${((100 * n) / total).toFixed(1)} %`;
  console.log(
    `  ${idioma}: ${traducidas.length}/${cadenas.length} cadenas (${pct(traducidas.length, cadenas.length)}), ` +
      `${pct(cubiertas, apariciones)} de lo que se llega a leer`,
  );

  const faltan = cadenas.length - traducidas.length;
  if (faltan > 0) {
    avisos.push(
      `${idioma}: ${faltan} cadenas de texto normativo sin traducir; se muestran en castellano. ` +
        `Para verlas: node scripts/extrae-normativa.mjs --faltan ${idioma}`,
    );
  }

  if (huerfanas.length) {
    avisos.push(
      `${idioma}: ${huerfanas.length} traducciones huerfanas — su cadena en castellano ya no ` +
        'existe, seguramente porque se corrigio la ficha. El panel ya muestra el castellano ' +
        'corregido; hay que rehacer la traduccion o retirarla:\n' +
        huerfanas.map((h) => `      · ${h.slice(0, 100)}${h.length > 100 ? '…' : ''}`).join('\n'),
    );
  }
}

// -- Veredicto ----------------------------------------------------------------

if (avisos.length) {
  console.log('\nAvisos:');
  for (const a of avisos) console.log(`  ! ${a}`);
}

if (problemas.length) {
  console.error('\nProblemas:');
  for (const p of problemas) console.error(`  ✗ ${p}`);
  process.exit(1);
}

if (avisos.length && process.argv.includes('--estricto')) {
  console.error('\n--estricto: los avisos cuentan como error.');
  process.exit(1);
}

console.log('\nCatalogos correctos.');
