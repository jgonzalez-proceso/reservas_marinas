/**
 * Qué reservas tiene cada página «Reservas marinas de <isla>» y dónde está cada
 * zona dentro de ella.
 *
 * Lo leen dos sitios que tienen que decir lo mismo: el generador de la página
 * (`scripts/paginas/reservas-isla.mjs`, en el build) y el panel del mapa, que
 * enlaza desde cada figura a su zona en la página. Si cada uno calculara las
 * anclas por su cuenta, el día que divergieran el panel mandaría a la gente a
 * un `#` que no existe y nadie lo notaría. Por eso este módulo no importa nada
 * de Node: tiene que poder ir en el bundle.
 *
 * Las fichas de reservas ya viajan al navegador por `src/rules/index.js`, así
 * que importarlas aquí no añade peso.
 */

import badiaDePalma from '../rules/reservas-marinas/badia-de-palma.js';
import ponentDeMallorca from '../rules/reservas-marinas/ponent-de-mallorca.js';
import saDragonera from '../rules/reservas-marinas/sa-dragonera.js';
import llevantDeMallorca from '../rules/reservas-marinas/llevant-de-mallorca.js';
import migjornDeMallorca from '../rules/reservas-marinas/migjorn-de-mallorca.js';
import nordDeMenorca from '../rules/reservas-marinas/nord-de-menorca.js';
import illaDeLAire from '../rules/reservas-marinas/illa-de-l-aire.js';

/**
 * Las reservas de cada isla, en el orden en que se leen: de la bahía de Palma
 * hacia poniente y luego la costa de levante y el sur. Cada una agrupa las
 * fichas de su fichero, que es como están organizadas jurídicamente (una
 * reserva con sus zonas interiores y, donde lo hay, su ámbito estatal).
 */
export const RESERVAS_POR_ISLA = {
  mallorca: [
    {
      id: 'badia-de-palma',
      nombre: 'Reserva marina de la bahía de Palma',
      corto: 'bahía de Palma',
      fichas: badiaDePalma,
    },
    {
      id: 'ponent-de-mallorca',
      nombre: 'Reserva marina de las islas del Ponent de Mallorca (el Toro, les Malgrats y el Sec)',
      corto: 'islas del Ponent de Mallorca (el Toro, les Malgrats y el Sec)',
      fichas: ponentDeMallorca,
    },
    { id: 'sa-dragonera', nombre: 'Reserva marina de sa Dragonera', corto: 'sa Dragonera', fichas: saDragonera },
    {
      id: 'llevant-de-mallorca',
      nombre: 'Reserva marina del Llevant de Mallorca',
      corto: 'Llevant de Mallorca',
      fichas: llevantDeMallorca,
    },
    {
      id: 'migjorn-de-mallorca',
      nombre: 'Reserva marina del Migjorn de Mallorca',
      corto: 'Migjorn de Mallorca',
      fichas: migjornDeMallorca,
    },
  ],
  menorca: [
    {
      id: 'nord-de-menorca',
      nombre: 'Reserva marina del Nord de Menorca',
      corto: 'Nord de Menorca',
      fichas: nordDeMenorca,
    },
    {
      id: 'illa-de-l-aire',
      nombre: 'Reserva marina de la isla del Aire',
      corto: 'isla del Aire',
      fichas: illaDeLAire,
    },
  ],
};

/** Ruta pública de la página de una isla, con barra final: es un directorio. */
export const rutaIsla = (isla) => `reservas-marinas-${isla}/`;

/** Id del bloque de una zona dentro de su página. */
export const anclaZona = (zoneId) =>
  zoneId.replace(/^rm-/, '').replace(/--.*$/, '') + '-' + zoneId.split('--').slice(1).join('-');

// Una reserva compartida (els Freus, entre Eivissa y Formentera) está en las
// dos páginas a propósito: quien busca las reservas de Formentera tiene que
// encontrarla. El panel enlaza a la primera isla que la declara, y así el
// enlace es estable en vez de depender del orden de un Map.
const PAGINA_DE_ZONA = new Map();
for (const [isla, reservas] of Object.entries(RESERVAS_POR_ISLA)) {
  for (const r of reservas) {
    for (const f of r.fichas) if (!PAGINA_DE_ZONA.has(f.zoneId)) PAGINA_DE_ZONA.set(f.zoneId, isla);
  }
}

/**
 * Enlace relativo a la zona dentro de su página, o null si la zona no tiene
 * página. Relativo y sin barra inicial, como el resto de la web (`base: './'`).
 */
export function enlaceZona(zoneId) {
  const isla = PAGINA_DE_ZONA.get(zoneId);
  return isla ? `${rutaIsla(isla)}#${anclaZona(zoneId)}` : null;
}
