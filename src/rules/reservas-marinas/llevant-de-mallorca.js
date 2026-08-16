/**
 * Reserva Marina del Llevant de Mallorca – Cala Rajada.
 *
 * Como en sa Dragonera, conviven ámbito autonómico y estatal, y aquí la
 * diferencia llega al detalle del aparejo: la página del Govern fija «máx. 6
 * anzuelos (máx. 4 en la zona estatal)» y reserva el esparavel, el salabre y el
 * curricán de fondo al ámbito autonómico. Por eso ambas figuras tienen ficha
 * propia: hasta que la competencia entró a formar parte del `zoneId`, las dos
 * colapsaban en una sola incapaz de expresar esa diferencia.
 *
 *  - **Ámbito autonómico**: reserva marina de 40,4 km² y reserva integral de
 *    18,7 km² entre cap Ferrutx y la Penya des Llamp.
 *  - **Ámbito estatal** (Orden APA/690/2018): reserva marina de 46,4 km²,
 *    reserva integral de cabo Ferrutx y zona de usos restringidos de Cala
 *    Agulla.
 *
 * Las cinco figuras son polígonos adyacentes y recortados, no anidados, así que
 * ninguna hereda de otra.
 */

import { permiso } from '../schema.js';
import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';

const NORMA_ESTATAL = {
  titulo:
    'Orden APA/690/2018, de 19 de junio, de la reserva marina del Levante de Mallorca-Cala Rajada',
  fecha: '2018-06-19',
  url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2018-8990',
  tipo: 'creacion',
};

// El decreto que realmente regula el ámbito autonómico. Antes esta ficha solo
// citaba una página de zonificación, no la norma; el Decret 71/2016 confirma
// además la prohibición de anclar sobre posidonia en la reserva integral
// (art. 2.2), que se usa más abajo para su fondeo.
const NORMA_AUTONOMICA = {
  titulo:
    'Decret 71/2016, de 16 de desembre, pel qual es regulen les activitats d’extracció de flora o fauna marines i les activitats subaquàtiques a la Reserva Marina del Llevant de Mallorca',
  fecha: '2016-12-16',
  url: 'https://www.caib.es/eboibfront/es/2016/10590/588893/decret-71-2016-de-16-de-desembre-pel-qual-es-regul',
  tipo: 'creacion',
};

const NORMA_GENERAL = {
  titulo:
    'Decret 41/2015, d’activitats d’extracció de flora o fauna marina i activitats subaquàtiques',
  fecha: '2015-05-22',
  url: 'https://www.caib.es/sites/reservesmarines/es/normativa_general_en_las_reservas_marinas/',
  tipo: 'general',
};

const DIAS = ['martes', 'jueves', 'sábado', 'domingo', 'festivos'];
const DIAS_TEXTO = 'Días hábiles: martes, jueves, sábados, domingos y festivos.';

const AUTORIZACION_EMBARCACION = permiso({
  importe: 0,
  nota: 'Gratuita. Exige licencia de pesca recreativa de embarcación en vigor y llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
  vigencia: '3 años',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/3691781',
  ultimaVerificacion: '2026-08-15',
});

const AUTORIZACION_ESTATAL = permiso({
  importe: null,
  nota: 'Autorización de la Dirección General de Recursos Pesqueros y Acuicultura (Secretaría General de Pesca), en las modalidades y condiciones del anexo 3 de la Orden APA/690/2018.',
  vigencia: null,
  url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2018-8990',
  ultimaVerificacion: '2026-08-15',
});

// La tarifa del Govern cubre esta reserva pero la lista «solo válida en la zona
// autonómica»: en el ámbito estatal manda la Orden APA/690/2018 y otro permiso,
// que no publica importe (PERMISO_BUCEO_ESTATAL).
const PERMISO_BUCEO_AUTONOMICO = permiso({
  importe: 52.82,
  nota: 'Autorización anual individual, válida solo en la zona autonómica de la reserva. Habilita también el resto de reservas marinas de Mallorca, salvo las boyas de las zonas especiales de buceo del Toro y les Malgrats. Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo que entrega el órgano competente en la materia.',
  vigencia: '1 año (hay también diaria y quincenal)',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/1139905',
  ultimaVerificacion: '2026-08-16',
});

const PERMISO_BUCEO_ESTATAL = permiso({
  importe: null,
  nota: 'Autorización de la Dirección General de Recursos Pesqueros, sujeta a cupos de inmersiones y a las condiciones del anexo 3 de la Orden APA/690/2018.',
  vigencia: null,
  url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2018-8990',
  ultimaVerificacion: '2026-08-15',
});

