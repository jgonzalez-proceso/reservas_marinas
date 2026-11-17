#!/usr/bin/env node
/**
 * Pruebas de las páginas estáticas «Reservas marinas de <isla>».
 *
 * La página se genera de las fichas, así que su contenido ya está cubierto por
 * `rules:check` y `test-reglas`. Lo que puede fallar aquí es otra cosa: que una
 * reserva nueva se cargue en el mapa y no aparezca en su página —la lista de
 * reservas por isla es una tabla escrita a mano—, que un enlace interno apunte
 * a un ancla que no existe o que una cita salga en claro.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { ISLAS_POR_ZONA, zonaEnIsla } from '../src/data/islas.js';
import { FICHAS } from '../src/rules/index.js';
import { RESERVAS_POR_ISLA, paginaReservasIsla, rutaIsla } from './paginas/reservas-isla.mjs';
import { enlaceZona } from '../src/paginas/reservas.js';

const ids = new Map();
const idsDe = (isla) => {
  if (!ids.has(isla)) ids.set(isla, new Set([...paginaReservasIsla(isla).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(isla);
};

for (const isla of Object.keys(RESERVAS_POR_ISLA)) {
  const html = paginaReservasIsla(isla);
  const enPagina = new Set(RESERVAS_POR_ISLA[isla].flatMap((r) => r.fichas.map((f) => f.zoneId)));

  test(`${isla}: toda reserva marina de la isla está en su página`, () => {
    const deLaIsla = Object.entries(ISLAS_POR_ZONA)
      .filter(([id, v]) => id.startsWith('rm-') && zonaEnIsla(isla, v) && FICHAS[id])
      .map(([id]) => id);
    const faltan = deLaIsla.filter((id) => !enPagina.has(id));
    assert.deepEqual(faltan, [], `zonas de ${isla} sin sitio en RESERVAS_POR_ISLA: añádelas a su reserva`);
    const ajenas = [...enPagina].filter((id) => !zonaEnIsla(isla, ISLAS_POR_ZONA[id]));
    assert.deepEqual(ajenas, [], `zonas en la página de ${isla} que islas.js asigna a otra isla`);
  });

  test(`${isla}: cada zona sale con su nombre y ninguna como no determinable`, () => {
    for (const id of enPagina) {
      const nombre = FICHAS[id].nombreCorto.replaceAll('&', '&amp;');
      assert.ok(html.includes(nombre), `falta «${FICHAS[id].nombreCorto}»`);
    }
    assert.ok(!html.includes('>No determinable<'), 'hay una actividad sin resolver');
  });

  test(`${isla}: los enlaces internos llevan a algo y los externos son https`, () => {
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      if (href.startsWith('#')) assert.ok(ids.has(href.slice(1)), `ancla rota: ${href}`);
      else if (/^[a-z]+:/i.test(href)) assert.match(href, /^https:\/\//, `enlace no https: ${href}`);
      else assert.match(href, /^\//, `ruta relativa ambigua: ${href}`);
    }
  });

  test(`${isla}: el JSON-LD se parsea y solo hay un <script>`, () => {
    const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
    assert.equal(scripts.length, 1);
    assert.doesNotThrow(() => JSON.parse(scripts[0][1]));
  });

  // Tres defectos que salieron en la auditoría del 2026-11-17 y que ningún
  // control veía: la descripción pasaba de 180 caracteres y Google la cortaba,
  // las páginas no se enlazaban entre sí y los encabezados saltaban de h3 a h5.
  test(`${isla}: la descripción cabe en el resultado de búsqueda`, () => {
    const [, descripcion] = html.match(/<meta name="description" content="([^"]*)"/);
    assert.ok(descripcion.length <= 160, `${descripcion.length} caracteres: ${descripcion}`);
  });

  test(`${isla}: enlaza a las páginas de las demás islas`, () => {
    for (const otra of Object.keys(RESERVAS_POR_ISLA)) {
      if (otra === isla) continue;
      assert.ok(html.includes(`href="/${rutaIsla(otra)}"`), `falta el enlace a la página de ${otra}`);
    }
    assert.ok(!html.includes(`href="/${rutaIsla(isla)}"`), 'la página se enlaza a sí misma');
  });

  test(`${isla}: los encabezados no saltan de nivel`, () => {
    const niveles = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
    assert.equal(niveles[0], 1);
    for (let i = 1; i < niveles.length; i += 1) {
      assert.ok(niveles[i] - niveles[i - 1] <= 1, `salto de h${niveles[i - 1]} a h${niveles[i]}`);
    }
  });

  test(`${isla}: el enlace del panel a cada zona cae en un ancla de una página`, () => {
    for (const id of enPagina) {
      const href = enlaceZona(id);
      const destino = Object.keys(RESERVAS_POR_ISLA).find((i) => href?.startsWith(rutaIsla(i) + '#'));
      assert.ok(destino, `${id}: el panel enlaza a «${href}», que no es ninguna página de isla`);
      const ancla = href.split('#')[1];
      assert.ok(idsDe(destino).has(ancla), `${id}: el panel enlaza a #${ancla}, que la página de ${destino} no tiene`);
    }
  });
}
