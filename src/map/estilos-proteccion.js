/**
 * Paleta por nivel de protección.
 *
 * El color primario lo marca el grado de restricción, no la fuente; la fuente
 * se distingue por trama de contorno (`dashArray`), para que el usuario no
 * tenga que aprender una leyenda nueva por cada capa.
 *
 * Por eso las figuras de la Red Natura 2000 van en verde y no en la gama roja.
 * Estar dentro de un espacio Natura 2000 marino NO significa que la pesca
 * submarina esté prohibida: el art. 5 del Decret 91/2023 remite expresamente a
 * la normativa general de pesca recreativa allí donde el espacio no coincide
 * con una reserva marina o con el área marina de un espacio natural protegido.
 * Pintarlos del mismo rojo que una reserva integral sería afirmar en el mapa lo
 * contrario de lo que dice la norma.
 *
 * Aqui solo viven el color y el orden. La descripcion de cada figura esta en
 * los catalogos de idioma, indexada por el nombre oficial: es texto que se lee
 * y por tanto se traduce, mientras que el color es una decision de diseno que
 * no depende del idioma.
 */

import { t, existeClave } from '../i18n/index.js';

export const NIVELES = [
  {
    proteccion: 'Reserva integral',
    color: '#b4232a',
    orden: 1,
  },
  {
    proteccion: 'Zona de protecció màxima',
    color: '#c9453c',
    orden: 2,
  },
  {
    proteccion: "Zona d'alta protecció",
    color: '#d4574a',
    orden: 3,
  },
  {
    proteccion: "Zona d'us restringit",
    color: '#e07b39',
    orden: 4,
  },
  {
    proteccion: 'Zona de veda de pesca recreativa',
    color: '#8156a8',
    orden: 5,
  },
  {
    proteccion: 'Zona de protecció especial',
    color: '#e0a02e',
    orden: 6,
  },
  {
    proteccion: 'Zona de protecció pesquera',
    color: '#3f9268',
    orden: 7,
  },
  {
    proteccion: 'Zona especial de busseig',
    color: '#2a9bb0',
    orden: 8,
  },
  {
    proteccion: 'Reserva marina',
    color: '#2f6fa8',
    orden: 9,
  },

  // Red Natura 2000. Conservan un color propio y una descripción que no
  // promete ni prohíbe nada: lo que se pueda hacer dentro lo dice la ficha, no
  // el hecho de estar en la red.
  {
    proteccion: 'ZEC',
    color: '#3f9268',
    orden: 20,
  },
  {
    proteccion: 'LIC',
    color: '#4f9e77',
    orden: 21,
  },
  {
    proteccion: 'ZEPA',
    color: '#57a98a',
    orden: 22,
  },
  {
    proteccion: 'ZEC i ZEPA',
    color: '#3f9268',
    orden: 23,
  },
  {
    proteccion: 'LIC i ZEPA',
    color: '#4f9e77',
    orden: 24,
  },

  // Espacios naturales protegidos, ámbito marino. Gama violeta para que no se
  // confundan con Natura 2000: se solapan sobre el mapa pero no son la misma
  // figura y su régimen tampoco lo es — en la Serra de Tramuntana el PORN hace
  // autorizable la pesca submarina donde Natura 2000 remite a la norma general.
  {
    proteccion: 'Parc nacional',
    color: '#7a5aa6',
    orden: 30,
  },
  {
    proteccion: 'Parc natural',
    color: '#8a68b4',
    orden: 31,
  },
  {
    proteccion: 'Paratge natural',
    color: '#9a78c2',
    orden: 32,
  },
  {
    proteccion: 'Reserva natural',
    color: '#6b4d96',
    orden: 33,
  },

  // Zonificación interior de un espacio natural protegido (art. 22 de la Ley
  // 5/2005). La zona de exclusión va en el rojo de la reserva integral porque
  // es lo mismo en la práctica —ni pesca, ni fondeo, ni navegación—, y las
  // otras dos en la gama violeta del espacio al que pertenecen, que es de donde
  // les viene el régimen.
  {
    proteccion: "Zona d'exclusió",
    color: '#b4232a',
    orden: 10,
  },
  {
    proteccion: "Zona d'ús limitat",
    color: '#9a78c2',
    orden: 34,
  },
  {
    proteccion: "Zona d'ús compatible",
    color: '#b49ad2',
    orden: 35,
  },

  // Zonificación del PRUG de ses Salines (art. 22 de la Ley 5/2005 con los
  // nombres del PORN de 2002). El área de protección estricta es lo mismo que
  // una zona de exclusión —ni pesca, ni fondeo, ni buceo recreativo— y por eso
  // comparte su rojo; las otras tres son categorías de planificación.
  {
    proteccion: 'Àrea de protecció estricta',
    color: '#b4232a',
    orden: 13,
  },
  {
    proteccion: 'Àrea de conservació predominant',
    color: '#9a78c2',
    orden: 36,
  },
  {
    proteccion: 'Àrea de conservació',
    color: '#b49ad2',
    orden: 37,
  },
  {
    proteccion: "Àrea d'aprofitament condicionat a la conservació",
    color: '#c4aede',
    orden: 38,
  },
  {
    proteccion: 'Ús portuari',
    color: '#8c9aa6',
    orden: 39,
  },

  // Regulación del fondeo. Aquí el color habla de fondear, no de pescar.
  {
    proteccion: 'Fondeig prohibit',
    color: '#c9453c',
    orden: 14,
  },
  {
    proteccion: 'Fondeig regulat',
    color: '#e0a02e',
    orden: 15,
  },
  {
    proteccion: 'Fondeig lliure condicionat',
    color: '#2a9bb0',
    orden: 16,
  },

  // Regulación específica de pesca submarina. Es la única capa del mapa cuyo
  // nombre ya contiene la respuesta, así que el color va por lo que dice.
  {
    proteccion: 'Zona pesca submarina prohibida',
    color: '#c9453c',
    orden: 11,
  },
  {
    proteccion: 'Zona pesca submarina condicionada',
    color: '#e0a02e',
    orden: 12,
  },
];