const NAVEGACION_ESTATAL = {
  status: 'restricted',
  motivo:
    'La libre navegación está permitida sin autorización, pero los buques en tránsito deben navegar entre 6 y 10 nudos y lo más lejos posible de la costa.',
  conditions: [
    'Buques en tránsito: velocidad superior a 6 nudos e inferior a 10 nudos.',
    'Los buques en tránsito procurarán navegar a la mayor distancia posible de la costa.',
    'Prohibidas las motos de agua en toda la reserva.',
  ],
  sources: ['boe-orden-apa-690-2018'],
};

const BUCEO_ESTATAL = {
  status: 'allowed_with_authorization',
  motivo:
    'El buceo autónomo requiere autorización. La apnea y el snorkel no la necesitan, pero solo hasta 20 metros de la costa y entre la salida y la puesta del sol.',
  conditions: [
    'Apnea y snorkel sin autorización, hasta 20 m de distancia de la costa y entre el orto y el ocaso del sol.',
    'Prohibidas las inmersiones nocturnas y las inmersiones desde tierra.',
    'Prohibidos los elementos mecánicos de propulsión submarina.',
    'Prohibido efectuar pruebas de mar o prácticas de escuelas de buceo.',
    'Las tres prohibiciones anteriores no se aplican a las inmersiones dentro de Cala Lliteras y Cala Gat.',
    'Prohibido llevar cualquier instrumento utilizable para la pesca o la extracción, salvo un cuchillo por seguridad.',
  ],
  permit: PERMISO_BUCEO_ESTATAL,
  sources: ['boe-orden-apa-690-2018'],
};

const FONDEO_ESTATAL = {
  status: 'restricted',
  motivo:
    'Solo se puede fondear sin autorización en tres lugares concretos: Cala Moltó o Es Gulló, Cala Agulla y Son Moll. En el resto de la reserva estatal el fondeo está prohibido.',
  conditions: [
    'Fondeo libre únicamente en Cala Moltó o Es Gulló, Cala Agulla y Son Moll, por fuera de las zonas de baño y de los canales de acceso.',
    'También pueden fondear sin autorización las embarcaciones profesionales que estén pescando con potera en fondos detríticos.',
    'En el resto de la reserva, solo por emergencia relacionada con la seguridad de la vida humana en el mar, la seguridad nacional o el orden público.',
  ],
  sources: ['boe-orden-apa-690-2018'],
};

