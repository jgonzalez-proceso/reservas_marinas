/**
 * Red Natura 2000 marina de Eivissa y Formentera.
 *
 * Quince espacios que el art. 2 del Decret 91/2023 lista con ámbito marino,
 * igual que a los de Mallorca y Menorca, y que faltaron enteros del mapa hasta
 * el 2026-11-11. No los excluía ninguna norma: fue una omisión de la lista
 * blanca.
 *
 * Y es la omisión que más respuestas cambiaba, porque aquí **la regla de que
 * Natura 2000 no añade nada a la pesca deja de valer en dos planes**. El art. 5
 * del Decret 91/2023 remite la pesca submarina a la normativa general «sens
 * perjudici que el pla de gestió de l'espai n'estableixi una regulació
 * addicional», y en Mallorca y Menorca ningún plan había usado esa puerta. En
 * Eivissa la usan dos:
 *
 *   Illots del llevant d'Eivissa (Decret 29/2022, ap. 5.5.4.2)
 *       fuera de la reserva marina de Tagomago, prohibidas las pescas
 *       recreativas con fusil y con cebo vivo. Como dentro de la reserva la
 *       submarina ya está prohibida por el Decret 45/2018, el resultado es
 *       «prohibida» en todo el ámbito del plan.
 *
 *   Costa Oest d'Eivissa (Decret 49/2022, ap. 5.9.2.2)
 *       en la ZEC Illots de Ponent, fuera de la reserva de ses Bledes, la
 *       submarina es autorizable y solo martes, jueves, fines de semana y
 *       festivos, con registro de capturas.
 *
 * Los otros dos planes aprobados no tocan la pesca pero sí el fondeo:
 *
 *   Formentera (Decret 17/2020, ap. 9.7.4)
 *       la única regla de ESLORA de toda la cartografía: en los arenales de
 *       menos de 15 m de fondo solo fondean embarcaciones de menos de 16 m.
 *       Esa «zona de fondeo condicionado» está en los planos 5.1 a 5.5 del
 *       anexo II del plan y el IDEIB no la publica como capa, así que va como
 *       condición escrita y no como polígono.
 *
 *   Ses Salines d'Eivissa i Formentera (Decret 48/2015, NR 1.11)
 *       las mismas cuatro clases de fondeo que el art. 117 del PRUG del parque,
 *       que el mapa ya dibuja. Lo que añade es la prohibición de la pesca
 *       submarina y de los concursos en todo el ámbito marino del plan (NR 1.6),
 *       que coincide con la del parque.
 *
 * Tres espacios del norte de Eivissa —es Amunts, ses Margalides y el Nord de
 * Sant Joan— están en el art. 2 con el plan de gestión todavía en tramitación:
 * solo les alcanza el Decret 91/2023.
 *
 * LO QUE NO ESTÁ. Porroig (ES5310031) y Cap Llentrisca - sa Talaia (ES5310032)
 * son del plan de la Costa Oest pero no figuran en el art. 2; entrarían por el
 * motivo `ambit-mari-del-pla-de-gestio` si su polígono tiene parte marina, y
 * eso no se ha comprobado. Tampoco el LIC estatal del Canal de Ibiza
 * (ESZZ16012), cuyo instrumento no se ha leído.
 *
 * Todos los planes están leídos en el texto publicado en el BOIB. El articulado
 * marino no está en el decreto, que solo aprueba, sino en el anexo: el plan.
 */

import { permiso } from '../schema.js';
import {
  CONDICION_ZONAS_DE_BANO,
  CONDICIONES_FONDEO_POSIDONIA,
  fondeoPorPosidoniaGeneral,
} from '../normas-generales.js';
import {
  NORMA_DECRET_91_2023,
  noRegulada,
  pescaSubmarinaRemitida,
  pescaSuperficieRemitida,
} from './comun.js';

const REVISION = '2026-11-11';

const NORMA_PLA_FORMENTERA = {
  titulo: 'Decreto 17/2020, de 22 de mayo, por el cual se aprueba el Plan de Gestión Natura 2000 de Formentera',
  fecha: '2020-05-22',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2020/05/22/17/dof/spa/pdf',
  tipo: 'creacion',
};

const NORMA_PLA_COSTA_OEST = {
  titulo: 'Decret 49/2022, de 5 de desembre, pel qual s’aprova el Pla de Gestió Natura 2000 Costa Oest d’Eivissa',
  fecha: '2022-12-05',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2022/12/05/49/dof/cat/pdf',
  tipo: 'creacion',
};

