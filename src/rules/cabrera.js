/**
 * Parque Nacional Marítimo-Terrestre del Archipiélago de Cabrera.
 *
 * No es una reserva marina y no se modela como tal. Es un parque nacional, con
 * su propia ley de creación (Ley 14/1991) y su Plan Rector de Uso y Gestión, y
 * su régimen es más restrictivo que el de cualquier reserva: aquí la pesca
 * recreativa está prohibida **en todas sus modalidades**, y navegar, fondear o
 * bucear requiere autorización administrativa previa.
 *
 * Son siete fichas repartidas entre dos fuentes —el límite del parque y su
 * zonificación— y salen todas del mismo PRUG, así que van en un solo fichero,
 * como s'Albufera des Grau y ses Salines.
 *
 * LA FICHA DEL PARQUE SOLA CONTESTABA DE MÁS. Hasta el 2026-11-11 solo estaba
 * cargado el límite, y el motor contestaba «con autorización» al fondeo, a la
 * navegación y al buceo en los 895 km². El PRUG no dice eso. Dice que se puede
 * fondear en cuatro sitios —las boyas del puerto y tres zonas de fondeo
 * diurno—, bucear con escafandra en otros cuatro, y que en las zonas de
 * reserva marina no se navega ni se fondea. La zonificación la publica el
 * IDEIB (capa 22 de GOIB_NATURA_ENP_IB, 19 polígonos marinos) y se carga tal
 * cual: redibujarla desde las coordenadas UTM del PRUG sería introducir un
 * error donde hay un dato oficial.
 *
 * POR QUÉ LA FICHA DEL PARQUE SIGUE EN «CON AUTORIZACIÓN». El motor apila las
 * figuras y deja mandar a la más restrictiva. Si el parque dijera «prohibido»
 * al fondeo —que es lo cierto en la mayor parte de su superficie— ganaría
 * también dentro de las zonas de fondeo diurno y del puerto, donde sí se puede.
 * Así que el parque publica el régimen de fondo —todo exige autorización— y
 * cada categoría de la zonificación endurece lo suyo. La zona de uso moderado
 * es la que lleva la prohibición de fondear, porque es «todas las aguas
 * restantes del parque».
 *
 * Eso deja un hueco que conviene tener presente: las aguas incorporadas en la
 * ampliación de 2019 no están en la capa de zonificación, que se dibujó sobre
 * el parque anterior. Allí el punto solo cae en el límite del parque y la
 * respuesta al fondeo es «con autorización», con la primera condición diciendo
 * que fuera de las zonas habilitadas no hay dónde fondear. Es agua profunda y
 * abierta, pero la respuesta se queda corta por construcción y no por descuido.
 *
 * CITAS. El PRUG solo se publicó en catalán (BOIB núm. 97, de 11 de julio de
 * 2006). Lo que aquí va entre comillas angulares es traducción propia; el
 * apartado citado permite ir al original.
 *
 * DOS COSAS QUE EL PRUG NO DEJA CLARAS, escritas en vez de resueltas en
 * silencio:
 *
 *  - Las zonas de regeneración son dos, ses Rates y los fondos de maërl, y la
 *    frase «el anclaje, el buceo y la navegación deportiva no están
 *    permitidos» está en el epígrafe de ses Rates (2.1.1.b.2.III), no en el
 *    del maërl. El IDEIB publica las dos bajo una misma categoría y aquí
 *    comparten ficha. Fondeo y buceo van prohibidos en las dos, porque el
 *    maërl tampoco es zona de fondeo ni de buceo. La navegación NO: la primera
 *    versión la prohibía también en el rectángulo de maërl, deduciéndolo del
 *    2.1.2.b.5 («solo se permite la pesca profesional»), y esa frase regula
 *    artes de pesca, no el paso de embarcaciones. Era inventar una prohibición
 *    sobre 514 ha de mar abierto que hay que cruzar para llegar a Cabrera
 *    desde el suroeste. Queda en `restricted`, con ses Rates dicho en las
 *    condiciones.
 *  - El 2.1.2.b.3 prevé un sistema rotatorio con un máximo de tres zonas de
 *    buceo abiertas, y el 2.3.4.7 dice que se abren las cuatro a la vez. Cuáles
 *    lo están en cada momento consta en la autorización.
 */

