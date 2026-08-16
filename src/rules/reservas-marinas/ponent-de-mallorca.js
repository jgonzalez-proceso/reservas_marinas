/**
 * Reserva Marina del Ponent de Mallorca, el Toro, les Malgrats i el Sec.
 *
 * Dos normas conviven sobre este espacio y ambas están vigentes:
 *
 *  - **Decret 26/2025** establece la reserva actual, sus zonas de alta
 *    protección (Toro, Malgrats, es Sec) y la zona de protección pesquera de la
 *    badia de Santa Ponça. Sustituye a la antigua reserva de les illes del Toro
 *    i les Malgrats.
 *  - **Decret 38/2022** sigue rigiendo las dos **zonas especiales de buceo**,
 *    que IDEIB continúa publicando bajo esa norma. Sus perímetros coinciden con
 *    los de las zonas de alta protección del Toro y els Malgrats, de modo que
 *    sobre ese mar recaen dos figuras a la vez. El motor las apila y aplica la
 *    más restrictiva.
 *
 * Las zonas interiores heredan el régimen general de la reserva mediante
 * `heredaDe` y solo declaran lo que su norma específica modifica. Santa Ponça
 * NO hereda: la página oficial dice expresamente que «ha quedado fuera del área
 * de la reserva marina actual».
 *
 * Contenido transcrito de la regulación de actividades publicada por el Govern
 * y del articulado del Decret 38/2022 en el BOIB.
 */

import { permiso } from '../schema.js';
import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';

const RESERVA = 'rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica';

const NORMA_26_2025 = {
  titulo: 'Decret 26/2025, de la Reserva Marina del Ponent de Mallorca',
  fecha: null,
  url: 'https://www.caib.es/eboibfront/pdf/ca/2025/86/1195240',
  tipo: 'creacion',
};

const NORMA_38_2022 = {
  titulo:
    'Decret 38/2022, de 5 de setembre, de la Reserva Marina de les illes del Toro i de les Malgrats',
  fecha: '2022-09-05',
  url: 'https://www.caib.es/eboibfront/ca/2022/11621/664355/decret-38-2022-de-5-de-setembre-pel-qual-s-estable',
  tipo: 'creacion',
};

const NORMA_GENERAL = {
  titulo:
    'Decret 41/2015, d’activitats d’extracció de flora o fauna marina i activitats subaquàtiques',
  fecha: null,
  url: 'https://www.caib.es/sites/reservesmarines/es/normativa_general_en_las_reservas_marinas/',
  tipo: 'general',
};

const AUTORIZACION_EMBARCACION = permiso({
  importe: 0,
  nota: 'Gratuita. Exige licencia de pesca recreativa de embarcación en vigor y llevar registro de capturas; no presentarlo comporta la pérdida de la licencia. Prohibidas las competiciones en toda la reserva.',
  vigencia: '3 años',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/3691781',
  ultimaVerificacion: '2026-08-15',
});

/** Permiso de buceo: lo entrega el órgano competente, sin tasa publicada aquí. */
const PERMISO_BUCEO = permiso({
  importe: null,
  nota: 'Permiso individual o colectivo que entrega la Dirección General de Pesca y Medio Marino.',
  vigencia: null,
  url: 'https://www.caib.es/sites/reservesmarines/es/regulacian_de_actividades_0/',
  ultimaVerificacion: '2026-08-15',
});

// Régimen de fondeo y navegación común a toda la reserva: los 5 puntos
// tradicionales de artes de parada. Se declara una vez y lo heredan las zonas
// interiores.
const ARTES_DE_PARADA =
  'En los 5 puntos tradicionales de artes de parada de la reserva está prohibido acercarse a menos de 150 m, y fondear o navegar dentro de los polígonos que los forman, cuando la solta o la moruna estén caladas.';

const SIN_INMERSIONES_NOCTURNAS =
  'En las zonas de alta protección, los buceadores individuales no pueden realizar inmersiones nocturnas.';