const NORMA_PLA_LLEVANT = {
  titulo: 'Decret 29/2022, d’1 d’agost, pel qual s’aprova el Pla de Gestió Natura 2000 Illots del llevant d’Eivissa',
  fecha: '2022-08-01',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2022/08/01/29/dof/cat/html',
  tipo: 'creacion',
};

const NORMA_PLA_SALINES = {
  titulo: 'Decret 48/2015, de 22 de maig, pel qual s’aprova el Pla de Gestió Natura 2000 de ses Salines d’Eivissa i Formentera',
  fecha: '2015-05-22',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2015/05/22/48/dof/spa/html',
  tipo: 'creacion',
};

const F_FORMENTERA = 'boib-decret-17-2020-formentera';
const F_COSTA_OEST = 'boib-decret-49-2022-costa-oest-eivissa';
const F_LLEVANT = 'boib-decret-29-2022-llevant-eivissa';
const F_SALINES = 'boib-decret-48-2015-salines-n2000';

const FUENTES_FONDEO = ['boib-decret-25-2018-posidonia', 'boe-rd-876-2014-costas', 'boe-rd-191-2026'];

// Lo que ningún plan dice pero rige igual, tomado de la regla general.
const [, CADENA_Y_BORNEO, SOLO_BOYAS] = CONDICIONES_FONDEO_POSIDONIA;

const SIN_INSTRUMENTOS_DE_PESCA =
  'Los buceadores no pueden llevar, ni en la mano ni en la embarcación, instrumentos que sirvan ' +
  'para pescar o extraer especies marinas.';
const SIN_FEEDING = 'Prohibido alimentar a las especies marinas (feeding).';
const SIN_VERTIDOS =
  'Prohibido cualquier vertido al mar desde las embarcaciones, de aguas residuales o de sentinas.';
const SIN_PARTY_BOATS =
  'Prohibidas las fiestas y acontecimientos multitudinarios en embarcaciones (party boats).';

/** Buceo que el plan declara permitido, con las dos cautelas que todos repiten. */
const buceoPermitido = ({ apartado, fuente, extra = [] }) => ({
  status: 'allowed',
  motivo:
    `El apartado ${apartado} del plan de gestión considera el buceo con escafandra autónoma una ` +
    'actividad permitida, salvo en las zonas que una resolución restrinja por motivos de ' +
    'conservación.',
  conditions: [SIN_INSTRUMENTOS_DE_PESCA, SIN_FEEDING, ...extra],
  sources: [fuente],
});

// ---------------------------------------------------------------------------
// Pla de Gestió Natura 2000 de Formentera
// ---------------------------------------------------------------------------

const formentera = () => ({
  pescaDesdeCosta: pescaSuperficieRemitida({ sourcesExtra: [F_FORMENTERA] }),
  pescaRecreativaEmbarcacion: pescaSuperficieRemitida({ sourcesExtra: [F_FORMENTERA] }),
  pescaSubmarina: pescaSubmarinaRemitida({ planEnTramitacion: false, sourcesExtra: [F_FORMENTERA] }),
  buceo: buceoPermitido({ apartado: '9.7.7', fuente: F_FORMENTERA }),
  fondeo: {
    status: 'restricted',
    motivo:
      'El apartado 9.7.4 del plan de gestión prohíbe fondear sobre Posidonia oceanica, Cymodocea ' +
      'nodosa y fondos de maërl o coralígeno, y reserva los arenales de menos de 15 m de fondo a ' +
      'las embarcaciones de menos de 16 m de eslora.',
    conditions: [
      'Prohibido fondear sobre Posidonia oceanica; si hay praderas próximas, tampoco la cadena ni ' +
        'los demás elementos del fondeo pueden afectarlas (ap. 9.7.4.1).',
      'Zona de fondeo condicionado: en los fondos arenosos de menos de 15 m de profundidad ' +
        'delimitados por el plan solo pueden fondear las embarcaciones de menos de 16 m de eslora ' +
        '(ap. 9.7.4.2).',
      'Esa zona está dibujada en los planos 5.1 a 5.5 del anexo II del plan y no se publica como ' +
        'capa cartográfica: este mapa no la tiene. Con 16 m o más de eslora conviene consultar el ' +
        'plano antes de fondear en arena somera.',
      'Prohibido igualmente sobre praderas de Cymodocea nodosa y sobre fondos de maërl o ' +
        'coralígeno (ap. 9.7.4.4).',
      'Prohibido fondear en las zonas de baño debidamente balizadas (ap. 9.7.4.3 y art. 73.1 del ' +
        'Reglamento General de Costas).',
      SOLO_BOYAS,
    ],
    sources: [F_FORMENTERA, ...FUENTES_FONDEO],
  },
  navegacion: {
    status: 'restricted',
    motivo:
      'El plan de gestión no limita la navegación de paso, pero prohíbe en todo su ámbito marino ' +
      'las fiestas en embarcaciones (ap. 9.7.8) y cualquier vertido desde ellas (ap. 9.7.11).',
    conditions: [
      SIN_PARTY_BOATS,
      SIN_VERTIDOS,
      'Prohibidas las instalaciones de temporada que produzcan contaminación acústica, como los ' +
        'circuitos de embarcaciones de motor o los fly boards (ap. 9.7.10).',
      'El plan habilita a pedir al Estado limitaciones a la navegación en zonas concretas; si se ' +
        'aprueban, deben publicarse y balizarse (ap. 9.7.5). No consta ninguna.',
    ],
    sources: [F_FORMENTERA],
  },
});

