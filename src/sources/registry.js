/**
 * Registro declarativo de fuentes de restricciones marítimas.
 *
 * Cada fuente es una capa regulatoria independiente. La reserva marina es una
 * de ellas, no el concepto central de la aplicación: el motor de resolución
 * combina todas las fuentes activas sobre un mismo punto.
 *
 * Servidor ArcGIS REST público del Govern de les Illes Balears (ArcGIS 10.9.1).
 * Todas las capas son nativas en EPSG:25831; el servicio reproyecta a WGS84
 * cuando se pide `outSR=4326`.
 *
 * `activa: true`  -> se descarga y se pinta en el mapa.
 * `activa: false` -> registrada y documentada, pendiente de fichas normativas.
 *                    Activar es cambiar este booleano y redactar sus reglas.
 */

import { CODIGOS_MARINOS, esMarino } from '../data/natura2000-marino.js';

const IDEIB = 'https://ideib.caib.es/geoserveis/rest/services/public';

// Mapeos de atributos por familia de capa. Traducen los nombres de campo
// crudos del servicio al esquema común que consume el motor.
//
// Ni `TIPO` ni `AC` sirven para lo que parecen. `TIPO` es el SITETYPE de la
// ficha Natura 2000 (A = solo ZEPA, B = solo LIC/ZEC, C = ambas): una letra,
// no una denominación. Y `AC` es la administración gestora en texto libre
// —'ILLES BALEARS' en las seis capas autonómicas, 'DGBBD' en las estatales—,
// que no distingue nada dentro de cada grupo. La denominación y la competencia
// las determina la capa en la que el espacio aparece, y por eso van en `fijos`.
const N2000 = {
  nombre: 'SITE_NAME',
  codigo: 'SITE_CODE',
  fichaUrl: 'URL_FITXA',
  normaTitulo: 'NOM_PLA',
  planEstado: 'ESTA_PLA',
};

const POSIDONIA = {
  nombre: 'NOM',
  proteccion: 'TIPUS',
  zona: 'ZONA',
};

// `AMBIT` NO es la competencia: vale 'Terrestre' o 'Marí', y parte cada espacio
// en dos registros. El Paratge Natural de la Serra de Tramuntana son 61.846 ha
// terrestres y 1.127 marinas, publicadas por separado. Esa separación es justo
// lo que hace falta aquí, porque las normas marinas del PORN se aplican «en el
// ámbito marino que delimita este Plan», no en todo el paraje.
const ENP = {
  nombre: 'SITE_NAME',
  codigo: 'SITE_CODE',
  proteccion: 'Figura',
  ambito: 'AMBIT',
  normaTitulo: 'DECLARACIO',
  normaFecha: 'DATA_DECLA',
  normaUrl: 'URL_DECLA',
};

// El PRUG de s'Albufera des Grau. Se declara aquí, y no se toma del campo
// `NORMATIVA` de la capa, porque ese campo vale literalmente «PRUG»: sirve para
// distinguir la zonificación del PRUG de la del PORN dentro del servicio, no
// para citar la norma. `URL_BOIB` apunta además a intranet.caib.es, que desde
// fuera de la red del Govern no resuelve.
const NORMA_PRUG_ALBUFERA = {
  normaTitulo:
    'Decreto 39/2021, de 2 de agosto, por el que se aprueba el Plan de Gestión Natura 2000 de la Costa Este de Menorca y el Plan rector de uso y gestión del Parque Natural de s’Albufera des Grau y de las reservas naturales de las illes des Porros (illots d’Addaia), s’Estany, la bassa de Morella, es Prat y la illa d’en Colom',
  normaFecha: '2021-08-02',
  normaUrl: 'https://www.caib.es/eboibfront/eli/es-ib/d/2021/08/02/39/dof/spa',
};

// El PRUG de ses Salines. Mismo motivo que el anterior: el campo NORMATIVA de
// la capa vale «PRUG» y su URL_BOIB apunta a intranet.caib.es.
const NORMA_PRUG_SALINES = {
  normaTitulo:
    'Decreto 132/2005, de 23 de diciembre, por el que se aprueba el Plan Rector de Uso y Gestión del Parc Natural de ses Salines d’Eivissa i Formentera',
  normaFecha: '2005-12-23',
  normaUrl: 'https://www.caib.es/sites/puntdinformacioambiental/f/138364',
};

