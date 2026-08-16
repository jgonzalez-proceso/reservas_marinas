/**
 * Espacios Natura 2000 con ámbito marino de gestión autonómica en Mallorca.
 *
 * Tres regímenes, según qué plan de gestión les alcance. La pesca se resuelve
 * igual en los tres —los arts. 4 y 5 del Decret 91/2023 remiten a la normativa
 * general— y lo que cambia es el fondeo y la navegación, que sí regulan algunos
 * planes:
 *
 *   Serra de Tramuntana (Decret 49/2015)  buceo permitido con condiciones y
 *                                         fondeo libre condicionado.
 *   Costa de Llevant (Decret 17/2023)     fondeo y navegación con normas
 *                                         propias y detalladas.
 *   Sin plan aprobado                     solo el Decret 91/2023; el fondeo lo
 *                                         cubre la norma estatal general.
 *
 * Las fichas se generan a partir de una tabla en vez de escribirse una a una.
 * Son literalmente la misma norma aplicada a espacios distintos: repetir el
 * texto veintiuna veces solo serviría para que dentro de un año unas cuantas
 * copias dijeran cosas distintas.
 */

import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';
import {
  NORMA_DECRET_91_2023,
  NORMA_PLA_COSTA_LLEVANT,
  NORMA_PLA_TRAMUNTANA,
  noRegulada,
  pescaSubmarinaRemitida,
  pescaSuperficieRemitida,
} from './comun.js';

// ---------------------------------------------------------------------------
// Serra de Tramuntana — Decret 49/2015
// ---------------------------------------------------------------------------

// El plan prohíbe capturar dos especies concretas en todo su ámbito marino
// (norma 4.1). Es una condición de la pesca, no un régimen distinto.
const ESPECIES_VEDADAS_TRAMUNTANA =
  'En el ámbito marino de este plan está prohibida la captura o recolección de Pinna nobilis y de ' +
  'Lithophaga lithophaga (norma 4.1). La captura de cigarra de mar (Scyllarides latus) requiere ' +
  'autorización (norma 3.5).';

function regimenTramuntana() {
  return {
    pescaDesdeCosta: pescaSuperficieRemitida({
      condicionesExtra: [ESPECIES_VEDADAS_TRAMUNTANA],
      sourcesExtra: ['boib-decret-49-2015-tramuntana'],
    }),
    pescaRecreativaEmbarcacion: pescaSuperficieRemitida({
      condicionesExtra: [ESPECIES_VEDADAS_TRAMUNTANA],
      sourcesExtra: ['boib-decret-49-2015-tramuntana'],
    }),
    pescaSubmarina: pescaSubmarinaRemitida({
      planEnTramitacion: false,
      condicionesExtra: [ESPECIES_VEDADAS_TRAMUNTANA],
      sourcesExtra: ['boib-decret-49-2015-tramuntana'],
    }),
    buceo: {
      status: 'allowed',
      motivo:
        'La norma 3.9 del Pla de Gestió de la Serra de Tramuntana permite expresamente el buceo ' +
        'recreativo y deportivo en el ámbito marino del plan.',
      conditions: [
        'Los buceadores no pueden llevar, ni en la mano ni en la embarcación, instrumentos que ' +
          'puedan utilizarse para pescar o extraer especies marinas; se exceptúa el cuchillo de ' +
          'buceo por ser elemento de seguridad.',
        'Prohibida la alimentación o «feeding» de las especies marinas (norma 3.10).',
      ],
      sources: ['boib-decret-49-2015-tramuntana'],
    },
    fondeo: {
      status: 'restricted',
      motivo:
        'La norma 3.12 del plan declara todo su ámbito «área de fondeo libre condicionado»: se ' +
        'puede fondear, pero el patrón debe procurar hacerlo sobre fondo arenoso y evitar fijar el ' +
        'ancla sobre praderas de Posidonia oceanica o fondos de maërl. El Real Decreto 191/2026 ' +
        'convierte esa cautela en prohibición expresa en todo el Mediterráneo español.',
      conditions: [
        'Fondeo libre condicionado: sobre fondo arenoso, evitando praderas de Posidonia oceanica y ' +
          'fondos de maërl.',
        'Prohibido fondear sobre praderas de Posidonia oceanica y de Cymodocea nodosa, incluido el ' +
          'caso de anclar en arena si la cadena o el ancla alcanzan la pradera (RD 191/2026).',
      ],
      sources: ['boib-decret-49-2015-tramuntana', 'boe-rd-191-2026'],
    },
    navegacion: noRegulada({
      motivo:
        'Ni el Decret 91/2023 ni el Pla de Gestió de la Serra de Tramuntana establecen límites de ' +
        'navegación en el ámbito marino de estos espacios.',
      sources: ['boib-decret-49-2015-tramuntana', 'boib-decret-91-2023'],
    }),
  };
}

