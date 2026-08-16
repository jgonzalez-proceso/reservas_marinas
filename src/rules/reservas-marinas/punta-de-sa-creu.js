/**
 * Reserva Marina de la Punta de sa Creu (Formentera).
 *
 * Norma construida «al revés», como las órdenes estatales: el art. 2.1.a del
 * Decreto 38/2018 prohíbe toda clase de pesca marítima y el 2.2 enumera tres
 * excepciones tasadas. La pesca submarina no está entre ellas, y de ahí —no de
 * una prohibición expresa— sale que esté prohibida.
 *
 * DISCREPANCIA CONOCIDA sobre la pesca desde tierra. El art. 4.1 del Decreto
 * 38/2018 dice literalmente «Queda prohibida la pesca recreativa desde tierra»,
 * y ese apartado sigue vigente. Pero la disposición final primera del Decreto
 * 15/2022 reescribió los arts. 2.1.c y 4.3 para exceptuar y admitir
 * expresamente el esparavel —un aparejo que se lanza desde la orilla—, y la
 * propia página de regulación del Govern publica hoy «Desde tierra: el
 * esparavel». Se recoge como restringida a ese único aparejo, con la
 * contradicción escrita en las condiciones para que quien vaya a pescar la vea
 * y pueda comprobarla. No se resuelve por nuestra cuenta.
 */

import { permiso } from '../schema.js';
import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';

const NORMA_CREACION = {
  titulo:
    'Decreto 38/2018, de 16 de noviembre, por el que se establece la Reserva Marina de la Punta de sa Creu y se regulan las actividades de extracción de flora y fauna marina y las actividades subacuáticas',
  fecha: '2018-11-16',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2018/11/16/38/dof/spa/pdf',
  tipo: 'creacion',
};

const NORMA_MODIFICACION = {
  titulo:
    'Decreto 15/2022, de 16 de mayo, de Plan de Gestión para la Pesca Profesional Artesanal en las Aguas Interiores de las islas Pitiusas, que modifica el Decreto 38/2018',
  fecha: '2022-05-16',
  url: 'https://www.caib.es/eboibfront/pdf/es/2022/65/1111460',
  tipo: 'modificacion',
};

const NORMA_41_2015 = {
  titulo:
    'Decret 41/2015, de 22 de maig, d’activitats d’extracció de flora o fauna marina i activitats subaquàtiques a les reserves marines',
  fecha: '2015-05-22',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2015/05/22/41/dof/spa/pdf',
  tipo: 'general',
};

const AUTORIZACION_EMBARCACION = permiso({
  importe: 0,
  nota: 'Gratuita. El art. 4.2 del Decreto 38/2018 la fija como bianual; el trámite y la página de la reserva la publican hoy como trienal, igual que en el resto de reservas.',
  vigencia: '3 años',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/3691781',
  ultimaVerificacion: '2026-08-15',
});

const PERMISO_BUCEO = permiso({
  importe: null,
  nota: 'Permiso individual o colectivo; el colectivo solo para centros y clubes de buceo.',
  vigencia: 'Anual o por periodos más cortos',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/1139905',
  ultimaVerificacion: '2026-08-15',
});

const SIN_INSTRUMENTOS =
  'Los buceadores, con escafandra o en apnea, no pueden llevar ni en la inmersión ni en la ' +
  'embarcación ningún instrumento utilizable para pescar o extraer especies marinas, salvo el ' +
  'cuchillo de seguridad (art. 9.2 del Decret 41/2015).';

