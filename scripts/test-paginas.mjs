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

  test(`${isla}: el enlace del panel a cada zona cae en un ancla de la página`, () => {
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    for (const id of enPagina) {
      const href = enlaceZona(id);
      assert.ok(href?.startsWith(rutaIsla(isla) + '#'), `${id}: enlace ${href}`);
      assert.ok(ids.has(href.split('#')[1]), `${id}: el panel enlaza a #${href.split('#')[1]}, que la página no tiene`);
    }
  });
}
