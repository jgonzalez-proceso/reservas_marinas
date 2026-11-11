/**
 * Espacios Natura 2000 marinos de gestión estatal de las Illes Balears.
 *
 * Cinco ZEPA declaradas por la Orden AAA/1260/2014 —tres alrededor de Mallorca
 * y dos de Menorca— y el LIC del Canal de Menorca, propuesto por la Orden
 * AAA/1299/2014. Están en aguas exteriores, así
 * que el Decret 91/2023 —norma autonómica— no les alcanza: su régimen hay que
 * buscarlo en el instrumento estatal.
 *
 * Y ninguno de los dos instrumentos regula lo que hace un pescador o un
 * buceador. La Orden de las ZEPA se limita, en su art. 6, a someter los planes,
 * programas y proyectos que puedan afectar al espacio a la evaluación de
 * repercusiones de los apartados 4 y 5 del art. 45 de la Ley 42/2007: una
 * obligación dirigida a quien promueve un proyecto, no al usuario del mar. La
 * del Canal de Menorca ni siquiera llega a eso, porque solo aprueba la
 * propuesta de inclusión del espacio en la lista de LIC.
 *
 * El art. 4 de la Orden de las ZEPA daba dos años para aprobar un plan de
 * gestión de cada una. En la fecha de esta revisión no consta publicado ninguno
 * para estos espacios, y la propia capa del IDEIB los marca como «SENSE
 * INFORMACIÓ» o «EN TRAMITACIÓ». Se dice así, en vez de deducir de ese silencio
 * un permiso: lo que hay es una figura de protección que todavía no ha
 * desplegado su régimen.
 */

import { CONDICIONES_FONDEO_POSIDONIA, fondeoPorPosidoniaGeneral } from '../normas-generales.js';
import { NORMA_ORDEN_ZEPA_MARINAS } from './comun.js';

const REVISION = '2026-11-11';

// La única figura estatal de Baleares cuyo instrumento dice algo que le importa
// a un patrón. La Orden AAA/1366/2016 declara ZEC siete espacios marinos
// mediterráneos —uno de ellos el cap Martinet— y aprueba para todos un anexo I
// de regulación de usos. De ese anexo, lo único que alcanza a la náutica de
// recreo es el fondeo (apartado 5). La pesca recreativa no la regula: su
// apartado 1 habla de cambios de modalidad, de dos ZEC andaluzas y de capturas
// accidentales. Y el buceo solo queda sujeto a que se «podrá limitar» el número
// de inmersiones, cosa que no consta hecha.
const NORMA_ZEC_MARTINET = {
  titulo:
    'Orden AAA/1366/2016, de 4 de agosto, por la que se declaran zonas especiales de conservación de lugares de importancia comunitaria de la Región Marina Mediterránea de la Red Natura 2000, se aprueban sus correspondientes medidas de conservación y se propone la ampliación de los límites geográficos de dos lugares de importancia comunitaria',
  fecha: '2016-08-04',
  url: 'https://www.boe.es/buscar/doc.php?id=BOE-A-2016-7738',
  tipo: 'creacion',
};

const F_MARTINET = 'boe-orden-aaa-1366-2016';

const sinReglaMartinet = (motivo) => ({
  status: 'not_regulated',
  motivo,
  conditions: CONDICIONES_SIN_REGIMEN_MARTINET,
  sources: [F_MARTINET],
});

const CONDICIONES_SIN_REGIMEN_MARTINET = [
  'Sigue aplicando íntegramente la normativa general de pesca recreativa y de actividades ' +
    'subacuáticas que corresponda a estas aguas.',
];

const NORMA_LIC_CANAL = {
  titulo:
    'Orden AAA/1299/2014, de 9 de julio, por la que se aprueba la propuesta de inclusión en la lista de lugares de importancia comunitaria de la Red Natura 2000 de los espacios marinos ESZZ16001, ESZZ16002 Canal de Menorca, ESZZ12002 y ESZZ12001',
  fecha: '2014-07-09',
  url: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2014-7726',
  tipo: 'creacion',
};

