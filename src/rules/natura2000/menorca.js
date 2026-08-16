/**
 * Espacios Natura 2000 con ámbito marino de Menorca.
 *
 * Catorce espacios: los doce que el art. 2 del Decret 91/2023 lista para
 * Menorca y las dos ZEPA marinas estatales. El reparto de regímenes es el mismo
 * que en Mallorca —la pesca recreativa se rige por la normativa general y lo
 * que cambia es el fondeo y la navegación—, con dos planes de gestión aprobados
 * que sí regulan el mar:
 *
 *   Costa est de Menorca (Decret 39/2021)   ap. 5.3: fondeo sobre fanerógamas y
 *                                           maërl prohibido, varada por canales
 *                                           señalizados, ningún vertido.
 *   Illa de l'Aire (Decret 17/2022)         ap. 5.6: lo mismo, más un máximo de
 *                                           tres puntos de fondeo ecológico y la
 *                                           prohibición de circuitos de motos
 *                                           náuticas.
 *
 * El área marina Punta Prima - Illa de l'Aire (ES5310073) es el caso que ata
 * las dos capas: el art. 6 del Decreto 26/2019 de la reserva marina obliga a
 * cumplir el plan de gestión de este LIC en la parte de la reserva incluida en
 * él. La reserva remite a Natura 2000 por su propia norma, igual que Tagomago.
 */

import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';
import {
  NORMA_DECRET_91_2023,
  noRegulada,
  pescaSubmarinaRemitida,
  pescaSuperficieRemitida,
} from './comun.js';

const REVISION = '2026-08-15';

const NORMA_PLA_COSTA_EST = {
  titulo:
    'Decret 39/2021, de 2 d’agost, pel qual s’aprova el Pla de Gestió Natura 2000 de la costa est de Menorca',
  fecha: '2021-08-02',
  url: 'https://www.caib.es/eboibfront/pdf/VisPdf?action=VisEdicte&idDocument=1094310&lang=es',
  tipo: 'creacion',
};

const NORMA_PLA_ILLA_AIRE = {
  titulo:
    'Decret 17/2022, de 23 de maig, pel qual s’aprova el Pla de Gestió Natura 2000 Illa de l’Aire',
  fecha: '2022-05-23',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2022/05/23/17/dof/spa/pdf',
  tipo: 'creacion',
};

// Fondeo: los dos planes dicen prácticamente lo mismo, así que el texto se
// comparte y cada uno cita su propio apartado.
const condicionesFondeo = (apartado, extra = []) => [
  `Prohibido con carácter general fondear sobre Posidonia oceanica; si hay praderas próximas, ` +
    `tampoco la cadena ni los demás elementos del fondeo pueden afectarlas (ap. ${apartado}).`,
  'Prohibido igualmente sobre praderas de Cymodocea nodosa y sobre fondos de maërl o coralígeno.',
  'Prohibido fondear en las zonas de baño debidamente balizadas (art. 73.1 del Reglamento General ' +
    'de Costas).',
  'Si la cartografía y lo que se ve en el fondo se contradicen, manda siempre la observación ' +
    'directa sobre el terreno.',
  ...extra,
];

function regimenPlanAprobado({ fuentePlan, apartadoFondeo, extraFondeo = [], navegacion }) {
  const fuentes = ['boib-decret-91-2023', fuentePlan];
  return {
    pescaDesdeCosta: pescaSuperficieRemitida({ sourcesExtra: [fuentePlan] }),
    pescaRecreativaEmbarcacion: pescaSuperficieRemitida({ sourcesExtra: [fuentePlan] }),
    pescaSubmarina: pescaSubmarinaRemitida({
      planEnTramitacion: false,
      sourcesExtra: [fuentePlan],
    }),
    buceo: noRegulada({
      motivo:
        'El plan de gestión permite la práctica del buceo salvo donde lo prohíba o lo condicione la ' +
        'normativa de la reserva marina: no añade por sí mismo ninguna restricción.',
      sources: fuentes,
    }),
    fondeo: {
      status: 'restricted',
      motivo:
        `El apartado ${apartadoFondeo} del plan de gestión prohíbe fondear sobre Posidonia oceanica ` +
        'y extiende la prohibición a la Cymodocea nodosa y a los fondos de maërl o coralígeno.',
      conditions: condicionesFondeo(apartadoFondeo, extraFondeo),
      sources: [fuentePlan, 'boib-decret-25-2018-posidonia', 'boe-rd-876-2014-costas', 'boe-rd-191-2026'],
    },
    navegacion,
  };
}

