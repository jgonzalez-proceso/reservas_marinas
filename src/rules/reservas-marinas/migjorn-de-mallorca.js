/**
 * Reserva Marina del Migjorn de Mallorca.
 *
 * Contenido transcrito de la regulación de actividades publicada por el Govern.
 * La reserva combina tres figuras: el perímetro general, una zona de veda de
 * pesca recreativa y una zona de protección especial.
 *
 * Nota de datos: las tablas oficiales de vértices publican un cuadrilátero
 * f-g-h-i que no se corresponde con ningún polígono de la capa cartográfica
 * vigente. Está documentado en docs/fuentes.md y no afecta a estas reglas, que
 * se aplican por figura y no por vértice.
 */

import { permiso } from '../schema.js';
import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';

const NORMAS = [
  {
    titulo:
      'Orden por la que se regulan las actividades a desarrollar en la reserva marina del Migjorn de Mallorca',
    fecha: null,
    url: 'https://www.caib.es/sites/reservesmarines/es/l/normativa_basica_-_reserva_marina_del_migjorn_de_mallorca-235/',
    tipo: 'creacion',
  },
  {
    titulo: 'Decret 41/2015, d’activitats d’extracció de flora o fauna marina i activitats subaquàtiques',
    fecha: null,
    url: 'https://www.caib.es/sites/reservesmarines/es/normativa_general_en_las_reservas_marinas/',
    tipo: 'general',
  },
];

// La zona de protección especial la crea una orden propia de 2005, distinta de
// la orden general de la reserva.
const NORMAS_ZPE = [
  ...NORMAS,
  {
    titulo:
      'Orden de la Consejera de Agricultura y Pesca de 29 de abril de 2005, por la que se establece un área de protección especial en la reserva marina del Migjorn de Mallorca',
    fecha: '2005-04-29',
    url: 'https://www.caib.es/sites/puntdinformacioambiental/f/139747',
    tipo: 'creacion',
  },
];

// La zona de veda la crea una resolución de 2009, prorrogada en 2024.
const NORMAS_VEDA = [
  ...NORMAS,
  {
    titulo:
      'Resolución de la Consejera de Agricultura y Pesca de 19 de febrero de 2009, por la que se establecen medidas complementarias de regulación en la reserva marina del Migjorn de Mallorca',
    fecha: '2009-02-19',
    url: 'https://boib.caib.es/pdf/2009031/mp54.pdf',
    tipo: 'creacion',
  },
  {
    titulo:
      'Resolución del director general de Pesca de 15 de mayo de 2024, de prórroga de la zona de veda',
    fecha: '2024-05-15',
    url: 'https://industriaspesqueras.com/noticia-79110-sec-Legislaci%C3%B3n',
    tipo: 'modificacion',
  },
];

const AUTORIZACION_EMBARCACION = permiso({
  importe: 0,
  nota: 'Gratuita. Exige licencia de pesca recreativa de embarcación en vigor y llevar registro de capturas.',
  vigencia: '3 años',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/3691781',
  ultimaVerificacion: '2026-08-15',
});

const AUTORIZACION_SUBMARINA = permiso({
  importe: 53.9,
  nota: 'Tasa por cada reserva marina. Autorización individual específica.',
  vigencia: '1 año',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/1683027/',
  ultimaVerificacion: '2026-08-15',
});

// El art. 2.1.d) del Decret 41/2015 incluye nominalmente esta reserva en su
// ámbito, y su art. 9.1 exige autorización específica de la Dirección General
// para bucear con escafandra autónoma en cualquiera de las reservas de ese
// ámbito. El importe no lo publica la página de la reserva: null significa
// «no publicado», nunca «gratuito».
const PERMISO_BUCEO = permiso({
  importe: null,
  nota: 'Permiso individual o colectivo; el colectivo solo para centros y clubes de buceo. Las inmersiones deben comunicarse a la Dirección General.',
  vigencia: 'Anual o por periodos más cortos',
  url: 'https://www.caib.es/sites/reservesmarines/es/permisos_de_busseig/',
  ultimaVerificacion: '2026-08-16',
});

