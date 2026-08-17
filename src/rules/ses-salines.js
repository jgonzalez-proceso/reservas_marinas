/**
 * Parc Natural de ses Salines d'Eivissa i Formentera — ámbito marino.
 *
 * Como el de s'Albufera des Grau, este fichero no vive bajo `rules/<fuente>/`:
 * sus nueve fichas se reparten entre tres fuentes —el límite del parque, su
 * zonificación del PRUG y la capa oficial de regulación del fondeo— y todas
 * salen de la misma norma, el Decreto 132/2005.
 *
 * 15.390 ha de mar entre Eivissa y Formentera, el 85 % del parque según su
 * propia información oficial. Sobre ellas se apilan además la Reserva Marina
 * dels Freus, sus subzonas y varios espacios Natura 2000. **Son figuras
 * distintas y aquí se mantienen separadas**, aunque el art. 95 del PRUG las
 * relacione: en todo lo que el PRUG no prevé expresamente, dice, se aplica en
 * todo el ámbito marino el Decreto 63/1999 de la reserva marina. Es una regla
 * de supletoriedad entre normas, no una fusión de figuras, y el motor la
 * reproduce apilando ambas fichas sobre el punto.
 *
 * Lo que el parque añade por su cuenta, y que no se puede leer en la ficha de
 * la reserva marina:
 *
 *   Pesca submarina        prohibida en TODO el parque (arts. 11.4.c y 94.c),
 *                          esté o no el punto dentro de la reserva marina.
 *   Áreas de protección    ninguna pesca (art. 94.a), ningún fondeo
 *   estricta marinas       (art. 117.a) y ninguna inmersión recreativa
 *                          (art. 110). 427,4 ha en cuatro polígonos.
 *   Fondeo                 tres regímenes cartografiados (art. 117), no solo
 *                          la prohibición general sobre fanerógamas.
 *   Buceo                  autorización del órgano gestor (art. 110).
 *   Motos acuáticas        prohibidas (art. 102.e).
 *   Zonas de baño          ni navegación ni fondeo en la franja de 200 m
 *                          paralela a la costa (art. 118).
 *
 * DOS COSAS QUE CONVIENE NO VOLVER A DESCUBRIR
 *
 * 1. **El PRUG se contradice consigo mismo sobre la extracción.** El art.
 *    11.4.d prohíbe «en todo el ámbito marino […] la extracción de flora y
 *    fauna marina», lo que leído al pie de la letra prohibiría toda la pesca;
 *    el art. 94.b, en el capítulo de actividades pesqueras, permite
 *    expresamente la pesca recreativa desde tierra y desde embarcación fuera de
 *    las áreas de protección estricta, y el art. 94.c solo repite la
 *    prohibición para la flora. Se resuelve por especialidad —manda el capítulo
 *    de pesca— y así lo aplica la propia información oficial del parque, que
 *    contesta «sí» a si se puede pescar. La discrepancia se escribe en las
 *    condiciones en vez de resolverse en silencio.
 *
 * 2. **Estany Pudent no está en este mapa.** El art. 94.a prohíbe cualquier
 *    pesca «en las áreas de protección estricta y en el Estany Pudent», pero la
 *    cartografía oficial clasifica el Estany Pudent (APE-04, 395,3 ha) como
 *    ámbito TERRESTRE, y este mapa solo carga el marino. Un punto sobre esa
 *    laguna no cae dentro de ninguna figura cargada. Queda dicho en las
 *    condiciones de la pesca.
 */

import { permiso } from './schema.js';

const REVISION = '2026-08-17';

const NORMA_PRUG = {
  titulo:
    'Decreto 132/2005, de 23 de diciembre, por el que se aprueba el Plan Rector de Uso y Gestión del Parc Natural de ses Salines d’Eivissa i Formentera',
  fecha: '2005-12-23',
  url: 'https://www.caib.es/sites/puntdinformacioambiental/f/138364',
  tipo: 'creacion',
};

const NORMA_RESERVA_MARINA = {
  titulo:
    'Decreto 63/1999, de 28 de mayo, por el que se establece la Reserva Marina dels Freus d’Eivissa i Formentera',
  fecha: '1999-05-28',
  url: 'https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades-874/',
  // Supletoria por remisión del art. 95 del PRUG, no norma propia del parque.
  tipo: 'general',
};