// ---------------------------------------------------------------------------
// Pla de Gestió Natura 2000 Costa Oest d'Eivissa
// ---------------------------------------------------------------------------

const FONDEO_COSTA_OEST = {
  status: 'restricted',
  motivo:
    'El apartado 5.9.6 del plan de gestión prohíbe fondear sobre Posidonia oceanica, Cymodocea ' +
    'nodosa, fondos de maërl o coralígeno y comunidades de gorgonias.',
  conditions: [
    'Prohibido fondear sobre Posidonia oceanica; si hay praderas próximas, tampoco la cadena ni ' +
      'los demás elementos del fondeo pueden afectarlas (ap. 5.9.6.1).',
    'Prohibido igualmente sobre praderas de Cymodocea nodosa, sobre fondos de maërl o coralígeno ' +
      'y sobre las comunidades de gorgonias, en especial en torno a ses Bledes y es Vedrà ' +
      '(ap. 5.9.6.5).',
    'Prohibido fondear en las zonas de baño debidamente balizadas (ap. 5.9.6.4 y art. 73.1 del ' +
      'Reglamento General de Costas).',
    'Cala d’Hort y Cala Vedella son praderas «a regular» del Decret 25/2018: el plan prevé campos ' +
      'de boyas de bajo impacto, con un máximo de 25 y 36 puntos de fondeo. Mientras no estén ' +
      'instalados, allí solo se puede fondear en las zonas de arena.',
    SOLO_BOYAS,
  ],
  sources: [F_COSTA_OEST, ...FUENTES_FONDEO],
};

const navegacionCostaOest = (extra = []) => ({
  status: 'restricted',
  motivo:
    'El apartado 5.9.7 del plan de gestión permite la navegación en todo su ámbito marino, con ' +
    'límites: tres nudos en la franja de baño, 60 m de distancia a cetáceos, tortugas y aves ' +
    'marinas, y ni fiestas a bordo ni vertidos.',
  conditions: [
    'En los tramos de costa sin balizar, la zona de baño es una franja de 200 m en las playas y ' +
      '50 m en el resto de la costa: dentro no se puede navegar a más de tres nudos (ap. 5.9.7.3).',
    'En las zonas de baño balizadas está prohibida la navegación de recreo y el uso de cualquier ' +
      'embarcación a vela o motor (ap. 5.9.7.4).',
    'Distancia mínima de 60 m a cetáceos, tortugas y aves marinas, en silencio y sin acelerar ' +
      'bruscamente (ap. 5.9.7.2).',
    'Prohibidas las competiciones de embarcaciones a motor en todo el ámbito marino del plan ' +
      '(ap. 5.9.3.1).',
    SIN_PARTY_BOATS,
    SIN_VERTIDOS,
    ...extra,
  ],
  sources: [F_COSTA_OEST],
});

const SIN_PALANGRE =
  'En las aguas interiores del ámbito del plan está prohibida la pesca con palangre de fondo y ' +
  'de superficie (ap. 5.9.2.4).';

/**
 * La remisión del art. 5, con la coletilla corregida.
 *
 * `pescaSubmarinaRemitida` dice que el plan aprobado no ha usado la puerta del
 * art. 5. Para este plan sería falso: la usa, pero solo en la ZEC Illots de
 * Ponent. En los otros dos espacios del plan la remisión a la normativa general
 * sigue valiendo, y hay que decirlo sin negar lo que pasa al lado.
 */