// ---------------------------------------------------------------------------
// Costa de Llevant — Decret 17/2023
// ---------------------------------------------------------------------------
//
// Es el único plan de gestión de Mallorca que regula el mar con detalle. Su
// apartado 5.8.1 remite expresamente la pesca —«en sus modalidades profesional,
// recreativa y submarina»— a la dirección general competente en materia de
// pesca, de modo que tampoco aquí la figura Natura 2000 añade prohibición
// pesquera; pero sus apartados 5.8.4 y 5.8.5 sí imponen fondeo y navegación
// propios, y son restricciones reales.

const REMISION_PESCA_LLEVANT =
  'El apartado 5.8.1 del Pla de Gestió Costa de Llevant remite la pesca, también en su modalidad ' +
  'submarina, a la regulación que dicte la dirección general competente en materia de pesca: el ' +
  'plan no establece por sí mismo restricciones pesqueras.';

const CONDICIONES_FONDEO_LLEVANT = [
  'Prohibido fondear sobre Posidonia oceanica. Si hay praderas próximas, tampoco la cadena ni los ' +
    'demás elementos del anclaje pueden afectarlas.',
  'Prohibido igualmente el anclaje sobre praderas de Cymodocea nodosa y Zostera noltii y sobre ' +
    'fondos de maërl o coralígeno.',
  'Prohibido anclar en las zonas de baño debidamente balizadas (art. 73.1 del Reglamento General ' +
    'de Costas).',
  'En lo no regulado por el plan rige el Decret 25/2018 de conservación de la Posidonia oceanica.',
];

const CONDICIONES_NAVEGACION_LLEVANT = [
  'Prohibida la navegación deportiva y de recreo dentro de las zonas de baño debidamente balizadas.',
  'Donde no hay balizamiento, la zona de baño se entiende como una franja contigua a la costa de ' +
    '200 m de ancho en las playas y 50 m en el resto del litoral; dentro de ella no se puede ' +
    'navegar a más de 3 nudos.',
  'Prohibido cualquier tipo de vertido desde las embarcaciones.',
  'Ante cetáceos, tortugas o aves marinas hay que mantener una distancia mínima de 60 m, sin ' +
    'bocinas, altavoces ni aceleraciones bruscas.',
];

