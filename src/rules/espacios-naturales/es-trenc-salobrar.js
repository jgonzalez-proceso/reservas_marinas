/**
 * Parc Natural Maritimoterrestre Es Trenc-Salobrar de Campos — ámbito marino.
 *
 * Esta ficha existe porque el mapa contestaba «no determinable» a la pesca
 * submarina en 2.326 ha de mar donde una ley la prohíbe con todas las letras.
 * El art. 4.1.c de la Ley 2/2017 dice literalmente, entre los usos prohibidos
 * del ámbito marino del parque: «Hi són prohibides l'aqüicultura intensiva, la
 * pesca submarina i qualsevol activitat que suposi una alteració significativa
 * dels hàbitats i les espècies del parc».
 *
 * La prohibición **no depende del PRUG ni del PORN**: nace de la ley de
 * declaración, en vigor desde 2017, y sigue igual en la versión consolidada de
 * 13/06/2026.
 *
 * Y no depende tampoco de la zonificación interior. El art. 4 se dirige al
 * «àmbit marí del Parc Natural» entero, sin distinguir zonas, así que la regla
 * se ata al polígono marino del parque —el que publica la capa de límites del
 * IDEIB como AMBIT='Marí'— y no a una categoría de la zonificación del PORN.
 *
 * Comprobado sobre las geometrías oficiales: la zonificación marina del PORN
 * (capa 27 del servicio GOIB_NATURA_ENP_IB) suma 2.325,6 ha entre su zona de
 * uso limitado y sus dos de uso compatible, frente a las 2.326,0 ha del
 * polígono de límites, y los 3.264 puntos muestreados dentro de la zonificación
 * caen todos dentro de ese polígono. Atar la prohibición al límite la aplica al
 * ámbito marino completo sin depender de que las piezas de la zonificación
 * teselen el parque sin huecos.
 *
 * El resto de actividades se escriben con lo que dice la propia ley y se marcan
 * como remitidas al PORN de 2023 (Decreto 27/2023), cuyo articulado no está
 * cargado en este mapa. El art. 4.1.b es una cláusula de cierre importante: son
 * autorizables «tots els no definits com a permesos o prohibits», así que en
 * este parque el silencio de la norma no significa libertad.
 */

const REVISION = '2026-08-17';

const NORMA_LEY = {
  titulo:
    'Ley 2/2017, de 27 de junio, de declaración del Parc Natural Maritimoterrestre Es Trenc-Salobrar de Campos',
  fecha: '2017-06-27',
  url: 'https://www.caib.es/sites/institutestudisautonomics/f/232570',
  tipo: 'creacion',
};

const NORMA_PORN = {
  titulo:
    'Decreto 27/2023, de 8 de mayo, por el que se aprueba el Plan de Ordenación de los Recursos Naturales de Es Trenc-Salobrar de Campos',
  fecha: '2023-05-08',
  url: 'https://www.caib.es/sites/espaisnaturalsprotegits/es/n_parque_natural_maritimoterrestre_es_trenc-salobrar_de_campos',
  tipo: 'modificacion',
};

const FUENTES = ['boib-ley-2-2017-es-trenc'];
const FUENTES_CON_PORN = [...FUENTES, 'caib-espacio-es-trenc'];

/**
 * Aviso que acompaña a todo lo que la ley no resuelve por sí sola.
 *
 * Se dice en vez de callarlo: el PORN está aprobado y desarrolla el art. 4, y
 * quien consulte tiene derecho a saber que esta ficha se queda en el escalón de
 * la ley. No afecta a la pesca submarina, que la ley prohíbe directamente.
 */
const AVISO_PORN =
  'El PORN aprobado por el Decreto 27/2023 desarrolla estas normas y su articulado no está ' +
  'cargado en este mapa: antes de salir conviene consultarlo. La prohibición de pesca submarina ' +
  'no depende de él, porque la impone directamente el art. 4.1.c de la Ley 2/2017.';

const CIERRE_4_1_B =
  'El art. 4.1.b cierra el régimen: son autorizables todos los usos que no estén expresamente ' +
  'definidos como admitidos ni como prohibidos. Aquí el silencio de la norma no equivale a ' +
  'libertad, sino a necesidad de autorización del órgano gestor del parque.';

const ALTERACION_SIGNIFICATIVA =
  'Prohibida cualquier actividad que suponga una alteración significativa de los hábitats y las ' +
  'especies del parque (art. 4.1.c).';