function submarinaCostaOest() {
  const base = pescaSubmarinaRemitida({ planEnTramitacion: false, sourcesExtra: [F_COSTA_OEST] });
  return {
    ...base,
    conditions: base.conditions.map((c) =>
      c.startsWith('El plan de gestión aprobado de este espacio no establece')
        ? 'El plan de gestión de la Costa Oest solo añade regulación de la pesca submarina en la ' +
          'ZEC Illots de Ponent d’Eivissa, donde la somete a autorización. En este espacio no ' +
          'añade ninguna.'
        : c,
    ),
  };
}

const costaOest = ({ navegacionExtra = [], superficieExtra = [] } = {}) => ({
  pescaDesdeCosta: pescaSuperficieRemitida({
    condicionesExtra: [SIN_PALANGRE, ...superficieExtra],
    sourcesExtra: [F_COSTA_OEST],
  }),
  pescaRecreativaEmbarcacion: pescaSuperficieRemitida({
    condicionesExtra: [SIN_PALANGRE, ...superficieExtra],
    sourcesExtra: [F_COSTA_OEST],
  }),
  pescaSubmarina: submarinaCostaOest(),
  buceo: buceoPermitido({
    apartado: '5.9.5',
    fuente: F_COSTA_OEST,
    extra: [
      'Dentro de las reservas marinas de ses Bledes y de es Vedrà - es Vedranell el buceo no es ' +
        'libre sino autorizable: manda el régimen de la reserva, que este mapa resuelve por separado.',
    ],
  }),
  fondeo: FONDEO_COSTA_OEST,
  navegacion: navegacionCostaOest(navegacionExtra),
});

const SIN_MOTOR_DE_TEMPORADA =
  'En esta ZEC está prohibida además la circulación de los elementos náuticos a motor de las ' +
  'instalaciones de temporada situadas fuera del ámbito del plan, como las de alquiler de ' +
  'embarcaciones a motor (ap. 5.9.8.3).';

const SIN_COMPETICIONES_DE_PESCA =
  'Prohibidas las competiciones de pesca en esta ZEC y en las reservas marinas de ses Bledes y ' +
  'de es Vedrà - es Vedranell (ap. 5.9.3.2).';

// ---------------------------------------------------------------------------
// Pla de Gestió Natura 2000 Illots del llevant d'Eivissa
// ---------------------------------------------------------------------------

const SIN_COMPETICIONES_LLEVANT =
  'Prohibidas las competiciones de pesca. No lo es la «captura y suelta» con protocolo ' +
  'supervisado y sin trofeo (ap. 5.5.4.2.ii).';

// `allowed` y no `restricted`, aunque lleve dos prohibiciones en las condiciones.
//
// Las reglas propias del plan —ni cebo vivo ni competiciones— solo rigen FUERA
// de la reserva marina de Tagomago, y la reserva cubre casi todo el espacio:
// medido sobre las geometrías, 218 de los 222 puntos muestreados en la ZEC del
// área marina caen dentro. Con `restricted`, esta ficha ganaba por rango a la
// reserva —que es «con autorización»— también dentro de ella, y como las
// condiciones de la figura desplazada no se muestran, el panel perdía los
// aparejos y cupos de la reserva justo donde mandan. Con `allowed` la reserva
// gana dentro y enseña lo suyo, y en la franja de fuera estas dos prohibiciones
// salen igualmente como condiciones.
const PESCA_SUPERFICIE_LLEVANT = {
  status: 'allowed',
  motivo:
    'El apartado 5.5.4 del plan de gestión deja la pesca recreativa de superficie en la normativa ' +
    'general, con dos límites fuera de la reserva marina de Tagomago: ni cebo vivo ni ' +
    'competiciones de pesca. Dentro de la reserva rige el Decret 45/2018.',
  conditions: [
    'Fuera de la reserva marina: prohibida la pesca recreativa con cebo vivo, sean peces o ' +
      'cefalópodos (ap. 5.5.4.2.i).',
    SIN_COMPETICIONES_LLEVANT,
    'Dentro de la reserva marina de la costa nordeste de Eivissa - Tagomago manda el régimen de la ' +
      'reserva, que este mapa resuelve por separado.',
    'En lo demás rige la normativa general de pesca recreativa de las Illes Balears (ap. 5.5.4.3).',
  ],
  sources: [F_LLEVANT, 'boib-decret-91-2023'],
};

