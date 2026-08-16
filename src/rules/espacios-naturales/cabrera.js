/**
 * Parque Nacional Marítimo-Terrestre del Archipiélago de Cabrera.
 *
 * No es una reserva marina y no se modela como tal. Es un parque nacional, con
 * su propia ley de creación (Ley 14/1991) y su Plan Rector de Uso y Gestión, y
 * su régimen es más restrictivo que el de cualquier reserva: aquí la pesca
 * recreativa está prohibida **en todas sus modalidades**, y navegar, fondear o
 * bucear requiere autorización administrativa previa.
 *
 * La geometría no se reconstruye a mano ni se toma de un croquis: es el ámbito
 * marino que publica el IDEIB en su capa de espacios naturales protegidos
 * (AMBIT='Marí'), 895,54 km², coherente con las ~89.500 ha marinas que declara
 * el MITECO tras la ampliación.
 *
 * AVISO SOBRE LA AMPLIACIÓN DE 2019. El PRUG es anterior al Acuerdo del Consejo
 * de Ministros de 1 de febrero de 2019 que amplió los límites del parque. Sus
 * prohibiciones generales se refieren al parque nacional, así que alcanzan
 * también a las aguas incorporadas; pero la zonificación de detalle que
 * contiene —zonas de fondeo diurno, cupos de amarre, puntos de buceo— se
 * dibujó sobre el parque anterior y no cubre la superficie añadida. Se dice
 * así, en vez de extender por nuestra cuenta un mapa de zonas a un territorio
 * que la norma no zonificó.
 */

import { permiso } from '../schema.js';

const NORMA_PRUG = {
  titulo:
    'Plan Rector de Uso y Gestión del Parque Nacional Marítimo-Terrestre del Archipiélago de Cabrera',
  fecha: null,
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

export default [
  {
    zoneId: 'enp-es530002-parc-nacional-maritimoterrestre-de-l-arxipelag-de-cabrera--parc-nacional--mari',
    nombreCorto: 'Parque Nacional del Archipiélago de Cabrera (ámbito marino)',
    resumen:
      'Ámbito marino del parque nacional, 895 km². La pesca recreativa está prohibida en todas sus ' +
      'modalidades, incluida la submarina; la única actividad extractiva admitida es la pesca ' +
      'artesanal tradicional profesional de los barcos censados. Navegar, fondear y bucear exigen ' +
      'autorización previa del parque.',
    normas: [NORMA_PRUG, NORMA_AMPLIACION],
    ultimaRevision: '2026-08-15',
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
        conditions: [
          'Prohibido bucear en apnea durante los meses de mayo y junio en las zonas de costa donde ' +
            'desova la cigarra de mar (Scyllarides latus).',
        ],
        sources: ['prug-cabrera'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El apartado mm) del PRUG prohíbe bucear sin la correspondiente autorización administrativa y ' +
          'sin acreditar el nivel de formación mínimo exigido.',
        conditions: [
          'Solo dentro de las zonas de buceo señaladas: las inmersiones fuera de ellas están prohibidas.',
          'Prohibidas las inmersiones desde tierra.',
          'Prohibido el uso de torpedos o scooters subacuáticos.',
          'Prohibido llevar cualquier instrumento utilizable para pescar o extraer especies marinas, ' +
            'salvo el cuchillo reglamentario.',
          'Prohibida la recolección o extracción de organismos, vivos o muertos, salvo por motivos ' +
            'científicos previamente justificados y autorizados.',
          'Prohibido el buceo en apnea en mayo y junio en las zonas de desove de la cigarra de mar.',
        ],
        permit: permisoParque(
          'Autorización de buceo del parque nacional. Exige acreditar el nivel de formación mínimo requerido.',
          'Según autorización',
        ),
        sources: ['prug-cabrera', 'rescab-autorizaciones'],
      },
      fondeo: {
        status: 'allowed_with_authorization',
        motivo:
          'El apartado 2.3.3 del PRUG considera el anclaje actividad compatible pero sujeta a ' +
          'autorización administrativa previa, con cupos por zona y por día.',
        conditions: [
          'Máximo de cincuenta permisos por día para fondear en el puerto de Cabrera; la autorización ' +
            'va, como norma general, de uno a siete días.',
          'Fondeo diurno solo en las zonas habilitadas, entre una hora después del amanecer y una hora ' +
            'antes del ocaso: 30 fondeos en es Burri, 12 en la zona del muelle y 8 en la Coveta Roja.',
          'Hay que respetar en todo momento los fondos cubiertos por praderas de posidonia.',
          'Solo se puede pernoctar en la zona de uso especial del puerto de Cabrera, en las cincuenta ' +
            'boyas de amarre habilitadas.',
          'Cuando la demanda supera la oferta, el cupo es de veinte embarcaciones chárter y treinta ' +
            'privadas.',
          'La zonificación de fondeo del PRUG es anterior a la ampliación de 2019 y no cubre las aguas ' +
            'incorporadas entonces.',
        ],
        permit: permisoParque(
          'Autorización de fondeo o pernocta del parque nacional. Se solicita con un máximo de veinte días de antelación y un mínimo de dos, y hay que confirmarla el día de llegada antes de las 17.00 h.',
          'De 1 a 7 días',
        ),
        sources: ['prug-cabrera', 'rescab-autorizaciones'],
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
        ],
        permit: permisoParque(
          'Autorización de navegación del parque nacional. En la solicitud constan los datos del patrón, del armador y de la embarcación.',
          'Anual',
        ),
        sources: ['prug-cabrera', 'rescab-autorizaciones'],
      },
    },
  },
];
