/**
 * Reserva Marina del Nord de Menorca.
 *
 * Declarada en 1999 y con la evolución normativa más larga de todas: dos
 * modificaciones de la orden fundacional, media docena de resoluciones sobre
 * aparejos y buceo, el Decreto 26/2019 y la Orden 11/2026. Las tres figuras
 * suman 5.083 ha, que es lo que declara el Govern.
 *
 * Aquí está la prohibición más severa que se ha encontrado en toda la
 * cartografía balear sobre la pesca submarina, y no se queda en prohibir la
 * actividad: prohíbe **portar fusiles** a las embarcaciones que solo naveguen
 * por las aguas de la reserva, y también a las personas y vehículos que
 * circulen por el dominio público marítimo-terrestre inmediato. Pasar por allí
 * con el fusil a bordo ya es infracción, aunque no se pesque.
 *
 * LIMITACIÓN DE FUENTES. La Orden de 15 de junio de 1999 no ha podido leerse
 * íntegra: el enlace que el propio Govern publica sirve un extracto del BOCAIB
 * que contiene el anexo de aparejos pero no el articulado. Todo lo que aquí se
 * afirma se apoya en la página oficial de regulación de actividades, en el
 * Decreto 26/2019, en la Resolución de veda de 2024 y en la Orden 11/2026. Si
 * la orden de 1999 añade alguna regla de fondeo propia de las zonas de
 * protección especial, no está recogida: el fondeo se resuelve por la norma
 * estatal general, que ya prohíbe anclar sobre fanerógamas.
 *
 * Las tres zonas NO heredan unas de otras. Las áreas suman —28,19 del perímetro
 * general + 10,15 de protección especial + 12,49 de veda = 50,83 km²— porque el
 * perímetro general las excluye, igual que en el Migjorn y en las Pitiüses.
 */

import { permiso } from '../schema.js';
import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';

const NORMA_CREACION = {
  titulo:
    'Orden del consejero de Agricultura, Comercio e Industria de 15 de junio de 1999, por la que se establece la Reserva Marina del Norte de Menorca y se regulan las actividades a desarrollar',
  fecha: '1999-06-15',
  url: 'https://www.caib.es/sites/reservesmarines/es/normativa_basica_sobre_la_reserva-864/',
  tipo: 'creacion',
};

const NORMA_26_2019 = {
  titulo:
    'Decreto 26/2019, de 12 de abril, que modifica la Orden de 15 de junio de 1999 de la Reserva Marina del Nord de Menorca',
  fecha: '2019-04-12',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2019/04/12/26/dof/spa/pdf',
  tipo: 'modificacion',
};

const NORMA_ORDEN_11_2026 = {
  titulo:
    'Orden 11/2026, de 5 de junio, por la que se regula la práctica del buceo colectivo con escafandra en las reservas marinas de Menorca',
  fecha: '2026-06-05',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/o/2026/06/05/11/dof/spa/pdf',
  tipo: 'modificacion',
};

const NORMA_41_2015 = {
  titulo:
    'Decret 41/2015, de 22 de maig, d’activitats d’extracció de flora o fauna marina i activitats subaquàtiques a les reserves marines',
  fecha: '2015-05-22',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2015/05/22/41/dof/spa/pdf',
  tipo: 'general',
};

const NORMA_VEDA = {
  titulo:
    'Resolución del director general de Pesca de 16 de febrero de 2024, por la que se establece una zona de veda para la pesca recreativa en la Reserva Marina del Norte de Menorca',
  fecha: '2024-02-16',
  url: 'https://www.caib.es/eboibfront/pdf/es/2024/25/1155873',
  tipo: 'creacion',
};

const NORMAS = [NORMA_CREACION, NORMA_26_2019, NORMA_ORDEN_11_2026, NORMA_41_2015];