const POR_PROTECCION = new Map(NIVELES.map((n) => [n.proteccion, n]));

const COLOR_GENERICO = '#6b7d8c';
const ORDEN_GENERICO = 99;

/**
 * Descripcion de una figura, en el idioma activo.
 *
 * El **nombre** de la figura no se traduce en ningun idioma: es el
 * identificador juridico con el que aparece en el BOIB, y traducirlo dejaria
 * al usuario sin manera de buscarlo. Lo que se traduce es esta descripcion.
 *
 * Una figura que la cartografia oficial publique manana y que todavia no tenga
 * descripcion escrita cae a la generica en vez de pintar la clave: es la misma
 * regla de «ante la duda, se dibuja» que decide que capas arrancan encendidas.
 */
function descripcionDe(proteccion) {
  const clave = `proteccion.${proteccion}`;
  return existeClave(clave) ? t(clave) : t('proteccion.genericoDescripcion');
}

/**
 * Nivel de una figura: color y orden salen de la tabla de arriba, el nombre
 * del dato y la descripcion del catalogo del idioma activo.
 *
 * Se compone en cada llamada y no se cachea a proposito. Dentro de una misma
 * carga el idioma no cambia —cambiarlo recarga la pagina— asi que cachear solo
 * ahorraria unas decenas de objetos por pintado, y a cambio ataria el
 * resultado al primer idioma que preguntara.
 */
export function nivelDe(proteccion) {
  const base = POR_PROTECCION.get(proteccion);
  if (base) return { ...base, descripcion: descripcionDe(proteccion) };
  return {
    proteccion: t('proteccion.generico'),
    color: COLOR_GENERICO,
    orden: ORDEN_GENERICO,
    descripcion: t('proteccion.genericoDescripcion'),
  };
}

export function colorDe(proteccion) {
  return nivelDe(proteccion).color;
}

/**
 * Trama de contorno por fuente. Deja ver de qué capa regulatoria viene una
 * figura sin cambiarle el color, que está reservado al grado de restricción.
 */
const TRAMA_POR_FUENTE = {
  'reservas-marinas': null,
  natura2000: '6 4',
  'zonificacion-enp': '2 4',
  'regulacion-fondeo': '5 3',
  'regulacion-pesca-submarina': '9 3 2 3',
};

export function tramaDe(fuente) {
  return TRAMA_POR_FUENTE[fuente] ?? null;
}

/**
 * Relleno base por fuente.
 *
 * Los espacios Natura 2000 son enormes —la ZEPA del norte de Mallorca sola son
 * 981 km²— y con el relleno de una reserva teñirían el mapa entero, tapando
 * precisamente las zonas pequeñas donde hay prohibiciones reales. Se dibujan
 * casi transparentes: se ven al buscarlos y no estorban al leer el resto.
 */
const RELLENO_POR_FUENTE = {
  'reservas-marinas': 0.18,
  natura2000: 0.07,
  // La zonificación cubre por completo el ámbito marino de su parque: si se
  // dibujara con el relleno de una reserva, taparía la capa de pesca submarina
  // que va justo encima y que es la que contesta.
  'zonificacion-enp': 0.06,
  // El polígono de fondeo libre condicionado cubre casi todo el parque de ses
  // Salines: con relleno normal taparía la zonificación y las dos capas de
  // reserva marina que hay debajo.
  'regulacion-fondeo': 0.08,
  'regulacion-pesca-submarina': 0.16,
};

/** Estilo de un polígono en el mapa. */
export function estiloDe(feature, { resaltado = false, atenuado = false } = {}) {
  const { proteccion, fuente } = feature.properties;
  const color = colorDe(proteccion);
  const base = RELLENO_POR_FUENTE[fuente] ?? 0.18;
  return {
    color,
    weight: resaltado ? 3 : 1.6,
    opacity: atenuado ? 0.35 : 0.95,
    dashArray: tramaDe(fuente),
    fillColor: color,
    fillOpacity: atenuado ? 0.04 : resaltado ? Math.max(base, 0.3) : base,
  };
}