export default [
  {
    zoneId: 'rm-reserva-marina-punta-de-sa-creu--reserva-marina--autonomica',
    nombreCorto: 'Reserva Marina de la Punta de sa Creu',
    resumen:
      'Reserva del nordeste de Formentera. Pesca submarina prohibida. Desde embarcación solo entre ' +
      'el 1 de julio y el 31 de marzo, a más de 10 m de profundidad y con tres aparejos; desde ' +
      'tierra, solo el esparavel. Spinning, jigging y competiciones, prohibidos.',
    normas: [NORMA_CREACION, NORMA_MODIFICACION, NORMA_41_2015],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'El único aparejo admitido desde tierra es el esparavel. El Decreto 15/2022 lo exceptuó de ' +
          'la prohibición de pescar entre la costa y los 10 m de profundidad y lo añadió a la lista ' +
          'de aparejos permitidos del art. 4.3.',
        conditions: [
          'Único aparejo admitido desde tierra: el esparavel.',
          'El art. 2.1.c prohíbe toda pesca marítima y marisqueo entre la línea de costa y los 10 m ' +
            'de profundidad, salvo precisamente el esparavel.',
          'Atención: el art. 4.1 del Decreto 38/2018 conserva la frase «Queda prohibida la pesca ' +
            'recreativa desde tierra», que el Decreto 15/2022 no derogó expresamente aunque admitiera ' +
            'el esparavel. La página oficial del Govern publica el esparavel como permitido desde ' +
            'tierra. Conviene confirmarlo con el Servicio de Recursos Marinos antes de pescar.',
          'Prohibido usar peces o cefalópodos vivos como cebo.',
          'Prohibidos el spinning, el jigging, los campeonatos y cualquier modalidad no autorizada ' +
            'expresamente.',
        ],
        sources: [
          'boib-decreto-38-2018-sa-creu',
          'boib-decreto-15-2022-pitiuses',
          'caib-regulacion-sa-creu',
        ],
      },

      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'El art. 2.2.b del Decreto 38/2018 exceptúa de la prohibición general la pesca recreativa ' +
          'desde embarcación, que el art. 4 sujeta a licencia específica, a temporada y a una ' +
          'profundidad mínima.',
        conditions: [
          'Solo entre el 1 de julio y el 31 de marzo.',
          'Solo a más de 10 m de profundidad: entre la línea de costa y esa cota está prohibida toda ' +
            'pesca marítima y marisqueo, salvo el esparavel.',
          'Aparejos permitidos: volantín, potera y curricán de superficie; las líneas pueden ser ' +
            'manuales o con caña de carrete. Máximo dos líneas por embarcación para el curricán.',
          'Prohibido usar peces o cefalópodos vivos como cebo.',
          'Prohibidos el spinning, el jigging, los campeonatos y cualquier modalidad no autorizada ' +
            'expresamente.',
          'Obligatorio llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
        ],
        permit: AUTORIZACION_EMBARCACION,
        sources: [
          'boib-decreto-38-2018-sa-creu',
          'boib-decreto-15-2022-pitiuses',
          'caib-regulacion-sa-creu',
          'tramite-autorizacion-embarcacion',
        ],
      },

      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'El art. 2.1.a del Decreto 38/2018 prohíbe toda clase de pesca marítima y el 2.2 solo ' +
          'exceptúa las artes menores profesionales, la pesca recreativa desde embarcación y el ' +
          'muestreo científico. La submarina no está entre las excepciones, y la página oficial la ' +
          'declara expresamente prohibida.',
        conditions: [SIN_INSTRUMENTOS],
        sources: ['boib-decreto-38-2018-sa-creu', 'caib-regulacion-sa-creu', 'decret-41-2015'],
      },

      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El buceo con escafandra autónoma se puede practicar en la reserva con permiso individual o ' +
          'colectivo del órgano competente (art. 9.1 del Decret 41/2015).',
        conditions: [
          'Las inmersiones en apnea son libres en toda la reserva y no necesitan permiso.',
          SIN_INSTRUMENTOS,
        ],
        permit: PERMISO_BUCEO,
        sources: ['caib-regulacion-sa-creu', 'decret-41-2015'],
      },

      fondeo: fondeoPorPosidoniaGeneral(['boib-decreto-38-2018-sa-creu']),

      navegacion: {
        status: 'not_regulated',
        motivo:
          'El Decreto 38/2018 regula pesca, extracción y actividades subacuáticas, pero no establece ' +
          'límites de navegación dentro de la reserva.',
        sources: ['boib-decreto-38-2018-sa-creu'],
      },
    },
  },
];
