/**
 * Reserva Marina de la costa nord-est d'Eivissa-Tagomago.
 *
 * Es el mejor ejemplo de por qué este motor apila figuras en vez de fusionarlas
 * en una tabla: el art. 6.2 del propio Decreto 45/2018 dice que para bucear en
 * las partes de la reserva incluidas en los LIC del norte de Sant Joan, de
 * Tagomago, del área marina de Tagomago, de los islotes de Santa Eulària y en
 * la ZEPA del levante de Eivissa «se debe cumplir el marco normativo previsto
 * en los planes de gestión de los LIC». La reserva marina remite expresamente a
 * Natura 2000: las dos capas se acumulan sobre la misma coordenada, y la norma
 * lo dice ella misma.
 *
 * Esos espacios Natura 2000 todavía no están cargados: la lista blanca de
 * `src/data/natura2000-marino.js` cubre por ahora Mallorca. Hasta que lo estén,
 * la condición se hace constar por escrito en la ficha de buceo.
 */

import { permiso } from '../schema.js';
import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';

const NORMA_CREACION = {
  titulo:
    'Decreto 45/2018, de 14 de diciembre, por el que se establece la Reserva Marina de la costa noreste de Ibiza-Tagomago y se regulan las actividades de extracción de flora y fauna marina y las actividades subacuáticas',
  fecha: '2018-12-14',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2018/12/14/45/dof/spa/pdf',
  tipo: 'creacion',
};

const NORMA_41_2015 = {
  titulo:
    'Decret 41/2015, de 22 de maig, d’activitats d’extracció de flora o fauna marina i activitats subaquàtiques a les reserves marines',
  fecha: '2015-05-22',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2015/05/22/41/dof/spa/pdf',
  tipo: 'general',
};

const NORMAS = [NORMA_CREACION, NORMA_41_2015];

// zoneId del perímetro general, referido desde el resumen de la integral.
const RESERVA = 'rm-reserva-marina-costa-nord-est-eivissa-tagomago--reserva-marina--autonomica';

const AUTORIZACION_EMBARCACION = permiso({
  importe: 0,
  nota: 'Gratuita. Exige licencia de pesca recreativa en vigor y llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
  vigencia: '3 años',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/3691781',
  ultimaVerificacion: '2026-08-15',
});

// Autorización de los aparejos tradicionales de Eivissa (esparavel o rall,
// morenell y llenceta). El Decreto no fija tasa y la página de la reserva no
// publica importe: `null` es «no publicado», no «gratuito».
const PERMISO_APAREJOS_TRADICIONALES = permiso({
  importe: null,
  nota: 'Autorización específica para los aparejos tradicionales de Eivissa, única modalidad admitida desde tierra. La entrega la Dirección General de Pesca.',
  vigencia: null,
  url: 'https://www.caib.es/sites/reservesmarines/es/autorizaciones_en_las_reservas_marinas/',
  ultimaVerificacion: '2026-08-16',
});

const PERMISO_BUCEO = permiso({
  importe: 52.82,
  nota: 'Autorización anual individual, que habilita también el resto de reservas marinas de Eivissa (Freus, ses Bledes i es Vedrà-Vedranell). Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo; el colectivo solo para centros y clubes de buceo. En las zonas incluidas en espacios Natura 2000 hay que cumplir además su plan de gestión.',
  vigencia: '1 año (hay también diaria y quincenal)',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/1139905',
  ultimaVerificacion: '2026-08-16',
});

const SIN_INSTRUMENTOS =
  'Los buceadores, con escafandra o en apnea, no pueden llevar ni en la inmersión ni en la ' +
  'embarcación ningún instrumento utilizable para pescar o extraer especies marinas, salvo el ' +
  'cuchillo de seguridad (art. 9.2 del Decret 41/2015).';

