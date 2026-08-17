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
// Parc Natural de ses Salines d'Eivissa i Formentera
//
// Aquí conviven el parque, su zonificación del PRUG, la capa oficial de
// regulación del fondeo, la Reserva Marina dels Freus con sus subzonas y varios
// espacios Natura 2000. Estas pruebas comprueban que ninguna figura tapa a otra
// y que cada actividad la decide la norma que de verdad la regula.
// ---------------------------------------------------------------------------

const PARQUE_SALINES =
  'enp-es530010-parc-natural-de-ses-salines-d-eivissa-i-formentera--parc-natural--mari';
const APE_SALINES =
  'zon-08-ss-parc-natural-de-ses-salines-d-eivissa-i-formentera--area-de-proteccio-estricta--mari';

const esReservaDelsFreus = (pr) => pr.fuente === 'reservas-marinas' && pr.zoneId.includes('freus');

test('ses Salines: prohibida dentro del parque aunque el punto quede fuera de la reserva marina', () => {
  const p = punto(1.36474, 38.856824);
  assert.ok(dentroDe(p, PARQUE_SALINES), 'el punto debe caer dentro del ámbito marino del parque');
  assert.ok(
    !dentroDeAlguna(p, esReservaDelsFreus),
    'y fuera de la Reserva Marina dels Freus: es lo que hace útil esta prueba',
  );

  const r = resolver(p, FEATURES, FICHAS);
  const a = r.actividades.pescaSubmarina;
  assert.equal(a.status, 'prohibited');
  assert.equal(a.determinadaPor.zoneId, PARQUE_SALINES);
  assert.ok(a.sources.includes('boib-decreto-132-2005-prug-salines'));
  assert.equal(r.incompleto, false, 'ninguna actividad puede quedar sin resolver aquí');
});

test('ses Salines: en un área marina de protección estricta no se pesca, no se bucea y no se fondea', () => {
  const p = punto(1.487453, 38.798229);
  assert.ok(dentroDe(p, APE_SALINES), 'el punto debe caer en un área marina de protección estricta');

  const r = resolver(p, FEATURES, FICHAS);
  const prohibidas = [
    'pescaDesdeCosta',
    'pescaRecreativaEmbarcacion',
    'pescaSubmarina',
    'buceo',
    'fondeo',
  ];
  for (const clave of prohibidas) {
    assert.equal(r.actividades[clave].status, 'prohibited', clave + ' debería estar prohibida');
  }
  assert.equal(r.actividades.pescaDesdeCosta.determinadaPor.zoneId, APE_SALINES);
  assert.equal(r.actividades.buceo.determinadaPor.zoneId, APE_SALINES);
});

test('ses Salines: en el resto del ámbito marino la pesca de superficie es restringida y el buceo autorizable', () => {
  const p = punto(1.38626, 38.805875);
  assert.ok(dentroDe(p, PARQUE_SALINES));
  assert.ok(!dentroDe(p, APE_SALINES), 'el punto NO debe estar en un área de protección estricta');

  const r = resolver(p, FEATURES, FICHAS);
  assert.equal(r.actividades.pescaSubmarina.status, 'prohibited');
  assert.equal(r.actividades.pescaDesdeCosta.status, 'restricted');
  assert.equal(r.actividades.pescaRecreativaEmbarcacion.status, 'restricted');
  assert.equal(r.actividades.buceo.status, 'allowed_with_authorization');
  assert.ok(r.actividades.buceo.permit, 'el buceo autorizable debe describir su permiso');
});

const FONDEO_SALINES = [
  {
    nombre: 'prohibido',
    p: punto(1.406093, 38.730845),
    zoneId: 'fon-08-ss-parc-natural-de-ses-salines-d-eivissa-i-formentera--fondeig-prohibit--mari',
    status: 'prohibited',
    dice: 'fuerza mayor',
  },
  {
    nombre: 'regulado',
    p: punto(1.423229, 38.78064),
    zoneId: 'fon-08-ss-parc-natural-de-ses-salines-d-eivissa-i-formentera--fondeig-regulat--mari',
    status: 'restricted',
    dice: 'boyas habilitadas',
  },
  {
    nombre: 'libre condicionado',
    p: punto(1.419291, 38.801329),
    zoneId:
      'fon-08-ss-parc-natural-de-ses-salines-d-eivissa-i-formentera--fondeig-lliure-condicionat--mari',
    status: 'restricted',
    dice: 'fondo arenoso',
  },
];