export default [
  // ---------------------------------------------------------------------------
  // Ámbito autonómico
  // ---------------------------------------------------------------------------
  {
    zoneId: 'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--autonomica',
    nombreCorto: 'Reserva Marina del Llevant de Mallorca (ámbito autonómico)',
    resumen:
      'Aguas interiores, competencia del Govern. La pesca y el marisqueo recreativos están permitidos determinados días de la semana, salvo en la reserva integral entre cap Ferrutx y la Penya des Llamp. El esparavel, el salabre y el curricán de fondo solo se permiten en este ámbito, no en el estatal.',
    normas: [NORMA_AUTONOMICA, NORMA_GENERAL],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'Permitida martes, jueves, sábados, domingos y festivos, con aparejos limitados, salvo en la reserva integral.',
        conditions: [
          DIAS_TEXTO,
          'Caña o volantín: máximo 1 línea por pescador y 6 anzuelos de 7 mm o más.',
          'Esparavel: requiere autorización específica y solo se permite en el ámbito autonómico.',
          'Salabre: solo permitido en el ámbito autonómico.',
          'Permitida también la recolección de puu.',
          'No permitida en la reserva integral entre cap Ferrutx y la Penya des Llamp.',
        ],
        schedule: { dias: DIAS },
        sources: ['caib-regulacion-llevant'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida martes, jueves, sábados, domingos y festivos, con autorización trienal y registro obligatorio de capturas.',
        conditions: [
          DIAS_TEXTO,
          'Caña o volantín: máximo 1 línea por pescador y 4 anzuelos de 7 mm o más (5,7 mm o más para los raors).',
          'Potera: máximo 1 línea por pescador con 2 poteras.',
          'Curricán de superficie: máximo 2 líneas por embarcación, en las modalidades tradicionales de las Illes Balears.',
          'Curricán de fondo: máximo 2 líneas por embarcación, en la modalidad tradicional; solo permitido en el ámbito autonómico.',
          'Los armadores autorizados deben llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
          'No permitida en la reserva integral entre cap Ferrutx y la Penya des Llamp.',
        ],
        schedule: { dias: DIAS },
        permit: AUTORIZACION_EMBARCACION,
        sources: ['caib-regulacion-llevant', 'tramite-autorizacion-embarcacion'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'Está prohibido llevar, tanto en la inmersión como en la embarcación, cualquier instrumento que pueda usarse para pescar o extraer especies marinas, salvo el cuchillo de seguridad. Eso excluye la pesca submarina.',
        sources: ['caib-regulacion-llevant'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'Requiere permiso individual o colectivo. Las inmersiones en apnea son libres en toda la reserva, pero no se puede bucear en la reserva integral.',
        conditions: [
          'Las inmersiones en apnea son libres en toda la reserva marina.',
          'No está permitido bucear en la zona de reserva marina integral.',
          'Prohibido llevar cualquier instrumento utilizable para la pesca o la extracción, salvo el cuchillo de seguridad.',
        ],
        permit: PERMISO_BUCEO_AUTONOMICO,
        sources: ['caib-regulacion-llevant', 'tramite-autorizacion-buceo'],
      },
      fondeo: fondeoPorPosidoniaGeneral(),
      navegacion: {
        status: 'not_regulated',
        motivo:
          'El Decret 71/2016 regula la extracción de flora y fauna y las actividades subacuáticas, pero no establece ninguna limitación de navegación para el ámbito autonómico.',
        sources: ['boib-decret-71-2016-llevant'],
      },
    },
  },

  {
    zoneId: 'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-integral--autonomica',
    nombreCorto: 'Reserva integral del Llevant (ámbito autonómico)',
    resumen:
      'Núcleo de la reserva, entre el cap Ferrutx y la Penya des Llamp. Ni pesca ni marisqueo recreativos, y tampoco buceo.',
    normas: [NORMA_AUTONOMICA],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'La pesca y el marisqueo recreativos están permitidos en la reserva excepto en la zona de reserva integral situada entre el cap Ferrutx y la Penya des Llamp.',
        sources: ['caib-regulacion-llevant'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'La pesca y el marisqueo recreativos están permitidos en la reserva excepto en la zona de reserva integral.',
        sources: ['caib-regulacion-llevant'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo: 'La pesca submarina no está permitida en ningún punto de la reserva.',
        sources: ['caib-regulacion-llevant'],
      },
      buceo: {
        status: 'prohibited',
        motivo: 'No está permitido bucear en la zona de reserva marina integral.',
        sources: ['caib-regulacion-llevant'],
      },
      fondeo: {
        status: 'restricted',
        motivo:
          'El art. 2.2 del Decret 71/2016 prohíbe expresamente «el anclaje de embarcaciones sobre posidonia» en la reserva integral. El Real Decreto 191/2026 amplía esa misma prohibición a Cymodocea nodosa y al fondeo en arena que afecte a la pradera por la cadena o el borneo, con carácter general en todo el Mediterráneo español.',
        conditions: [
          'Prohibido anclar sobre posidonia en toda la reserva integral (Decret 71/2016, art. 2.2).',
          'Prohibido también sobre Cymodocea nodosa y en arena próxima si la cadena, el ancla u otros elementos del fondeo afectan a la pradera (RD 191/2026).',
          'Solo se permite fondear sobre esas praderas con sistemas de bajo impacto debidamente autorizados.',
        ],
        sources: ['boib-decret-71-2016-llevant', 'boe-rd-191-2026'],
      },
      navegacion: {
        status: 'not_regulated',
        motivo:
          'El art. 2 del Decret 71/2016 prohíbe la pesca, la extracción, el anclaje sobre posidonia y el buceo con escafandra en la reserva integral, pero no menciona la navegación.',
        sources: ['boib-decret-71-2016-llevant'],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Ámbito estatal — Orden APA/690/2018
  // ---------------------------------------------------------------------------
  {
    zoneId: 'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--estatal',
    nombreCorto: 'Reserva Marina del Llevant de Mallorca (ámbito estatal)',
    resumen:
      'Aguas exteriores, competencia del Estado. La pesca desde tierra con caña al volantín y la recolecta de puu no necesitan autorización; la pesca desde embarcación y el buceo autónomo sí. La pesca submarina, el jigging, el spinning y los concursos de pesca están expresamente prohibidos.',
    normas: [NORMA_ESTATAL],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'allowed',
        motivo:
          'Permitida sin autorización en las modalidades de caña al volantín y recolecta de puu, con los aparejos que permite la Comunidad Autónoma.',
        conditions: [
          DIAS_TEXTO,
          'Caña o volantín: máximo 1 línea por pescador y 4 anzuelos en la zona estatal.',
          'Permitida también la recolecta de puu.',
          'El esparavel y el salabre no se permiten en el ámbito estatal.',
        ],
        schedule: { dias: DIAS },
        sources: ['boe-orden-apa-690-2018', 'caib-regulacion-llevant'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida previa autorización de la Secretaría General de Pesca, en las modalidades y condiciones del anexo 3 de la Orden APA/690/2018.',
        conditions: [
          DIAS_TEXTO,
          'Caña o volantín: máximo 1 línea por pescador y 4 anzuelos en la zona estatal.',
          'Potera: máximo 1 línea por pescador con 2 poteras.',
          'Curricán de superficie: máximo 2 líneas por embarcación.',
          'El curricán de fondo no se permite en el ámbito estatal.',
          'Prohibido el uso de pez vivo como cebo.',
          'Prohibidos los señuelos artificiales tipo rapala o cucharilla.',
          'Prohibidos los concursos de pesca de recreo.',
        ],
        schedule: { dias: DIAS },
        permit: AUTORIZACION_ESTATAL,
        sources: ['boe-orden-apa-690-2018', 'caib-regulacion-llevant'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'La pesca submarina está expresamente prohibida en el ámbito estatal de la reserva, junto con el jigging, el spinning y los concursos de pesca de recreo.',
        sources: ['boe-orden-apa-690-2018'],
      },
      buceo: BUCEO_ESTATAL,
      fondeo: FONDEO_ESTATAL,
      navegacion: NAVEGACION_ESTATAL,
    },
  },

  {
    zoneId: 'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-integral--estatal',
    nombreCorto: 'Reserva integral de cabo Ferrutx (ámbito estatal)',
    resumen:
      'Aguas exteriores frente al cabo Ferrutx. Únicamente se permiten actividades científicas expresamente autorizadas por la Secretaría General de Pesca.',
    normas: [NORMA_ESTATAL],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'En la zona de reserva integral únicamente pueden realizarse actividades científicas expresamente autorizadas.',
        sources: ['boe-orden-apa-690-2018'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'En la zona de reserva integral únicamente pueden realizarse actividades científicas expresamente autorizadas.',
        sources: ['boe-orden-apa-690-2018'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'En la zona de reserva integral únicamente pueden realizarse actividades científicas expresamente autorizadas.',
        sources: ['boe-orden-apa-690-2018'],
      },
      buceo: {
        status: 'prohibited',
        motivo:
          'Las actividades subacuáticas de recreo solo se permiten fuera de la reserva integral.',
        sources: ['boe-orden-apa-690-2018'],
      },
      fondeo: {
        status: 'prohibited',
        motivo:
          'El fondeo solo está permitido en Cala Moltó o Es Gulló, Cala Agulla y Son Moll. La reserva integral no está entre ellos.',
        sources: ['boe-orden-apa-690-2018'],
      },
      navegacion: NAVEGACION_ESTATAL,
    },
  },

  {
    zoneId: 'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--zona-d-us-restringit--estatal',
    nombreCorto: 'Zona de usos restringidos de Cala Agulla (ámbito estatal)',
    resumen:
      'Zona especial entre la línea de costa y el límite exterior de la reserva estatal, frente a Cala Agulla. La Orden APA/690/2018 la declara zona especial pero no le fija un régimen de usos distinto del resto de la reserva fuera de la integral. Cala Agulla es, además, uno de los tres lugares donde sí se puede fondear.',
    normas: [NORMA_ESTATAL],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'allowed',
        motivo:
          'Permitida sin autorización en las modalidades de caña al volantín y recolecta de puu, como en el resto de la reserva estatal fuera de la integral.',
        conditions: [
          DIAS_TEXTO,
          'Caña o volantín: máximo 1 línea por pescador y 4 anzuelos en la zona estatal.',
          'Permitida también la recolecta de puu.',
        ],
        schedule: { dias: DIAS },
        sources: ['boe-orden-apa-690-2018', 'caib-regulacion-llevant'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida previa autorización de la Secretaría General de Pesca, en las modalidades y condiciones del anexo 3.',
        conditions: [
          DIAS_TEXTO,
          'Prohibido el uso de pez vivo como cebo.',
          'Prohibidos los señuelos artificiales tipo rapala o cucharilla.',
        ],
        schedule: { dias: DIAS },
        permit: AUTORIZACION_ESTATAL,
        sources: ['boe-orden-apa-690-2018'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo: 'La pesca submarina está expresamente prohibida en el ámbito estatal de la reserva.',
        sources: ['boe-orden-apa-690-2018'],
      },
      buceo: BUCEO_ESTATAL,
      fondeo: {
        status: 'restricted',
        motivo:
          'Cala Agulla es uno de los tres lugares de la reserva estatal donde se puede fondear sin autorización.',
        conditions: [
          'Fondeo libre en Cala Agulla, por fuera de la zona de baño y de los canales de acceso.',
          'Fuera de esos lugares el fondeo está prohibido salvo emergencia.',
        ],
        sources: ['boe-orden-apa-690-2018'],
      },
      navegacion: NAVEGACION_ESTATAL,
    },
  },
];
