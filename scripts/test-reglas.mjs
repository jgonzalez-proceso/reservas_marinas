#!/usr/bin/env node
/**
 * Pruebas del motor sobre puntos reales.
 *
 * `rules:check` valida la forma de las fichas: que citen fuente, que no haya
 * ciclos de herencia, que ningún zoneId quede huérfano. Lo que no puede ver es
 * si la conclusión que sale por el otro lado es la correcta — ni, sobre todo,
 * si una regla se ha atado al polígono equivocado.
 *
 * Eso es lo que se prueba aquí: se toma una coordenada concreta, se resuelve
 * contra la cartografía real y se comprueba la conclusión y de qué figura sale.
 *
 * Cada prueba afirma primero las propiedades geométricas del punto que usa. Si
 * mañana cambia una geometría oficial y el punto deja de estar donde estaba, la
 * prueba falla diciendo eso, en vez de fallar por la conclusión y mandar a
 * buscar el error al sitio equivocado.
 *
 * Las coordenadas no están elegidas a ojo: salen de muestrear el interior de
 * cada polígono y quedarse con un punto central de los que cumplen la condición
 * buscada.
 */

import { readFileSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';

import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

import { resolver } from '../src/engine/resolve.js';
import { FICHAS } from '../src/rules/index.js';

const RAIZ = resolvePath(dirname(fileURLToPath(import.meta.url)), '..');
const manifiesto = JSON.parse(readFileSync(resolvePath(RAIZ, 'src/data/manifest.json'), 'utf8'));

/** Todas las capas de todas las islas, deduplicadas como hace la web. */
const FEATURES = (() => {
  const ficheros = [
    ...new Set(
      Object.values(manifiesto.porIsla ?? {}).flatMap((i) => i.ficheros.map((f) => f.fichero)),
    ),
  ];
  const porFeatureId = new Map();
  for (const fichero of ficheros) {
    const capa = JSON.parse(readFileSync(resolvePath(RAIZ, 'src/data/capas', fichero), 'utf8'));
    for (const f of capa.features) {
      if (!porFeatureId.has(f.properties.featureId)) porFeatureId.set(f.properties.featureId, f);
    }
  }
  return [...porFeatureId.values()];
})();

const PARQUE_LLEVANT = 'enp-es530007-parc-natural-de-la-peninsula-de-llevant--parc-natural--mari';
const PARQUE_TRENC =
  'enp-es0000037-parc-natural-maritimoterrestre-es-trenc-salobrar-de-campos--parc-natural--mari';

const punto = (lon, lat) => ({ lat, lon });
const geoJsonPunto = (p) => ({ type: 'Point', coordinates: [p.lon, p.lat] });

/** ¿El punto cae dentro de alguna geometría de esta zona? */
function dentroDe(p, zoneId) {
  return FEATURES.filter((f) => f.properties.zoneId === zoneId).some((f) =>
    booleanPointInPolygon(geoJsonPunto(p), f),
  );
}

/** ¿Y dentro de alguna geometría de una fuente, o de las que cumplan un filtro? */
function dentroDeAlguna(p, filtro) {
  return FEATURES.filter((f) => filtro(f.properties)).some((f) =>
    booleanPointInPolygon(geoJsonPunto(p), f),
  );
}

const esReservaMarinaDelLlevant = (pr) =>
  pr.fuente === 'reservas-marinas' && pr.zoneId.includes('levante-de-mallorca');

// ---------------------------------------------------------------------------
// Es Trenc-Salobrar de Campos
// ---------------------------------------------------------------------------

test('es Trenc: la pesca submarina está prohibida en el ámbito marino del parque', () => {
  const p = punto(2.977630, 39.332378);
  assert.ok(dentroDe(p, PARQUE_TRENC), 'el punto de prueba debe caer dentro del ámbito marino de es Trenc');

  const r = resolver(p, FEATURES, FICHAS);
  const a = r.actividades.pescaSubmarina;

  assert.equal(a.status, 'prohibited');
  assert.equal(a.determinadaPor.zoneId, PARQUE_TRENC);
  assert.ok(
    a.sources.includes('boib-ley-2-2017-es-trenc'),
    'la conclusión debe citar la Ley 2/2017, que es la que prohíbe (art. 4.1.c)',
  );
  assert.equal(a.incompleto, false, 'ninguna figura del punto puede quedarse sin regla de pesca submarina');
});

// ---------------------------------------------------------------------------
// Península de Llevant
//
// La prueba que de verdad importa: la prohibición del art. 40.1.h es del PORN
// del parque, no del decreto de la reserva marina. Si alguien la ata al
// polígono de la reserva, este punto —dentro del parque y fuera de la reserva—
// vuelve a contestar «no determinable».
// ---------------------------------------------------------------------------

test('Llevant: prohibida dentro del parque aunque el punto quede fuera de la reserva marina', () => {
  const p = punto(3.503391, 39.734360);
  assert.ok(dentroDe(p, PARQUE_LLEVANT), 'el punto debe caer dentro del ámbito marino del parque');
  assert.ok(
    !dentroDeAlguna(p, esReservaMarinaDelLlevant),
    'y debe caer FUERA de la Reserva Marina del Llevant: es lo que hace útil esta prueba',
  );

  const r = resolver(p, FEATURES, FICHAS);
  const a = r.actividades.pescaSubmarina;

  assert.equal(a.status, 'prohibited');
  assert.equal(a.determinadaPor.zoneId, PARQUE_LLEVANT);
  assert.ok(
    a.sources.includes('boib-decreto-8-2023-porn-llevant'),
    'la conclusión debe citar el PORN de Llevant (art. 40.1.h)',
  );
  assert.equal(a.incompleto, false);
});

test('Llevant: parque, reserva marina y Natura 2000 se apilan sin fusionarse', () => {
  const p = punto(3.411694, 39.768996);

  const r = resolver(p, FEATURES, FICHAS);
  const fuentes = new Set(r.figuras.map((f) => f.fuente));

  assert.ok(dentroDe(p, PARQUE_LLEVANT), 'el punto debe estar dentro del parque natural');
  assert.ok(dentroDeAlguna(p, esReservaMarinaDelLlevant), 'y dentro de la reserva marina');
  assert.ok(fuentes.has('espacios-naturales'), 'la figura del parque natural debe conservarse');
  assert.ok(fuentes.has('reservas-marinas'), 'la de la reserva marina también');
  assert.ok(fuentes.has('natura2000'), 'y la de Natura 2000');

  const a = r.actividades.pescaSubmarina;
  assert.equal(a.status, 'prohibited');

  // Ninguna figura desaparece en favor de otra: todas las que aportan una regla
  // deben poder citarse, aunque solo una determine el estado.
  assert.ok(
    a.sources.includes('boib-decreto-8-2023-porn-llevant'),
    'entre las fuentes debe estar la del PORN del parque',
  );
  assert.ok(a.sources.length > 1, 'y la de alguna otra figura que también restringe aquí');
  assert.ok(r.figuras.length >= 3, `se esperaban al menos 3 figuras, hay ${r.figuras.length}`);
});

// ---------------------------------------------------------------------------
// s'Albufera des Grau — el mismo parque contesta distinto según dónde se pulse
// ---------------------------------------------------------------------------

const ALBUFERA = [
  {
    nombre: 'norte (Favàritx y Addaia): prohibida',
    p: punto(4.26072, 39.97595),
    status: 'prohibited',
    zoneId: 'psub-04-ag-parc-natural-de-s-albufera-des-grau--zona-pesca-submarina-prohibida--mari',
  },
  {
    nombre: 'sur (Es Grau y illa d’en Colom): autorizable',
    p: punto(4.27998, 39.94651),
    status: 'allowed_with_authorization',
    zoneId:
      'psub-04-ag-parc-natural-de-s-albufera-des-grau--zona-pesca-submarina-condicionada--mari',
  },
  {
    nombre: 'zona de exclusión del port d’Addaia: prohibida',
    p: punto(4.20592, 40.00554),
    status: 'prohibited',
    zoneId: 'zon-04-ag-parc-natural-de-s-albufera-des-grau--zona-d-exclusio--mari',
  },
];

for (const caso of ALBUFERA) {
  test(`s'Albufera des Grau — ${caso.nombre}`, () => {
    const r = resolver(caso.p, FEATURES, FICHAS);
    const a = r.actividades.pescaSubmarina;
    assert.equal(a.status, caso.status);
    assert.equal(a.determinadaPor.zoneId, caso.zoneId);
    assert.equal(a.incompleto, false);
  });
}

// ---------------------------------------------------------------------------
// Invariantes generales
// ---------------------------------------------------------------------------

test('ninguna ficha deja la pesca submarina sin resolver', () => {
  const sinRegla = Object.values(FICHAS)
    .filter((f) => !f.actividades?.pescaSubmarina || f.actividades.pescaSubmarina.status === 'unknown')
    .map((f) => f.zoneId);
  assert.deepEqual(sinRegla, [], `fichas con la pesca submarina en unknown: ${sinRegla.join(', ')}`);
});

test('toda regla de pesca submarina distinta de unknown cita al menos una fuente', () => {
  const sinFuente = Object.values(FICHAS)
    .filter((f) => {
      const regla = f.actividades?.pescaSubmarina;
      return regla && regla.status !== 'unknown' && !(regla.sources ?? []).length;
    })
    .map((f) => f.zoneId);
  assert.deepEqual(sinFuente, []);
});
