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
 * 13/06/2026. El PORN la repite en su art. 53.2.a.
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
 * EL PORN ESTÁ LEÍDO DESDE EL 2026-11-11. La primera versión de esta ficha se
 * quedó en el escalón de la ley y avisaba de que el articulado del Decreto
 * 27/2023 no estaba cargado. Lo que cambia al leerlo:
 *
 *  - **El fondeo tiene regla propia** (art. 78) y va más allá de la norma
 *    general: además de la posidonia y la Cymodocea, prohíbe fondear sobre
 *    poblaciones de Zostera y sobre fondos de maërl y coralígeno. No fija
 *    esloras, temporadas, distancias ni campos de boyas.
 *  - **El buceo está permitido** (art. 81.1), no pendiente de autorización. La
 *    ficha anterior lo deducía de la cláusula de cierre del art. 4.1.b de la
 *    ley —autorizable todo lo no definido— y empujaba a pedir un permiso que
 *    el buceador particular no necesita. Solo es autorizable con fines
 *    lucrativos o en grupos de más de doce. Mismo criterio que en s'Albufera
 *    des Grau: `restricted` con el umbral escrito en las condiciones.
 *  - **La navegación no es un vacío a rellenar por el órgano gestor.** El
 *    art. 76.2 permite los usos comunes «sin más limitaciones que las
 *    establecidas en este PORN», y el 76.4 enumera cuáles son.
 *  - **La pesca recreativa de superficie está permitida** (art. 53.1.a). Sigue
 *    en `restricted` porque el mismo artículo prohíbe los concursos y remite a
 *    las modalidades de la Reserva Marina del Migjorn.
 *
 * Por eso ya no se usa la cláusula de cierre del art. 4.1.b: sigue vigente,
 * pero el PORN ha definido estos seis usos y no queda silencio que interpretar.
 *
 * Aviso para quien vuelva a leer el decreto: el articulado solo está en el PDF
 * del BOIB, y su capa de texto no lleva tabla de caracteres. Un extractor
 * devuelve basura a partir de la página 24973; hay que leerlo en pantalla.
 */

const REVISION = '2026-11-11';

const NORMA_LEY = {
  titulo:
    'Ley 2/2017, de 27 de junio, de declaración del Parc Natural Maritimoterrestre Es Trenc-Salobrar de Campos',
  fecha: '2017-06-27',
  url: 'https://www.caib.es/sites/institutestudisautonomics/f/232570',
  tipo: 'creacion',
};

const NORMA_PORN = {
  titulo:
    'Decreto 27/2023, de 8 de mayo, por el que se aprueba el Plan de ordenación de los recursos naturales (PORN) de Es Trenc-Salobrar de Campos',
  fecha: '2023-05-08',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2023/05/08/27/dof/spa/pdf',
  tipo: 'general',
};

const LEY = 'boib-ley-2-2017-es-trenc';
const PORN = 'boib-decreto-27-2023-porn-es-trenc';

const ALTERACION_SIGNIFICATIVA =
  'Prohibida cualquier actividad que suponga una alteración significativa de los hábitats y las ' +
  'especies del parque (art. 4.1.c de la Ley 2/2017).';