const NORMA_ESTANY_DES_PEIX = {
  titulo:
    'Reglament regulador del fondeig i del règim jurídic de les instal·lacions d’amarratge de s’Estany des Peix (Consell Insular de Formentera)',
  fecha: '2022-02-24',
  url: 'https://www.consellinsulardeformentera.cat/index.php?option=com_content&view=article&id=8579&catid=350&Itemid=336&lang=es',
  tipo: 'general',
};

const NORMAS_PARQUE = [NORMA_PRUG, NORMA_RESERVA_MARINA];
const FUENTES = ['boib-decreto-132-2005-prug-salines'];
const FUENTES_CON_PAGINA = [...FUENTES, 'caib-espacio-ses-salines'];

// ---------------------------------------------------------------------------
// Textos que viajan con varias actividades
// ---------------------------------------------------------------------------

const SUPLETORIEDAD_ART_95 =
  'El art. 95 del PRUG remite, en todo lo que no prevé expresamente, al Decreto 63/1999 de la ' +
  'Reserva Marina dels Freus d’Eivissa i Formentera, y lo hace para todo el ámbito marino del ' +
  'parque. Este mapa dibuja la reserva como figura aparte: si el punto también cae dentro de ella, ' +
  'sus reglas se suman a estas.';

const CONTRADICCION_11_4_D =
  'Discrepancia documentada del propio PRUG: su art. 11.4.d prohíbe «en todo el ámbito marino la ' +
  'extracción de flora y fauna marina», mientras que el art. 94.b permite la pesca recreativa fuera ' +
  'de las áreas de protección estricta y el art. 94.c solo mantiene la prohibición para la flora. ' +
  'Aquí manda el capítulo de actividades pesqueras, que es el específico, y así lo aplica la ' +
  'información oficial del parque.';

const ESTANY_PUDENT =
  'El art. 94.a prohíbe además cualquier pesca en el Estany Pudent (Formentera), que la cartografía ' +
  'oficial clasifica como ámbito terrestre y que por eso no está dibujado en este mapa.';

const EXTRACCIONES_PROHIBIDAS =
  'Prohibidas en todo el parque la extracción de coral rojo (Corallium rubrum), la de las especies ' +
  'del anexo del Decreto 63/1999 y la de flora marina, salvo toma de muestras científicas ' +
  'expresamente autorizada (art. 94.c).';

const SIN_CONCURSOS =
  'Prohibidos en todo el parque los concursos de pesca, la pesca de arrastre, la de cerco y el ' +
  'palangre de superficie (art. 94.c).';

const PLAN_SECTORIAL =
  'El art. 93 del PRUG encarga a un plan sectorial de aprovechamientos pesqueros detallar las ' +
  'modalidades permitidas, las vedas y las capturas. Mientras no se apruebe rige el régimen ' +
  'transitorio del art. 94, que es el que se resume aquí.';

const ZONAS_DE_BANO =
  'El art. 118 prohíbe navegar y fondear dentro de las zonas de baño, que define como una franja de ' +
  '200 m paralela a la línea de costa; las embarcaciones solo pueden atravesarlas por los canales ' +
  'de entrada y salida señalizados. Esa franja no se publica como capa cartográfica y este mapa no ' +
  'la dibuja.';

const NUNCA_SOBRE_FANEROGAMAS =
  'El ancla solo puede fijarse sobre fondo arenoso y nunca sobre formaciones de Posidonia oceanica, ' +
  'y el patrón de la embarcación es responsable de comprobarlo (art. 117.c). Rige además el Real ' +
  'Decreto 191/2026, que extiende la prohibición a la Cymodocea nodosa en todo el Mediterráneo ' +
  'español.';

/**
 * La autorización de buceo del parque.
 *
 * No hay importe publicado en la información oficial del espacio, que remite a
 * caib.es y distingue permiso diario y anual. `importe: null` es «no publicado»
 * y el panel lo dice así; poner 0 anunciaría una gratuidad que no consta.
 */
const AUTORIZACION_BUCEO = permiso({
  importe: null,
  nota:
    'Autorización del órgano gestor del parque natural. La información oficial del espacio la exige ' +
    'para el buceo deportivo y ofrece permiso diario o anual. La Consejería determina en qué puntos ' +
    'se pueden hacer inmersiones colectivas y puede condicionarlas a instalar sistemas de amarre de ' +
    'bajo impacto.',
  vigencia: 'Diaria o anual, según la modalidad solicitada',
  url: 'https://www.caib.es/sites/espaisnaturalsprotegits/es/parque_natural_de_ses_salines_de_ibiza_y_formentera/',
  ultimaVerificacion: REVISION,
});

