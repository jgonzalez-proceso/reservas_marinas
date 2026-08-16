/**
 * Parc Natural de s'Albufera des Grau — ámbito marino.
 *
 * Este fichero no está bajo `rules/<fuente>/` como los demás porque no
 * pertenece a una sola fuente: el parque lo publica la capa de límites de los
 * espacios naturales protegidos, su interior lo publica la capa de zonificación
 * del PRUG, y la pesca submarina tiene una capa propia. Son tres fuentes y siete
 * zonas, pero **dos normas**: el PORN de 2003 y el Decret 39/2021. Repartir las
 * fichas por fuente obligaría a declarar esas dos normas tres veces y a leer en
 * tres sitios un régimen que solo se entiende entero.
 *
 * Por qué hacen falta las tres capas y no basta el perímetro del parque:
 *
 *   Parc Natural (17,4 km²)     autorización previa para pescar a pulmón,
 *                               fondeo y buceo regulados, pesca de superficie
 *                               sujeta a un plan sectorial todavía sin aprobar.
 *   Zona d'exclusió (9,8 ha)    ni pesca, ni fondeo, ni navegación, ni buceo.
 *   Pesca submarina prohibida   705,8 ha del norte del parque donde esa
 *   (capa propia)               autorización no se concede en ningún caso.
 *
 * Es decir: dentro del mismo parque, la pesca submarina está prohibida en el
 * 40 % de la superficie y es autorizable en el 60 % restante. Una sola ficha
 * «Parc Natural de s'Albufera des Grau» con una única conclusión sería falsa en
 * cualquiera de las dos mitades, según cuál se eligiera.
 *
 * La frontera entre esas dos mitades NO se reconstruye a partir del texto. El
 * anexo II del PRUG la describe con dos rectas imaginarias —una al norte desde
 * la punta oeste de s'Escala y otra al este desde el Morro de sa Falconera—,
 * pero el IDEIB ya publica los polígonos: se cargan tal cual.
 *
 * Un hallazgo de los datos: la zona de exclusión marina del PRUG y el ámbito
 * marino de las reservas naturales del Decret 51/2003 son **el mismo trozo de
 * agua** —9,755 ha frente a 9,766 ha, mismo centro hasta la quinta decimal, en
 * el interior del puerto d'Addaia—, digitalizados dos veces con distinto número
 * de vértices. No colapsan en la deduplicación porque su geometría canónica no
 * es idéntica, y no deben colapsar: son dos figuras jurídicas con dos normas
 * distintas que dicen lo mismo. Sus fichas comparten régimen y lo declaran por
 * separado.
 *
 * ADVERTENCIA SOBRE LA PESCA DE SUPERFICIE. El art. 47.2 del PORN remite la
 * pesca profesional y recreativa a un Plan Sectorial de aprovechamiento pesquero
 * que **no consta aprobado**: el apartado 5.3.5.1 del propio PRUG de 2021 sigue
 * hablando de él como algo aplicable «una vez aprobado por el órgano competente
 * en materia de pesca». Lo que el PRUG contiene es su anexo II, titulado
 * «Criterios básicos para la elaboración del Plan Sectorial», que es el mandato
 * del art. 30.g) de la Ley 5/2005 al redactor del futuro plan. Por eso las
 * condiciones de ese anexo se citan aquí como criterios publicados y no como
 * régimen directamente exigible — con una excepción: las de la pesca submarina,
 * que sí se aplican porque viajan dentro de la autorización del art. 47.3, y la
 * propia cartografía oficial del IDEIB las ha llevado a polígonos.
 */

import { permiso } from './schema.js';

const REVISION = '2026-08-15';

const NORMA_PORN = {
  titulo:
    'Acuerdo del Consejo de Gobierno de 16 de mayo de 2003 por el que se aprueba definitivamente el Plan de Ordenación de los Recursos Naturales de s’Albufera des Grau (Menorca)',
  fecha: '2003-05-16',
  url: 'https://www.caib.es/sites/puntdinformacioambiental/f/138734',
  tipo: 'creacion',
};

