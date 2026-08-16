/**
 * Reserva Marina de la Illa de l'Aire.
 *
 * 719 ha frente al extremo sudoriental de Menorca, de las que 454 son zona
 * especial de buceo. La zona de buceo no es un añadido: es donde el régimen
 * cambia de verdad, porque allí el art. 3.3 del Decreto 26/2019 prohíbe toda
 * pesca salvo una excepción muy concreta —caña desde tierra— y deja fuera la
 * pesca desde embarcación, que en el resto de la reserva sí está permitida.
 *
 * Dos cosas que no están en el decreto de creación y que rigen igualmente:
 *
 *   Orden 11/2026, art. 2   navegación a menos de 10 nudos y motos de agua
 *                           prohibidas. Es la única reserva de Baleares con un
 *                           límite de velocidad general, y por eso la
 *                           navegación aquí no es `not_regulated` como en casi
 *                           todas las demás.
 *   Orden 11/2026, art. 3   buceo colectivo preferentemente en dos puntos
 *                           balizados, con eslora máxima de 12 m.
 *
 * Y una tercera capa que la propia norma invoca: el art. 6 del Decreto 26/2019
 * —igual que hace Tagomago— obliga a cumplir el plan de gestión del LIC Punta
 * Prima - Illa de l'Aire (ES5310073) en la parte de la reserva incluida en él.
 * Ese espacio Natura 2000 todavía no está cargado, así que la condición queda
 * escrita en la ficha de buceo hasta que lo esté.
 */

import { permiso } from '../schema.js';
import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';

const NORMA_CREACION = {
  titulo:
    'Decreto 26/2019, de 12 de abril, por el que se establece la Reserva Marina de la Illa de l’Aire y se regulan en ella las actividades de extracción de flora y fauna marina y las actividades subacuáticas',
  fecha: '2019-04-12',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2019/04/12/26/dof/spa/pdf',
  tipo: 'creacion',
};

const NORMA_ORDEN_11_2026 = {
  titulo:
    'Orden 11/2026, de 5 de junio, por la que se regula la velocidad de las embarcaciones dentro de la Reserva Marina de la Isla del Aire y la práctica del buceo colectivo con escafandra en las reservas marinas de Menorca',
  fecha: '2026-06-05',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/o/2026/06/05/11/dof/spa/pdf',
  tipo: 'modificacion',
};

const NORMA_38_2022 = {
  titulo: 'Decreto 38/2022, de 5 de septiembre, que modifica el Decreto 26/2019',
  fecha: '2022-09-05',
  url: 'https://www.caib.es/eboibfront/pdf/es/2022/117/1118522',
  tipo: 'modificacion',
};

const NORMA_41_2015 = {
  titulo:
    'Decret 41/2015, de 22 de maig, d’activitats d’extracció de flora o fauna marina i activitats subaquàtiques a les reserves marines',
  fecha: '2015-05-22',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2015/05/22/41/dof/spa/pdf',
  tipo: 'general',
};

const NORMAS = [NORMA_CREACION, NORMA_38_2022, NORMA_ORDEN_11_2026, NORMA_41_2015];

const AUTORIZACION_EMBARCACION = permiso({
  importe: 0,
  nota: 'Gratuita. Licencia específica que la Dirección General de Pesca entrega o renueva cada tres años (art. 5.2). Obliga a llevar registro de capturas.',
  vigencia: '3 años',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/3691781',
  ultimaVerificacion: '2026-08-15',
});

const PERMISO_BUCEO = permiso({
  importe: 52.82,
  nota: 'Autorización anual individual, que habilita también la otra reserva marina de Menorca (el Nord de Menorca). Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo del órgano competente. El buceo colectivo se concentra en dos puntos balizados y las embarcaciones amarradas no pueden superar 12 m de eslora.',
  vigencia: '1 año (hay también diaria y quincenal)',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/1139905',
  ultimaVerificacion: '2026-08-16',
});

const SIN_INSTRUMENTOS =
  'Los buceadores, con escafandra o en apnea, no pueden llevar ni en la inmersión ni en la ' +
  'embarcación ningún instrumento utilizable para pescar o extraer especies marinas, salvo el ' +
  'cuchillo de seguridad (art. 9.2 del Decret 41/2015).';

