/**
 * Reserva Marina de sa Dragonera.
 *
 * Conviven dos administraciones con regímenes distintos, y la diferencia es
 * grande:
 *
 *  - **Aguas interiores (ámbito autonómico)**, Reserva Marina del Freu de sa
 *    Dragonera. Régimen del Govern: pesca recreativa desde costa y desde
 *    embarcación permitidas con límites de aparejo.
 *  - **Aguas exteriores (ámbito estatal)**, Orden APA/1024/2020. Régimen mucho
 *    más restrictivo, construido «al revés»: el art. 3 enumera lo permitido y
 *    el art. 3.6 prohíbe todo lo que no figure. Ahí la pesca desde tierra, la
 *    pesca submarina, el jigging y el spinning están prohibidos por el art.
 *    5.1.b, y el fondeo lo está en toda la reserva estatal por el art. 6.1.
 *
 * Dentro del ámbito estatal hay además una reserva integral —solo ciencia— y
 * cinco zonas de usos restringidos donde se puede bucear pero no pescar.
 *
 * Ninguna de esas figuras está anidada dentro de otra: la cartografía oficial
 * las publica como polígonos adyacentes y recortados, así que no se usa
 * `heredaDe` salvo en els Calafats, que sí cae dentro de la reserva autonómica.
 */

import { permiso } from '../schema.js';
import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';

const AUTONOMICA = 'rm-reserva-marina-de-sa-dragonera-reserva-marina-autonomica--reserva-marina--autonomica';

const NORMA_ESTATAL = {
  titulo: 'Orden APA/1024/2020, de 27 de octubre, de la reserva marina de la isla Dragonera',
  fecha: '2020-10-27',
  url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2020-13657',
  tipo: 'creacion',
};

// Norma de creación del ámbito autonómico. No se citaba en esta ficha hasta
// ahora: solo se citaba la Ordre 6/2025 (que modifica velocidad y crea
// Calafats) y el decreto general, sin la norma de creación real de la reserva.
const NORMA_DECRET_62_2016 = {
  titulo:
    'Decreto 62/2016, de 7 de octubre, por el que se establece la Reserva Marina del Freu de sa Dragonera y se regulan las actividades de extracción de flora y fauna marina y las actividades subacuáticas',
  fecha: '2016-10-07',
  url: 'http://www.caib.es/eboibfront/pdf/es/2016/128/962190',
  tipo: 'creacion',
};

const NORMA_ORDRE_6_2025 = {
  titulo:
    'Ordre 6/2025, de velocitat de navegació i zona d’alta protecció dels illots dels Calafats',
  fecha: '2025-03-06',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/o/2025/03/06/6/dof/cat',
  tipo: 'modificacion',
};

const NORMA_GENERAL = {
  titulo:
    'Decret 41/2015, d’activitats d’extracció de flora o fauna marina i activitats subaquàtiques',
  fecha: '2015-05-22',
  url: 'https://www.caib.es/sites/reservesmarines/es/normativa_general_en_las_reservas_marinas/',
  tipo: 'general',
};

const AUTORIZACION_EMBARCACION = permiso({
  importe: 0,
  nota: 'Gratuita. Exige licencia de pesca recreativa de embarcación en vigor y llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
  vigencia: '3 años',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/3691781',
  ultimaVerificacion: '2026-08-15',
});

const AUTORIZACION_ESTATAL = permiso({
  importe: null,
  nota: 'Autorización específica anual de la Dirección General de Pesca Sostenible (Secretaría General de Pesca). Se solicita por registro electrónico o en cualquier registro público; la documentación exigida figura en el art. 10 de la Orden APA/1024/2020. El Govern indica que el trámite telemático está en preparación.',
  vigencia: '1 año',
  url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2020-13657',
  ultimaVerificacion: '2026-08-15',
});

// La tarifa del Govern cubre esta reserva pero la lista «solo válida en la zona
// autonómica»: en el ámbito estatal manda la Orden APA/1024/2020 y otro
// permiso, que no publica importe (PERMISO_BUCEO_ESTATAL).
const PERMISO_BUCEO_AUTONOMICO = permiso({
  importe: 52.82,
  nota: 'Autorización anual individual, válida solo en la zona autonómica de la reserva. Habilita también el resto de reservas marinas de Mallorca, salvo las boyas de las zonas especiales de buceo del Toro y les Malgrats. Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo que entrega el órgano competente en la materia.',
  vigencia: '1 año (hay también diaria y quincenal)',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/1139905',
  ultimaVerificacion: '2026-08-16',
});

const PERMISO_BUCEO_ESTATAL = permiso({
  importe: null,
  nota: 'Autorización de la Dirección General de Pesca Sostenible, sujeta a cupos de inmersiones. Las boyas de los puntos de buceo se reservan por la aplicación de la Dirección General de Pesca i Medi Marí del Govern.',
  vigencia: null,
  url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2020-13657',
  ultimaVerificacion: '2026-08-15',
});