const NORMA_DECLARACION = {
  titulo:
    'Decret 51/2003, de 16 de maig, d’ampliació del Parc natural de s’Albufera des Grau i de declaració de les reserves naturals de les illes des Porros, s’Estany, la bassa de Morella, es Prat i l’illa d’en Colom',
  fecha: '2003-05-16',
  url: 'https://www.caib.es/sites/espaisnaturalsold/f/79442',
  tipo: 'creacion',
};

const NORMA_PRUG = {
  titulo:
    'Decreto 39/2021, de 2 de agosto, por el que se aprueba el Plan de Gestión Natura 2000 de la Costa Este de Menorca y el Plan rector de uso y gestión del Parque Natural de s’Albufera des Grau y de las reservas naturales de las illes des Porros (illots d’Addaia), s’Estany, la bassa de Morella, es Prat y la illa d’en Colom',
  fecha: '2021-08-02',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2021/08/02/39/dof/spa',
  tipo: 'modificacion',
};

const NORMAS_PARQUE = [NORMA_DECLARACION, NORMA_PORN, NORMA_PRUG];

const FUENTES_PARQUE = ['porn-albufera-des-grau', 'boib-decret-39-2021'];

/**
 * La autorización de pesca submarina del parque.
 *
 * Es una autorización propia, distinta de la de las reservas marinas y de la de
 * los demás espacios naturales protegidos: la resuelve la Dirección General de
 * Pesca previo informe preceptivo de la de Espacios Naturales, y el plazo de
 * resolución es de seis meses, así que no se saca el día antes de ir.
 */
const AUTORIZACION_SUBMARINA = permiso({
  importe: 53.9,
  nota:
    'Autorización nominal, individual e intransferible del ámbito marino del parque. Exige licencia de pesca recreativa submarina en vigor y licencia federativa o, en su defecto, certificado médico y seguro adecuados. Requiere informe preceptivo de la Dirección General de Espacios Naturales y Biodiversidad; el plazo máximo de resolución es de 6 meses. No presentar el registro de capturas comporta la pérdida de la autorización.',
  vigencia: 'Hasta el 31 de diciembre del año de emisión',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/1831120',
  ultimaVerificacion: REVISION,
});

/** Condiciones que el PRUG fija para las autorizaciones de pesca submarina. */
const CONDICIONES_SUBMARINA = [
  'Solo se puede pescar los miércoles, los fines de semana y los días festivos.',
  'Hay que presentar cada año el registro de capturas en las hojas que se entregan con la autorización; no hacerlo impide la renovación.',
  'Captura prohibida del gitano (Mycteroperca rubra), el abadejo (Epinephelus costae), la cherna (Epinephelus caninus) y el verrugato (Umbrina cirrosa).',
  'Máximo un ejemplar al día y por pescador de lubina, corvallo, mero, cherne de ley, bodión verde, merlo, sargo breado, dorada, pez de San Pedro, dentón y cabracho.',
  'Prohibida la extracción de erizos de mar, cangrejo moruno (Eriphia verrucosa) y bogavante (Homarus gammarus) hasta que los informes científicos muestren recuperación de sus poblaciones.',
];

/**
 * Aviso que acompaña a la pesca de superficie en todo el parque.
 *
 * No es una condición exigible: es el estado real de la regulación. Se escribe
 * porque el usuario que lee «Restringida» tiene derecho a saber de dónde sale la
 * restricción y qué parte de ella todavía no es derecho aplicable.
 */
const AVISO_PLAN_SECTORIAL =
  'El régimen específico de pesca de superficie del parque depende de un Plan Sectorial de ' +
  'aprovechamiento pesquero que el art. 47.2 del PORN ordena aprobar y que, en la fecha de esta ' +
  'revisión, no consta aprobado: el propio PRUG de 2021 se remite a él «una vez aprobado». Los ' +
  'límites que siguen son los criterios que el anexo II del PRUG fija para ese futuro plan.';