const navegacionLlevant = (extra = []) => ({
  status: 'restricted',
  motivo:
    'El plan de gestión no limita la navegación de paso, pero prohíbe en todo su ámbito marino las ' +
    'fiestas en embarcaciones (ap. 5.5.3), los vertidos desde ellas (ap. 5.5.2) y las ' +
    'instalaciones de temporada de embarcaciones a motor (ap. 5.5.9).',
  conditions: [...extra, SIN_PARTY_BOATS, SIN_VERTIDOS],
  sources: [F_LLEVANT],
});

const llevant = ({ navegacionExtra = [] } = {}) => ({
  pescaDesdeCosta: PESCA_SUPERFICIE_LLEVANT,
  pescaRecreativaEmbarcacion: PESCA_SUPERFICIE_LLEVANT,
  // La excepción a la regla de toda la capa Natura 2000: aquí el plan sí usa la
  // puerta del art. 5 del Decret 91/2023.
  pescaSubmarina: {
    status: 'prohibited',
    motivo:
      'El apartado 5.5.4.2 del plan de gestión prohíbe la pesca recreativa con fusil en todo su ' +
      'ámbito fuera de la reserva marina de Tagomago, y dentro de la reserva la prohíbe el Decret ' +
      '45/2018. Es la regulación adicional que el art. 5 del Decret 91/2023 permite al plan.',
    conditions: [
      'Aquí no vale la regla general de la Red Natura 2000: este plan es de los pocos que prohíbe ' +
        'la pesca submarina por sí mismo.',
      SIN_INSTRUMENTOS_DE_PESCA,
    ],
    sources: [F_LLEVANT, 'boib-decret-91-2023', 'boib-decreto-45-2018-tagomago'],
  },
  buceo: buceoPermitido({ apartado: '5.5.4.2.iii', fuente: F_LLEVANT }),
  fondeo: {
    status: 'restricted',
    motivo:
      'El apartado 5.5.1 del plan de gestión prohíbe fondear sobre praderas de Posidonia oceanica ' +
      'y de Cymodocea nodosa, sobre fondos de maërl o coralígeno y en las zonas de baño balizadas.',
    conditions: [
      'Prohibido fondear sobre praderas de Posidonia oceanica y de Cymodocea nodosa y sobre fondos ' +
        'de maërl o coralígeno (ap. 5.5.1.1).',
      'Prohibido fondear en las zonas de baño debidamente balizadas (ap. 5.5.1.1 y art. 73.1 del ' +
        'Reglamento General de Costas).',
      'El plan delimita esas praderas y fondos en su plano 5.2 y prevé que puedan señalarse con ' +
        'boyas. Este mapa no los dibuja.',
      CADENA_Y_BORNEO,
      SOLO_BOYAS,
    ],
    sources: [F_LLEVANT, ...FUENTES_FONDEO],
  },
  navegacion: navegacionLlevant(navegacionExtra),
});

// ---------------------------------------------------------------------------
// Espacios con el plan en tramitación: solo el Decret 91/2023
// ---------------------------------------------------------------------------

function sinPlan() {
  return {
    pescaDesdeCosta: pescaSuperficieRemitida(),
    pescaRecreativaEmbarcacion: pescaSuperficieRemitida(),
    pescaSubmarina: pescaSubmarinaRemitida({ planEnTramitacion: true }),
    buceo: noRegulada({
      motivo:
        'El Decret 91/2023 regula la pesca y el marisqueo, no las actividades subacuáticas ' +
        'recreativas. Este espacio no tiene todavía plan de gestión aprobado que pueda añadir nada.',
      sources: ['boib-decret-91-2023'],
    }),
    fondeo: fondeoPorPosidoniaGeneral(),
    navegacion: noRegulada({
      motivo:
        'El Decret 91/2023 no establece límites de navegación, y este espacio no tiene todavía plan ' +
        'de gestión aprobado que pueda establecerlos.',
      sources: ['boib-decret-91-2023'],
    }),
  };
}

const NORMAS_FORMENTERA = [NORMA_DECRET_91_2023, NORMA_PLA_FORMENTERA];
const NORMAS_COSTA_OEST = [NORMA_DECRET_91_2023, NORMA_PLA_COSTA_OEST];
const NORMAS_LLEVANT = [NORMA_DECRET_91_2023, NORMA_PLA_LLEVANT];
const NORMAS_SALINES = [NORMA_DECRET_91_2023, NORMA_PLA_SALINES];
const NORMAS_SIN_PLAN = [NORMA_DECRET_91_2023];

