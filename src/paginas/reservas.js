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

/**
 * Las reservas de cada isla, en el orden en que se leen: de la bahía de Palma
 * hacia poniente y luego la costa de levante y el sur. Cada una agrupa las
 * fichas de su fichero, que es como están organizadas jurídicamente (una
 * reserva con sus zonas interiores y, donde lo hay, su ámbito estatal).
 */
export const RESERVAS_POR_ISLA = {
  mallorca: [
    { id: 'badia-de-palma', nombre: 'Reserva marina de la bahía de Palma', fichas: badiaDePalma },
    {
      id: 'ponent-de-mallorca',
      nombre: 'Reserva marina de las islas del Ponent de Mallorca (el Toro, les Malgrats y el Sec)',
      fichas: ponentDeMallorca,
    },
    { id: 'sa-dragonera', nombre: 'Reserva marina de sa Dragonera', fichas: saDragonera },
    { id: 'llevant-de-mallorca', nombre: 'Reserva marina del Llevant de Mallorca', fichas: llevantDeMallorca },
    { id: 'migjorn-de-mallorca', nombre: 'Reserva marina del Migjorn de Mallorca', fichas: migjornDeMallorca },
  ],
};

/** Ruta pública de la página de una isla, con barra final: es un directorio. */
export const rutaIsla = (isla) => `reservas-marinas-${isla}/`;

/** Id del bloque de una zona dentro de su página. */
export const anclaZona = (zoneId) =>
  zoneId.replace(/^rm-/, '').replace(/--.*$/, '') + '-' + zoneId.split('--').slice(1).join('-');

const PAGINA_DE_ZONA = new Map(
  Object.entries(RESERVAS_POR_ISLA).flatMap(([isla, reservas]) =>
    reservas.flatMap((r) => r.fichas.map((f) => [f.zoneId, isla])),
  ),
);

/**
 * Enlace relativo a la zona dentro de su página, o null si la zona no tiene
 * página. Relativo y sin barra inicial, como el resto de la web (`base: './'`).
 */
export function enlaceZona(zoneId) {
  const isla = PAGINA_DE_ZONA.get(zoneId);
  return isla ? `${rutaIsla(isla)}#${anclaZona(zoneId)}` : null;
}