// Reglas del ámbito estatal que se repiten en sus cuatro figuras. No se usa
// `heredaDe` porque las geometrías son adyacentes, no anidadas: declarar
// herencia sobre zonas que no se contienen sería un error de modelado.
const NAVEGACION_ESTATAL = {
  status: 'restricted',
  motivo:
    'La libre navegación está permitida sin autorización en toda la reserva, pero los buques en tránsito deben navegar entre 6 y 10 nudos y lo más lejos posible de la costa.',
  conditions: [
    'Buques en tránsito: velocidad superior a 6 nudos e inferior a 10 nudos.',
    'Los buques en tránsito procurarán navegar a la mayor distancia posible de la costa.',
    'Prohibidas las motos de agua en toda la reserva.',
  ],
  sources: ['boe-orden-apa-1024-2020'],
};

const FONDEO_ESTATAL = {
  status: 'prohibited',
  motivo:
    'El fondeo está prohibido en toda la reserva marina estatal, salvo por emergencia relacionada con la seguridad de la vida humana en el mar, la seguridad nacional o el orden público.',
  sources: ['boe-orden-apa-1024-2020'],
};

const PESCA_SUBMARINA_ESTATAL = {
  status: 'prohibited',
  motivo:
    'La pesca submarina está expresamente prohibida en el ámbito estatal de la reserva, junto con la pesca desde tierra, el jigging y el spinning.',
  sources: ['boe-orden-apa-1024-2020'],
};

/** Las cinco zonas de usos restringidos comparten régimen; solo cambia el nombre. */
function zonaUsoRestringido(zoneId, nombreCorto, paraje) {
  return {
    zoneId,
    nombreCorto,
    resumen: `Franja de 50 metros de ancho frente al litoral oeste de sa Dragonera, en ${paraje}. Se puede bucear con autorización y hacer snorkel desde embarcación, pero no pescar en ninguna modalidad.`,
    normas: [NORMA_ESTATAL],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'En las zonas de usos restringidos solo se permiten actividades subacuáticas de recreo, científicas y didácticas. Cualquier uso no recogido queda prohibido.',
        sources: ['boe-orden-apa-1024-2020'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'La pesca no figura entre las actividades permitidas en las zonas de usos restringidos, y lo no recogido queda prohibido.',
        sources: ['boe-orden-apa-1024-2020'],
      },
      pescaSubmarina: PESCA_SUBMARINA_ESTATAL,
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El buceo autónomo se permite previa autorización de la Dirección General de Pesca Sostenible y con cupos. El snorkel desde embarcación al pairo no necesita autorización.',
        conditions: [
          'Snorkel (gafas, tubo y aletas) desde embarcación al pairo: sin autorización, bajo responsabilidad de quien lo practica.',
          'Prohibidas las inmersiones nocturnas y las inmersiones desde tierra.',
          'Prohibidos los elementos mecánicos de propulsión submarina.',
          'Prohibido efectuar pruebas de mar o prácticas de escuelas de buceo.',
          'Prohibido llevar cualquier instrumento utilizable para la pesca o la extracción, salvo un cuchillo por seguridad.',
          'La embarcación debe permanecer amarrada a la boya asignada; en ningún caso fondear.',
        ],
        permit: PERMISO_BUCEO_ESTATAL,
        sources: ['boe-orden-apa-1024-2020', 'caib-regulacion-dragonera'],
      },
      fondeo: FONDEO_ESTATAL,
      navegacion: NAVEGACION_ESTATAL,
    },
  };
}