// Zonificación de un espacio natural protegido. `ZONIFICACI` es la categoría
// del art. 22 de la Ley 5/2005 (exclusión, uso limitado, uso compatible, uso
// general) y `AMBIT` separa la parte marina de la terrestre, igual que en la
// capa de límites.
const ZONIFICACION_ENP = {
  nombre: 'NOM_ENP',
  codigo: 'CODI_ENP',
  proteccion: 'ZONIFICACI',
  ambito: 'AMBIT',
};

export const SOURCES = [
  {
    id: 'reservas-marinas',
    titulo: 'Reservas marinas',
    activa: true,
    prefijo: 'rm',
    servicio: `${IDEIB}/GOIB_ReservesMarines/MapServer`,
    catalogo:
      'https://intranet.caib.es/opendatacataleg/dataset/limits-reserves-marines-illes-balears',
    capas: [
      {
        id: 1,
        rol: 'areas',
        nombre: 'Límits Reserves Marines Illes Balears',
        mapea: {
          nombre: 'NOM',
          proteccion: 'PROTECCIO',
          competencia: 'COMPETENT',
          normaTitulo: 'NORMA',
          normaFecha: 'DATA_NORMA',
          normaUrl: 'URL',
        },
      },
      {
        id: 0,
        rol: 'hitos',
        nombre: 'Fites Reserves Marines Illes Balears',
        mapea: {
          nombre: 'NOM',
          proteccion: 'PROTECCIO',
          latitudTexto: 'LATITUD',
          longitudTexto: 'LONGITUD',
        },
      },
    ],
  },

  {
    id: 'natura2000',
    titulo: 'Red Natura 2000 (ámbito marino)',
    activa: true,
    prefijo: 'n2k',
    servicio: `${IDEIB}/GOIB_NATURA_N2000_IB/MapServer`,
    catalogo: 'https://www.caib.es/sites/xarxanatura/ca/inici-46017/',
    nota:
      'Solo se descargan los espacios con ámbito marino declarados en el art. 2 del Decret 91/2023 y los que caen dentro del ámbito marino de un plan de gestión aprobado. Véase src/data/natura2000-marino.js.',

    // Se piden solo los códigos de la lista blanca. Filtrar en el servidor y no
    // después evita descargar los más de doscientos espacios terrestres de la
    // capa para tirarlos a continuación.
    filtroWhere: `SITE_CODE IN ('${CODIGOS_MARINOS.join("','")}')`,
    incluye: (attrs) => esMarino(attrs.codigo),

    // Un espacio Natura 2000 puede tener dos designaciones a la vez y el
    // servicio lo publica entonces por duplicado, una vez en la capa de LIC y
    // otra en la de ZEPA: sa Dragonera (ES0000221) y les Muntanyes d'Artà
    // (ES0000227) aparecen en las dos con el mismo OBJECTID y la misma
    // geometría. Son una sola figura jurídica, no dos, y así lo trata el propio
    // art. 2 del Decret 91/2023, que las lista una vez como «LIC i ZEPA».
    //
    // Sin fusionar, cada mitad produciría su propio zoneId y el panel enseñaría
    // dos figuras idénticas con la misma ficha repetida. Se fusionan por
    // SITE_CODE, que es el identificador jurídico del espacio, y la designación
    // resultante es la unión de las capas en las que aparece.
    fusionaPor: 'codigo',

    capas: [
      {
        id: 9,
        rol: 'areas',
        nombre: 'ZEC gestió autonòmica',
        mapea: N2000,
        fijos: { designacion: 'ZEC', competencia: 'Autonòmica' },
      },
      {
        id: 11,
        rol: 'areas',
        nombre: 'LIC gestió autonòmica',
        mapea: N2000,
        fijos: { designacion: 'LIC', competencia: 'Autonòmica' },
      },
      {
        id: 12,
        rol: 'areas',
        nombre: 'ZEPA gestió autonòmica',
        mapea: N2000,
        fijos: { designacion: 'ZEPA', competencia: 'Autonòmica' },
      },
      {
        id: 14,
        rol: 'areas',
        nombre: 'ZEPA gestió estatal',
        mapea: N2000,
        fijos: { designacion: 'ZEPA', competencia: 'Estatal' },
      },
      {
        id: 15,
        rol: 'areas',
        nombre: 'LIC gestió estatal',
        mapea: N2000,
        fijos: { designacion: 'LIC', competencia: 'Estatal' },
      },
      {
        id: 16,
        rol: 'areas',
        nombre: 'ZEC gestió estatal',
        mapea: N2000,
        fijos: { designacion: 'ZEC', competencia: 'Estatal' },
      },
    ],
  },

  {
    id: 'posidonia',
    titulo: 'Protección de la posidonia (Decret 25/2018)',
    activa: false,
    prefijo: 'pos',
    servicio: `${IDEIB}/GOIB_Posidonia_IB/MapServer`,
    nota: 'Determinante para el fondeo: fondear sobre posidonia está prohibido y sancionado.',
    capas: [
      { id: 0, rol: 'areas', nombre: 'Zones d\u2019alt valor', mapea: POSIDONIA },
      { id: 1, rol: 'areas', nombre: 'Zones a regular', mapea: POSIDONIA },
      { id: 2, rol: 'areas', nombre: 'Posidonia oceanica', mapea: POSIDONIA },
    ],
  },

  {
    id: 'espacios-naturales',
    titulo: 'Espacios naturales protegidos (ámbito marino)',
    activa: true,
    prefijo: 'enp',
    servicio: `${IDEIB}/GOIB_NATURA_ENP_IB/MapServer`,
    catalogo: 'https://www.caib.es/sites/espaisnaturalsprotegits/ca/inici-22930/',
    nota:
      'Solo el ámbito marino. La parte terrestre de estos espacios es mucho mayor —el Paratge Natural de la Serra de Tramuntana son 61.846 ha en tierra frente a 1.127 en el mar— y no aporta nada a un motor de restricciones marítimas.',

    // Los PORN y PRUG delimitan expresamente un «ámbito marino» y sus normas de
    // pesca, fondeo y buceo se aplican dentro de él, no en todo el espacio. Pedir
    // solo AMBIT='Marí' devuelve exactamente esa geometría.
    filtroWhere: "AMBIT='Marí'",
    incluye: (attrs) => attrs.ambito === 'Marí',

    capas: [
      // Solo la capa de límites. Las de zonificación PRUG (22 y 23) subdividen
      // el interior de Cabrera y sa Dragonera y necesitan fichas propias; entran
      // cuando se redacten, no antes.
      { id: 35, rol: 'areas', nombre: 'Límits ENP Illes Balears', mapea: ENP },
    ],
  },

  {
    id: 'zonificacion-enp',
    titulo: 'Zonificación marina de los espacios naturales protegidos',
    activa: true,
    prefijo: 'zon',
    servicio: `${IDEIB}/GOIB_NATURA_ENP_04_AG/MapServer`,
    catalogo:
      'https://www.caib.es/sites/espaisnaturalsprotegits/es/parc_natural_de_salbufera_des_grau/',
    nota:
      'El límite de un espacio natural protegido no basta para responder: dentro conviven categorías con regímenes distintos. En s’Albufera des Grau, la zona de exclusión marina prohíbe el fondeo y la navegación de cualquier embarcación (PRUG 6.2.2.5) mientras el resto del ámbito marino no lo hace. Por ahora solo se carga la zonificación de este parque, que es la única publicada como capa propia; la de Cabrera y sa Dragonera vive en otro servicio y entra cuando se redacten sus fichas.',

    // Igual que en la capa de límites: los PORN y PRUG regulan la pesca, el
    // fondeo y el buceo dentro del ámbito marino que delimitan, y la parte
    // terrestre —2/3 de la zonificación de este parque— no dice nada del agua.
    filtroWhere: "AMBIT='Marí'",
    incluye: (attrs) => attrs.ambito === 'Marí',

    capas: [
      {
        id: 10,
        rol: 'areas',
        nombre: 'Zonificació Parc Natural Albufera Grau',
        mapea: ZONIFICACION_ENP,
        fijos: NORMA_PRUG_ALBUFERA,
      },
      // La capa 0 publica además la zonificación del PORN de 2003, que el PRUG
      // sustituyó con una tabla de equivalencias (área marina de protección
      // estricta -> zona de exclusión marina, etc.). Cargar las dos pondría
      // sobre cada punto dos nombres para la misma cosa, uno de ellos derogado.

      {
        id: 1,
        rol: 'areas',
        servicio: `${IDEIB}/GOIB_NATURA_ENP_08_SS/MapServer`,
        nombre: 'Zonificació PRUG Parc Natural Salines Eivissa i Formentera',
        mapea: ZONIFICACION_ENP,
        fijos: NORMA_PRUG_SALINES,
      },
      // Y aquí la capa 2 es la zonificación del PORN de 2002, sustituida por
      // esta. Mismo criterio que en s'Albufera des Grau: solo la vigente.
    ],
  },

  {
    id: 'regulacion-fondeo',
    titulo: 'Regulación del fondeo',
    activa: true,
    prefijo: 'fon',
    servicio: `${IDEIB}/GOIB_NATURA_ENP_08_SS/MapServer`,
    catalogo:
      'https://www.caib.es/sites/espaisnaturalsprotegits/es/parque_natural_de_ses_salines_de_ibiza_y_formentera/',
    nota:
      'El art. 117 del PRUG de ses Salines reparte el ámbito marino del parque en fondeo prohibido, regulado con campo de boyas y libre condicionado, y el IDEIB publica los polígonos. Sin esta capa el fondeo solo se podría contestar con la prohibición general de fondear sobre fanerógamas, que es cierta pero no dice dónde está prohibido del todo ni dónde hay que amarrarse a una boya.',

    capas: [
      {
        id: 5,
        rol: 'areas',
        nombre: 'Regulació fondeig',
        // Capa de origen CAD: no trae NOM_ENP ni AMBIT, y la categoría viaja en
        // el campo `Layer`, que es el nombre de la capa del dibujo original.
        mapea: { proteccion: 'Layer' },
        fijos: {
          nombre: 'Parc Natural de ses Salines d’Eivissa i Formentera',
          codigo: '08_SS',
          ambito: 'Marí',
          ...NORMA_PRUG_SALINES,
        },
      },
    ],
  },

  {
    id: 'regulacion-pesca-submarina',
    titulo: 'Regulación específica de pesca submarina',
    activa: true,
    prefijo: 'psub',
    servicio: `${IDEIB}/GOIB_NATURA_ENP_04_AG/MapServer`,
    catalogo: 'https://www.caib.es/seucaib/es/tramites/tramite/1831120',
    nota:
      'El Govern publica los polígonos exactos donde la pesca submarina está prohibida y donde es autorizable dentro del ámbito marino del Parque Natural de s’Albufera des Grau. Se cargan tal cual: reconstruir esa frontera a partir del texto del PRUG —una línea al norte desde la punta oeste de s’Escala y otra al este desde el Morro de sa Falconera— sería redibujar a mano un dato que ya está cartografiado.',

    capas: [
      {
        id: 12,
        rol: 'areas',
        nombre: 'Regulació Pesca Submarina Parc Natural Albufera Grau',
        // La capa solo trae OBJECTID, ID y TIPUS: el espacio al que pertenece
        // no está en ningún campo, lo dice la propia capa.
        mapea: { proteccion: 'TIPUS' },
        fijos: {
          // Literal del campo NOM_ENP de la capa de zonificación y del SITE_NAME
          // de la de límites, apóstrofo recto incluido: las tres capas del
          // parque deben mostrar el mismo nombre en el panel.
          nombre: "Parc Natural de s'Albufera des Grau",
          codigo: '04_AG',
          ambito: 'Marí',
          ...NORMA_PRUG_ALBUFERA,
        },
      },
    ],
  },
];

export const FUENTES_ACTIVAS = SOURCES.filter((s) => s.activa);

export function getSource(id) {
  const s = SOURCES.find((x) => x.id === id);
  if (!s) throw new Error(`Fuente desconocida: ${id}`);
  return s;
}