const CRITERIOS_SUPERFICIE = [
  'Criterio del anexo II del PRUG: la pesca desde embarcación con volantín, con caña o con curricán solo podría practicarse los martes, jueves, sábados, domingos y festivos.',
  'Criterio del anexo II del PRUG: un ejemplar diario por pescador de las especies del anexo 2 del Decreto 41/2015, con la captura del gitano (Mycteroperca rubra) y el verrugato (Umbrina cirrosa) prohibida.',
  'Criterio del anexo II del PRUG: prohibición de campeonatos de pesca y registro obligatorio de la actividad de las embarcaciones con licencia recreativa ante la Dirección General de Pesca.',
  'Criterio del anexo II del PRUG: zona de exclusión en el entorno de los islotes y la bahía d’Addaia, sin ningún tipo de pesca ni marisqueo, ni profesional ni recreativo.',
  'Prohibida en todo caso cualquier pesca dentro de la zona de exclusión marina, que este mapa dibuja como figura aparte (art. 47.1 del PORN).',
  'Prohibida la extracción de erizos de mar, cangrejo moruno (Eriphia verrucosa) y bogavante (Homarus gammarus).',
];

/**
 * Régimen de la zona de exclusión marina.
 *
 * Lo comparten dos figuras que ocupan el mismo trozo de agua: la zona de
 * exclusión del PRUG y el ámbito marino de las reservas naturales del Decret
 * 51/2003. Cada ficha cita sus propias normas; el contenido es el mismo porque
 * la norma es la misma.
 */
function regimenExclusion({ sources }) {
  const prohibidoPescar = {
    status: 'prohibited',
    motivo:
      'El art. 47.1 del PORN prohíbe cualquier tipo de pesca en el área de protección estricta, que ' +
      'el PRUG renombró como zona de exclusión marina. El anexo II del PRUG añade que dentro de ella ' +
      'no cabe ninguna extracción, ni profesional ni recreativa.',
    conditions: [
      'Prohibida cualquier modalidad de pesca y de marisqueo, recreativa o profesional.',
      'Solo se permiten las actividades que tengan por objeto la conservación, la vigilancia, la investigación o la educación ambiental dirigida por el órgano gestor.',
    ],
    sources,
  };

  return {
    pescaDesdeCosta: prohibidoPescar,
    pescaRecreativaEmbarcacion: prohibidoPescar,
    pescaSubmarina: prohibidoPescar,
    buceo: {
      status: 'prohibited',
      motivo:
        'El apartado 6.2.1 del PRUG prohíbe la navegación, el baño y el buceo, además de cualquier ' +
        'otro uso que no sea científico o de gestión, en la zona de s’Estany d’Addaia.',
      conditions: [
        'Prohibido también el baño.',
        'Solo se admite el uso científico o de gestión.',
      ],
      sources,
    },
    fondeo: {
      status: 'prohibited',
      motivo:
        'El apartado 6.2.2.5 del PRUG prohíbe el fondeo y la navegación de embarcaciones de cualquier ' +
        'tipo en la zona de exclusión marina.',
      conditions: [
        'Excepción única: embarcaciones dedicadas a vigilancia, investigación, seguimiento naturalístico y educación ambiental dirigida por el órgano gestor.',
        'Prohibida además cualquier modificación del fondo marino que pueda alterar la viabilidad de las fanerógamas (apartado 6.2.7).',
      ],
      sources,
    },
    navegacion: {
      status: 'prohibited',
      motivo:
        'El apartado 6.2.2.5 del PRUG prohíbe la navegación de embarcaciones de cualquier tipo en la ' +
        'zona de exclusión marina, y el 6.2.1 la prohíbe expresamente en s’Estany d’Addaia.',
      conditions: [
        'Excepción única: embarcaciones dedicadas a vigilancia, investigación, seguimiento naturalístico y educación ambiental dirigida por el órgano gestor.',
      ],
      sources,
    },
  };
}