// Cada orden dice lo suyo, y no se pueden citar los artículos de una en la
// ficha de la otra: la Orden AAA/1260/2014 declara ZEPA y articula un régimen
// de protección; la Orden AAA/1299/2014 solo aprueba la propuesta de inclusión
// del espacio en la lista de LIC, y ni siquiera llega a eso.
const MOTIVO_ZEPA =
  'La Orden AAA/1260/2014, que declara esta ZEPA marina, no regula la pesca recreativa ni las ' +
  'actividades subacuáticas: su art. 6 se limita a someter a evaluación de repercusiones los ' +
  'planes, programas y proyectos que puedan afectar al espacio (art. 45.4 y 5 de la Ley 42/2007). ' +
  'El plan de gestión que preveía su art. 4 no consta aprobado en la fecha de esta revisión.';

const MOTIVO_LIC_CANAL =
  'La Orden AAA/1299/2014 se limita a aprobar la propuesta de inclusión de este espacio en la ' +
  'lista de lugares de importancia comunitaria: no regula la pesca recreativa ni las actividades ' +
  'subacuáticas, y el espacio no tiene todavía plan de gestión aprobado.';

const CONDICIONES_SIN_REGIMEN = [
  'Sigue aplicando íntegramente la normativa general de pesca recreativa y de actividades ' +
    'subacuáticas que corresponda a estas aguas.',
  'Donde este espacio se solapa con una reserva marina o con otra figura de protección, manda el ' +
    'régimen de esa figura; este mapa la resuelve por separado.',
];

function regimenSinDesarrollo({ motivo, sources }) {
  const regla = (sufijo) => ({
    status: 'not_regulated',
    motivo: `${motivo}${sufijo ? ` ${sufijo}` : ''}`,
    conditions: CONDICIONES_SIN_REGIMEN,
    sources,
  });

  return {
    pescaDesdeCosta: regla(),
    pescaRecreativaEmbarcacion: regla(),
    pescaSubmarina: regla(
      'En particular, no existe ninguna prohibición de pesca submarina derivada de esta figura.',
    ),
    buceo: regla(),
    // El RD 191/2026 rige en todas las aguas marinas del Mediterráneo español,
    // también en las exteriores, así que el fondeo sí tiene régimen aquí.
    fondeo: fondeoPorPosidoniaGeneral(),
    navegacion: regla(),
  };
}

const ZEPA = { motivo: MOTIVO_ZEPA, sources: ['boe-orden-aaa-1260-2014'] };
// Cita también la Orden AAA/1479/2016: concluir que esta figura no restringe la
// pesca recreativa exige haber leído las dos, porque la de 2016 sí regula pesca
// dentro del canal —arrastre, dragas y jábegas, sobre dos polígonos— y es la que
// podría desmentir la conclusión si alcanzara a la recreativa. No lo hace.
const LIC_CANAL = {
  motivo: MOTIVO_LIC_CANAL,
  sources: ['boe-orden-aaa-1299-2014', 'boe-orden-aaa-1479-2016-canal-menorca'],
};