/** Régimen común a las dos modalidades de pesca de superficie (art. 53). */
const PESCA_SUPERFICIE = {
  status: 'restricted',
  motivo:
    'El art. 53.1 del PORN permite en el mar la pesca recreativa de artes menores, con las ' +
    'modalidades que fijan la normativa de pesca y la de la Reserva Marina del Migjorn de ' +
    'Mallorca, y el art. 53.2 prohíbe los concursos de pesca.',
  conditions: [
    'Permitida la pesca recreativa de artes menores, en las modalidades de la normativa general ' +
      'de pesca y de la Reserva Marina del Migjorn de Mallorca (art. 53.1).',
    'Prohibidos los concursos de pesca (art. 53.2.a).',
    'Las capturas accidentales de las especies del anexo 3 del PORN deben devolverse de inmediato ' +
      'al mar (art. 53.3).',
    'Prohibida la pesca en las balsas litorales, lagunas salobres y estanques salineros del ' +
      'parque (art. 52).',
    ALTERACION_SIGNIFICATIVA,
    'El futuro PRUG concretará el régimen de la actividad pesquera a partir de un estudio que el ' +
      'PORN encarga (art. 53.4). Todavía no está aprobado.',
  ],
  sources: [PORN, LEY],
};

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
          'El PORN la repite en su art. 53.2.a, junto a la del arrastre, el cerco, el palangre de superficie y los concursos de pesca.',
        ],
        sources: [LEY, PORN],
      },

      pescaDesdeCosta: PESCA_SUPERFICIE,
      pescaRecreativaEmbarcacion: PESCA_SUPERFICIE,

      // `restricted` y no `allowed_with_authorization`: el art. 81.1 permite el
      // buceo y solo lo hace autorizable por encima de un umbral. Marcarlo como
      // «requiere autorización» mandaría a tramitar un permiso a quien no lo
      // necesita.
      buceo: {
        status: 'restricted',
        motivo:
          'El art. 81 del PORN permite el submarinismo deportivo con escafandra o en apnea. Solo exige ' +
          'autorización cuando tiene finalidad lucrativa o se hace en grupos de más de doce ' +
          'personas, y fija un máximo de cuarenta buceadores al día.',
        conditions: [
          'Permitido sin autorización para el buceador particular, con escafandra o en apnea (art. 81.1).',
          'Requiere autorización del órgano gestor si la actividad es lucrativa o el grupo pasa de 12 personas (art. 81.2).',
          'Máximo de cuarenta buceadores al día en todo el ámbito marino (art. 81.2).',
          'Prohibidos los propulsores acuáticos para buceo y los scooters submarinos (art. 76.4.b).',
          'Los buceadores no pueden llevar instrumentos de pesca submarina: la actividad está prohibida en todo el ámbito marino (art. 4.1.c de la Ley 2/2017).',
          'Prohibido alimentar a la fauna (art. 76.4.e).',
          'La dirección general puede añadir por resolución límites por zonas o por temporadas (art. 81.3).',
        ],
        sources: [PORN, LEY],
      },

      fondeo: {
        status: 'restricted',
        motivo:
          'El art. 78 del PORN prohíbe fondear sobre Posidonia oceanica y también sobre praderas de ' +
          'Cymodocea nodosa, poblaciones de Zostera y fondos de maërl y coralígeno. Es la regulación ' +
          'del fondeo que el art. 4.2 de la Ley 2/2017 le encargaba.',
        conditions: [
          'Prohibido fondear sobre Posidonia oceanica (art. 78.1, que remite al Decret 25/2018).',
          'Prohibido también sobre praderas de Cymodocea nodosa, poblaciones de Zostera y fondos de maërl y coralígeno (art. 78.3).',
          'El órgano gestor puede señalizar o balizar áreas en restauración sobre las que no se puede fondear (art. 78.2).',
          'En arena próxima a una pradera tampoco, si la cadena queda sobre ella o el borneo la alcanza (Real Decreto 191/2026).',
          'En las zonas de baño rige el art. 73 del Reglamento General de Costas, y su balizamiento no puede quedar a menos de 200 m de la playa ni de 50 m de los islotes (art. 79).',
          'Es Trenc es uno de los sistemas litorales con más superficie de fanerógamas marinas de Mallorca: aquí estas prohibiciones afectan a buena parte del fondo.',
          'El PORN no fija esloras máximas, temporadas ni campos de boyas. Puede hacerlo el futuro PRUG, que todavía no está aprobado (art. 75.3).',
        ],
        sources: [PORN, LEY, 'boib-decret-25-2018-posidonia', 'boe-rd-876-2014-costas', 'boe-rd-191-2026'],
      },

      navegacion: {
        status: 'restricted',
        motivo:
          'El art. 76 del PORN permite los usos comunes del mar sin más límites que los suyos, y ' +
          'enumera cuáles son: prohíbe en todo el ámbito marino el esquí náutico, las motos ' +
          'acuáticas, las fiestas a bordo y la botadura de embarcaciones a motor.',
        conditions: [
          'Prohibida la circulación de embarcaciones rápidas motorizadas como el esquí bus y el esquí náutico (art. 76.4.a).',
          'Prohibidas las motos acuáticas y los aparatos remolcados o traccionados por embarcaciones: esquí, paracaidismo, flotadores y similares (art. 76.4.b).',
          'Prohibido el desembarco y la botadura de embarcaciones a motor (art. 76.4.c).',
          'Prohibidas las fiestas en embarcaciones, party boats o asimilables (art. 76.4.d).',
          'Prohibido desembarcar en los islotes (art. 76.4.f).',
          'Vela, remo, kayak, paddle surf y kitesurf están permitidos fuera de la zona de baño; requieren autorización si son lucrativos o en grupos de más de 20 personas (art. 80).',
          'En verano la entrada y salida se hace por las zonas autorizadas. En temporada baja, o si no hay balizamiento, por una franja de 100 m junto a los núcleos de sa Ràpita y sa Colònia de Sant Jordi (art. 80.3).',
          'Las excursiones marítimas comerciales y el transporte colectivo de viajeros requieren autorización (art. 76.3).',
        ],
        sources: [PORN, LEY],
      },
    },
  },
];