export default [
  {
    zoneId:
      'enp-es0000037-parc-natural-maritimoterrestre-es-trenc-salobrar-de-campos--parc-natural--mari',
    nombreCorto: 'Parc Natural Maritimoterrestre Es Trenc-Salobrar de Campos (ámbito marino)',
    resumen:
      'Ámbito marino de 2.326 ha del parque natural, frente a es Trenc, es Salobrar de Campos y ses ' +
      'Salines de sa Colònia de Sant Jordi. La pesca submarina está prohibida en todo él por el ' +
      'art. 4.1.c de la Ley 2/2017 de declaración, sin depender de ningún plan posterior.',
    normas: [NORMA_LEY, NORMA_PORN],
    ultimaRevision: REVISION,
    actividades: {
      // El motivo de esta ficha.
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'La pesca submarina está expresamente prohibida en todo el ámbito marino del Parc Natural ' +
          'Maritimoterrestre Es Trenc-Salobrar de Campos. El art. 4.1.c de la Ley 2/2017 la enumera ' +
          'entre los usos prohibidos, junto a la acuicultura intensiva y a cualquier actividad que ' +
          'suponga una alteración significativa de los hábitats y las especies del parque.',
        conditions: [
          'La prohibición alcanza el ámbito marino completo del parque, sin distinguir zonas de la zonificación del PORN.',
          'No depende de la aprobación de ningún PRUG: deriva directamente de la ley de declaración, en vigor desde 2017.',
        ],
        sources: FUENTES,
      },

      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'El art. 4.1.a de la Ley 2/2017 admite en el ámbito marino los usos pesqueros y los usos ' +
          'comunes del art. 31 de la Ley de Costas —entre ellos pescar—, pero solo en la medida en que ' +
          'sean compatibles con los objetivos de protección del espacio y conforme al instrumento de ' +
          'planificación, que puede regularlos y ordenarlos.',
        conditions: [ALTERACION_SIGNIFICATIVA, CIERRE_4_1_B, AVISO_PORN],
        sources: FUENTES_CON_PORN,
      },

      pescaRecreativaEmbarcacion: {
        status: 'restricted',
        motivo:
          'Mismo régimen que la pesca desde costa: el art. 4.1.a la admite como uso pesquero y como uso ' +
          'común del art. 31 de la Ley de Costas, condicionada a la compatibilidad con los objetivos de ' +
          'protección y a lo que disponga el instrumento de planificación.',
        conditions: [ALTERACION_SIGNIFICATIVA, CIERRE_4_1_B, AVISO_PORN],
        sources: FUENTES_CON_PORN,
      },

      buceo: {
        status: 'restricted',
        motivo:
          'La ley de declaración no enumera el buceo ni entre los usos admitidos ni entre los ' +
          'prohibidos, y el art. 4.1.b hace autorizables precisamente los usos no definidos como una ' +
          'cosa ni la otra. Corresponde al PORN concretar en qué condiciones.',
        conditions: [
          CIERRE_4_1_B,
          'Los buceadores no pueden llevar instrumentos de pesca submarina: la actividad está prohibida en todo el ámbito marino (art. 4.1.c).',
          AVISO_PORN,
        ],
        sources: FUENTES_CON_PORN,
      },

      fondeo: {
        status: 'restricted',
        motivo:
          'El art. 4.2 de la Ley 2/2017 encarga al PORN regular específicamente el anclaje, el fondeo, ' +
          'el amarre y la circulación de embarcaciones en el ámbito marino del parque. Rige además, en ' +
          'todo el Mediterráneo español, la prohibición de fondear sobre praderas de fanerógamas.',
        conditions: [
          'Prohibido fondear sobre praderas de Posidonia oceanica y de Cymodocea nodosa, y en arena próxima si la cadena o el ancla acaban afectando a la pradera (RD 191/2026).',
          'Es Trenc es uno de los sistemas litorales con más superficie de fanerógamas marinas de Mallorca: aquí esa prohibición general afecta a buena parte del fondo.',
          AVISO_PORN,
        ],
        sources: [...FUENTES_CON_PORN, 'boe-rd-191-2026'],
      },

      navegacion: {
        status: 'restricted',
        motivo:
          'El art. 4.2 de la Ley 2/2017 remite al PORN la regulación específica de la circulación de ' +
          'embarcaciones y del transporte colectivo de viajeros por mar dentro del ámbito marino del ' +
          'parque.',
        conditions: [CIERRE_4_1_B, AVISO_PORN],
        sources: FUENTES_CON_PORN,
      },
    },
  },
];
