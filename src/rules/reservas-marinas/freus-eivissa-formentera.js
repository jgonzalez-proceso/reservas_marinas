/**
 * Reserva Marina dels Freus d'Eivissa i Formentera.
 *
 * La reserva más extensa de las aguas interiores baleares (120 km²) y la única
 * cuya gestión corresponde en exclusiva al Govern por recaer sobre dos consejos
 * insulares a la vez (art. 8.2 de la Ley 6/2013).
 *
 * Tres figuras, y ninguna hereda de otra: la zona de protección máxima de
 * s'Espardell y la zona de veda son perímetros propios definidos por sus
 * normas, y el régimen de la reserva general no les aplica en lo que ellas
 * regulan. La herencia se declara, nunca se infiere; aquí sus normas dicen
 * expresamente qué se prohíbe, así que se escribe entero.
 *
 * La zona de veda no es permanente: la crea una resolución trienal renovada
 * desde el año 2000, y la vigente es de 4 de diciembre de 2023. El art. 3.2.a
 * del Decreto 63/1999 obliga a que cubra al menos el 35 % de la superficie de
 * la reserva, así que la zona existe siempre pero puede cambiar de sitio.
 */

import { permiso } from '../schema.js';
import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';

const NORMA_CREACION = {
  titulo:
    'Decreto 63/1999, de 28 de mayo, por el que se establece la reserva marina de los Freus de Eivissa y Formentera',
  fecha: '1999-05-28',
  url: 'http://www.caib.es/eboibfront/pdf/VisPdf?action=VisHistoric&p_any=1999&p_numero=074&p_finpag=8126&p_inipag=8125&idDocument=125247&lang=es',
  tipo: 'creacion',
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
    'Resolución del director general de Pesca de 4 de diciembre de 2023, por la que se establece una zona de veda para la pesca recreativa en la Reserva Marina de los Freus de Ibiza y Formentera',
  fecha: '2023-12-04',
  url: 'https://www.caib.es/eboibfront/pdf/es/2023/166/1150935',
  tipo: 'modificacion',
};

const NORMA_ESTANY = {
  titulo:
    'Resolución del director general de Pesca de 31 de marzo de 2026, por la que se veda la pesca de fluixa y curricán en el Estany des Peix',
  fecha: '2026-03-31',
  url: 'https://www.caib.es/eboibfront/pdf/es/2026/46/1216671',
  tipo: 'modificacion',
};

const NORMAS = [NORMA_CREACION, NORMA_41_2015, NORMA_ESTANY];

const AUTORIZACION_EMBARCACION = permiso({
  importe: 0,
  nota: 'Gratuita. Exige licencia de pesca recreativa en vigor y llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
  vigencia: '3 años',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/3691781',
  ultimaVerificacion: '2026-08-15',
});

// El buceo con escafandra en las reservas marinas exige autorización del órgano
// competente (art. 9.1 del Decret 41/2015). El importe no lo publica la página
// de la reserva: null significa "no publicado", nunca "gratuito".
const PERMISO_BUCEO = permiso({
  importe: null,
  nota: 'Permiso individual o colectivo; el colectivo solo para centros y clubes de buceo. Las inmersiones deben comunicarse a la Dirección General.',
  vigencia: 'Anual o por periodos más cortos',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/1139905',
  ultimaVerificacion: '2026-08-15',
});

// El art. 9.2 del Decret 41/2015 es la razón por la que la pesca submarina no
// cabe en estas reservas: prohíbe llevar instrumentos de pesca en inmersión.
const SIN_INSTRUMENTOS =
  'Los buceadores, con escafandra o en apnea, no pueden llevar ni en la inmersión ni en la ' +
  'embarcación ningún instrumento utilizable para pescar o extraer especies marinas, salvo el ' +
  'cuchillo de seguridad (art. 9.2 del Decret 41/2015).';

const MOTIVO_SUBMARINA =
  'El art. 3 del Decreto 63/1999 prohíbe toda clase de pesca marítima en la reserva salvo ' +
  'excepciones tasadas, y entre ellas solo figura la pesca recreativa «de superficie» del art. 5 ' +
  'del Decret 41/2015, que no incluye la modalidad submarina. El art. 9.2 del mismo decreto ' +
  'remata la cuestión al prohibir llevar instrumentos de pesca durante la inmersión.';