const CONDICIONES_BUCEO = [
  'Prohibido alimentar a la fauna durante las inmersiones (feeding).',
  'Prohibido utilizar, tener o transportar a bordo cualquier instrumento que pueda emplearse para la extracción de especies marinas.',
  'Las inmersiones recreativas son incompatibles con las áreas de protección estricta, donde solo se admiten las de gestión del parque o las científicas debidamente autorizadas.',
  'El art. 110 regula bajo el mismo epígrafe el submarinismo «con escafandra o en apnea», pero la información pública del parque solo exige el permiso para el buceo con botella. Quien vaya a bucear a pulmón debería confirmarlo con la oficina del parque antes de salir.',
  'La pesca submarina está prohibida en todo el parque: bucear con fusil no es una opción aquí en ninguna modalidad.',
];

// ---------------------------------------------------------------------------
// Ayudas para las categorías que no imponen nada por sí mismas
// ---------------------------------------------------------------------------

const TODAS_LAS_ACTIVIDADES = [
  'pescaDesdeCosta',
  'pescaRecreativaEmbarcacion',
  'pescaSubmarina',
  'buceo',
  'fondeo',
  'navegacion',
];

const paraCada = (claves, regla) => Object.fromEntries(claves.map((c) => [c, regla]));
const salvo = (...excluidas) => TODAS_LAS_ACTIVIDADES.filter((c) => !excluidas.includes(c));

/**
 * Categoría de zonificación sin régimen propio.
 *
 * Igual que en s'Albufera des Grau: son categorías de planificación del art. 22
 * de la Ley 5/2005 y describen la vocación del área. Se escriben como
 * `not_regulated` y no como `unknown` porque la norma está leída; y al quedar
 * `not_regulated` en el escalón más bajo de la escala de restricción, nunca
 * pueden enmascarar lo que diga el parque o cualquier otra figura del punto.
 */
/**
 * La prohibición de pesca submarina, que es de TODO el parque.
 *
 * Va también en cada categoría de la zonificación, y no solo en la ficha del
 * parque, porque las dos capas oficiales no cubren exactamente lo mismo. Medido
 * sobre las geometrías: las 427,4 ha del área marina de protección estricta
 * caen **enteras fuera** del polígono de límites que publica la capa 35, y
 * pequeñas orlas del resto de categorías (entre el 0,1 % y el 0,4 %) también.
 * Si la prohibición viviera solo en la ficha del parque, un punto de esas orlas
 * contestaría «sin restricción específica» a la pesca submarina, que es justo
 * lo contrario de lo que dicen los arts. 11.4.c y 94.c.
 *
 * La zonificación de la capa 1 es la delimitación que el propio PRUG hace de su
 * ámbito marino, así que es tan «el parque» como el polígono de límites.
 */
function pescaSubmarinaProhibida(sources) {
  return {
    status: 'prohibited',
    motivo:
      'La pesca submarina está expresamente prohibida en todo el ámbito del Parc Natural de ses ' +
      'Salines: el art. 11.4.c del PRUG la enumera entre los usos prohibidos y el art. 94.c la repite ' +
      'en el régimen pesquero.',
    conditions: [
      'La prohibición alcanza todo el parque y no depende de estar dentro de la Reserva Marina dels Freus.',
      'El art. 110 prohíbe además llevar, tener o transportar a bordo instrumentos utilizables para extraer especies marinas.',
    ],
    sources,
  };
}

function categoriaSinRegimenPropio(categoria, sources) {
  return {
    status: 'not_regulated',
    motivo:
      `El ${categoria} es una categoría de zonificación del PRUG: fija la vocación del área, no un ` +
      'régimen de usos propio. Lo que se puede hacer aquí lo determinan las normas generales del ' +
      'parque y, para el fondeo, la capa oficial de regulación del fondeo.',
    sources,
  };
}