const AUTORIZACION_EMBARCACION = permiso({
  importe: 0,
  nota: 'Gratuita. Exige licencia de pesca recreativa en vigor y llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
  vigencia: '3 años',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/3691781',
  ultimaVerificacion: '2026-08-15',
});

const PERMISO_BUCEO = permiso({
  importe: 52.82,
  nota: 'Autorización anual individual, que habilita también la otra reserva marina de Menorca (l’Illa de l’Aire). Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo del órgano competente. En el cabo de Cavalleria las inmersiones están contingentadas por sectores.',
  vigencia: '1 año (hay también diaria y quincenal)',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/1139905',
  ultimaVerificacion: '2026-08-16',
});

const SIN_INSTRUMENTOS =
  'Los buceadores, con escafandra o en apnea, no pueden llevar ni en la inmersión ni en la ' +
  'embarcación ningún instrumento utilizable para pescar o extraer especies marinas, salvo el ' +
  'cuchillo de seguridad.';

// Se repite en las tres zonas porque la prohibición de portar fusiles no
// distingue entre ellas: alcanza a toda la reserva y a la franja de costa.
const FUSILES =
  'Está expresamente prohibido que las embarcaciones que naveguen por las aguas de la reserva, y ' +
  'las personas y vehículos que circulen por el dominio público marítimo-terrestre inmediato, ' +
  'porten fusiles de pesca submarina. Llevarlo a bordo ya es infracción, aunque no se pesque.';

const MOTIVO_SUBMARINA =
  'La regulación de la reserva prohíbe la pesca submarina en todo su ámbito, y va más lejos que ' +
  'la mera prohibición de la actividad: también prohíbe portar fusiles de pesca submarina a quien ' +
  'solo navegue por sus aguas o circule por la franja de costa inmediata.';