function regimenCostaLlevant({ enArticulo2, extraFondeo = [], extraNavegacion = [] }) {
  // Los espacios que no están en el art. 2 del Decret 91/2023 quedan fuera de
  // su régimen de pesca; para ellos la remisión la hace únicamente el plan.
  const pesca = enArticulo2
    ? {
        pescaDesdeCosta: pescaSuperficieRemitida({
          condicionesExtra: [REMISION_PESCA_LLEVANT],
          sourcesExtra: ['boib-decret-17-2023-costa-llevant'],
        }),
        pescaRecreativaEmbarcacion: pescaSuperficieRemitida({
          condicionesExtra: [REMISION_PESCA_LLEVANT],
          sourcesExtra: ['boib-decret-17-2023-costa-llevant'],
        }),
        pescaSubmarina: pescaSubmarinaRemitida({
          planEnTramitacion: false,
          condicionesExtra: [REMISION_PESCA_LLEVANT],
          sourcesExtra: ['boib-decret-17-2023-costa-llevant'],
        }),
      }
    : (() => {
        const soloPlan = (actividad) => ({
          status: 'not_regulated',
          motivo:
            `Este espacio no figura en el art. 2 del Decret 91/2023, así que su régimen de pesca no ` +
            `le alcanza. El plan de gestión que sí lo cubre remite la pesca (${actividad}) a la ` +
            `dirección general competente en materia de pesca, sin establecer restricciones propias.`,
          conditions: [
            REMISION_PESCA_LLEVANT,
            'Rige la normativa general de pesca recreativa de las Illes Balears.',
          ],
          sources: ['boib-decret-17-2023-costa-llevant'],
        });
        return {
          pescaDesdeCosta: soloPlan('desde costa'),
          pescaRecreativaEmbarcacion: soloPlan('desde embarcación'),
          pescaSubmarina: soloPlan('submarina'),
        };
      })();

  return {
    ...pesca,
    buceo: noRegulada({
      motivo:
        'El apartado 5.8 del Pla de Gestió Costa de Llevant regula pesca, fondeo, navegación, ' +
        'acuicultura y fiestas en embarcaciones, pero no el buceo recreativo.',
      sources: ['boib-decret-17-2023-costa-llevant'],
    }),
    fondeo: {
      status: 'restricted',
      motivo:
        'El apartado 5.8.4 del Pla de Gestió Costa de Llevant prohíbe fondear sobre Posidonia ' +
        'oceanica —y que la cadena la alcance— y extiende la prohibición a Cymodocea nodosa, ' +
        'Zostera noltii y fondos de maërl o coralígeno.',
      conditions: [...CONDICIONES_FONDEO_LLEVANT, ...extraFondeo],
      sources: [
        'boib-decret-17-2023-costa-llevant',
        'boib-decret-25-2018-posidonia',
        'boe-rd-876-2014-costas',
        'boe-rd-191-2026',
      ],
    },
    navegacion: {
      status: 'restricted',
      motivo:
        'El apartado 5.8.5 del Pla de Gestió Costa de Llevant prohíbe la navegación deportiva y de ' +
        'recreo en las zonas de baño balizadas y limita la velocidad a 3 nudos en la franja ' +
        'contigua a la costa.',
      conditions: [...CONDICIONES_NAVEGACION_LLEVANT, ...extraNavegacion],
      sources: ['boib-decret-17-2023-costa-llevant', 'boe-rd-876-2014-costas'],
    },
  };
}

// ---------------------------------------------------------------------------
// Espacios sin plan de gestión aprobado
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Tabla de espacios
// ---------------------------------------------------------------------------

const REVISION = '2026-08-15';

const NORMAS_TRAMUNTANA = [NORMA_DECRET_91_2023, NORMA_PLA_TRAMUNTANA];
const NORMAS_LLEVANT_ART2 = [NORMA_DECRET_91_2023, NORMA_PLA_COSTA_LLEVANT];
const NORMAS_LLEVANT_SOLO_PLAN = [NORMA_PLA_COSTA_LLEVANT];
const NORMAS_SIN_PLAN = [NORMA_DECRET_91_2023];