function soloRegulaElFondeo(sources) {
  return {
    status: 'not_regulated',
    motivo:
      'Esta capa oficial delimita únicamente dónde y cómo se puede fondear dentro del parque. No ' +
      'regula ninguna otra actividad: para las demás rige el régimen del Parc Natural de ses Salines ' +
      'y de las figuras que coincidan sobre el punto.',
    sources,
  };
}

const FUENTES_ZON = [...FUENTES, 'ideib-zonificacion-ses-salines'];
const FUENTES_FON = [...FUENTES, 'ideib-fondeo-ses-salines'];

export default [
  // -------------------------------------------------------------------------
  // El parque
  // -------------------------------------------------------------------------
  {
    zoneId: 'enp-es530010-parc-natural-de-ses-salines-d-eivissa-i-formentera--parc-natural--mari',
    nombreCorto: 'Parc Natural de ses Salines d’Eivissa i Formentera (ámbito marino)',
    resumen:
      'Ámbito marino de 15.390 ha entre Eivissa y Formentera, el 85 % del parque. La pesca submarina ' +
      'está prohibida en todo él, esté o no el punto dentro de la Reserva Marina dels Freus. El ' +
      'fondeo tiene tres regímenes cartografiados y el buceo deportivo necesita autorización del ' +
      'órgano gestor.',
    normas: NORMAS_PARQUE,
    ultimaRevision: REVISION,
    actividades: {
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'La pesca submarina está expresamente prohibida en todo el ámbito del Parc Natural de ses ' +
          'Salines. El art. 11.4.c la enumera entre los usos prohibidos de las regulaciones generales ' +
          'y el art. 94.c la repite en el régimen pesquero, junto al arrastre, el cerco, el palangre ' +
          'de superficie y los concursos de pesca.',
        conditions: [
          'La prohibición alcanza todo el parque y no depende de estar dentro de la Reserva Marina dels Freus.',
          'La información oficial del parque lo confirma sin matices: «queda totalmente prohibida por normativa la pesca recreativa con la modalidad de pesca submarina o de fusil».',
          'El art. 110 prohíbe además llevar, tener o transportar a bordo instrumentos utilizables para extraer especies marinas.',
        ],
        sources: FUENTES_CON_PAGINA,
      },

      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'El art. 94.b del PRUG permite la pesca recreativa desde tierra en el ámbito marino del ' +
          'parque fuera de las áreas de protección estricta, pero en los términos y con las ' +
          'limitaciones de la normativa de la Reserva Marina dels Freus y, cuando se apruebe, del plan ' +
          'sectorial de aprovechamientos pesqueros.',
        conditions: [
          'Prohibida cualquier pesca en las áreas marinas de protección estricta, que este mapa dibuja como figura aparte (art. 94.a).',
          ESTANY_PUDENT,
          SIN_CONCURSOS,
          EXTRACCIONES_PROHIBIDAS,
          PLAN_SECTORIAL,
          SUPLETORIEDAD_ART_95,
          CONTRADICCION_11_4_D,
        ],
        sources: FUENTES_CON_PAGINA,
      },

      pescaRecreativaEmbarcacion: {
        status: 'restricted',
        motivo:
          'El art. 94.b del PRUG permite fuera de las áreas de protección estricta la pesca recreativa ' +
          'desde embarcación y la profesional de artes menores, con las limitaciones de la normativa ' +
          'de la Reserva Marina dels Freus y del futuro plan sectorial.',
        conditions: [
          'Prohibida cualquier pesca en las áreas marinas de protección estricta, que este mapa dibuja como figura aparte (art. 94.a).',
          ESTANY_PUDENT,
          SIN_CONCURSOS,
          EXTRACCIONES_PROHIBIDAS,
          'Prohibida cualquier actividad de acuicultura, sea cual sea su tipología (art. 94.c).',
          PLAN_SECTORIAL,
          SUPLETORIEDAD_ART_95,
          CONTRADICCION_11_4_D,
        ],
        sources: FUENTES_CON_PAGINA,
      },

      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El art. 110 del PRUG admite el submarinismo deportivo en las aguas del parque, pero lo ' +
          'sujeta a autorización del órgano gestor de los espacios naturales protegidos. La ' +
          'información oficial del parque incluye el buceo deportivo entre las actividades que se ' +
          'tienen que autorizar previamente.',
        conditions: CONDICIONES_BUCEO,
        permit: AUTORIZACION_BUCEO,
        sources: FUENTES_CON_PAGINA,
      },

      fondeo: {
        status: 'restricted',
        motivo:
          'El art. 117 del PRUG reparte el ámbito marino del parque en zonas de fondeo prohibido, de ' +
          'fondeo regulado con campo de boyas y de fondeo libre condicionado. Fuera de las dos ' +
          'primeras rige el régimen condicionado: solo sobre arena y nunca sobre posidonia.',
        conditions: [
          NUNCA_SOBRE_FANEROGAMAS,
          'Las zonas de fondeo prohibido y de fondeo regulado están dibujadas en este mapa como figura aparte: conviene comprobar en cuál cae el punto.',
          'Prohibido fondear en las áreas marinas de protección estricta (art. 117.a y art. 30.3 del PORN).',
          ZONAS_DE_BANO,
          'Pasar la noche fondeado requiere permiso, diario o anual, según la información oficial del parque.',
        ],
        sources: [...FUENTES_CON_PAGINA, 'boe-rd-191-2026'],
      },

      navegacion: {
        status: 'restricted',
        motivo:
          'La navegación no está prohibida con carácter general en el ámbito marino del parque, pero ' +
          'el art. 102 declara incompatibles las motos acuáticas y los aparatos náuticos recreativos ' +
          'análogos, y el art. 118 prohíbe navegar dentro de las zonas de baño.',
        conditions: [
          'Prohibidas las motos acuáticas y otros aparatos náuticos recreativos análogos —esquí, paracaidismo, flotadores y demás aparatos remolcados— salvo los de los servicios públicos de rescate (art. 102.e).',
          'Quedan fuera de esa prohibición las embarcaciones cuya única finalidad sea el transporte marítimo, público o privado, y cualquier embarcación o aparato náutico a vela.',
          'Prohibidas las embarcaciones que presten servicios particulares lucrativos, salvo las actividades debidamente autorizadas como las de buceo (art. 102.f).',
          'Prohibidas las competiciones y los entrenamientos deportivos con emisión de ruidos o gases, incluidas las carreras de vehículos a motor acuáticos (art. 102.h).',
          ZONAS_DE_BANO,
          'El desembarco y el uso público de los islotes están prohibidos. La única excepción es s’Espalmador, donde solo se puede desembarcar por los canales de entrada y salida y transitar por el dominio público y el camino señalizado.',
        ],
        sources: FUENTES_CON_PAGINA,
      },
    },
  },

  // -------------------------------------------------------------------------
  // Zonificación del PRUG, ámbito marino
  // -------------------------------------------------------------------------
  {
    zoneId:
      'zon-08-ss-parc-natural-de-ses-salines-d-eivissa-i-formentera--area-de-proteccio-estricta--mari',
    nombreCorto: 'Áreas marinas de protección estricta de ses Salines',
    resumen:
      '427,4 ha en cuatro polígonos —la zona marina de s’Espardell, es Caló de s’Oli y Punta Alta ' +
      'norte y sur— donde el PRUG prohíbe cualquier pesca, cualquier fondeo y las inmersiones ' +
      'recreativas. Es el núcleo más protegido del ámbito marino del parque.',
    normas: [NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: {
      ...paraCada(['pescaDesdeCosta', 'pescaRecreativaEmbarcacion', 'pescaSubmarina'], {
        status: 'prohibited',
        motivo:
          'El art. 94.a del PRUG prohíbe la pesca de cualquier tipo en las áreas de protección ' +
          'estricta, donde aplica además el mismo régimen que la zona de protección máxima de la ' +
          'Reserva Marina dels Freus (art. 2 del Decreto 63/1999).',
        conditions: [
          'Prohibida cualquier modalidad de pesca, recreativa o profesional, y cualquier extracción.',
          'Rige aquí el régimen de la zona de protección máxima de la Reserva Marina dels Freus, por remisión expresa del art. 94.a.',
        ],
        sources: FUENTES_ZON,
      }),

      buceo: {
        status: 'prohibited',
        motivo:
          'El art. 110 del PRUG considera las inmersiones submarinas incompatibles con las áreas de ' +
          'protección estricta: allí solo pueden hacerse cuando estén relacionadas con la gestión del ' +
          'parque o vinculadas a actividades científicas o de estudio debidamente autorizadas.',
        conditions: [
          'La prohibición alcanza el buceo recreativo en cualquier modalidad.',
          'Excepciones únicas: gestión del parque y actividades científicas o de estudio debidamente autorizadas.',
        ],
        sources: FUENTES_ZON,
      },

      fondeo: {
        status: 'prohibited',
        motivo:
          'El art. 117.a del PRUG, por remisión al art. 30.3 del PORN, prohíbe el anclaje de ' +
          'embarcaciones en las áreas marinas de protección estricta.',
        conditions: ['Queda totalmente prohibido cualquier tipo de fondeo, salvo por causa de fuerza mayor.'],
        sources: FUENTES_ZON,
      },

      navegacion: categoriaSinRegimenPropio('área de protección estricta', FUENTES_ZON),
    },
  },

  {
    zoneId:
      'zon-08-ss-parc-natural-de-ses-salines-d-eivissa-i-formentera--area-de-conservacio-predominant--mari',
    nombreCorto: 'Área marina de conservación predominante de ses Salines',
    resumen:
      '154,1 ha en la zona marina de s’Espardell. Categoría de zonificación del PRUG: no impone por ' +
      'sí misma ninguna restricción de pesca ni de buceo, que vienen del régimen general del parque.',
    normas: [NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: {
      ...paraCada(
        salvo('pescaSubmarina'),
        categoriaSinRegimenPropio('área de conservación predominante', FUENTES_ZON),
      ),
      pescaSubmarina: pescaSubmarinaProhibida(FUENTES_ZON),
    },
  },

  {
    zoneId: 'zon-08-ss-parc-natural-de-ses-salines-d-eivissa-i-formentera--area-de-conservacio--mari',
    nombreCorto: 'Área marina de conservación de ses Salines',
    resumen:
      '13.165 ha: la mayor parte del ámbito marino del parque, como dice el propio art. 14.1 del ' +
      'PRUG. Categoría de zonificación, sin régimen de usos propio: manda el régimen general del ' +
      'parque y, para el fondeo, la capa de regulación del fondeo.',
    normas: [NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: {
      ...paraCada(salvo('pescaSubmarina'), categoriaSinRegimenPropio('área de conservación', FUENTES_ZON)),
      pescaSubmarina: pescaSubmarinaProhibida(FUENTES_ZON),
    },
  },

  {
    zoneId:
      'zon-08-ss-parc-natural-de-ses-salines-d-eivissa-i-formentera--area-d-aprofitament-condicionat-a-la-conservacio--mari',
    nombreCorto: 'Áreas marinas de aprovechamiento condicionado de ses Salines',
    resumen:
      '344,6 ha en cuatro sectores: sa Torreta, Illetes - s’Alga, es Caló de s’Oli y s’Estany des ' +
      'Peix. Categoría de zonificación sin régimen de usos propio; el fondeo de s’Estany des Peix ' +
      'tiene sí su regulación específica, en la capa de regulación del fondeo.',
    normas: [NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: {
      ...paraCada(
        salvo('pescaSubmarina'),
        categoriaSinRegimenPropio('área de aprovechamiento condicionado a la conservación', FUENTES_ZON),
      ),
      pescaSubmarina: pescaSubmarinaProhibida(FUENTES_ZON),
    },
  },

  {
    zoneId: 'zon-08-ss-parc-natural-de-ses-salines-d-eivissa-i-formentera--us-portuari--mari',
    nombreCorto: 'Zona de uso portuario de ses Salines',
    resumen:
      '39,3 ha de lámina de agua clasificadas como uso portuario dentro del parque. La categoría no ' +
      'regula por sí misma la pesca ni el buceo; sobre estas aguas manda además la normativa ' +
      'portuaria, que este mapa no carga.',
    normas: [NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: {
      ...paraCada(salvo('pescaSubmarina'), categoriaSinRegimenPropio('zona de uso portuario', FUENTES_ZON)),
      pescaSubmarina: pescaSubmarinaProhibida(FUENTES_ZON),
    },
  },

  // -------------------------------------------------------------------------
  // Regulación del fondeo (art. 117)
  // -------------------------------------------------------------------------
  {
    zoneId: 'fon-08-ss-parc-natural-de-ses-salines-d-eivissa-i-formentera--fondeig-prohibit--mari',
    nombreCorto: 'Zonas de fondeo prohibido de ses Salines',
    resumen:
      '451,2 ha en seis polígonos: las áreas marinas de protección estricta, el sector marino del ' +
      'Caló de s’Oli en Formentera y el sector más meridional de la cala de sa Torreta, en ' +
      's’Espalmador. Aquí no se puede fondear de ninguna manera.',
    normas: [NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: {
      fondeo: {
        status: 'prohibited',
        motivo:
          'El art. 117.a del PRUG prohíbe totalmente cualquier tipo de fondeo en estas zonas, salvo ' +
          'por causas de fuerza mayor. El IDEIB publica los polígonos exactos.',
        conditions: [
          'Prohibido cualquier tipo de fondeo, salvo fuerza mayor.',
          'La prohibición incluye las áreas marinas de protección estricta, por remisión al art. 30.3 del PORN.',
        ],
        sources: FUENTES_FON,
      },
      ...paraCada(salvo('fondeo'), soloRegulaElFondeo(FUENTES_FON)),
    },
  },

  {
    zoneId: 'fon-08-ss-parc-natural-de-ses-salines-d-eivissa-i-formentera--fondeig-regulat--mari',
    nombreCorto: 'Zonas de fondeo regulado de ses Salines',
    resumen:
      '69,3 ha en tres campos de boyas de bajo impacto: la bahía de s’Alga en s’Espalmador, la parte ' +
      'sur e interna del Caló de s’Oli en Formentera y la playa de ses Salines en Eivissa. Hay que ' +
      'amarrar a la boya; no se puede echar el ancla.',
    normas: [NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: {
      fondeo: {
        status: 'restricted',
        motivo:
          'El art. 117.b del PRUG dispone campos de boyas fijas de bajo impacto ambiental en las zonas ' +
          'con más presión de embarcaciones sobre fondos vulnerables. En ellas los patrones deben ' +
          'amarrar la embarcación a las boyas habilitadas.',
        conditions: [
          'Obligatorio amarrar a las boyas habilitadas: no se puede echar el ancla sobre el fondo.',
          'El uso del campo de boyas queda sujeto al régimen que establezca su entidad gestora.',
          ZONAS_DE_BANO,
          'Pasar la noche fondeado requiere permiso, diario o anual, según la información oficial del parque.',
        ],
        sources: FUENTES_FON,
      },
      ...paraCada(salvo('fondeo'), soloRegulaElFondeo(FUENTES_FON)),
    },
  },

  {
    zoneId:
      'fon-08-ss-parc-natural-de-ses-salines-d-eivissa-i-formentera--fondeig-lliure-condicionat--mari',
    nombreCorto: 'Zonas de fondeo libre condicionado de ses Salines',
    resumen:
      '13.531 ha: todo el ámbito marino del parque que no es zona de fondeo prohibido ni regulado, ' +
      'más s’Estany des Peix. «Libre» no quiere decir en cualquier sitio: el ancla solo puede fijarse ' +
      'sobre arena y nunca sobre posidonia, y el responsable de comprobarlo es el patrón.',
    normas: [NORMA_PRUG, NORMA_ESTANY_DES_PEIX],
    ultimaRevision: REVISION,
    actividades: {
      fondeo: {
        status: 'restricted',
        motivo:
          'El art. 117.c del PRUG considera de fondeo libre condicionado todo lo que no es zona ' +
          'prohibida ni regulada. En ellas el ancla solo se puede fijar sobre fondos arenosos, y nunca ' +
          'sobre formaciones de Posidonia oceanica, siendo el patrón de la embarcación el responsable ' +
          'de esa circunstancia.',
        conditions: [
          NUNCA_SOBRE_FANEROGAMAS,
          'En s’Estany des Peix las anclas y ferretones no se pueden fijar en ningún caso sobre comunidades de Caulerpa prolifera, Cymodocea nodosa ni Zostera noltii.',
          'S’Estany des Peix tiene además su propio reglamento de fondeo y amarres, aprobado por el Consell Insular de Formentera, que reserva los amarres a embarcaciones acreditadas y con eslora limitada. Este mapa no dibuja esos amarres.',
          ZONAS_DE_BANO,
          'Pasar la noche fondeado requiere permiso, diario o anual, según la información oficial del parque.',
        ],
        sources: [...FUENTES_FON, 'boe-rd-191-2026', 'consell-formentera-estany-des-peix'],
      },
      ...paraCada(salvo('fondeo'), soloRegulaElFondeo(FUENTES_FON)),
    },
  },
];