/**
 * Lo que una categoría de zonificación no decide.
 *
 * Las zonas de uso limitado y de uso compatible son categorías de planificación
 * del art. 22 de la Ley 5/2005: describen la vocación del área, no imponen por
 * sí mismas una restricción a quien pesca o bucea. Escribirlo como
 * `not_regulated` y no dejarlo en `unknown` es deliberado — la norma está leída,
 * y `not_regulated` queda en el escalón más bajo de la escala de restricción, de
 * modo que nunca puede enmascarar la prohibición de otra figura sobre el mismo
 * punto.
 */
function categoriaSinRegimenPropio(categoria, sources) {
  return {
    status: 'not_regulated',
    motivo:
      `La ${categoria} es una categoría de zonificación del art. 22 de la Ley 5/2005: fija la ` +
      'vocación del área, no un régimen de usos propio. Lo que se puede hacer aquí lo determinan el ' +
      'PORN y el PRUG del parque y, para la pesca submarina, la capa de regulación específica.',
    sources,
  };
}

/**
 * Lo que la capa de pesca submarina no decide.
 *
 * Sus dos polígonos delimitan una sola actividad. Decir `not_regulated` para el
 * resto evita que el motor marque el punto como incompleto por una figura que sí
 * hemos leído entera, y al estar en el escalón más bajo de la escala tampoco
 * puede tapar lo que diga el parque, que es quien las regula.
 */
function soloRegulaPescaSubmarina(sources) {
  return {
    status: 'not_regulated',
    motivo:
      'Esta capa oficial delimita únicamente dónde se puede y dónde no se puede pescar a pulmón. No ' +
      'regula ninguna otra actividad: para las demás rige el régimen del Parc Natural de s’Albufera ' +
      'des Grau y de su zonificación.',
    sources,
  };
}

const FUENTES_ZON = [...FUENTES_PARQUE, 'ideib-zonificacion-albufera'];
const FUENTES_PSUB = [...FUENTES_PARQUE, 'ideib-pesca-submarina-albufera'];

const TODAS_LAS_ACTIVIDADES = [
  'pescaDesdeCosta',
  'pescaRecreativaEmbarcacion',
  'pescaSubmarina',
  'buceo',
  'fondeo',
  'navegacion',
];

const paraCada = (claves, regla) => Object.fromEntries(claves.map((c) => [c, regla]));
const salvo = (...excluidas) => TODAS_LAS_ACTIVIDADES.filter((c) => !excluidas.includes(c));