// Art. 9.7 del Decret 41/2015: el buceo a pulmón libre no exige autorización.
const APNEA_LIBRE =
  'Las inmersiones en apnea (snorkel) no necesitan autorización previa (art. 9.7 del Decret 41/2015).';

// Art. 9.2 del mismo decreto.
const SIN_INSTRUMENTOS =
  'Prohibido llevar, en la inmersión o en la embarcación, cualquier instrumento o aparejo que se pueda emplear para la pesca o la extracción de especies marinas.';

export default [
  {
    zoneId: 'rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica',
    nombreCorto: 'Reserva Marina del Migjorn de Mallorca',
    resumen:
      'Perímetro general de la reserva. La pesca desde costa está permitida a diario con aparejos limitados; desde embarcación exige autorización trienal y registro de capturas.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'Permitida todos los días en el perímetro general, con aparejos limitados y un máximo de 6 anzuelos.',
        conditions: [
          'Aparejos permitidos: volantín o caña (con o sin carrete) con un máximo de 6 anzuelos, potera, fisga (solo pesca diurna) y salabre.',
          'No permitida en la zona de protección especial.',
        ],
        sources: ['caib-regulacion-migjorn'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida todos los días en el perímetro general, con autorización trienal específica y obligación de registrar las capturas.',
        conditions: [
          'Aparejos permitidos: curricán de fondo, fluixa, potera, volantín o caña.',
          'Máximo de una línea por persona y cuatro anzuelos.',
          'Los armadores de las embarcaciones autorizadas deben llevar registro de las capturas obtenidas; no hacerlo implica la pérdida de la licencia.',
          'No permitida en la zona de protección especial ni en la zona de veda.',
        ],
        permit: AUTORIZACION_EMBARCACION,
        sources: ['caib-regulacion-migjorn', 'tramite-autorizacion-embarcacion'],
      },
      pescaSubmarina: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida lunes, martes, sábados, domingos y festivos, con autorización individual anual sujeta a tasa.',
        conditions: [
          'Días hábiles: lunes, martes, sábados, domingos y festivos.',
          'Prohibida en la zona de protección especial, en la zona de veda y en el Parc Natural d’Es Trenc-Salobrar.',
        ],
        schedule: { dias: ['lunes', 'martes', 'sábado', 'domingo', 'festivos'] },
        permit: AUTORIZACION_SUBMARINA,
        sources: ['caib-regulacion-migjorn', 'tramite-autorizacion-submarina'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El buceo con escafandra autónoma está permitido en el perímetro general, excepto en el área de protección especial, y requiere autorización específica de la Dirección General (art. 9.1 del Decret 41/2015, que incluye esta reserva en su ámbito por el art. 2.1.d). Las inmersiones en apnea son libres.',
        conditions: [
          APNEA_LIBRE,
          'Prohibido el buceo con escafandra en el área de protección especial.',
          SIN_INSTRUMENTOS,
          'Las inmersiones deben comunicarse a la Dirección General a efectos de seguimiento (art. 9.3).',
        ],
        permit: PERMISO_BUCEO,
        sources: ['caib-regulacion-migjorn', 'decret-41-2015'],
      },
      fondeo: fondeoPorPosidoniaGeneral(),
      navegacion: {
        status: 'not_regulated',
        motivo:
          'La regulación de actividades de esta reserva no organiza sus disposiciones por zonas de navegación ni menciona límites de navegación en el perímetro general.',
        sources: ['caib-regulacion-migjorn'],
      },
    },
  },

  {
    zoneId: 'rm-reserva-marina-del-migjorn-de-mallorca--zona-de-veda-de-pesca-recreativa--autonomica',
    nombreCorto: 'Migjorn — zona de veda de pesca recreativa',
    resumen:
      'Zona vedada a la pesca recreativa dentro de la reserva del Migjorn, creada por Resolución de 19/02/2009 y prorrogada por 5 años en 2024. La veda alcanza tanto la pesca desde tierra como desde embarcación; no afecta al buceo.',
    normas: NORMAS_VEDA,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'La Resolución de 19 de febrero de 2009 declara esta zona vedada expresamente «para la pesca recreativa desde tierra y embarcación», por un período de 5 años. La Resolución de 15 de mayo de 2024 prorroga la veda otros 5 años.',
        sources: ['boib-resolucion-2009-migjorn-veda', 'boib-resolucion-2024-migjorn-veda-prorroga'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'La Resolución de 19 de febrero de 2009 declara esta zona vedada expresamente «para la pesca recreativa desde tierra y embarcación», por un período de 5 años. La Resolución de 15 de mayo de 2024 prorroga la veda otros 5 años.',
        sources: ['boib-resolucion-2009-migjorn-veda', 'boib-resolucion-2024-migjorn-veda-prorroga'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo: 'La pesca submarina está prohibida en la zona de veda.',
        sources: ['caib-regulacion-migjorn'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'La veda creada en 2009 regula únicamente la pesca recreativa; no restringe el buceo. Esta zona no es la zona de protección especial, así que sigue aplicando el régimen general de la reserva: buceo con escafandra con autorización específica de la Dirección General (art. 9.1 del Decret 41/2015). Las inmersiones en apnea son libres.',
        conditions: [
          APNEA_LIBRE,
          SIN_INSTRUMENTOS,
          'Las inmersiones deben comunicarse a la Dirección General a efectos de seguimiento (art. 9.3).',
        ],
        permit: PERMISO_BUCEO,
        sources: ['caib-regulacion-migjorn', 'decret-41-2015', 'boib-resolucion-2009-migjorn-veda'],
      },
      fondeo: fondeoPorPosidoniaGeneral(),
      navegacion: {
        status: 'not_regulated',
        motivo:
          'Las resoluciones que crean y prorrogan esta zona de veda regulan únicamente la pesca recreativa; no mencionan la navegación.',
        sources: ['boib-resolucion-2009-migjorn-veda'],
      },
    },
  },

  {
    zoneId: 'rm-reserva-integral-del-migjorn-de-mallorca--zona-de-proteccio-especial--autonomica',
    nombreCorto: 'Migjorn — zona de protección especial',
    resumen:
      'Núcleo de la reserva del Migjorn, entre Cala Figuereta y la Punta des Baus. Ni pesca recreativa en ninguna modalidad, ni buceo con escafandra.',
    normas: NORMAS_ZPE,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo: 'La pesca desde costa no está permitida en la zona de protección especial.',
        sources: ['caib-regulacion-migjorn'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'La pesca recreativa desde embarcación no está permitida en la zona de protección especial.',
        sources: ['caib-regulacion-migjorn'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo: 'La pesca submarina está prohibida en la zona de protección especial.',
        sources: ['caib-regulacion-migjorn'],
      },
      buceo: {
        status: 'prohibited',
        motivo: 'El buceo deportivo está permitido en la reserva excepto en el área de protección especial.',
        sources: ['caib-regulacion-migjorn'],
      },
      fondeo: {
        status: 'restricted',
        motivo:
          'El art. 2 de la Orden de 29 de abril de 2005 prohíbe expresamente «el fondeo de embarcaciones sobre praderas de fanerógamas» dentro del área de protección especial. El Real Decreto 191/2026 refuerza esa misma prohibición con carácter general en todo el Mediterráneo español.',
        conditions: [
          'Prohibido fondear sobre las praderas de fanerógamas del área de protección especial.',
          'Prohibido también en zonas de arena próximas si la cadena, el ancla u otros elementos del fondeo afectan a la pradera (RD 191/2026).',
          'Solo se permite fondear sobre esas praderas con sistemas de bajo impacto debidamente autorizados.',
        ],
        sources: ['boib-orden-2005-migjorn-zpe', 'boe-rd-191-2026'],
      },
      navegacion: {
        status: 'not_regulated',
        motivo:
          'El art. 2 de la Orden de 2005 prohíbe pesca, extracción, buceo con escafandra y el fondeo sobre fanerógamas dentro del área de protección especial, pero no menciona la navegación.',
        sources: ['boib-orden-2005-migjorn-zpe'],
      },
    },
  },
];