const ESPACIOS = [
  // -- Eivissa y Formentera ---------------------------------------------------
  {
    zoneId: 'n2k-es0000515-espacio-marino-de-formentera-y-del-sur-de-ibiza--zepa--estatal',
    nombreCorto: 'ZEPA marina de Formentera y del sur de Ibiza (ES0000515)',
    resumen:
      'ZEPA marina estatal de 46.420 ha en torno a Formentera y al sur de Eivissa, declarada por ' +
      'las colonias de aves marinas. Se solapa con el parque de ses Salines y la reserva dels ' +
      'Freus, y es el régimen de esas figuras —no esta ZEPA— el que restringe allí la pesca.',
    normas: [NORMA_ORDEN_ZEPA_MARINAS],
    actividades: regimenSinDesarrollo(ZEPA),
  },
  {
    zoneId: 'n2k-es0000516-espacio-marino-del-poniente-y-norte-de-ibiza--zepa--estatal',
    nombreCorto: 'ZEPA marina del poniente y norte de Ibiza (ES0000516)',
    resumen:
      'ZEPA marina estatal de 47.069 ha frente a las costas oeste y norte de Eivissa. No impone ' +
      'por sí sola ninguna restricción a la pesca recreativa.',
    normas: [NORMA_ORDEN_ZEPA_MARINAS],
    actividades: regimenSinDesarrollo(ZEPA),
  },
  {
    zoneId: 'n2k-es0000517-espacio-marino-del-levante-de-ibiza--zepa--estatal',
    nombreCorto: 'ZEPA marina del levante de Ibiza (ES0000517)',
    resumen:
      'ZEPA marina estatal de 19.161 ha frente a la costa este de Eivissa, en el entorno de ' +
      'Tagomago. No impone por sí sola ninguna restricción a la pesca recreativa.',
    normas: [NORMA_ORDEN_ZEPA_MARINAS],
    actividades: regimenSinDesarrollo(ZEPA),
  },
  {
    zoneId: 'n2k-es5310108-area-marina-del-cap-martinet--zec--estatal',
    nombreCorto: 'ZEC Área marina del cap Martinet (ES5310108)',
    resumen:
      'ZEC marina de gestión estatal de 553 ha al este de Eivissa, frente al cap Martinet. Sus ' +
      'medidas de conservación prohíben fondear sobre fanerógamas, coralígeno y maërl; no regulan ' +
      'la pesca recreativa.',
    normas: [NORMA_ZEC_MARTINET],
    actividades: {
      pescaDesdeCosta: sinReglaMartinet(
        'El anexo I de la Orden AAA/1366/2016 no regula la pesca recreativa en esta ZEC: su ' +
          'apartado 1 se ocupa de la pesca profesional y de las capturas accidentales.',
      ),
      pescaRecreativaEmbarcacion: sinReglaMartinet(
        'El anexo I de la Orden AAA/1366/2016 no regula la pesca recreativa en esta ZEC: su ' +
          'apartado 1 se ocupa de la pesca profesional y de las capturas accidentales.',
      ),
      pescaSubmarina: sinReglaMartinet(
        'El anexo I de la Orden AAA/1366/2016 no regula la pesca recreativa en esta ZEC, tampoco ' +
          'la submarina: no existe ninguna prohibición derivada de esta figura.',
      ),
      buceo: sinReglaMartinet(
        'El apartado 9 del anexo I de la Orden AAA/1366/2016 solo prevé que se pueda limitar el ' +
          'número de inmersiones para preservar los hábitats sensibles. No consta que se haya ' +
          'limitado en esta ZEC, y el buceo no exige aquí autorización previa.',
      ),
      fondeo: {
        status: 'restricted',
        motivo:
          'El apartado 5 del anexo I de la Orden AAA/1366/2016 prohíbe fondear sobre praderas de ' +
          'fanerógamas marinas, fondos coralígenos y fondos de maërl, salvo en los puntos ' +
          'habilitados con las tecnologías menos lesivas.',
        conditions: [
          'Prohibido fondear sobre praderas de cualquier fanerógama marina —no solo posidonia y ' +
            'Cymodocea— y sobre fondos coralígenos y de maërl.',
          'Se exceptúan los puntos habilitados a tal efecto con las tecnologías menos lesivas para ' +
            'esos hábitats. No consta ninguno en esta ZEC.',
          ...CONDICIONES_FONDEO_POSIDONIA.slice(1),
        ],
        sources: [F_MARTINET, 'boe-rd-191-2026', 'boib-decret-25-2018-posidonia'],
      },
      navegacion: sinReglaMartinet(
        'El apartado 5 del anexo I de la Orden AAA/1366/2016 no limita la navegación de recreo en ' +
          'esta ZEC: se compromete a estudiar posibles límites de velocidad, sin fijar ninguno.',
      ),
    },
  },

  // -- Mallorca, Cabrera y Menorca --------------------------------------------
  {
    zoneId: 'n2k-es0000518-espacio-marino-del-sur-de-mallorca-y-cabrera--zepa--estatal',
    nombreCorto: 'ZEPA marina del sur de Mallorca y Cabrera (ES0000518)',
    resumen:
      'ZEPA marina estatal de 40.240 ha, desde la bahía de Palma hacia Cabrera y ses Salines, ' +
      'declarada por las colonias de aves marinas. No impone restricciones de pesca recreativa ni ' +
      'de buceo: la Orden que la declara no las regula y no tiene plan de gestión aprobado.',
    normas: [NORMA_ORDEN_ZEPA_MARINAS],
    actividades: regimenSinDesarrollo(ZEPA),
  },
  {
    zoneId: 'n2k-es0000519-espacio-marino-del-poniente-de-mallorca--zepa--estatal',
    nombreCorto: 'ZEPA marina del poniente de Mallorca (ES0000519)',
    resumen:
      'ZEPA marina estatal de 47.166 ha que bordea sa Dragonera, els Malgrats, els Conills y el ' +
      'Toro. Se solapa con varias reservas marinas, y es el régimen de esas reservas —no esta ' +
      'ZEPA— el que restringe allí la pesca.',
    normas: [NORMA_ORDEN_ZEPA_MARINAS],
    actividades: regimenSinDesarrollo(ZEPA),
  },
  {
    zoneId: 'n2k-es0000520-espacio-marino-del-norte-de-mallorca--zepa--estatal',
    nombreCorto: 'ZEPA marina del norte de Mallorca (ES0000520)',
    resumen:
      'ZEPA marina estatal de 99.072 ha frente a toda la costa norte de Mallorca. Es la figura más ' +
      'extensa del mapa y no impone por sí sola ninguna restricción a la pesca recreativa.',
    normas: [NORMA_ORDEN_ZEPA_MARINAS],
    actividades: regimenSinDesarrollo(ZEPA),
  },
  {
    zoneId: 'n2k-es0000521-espacio-marino-del-norte-y-oeste-de-menorca--zepa--estatal',
    nombreCorto: 'ZEPA marina del norte y oeste de Menorca (ES0000521)',
    resumen:
      'ZEPA marina estatal de 162.710 ha, la mayor de Baleares. Se solapa con la Reserva Marina del ' +
      'Nord de Menorca, y es el régimen de la reserva —no esta ZEPA— el que restringe allí la pesca.',
    normas: [NORMA_ORDEN_ZEPA_MARINAS],
    actividades: regimenSinDesarrollo(ZEPA),
  },
  {
    zoneId: 'n2k-es0000522-espacio-marino-del-sureste-de-menorca--zepa--estatal',
    nombreCorto: 'ZEPA marina del sureste de Menorca (ES0000522)',
    resumen:
      'ZEPA marina estatal de 23.778 ha frente al sudeste de Menorca, en el entorno de la Illa de ' +
      'l’Aire. No impone por sí sola ninguna restricción a la pesca recreativa.',
    normas: [NORMA_ORDEN_ZEPA_MARINAS],
    actividades: regimenSinDesarrollo(ZEPA),
  },
  {
    zoneId: 'n2k-eszz16002-canal-de-menorca--lic--estatal',
    nombreCorto: 'LIC Canal de Menorca (ESZZ16002)',
    resumen:
      'LIC marino estatal entre Mallorca y Menorca, con fondos de maërl, coralígeno y praderas de ' +
      'posidonia. Aviso aparte: la Orden AAA/1479/2016 estableció dentro del canal una zona ' +
      'protegida de pesca que afecta al arrastre, dragas, jábegas y redes similares —pesca ' +
      'profesional— sobre dos polígonos concretos que este mapa no tiene cargados.',
    normas: [
      NORMA_LIC_CANAL,
      {
        titulo:
          'Orden AAA/1479/2016, de 7 de septiembre, por la que se establece una zona protegida de pesca en el área del Canal de Menorca',
        fecha: '2016-09-07',
        url: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2016-8512',
        tipo: 'general',
      },
    ],
    actividades: regimenSinDesarrollo(LIC_CANAL),
  },
];

export default ESPACIOS.map((e) => ({ ...e, ultimaRevision: REVISION }));