import { permiso } from './schema.js';

const REVISION = '2026-11-11';

const NORMA_PRUG = {
  titulo:
    'Decreto 58/2006, de 1 de julio, por el que se aprueba el Plan Rector de Uso y Gestión del Parque Nacional Marítimo-Terrestre del Archipiélago de Cabrera para el periodo 2006-2012',
  fecha: '2006-07-01',
  url: 'https://www.miteco.gob.es/content/dam/miteco/es/parques-nacionales-oapn/red-parques-nacionales/parques-nacionales/PRUGCabrera_tcm30-62821.pdf',
  tipo: 'general',
};

const NORMA_AMPLIACION = {
  titulo:
    'Acuerdo del Consejo de Ministros de 1 de febrero de 2019 por el que se amplían los límites del Parque Nacional Marítimo-Terrestre del Archipiélago de Cabrera',
  fecha: '2019-02-01',
  url: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2019-2215',
  tipo: 'modificacion',
};

const NORMAS = [NORMA_PRUG, NORMA_AMPLIACION];

// Las tres autorizaciones se piden por el mismo portal del parque. El PRUG no
// fija importe, así que `null`: no publicado, que no es lo mismo que gratuito.
const permisoParque = (nota, vigencia) =>
  permiso({
    importe: null,
    nota,
    vigencia,
    url: 'https://www.caib.es/rescabfront/?lang=es',
    ultimaVerificacion: '2026-08-15',
  });

const PERMISO_NAVEGACION = permisoParque(
  'Autorización de navegación del parque nacional. En la solicitud constan los datos del patrón, del armador y de la embarcación.',
  'Anual',
);

const PERMISO_FONDEO = permisoParque(
  'Autorización de fondeo o pernocta del parque nacional. Se solicita con un máximo de veinte días de antelación y un mínimo de dos, y hay que confirmarla el día de llegada antes de las 17.00 h.',
  'De 1 a 7 días',
);

const PERMISO_BUCEO = permisoParque(
  'Autorización de buceo del parque nacional. Exige acreditar el nivel de formación mínimo requerido.',
  'Según autorización',
);

const FUENTES_PARQUE = ['prug-cabrera', 'rescab-autorizaciones', 'boe-ampliacion-cabrera-2019'];
const FUENTES_ZONA = ['prug-cabrera', 'ideib-zonificacion-cabrera'];

const PARQUE = 'enp-es530002-parc-nacional-maritimoterrestre-de-l-arxipelag-de-cabrera--parc-nacional--mari';
const zona = (categoria) =>
  `zon-02-ca-parc-nacional-maritimoterrestre-de-l-arxipelag-de-cabrera--${categoria}--mari`;

// Condiciones del buceo que valen en cualquier parte del parque. Se repiten en
// la ficha de las zonas de buceo porque allí gana la zona, que es más
// específica, y las condiciones de la figura más general no se muestran.
const BUCEO_SIN_INSTRUMENTOS =
  'Prohibido llevar cualquier instrumento utilizable para pescar o extraer especies marinas, ' +
  'salvo el cuchillo reglamentario.';
const BUCEO_SIN_TORPEDOS = 'Prohibido el uso de torpedos o scooters subacuáticos.';
const BUCEO_NO_DESDE_TIERRA = 'Prohibidas las inmersiones desde tierra.';
const BUCEO_SIN_RECOLECCION =
  'Prohibida la recolección o extracción de organismos, vivos o muertos, salvo por motivos ' +
  'científicos previamente justificados y autorizados.';
const APNEA_MAYO_JUNIO =
  'Prohibido el buceo en apnea en mayo y junio en las zonas de desove de la cigarra de mar.';

const SOLO_EN_ZONAS_DE_BUCEO =
  'Con escafandra autónoma solo se bucea en las cuatro zonas de buceo del parque: ses Bledes, ' +
  'el pecio Ana Rosa, Cala Galiota y el suroeste de l’illa dels Conills. Este mapa las dibuja ' +
  'como figura aparte.';