const RESUMEN_FORMENTERA =
  'Su plan de gestión regula el fondeo —con un límite de eslora en los arenales someros— y remite ' +
  'la pesca a la normativa general.';

const ESPACIOS = [
  // -- Formentera -------------------------------------------------------------
  {
    zoneId: 'n2k-es5310109-area-marina-de-cala-saona--zec--autonomica',
    nombreCorto: 'ZEC Àrea marina de cala Saona (ES5310109)',
    resumen: `ZEC marina en la costa oeste de Formentera. ${RESUMEN_FORMENTERA}`,
    normas: NORMAS_FORMENTERA,
    actividades: formentera(),
  },
  {
    zoneId: 'n2k-es5310110-area-marina-de-platja-detramuntana--zec--autonomica',
    nombreCorto: 'ZEC Àrea marina de Platja de Tramuntana (ES5310110)',
    resumen: `ZEC marina en la costa norte de Formentera. ${RESUMEN_FORMENTERA}`,
    normas: NORMAS_FORMENTERA,
    actividades: formentera(),
  },
  {
    zoneId: 'n2k-es5310111-area-marina-de-platja-de-migjorn--zec--autonomica',
    nombreCorto: 'ZEC Àrea marina de Platja de Migjorn (ES5310111)',
    resumen: `ZEC marina frente a la playa de Migjorn, al sur de Formentera. ${RESUMEN_FORMENTERA}`,
    normas: NORMAS_FORMENTERA,
    actividades: formentera(),
  },
  {
    zoneId: 'n2k-es5310024-la-mola--zec-i-zepa--autonomica',
    nombreCorto: 'ZEC i ZEPA La Mola (ES5310024)',
    resumen: `Espacio con doble designación en el extremo este de Formentera. ${RESUMEN_FORMENTERA}`,
    normas: NORMAS_FORMENTERA,
    actividades: formentera(),
  },
  {
    zoneId: 'n2k-es5310025-cap-de-barbaria--zec-i-zepa--autonomica',
    nombreCorto: 'ZEC i ZEPA Cap de Barbaria (ES5310025)',
    resumen: `Espacio con doble designación en el extremo sur de Formentera. ${RESUMEN_FORMENTERA}`,
    normas: NORMAS_FORMENTERA,
    actividades: formentera(),
  },

  // -- Ses Salines d'Eivissa i Formentera -------------------------------------
  {
    zoneId: 'n2k-es0000084-ses-salines-d-eivissa-i-formentera--zec-i-zepa--autonomica',
    nombreCorto: 'ZEC i ZEPA Ses Salines d’Eivissa i Formentera (ES0000084)',
    resumen:
      'Espacio Natura 2000 que coincide en su mayor parte con el parque natural de ses Salines. Su ' +
      'plan de gestión declara aplicable el PRUG del parque y prohíbe por sí mismo la pesca ' +
      'submarina y los concursos de pesca en todo su ámbito marino.',
    normas: NORMAS_SALINES,
    actividades: {
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'La norma reguladora 1.6 del plan de gestión prohíbe la pesca submarina en todo el ámbito ' +
          'marino del plan, junto al arrastre, el cerco, el palangre de superficie y los concursos ' +
          'de pesca. Coincide con la prohibición del PRUG del parque natural.',
        sources: [F_SALINES, 'boib-decret-91-2023'],
      },
      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'La norma reguladora 1.6 del plan de gestión prohíbe los concursos de pesca en todo su ' +
          'ámbito marino. En lo demás declara aplicable el PRUG del parque natural (NR 1.2).',
        conditions: [
          'Prohibidos los concursos de pesca (NR 1.6).',
          'Para el resto rige el régimen del parque natural y de la reserva marina dels Freus, que ' +
            'este mapa resuelve por separado.',
        ],
        sources: [F_SALINES],
      },
      pescaRecreativaEmbarcacion: {
        status: 'restricted',
        motivo:
          'La norma reguladora 1.6 del plan de gestión prohíbe los concursos de pesca en todo su ' +
          'ámbito marino. En lo demás declara aplicable el PRUG del parque natural (NR 1.2).',
        conditions: [
          'Prohibidos los concursos de pesca (NR 1.6).',
          'Para el resto rige el régimen del parque natural y de la reserva marina dels Freus, que ' +
            'este mapa resuelve por separado.',
        ],
        sources: [F_SALINES],
      },
      buceo: {
        status: 'allowed',
        motivo:
          'La norma reguladora 1.12 del plan de gestión considera permitido el buceo con escafandra ' +
          'autónoma en todo su ámbito marino, salvo donde se restrinja por motivos de conservación.',
        conditions: [
          'Los buceadores no pueden llevar instrumentos que sirvan para pescar o extraer especies ' +
            'marinas, salvo el cuchillo de buceo (NR 1.13).',
          SIN_FEEDING,
          'Dentro del parque natural el buceo exige además autorización del órgano gestor: manda ' +
            'el PRUG, que este mapa resuelve por separado.',
        ],
        sources: [F_SALINES],
      },
      fondeo: {
        status: 'restricted',
        motivo:
          'La norma reguladora 1.11 del plan de gestión zonifica su ámbito marino en zonas de fondeo ' +
          'prohibido, de amarre regulado, de fondeo condicionado y de fondeo libre, para proteger ' +
          'la pradera de posidonia. Es el mismo esquema del art. 117 del PRUG del parque.',
        conditions: [
          'Fondeo prohibido: ningún tipo de fondeo salvo fuerza mayor. Amarre regulado: solo a las ' +
            'boyas instaladas. Fondeo condicionado: siempre sobre arena y nunca sobre praderas de ' +
            'Posidonia oceanica.',
          'Las zonas de fondeo prohibido y de fondeo regulado del parque están dibujadas en este ' +
            'mapa como figura aparte: conviene comprobar en cuál cae el punto.',
          CADENA_Y_BORNEO,
        ],
        sources: [F_SALINES, 'boe-rd-191-2026'],
      },
      navegacion: {
        status: 'restricted',
        motivo:
          'La norma reguladora 1.16 del plan de gestión prohíbe las fiestas multitudinarias en ' +
          'embarcaciones turísticas en todo su ámbito marino. Los límites de navegación del parque ' +
          'están en su PRUG.',
        conditions: [SIN_PARTY_BOATS],
        sources: [F_SALINES],
      },
    },
  },

  // -- Costa Oest d'Eivissa ---------------------------------------------------
  {
    zoneId: 'n2k-es5310104-costa-de-l-oest-d-eivissa--zec--autonomica',
    nombreCorto: 'ZEC Costa de l’Oest d’Eivissa (ES5310104)',
    resumen:
      'ZEC marina de la costa oeste de Eivissa, con Cala d’Hort y Cala Vedella. Su plan de gestión ' +
      'regula el fondeo y la navegación; la pesca se rige por la normativa general.',
    normas: NORMAS_COSTA_OEST,
    actividades: costaOest(),
  },
  {
    zoneId: 'n2k-es0000078-es-vedra-es-vedranell--zec-i-zepa--autonomica',
    nombreCorto: 'ZEC i ZEPA Es Vedrà - Es Vedranell (ES0000078)',
    resumen:
      'Espacio con doble designación en torno a es Vedrà y es Vedranell. Se solapa con la reserva ' +
      'marina del mismo nombre, y es el régimen de la reserva el que restringe allí la pesca.',
    normas: NORMAS_COSTA_OEST,
    actividades: costaOest({ navegacionExtra: [SIN_MOTOR_DE_TEMPORADA] }),
  },
  {
    zoneId: 'n2k-es5310023-illots-de-ponent-d-eivissa--zec-i-zepa--autonomica',
    nombreCorto: 'ZEC i ZEPA Illots de Ponent d’Eivissa (ES5310023)',
    resumen:
      'Espacio con doble designación en torno a ses Bledes y los demás islotes de poniente de ' +
      'Eivissa. Fuera de la reserva marina de ses Bledes, su plan de gestión somete la pesca ' +
      'submarina a autorización y la limita a ciertos días.',
    normas: NORMAS_COSTA_OEST,
    actividades: {
      ...costaOest({
        navegacionExtra: [SIN_MOTOR_DE_TEMPORADA],
        superficieExtra: [SIN_COMPETICIONES_DE_PESCA],
      }),
      // La otra excepción a la regla de la capa: autorizable y con calendario.
      pescaSubmarina: {
        status: 'allowed_with_authorization',
        motivo:
          'El apartado 5.9.2.2 del plan de gestión hace autorizable la pesca recreativa submarina ' +
          'en esta ZEC, fuera de la reserva marina de ses Bledes, y solo los martes, jueves, fines ' +
          'de semana y festivos. Es la regulación adicional que el art. 5 del Decret 91/2023 ' +
          'permite al plan.',
        conditions: [
          'Días autorizables: martes, jueves, fines de semana y festivos.',
          'Hay que llevar un registro de la actividad y comunicar periódicamente al órgano de pesca ' +
            'el número de capturas y las zonas. No presentarlo puede acarrear la pérdida de la ' +
            'licencia.',
          SIN_COMPETICIONES_DE_PESCA,
          'Dentro de la reserva marina de ses Bledes manda el régimen de la reserva, que este mapa ' +
            'resuelve por separado.',
        ],
        permit: permiso({
          importe: null,
          nota:
            'Autorización del órgano competente en materia de pesca para la pesca submarina en la ' +
            'ZEC Illots de Ponent d’Eivissa. El plan de gestión no dice cómo se tramita ni publica ' +
            'su importe: hay que preguntarlo al servicio de pesca antes de salir.',
          ultimaVerificacion: REVISION,
        }),
        sources: [F_COSTA_OEST, 'boib-decret-91-2023'],
      },
    },
  },

  // -- Illots del llevant d'Eivissa -------------------------------------------
  {
    zoneId: 'n2k-es5310107-area-marina-de-tagomago--zec--autonomica',
    nombreCorto: 'ZEC Àrea marina de Tagomago (ES5310107)',
    resumen:
      'ZEC marina en torno a Tagomago. Su plan de gestión prohíbe la pesca submarina y la pesca con ' +
      'cebo vivo fuera de la reserva marina; dentro manda el régimen de la reserva.',
    normas: NORMAS_LLEVANT,
    actividades: llevant(),
  },
  {
    zoneId: 'n2k-es0000082-tagomago--zec-i-zepa--autonomica',
    nombreCorto: 'ZEC i ZEPA Tagomago (ES0000082)',
    resumen:
      'Espacio con doble designación sobre el islote de Tagomago y su entorno. Mismo régimen que ' +
      'el área marina: pesca submarina prohibida.',
    normas: NORMAS_LLEVANT,
    actividades: llevant(),
  },
  {
    zoneId: 'n2k-es0000242-illots-de-santa-eularia-rodona-i-es-cana--zec-i-zepa--autonomica',
    nombreCorto: 'ZEC i ZEPA Illots de Santa Eulària, Rodona i es Canar (ES0000242)',
    resumen:
      'Espacio con doble designación sobre los islotes de levante de Eivissa. Pesca submarina ' +
      'prohibida por el plan de gestión, y además motos acuáticas prohibidas.',
    normas: NORMAS_LLEVANT,
    actividades: llevant({
      navegacionExtra: ['Prohibido el uso de motos acuáticas en esta ZEC (ap. 5.5.10).'],
    }),
  },

  // -- Norte de Eivissa, plan en tramitación ----------------------------------
  {
    zoneId: 'n2k-es5310105-es-amunts-d-eivissa--lic--autonomica',
    nombreCorto: 'LIC Es Amunts d’Eivissa (ES5310105)',
    resumen:
      'LIC de la costa norte de Eivissa, con el plan de gestión en tramitación. Por ahora no añade ' +
      'ninguna restricción propia a la pesca recreativa.',
    normas: NORMAS_SIN_PLAN,
    actividades: sinPlan(),
  },
  {
    zoneId: 'n2k-es5310106-area-marina-de-ses-margalides--lic--autonomica',
    nombreCorto: 'LIC Àrea marina de ses Margalides (ES5310106)',
    resumen:
      'LIC marino frente a la costa noroeste de Eivissa, con el plan de gestión en tramitación. ' +
      'Por ahora no añade ninguna restricción propia a la pesca recreativa.',
    normas: NORMAS_SIN_PLAN,
    actividades: sinPlan(),
  },
  {
    zoneId: 'n2k-es5310112-nord-de-sant-joan--lic--autonomica',
    nombreCorto: 'LIC Nord de Sant Joan (ES5310112)',
    resumen:
      'LIC de la costa norte de Eivissa, con el plan de gestión en tramitación. Por ahora no añade ' +
      'ninguna restricción propia a la pesca recreativa.',
    normas: NORMAS_SIN_PLAN,
    actividades: sinPlan(),
  },
];

export default ESPACIOS.map((e) => ({ ...e, ultimaRevision: REVISION }));