const DESDE_LA_ISLA =
  'Prohibida toda clase de pesca marítima y de marisqueo desde la propia Illa de l’Aire ' +
  '(art. 3.1.c del Decreto 26/2019).';

const MOTIVO_SUBMARINA =
  'El art. 3.1.a del Decreto 26/2019 prohíbe toda clase de pesca marítima y de extracción de flora ' +
  'y fauna marinas, y el 3.2 solo exceptúa las artes menores profesionales, la pesca y el marisqueo ' +
  'recreativos del art. 5 —titulado «Pesca recreativa de superficie»— y el muestreo científico. La ' +
  'modalidad submarina no está entre las excepciones.';

const NAVEGACION = {
  status: 'restricted',
  motivo:
    'El art. 2 de la Orden 11/2026 obliga a navegar a menos de 10 nudos dentro de la reserva y ' +
    'prohíbe el uso de motos de agua. Es una restricción posterior al decreto de creación.',
  conditions: [
    'Velocidad inferior a 10 nudos para buques y embarcaciones, para evitar ruidos y perturbaciones.',
    'Se exceptúan las emergencias relacionadas con la seguridad de la vida humana en la mar y las ' +
      'actuaciones de vigilancia, seguimiento, control, defensa nacional y orden público.',
    'Prohibido el uso de motos de agua dentro de la reserva.',
  ],
  sources: ['boib-orden-11-2026-menorca', 'caib-regulacion-illa-aire'],
};

const RESERVA = 'rm-reserva-marina-de-l-illa-de-l-aire--reserva-marina--autonomica';