const NAVEGACION_COSTA_EST = {
  status: 'restricted',
  motivo:
    'El apartado 5.3.2 del Pla de Gestió de la costa est de Menorca obliga a lanzar y varar las ' +
    'embarcaciones por canales señalizados y prohíbe cualquier vertido desde ellas.',
  conditions: [
    'El lanzamiento o la varada de embarcaciones debe hacerse por canales debidamente señalizados.',
    'Prohibido cualquier tipo de vertido desde las embarcaciones.',
    'Se admiten los circuitos y actividades de navegación sin motor cuando no desembarquen en islotes.',
  ],
  sources: ['boib-decret-39-2021-costa-est-menorca'],
};

const NAVEGACION_ILLA_AIRE = {
  status: 'restricted',
  motivo:
    'El apartado 5.6.3 del Pla de Gestió Illa de l’Aire prohíbe los circuitos de motos náuticas y de ' +
    'otras embarcaciones a motor, y el 5.6.2 cualquier vertido desde las embarcaciones. Dentro de la ' +
    'reserva marina rige además el límite de 10 nudos de la Orden 11/2026.',
  conditions: [
    'Prohibidos los circuitos de motos náuticas u otras embarcaciones a motor; se exceptúan las ' +
      'excursiones de contenido naturalístico, que deben pasar una evaluación de repercusiones ' +
      'ambientales.',
    'Se permiten los circuitos y actividades de navegación sin motor.',
    'Prohibido cualquier tipo de vertido desde las embarcaciones.',
  ],
  sources: ['boib-decret-17-2022-illa-aire-n2000'],
};

/** Espacios cuyo plan de gestión sigue en tramitación: solo el Decret 91/2023. */
function regimenSinPlan() {
  return {
    pescaDesdeCosta: pescaSuperficieRemitida(),
    pescaRecreativaEmbarcacion: pescaSuperficieRemitida(),
    pescaSubmarina: pescaSubmarinaRemitida({ planEnTramitacion: true }),
    buceo: noRegulada({
      motivo:
        'El Decret 91/2023 regula la pesca y el marisqueo, no las actividades subacuáticas ' +
        'recreativas. Este espacio no tiene todavía plan de gestión aprobado que pueda añadir nada.',
      sources: ['boib-decret-91-2023'],
    }),
    fondeo: fondeoPorPosidoniaGeneral(),
    navegacion: noRegulada({
      motivo:
        'El Decret 91/2023 no establece límites de navegación, y este espacio no tiene todavía plan ' +
        'de gestión aprobado que pueda establecerlos.',
      sources: ['boib-decret-91-2023'],
    }),
  };
}

const NORMAS_COSTA_EST = [NORMA_DECRET_91_2023, NORMA_PLA_COSTA_EST];
const NORMAS_ILLA_AIRE = [NORMA_DECRET_91_2023, NORMA_PLA_ILLA_AIRE];
const NORMAS_SIN_PLAN = [NORMA_DECRET_91_2023];

const costaEst = (extraFondeo = []) =>
  regimenPlanAprobado({
    fuentePlan: 'boib-decret-39-2021-costa-est-menorca',
    apartadoFondeo: '5.3.1',
    extraFondeo,
    navegacion: NAVEGACION_COSTA_EST,
  });