export default [
  {
    zoneId: 'rm-reserva-marina-del-nord-de-menorca--reserva-marina--autonomica',
    nombreCorto: 'Reserva Marina del Nord de Menorca',
    resumen:
      'Perímetro general de la reserva, entre la Punta des Morter, la Illa des Porros y el Cap Gros. ' +
      'Pesca submarina prohibida —y prohibido incluso llevar el fusil a bordo—. La pesca recreativa ' +
      'solo se puede practicar martes, jueves, sábados, domingos y festivos.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'Permitida solo cinco días a la semana y con aparejos tasados, y en ningún caso dentro de ' +
          'las zonas de protección especial ni de la zona de veda.',
        conditions: [
          'Días hábiles: martes, jueves, sábados, domingos y festivos nacionales, autonómicos e ' +
            'insulares.',
          'Aparejos permitidos: volantín y caña (un solo aparejo por pescador) con un máximo de 6 ' +
            'anzuelos desde tierra; la potera; la fisga, solo de día; el salabre; el curricán de ' +
            'superficie y de fondo.',
          'El esparavel requiere autorización especial del Consell Insular.',
          'Se puede mariscar puu con una cuerda y dos bous por recolector.',
          'Anzuelo de un mínimo de 7 mm de anchura interior (seno) en todas las modalidades, salvo ' +
            'para el raor.',
          'No permitida en las zonas de protección especial ni en la zona de veda de pesca recreativa.',
          'Las competiciones de pesca no están permitidas.',
          FUSILES,
        ],
        sources: ['caib-regulacion-nord-menorca', 'caib-normativa-nord-menorca'],
      },

      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida los mismos cinco días que desde tierra, con autorización trienal específica y ' +
          'obligación de registrar las capturas.',
        conditions: [
          'Días hábiles: martes, jueves, sábados, domingos y festivos nacionales, autonómicos e ' +
            'insulares.',
          'Máximo de 4 anzuelos desde embarcación, con un solo aparejo por pescador.',
          'Aparejos permitidos: volantín y caña, potera, fisga (solo de día), salabre y curricán de ' +
            'superficie y de fondo.',
          'Anzuelo de un mínimo de 7 mm de anchura interior (seno), salvo para el raor.',
          'No permitida en las zonas de protección especial ni en la zona de veda de pesca recreativa.',
          'Las competiciones de pesca no están permitidas.',
          'Obligatorio llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
          FUSILES,
        ],
        permit: AUTORIZACION_EMBARCACION,
        sources: [
          'caib-regulacion-nord-menorca',
          'caib-normativa-nord-menorca',
          'tramite-autorizacion-embarcacion',
        ],
      },

      pescaSubmarina: {
        status: 'prohibited',
        motivo: MOTIVO_SUBMARINA,
        conditions: [FUSILES, SIN_INSTRUMENTOS],
        sources: ['caib-regulacion-nord-menorca', 'decret-41-2015'],
      },

      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El buceo con escafandra requiere permiso individual o colectivo del órgano competente. Hay ' +
          'dos zonas aptas, y en el cabo de Cavalleria las inmersiones están contingentadas.',
        conditions: [
          'Zona del cabo de Cavalleria: dividida en cinco sectores con un máximo de 50 inmersiones ' +
            'diarias en cada uno, salvo el sector 4b de sa Nitja, donde el máximo es de 2 inmersiones ' +
            'diarias y hace falta autorización previa del órgano gestor.',
          'Resto de la reserva, excepto las zonas de protección especial: inmersiones libres y sin ' +
            'límite diario.',
          'Prohibidas las inmersiones en el interior de cuevas submarinas.',
          'Prohibida la manipulación o alimentación de las especies.',
          'Las inmersiones en apnea son libres en toda la reserva.',
          'El buceo colectivo se hará preferentemente en seis puntos balizados —dos en la Isla des ' +
            'Porros, dos en la Losa del Patró Pere y dos en el islote de cala Tirant—, con boyas ' +
            'instaladas de abril a octubre y de uso exclusivo de los centros autorizados; la eslora ' +
            'de las embarcaciones amarradas no puede superar los 12 m (arts. 4.1 y 4.3 de la Orden ' +
            '11/2026).',
          SIN_INSTRUMENTOS,
        ],
        permit: PERMISO_BUCEO,
        sources: [
          'caib-regulacion-nord-menorca',
          'boib-orden-11-2026-menorca',
          'decret-41-2015', 'tramite-autorizacion-buceo'],
      },

      fondeo: fondeoPorPosidoniaGeneral(['caib-normativa-nord-menorca']),

      navegacion: {
        status: 'not_regulated',
        motivo:
          'La Orden 11/2026 limita la velocidad y prohíbe las motos de agua, pero su art. 2 lo hace ' +
          'solo dentro de la Reserva Marina de la Isla del Aire. Para el Nord de Menorca esa orden ' +
          'únicamente regula el buceo colectivo, y la regulación de actividades de la reserva no ' +
          'establece límites de navegación.',
        sources: ['boib-orden-11-2026-menorca', 'caib-regulacion-nord-menorca'],
      },
    },
  },

  {
    zoneId: 'rm-reserva-marina-del-nord-de-menorca--zona-de-proteccio-especial--autonomica',
    nombreCorto: 'Nord de Menorca — zonas de protección especial',
    resumen:
      'Una sola figura jurídica con dos áreas separadas —Cala Barril-Pla de Mar y la bahía de ' +
      'Fornells—, unas 1.015 ha en total. Ni pesca recreativa en ninguna modalidad, ni buceo con ' +
      'escafandra.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'La pesca recreativa se puede practicar en la reserva «excepto en las zonas de protección ' +
          'especial y en la de veda para la pesca recreativa».',
        conditions: [FUSILES],
        sources: ['caib-regulacion-nord-menorca'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'La pesca recreativa se puede practicar en la reserva «excepto en las zonas de protección ' +
          'especial y en la de veda para la pesca recreativa».',
        conditions: [FUSILES],
        sources: ['caib-regulacion-nord-menorca'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo: MOTIVO_SUBMARINA,
        conditions: [FUSILES, SIN_INSTRUMENTOS],
        sources: ['caib-regulacion-nord-menorca', 'decret-41-2015'],
      },
      buceo: {
        status: 'prohibited',
        motivo:
          'Las inmersiones son libres en el resto de la reserva «excepto en las zonas de protección ' +
          'especial»: el buceo con escafandra no está admitido aquí.',
        sources: ['caib-regulacion-nord-menorca'],
      },
      fondeo: fondeoPorPosidoniaGeneral(['caib-normativa-nord-menorca']),
      navegacion: {
        status: 'not_regulated',
        motivo:
          'La regulación de la reserva restringe en estas zonas la pesca, la extracción y el buceo, ' +
          'pero no la navegación de paso.',
        sources: ['caib-regulacion-nord-menorca'],
      },
    },
  },

  {
    zoneId: 'rm-reserva-marina-del-nord-de-menorca--zona-de-veda-de-pesca-recreativa--autonomica',
    nombreCorto: 'Nord de Menorca — zona de veda del Cap Gros a ses Penyes Blanques',
    resumen:
      'Zona vedada a la pesca recreativa desde tierra y desde embarcación, unas 1.249 ha. Se ' +
      'estableció por primera vez en 2009 y se prorroga cada tres años; la resolución vigente es de ' +
      '16 de febrero de 2024. No afecta al buceo.',
    normas: [NORMA_CREACION, NORMA_VEDA, NORMA_26_2019, NORMA_ORDEN_11_2026, NORMA_41_2015],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'La Resolución de 16 de febrero de 2024 mantiene aquí la zona de veda para la pesca ' +
          'recreativa desde embarcación y desde tierra, al amparo del art. 4.2 de la Orden de 15 de ' +
          'junio de 1999.',
        conditions: [
          'La veda es trienal y se renueva: la zona puede cambiar de sitio en la siguiente resolución.',
          FUSILES,
        ],
        sources: ['boib-resolucion-2024-nord-menorca-veda', 'caib-regulacion-nord-menorca'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'La Resolución de 16 de febrero de 2024 mantiene aquí la zona de veda para la pesca ' +
          'recreativa desde embarcación y desde tierra, al amparo del art. 4.2 de la Orden de 15 de ' +
          'junio de 1999.',
        conditions: [
          'La veda es trienal y se renueva: la zona puede cambiar de sitio en la siguiente resolución.',
          FUSILES,
        ],
        sources: ['boib-resolucion-2024-nord-menorca-veda', 'caib-regulacion-nord-menorca'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo: MOTIVO_SUBMARINA,
        conditions: [FUSILES, SIN_INSTRUMENTOS],
        sources: ['caib-regulacion-nord-menorca', 'decret-41-2015'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'La veda regula únicamente la pesca recreativa; no restringe el buceo. Esta zona no es una ' +
          'zona de protección especial, así que rige el régimen general de la reserva: permiso ' +
          'individual o colectivo e inmersiones libres.',
        conditions: [
          'Las inmersiones en apnea son libres.',
          'Prohibidas las inmersiones en el interior de cuevas submarinas.',
          SIN_INSTRUMENTOS,
        ],
        permit: PERMISO_BUCEO,
        sources: [
          'caib-regulacion-nord-menorca',
          'boib-resolucion-2024-nord-menorca-veda',
          'decret-41-2015', 'tramite-autorizacion-buceo'],
      },
      fondeo: fondeoPorPosidoniaGeneral(['caib-normativa-nord-menorca']),
      navegacion: {
        status: 'not_regulated',
        motivo:
          'La resolución que crea esta zona de veda regula únicamente la pesca recreativa; no menciona ' +
          'la navegación.',
        sources: ['boib-resolucion-2024-nord-menorca-veda'],
      },
    },
  },
];