/**
 * La zonificación no toca la pesca: la prohíbe el parque entero.
 *
 * `not_regulated` y no `prohibited`. La prohibición es del apartado 2.2.jj, que
 * rige en todo el parque, y repetirla en cada categoría haría figurar a la zona
 * como la que la impone. El parque gana por rango y la respuesta es la misma.
 */
const pescaNoLaTocaLaZona = () => ({
  status: 'not_regulated',
  motivo:
    'La zonificación del PRUG no cambia el régimen de la pesca recreativa: está prohibida en ' +
    'todas sus modalidades en el parque entero, también aquí.',
  sources: FUENTES_ZONA,
});

/** Navegación que la zona no altera: rige la autorización del parque. */
const navegacionDelParque = () => ({
  status: 'not_regulated',
  motivo:
    'Esta categoría de la zonificación no añade nada a la navegación: rige el régimen general ' +
    'del parque, que exige autorización.',
  sources: FUENTES_ZONA,
});

const PESCA_ZONA = {
  pescaDesdeCosta: pescaNoLaTocaLaZona(),
  pescaRecreativaEmbarcacion: pescaNoLaTocaLaZona(),
  pescaSubmarina: pescaNoLaTocaLaZona(),
};

const NOMBRE = 'Parque Nacional de Cabrera';

