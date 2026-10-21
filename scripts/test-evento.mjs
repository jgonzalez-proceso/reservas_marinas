/**
 * Pruebas del contador anónimo (`functions/api/evento.js`).
 *
 * Lo que más importa probar no es que cuente, sino que no guarde lo que no
 * debe: la posición de un GPS, valores fuera de lista o un identificador
 * colado en un campo de texto.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizaEvento, onRequestPost, BLOBS, DOUBLES } from '../functions/api/evento.js';

const ZONA = 'rm-reserva-marina-de-la-badia-de-palma--reserva-marina--autonomica';
const blob = (punto, nombre) => punto.blobs[BLOBS.indexOf(nombre)];
const double = (punto, nombre) => punto.doubles[DOUBLES.indexOf(nombre)];

test('un clic en el mapa se guarda con su celda redondeada a 0,01°', () => {
  const p = normalizaEvento({
    tipo: 'mapa',
    isla: 'mallorca',
    idioma: 'ca',
    figuras: [ZONA],
    figuraPrincipal: ZONA,
    estados: { pescaSubmarina: 'prohibited', fondeo: 'restricted' },
    lat: 39.512345,
    lon: 2.618765,
  });
  assert.deepEqual(p.indexes, ['mapa']);
  assert.equal(blob(p, 'isla'), 'mallorca');
  assert.equal(blob(p, 'idioma'), 'ca');
  assert.equal(blob(p, 'figuraPrincipal'), ZONA);
  assert.equal(blob(p, 'pescaSubmarina'), 'prohibited');
  assert.equal(blob(p, 'buceo'), '');
  assert.equal(double(p, 'numFiguras'), 1);
  assert.equal(double(p, 'celdaLat'), 39.51);
  assert.equal(double(p, 'celdaLon'), 2.62);
});

test('una consulta por GPS nunca guarda coordenadas, aunque lleguen', () => {
  const p = normalizaEvento({ tipo: 'gps', nivelGps: 'dudosa', lat: 39.512345, lon: 2.618765 });
  assert.equal(double(p, 'celdaLat'), 0);
  assert.equal(double(p, 'celdaLon'), 0);
  assert.equal(blob(p, 'nivelGps'), 'dudosa');
});

test('una celda fuera de Baleares no se guarda', () => {
  const p = normalizaEvento({ tipo: 'mapa', lat: 48.85, lon: 2.35 });
  assert.equal(double(p, 'celdaLat'), 0);
});

test('sin tipo válido no hay evento', () => {
  assert.equal(normalizaEvento({ tipo: 'visita' }), null);
  assert.equal(normalizaEvento(null), null);
  assert.equal(normalizaEvento('mapa'), null);
});

test('los valores fuera de lista se vacían en vez de guardarse', () => {
  const p = normalizaEvento({
    tipo: 'mapa',
    isla: 'mallorca; DROP',
    idioma: 'fr',
    figuras: [ZONA, 'usuario@correo.com', 'X'.repeat(500), ZONA],
    figuraPrincipal: 'otra-zona',
    estados: { pescaSubmarina: 'quizá' },
    nivelGps: 'dentro',
  });
  assert.equal(blob(p, 'isla'), '');
  assert.equal(blob(p, 'idioma'), '');
  assert.equal(blob(p, 'figuras'), ZONA, 'solo zoneIds bien formados, sin repetir');
  assert.equal(blob(p, 'figuraPrincipal'), '', 'la principal tiene que estar entre las figuras');
  assert.equal(blob(p, 'pescaSubmarina'), '');
  assert.equal(blob(p, 'nivelGps'), '', 'el nivel solo tiene sentido en una consulta por GPS');
});

test('una carga de página guarda el host de origen y nada más', () => {
  const p = normalizaEvento({ tipo: 'carga', isla: 'todas', idioma: 'ca', origen: 'www.google.com', lat: 39.5, lon: 2.6 });
  assert.deepEqual(p.indexes, ['carga']);
  assert.equal(blob(p, 'origen'), 'www.google.com');
  assert.equal(double(p, 'celdaLat'), 0, 'una carga no lleva posición');
});

test('el origen solo admite un nombre de host, nunca una URL con ruta o consulta', () => {
  for (const origen of ['https://www.google.com/search?q=pesca', 'www.google.com/search', 'usuario@correo.com', 'localhost', 'X'.repeat(150) + '.com']) {
    assert.equal(blob(normalizaEvento({ tipo: 'carga', origen }), 'origen'), '', origen);
  }
  assert.equal(blob(normalizaEvento({ tipo: 'mapa', origen: 'www.google.com' }), 'origen'), '', 'solo en cargas');
});

test('el número de blobs y doubles no supera el límite de Analytics Engine', () => {
  const p = normalizaEvento({ tipo: 'mapa', figuras: Array.from({ length: 50 }, (_, i) => `zona-${i}`) });
  assert.ok(p.blobs.length <= 20 && p.doubles.length <= 20);
  assert.equal(double(p, 'numFiguras'), 20);
});

function peticion(cuerpo, origen = 'https://reservas.pecesmediterraneo.com') {
  return new Request('https://reservas.pecesmediterraneo.com/api/evento', {
    method: 'POST',
    headers: origen ? { Origin: origen } : {},
    body: cuerpo,
  });
}

function entornoFalso() {
  const escritos = [];
  return { escritos, env: { EVENTOS: { writeDataPoint: (p) => escritos.push(p) } } };
}

test('la función escribe un evento válido y contesta 204', async () => {
  const { escritos, env } = entornoFalso();
  const r = await onRequestPost({ request: peticion(JSON.stringify({ tipo: 'mapa' })), env });
  assert.equal(r.status, 204);
  assert.equal(escritos.length, 1);
});

test('desde otro origen, o con cuerpo inválido, contesta 204 sin escribir', async () => {
  const { escritos, env } = entornoFalso();
  for (const request of [
    peticion(JSON.stringify({ tipo: 'mapa' }), 'https://otro-sitio.example'),
    peticion('esto no es json'),
    peticion(JSON.stringify({ tipo: 'mapa', relleno: 'x'.repeat(5000) })),
  ]) {
    const r = await onRequestPost({ request, env });
    assert.equal(r.status, 204);
  }
  assert.equal(escritos.length, 0);
});

test('sin binding configurado contesta igual y no falla', async () => {
  const r = await onRequestPost({ request: peticion(JSON.stringify({ tipo: 'gps' })), env: {} });
  assert.equal(r.status, 204);
});