export default [
  // -------------------------------------------------------------------------
  // El parque
  // -------------------------------------------------------------------------
  {
    zoneId: 'enp-es530004-parc-natural-de-s-albufera-des-grau--parc-natural--mari',
    nombreCorto: 'Parc Natural de s’Albufera des Grau (ámbito marino)',
    resumen:
      'Ámbito marino de 17,4 km² del parque natural, en la costa nordeste de Menorca, entre Addaia y ' +
      'el sur de la illa d’en Colom. La pesca submarina no está prohibida en todo él: hace falta una ' +
      'autorización propia del parque, y hay 705,8 ha del norte —el entorno de Favàritx, Mossenyor ' +
      'Vives y Addaia— donde está prohibida sin más. El régimen de la pesca de superficie sigue ' +
      'pendiente del Plan Sectorial de aprovechamiento pesquero, que no consta aprobado.',
    normas: NORMAS_PARQUE,
    ultimaRevision: REVISION,
    actividades: {
      pescaSubmarina: {
        status: 'allowed_with_authorization',
        motivo:
          'El art. 47.3 del PORN somete la pesca recreativa submarina a autorización previa de la ' +
          'administración competente en medio ambiente, además de la licencia de pesca. El apartado ' +
          '5.1.1 del anexo II del PRUG lo reitera y el trámite está abierto y con tasa publicada. ' +
          'Pero hay zonas del parque donde esa autorización no habilita nada: consúltese la capa de ' +
          'regulación específica de pesca submarina, que este mapa dibuja aparte.',
        conditions: CONDICIONES_SUBMARINA,
        permit: AUTORIZACION_SUBMARINA,
        sources: [...FUENTES_PARQUE, 'tramite-autorizacion-submarina-albufera'],
      },

      pescaDesdeCosta: {
        status: 'restricted',
        motivo: AVISO_PLAN_SECTORIAL,
        conditions: CRITERIOS_SUPERFICIE,
        sources: FUENTES_PARQUE,
      },

      pescaRecreativaEmbarcacion: {
        status: 'restricted',
        motivo: AVISO_PLAN_SECTORIAL,
        conditions: CRITERIOS_SUPERFICIE,
        sources: FUENTES_PARQUE,
      },

      // No es `allowed_with_authorization`: para un buceador suelto o un grupo
      // pequeño no hace falta permiso. El umbral son 8 personas, y decirlo así
      // es más útil que empujar a todo el mundo a pedir una autorización que la
      // mayoría no necesita.
      buceo: {
        status: 'restricted',
        motivo:
          'El apartado 6.2.5 del PRUG permite el buceo recreativo con escafandra autónoma en grupos ' +
          'de menos de 8 personas y lo hace autorizable a partir de 8. Las empresas que lo ofrezcan ' +
          'con ánimo de lucro necesitan autorización siempre, sea cual sea el número de participantes.',
        conditions: [
          'Grupos de menos de 8 personas: permitido sin autorización.',
          'Grupos de 8 o más: autorización previa del órgano gestor del parque.',
          'Empresas con ánimo de lucro: autorización siempre.',
          'Máximo 15 buceadores por grupo, salvo que el órgano gestor lo eleve por motivos de conservación.',
          'Prohibida la alimentación o «feeding» de la fauna (apartado 5.3.4.2).',
          'La dirección general competente puede restringir la actividad por zonas y periodos, y controlar las inmersiones en cuevas submarinas, mediante resolución publicada.',
          'Prohibido el buceo en la zona de exclusión marina, que este mapa dibuja como figura aparte.',
        ],
        sources: FUENTES_PARQUE,
      },

      fondeo: {
        status: 'restricted',
        motivo:
          'El apartado 5.3.1 del PRUG prohíbe fondear sobre Posidonia oceanica, Cymodocea nodosa y ' +
          'fondos de maërl o coralígeno, y el art. 50.5 del PORN ya prohibía hacerlo sobre posidonia. ' +
          'Hay además tres campos de boyas donde no se puede echar el ancla.',
        conditions: [
          'Prohibido fondear sobre Posidonia oceanica, Cymodocea nodosa y fondos de maërl o coralígeno. Si la cartografía y lo que se ve desde la embarcación no coinciden, manda lo que se ve.',
          'Tres zonas de fondeo regulado con campo de boyas: hay que amarrar a la boya y no se puede echar el ancla. En la bahía d’Es Grau el fondeo fuera de las boyas está prohibido, con un máximo de 260 anclajes fijos incluidos los amarres al muelle.',
          'Prohibido fondear en las zonas de baño balizadas y sobre yacimientos arqueológicos.',
          'Prohibido el fondeo en la zona de exclusión marina, que este mapa dibuja como figura aparte.',
          'La delimitación de las áreas de fondeo está en el plano 8 del anexo IV del PRUG y no se publica como capa cartográfica: este mapa no la tiene.',
          'Rige además el Real Decreto 191/2026 en todo el Mediterráneo español.',
        ],
        sources: [...FUENTES_PARQUE, 'boe-rd-191-2026'],
      },

      navegacion: {
        status: 'restricted',
        motivo:
          'La navegación no está prohibida con carácter general en el ámbito marino del parque, pero ' +
          'sí lo está en la zona de exclusión y en las zonas húmedas, y el PRUG prohíbe los circuitos ' +
          'de motos náuticas y de otros vehículos a motor en todo el parque.',
        conditions: [
          'Prohibidos los circuitos de motos náuticas y de otros vehículos de motor (apartado 5.3.3).',
          'Prohibida la navegación en la zona de exclusión marina, que este mapa dibuja como figura aparte.',
          'Prohibida cualquier actividad recreativa de navegación y el baño dentro de s’Albufera des Grau y las demás zonas húmedas (art. 50.6 del PORN).',
          'El lanzamiento y la varada de embarcaciones deben hacerse por canales debidamente señalizados.',
          'Prohibido cualquier tipo de vertido desde las embarcaciones.',
          'La dirección general competente puede establecer limitaciones adicionales, temporales o permanentes, publicándolas en boletín oficial y balizando la zona.',
        ],
        sources: FUENTES_PARQUE,
      },
    },
  },

  // -------------------------------------------------------------------------
  // El mismo trozo de agua, dos figuras
  // -------------------------------------------------------------------------
  {
    zoneId:
      'enp-es530014-reserves-naturals-de-les-illes-des-porros-s-estany-la-bassa-de-morella-es-prat-i-l-illa-d-en-colom--reserva-natural--mari',
    nombreCorto: 'Reserves naturals de s’Albufera des Grau (ámbito marino)',
    resumen:
      'Ámbito marino de las reservas naturales declaradas por el Decret 51/2003, un único polígono de ' +
      '9,8 ha en el interior del port d’Addaia. Es el punto más protegido de todo el parque: ni pesca, ' +
      'ni fondeo, ni navegación, ni buceo, ni baño. El PRUG lo recoge como zona de exclusión marina, ' +
      'con una geometría prácticamente coincidente que este mapa dibuja aparte.',
    normas: [NORMA_DECLARACION, NORMA_PORN, NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: regimenExclusion({
      sources: [...FUENTES_PARQUE, 'boib-decret-51-2003'],
    }),
  },

  // -------------------------------------------------------------------------
  // Zonificación del PRUG, ámbito marino
  // -------------------------------------------------------------------------
  {
    zoneId: 'zon-04-ag-parc-natural-de-s-albufera-des-grau--zona-d-exclusio--mari',
    nombreCorto: 'Zona de exclusión marina de s’Albufera des Grau',
    resumen:
      'Los 9,8 ha del ámbito marino del parque clasificados como zona de exclusión, en el interior del ' +
      'port d’Addaia. Corresponden al área marina de protección estricta del PORN y coinciden con el ' +
      'ámbito marino de las reservas naturales. Aquí no se puede pescar, fondear, navegar ni bucear.',
    normas: [NORMA_PORN, NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: regimenExclusion({
      sources: [...FUENTES_PARQUE, 'ideib-zonificacion-albufera'],
    }),
  },

  {
    zoneId: 'zon-04-ag-parc-natural-de-s-albufera-des-grau--zona-d-us-limitat--mari',
    nombreCorto: 'Zona de uso limitado marina de s’Albufera des Grau',
    resumen:
      '1.272 ha del ámbito marino del parque, la categoría mayoritaria. Corresponden a las áreas ' +
      'marinas de conservación predominante del PORN: fondos con comunidades de fanerógamas donde el ' +
      'fondeo está regulado o prohibido. La categoría en sí no prohíbe pescar; eso lo dicen el PORN, ' +
      'el PRUG y la capa de pesca submarina.',
    normas: [NORMA_PORN, NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: {
      // Única regla propia de la categoría, y es la que le da sentido.
      fondeo: {
        status: 'restricted',
        motivo:
          'El apartado 7.1.2 del PRUG define estas zonas como las que acogen comunidades importantes ' +
          'de fanerógamas marinas «donde el fondeo es una actividad regulada o prohibida».',
        conditions: [
          'Prohibido fondear sobre Posidonia oceanica, Cymodocea nodosa y fondos de maërl o coralígeno. Si la cartografía y lo que se ve desde la embarcación no coinciden, manda lo que se ve.',
          'Donde hay campo de boyas hay que amarrar a la boya: no se puede echar el ancla.',
          'Prohibido fondear en las zonas de baño balizadas y sobre yacimientos arqueológicos.',
          'Rige además el Real Decreto 191/2026 en todo el Mediterráneo español.',
        ],
        sources: [...FUENTES_ZON, 'boe-rd-191-2026'],
      },
      ...paraCada(salvo('fondeo'), categoriaSinRegimenPropio('zona de uso limitado', FUENTES_ZON)),
    },
  },

  {
    zoneId: 'zon-04-ag-parc-natural-de-s-albufera-des-grau--zona-d-us-compatible--mari',
    nombreCorto: 'Zona de uso compatible marina de s’Albufera des Grau',
    resumen:
      '468,8 ha del ámbito marino del parque que el PRUG considera compatibles con cierto grado de ' +
      'aprovechamiento. Es la categoría menos restrictiva de la zonificación marina y no añade nada ' +
      'por sí misma: rige el régimen general del parque.',
    normas: [NORMA_PORN, NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: paraCada(
      TODAS_LAS_ACTIVIDADES,
      categoriaSinRegimenPropio('zona de uso compatible', FUENTES_ZON),
    ),
  },

  // -------------------------------------------------------------------------
  // Regulación específica de pesca submarina
  // -------------------------------------------------------------------------
  {
    zoneId:
      'psub-04-ag-parc-natural-de-s-albufera-des-grau--zona-pesca-submarina-prohibida--mari',
    nombreCorto: 'Zona de pesca submarina prohibida de s’Albufera des Grau',
    resumen:
      '705,8 ha en la mitad norte del ámbito marino del parque —el entorno de los cabos de Favàritx y ' +
      'Mossenyor Vives y la bahía d’Addaia— donde la pesca submarina está prohibida. La autorización ' +
      'del parque no habilita a pescar aquí. Esta capa solo regula la pesca submarina: el resto de ' +
      'actividades se rigen por el régimen del parque.',
    normas: [NORMA_PORN, NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: {
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'El apartado 5.1.2 del anexo II del PRUG no permite la pesca submarina en el entorno de los ' +
          'cabos de Favàritx y Mossenyor Vives, y el IDEIB publica el polígono exacto en su capa de ' +
          'regulación de pesca submarina del parque.',
        conditions: [
          'Se admite únicamente el tránsito a nado desde la playa de s’Escala, en línea recta y dirección noroeste, para acceder por el camino más corto a la zona donde sí se puede pescar.',
          'Ese tránsito debe hacerse siempre con el arma descargada y colgada de la boya de señalización.',
          'En la bahía d’Addaia el anexo II del PRUG añade una zona sin ningún tipo de pesca ni marisqueo, ni profesional ni recreativo.',
        ],
        sources: FUENTES_PSUB,
      },
      ...paraCada(salvo('pescaSubmarina'), soloRegulaPescaSubmarina(FUENTES_PSUB)),
    },
  },

  {
    zoneId:
      'psub-04-ag-parc-natural-de-s-albufera-des-grau--zona-pesca-submarina-condicionada--mari',
    nombreCorto: 'Zona de pesca submarina condicionada de s’Albufera des Grau',
    resumen:
      '1.044,8 ha en la mitad sur del ámbito marino del parque, desde Es Grau hasta la illa d’en ' +
      'Colom, donde la pesca submarina es autorizable: con la autorización específica del parque y la ' +
      'licencia de pesca submarina en vigor, y solo los miércoles, fines de semana y festivos.',
    normas: [NORMA_PORN, NORMA_PRUG],
    ultimaRevision: REVISION,
    actividades: {
      pescaSubmarina: {
        status: 'allowed_with_authorization',
        motivo:
          'El IDEIB publica este polígono como zona de pesca submarina condicionada: dentro de él la ' +
          'autorización previa del art. 47.3 del PORN sí habilita a pescar, con las condiciones que ' +
          'fija el apartado 5.1.2 del anexo II del PRUG.',
        conditions: CONDICIONES_SUBMARINA,
        permit: AUTORIZACION_SUBMARINA,
        sources: [...FUENTES_PSUB, 'tramite-autorizacion-submarina-albufera'],
      },
      ...paraCada(salvo('pescaSubmarina'), soloRegulaPescaSubmarina(FUENTES_PSUB)),
    },
  },
];