const ESPACIOS = [
  // -- Pla de Gestió Illa de l'Aire ------------------------------------------
  {
    zoneId: 'n2k-es5310073-area-marina-punta-prima-illa-de-l-aire--zec--autonomica',
    nombreCorto: 'ZEC Àrea marina Punta Prima - Illa de l’Aire (ES5310073)',
    resumen:
      'ZEC marina que se solapa con la Reserva Marina de la Illa de l’Aire. El art. 6 del Decreto ' +
      '26/2019 obliga a cumplir este plan de gestión en la parte coincidente: las dos figuras se ' +
      'acumulan por mandato de la propia norma de la reserva.',
    normas: NORMAS_ILLA_AIRE,
    actividades: regimenPlanAprobado({
      fuentePlan: 'boib-decret-17-2022-illa-aire-n2000',
      apartadoFondeo: '5.6.1',
      extraFondeo: [
        'Prohibido también sobre las matas aisladas de Posidonia oceanica, incluidas las que no tienen ' +
          'hojas vivas pero forman bioestructuras estables; no entran en la prohibición los depósitos ' +
          'de hojarasca sobre arena.',
        'En las zonas de fondeo libre que rodean la isla se pueden instalar hasta tres puntos de ' +
          'fondeo ecológico, a los que las embarcaciones deben amarrarse preferentemente.',
      ],
      navegacion: NAVEGACION_ILLA_AIRE,
    }),
  },

  // -- Pla de Gestió de la costa est de Menorca ------------------------------
  {
    zoneId: 'n2k-es0000233-d-addaia-a-s-albufera--zec-i-zepa--autonomica',
    nombreCorto: 'ZEC i ZEPA D’Addaia a s’Albufera (ES0000233)',
    resumen:
      'Espacio con doble designación en la costa nordeste. Su plan de gestión regula el fondeo y la ' +
      'navegación; la pesca se rige por la normativa general.',
    normas: NORMAS_COSTA_EST,
    actividades: costaEst(),
  },
  {
    zoneId: 'n2k-es0000234-s-albufera-des-grau--zec-i-zepa--autonomica',
    nombreCorto: 'ZEC i ZEPA S’Albufera des Grau (ES0000234)',
    resumen:
      'Espacio con doble designación que se solapa con el ámbito marino del Parc Natural de ' +
      's’Albufera des Grau. Aviso: dentro del parque natural la pesca submarina está prohibida en ' +
      'unas zonas concretas y es autorizable en otras, con una zonificación que este mapa todavía no ' +
      'tiene cargada.',
    normas: NORMAS_COSTA_EST,
    actividades: costaEst(),
  },
  {
    zoneId: 'n2k-es5310070-punta-redona-arenal-d-en-castell--zec--autonomica',
    nombreCorto: 'ZEC Punta Redona - Arenal d’en Castell (ES5310070)',
    resumen: 'ZEC de la costa nordeste, dentro del Pla de Gestió de la costa est de Menorca.',
    normas: NORMAS_COSTA_EST,
    actividades: costaEst(),
  },
  {
    zoneId: 'n2k-es5310071-cala-en-brut--zec--autonomica',
    nombreCorto: 'ZEC Cala en Brut (ES5310071)',
    resumen: 'Pequeña ZEC costera de 39 ha, dentro del Pla de Gestió de la costa est de Menorca.',
    normas: NORMAS_COSTA_EST,
    actividades: costaEst(),
  },
  {
    zoneId: 'n2k-es5310072-caleta-de-binillauti--zec--autonomica',
    nombreCorto: 'ZEC Caleta de Binillautí (ES5310072)',
    resumen: 'ZEC costera de la costa este, dentro del Pla de Gestió de la costa est de Menorca.',
    normas: NORMAS_COSTA_EST,
    actividades: costaEst(),
  },

  // -- Sin plan de gestión aprobado ------------------------------------------
  {
    zoneId: 'n2k-es5310035-area-marina-del-nord-de-menorca--lic--autonomica',
    nombreCorto: 'LIC Àrea marina del nord de Menorca (ES5310035)',
    resumen:
      'El mayor espacio Natura 2000 marino autonómico de Menorca, 5.091 ha frente a la costa norte. ' +
      'Se solapa con la Reserva Marina del Nord de Menorca, y es el régimen de la reserva el que ' +
      'restringe allí la pesca. Plan de gestión en tramitación.',
    normas: NORMAS_SIN_PLAN,
    actividades: regimenSinPlan(),
  },
  {
    zoneId: 'n2k-es5310036-area-marina-del-sud-de-ciutadella--lic--autonomica',
    nombreCorto: 'LIC Àrea marina del sud de Ciutadella (ES5310036)',
    resumen: 'Espacio marino del suroeste de Menorca. Plan de gestión en tramitación.',
    normas: NORMAS_SIN_PLAN,
    actividades: regimenSinPlan(),
  },
  {
    zoneId: 'n2k-es5310068-cap-negre--lic--autonomica',
    nombreCorto: 'LIC Cap Negre (ES5310068)',
    resumen: 'Espacio marítimo-terrestre del norte de Menorca. Plan de gestión en tramitación.',
    normas: NORMAS_SIN_PLAN,
    actividades: regimenSinPlan(),
  },
  {
    zoneId: 'n2k-es5310069-cala-d-algairens--lic--autonomica',
    nombreCorto: 'LIC Cala d’Algairens (ES5310069)',
    resumen: 'Espacio costero del noroeste de Menorca. Plan de gestión en tramitación.',
    normas: NORMAS_SIN_PLAN,
    actividades: regimenSinPlan(),
  },
  {
    zoneId: 'n2k-es5310074-de-cala-llucalari-a-cales-coves--lic--autonomica',
    nombreCorto: 'LIC De cala Llucalari a cales Coves (ES5310074)',
    resumen: 'Franja litoral de la costa sur de Menorca. Plan de gestión en tramitación.',
    normas: NORMAS_SIN_PLAN,
    actividades: regimenSinPlan(),
  },
  {
    zoneId: 'n2k-es5310075-arenal-de-son-saura--lic--autonomica',
    nombreCorto: 'LIC Arenal de Son Saura (ES5310075)',
    resumen: 'Espacio costero del sur de Menorca. Plan de gestión en tramitación.',
    normas: NORMAS_SIN_PLAN,
    actividades: regimenSinPlan(),
  },
];

export default ESPACIOS.map((e) => ({ ...e, ultimaRevision: REVISION }));