export default [
  {
    zoneId: RESERVA,
    nombreCorto: 'Reserva Marina costa nord-est d’Eivissa-Tagomago',
    resumen:
      'Perímetro general de la reserva. Pesca submarina prohibida; desde embarcación, solo volantín, ' +
      'potera y curricán de superficie con autorización trienal; desde tierra, aparejos ' +
      'tradicionales con autorización específica. El buceo debe cumplir además los planes de gestión ' +
      'de los espacios Natura 2000 que se solapan con la reserva.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        // No es `restricted` sino `allowed_with_authorization`: todo lo que el
        // art. 5.3 admite desde tierra exige autorización específica, así que
        // sin ella no se puede pescar en absoluto. Como `restricted` el panel
        // decía «permitida con restricciones», que aquí invita a bajar con una
        // caña —aparejo que ni siquiera está entre los admitidos.
        status: 'allowed_with_authorization',
        motivo:
          'El art. 5.3 del Decreto 45/2018 admite desde tierra únicamente los aparejos tradicionales ' +
          'de Eivissa, y solo con autorización específica: sin ella no se puede pescar desde tierra.',
        permit: PERMISO_APAREJOS_TRADICIONALES,
        conditions: [
          'Desde tierra y con autorización específica se permiten los aparejos tradicionales de ' +
            'Eivissa: el esparavel o rall, el morenell y la lienza o llenceta.',
          'Prohibida absolutamente la captura recreativa de invertebrados marinos, salvo cefalópodos.',
          'Prohibido usar peces o cefalópodos vivos como cebo.',
          'Prohibidos el spinning, el jigging y cualquier modalidad no autorizada expresamente.',
        ],
        sources: ['boib-decreto-45-2018-tagomago', 'caib-regulacion-tagomago', 'decret-41-2015'],
      },

      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'El art. 3.2.b del Decreto 45/2018 exceptúa de la prohibición general la pesca recreativa de ' +
          'superficie, que el art. 5 limita a tres aparejos y sujeta a licencia específica.',
        conditions: [
          'Aparejos permitidos: volantín, potera y curricán de superficie (fluixa). Las líneas pueden ' +
            'ser manuales o con caña de carrete.',
          'Máximo de dos líneas por embarcación para el curricán de superficie.',
          'Prohibida absolutamente la captura recreativa de invertebrados marinos, salvo cefalópodos.',
          'Prohibido usar peces o cefalópodos vivos como cebo.',
          'Prohibidos el spinning, el jigging y cualquier modalidad no autorizada expresamente.',
          'Obligatorio llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
        ],
        permit: AUTORIZACION_EMBARCACION,
        sources: [
          'boib-decreto-45-2018-tagomago',
          'caib-regulacion-tagomago',
          'tramite-autorizacion-embarcacion',
        ],
      },

      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'El art. 3.1.a del Decreto 45/2018 prohíbe toda clase de pesca marítima y el 3.2 solo ' +
          'exceptúa las artes menores profesionales, la pesca recreativa «de superficie» y el ' +
          'muestreo científico. La submarina no está entre las excepciones, y la página oficial la ' +
          'declara expresamente prohibida.',
        conditions: [SIN_INSTRUMENTOS],
        sources: ['boib-decreto-45-2018-tagomago', 'caib-regulacion-tagomago', 'decret-41-2015'],
      },

      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El buceo con escafandra autónoma está permitido con permiso individual o colectivo. Además, ' +
          'el art. 6.2 del Decreto 45/2018 obliga a cumplir el marco normativo de los planes de ' +
          'gestión de los espacios Natura 2000 en las partes de la reserva incluidas en ellos.',
        conditions: [
          'Las inmersiones en apnea son libres en toda la reserva y no necesitan permiso.',
          'En las zonas de la reserva incluidas en el LIC nord de Sant Joan (ES5310112), el LIC y ZEPA ' +
            'de Tagomago (ES0000082), el LIC àrea marina de Tagomago (ES5310107), el LIC y ZEPA dels ' +
            'illots de Santa Eulària, Redona i es Canar (ES0000242) y la ZEPA del espacio marino del ' +
            'levante de Eivissa (ES0000517) hay que cumplir además su plan de gestión.',
          SIN_INSTRUMENTOS,
        ],
        permit: PERMISO_BUCEO,
        sources: ['boib-decreto-45-2018-tagomago', 'caib-regulacion-tagomago', 'decret-41-2015', 'tramite-autorizacion-buceo'],
      },

      fondeo: fondeoPorPosidoniaGeneral(['boib-decreto-45-2018-tagomago']),

      navegacion: {
        status: 'not_regulated',
        motivo:
          'El Decreto 45/2018 regula pesca, extracción y actividades subacuáticas, y solo prohíbe el ' +
          'fondeo dentro de la reserva integral; no establece límites de navegación.',
        sources: ['boib-decreto-45-2018-tagomago'],
      },
    },
  },

  {
    zoneId: 'rm-reserva-integral-costa-nord-est-eivissa-tagomago--reserva-integral--autonomica',
    nombreCorto: 'Tagomago — reserva integral de la Llosa des Figueral',
    // NO hereda del perímetro general: medido sobre la geometría oficial, ni un
    // solo punto de la integral cae dentro del polígono de la reserva marina,
    // que la excluye. Es el mismo caso que el Migjorn, y `npm run rules:check`
    // rechaza la herencia si se declara. Por eso el régimen va completo.
    resumen:
      'Núcleo de máxima protección en el perímetro marino de la Llosa des Figueral. Aquí se prohíben ' +
      'a la vez las actividades subacuáticas, la pesca marítima, la extracción de flora y fauna y el ' +
      'fondeo de embarcaciones.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'En la zona de reserva integral se prohíben la pesca marítima y las actividades extractivas ' +
          'de flora y fauna, sin excepción para la pesca recreativa.',
        sources: ['boib-decreto-45-2018-tagomago', 'caib-regulacion-tagomago'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'En la zona de reserva integral se prohíben la pesca marítima y las actividades extractivas ' +
          'de flora y fauna, sin excepción para la pesca recreativa.',
        sources: ['boib-decreto-45-2018-tagomago', 'caib-regulacion-tagomago'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'En la zona de reserva integral se prohíben tanto la pesca marítima como las actividades ' +
          'subacuáticas.',
        sources: ['boib-decreto-45-2018-tagomago', 'caib-regulacion-tagomago'],
      },
      buceo: {
        status: 'prohibited',
        motivo:
          'Las actividades subacuáticas están prohibidas en la reserva integral. La Dirección General ' +
          'puede autorizarlas por motivos científicos, de seguridad o de salvamento.',
        conditions: [
          'La Dirección General de Pesca puede autorizar la inmersión, el fondeo y la toma de muestras ' +
            'por motivos de índole científica, de seguridad o de salvamento (art. 3.3).',
        ],
        sources: ['boib-decreto-45-2018-tagomago', 'caib-regulacion-tagomago'],
      },
      fondeo: {
        status: 'prohibited',
        motivo:
          'El art. 3.3 del Decreto 45/2018 prohíbe expresamente el fondeo de embarcaciones dentro de ' +
          'la reserva integral de la Llosa des Figueral. Es una prohibición total, no limitada a las ' +
          'praderas de fanerógamas.',
        conditions: [
          'La Dirección General de Pesca puede autorizar el fondeo por motivos de índole científica, ' +
            'de seguridad o de salvamento.',
        ],
        sources: ['boib-decreto-45-2018-tagomago', 'caib-regulacion-tagomago'],
      },
      navegacion: {
        status: 'not_regulated',
        motivo:
          'El art. 3.3 del Decreto 45/2018 prohíbe en la reserva integral las actividades subacuáticas, ' +
          'la pesca, la extracción y el fondeo, pero no la navegación de paso.',
        sources: ['boib-decreto-45-2018-tagomago'],
      },
    },
  },
];