for (const caso of FONDEO_SALINES) {
  test('ses Salines — fondeo ' + caso.nombre + ': lo decide el art. 117, no el Real Decreto', () => {
    assert.ok(dentroDe(caso.p, caso.zoneId), 'el punto debe caer dentro de su polígono de fondeo');

    const a = resolver(caso.p, FEATURES, FICHAS).actividades.fondeo;
    assert.equal(a.status, caso.status);
    assert.equal(
      a.determinadaPor.zoneId,
      caso.zoneId,
      'debe determinarlo la capa oficial de regulación del fondeo',
    );
    assert.ok(
      a.conditions.some((c) => c.includes(caso.dice)),
      'las condiciones deben decir «' + caso.dice + '»; son: ' + JSON.stringify(a.conditions),
    );
    assert.ok(a.sources.includes('ideib-fondeo-ses-salines'));
  });
}

test('ses Salines: parque, reserva marina y zona de veda se apilan y manda la más restrictiva', () => {
  const p = punto(1.447654, 38.787072);
  assert.ok(dentroDe(p, PARQUE_SALINES), 'dentro del parque');
  assert.ok(dentroDeAlguna(p, esReservaDelsFreus), 'y dentro de una figura de la reserva marina');

  const r = resolver(p, FEATURES, FICHAS);
  assert.ok(
    r.figuras.some((f) => f.proteccion === 'Zona de veda de pesca recreativa'),
    'la zona de veda de pesca recreativa debe estar entre las figuras',
  );
  assert.ok(
    r.figuras.some((f) => f.zoneId === PARQUE_SALINES),
    'y el parque natural no puede desaparecer en favor de la reserva',
  );

  for (const clave of ['pescaDesdeCosta', 'pescaRecreativaEmbarcacion', 'pescaSubmarina']) {
    assert.equal(r.actividades[clave].status, 'prohibited', clave + ' debería estar prohibida');
  }
  const fuentes = r.actividades.pescaDesdeCosta.sources;
  assert.ok(
    fuentes.includes('boib-decreto-132-2005-prug-salines'),
    'la fuente del PRUG del parque debe seguir citada; hay: ' + fuentes.join(', '),
  );
});

test('ses Salines: ningún punto de sus figuras contesta otra cosa que «prohibida» a la pesca submarina', () => {
  // La prohibición es de todo el parque, pero sus tres capas oficiales no
  // cubren exactamente lo mismo: el área marina de protección estricta cae
  // entera fuera del polígono de límites. Se muestrea el interior de cada una.
  const zonas = [
    ...new Set(
      FEATURES.map((f) => f.properties.zoneId).filter(
        (z) => z === PARQUE_SALINES || /^(zon|fon)-08-ss/.test(z),
      ),
    ),
  ];
  assert.equal(zonas.length, 9, 'deberían ser las 9 zonas de ses Salines');

  let comprobados = 0;
  for (const zoneId of zonas) {
    const polis = FEATURES.filter((f) => f.properties.zoneId === zoneId);
    let w = 180;
    let e = -180;
    let s = 90;
    let n = -90;
    const rec = (x) => {
      if (typeof x[0] === 'number') {
        w = Math.min(w, x[0]);
        e = Math.max(e, x[0]);
        s = Math.min(s, x[1]);
        n = Math.max(n, x[1]);
      } else x.forEach(rec);
    };
    polis.forEach((f) => rec(f.geometry.coordinates));

    for (let i = 1; i < 12; i++) {
      for (let j = 1; j < 12; j++) {
        const p = { lat: s + ((n - s) * i) / 12, lon: w + ((e - w) * j) / 12 };
        if (!polis.some((f) => booleanPointInPolygon(geoJsonPunto(p), f))) continue;
        comprobados += 1;
        const a = resolver(p, FEATURES, FICHAS).actividades.pescaSubmarina;
        assert.equal(a.status, 'prohibited', 'en ' + zoneId + ' salió "' + a.status + '"');
      }
    }
  }
  assert.ok(comprobados > 100, 'se esperaban muchos puntos, solo se comprobaron ' + comprobados);
});

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