export default [
  // ---------------------------------------------------------------------------
  // Perímetro general de la reserva
  // ---------------------------------------------------------------------------
  {
    zoneId: RESERVA,
    nombreCorto: 'Reserva Marina del Ponent de Mallorca',
    resumen:
      'Perímetro general de la reserva, entre Andratx y Palma. La pesca recreativa está permitida con aparejos limitados; desde embarcación exige autorización trienal y registro de capturas. La pesca profesional de artes menores requiere figurar en un censo de embarcaciones autorizadas.',
    normas: [NORMA_26_2025, NORMA_GENERAL],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'Permitida con aparejos limitados, salvo entre la cala de s’Art y el Morro d’en Feliu, donde la pesca y el marisqueo están prohibidos.',
        conditions: [
          'Caña o volantín: máximo 2 líneas por pescador y 6 anzuelos de 7 mm o más.',
          'Potera: máximo 1 por pescador.',
          'Permitidos también el spinning, la fisga, el salabre y la recolección de puu.',
          'Los aparejos tradicionales requieren autorización específica.',
          'Prohibida la pesca y el marisqueo entre la cala de s’Art y el Morro d’en Feliu.',
        ],
        sources: ['caib-regulacion-ponent', 'boib-decret-38-2022'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida con autorización trienal específica y registro obligatorio de las capturas.',
        conditions: [
          'Caña o volantín: máximo 1 línea por pescador y 4 anzuelos de 7 mm o más (5,7 mm o más para raors).',
          'Potera: máximo 1 línea por pescador con 2 poteras.',
          'Curricán de superficie: máximo 2 líneas por embarcación.',
          'Curricán de fondo: máximo 1 línea por embarcación.',
          'Permitido también el spinning.',
          'Los armadores autorizados deben llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
          'Prohibida la celebración de competiciones.',
        ],
        permit: AUTORIZACION_EMBARCACION,
        sources: ['caib-regulacion-ponent', 'boib-decret-38-2022', 'tramite-autorizacion-embarcacion'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'Está prohibido llevar, tanto en la inmersión como en la embarcación, cualquier instrumento que pueda usarse para pescar o extraer especies marinas, salvo el cuchillo de seguridad. Eso excluye la pesca submarina en toda la reserva.',
        sources: ['caib-regulacion-ponent'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'Las actividades subacuáticas con escafandra requieren permiso individual o colectivo. Las inmersiones en apnea son libres en toda la reserva.',
        conditions: [
          'Las inmersiones en apnea son libres en toda la reserva marina.',
          'No está permitido bucear en el interior de las cuevas marinas.',
          'Prohibido llevar cualquier instrumento utilizable para la pesca o la extracción, salvo el cuchillo de seguridad.',
          'Prohibido acercarse a menos de 150 m de los puntos de artes de parada cuando estén calados.',
        ],
        permit: PERMISO_BUCEO,
        sources: ['caib-regulacion-ponent', 'boib-decret-38-2022'],
      },
      fondeo: {
        status: 'restricted',
        motivo: ARTES_DE_PARADA,
        conditions: [ARTES_DE_PARADA],
        sources: ['caib-regulacion-ponent'],
      },
      navegacion: {
        status: 'restricted',
        motivo: ARTES_DE_PARADA,
        conditions: [ARTES_DE_PARADA],
        sources: ['caib-regulacion-ponent'],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Zonas de alta protección (Decret 26/2025)
  // ---------------------------------------------------------------------------
  {
    zoneId: 'rm-zona-d-alta-proteccio-de-l-illa-del-toro--zona-d-alta-proteccio--autonomica',
    heredaDe: RESERVA,
    nombreCorto: 'Zona de alta protección de l’Illa del Toro',
    resumen:
      'Núcleo protegido alrededor de l’Illa del Toro. No se permite ninguna modalidad de pesca recreativa. El buceo sí, con permiso y sin inmersiones nocturnas individuales.',
    normas: [NORMA_26_2025],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo: 'La pesca recreativa desde costa no está permitida en esta zona de alta protección.',
        sources: ['caib-regulacion-ponent'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'La pesca recreativa desde embarcación no está permitida en esta zona de alta protección.',
        sources: ['caib-regulacion-ponent'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo: 'La pesca submarina no está permitida en esta zona de alta protección.',
        sources: ['caib-regulacion-ponent'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitido con permiso individual o colectivo, sin inmersiones nocturnas individuales.',
        conditions: [
          SIN_INMERSIONES_NOCTURNAS,
          'No está permitido bucear en el interior de las cuevas marinas.',
        ],
        permit: PERMISO_BUCEO,
        sources: ['caib-regulacion-ponent', 'boib-decret-38-2022'],
      },
      // fondeo y navegación se heredan del régimen general de la reserva.
    },
  },

  {
    zoneId: 'rm-zona-d-alta-proteccio-de-les-illes-malgrats--zona-d-alta-proteccio--autonomica',
    heredaDe: RESERVA,
    nombreCorto: 'Zona de alta protección de les Illes Malgrats',
    resumen:
      'Alrededor de les Illes Malgrats y dels Conills. La pesca recreativa está permitida solo en ventanas estacionales concretas y nunca desde los islotes.',
    normas: [NORMA_26_2025],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'Permitida únicamente entre el 1 de enero y el 30 de abril, y nunca desde los islotes.',
        conditions: [
          'Solo del 1 de enero al 30 de abril.',
          'Caña: máximo 1 línea por pescador y 6 anzuelos de 7 mm o más.',
          'Prohibida la pesca desde los islotes.',
        ],
        schedule: { temporada: 'Del 1 de enero al 30 de abril' },
        sources: ['caib-regulacion-ponent', 'boib-decret-38-2022'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida solo en ventanas estacionales y con la autorización trienal de la reserva.',
        conditions: [
          'Caña o volantín, del 1 de octubre al 30 de abril: máximo 1 línea por pescador y 4 anzuelos de 7 mm o más (5,7 mm o más para raors).',
          'Potera, del 1 de octubre al 31 de diciembre: máximo 1 línea por pescador con 2 poteras.',
        ],
        schedule: {
          canya: 'Del 1 de octubre al 30 de abril',
          potera: 'Del 1 de octubre al 31 de diciembre',
        },
        permit: AUTORIZACION_EMBARCACION,
        sources: ['caib-regulacion-ponent', 'boib-decret-38-2022', 'tramite-autorizacion-embarcacion'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo: 'La pesca submarina no está permitida en esta zona de alta protección.',
        sources: ['caib-regulacion-ponent'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitido con permiso individual o colectivo, sin inmersiones nocturnas individuales.',
        conditions: [
          SIN_INMERSIONES_NOCTURNAS,
          'No está permitido bucear en el interior de las cuevas marinas.',
        ],
        permit: PERMISO_BUCEO,
        sources: ['caib-regulacion-ponent', 'boib-decret-38-2022'],
      },
    },
  },

  {
    zoneId: 'rm-zona-d-alta-proteccio-de-l-illa-del-sec--zona-d-alta-proteccio--autonomica',
    heredaDe: RESERVA,
    nombreCorto: 'Zona de alta protección de l’illa des Sec',
    resumen:
      'Núcleo protegido alrededor de l’illa des Sec, en la bahía de Palma. No se permite ninguna modalidad de pesca recreativa.',
    normas: [NORMA_26_2025],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo: 'La pesca recreativa desde costa no está permitida en esta zona de alta protección.',
        sources: ['caib-regulacion-ponent'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'La pesca recreativa desde embarcación no está permitida en esta zona de alta protección.',
        sources: ['caib-regulacion-ponent'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo: 'La pesca submarina no está permitida en esta zona de alta protección.',
        sources: ['caib-regulacion-ponent'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitido con permiso individual o colectivo, sin inmersiones nocturnas individuales.',
        conditions: [
          SIN_INMERSIONES_NOCTURNAS,
          'No está permitido bucear en el interior de las cuevas marinas.',
        ],
        permit: PERMISO_BUCEO,
        sources: ['caib-regulacion-ponent'],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Zona de protección pesquera de Santa Ponça — FUERA de la reserva
  // ---------------------------------------------------------------------------
  {
    zoneId: 'rm-zona-de-proteccio-pesquera-de-la-badia-de-santa-ponca--zona-de-proteccio-pesquera--autonomica',
    // Sin heredaDe a propósito: la página oficial dice expresamente que esta
    // zona «ha quedado fuera del área de la reserva marina actual», así que el
    // régimen general de la reserva no le aplica.
    nombreCorto: 'Zona de protección pesquera de la badia de Santa Ponça',
    resumen:
      'RÉGIMEN TRANSITORIO. Esta zona ha quedado fuera del área de la reserva marina. Hasta que la Consejería establezca un plan de pesca, está prohibida cualquier modalidad de pesca salvo tres excepciones tasadas: la pesca y el marisqueo recreativos desde tierra, el marisqueo recreativo desde embarcación y la pesca profesional con artes de tirada (junquillera).',
    normas: [NORMA_26_2025],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'allowed',
        motivo:
          'La pesca y el marisqueo recreativos desde tierra están expresamente exceptuados de la prohibición general que rige mientras no haya plan de pesca.',
        conditions: [
          'Régimen transitorio: vigente hasta que la Consejería establezca un plan de pesca para la zona.',
        ],
        sources: ['caib-regulacion-ponent'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'Está prohibida cualquier modalidad de pesca hasta que se establezca un plan de pesca. La excepción alcanza al marisqueo recreativo desde embarcación, que sí está permitido, pero no a la pesca.',
        conditions: [
          'El marisqueo recreativo desde embarcación sí está exceptuado y se puede practicar.',
          'Régimen transitorio: vigente hasta que la Consejería establezca un plan de pesca para la zona.',
        ],
        sources: ['caib-regulacion-ponent'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'Está prohibida cualquier modalidad de pesca hasta que se establezca un plan de pesca, y la pesca submarina no figura entre las excepciones.',
        sources: ['caib-regulacion-ponent'],
      },
      // Esta zona está fuera de la reserva marina. La disposición transitoria
      // del Decret 26/2025 solo regula la actividad pesquera; buceo y
      // navegación no están tocados por ninguna norma propia de la zona.
      buceo: {
        status: 'not_regulated',
        motivo:
          'La zona está fuera de la reserva marina y su régimen transitorio solo regula la actividad pesquera. Ninguna norma propia de esta zona toca el buceo.',
        sources: ['caib-regulacion-ponent'],
      },
      fondeo: fondeoPorPosidoniaGeneral(),
      navegacion: {
        status: 'not_regulated',
        motivo:
          'La zona está fuera de la reserva marina y su régimen transitorio solo regula la actividad pesquera. Ninguna norma propia de esta zona toca la navegación.',
        sources: ['caib-regulacion-ponent'],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Zonas especiales de buceo (Decret 38/2022)
  // ---------------------------------------------------------------------------
  {
    zoneId: 'rm-zona-especial-de-busseig-de-l-illa-del-toro--zona-especial-de-busseig--autonomica',
    heredaDe: RESERVA,
    nombreCorto: 'Zona especial de buceo de l’Illa del Toro',
    resumen:
      'Perímetro marino de l’Illa del Toro, entre el Clot des Moro y la cala de s’Art. Prohibida toda clase de pesca marítima y de extracción, con la excepción del muestreo científico y de artes menores profesionales concretas. El buceo colectivo está limitado a puntos, visitas y número de submarinistas.',
    normas: [NORMA_38_2022],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'Dentro de la zona especial de buceo queda prohibida toda clase de pesca marítima y de extracción de flora y fauna marinas.',
        conditions: [
          'Se exceptúan la toma de muestras con fines científicos y la pesca profesional de artes menores: artes de parada en el Clot des Moro, y junquillera del 1 de enero al 30 de abril.',
        ],
        sources: ['boib-decret-38-2022'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'Dentro de la zona especial de buceo queda prohibida toda clase de pesca marítima y de extracción de flora y fauna marinas.',
        sources: ['boib-decret-38-2022'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'Dentro de la zona especial de buceo queda prohibida toda clase de pesca marítima y de extracción de flora y fauna marinas.',
        sources: ['boib-decret-38-2022'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitido con permiso. El buceo colectivo solo puede practicarse en 6 puntos concretos, con un máximo de 4 visitas diarias por punto y 12 submarinistas por visita.',
        conditions: [
          'Buceo colectivo con escafandra: solo en los 6 puntos fijados en el anexo 2 del Decret 38/2022.',
          'Cada punto puede visitarse 4 veces al día, con un máximo de 12 submarinistas por visita.',
          'Prohibidas las inmersiones nocturnas para el buceo individual con escafandra.',
          'Las tareas formativas de escuela de buceo requieren notificación previa a la Dirección General de Pesca y Medio Marino.',
        ],
        permit: PERMISO_BUCEO,
        sources: ['boib-decret-38-2022', 'caib-regulacion-ponent'],
      },
    },
  },

  {
    zoneId: 'rm-zona-especial-de-busseig-de-les-illes-malgrats--zona-especial-de-busseig--autonomica',
    heredaDe: RESERVA,
    nombreCorto: 'Zona especial de buceo de les Illes Malgrats',
    resumen:
      'Perímetro marino de les Illes Malgrats y dels Conills, entre la Punta de na Foradada y el cap Negret. Prohibida toda clase de pesca y extracción salvo excepciones tasadas, con ventanas estacionales para la pesca recreativa.',
    normas: [NORMA_38_2022],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'Permitida como excepción a la prohibición general, solo con caña, del 1 de enero al 30 de abril y nunca desde los islotes.',
        conditions: [
          'Solo del 1 de enero al 30 de abril.',
          'Máximo 1 caña por pescador.',
          'Prohibida la pesca desde los islotes.',
        ],
        schedule: { temporada: 'Del 1 de enero al 30 de abril' },
        sources: ['boib-decret-38-2022'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida como excepción a la prohibición general, solo con potera y volantín en sus ventanas estacionales y con la autorización trienal de la reserva.',
        conditions: [
          'Potera para cefalópodos: del 1 de octubre al 31 de diciembre.',
          'Volantín desde embarcación: del 1 de octubre al 30 de abril.',
        ],
        schedule: {
          potera: 'Del 1 de octubre al 31 de diciembre',
          volanti: 'Del 1 de octubre al 30 de abril',
        },
        permit: AUTORIZACION_EMBARCACION,
        sources: ['boib-decret-38-2022', 'tramite-autorizacion-embarcacion'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'Queda prohibida toda clase de pesca marítima y de extracción, y la pesca submarina no figura entre las excepciones.',
        conditions: [
          'Las excepciones alcanzan a la pesca profesional de artes menores (artes de parada en el Racó de s’Almadrava y junquillera del 1 de enero al 30 de abril) y al muestreo científico.',
        ],
        sources: ['boib-decret-38-2022'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitido con permiso. El buceo colectivo solo puede practicarse en 4 puntos concretos.',
        conditions: [
          'Buceo colectivo con escafandra: solo en los 4 puntos fijados en el anexo 3 del Decret 38/2022.',
          'Prohibidas las inmersiones nocturnas para el buceo individual con escafandra.',
          'Las tareas formativas de escuela de buceo requieren notificación previa a la Dirección General de Pesca y Medio Marino.',
        ],
        permit: PERMISO_BUCEO,
        sources: ['boib-decret-38-2022', 'caib-regulacion-ponent'],
      },
    },
  },
];
