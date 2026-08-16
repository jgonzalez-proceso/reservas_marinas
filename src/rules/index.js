/**
 * Índice de fichas normativas, indexadas por zoneId.
 *
 * Las fichas se declaran en bruto y se pasan por `resuelveHerencia`, que aplica
 * el régimen general de cada reserva a sus zonas interiores antes de exponerlas
 * al motor. El motor recibe fichas ya completas y no sabe nada de herencia.
 *
 * Una zona sin ficha NO significa que no tenga restricciones: el motor la
 * resuelve como `unknown` y la interfaz lo declara explícitamente. Nunca se
 * interpreta la ausencia de ficha como permiso.
 */

import { resuelveHerencia } from './schema.js';

import badiaDePalma from './reservas-marinas/badia-de-palma.js';
import migjornDeMallorca from './reservas-marinas/migjorn-de-mallorca.js';
import ponentDeMallorca from './reservas-marinas/ponent-de-mallorca.js';
import saDragonera from './reservas-marinas/sa-dragonera.js';
import llevantDeMallorca from './reservas-marinas/llevant-de-mallorca.js';

import freusEivissaFormentera from './reservas-marinas/freus-eivissa-formentera.js';
import puntaDeSaCreu from './reservas-marinas/punta-de-sa-creu.js';
import tagomago from './reservas-marinas/tagomago.js';
import vedraIBledes from './reservas-marinas/vedra-i-bledes.js';
import nordDeMenorca from './reservas-marinas/nord-de-menorca.js';
import illaDeLAire from './reservas-marinas/illa-de-l-aire.js';

import natura2000Autonomics from './natura2000/autonomics.js';
import natura2000Estatals from './natura2000/estatals.js';
import natura2000Menorca from './natura2000/menorca.js';

import enpSerraDeTramuntana from './espacios-naturales/serra-de-tramuntana.js';
import enpCabrera from './espacios-naturales/cabrera.js';

// Fuera de `espacios-naturales/` a propósito: sus siete fichas se reparten entre
// tres fuentes (el límite del parque, su zonificación y la capa de pesca
// submarina) y salen todas de las mismas dos normas.
import albuferaDesGrau from './albufera-des-grau.js';

/** Fichas tal y como se redactan, sin herencia aplicada. */
export const FICHAS_DECLARADAS = [
  ...badiaDePalma,
  ...migjornDeMallorca,
  ...ponentDeMallorca,
  ...saDragonera,
  ...llevantDeMallorca,
  ...freusEivissaFormentera,
  ...puntaDeSaCreu,
  ...tagomago,
  ...vedraIBledes,
  ...nordDeMenorca,
  ...illaDeLAire,
  ...natura2000Autonomics,
  ...natura2000Estatals,
  ...natura2000Menorca,
  ...enpSerraDeTramuntana,
  ...enpCabrera,
  ...albuferaDesGrau,
];

export const FICHAS_LISTA = resuelveHerencia(FICHAS_DECLARADAS);

export const FICHAS = Object.fromEntries(FICHAS_LISTA.map((f) => [f.zoneId, f]));

export function fichaDe(zoneId) {
  return FICHAS[zoneId] ?? null;
}

// ---------------------------------------------------------------------------
// Qué zonas pesan de verdad sobre la pesca
//
// El mapa se llenó de ruido al entrar Natura 2000: la ZEPA del norte de
// Mallorca sola son 981 km² que tiñen media pantalla y no imponen ni una sola
// restricción de pesca, porque los arts. 4 y 5 del Decret 91/2023 remiten a la
// normativa general. Tapaban justo las zonas pequeñas donde sí hay
// prohibiciones, que son las que importan.
//
// Esto decide únicamente qué se DIBUJA de entrada. No filtra nada en el motor:
// `resolver` sigue consultando todas las geometrías cargadas, y una capa oculta
// sigue apareciendo en el panel al pulsar un punto suyo.
// ---------------------------------------------------------------------------

const ACTIVIDADES_DE_PESCA = [
  'pescaSubmarina',
  'pescaDesdeCosta',
  'pescaRecreativaEmbarcacion',
];

/** Estados que suponen una carga real sobre el pescador. */
const ESTADOS_QUE_PESAN = new Set(['allowed_with_authorization', 'restricted', 'prohibited']);

/**
 * ¿Esta zona impone algo propio a la pesca recreativa?
 *
 * Ante la duda, sí. Una zona sin ficha, o con la actividad en `unknown`, cuenta
 * como que afecta: no hemos leído su norma, así que no podemos afirmar que no
 * imponga nada, y esconderla del mapa sería dar por bueno un silencio que solo
 * es nuestro. Solo se descarta lo que consta leído y consta que no restringe.
 */
export function afectaALaPesca(zoneId) {
  const ficha = FICHAS[zoneId];
  if (!ficha) return true;

  return ACTIVIDADES_DE_PESCA.some((clave) => {
    const regla = ficha.actividades?.[clave];
    if (!regla || regla.status === 'unknown') return true;
    return ESTADOS_QUE_PESAN.has(regla.status);
  });
}
