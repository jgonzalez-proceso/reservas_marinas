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
 */

export const NIVELES = [
  {
    proteccion: 'Reserva integral',
    color: '#b4232a',
    orden: 1,
    descripcion: 'Núcleo de máxima protección. Como regla, ninguna extracción.',
  },
  {
    proteccion: 'Zona de protecció màxima',
    color: '#c9453c',
    orden: 2,
    descripcion: 'Máxima restricción dentro de la reserva.',
  },
  {
    proteccion: "Zona d'alta protecció",
    color: '#d4574a',
    orden: 3,
    descripcion: 'Alta protección; actividades muy limitadas.',
  },
  {
    proteccion: "Zona d'us restringit",
    color: '#e07b39',
    orden: 4,
    descripcion: 'Uso restringido, normalmente condicionado a autorización.',
  },
  {
    proteccion: 'Zona de veda de pesca recreativa',
    color: '#8156a8',
    orden: 5,
    descripcion: 'Veda específica de pesca recreativa.',
  },
  {
    proteccion: 'Zona de protecció especial',
    color: '#e0a02e',
    orden: 6,
    descripcion: 'Restricciones adicionales sobre el régimen general.',
  },
  {
    proteccion: 'Zona de protecció pesquera',
    color: '#3f9268',
    orden: 7,
    descripcion: 'Restricciones de carácter pesquero.',
  },
  {
    proteccion: 'Zona especial de busseig',
    color: '#2a9bb0',
    orden: 8,
    descripcion: 'Buceo regulado de forma específica.',
  },
  {
    proteccion: 'Reserva marina',
    color: '#2f6fa8',
    orden: 9,
    descripcion: 'Perímetro general de la reserva.',
  },

  // Red Natura 2000. Conservan un color propio y una descripción que no
  // promete ni prohíbe nada: lo que se pueda hacer dentro lo dice la ficha, no
  // el hecho de estar en la red.
  {
    proteccion: 'ZEC',
    color: '#3f9268',
    orden: 20,
    descripcion: 'Zona especial de conservación (Natura 2000).',
  },
  {
    proteccion: 'LIC',
    color: '#4f9e77',
    orden: 21,
    descripcion: 'Lugar de importancia comunitaria (Natura 2000).',
  },
  {
    proteccion: 'ZEPA',
    color: '#57a98a',
    orden: 22,
    descripcion: 'Zona de especial protección para las aves (Natura 2000).',
  },
  {
    proteccion: 'ZEC i ZEPA',
    color: '#3f9268',
    orden: 23,
    descripcion: 'Espacio Natura 2000 con doble designación.',
  },
  {
    proteccion: 'LIC i ZEPA',
    color: '#4f9e77',
    orden: 24,
    descripcion: 'Espacio Natura 2000 con doble designación.',
  },

  // Espacios naturales protegidos, ámbito marino. Gama violeta para que no se
  // confundan con Natura 2000: se solapan sobre el mapa pero no son la misma
  // figura y su régimen tampoco lo es — en la Serra de Tramuntana el PORN hace
  // autorizable la pesca submarina donde Natura 2000 remite a la norma general.
  {
    proteccion: 'Parc nacional',
    color: '#7a5aa6',
    orden: 30,
    descripcion: 'Parque nacional marítimo-terrestre; régimen propio y muy restrictivo.',
  },
  {
    proteccion: 'Parc natural',
    color: '#8a68b4',
    orden: 31,
    descripcion: 'Parque natural; el PORN o el PRUG fijan lo que se puede hacer en el mar.',
  },
  {
    proteccion: 'Paratge natural',
    color: '#9a78c2',
    orden: 32,
    descripcion: 'Paraje natural; el PORN fija el régimen del ámbito marino.',
  },
  {
    proteccion: 'Reserva natural',
    color: '#6b4d96',
    orden: 33,
    descripcion: 'Reserva natural; máxima protección dentro del espacio.',
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
    descripcion: 'Zona de exclusión: ni pesca, ni fondeo, ni navegación.',
  },
  {
    proteccion: "Zona d'ús limitat",
    color: '#9a78c2',
    orden: 34,
    descripcion: 'Uso limitado: fondeo regulado o prohibido sobre fanerógamas.',
  },
  {
    proteccion: "Zona d'ús compatible",
    color: '#b49ad2',
    orden: 35,
    descripcion: 'Uso compatible con cierto grado de aprovechamiento.',
  },

  // Regulación específica de pesca submarina. Es la única capa del mapa cuyo
  // nombre ya contiene la respuesta, así que el color va por lo que dice.
  {
    proteccion: 'Zona pesca submarina prohibida',
    color: '#c9453c',
    orden: 11,
    descripcion: 'Pesca submarina prohibida por delimitación oficial.',
  },
  {
    proteccion: 'Zona pesca submarina condicionada',
    color: '#e0a02e',
    orden: 12,
    descripcion: 'Pesca submarina autorizable con permiso específico.',
  },
];

const POR_PROTECCION = new Map(NIVELES.map((n) => [n.proteccion, n]));

const GENERICO = {
  proteccion: 'Otras figuras',
  color: '#6b7d8c',
  orden: 99,
  descripcion: 'Figura de protección sin color asignado.',
};

export function nivelDe(proteccion) {
  return POR_PROTECCION.get(proteccion) ?? GENERICO;
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
