/**
 * Extrae el texto normativo traducible de las fichas.
 *
 * Es la lista de partida de cualquier catalogo de `src/i18n/normativa/`, y la
 * usa `check-i18n.mjs` para medir cobertura. No escribe nada: imprime, para
 * que quien traduce decida donde lo pone.
 *
 *   node scripts/extrae-normativa.mjs            recuento y cobertura
 *   node scripts/extrae-normativa.mjs --faltan ca  solo lo que falta en catalan
 */

import { FICHAS_DECLARADAS } from '../src/rules/index.js';
import { FUENTES } from '../src/rules/fuentes.js';

/**
 * Que se traduce y que no.
 *
 * No todo el texto de una ficha es lo mismo. Hay dos clases y solo una viaja
 * al catalogo:
 *
 *  - **Cita.** El titulo de una norma, el nombre de una figura, el titulo del
 *    documento al que apunta una fuente. Son identificadores: «Decret
 *    91/2023, de 15 de desembre, pel qual es regula la pesca maritima…» es
 *    como se llama esa norma y como hay que buscarla en el BOIB. Traducirla
 *    seria inventarse un titulo oficial que nadie ha publicado, y ademas
 *    dejaria al usuario delante de un enlace cuyo destino no se parece a lo
 *    que el enlace prometia. **No se traducen, en ningun idioma.** Buena parte
 *    ya estan en catalan, que es como las publica el boletin.
 *
 *  - **Prosa.** El motivo en lenguaje llano, las condiciones, la nota de un
 *    permiso, el resumen de la zona. Esto lo ha escrito este proyecto para que
 *    se entienda, no lo ha copiado de ningun sitio. Es lo que se traduce.
 *
 * `resumen` no lo pinta hoy ningun sitio del panel, pero se extrae igual: esta
 * escrito para leerse y el dia que se muestre no habria por que acordarse de
 * volver aqui.
 */
export function cadenasNormativas() {
  const cuenta = new Map();
  const anota = (texto, procedencia) => {
    if (typeof texto !== 'string' || !texto.trim()) return;
    const ficha = cuenta.get(texto) ?? { veces: 0, procedencias: new Set() };
    ficha.veces += 1;
    ficha.procedencias.add(procedencia);
    cuenta.set(texto, ficha);
  };

  for (const f of FICHAS_DECLARADAS) {
    const donde = f.nombreCorto ?? f.zoneId;
    // `nombreCorto` y los titulos de `normas` son cita: quedan fuera.
    anota(f.resumen, donde);
    for (const regla of Object.values(f.actividades ?? {})) {
      anota(regla?.motivo, donde);
      for (const c of regla?.conditions ?? []) anota(c, donde);
      if (regla?.permit) {
        anota(regla.permit.nota, donde);
        anota(regla.permit.vigencia, donde);
      }
    }
  }

  for (const [clave, f] of Object.entries(FUENTES)) {
    // `titulo` es el nombre del documento enlazado: cita. `referencia` es la
    // nota que este proyecto escribe sobre el —«Tasas por duración y reserva:
    // diaria 5,24 €…»— y esa si se lee y se traduce.
    anota(f.referencia, `fuente:${clave}`);
  }

  // De mas repetida a menos: traducir por ahi hace que un catalogo a medias
  // cubra la mayor parte de lo que se llega a leer. Las 78 fichas de Natura
  // 2000 comparten literalmente sus motivos.
  return [...cuenta.entries()]
    .map(([texto, d]) => ({ texto, veces: d.veces, procedencias: [...d.procedencias] }))
    .sort((a, b) => b.veces - a.veces || a.texto.localeCompare(b.texto, 'es'));
}

if (process.argv[1]?.endsWith('extrae-normativa.mjs')) {
  const cadenas = cadenasNormativas();
  const idioma = process.argv.includes('--faltan') ? process.argv[process.argv.indexOf('--faltan') + 1] : null;

  if (!idioma) {
    const apariciones = cadenas.reduce((a, c) => a + c.veces, 0);
    console.log(`${cadenas.length} cadenas unicas en ${apariciones} apariciones`);
    console.log(`${cadenas.reduce((a, c) => a + c.texto.length, 0)} caracteres`);
    process.exit(0);
  }

  const { default: catalogo } = await import(`../src/i18n/normativa/${idioma}.js`);
  const faltan = cadenas.filter((c) => !Object.hasOwn(catalogo, c.texto));
  console.log(JSON.stringify(faltan, null, 1));
}