export default [
  {
    zoneId: 'rm-reserva-marina-dels-freus-d-eivissa-i-formentera--reserva-marina--autonomica',
    nombreCorto: 'Reserva Marina dels Freus d’Eivissa i Formentera',
    resumen:
      'Perímetro general de la reserva, entre Eivissa y Formentera. La pesca recreativa está ' +
      'permitida salvo en la zona de protección máxima de s’Espardell y en la zona de veda; la ' +
      'submarina, prohibida en toda la reserva. Desde embarcación exige autorización trienal y ' +
      'registro de capturas.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'Permitida en el perímetro general con los aparejos tasados, pero no en la zona de ' +
          'protección máxima de s’Espardell ni en la zona de veda de pesca recreativa.',
        conditions: [
          'Aparejos permitidos: volantín o caña (con o sin carrete), con un máximo de una línea por ' +
            'persona y 6 anzuelos; el spinning; la potera para cefalópodos, máximo una por persona; ' +
            'la fisga (solo de día) y el salabre.',
          'El esparavel puede autorizarse como aparejo tradicional.',
          'No permitida en la zona de protección máxima de s’Espardell ni en la zona de veda.',
          'Prohibido pescar utilizando pez vivo como cebo.',
          'Límite de captura de un ejemplar por día y pescador para las especies sujetas a él.',
        ],
        sources: ['caib-regulacion-freus', 'boib-decreto-63-1999-freus', 'decret-41-2015'],
      },

      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida en el perímetro general con autorización trienal específica y obligación de ' +
          'registrar las capturas. No se puede practicar en la zona de protección máxima ni en la ' +
          'zona de veda.',
        conditions: [
          'Aparejos permitidos: curricán de fondo, fluixa, potera para cefalópodos (máximo una línea ' +
            'con dos poteras por pescador), volantín o caña con o sin carrete (máximo una línea por ' +
            'persona y cuatro anzuelos) y el salabre para subir las capturas.',
          'Los anzuelos del volantín deben superar los 7 mm de seno, salvo para el raor, que deben ' +
            'superar los 5,7 mm.',
          'En el Estany des Peix de Formentera están vedados la fluixa y el curricán, tanto de fondo ' +
            'como de superficie: es zona de alevinaje y zona de baño.',
          'Prohibido pescar utilizando pez vivo como cebo.',
          'Las competiciones de pesca no están permitidas.',
          'No permitida en la zona de protección máxima de s’Espardell ni en la zona de veda.',
          'Los armadores autorizados deben llevar registro de capturas; no presentarlo comporta la ' +
            'pérdida de la licencia.',
        ],
        permit: AUTORIZACION_EMBARCACION,
        sources: [
          'caib-regulacion-freus',
          'boib-decreto-63-1999-freus',
          'boib-resolucion-2026-estany-des-peix',
          'tramite-autorizacion-embarcacion',
        ],
      },

      pescaSubmarina: {
        status: 'prohibited',
        motivo: MOTIVO_SUBMARINA,
        conditions: [SIN_INSTRUMENTOS],
        sources: ['boib-decreto-63-1999-freus', 'decret-41-2015', 'caib-regulacion-freus'],
      },

      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El buceo con escafandra autónoma está permitido en la reserva salvo en la zona de ' +
          'protección máxima de s’Espardell, y requiere permiso individual o colectivo del órgano ' +
          'competente (art. 9.1 del Decret 41/2015).',
        conditions: [
          'Las inmersiones en apnea son libres en toda la reserva marina y no necesitan permiso.',
          'Prohibido el buceo con escafandra en la zona de protección máxima de s’Espardell.',
          SIN_INSTRUMENTOS,
        ],
        permit: PERMISO_BUCEO,
        sources: ['caib-regulacion-freus', 'decret-41-2015'],
      },

      fondeo: fondeoPorPosidoniaGeneral(['boib-decreto-63-1999-freus']),

      navegacion: {
        status: 'not_regulated',
        motivo:
          'El Decreto 63/1999 y la regulación de actividades de esta reserva organizan pesca, ' +
          'extracción y actividades subacuáticas, pero no establecen límites de navegación en el ' +
          'perímetro general.',
        sources: ['boib-decreto-63-1999-freus', 'caib-regulacion-freus'],
      },
    },
  },

  {
    zoneId:
      'rm-reserva-marina-dels-freus-d-eivissa-i-formentera--zona-de-proteccio-maxima--autonomica',
    nombreCorto: 'Freus — zona de protección máxima de s’Espardell',
    resumen:
      'Núcleo de la reserva, en el perímetro marino de la isla de s’Espardell. El art. 2 del ' +
      'Decreto 63/1999 prohíbe aquí cuatro cosas a la vez: toda pesca marítima, la extracción de ' +
      'flora y fauna, el fondeo de embarcaciones y el buceo con escafandra autónoma.',
    normas: [NORMA_CREACION, NORMA_41_2015],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'El art. 2 del Decreto 63/1999 prohíbe en esta zona «cualquier tipo de pesca marítima» y la ' +
          'extracción de flora y fauna marinas, sin excepción para la pesca recreativa.',
        sources: ['boib-decreto-63-1999-freus', 'caib-regulacion-freus'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'El art. 2 del Decreto 63/1999 prohíbe en esta zona «cualquier tipo de pesca marítima» y la ' +
          'extracción de flora y fauna marinas, sin excepción para la pesca recreativa.',
        sources: ['boib-decreto-63-1999-freus', 'caib-regulacion-freus'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'El art. 2 del Decreto 63/1999 prohíbe en esta zona cualquier tipo de pesca marítima. Además ' +
          'el buceo con escafandra está prohibido y en apnea no se pueden portar instrumentos de pesca.',
        conditions: [SIN_INSTRUMENTOS],
        sources: ['boib-decreto-63-1999-freus', 'decret-41-2015'],
      },
      buceo: {
        status: 'prohibited',
        motivo:
          'El art. 2 del Decreto 63/1999 prohíbe expresamente el buceo con escafandra autónoma en la ' +
          'zona de protección máxima. La Dirección General puede autorizar la inmersión con ' +
          'finalidades científicas.',
        conditions: [
          'La Dirección General de Pesca puede autorizar la inmersión y la toma de muestras de flora ' +
            'y fauna con finalidades científicas.',
        ],
        sources: ['boib-decreto-63-1999-freus', 'caib-regulacion-freus'],
      },
      fondeo: {
        status: 'prohibited',
        motivo:
          'El art. 2 del Decreto 63/1999 prohíbe expresamente el fondeo de embarcaciones en la zona ' +
          'de protección máxima de s’Espardell. Es una prohibición total, no limitada a las praderas ' +
          'de fanerógamas.',
        sources: ['boib-decreto-63-1999-freus'],
      },
      navegacion: {
        status: 'not_regulated',
        motivo:
          'El art. 2 del Decreto 63/1999 prohíbe pesca, extracción, fondeo y buceo con escafandra en ' +
          'esta zona, pero no la navegación de paso.',
        sources: ['boib-decreto-63-1999-freus'],
      },
    },
  },

  {
    zoneId:
      'rm-reserva-marina-dels-freus-d-eivissa-i-formentera--zona-de-veda-de-pesca-recreativa--autonomica',
    nombreCorto: 'Freus — zona de veda de pesca recreativa',
    resumen:
      'Zona vedada a la pesca recreativa, tanto desde tierra como desde embarcación. La crea una ' +
      'resolución trienal renovada desde el año 2000; la vigente es de 4 de diciembre de 2023. No ' +
      'afecta al buceo.',
    normas: [NORMA_CREACION, NORMA_VEDA, NORMA_41_2015],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'La Resolución de 4 de diciembre de 2023 declara esta zona vedada «para la pesca recreativa ' +
          'desde tierra o desde embarcación» por un periodo de tres años.',
        conditions: [
          'La veda es trienal y se renueva: el art. 3.2.a del Decreto 63/1999 obliga a que cubra al ' +
            'menos el 35 % del perímetro o de la superficie de la reserva, así que la zona puede ' +
            'cambiar de sitio en la siguiente resolución.',
        ],
        sources: ['boib-resolucion-2023-freus-veda', 'boib-decreto-63-1999-freus'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'La Resolución de 4 de diciembre de 2023 declara esta zona vedada «para la pesca recreativa ' +
          'desde tierra o desde embarcación» por un periodo de tres años.',
        conditions: [
          'La veda es trienal y se renueva: el art. 3.2.a del Decreto 63/1999 obliga a que cubra al ' +
            'menos el 35 % del perímetro o de la superficie de la reserva, así que la zona puede ' +
            'cambiar de sitio en la siguiente resolución.',
        ],
        sources: ['boib-resolucion-2023-freus-veda', 'boib-decreto-63-1999-freus'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo: MOTIVO_SUBMARINA,
        conditions: [SIN_INSTRUMENTOS],
        sources: ['boib-decreto-63-1999-freus', 'decret-41-2015'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'La veda regula únicamente la pesca recreativa; no restringe el buceo. Esta zona no es la de ' +
          'protección máxima, así que sigue aplicando el régimen general de la reserva: buceo con ' +
          'escafandra con permiso individual o colectivo.',
        conditions: [
          'Las inmersiones en apnea son libres y no necesitan permiso.',
          SIN_INSTRUMENTOS,
        ],
        permit: PERMISO_BUCEO,
        sources: ['caib-regulacion-freus', 'decret-41-2015', 'boib-resolucion-2023-freus-veda'],
      },
      fondeo: fondeoPorPosidoniaGeneral(['boib-decreto-63-1999-freus']),
      navegacion: {
        status: 'not_regulated',
        motivo:
          'La resolución que crea esta zona de veda regula únicamente la pesca recreativa; no menciona ' +
          'la navegación.',
        sources: ['boib-resolucion-2023-freus-veda'],
      },
    },
  },
];