const ESPACIOS = [
  // -- Serra de Tramuntana ---------------------------------------------------
  {
    zoneId: 'n2k-es5310094-cala-figuera--zec--autonomica',
    nombreCorto: 'ZEC Cala Figuera (ES5310094)',
    resumen:
      'Espacio Natura 2000 con ámbito marino en la Serra de Tramuntana. La pesca recreativa, ' +
      'incluida la submarina, se rige por la normativa general: la figura no la prohíbe. El fondeo ' +
      'sí está condicionado por el plan de gestión.',
    normas: NORMAS_TRAMUNTANA,
    actividades: regimenTramuntana(),
  },
  {
    zoneId: 'n2k-es5310077-es-rajoli--zec--autonomica',
    nombreCorto: 'ZEC Es Rajolí (ES5310077)',
    resumen:
      'ZEC estrictamente marina frente a la costa de Tramuntana. Pesca recreativa según la ' +
      'normativa general; buceo permitido y fondeo condicionado por el Pla de Gestió.',
    normas: NORMAS_TRAMUNTANA,
    actividades: regimenTramuntana(),
  },
  {
    zoneId: 'n2k-es5310081-port-des-canonge--zec--autonomica',
    nombreCorto: 'ZEC Port des Canonge (ES5310081)',
    resumen:
      'Espacio marítimo-terrestre de la Serra de Tramuntana. Pesca recreativa según la normativa ' +
      'general; buceo permitido y fondeo condicionado por el Pla de Gestió.',
    normas: NORMAS_TRAMUNTANA,
    actividades: regimenTramuntana(),
  },
  {
    zoneId: 'n2k-es5310082-s-estaca-punta-de-deia--zec--autonomica',
    nombreCorto: "ZEC S'Estaca - Punta de Deià (ES5310082)",
    resumen:
      'Espacio marítimo-terrestre entre Valldemossa y Deià, con extensas praderas de Posidonia ' +
      'oceanica bien conservadas. Pesca recreativa según la normativa general; fondeo condicionado.',
    normas: NORMAS_TRAMUNTANA,
    actividades: regimenTramuntana(),
  },

  // -- Costa de Llevant, dentro del art. 2 del Decret 91/2023 ----------------
  {
    zoneId: 'n2k-es5310097-area-marina-costa-de-llevant--zec--autonomica',
    nombreCorto: 'ZEC Àrea marina Costa de Llevant (ES5310097)',
    resumen:
      'ZEC estrictamente marina de la costa de llevant. La pesca se rige por la normativa general; ' +
      'el fondeo y la navegación tienen normas propias en el plan de gestión.',
    normas: NORMAS_LLEVANT_ART2,
    actividades: regimenCostaLlevant({ enArticulo2: true }),
  },
  {
    zoneId: 'n2k-es5310030-costa-de-llevant--zec--autonomica',
    nombreCorto: 'ZEC Costa de Llevant (ES5310030)',
    resumen:
      'Franja litoral de la costa de llevant de Mallorca. La pesca se rige por la normativa ' +
      'general; el fondeo y la navegación tienen normas propias en el plan de gestión.',
    normas: NORMAS_LLEVANT_ART2,
    actividades: regimenCostaLlevant({ enArticulo2: true }),
  },
  {
    zoneId: 'n2k-es5310096-punta-de-n-amer--zec--autonomica',
    nombreCorto: "ZEC Punta de n'Amer (ES5310096)",
    resumen:
      'Espacio marítimo-terrestre de la costa de llevant. La pesca se rige por la normativa ' +
      'general; el fondeo y la navegación, por el plan de gestión.',
    normas: NORMAS_LLEVANT_ART2,
    actividades: regimenCostaLlevant({ enArticulo2: true }),
  },
  {
    zoneId: 'n2k-es5310099-portocolom--zec--autonomica',
    nombreCorto: 'ZEC Portocolom (ES5310099)',
    resumen:
      'Bahía de Portocolom, con la pradera de posidonia catalogada como «regular». Es el espacio ' +
      'con más restricciones náuticas del plan: 3 nudos en toda la bahía, motos acuáticas ' +
      'prohibidas y ningún campo de fondeo nuevo.',
    normas: NORMAS_LLEVANT_ART2,
    actividades: regimenCostaLlevant({
      enArticulo2: true,
      extraFondeo: [
        'Prohibida la instalación de nuevos campos de fondeo y de otros elementos náuticos que ' +
          'supongan un aumento de embarcaciones motorizadas, hasta que se disponga del estudio de ' +
          'capacidad de carga previsto en el plan.',
        'Como zona de refugio con mal tiempo se priorizan las boyas libres de los campos ' +
          'existentes; si no las hay, el fondeo sobre fondo arenoso, como el que hay entre es Babo ' +
          'y s’Arenal.',
      ],
      extraNavegacion: [
        'En toda la bahía hay que navegar a 3 nudos o menos, o a la mínima velocidad de gobierno, ' +
          'con el motor a ralentí, para no remover el sedimento.',
        'Prohibido el uso de motos acuáticas, salvo las de los organismos de vigilancia y control.',
      ],
    }),
  },

  // -- Costa de Llevant, fuera del art. 2 ------------------------------------
  //
  // No están en la lista del Decret 91/2023, así que su régimen de pesca no les
  // alcanza; entran porque el apartado 5.8 del plan se aplica «en el ámbito
  // marino del plan de gestión», que los comprende.
  {
    zoneId: 'n2k-es5310098-cales-de-manacor--zec--autonomica',
    nombreCorto: 'ZEC Cales de Manacor (ES5310098)',
    resumen:
      'Litoral de cales entre Manacor y Felanitx. No figura en el art. 2 del Decret 91/2023, pero ' +
      'sí en el ámbito del Pla de Gestió Costa de Llevant, cuyas normas de fondeo y navegación se ' +
      'le aplican.',
    normas: NORMAS_LLEVANT_SOLO_PLAN,
    actividades: regimenCostaLlevant({ enArticulo2: false }),
  },
  {
    zoneId: 'n2k-es5310100-punta-de-ras--zec--autonomica',
    nombreCorto: 'ZEC Punta de Ras (ES5310100)',
    resumen:
      'Pequeña ZEC costera de 13 ha en la costa de llevant. No figura en el art. 2 del Decret ' +
      '91/2023, pero sí en el ámbito del Pla de Gestió Costa de Llevant.',
    normas: NORMAS_LLEVANT_SOLO_PLAN,
    actividades: regimenCostaLlevant({ enArticulo2: false }),
  },
  {
    zoneId: 'n2k-es0000080-cap-vermell--zec-i-zepa--autonomica',
    nombreCorto: 'ZEC i ZEPA Cap Vermell (ES0000080)',
    resumen:
      'Espacio costero junto a Cala Rajada, con doble designación. No figura en el art. 2 del ' +
      'Decret 91/2023, pero sí en el ámbito del Pla de Gestió Costa de Llevant.',
    normas: NORMAS_LLEVANT_SOLO_PLAN,
    actividades: regimenCostaLlevant({ enArticulo2: false }),
  },

  // -- Sin plan de gestión aprobado ------------------------------------------
  {
    zoneId: 'n2k-es5310005-badies-de-pollenca-i-alcudia--lic--autonomica',
    nombreCorto: 'LIC Badies de Pollença i Alcúdia (ES5310005)',
    resumen:
      'El mayor espacio Natura 2000 marino autonómico de Mallorca: 30.961 ha sobre las dos bahías ' +
      'del norte. Su plan de gestión está en tramitación, así que solo le aplica el Decret 91/2023, ' +
      'que remite la pesca recreativa a la normativa general.',
    normas: NORMAS_SIN_PLAN,
    actividades: regimenSinPlan(),
  },
  {
    zoneId: 'n2k-es5310103-area-marina-cap-de-cala-figuera--lic--autonomica',
    nombreCorto: 'LIC Àrea marina cap de cala Figuera (ES5310103)',
    resumen:
      'Pequeño espacio marino junto al cabo de Cala Figuera, en la parte exterior de la bahía de ' +
      'Palma. Plan de gestión en tramitación.',
    normas: NORMAS_SIN_PLAN,
    actividades: regimenSinPlan(),
  },
  {
    zoneId: 'n2k-es0000081-cap-enderrocat-i-cap-blanc--zepa--autonomica',
    nombreCorto: 'ZEPA Cap Enderrocat - Cap Blanc (ES0000081)',
    resumen:
      'ZEPA de 11.645 ha entre cap Enderrocat y cap Blanc. Comparte nombre con el LIC ES5310128 ' +
      'pero es otro espacio, con otro perímetro. Plan de gestión en tramitación.',
    normas: NORMAS_SIN_PLAN,
    actividades: regimenSinPlan(),
  },
  {
    zoneId: 'n2k-es5310128-cap-enderrocat-i-cap-blanc--lic--autonomica',
    nombreCorto: 'LIC Cap Enderrocat i cap Blanc (ES5310128)',
    resumen:
      'LIC de 7.123 ha entre cap Enderrocat y cap Blanc. Comparte nombre con la ZEPA ES0000081 ' +
      'pero es otro espacio, con otro perímetro. Plan de gestión en tramitación.',
    normas: NORMAS_SIN_PLAN,
    actividades: regimenSinPlan(),
  },
  {
    zoneId: 'n2k-es0000221-sa-dragonera--lic-i-zepa--autonomica',
    nombreCorto: 'LIC i ZEPA Sa Dragonera (ES0000221)',
    resumen:
      'Espacio Natura 2000 de sa Dragonera, con doble designación. Se solapa con la reserva marina ' +
      'del Freu de sa Dragonera y con el parque natural: allí manda el régimen de esas figuras, no ' +
      'la remisión a la normativa general de los arts. 4 y 5 del Decret 91/2023.',
    normas: NORMAS_SIN_PLAN,
    actividades: regimenSinPlan(),
  },
  {
    zoneId: 'n2k-es0000227-muntanyes-d-arta--lic-i-zepa--autonomica',
    nombreCorto: "LIC i ZEPA Muntanyes d'Artà (ES0000227)",
    resumen:
      'Espacio de 14.813 ha en el nordeste de Mallorca, con doble designación y una franja marina. ' +
      'Se solapa con figuras del llevant, donde manda el régimen de esas figuras. Plan de gestión ' +
      'en tramitación.',
    normas: NORMAS_SIN_PLAN,
    actividades: regimenSinPlan(),
  },
];

export default ESPACIOS.map((e) => ({ ...e, ultimaRevision: REVISION }));