export default [
  // ---------------------------------------------------------------------------
  // Ámbito autonómico — aguas interiores
  // ---------------------------------------------------------------------------
  {
    zoneId: AUTONOMICA,
    nombreCorto: 'Reserva Marina de sa Dragonera (ámbito autonómico)',
    resumen:
      'Aguas interiores del Freu de sa Dragonera, competencia del Govern. La pesca recreativa está permitida con límites de aparejo, salvo desde la costa de la isla y sus islotes. La pesca profesional de artes menores queda reservada a la cofradía de Andratx y a quien acredite habitualidad en la zona.',
    normas: [NORMA_DECRET_62_2016, NORMA_ORDRE_6_2025, NORMA_GENERAL],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'Permitida con aparejos limitados, excepto desde la costa de sa Dragonera y sus islotes, donde no se puede pescar.',
        conditions: [
          'Prohibida desde la costa de sa Dragonera y desde los islotes.',
          'Caña o volantín: máximo 2 líneas por pescador y 6 anzuelos de 7 mm o más.',
          'Potera: 1 por pescador.',
          'Permitidos también el spinning y la recolección de puu.',
          'Fisga: solo de día.',
          'Los aparejos tradicionales requieren autorización específica.',
        ],
        sources: ['caib-regulacion-dragonera'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida en aguas interiores con autorización trienal y aparejos limitados. Es el único ámbito de la reserva donde también se puede pescar desde artefactos flotantes.',
        conditions: [
          'Caña o volantín: máximo 1 línea por pescador y 4 anzuelos de 7 mm o más (5,7 mm o más para el raor).',
          'Potera: máximo 1 línea con 2 poteras por pescador.',
          'Curricán de fondo: máximo 1 línea por embarcación.',
          'Curricán de superficie (fluixa): máximo 2 líneas por embarcación.',
          'Permitido también el spinning.',
          'No se pueden utilizar peces vivos como cebo.',
          'La pesca desde artefactos flotantes solo está permitida en el ámbito autonómico.',
          'Los armadores autorizados deben llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
        ],
        permit: AUTORIZACION_EMBARCACION,
        sources: ['caib-regulacion-dragonera', 'tramite-autorizacion-embarcacion'],
      },
      // El art. 2.1.a del Decreto 62/2016 prohíbe «toda clase de pesca
      // marítima» dentro de la reserva, con solo tres excepciones tasadas en
      // el punto 2: pesca profesional de artes menores, pesca y marisqueo
      // recreativos desde tierra y embarcación, y muestreo científico. La
      // pesca submarina no figura entre las excepciones, así que queda
      // prohibida. No hace falta extrapolar el régimen estatal: se desprende
      // directamente de esta norma autonómica.
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'El art. 2 del Decreto 62/2016 prohíbe toda clase de pesca marítima dentro de la reserva, con tres excepciones tasadas: pesca profesional de artes menores, pesca y marisqueo recreativos desde tierra y embarcación, y muestreo científico autorizado. La pesca submarina no está entre ellas.',
        sources: ['boib-decret-62-2016-dragonera'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El buceo con escafandra requiere permiso individual o colectivo. Las inmersiones en apnea son libres en toda la zona autonómica.',
        conditions: ['Las inmersiones en apnea son libres en toda la zona autonómica.'],
        permit: PERMISO_BUCEO_AUTONOMICO,
        sources: ['caib-regulacion-dragonera', 'tramite-autorizacion-buceo'],
      },
      fondeo: fondeoPorPosidoniaGeneral(),
      navegacion: {
        status: 'restricted',
        motivo:
          'La navegación dentro de la Reserva Marina del Freu de sa Dragonera está limitada a menos de 10 nudos.',
        conditions: [
          'Velocidad inferior a 10 nudos, salvo emergencia relacionada con la seguridad de la vida humana en el mar o actuaciones de vigilancia, control, defensa nacional u orden público.',
          'Las embarcaciones de pesca de arrastre en tránsito pueden navegar hasta 12 nudos cuando crucen la reserva hacia sus caladeros tradicionales.',
        ],
        sources: ['boib-ordre-6-2025'],
      },
    },
  },

  {
    zoneId: 'rm-entorn-dels-illots-dels-calafats--zona-d-alta-proteccio--autonomica',
    heredaDe: AUTONOMICA,
    nombreCorto: 'Zona de alta protección dels illots dels Calafats',
    resumen:
      '36 hectáreas alrededor de los islotes dels Calafats, entre la punta des Lledó y la punta de cala en Regau, dentro de la reserva autonómica. Prohibida toda clase de pesca y extracción, salvo muestreo científico y dos artes profesionales concretas.',
    normas: [NORMA_ORDRE_6_2025],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'Dentro de la zona de alta protección queda prohibida toda clase de pesca marítima y de extracción de flora y fauna marinas.',
        conditions: [
          'Se exceptúan la toma de muestras con fines científicos y la pesca profesional de artes menores: artes de parada (moruna o solta) en cala en Regau, y junquillera en su temporada.',
        ],
        sources: ['boib-ordre-6-2025'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'Dentro de la zona de alta protección queda prohibida toda clase de pesca marítima y de extracción de flora y fauna marinas.',
        sources: ['boib-ordre-6-2025'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'Queda prohibida toda clase de pesca marítima y de extracción, y la pesca submarina no figura entre las excepciones.',
        sources: ['boib-ordre-6-2025'],
      },
      // Buceo, fondeo y navegación se heredan del régimen general de la
      // reserva autonómica, dentro de la cual está esta zona.
    },
  },

  // ---------------------------------------------------------------------------
  // Ámbito estatal — aguas exteriores (Orden APA/1024/2020)
  // ---------------------------------------------------------------------------
  {
    zoneId: 'rm-reserva-marina-de-sa-dragonera-reserva-marina-estatal--reserva-marina--estatal',
    nombreCorto: 'Reserva Marina de sa Dragonera (ámbito estatal)',
    resumen:
      'Aguas exteriores, competencia del Estado. Solo se permite lo que la Orden APA/1024/2020 enumera expresamente: pesca profesional de artes menores, pesca recreativa desde embarcación y actividades científicas o didácticas, todas con autorización. Lo demás está prohibido, incluidos la pesca desde tierra, la pesca submarina y el fondeo.',
    normas: [NORMA_ESTATAL],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'La pesca desde tierra está expresamente prohibida en el ámbito estatal de la reserva.',
        sources: ['boe-orden-apa-1024-2020'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida solo desde embarcación, en días concretos y con dos aparejos, previa autorización específica anual de la Secretaría General de Pesca.',
        conditions: [
          'Días autorizados: martes, jueves, sábados, domingos y festivos nacionales.',
          'Caña o volantín: máximo 1 línea por pescador y 4 anzuelos, de ancho superior a 7 mm y máximo 9 mm.',
          'Curricán de superficie: máximo 2 líneas por embarcación, sin lastrar y navegando a más de 3 nudos.',
          'No se puede pescar fondeado.',
          'No se pueden utilizar peces ni cefalópodos vivos como cebo.',
          'No se pueden llevar a bordo aparejos no permitidos.',
          'No se puede pescar desde artefactos flotantes.',
          'Prohibidos el jigging y el spinning.',
        ],
        schedule: { dias: ['martes', 'jueves', 'sábado', 'domingo', 'festivos nacionales'] },
        permit: AUTORIZACION_ESTATAL,
        sources: ['caib-regulacion-dragonera', 'boe-orden-apa-1024-2020'],
      },
      pescaSubmarina: PESCA_SUBMARINA_ESTATAL,
      buceo: {
        status: 'prohibited',
        motivo:
          'Las actividades subacuáticas de recreo solo figuran entre los usos permitidos de las zonas de usos restringidos. En el resto de la reserva estatal no están recogidas, y lo no recogido queda prohibido.',
        conditions: [
          'La apnea sí se permite en las zonas de usos restringidos del ámbito estatal.',
        ],
        sources: ['boe-orden-apa-1024-2020', 'caib-regulacion-dragonera'],
      },
      fondeo: FONDEO_ESTATAL,
      navegacion: NAVEGACION_ESTATAL,
    },
  },

  {
    zoneId:
      'rm-reserva-marina-de-sa-dragonera-reserva-marina-integral-estatal--reserva-integral--estatal',
    nombreCorto: 'Reserva integral de sa Dragonera (ámbito estatal)',
    resumen:
      'Franja de 0,1 millas frente al litoral oeste de la isla, entre cabo de Tramuntana y cabo de Llebeig. Es el núcleo de la reserva: únicamente se permiten actividades científicas expresamente autorizadas por la Secretaría General de Pesca.',
    normas: [NORMA_ESTATAL],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'En la zona de reserva integral únicamente pueden realizarse actividades científicas expresamente autorizadas.',
        sources: ['boe-orden-apa-1024-2020'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'En la zona de reserva integral únicamente pueden realizarse actividades científicas expresamente autorizadas.',
        sources: ['boe-orden-apa-1024-2020'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'En la zona de reserva integral únicamente pueden realizarse actividades científicas expresamente autorizadas.',
        sources: ['boe-orden-apa-1024-2020'],
      },
      buceo: {
        status: 'prohibited',
        motivo:
          'El buceo recreativo no figura entre las actividades permitidas en la reserva integral, donde solo cabe la investigación autorizada.',
        sources: ['boe-orden-apa-1024-2020'],
      },
      fondeo: FONDEO_ESTATAL,
      navegacion: NAVEGACION_ESTATAL,
    },
  },

  zonaUsoRestringido(
    'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-cap-de-tramuntana--zona-d-us-restringit--estatal',
    'Zona de usos restringidos del cabo de Tramuntana',
    'el cabo de Tramuntana',
  ),
  zonaUsoRestringido(
    'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-sa-finestra--zona-d-us-restringit--estatal',
    'Zona de usos restringidos de sa Finestra',
    'la cova de sa Finestra',
  ),
  zonaUsoRestringido(
    'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-far-vell--zona-d-us-restringit--estatal',
    'Zona de usos restringidos del Far Vell',
    'el Far Vell',
  ),
  zonaUsoRestringido(
    'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-pla-de-s-alga--zona-d-us-restringit--estatal',
    'Zona de usos restringidos del pla de s’Alga',
    'la punta de s’Alga',
  ),
  zonaUsoRestringido(
    'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-cap-de-llebeig--zona-d-us-restringit--estatal',
    'Zona de usos restringidos del cabo de Llebeig',
    'el cabo de Llebeig',
  ),
];