export default [
  // ---------------------------------------------------------------------------
  // Límite del parque: el régimen de fondo
  // ---------------------------------------------------------------------------
  {
    zoneId: PARQUE,
    nombreCorto: 'Parque Nacional del Archipiélago de Cabrera (ámbito marino)',
    resumen:
      'Ámbito marino del parque nacional, 895 km². La pesca recreativa está prohibida en todas sus ' +
      'modalidades, incluida la submarina; la única actividad extractiva admitida es la pesca ' +
      'artesanal tradicional profesional de los barcos censados. Navegar, fondear y bucear exigen ' +
      'autorización previa del parque.',
    normas: NORMAS,
    ultimaRevision: REVISION,
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'El apartado jj) de los usos prohibidos del PRUG prohíbe «el ejercicio de la pesca deportiva ' +
          'en cualquiera de sus modalidades». El apartado kk) prohíbe además toda actividad que suponga ' +
          'explotación directa de los recursos naturales, salvo la pesca artesanal tradicional de ' +
          'carácter profesional.',
        sources: ['prug-cabrera'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'El apartado jj) de los usos prohibidos del PRUG prohíbe «el ejercicio de la pesca deportiva ' +
          'en cualquiera de sus modalidades», sin excepción para la pesca desde embarcación.',
        conditions: [
          'La única actividad pesquera extractiva admitida es la profesional artesanal, tradicional y ' +
            'selectiva de las embarcaciones incluidas en el censo del parque, y solo en las ' +
            'modalidades y épocas expresamente autorizadas.',
        ],
        sources: ['prug-cabrera'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'La pesca deportiva está prohibida «en cualquiera de sus modalidades» (apartado jj), lo que ' +
          'incluye la submarina. El apartado mm) prohíbe además llevar durante la inmersión cualquier ' +
          'instrumento utilizable para pescar o extraer especies marinas, salvo el cuchillo ' +
          'reglamentario.',
        // La veda de apnea de mayo y junio no se repite aquí: es una
        // restricción de inmersión, no de pesca, y vive en `buceo`. Colgarla de
        // una actividad ya prohibida sugería que la prohibición dependiera de
        // la época, cuando rige todo el año.
        sources: ['prug-cabrera'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El apartado mm) del PRUG prohíbe bucear sin la correspondiente autorización administrativa y ' +
          'sin acreditar el nivel de formación mínimo exigido.',
        conditions: [
          SOLO_EN_ZONAS_DE_BUCEO,
          BUCEO_NO_DESDE_TIERRA,
          BUCEO_SIN_TORPEDOS,
          BUCEO_SIN_INSTRUMENTOS,
          BUCEO_SIN_RECOLECCION,
          APNEA_MAYO_JUNIO,
        ],
        permit: PERMISO_BUCEO,
        sources: FUENTES_PARQUE,
      },
      fondeo: {
        status: 'allowed_with_authorization',
        motivo:
          'El apartado 2.3.3 del PRUG considera el anclaje actividad compatible pero sujeta a ' +
          'autorización administrativa previa, y solo lo admite en el puerto de Cabrera y en tres ' +
          'zonas de fondeo diurno.',
        conditions: [
          'Fuera de las boyas del puerto y de las tres zonas de fondeo diurno —es Burri, la zona del ' +
            'muelle y la Coveta Roja— no se puede fondear en ningún punto del parque. Este mapa ' +
            'dibuja esas zonas como figura aparte: conviene comprobar en cuál cae el punto.',
          'Fondeo diurno entre una hora después del amanecer y una hora antes del ocaso: 30 fondeos ' +
            'en es Burri, 12 en la zona del muelle y 8 en la Coveta Roja.',
          'Hay que respetar en todo momento los fondos cubiertos por praderas de posidonia.',
          'Solo se puede pernoctar en la zona de uso especial del puerto de Cabrera, en las cincuenta ' +
            'boyas de amarre habilitadas.',
          'En las aguas incorporadas al parque en 2019 el PRUG no delimita ninguna zona de fondeo: ' +
            'tampoco allí hay dónde fondear con autorización.',
        ],
        permit: PERMISO_FONDEO,
        sources: FUENTES_PARQUE,
      },
      navegacion: {
        status: 'allowed_with_authorization',
        motivo:
          'El apartado ll) de los usos prohibidos del PRUG prohíbe la navegación por el interior de las ' +
          'aguas del parque salvo la necesaria para los fines de la ley de creación, la pesca artesanal ' +
          'censada, el uso público y la gestión del parque y el salvamento marítimo. Navegar con ' +
          'embarcación propia exige por tanto autorización.',
        conditions: [
          'Velocidad máxima de diez nudos en el parque y de dos nudos dentro del puerto.',
          'Hay que evitar ruidos excesivos —motores, bocinas, música— para no alterar las colonias de ' +
            'aves que anidan en estas costas.',
          'El desembarco está restringido a los lugares autorizados.',
          'La autorización permite amarrar a las boyas del puerto o fondear en las zonas de uso ' +
            'restringido de fondeo diurno.',
          'En las zonas de reserva marina y en la de regeneración de ses Rates no se puede navegar ' +
            'aunque se tenga la autorización. Este mapa las dibuja como figura aparte.',
        ],
        permit: PERMISO_NAVEGACION,
        sources: FUENTES_PARQUE,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Zonas de reserva marina: ni navegar ni fondear
  // ---------------------------------------------------------------------------
  {
    zoneId: zona('zona-de-reserva'),
    nombreCorto: `${NOMBRE} — zonas de reserva marina`,
    resumen:
      'Cinco zonas de reserva marina —Cala Emboixar, Cala Santa Maria, l’Olla, el Codolar de ' +
      'l’Imperial y els Estells— y una franja de 20 m alrededor de los Estells de Fora y del ' +
      'illot Imperial, 213 ha en total. No se puede navegar ni fondear en ellas.',
    normas: NORMAS,
    ultimaRevision: REVISION,
    actividades: {
      ...PESCA_ZONA,
      fondeo: {
        status: 'prohibited',
        motivo:
          'El apartado 2.1.2.a.3 del PRUG no permite ni la navegación ni el anclaje en las zonas ' +
          'marinas de reserva, salvo por motivos de gestión o de seguridad de las personas.',
        conditions: [
          'Sin excepción para quien tenga autorización de navegación o de fondeo del parque: esas ' +
            'autorizaciones no habilitan a entrar aquí.',
        ],
        sources: FUENTES_ZONA,
      },
      navegacion: {
        status: 'prohibited',
        motivo:
          'El apartado 2.1.2.a.3 del PRUG no permite ni la navegación ni el anclaje en las zonas ' +
          'marinas de reserva, salvo por motivos de gestión o de seguridad de las personas.',
        conditions: [
          'La autorización anual de navegación del parque no habilita a cruzar estas zonas.',
        ],
        sources: FUENTES_ZONA,
      },
      buceo: {
        status: 'prohibited',
        motivo:
          'Las zonas de reserva no están entre las cuatro zonas de buceo del parque, y el PRUG ' +
          'prohíbe además navegar por ellas: no hay forma de bucear aquí.',
        conditions: [SOLO_EN_ZONAS_DE_BUCEO],
        sources: FUENTES_ZONA,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Zonas de regeneración: ses Rates y los fondos de maërl
  // ---------------------------------------------------------------------------
  {
    zoneId: zona('zona-d-us-restringit-zona-de-regeneracio'),
    nombreCorto: `${NOMBRE} — zonas de regeneración`,
    resumen:
      'Dos zonas de uso restringido en regeneración: la de l’illa de ses Rates y el rectángulo de ' +
      'los fondos de maërl, al suroeste, 563 ha en total. El PRUG solo permite en ellas la pesca ' +
      'profesional, y con límites.',
    normas: NORMAS,
    ultimaRevision: REVISION,
    actividades: {
      ...PESCA_ZONA,
      fondeo: {
        status: 'prohibited',
        motivo:
          'En la zona de regeneración de ses Rates el PRUG dice expresamente que el anclaje no está ' +
          'permitido (apartado 2.1.1.b.2), y ninguna de las dos zonas de regeneración está entre ' +
          'los lugares donde deja fondear: el puerto y las tres zonas de fondeo diurno (apartado ' +
          '2.3.3.1).',
        conditions: [
          'En la zona de los fondos de maërl queda prohibido incluso a la pesca profesional cualquier ' +
            'arte o aparejo que toque el fondo (apartado 2.1.2.b.5).',
          'Para fondear de día hay que ir a es Burri, a la zona del muelle o a la Coveta Roja; para ' +
            'pasar la noche, a las boyas del puerto. Este mapa dibuja esas zonas como figura aparte.',
        ],
        sources: FUENTES_ZONA,
      },
      // `restricted` y no `prohibited`: la prohibición solo está escrita para una
      // de las dos zonas que comparten esta ficha. Ver la cabecera.
      navegacion: {
        status: 'restricted',
        motivo:
          'El apartado 2.1.1.b.2 del PRUG dice que en la zona de regeneración de l’illa de ses Rates ' +
          'la navegación deportiva no está permitida. Para la de los fondos de maërl no lo dice: ' +
          'allí rige la autorización general de navegación del parque.',
        conditions: [
          'Zona de l’illa de ses Rates: prohibida la navegación deportiva, ' +
            'también con la autorización anual del parque.',
          'Zona de los fondos de maërl, el rectángulo del suroeste: se puede navegar con la ' +
            'autorización del parque, a diez nudos como máximo. Lo que no se puede es fondear.',
        ],
        permit: PERMISO_NAVEGACION,
        sources: [...FUENTES_ZONA, 'rescab-autorizaciones'],
      },
      buceo: {
        status: 'prohibited',
        motivo:
          'El apartado 2.1.1.b.2 del PRUG dice de la zona de regeneración de ses Rates que el buceo ' +
          'no está permitido, y ninguna de las dos zonas de regeneración está entre las cuatro ' +
          'zonas de buceo del parque.',
        conditions: [SOLO_EN_ZONAS_DE_BUCEO],
        sources: FUENTES_ZONA,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Zonas de buceo
  // ---------------------------------------------------------------------------
  {
    zoneId: zona('zona-d-us-restringit-zona-de-busseig'),
    nombreCorto: `${NOMBRE} — zonas de buceo`,
    resumen:
      'Las cuatro zonas donde el PRUG admite el buceo con escafandra autónoma: ses Bledes, el pecio ' +
      'Ana Rosa, Cala Galiota y el suroeste de l’illa dels Conills, 25 ha en total. Hace falta ' +
      'autorización de la Dirección del parque.',
    normas: NORMAS,
    ultimaRevision: REVISION,
    actividades: {
      ...PESCA_ZONA,
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El apartado 2.3.4 del PRUG reserva el buceo con escafandra autónoma a estas zonas y lo ' +
          'somete a autorización de la Dirección del parque, con un máximo de cuarenta buceadores ' +
          'al día.',
        conditions: [
          'Máximo de 40 buceadores al día en todo el parque: 28 plazas para clubes y empresas, en dos ' +
            'embarcaciones de 14 personas como máximo, y 12 para particulares, en dos embarcaciones ' +
            'como máximo.',
          'Pecio Ana Rosa: una embarcación y diez buceadores al día, solo con titulación mínima ' +
            'Advanced o equivalente.',
          'No todas las zonas están abiertas siempre: el PRUG prevé una rotación con un máximo de ' +
            'tres abiertas (apartado 2.1.2.b.3) y a la vez dice que se abren las cuatro (2.3.4.7). ' +
            'Cuáles lo están consta en la autorización.',
          'La autorización de buceo no permite bajar a tierra ni fondear en otras áreas del parque.',
          BUCEO_NO_DESDE_TIERRA,
          BUCEO_SIN_TORPEDOS,
          BUCEO_SIN_INSTRUMENTOS,
          BUCEO_SIN_RECOLECCION,
          APNEA_MAYO_JUNIO,
        ],
        permit: PERMISO_BUCEO,
        sources: [...FUENTES_ZONA, 'rescab-autorizaciones'],
      },
      fondeo: {
        status: 'restricted',
        motivo:
          'En las zonas de buceo solo puede quedarse la embarcación de apoyo de una inmersión ' +
          'autorizada, amarrada a las boyas temporales y no más de seis horas (apartado 2.3.4.2).',
        conditions: [
          'Solo la embarcación de apoyo de una inmersión autorizada, y amarrada a las boyas ' +
            'temporales habilitadas: no se echa el ancla.',
          'Permanencia máxima de seis horas.',
          'Estas zonas no son de fondeo para quien no bucea: el fondeo diurno tiene sus tres zonas ' +
            'propias y la pernocta solo es posible en las boyas del puerto.',
        ],
        sources: FUENTES_ZONA,
      },
      navegacion: navegacionDelParque(),
    },
  },

  // ---------------------------------------------------------------------------
  // Zonas de fondeo diurno
  // ---------------------------------------------------------------------------
  {
    zoneId: zona('zona-d-us-restringit-zona-de-fondeig-diurn'),
    nombreCorto: `${NOMBRE} — zonas de fondeo diurno`,
    resumen:
      'Las tres zonas donde se puede fondear de día con la autorización de navegación del parque: ' +
      'la Coveta Roja, la zona del puerto junto al muelle y es Burri, 47 ha en total. No se puede ' +
      'pernoctar.',
    normas: NORMAS,
    ultimaRevision: REVISION,
    actividades: {
      ...PESCA_ZONA,
      fondeo: {
        status: 'allowed_with_authorization',
        motivo:
          'El apartado 2.3.3.1 del PRUG permite a las embarcaciones con autorización de navegación ' +
          'fondear en las zonas de fondeo diurno, entre una hora después del amanecer y una hora ' +
          'antes del ocaso.',
        conditions: [
          'Solo de día: desde una hora después del amanecer hasta una hora antes del ocaso. Para ' +
            'pasar la noche hay que ir a las boyas del puerto, con su propia autorización.',
          'Cupo de fondeos autorizados: 30 en es Burri, 12 en la zona del muelle y 8 en la Coveta Roja.',
          'Hay que respetar en todo momento los fondos cubiertos por praderas de posidonia.',
          'La autorización que habilita es la de navegación, que es anual.',
        ],
        permit: PERMISO_NAVEGACION,
        sources: [...FUENTES_ZONA, 'rescab-autorizaciones'],
      },
      buceo: {
        status: 'prohibited',
        motivo:
          'El apartado 2.1.2.b.4 del PRUG excluye expresamente de las zonas de fondeo diurno el buceo ' +
          'con escafandra autónoma.',
        conditions: [SOLO_EN_ZONAS_DE_BUCEO],
        sources: FUENTES_ZONA,
      },
      navegacion: navegacionDelParque(),
    },
  },

  // ---------------------------------------------------------------------------
  // Zona de uso especial: la bahía del puerto
  // ---------------------------------------------------------------------------
  {
    zoneId: zona('zona-d-us-especial'),
    nombreCorto: `${NOMBRE} — puerto de Cabrera`,
    resumen:
      'Zona de uso especial marina: el interior de la bahía del puerto de Cabrera, 71 ha. Es el ' +
      'único lugar del parque donde se puede pasar la noche, amarrado a una de sus cincuenta boyas ' +
      'y con autorización.',
    normas: NORMAS,
    ultimaRevision: REVISION,
    actividades: {
      ...PESCA_ZONA,
      fondeo: {
        status: 'allowed_with_authorization',
        motivo:
          'El apartado 2.3.3.2 del PRUG fija un máximo de cincuenta permisos al día para el puerto de ' +
          'Cabrera y lo señala como único lugar de pernocta, en las cincuenta boyas de amarre ' +
          'habilitadas.',
        conditions: [
          'Se amarra a una de las cincuenta boyas habilitadas. Es el único lugar del parque donde se ' +
            'puede pernoctar.',
          'Máximo de cincuenta permisos al día; la autorización va, como norma general, de uno a ' +
            'siete días.',
          'Cuando la demanda supera la oferta, el cupo es de veinte embarcaciones chárter y treinta ' +
            'privadas.',
          'No se permite pernoctar a las embarcaciones con inodoro sin tanque intermedio.',
          'Abarloarse a una embarcación amarrada solo es posible de día y si la suma de esloras no ' +
            'pasa de 12 m en las boyas blancas, 15 m en las amarillas o 20 m en las naranjas; nunca ' +
            'en las rojas.',
          'Si por segunda vez no se avisa de que no se va a usar un permiso, el parque no concede ' +
            'otro en los dos meses siguientes.',
          'Velocidad máxima de dos nudos dentro del puerto.',
        ],
        permit: PERMISO_FONDEO,
        sources: [...FUENTES_ZONA, 'rescab-autorizaciones'],
      },
      buceo: {
        status: 'prohibited',
        motivo:
          'El puerto no está entre las cuatro zonas de buceo del parque, y el apartado mm) del PRUG ' +
          'prohíbe las inmersiones con escafandra fuera de ellas.',
        conditions: [SOLO_EN_ZONAS_DE_BUCEO],
        sources: FUENTES_ZONA,
      },
      navegacion: navegacionDelParque(),
    },
  },

  // ---------------------------------------------------------------------------
  // Zona de uso moderado: todas las aguas restantes
  // ---------------------------------------------------------------------------
  {
    zoneId: zona('zona-d-us-moderat'),
    nombreCorto: `${NOMBRE} — zona de uso moderado marina`,
    resumen:
      'Todas las aguas del parque anterior a 2019 que no son reserva, uso restringido ni puerto: ' +
      '7.801 ha. Se puede navegar con autorización, pero no fondear ni bucear con escafandra.',
    normas: NORMAS,
    ultimaRevision: REVISION,
    actividades: {
      ...PESCA_ZONA,
      // La prohibición que la ficha del parque no puede llevar. Ver la cabecera.
      fondeo: {
        status: 'prohibited',
        motivo:
          'El PRUG solo deja a las embarcaciones autorizadas amarrar a las boyas del puerto o fondear ' +
          'en las tres zonas de fondeo diurno (apartado 2.3.3.1), y prohíbe ocupar el parque para ' +
          'atracar fuera de las zonas expresamente autorizadas (apartado 2.2.l). La zona de uso ' +
          'moderado no es ninguna de ellas.',
        conditions: [
          'Para fondear de día hay que ir a es Burri, a la zona del muelle o a la Coveta Roja; para ' +
            'pasar la noche, a las boyas del puerto. Este mapa dibuja esas zonas como figura aparte.',
          'Única excepción prevista: en la Cova Blava se puede facilitar el anclaje o el amarre de ' +
            'embarcaciones autorizadas expresamente por motivos de uso público (apartado 2.1.2.c.2).',
        ],
        sources: FUENTES_ZONA,
      },
      buceo: {
        status: 'prohibited',
        motivo:
          'El apartado mm) del PRUG prohíbe las inmersiones con escafandra autónoma fuera de las ' +
          'zonas de buceo, y la zona de uso moderado no es ninguna de ellas.',
        conditions: [
          SOLO_EN_ZONAS_DE_BUCEO,
          'La prohibición es del buceo con escafandra autónoma. El baño está permitido en las aguas ' +
            'junto a las playas de uso moderado (apartado 2.1.2.c.3).',
          APNEA_MAYO_JUNIO,
        ],
        sources: FUENTES_ZONA,
      },
      navegacion: navegacionDelParque(),
    },
  },
];