export default [
  {
    zoneId: RESERVA,
    nombreCorto: 'Reserva Marina de la Illa de l’Aire',
    resumen:
      'Perímetro general de la reserva, 719 ha frente al sudeste de Menorca. Pesca submarina ' +
      'prohibida y toda pesca prohibida desde la propia isla. Desde embarcación, volantín y curricán ' +
      'solo cinco días a la semana. Navegación limitada a 10 nudos y motos de agua prohibidas.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'Permitida con los aparejos del art. 5 del Decret 41/2015, salvo desde la propia Illa de ' +
          'l’Aire, donde el art. 3.1.c del Decreto 26/2019 prohíbe toda pesca y marisqueo.',
        conditions: [
          'Aparejos permitidos: la caña, con o sin carrete; la potera para cefalópodos, máximo una por ' +
            'persona; el volantín, con un máximo de 6 anzuelos de más de 7 mm; la fisga; el salabre y ' +
            'los aparejos específicos para la captura de puu (baveró, cuerda, bou y estaca).',
          'Se pueden autorizar como aparejos tradicionales el esparavel, la lienza, el morenell y la ' +
            'moixonera.',
          DESDE_LA_ISLA,
          'Dentro de la zona especial de buceo solo se puede pescar con caña, con o sin carrete.',
          'En ningún caso se pueden utilizar peces o cefalópodos vivos como cebo.',
        ],
        sources: ['boib-decreto-26-2019-illa-aire', 'caib-regulacion-illa-aire', 'decret-41-2015'],
      },

      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Es una de las excepciones tasadas del art. 3.2 del Decreto 26/2019, con licencia específica ' +
          'trienal, tres aparejos y días hábiles limitados. No se puede practicar en la zona especial ' +
          'de buceo.',
        conditions: [
          'Aparejos permitidos: el curricán de superficie, con un máximo de dos líneas por ' +
            'embarcación; la potera para cefalópodos, máximo una línea con dos poteras por pescador; ' +
            'la caña o el volantín, máximo una línea por pescador y cuatro anzuelos.',
          'Los anzuelos del volantín deben superar los 7 mm de anchura, salvo para el raor, que deben ' +
            'superar los 5,7 mm.',
          'La pesca con volantín o curricán de superficie solo se puede practicar los martes, jueves, ' +
            'sábados, domingos y festivos nacionales, autonómicos e insulares. Con potera se puede ' +
            'pescar cada día.',
          'Prohibida en la zona especial de buceo.',
          'En ningún caso se pueden utilizar peces o cefalópodos vivos como cebo.',
          'Obligatorio llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
        ],
        permit: AUTORIZACION_EMBARCACION,
        sources: [
          'boib-decreto-26-2019-illa-aire',
          'caib-regulacion-illa-aire',
          'tramite-autorizacion-embarcacion',
        ],
      },

      pescaSubmarina: {
        status: 'prohibited',
        motivo: MOTIVO_SUBMARINA,
        conditions: [SIN_INSTRUMENTOS],
        sources: ['boib-decreto-26-2019-illa-aire', 'decret-41-2015'],
      },

      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El buceo con escafandra autónoma se puede practicar con permiso individual o colectivo, ' +
          'salvo en el interior de las cuevas submarinas de la Illa de l’Aire, que el art. 3.1.d del ' +
          'Decreto 26/2019 prohíbe expresamente.',
        conditions: [
          'Prohibido el buceo recreativo en el interior de las cuevas submarinas de la Illa de l’Aire.',
          'Las inmersiones en apnea son libres en toda la reserva.',
          'El buceo colectivo se hará preferentemente en dos puntos balizados —el islote des Cagaires ' +
            'y el cabo de Llebeig—, con boyas instaladas de abril a octubre y de uso exclusivo de los ' +
            'centros autorizados; la eslora de las embarcaciones amarradas no puede superar los 12 m ' +
            '(arts. 3.1 y 3.3 de la Orden 11/2026).',
          'En la parte de la reserva incluida en el LIC Punta Prima - Illa de l’Aire (ES5310073) hay ' +
            'que cumplir además el marco normativo de su plan de gestión.',
          SIN_INSTRUMENTOS,
        ],
        permit: PERMISO_BUCEO,
        sources: [
          'boib-decreto-26-2019-illa-aire',
          'caib-regulacion-illa-aire',
          'boib-orden-11-2026-menorca',
          'decret-41-2015', 'tramite-autorizacion-buceo'],
      },

      fondeo: fondeoPorPosidoniaGeneral(['boib-decreto-26-2019-illa-aire']),

      navegacion: NAVEGACION,
    },
  },

  {
    zoneId: 'rm-reserva-marina-de-l-illa-de-l-aire--zona-especial-de-busseig--autonomica',
    nombreCorto: 'Illa de l’Aire — zona especial de buceo',
    heredaDe: RESERVA,
    resumen:
      '454 ha alrededor de la isla, la mayor parte de la reserva. Aquí el art. 3.3 del Decreto ' +
      '26/2019 prohíbe toda pesca y extracción salvo una excepción: la caña desde tierra. Desde ' +
      'embarcación no se puede pescar.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'El art. 3.3 del Decreto 26/2019 prohíbe en la zona especial de buceo toda clase de pesca ' +
          'marítima y de extracción, y solo exceptúa la pesca recreativa desde tierra con caña, con o ' +
          'sin carrete, y el muestreo científico autorizado.',
        conditions: [
          'Único aparejo admitido: la caña, con o sin carrete.',
          DESDE_LA_ISLA,
          'En ningún caso se pueden utilizar peces o cefalópodos vivos como cebo.',
        ],
        sources: ['boib-decreto-26-2019-illa-aire', 'caib-regulacion-illa-aire'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'El art. 3.3 del Decreto 26/2019 solo exceptúa de la prohibición la pesca recreativa desde ' +
          'tierra con caña: desde embarcación no se puede pescar en la zona especial de buceo.',
        sources: ['boib-decreto-26-2019-illa-aire', 'caib-regulacion-illa-aire'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'El art. 3.3 del Decreto 26/2019 prohíbe en la zona especial de buceo toda clase de pesca ' +
          'marítima y de extracción, con la única excepción de la caña desde tierra. La modalidad ' +
          'submarina ya estaba además prohibida en el conjunto de la reserva.',
        conditions: [SIN_INSTRUMENTOS],
        sources: ['boib-decreto-26-2019-illa-aire', 'decret-41-2015'],
      },
    },
  },
];
