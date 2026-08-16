/**
 * Reglas compartidas de la Red Natura 2000 marina.
 *
 * La corrección más importante de toda esta capa: **estar dentro de un espacio
 * Natura 2000 no prohíbe la pesca submarina.** El art. 5 del Decret 91/2023 lo
 * dice al revés de como suele suponerse — para la pesca recreativa submarina en
 * los espacios de su art. 2 «s'aplicaran el Decret 34/2014 […] i el Decret
 * 31/2021», es decir, la normativa general de pesca recreativa. El art. 4 hace
 * lo mismo con la pesca de superficie y el marisqueo recreativo.
 *
 * Pintar Natura 2000 como zona prohibida sería, por tanto, afirmar lo contrario
 * de lo que dice la norma. Lo que sí ocurre es que muchos de estos espacios se
 * solapan con reservas marinas, y ahí la prohibición viene de la reserva. Esa
 * distinción es justamente lo que el motor resuelve: cada figura aporta su
 * regla y gana la más restrictiva.
 *
 * Los dos artículos llevan además una condición de no coincidencia: la remisión
 * a la normativa general vale «que no coincideixin totalment ni parcialment amb
 * l'àmbit d'una reserva marina o amb l'àrea marina d'un espai natural
 * protegit». Es una regla de conflicto entre capas escrita en la propia norma.
 * No se resuelve dentro de la ficha —una ficha no sabe qué otras figuras hay
 * sobre el punto—, sino en `engine/resolve.js`, que apila todas las figuras y
 * deja mandar a la más restrictiva. Aquí solo se advierte de ello.
 */

export const NORMA_DECRET_91_2023 = {
  titulo:
    'Decret 91/2023, de 15 de desembre, pel qual es regula la pesca marítima i el marisqueig a les zones que integren la xarxa ecològica europea Natura 2000 declarades per la Comunitat Autònoma de les Illes Balears',
  fecha: '2023-12-15',
  url: 'https://www.caib.es/eboibfront/pdf/es/2023/170/1151625',
  tipo: 'general',
};

export const NORMA_PLA_TRAMUNTANA = {
  titulo: 'Decret 49/2015, de 22 de maig, pel qual s’aprova el Pla de Gestió Natura 2000 de la Serra de Tramuntana',
  fecha: '2015-05-22',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2015/05/22/49/dof/spa',
  tipo: 'creacion',
};

export const NORMA_PLA_COSTA_LLEVANT = {
  titulo:
    'Decret 17/2023, de 20 de març, pel qual s’aprova el Pla de Gestió Natura 2000 Costa de Llevant de Mallorca',
  fecha: '2023-03-20',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2023/03/20/17/dof/spa/pdf',
  tipo: 'creacion',
};

export const NORMA_ORDEN_ZEPA_MARINAS = {
  titulo:
    'Orden AAA/1260/2014, de 9 de julio, por la que se declaran Zonas de Especial Protección para las Aves en aguas marinas españolas',
  fecha: '2014-07-09',
  url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2014-7576',
  tipo: 'creacion',
};

/**
 * Advertencia que acompaña a toda remisión de los arts. 4 y 5: la remisión solo
 * opera donde el espacio no se solapa con una reserva marina o con el área
 * marina de un espacio natural protegido.
 */
const AVISO_COINCIDENCIA =
  'La remisión a la normativa general solo opera donde este espacio no coincide, total ni ' +
  'parcialmente, con el ámbito de una reserva marina o con el área marina de un espacio natural ' +
  'protegido. Donde sí coincide, manda el régimen de esa otra figura, que este mapa resuelve por ' +
  'separado y muestra junto a esta.';

const CONDICIONES_NORMATIVA_GENERAL = [
  'Rige la normativa general de pesca recreativa de las Illes Balears: Decret 34/2014 (licencia, ' +
    'modalidades, tallas mínimas y cupos) y Decret 31/2021 (marisqueo).',
  'Estar dentro de un espacio de la Red Natura 2000 no añade por sí solo ninguna prohibición de ' +
    'pesca recreativa.',
];

const FUENTES_REMISION = [
  'boib-decret-91-2023',
  'boib-decret-34-2014-pesca-recreativa',
  'boib-decret-31-2021-marisqueig',
];

/**
 * Pesca recreativa de superficie y marisqueo: art. 4 del Decret 91/2023.
 */
export function pescaSuperficieRemitida({ condicionesExtra = [], sourcesExtra = [] } = {}) {
  return {
    status: 'not_regulated',
    motivo:
      'El art. 4 del Decret 91/2023 no impone a los espacios Natura 2000 con ámbito marino ninguna ' +
      'restricción propia de pesca recreativa de superficie ni de marisqueo recreativo: remite ' +
      'expresamente al Decret 34/2014 y al Decret 31/2021, es decir, a la normativa general.',
    conditions: [...CONDICIONES_NORMATIVA_GENERAL, ...condicionesExtra, AVISO_COINCIDENCIA],
    sources: [...FUENTES_REMISION, ...sourcesExtra],
  };
}

/**
 * Pesca recreativa submarina: art. 5 del Decret 91/2023.
 *
 * Se separa del art. 4 porque el art. 5 añade una coletilla que el 4 no tiene
 * —«sens perjudici que el pla de gestió de l'espai n'estableixi una regulació
 * addicional»—, y esa coletilla cambia lo que hay que decirle al usuario según
 * el plan de gestión del espacio esté aprobado o en tramitación.
 */
export function pescaSubmarinaRemitida({
  planEnTramitacion = false,
  condicionesExtra = [],
  sourcesExtra = [],
} = {}) {
  const coletilla = planEnTramitacion
    ? 'El plan de gestión de este espacio está en tramitación. El art. 5 permite que, cuando se ' +
      'apruebe, establezca regulación adicional sobre la pesca submarina.'
    : 'El plan de gestión aprobado de este espacio no establece regulación adicional de la pesca ' +
      'submarina; el art. 5 se lo permitiría, pero no la ha ejercido.';

  return {
    status: 'not_regulated',
    motivo:
      'El art. 5 del Decret 91/2023 no prohíbe la pesca recreativa submarina en los espacios Natura ' +
      '2000 con ámbito marino: remite expresamente al Decret 34/2014 y al Decret 31/2021, sin ' +
      'perjuicio de que el plan de gestión del espacio establezca regulación adicional.',
    conditions: [...CONDICIONES_NORMATIVA_GENERAL, coletilla, ...condicionesExtra, AVISO_COINCIDENCIA],
    sources: [...FUENTES_REMISION, ...sourcesExtra],
  };
}

/**
 * Actividad que la norma de la figura, leída entera, no toca.
 *
 * No es lo mismo que `unknown`: aquí sí se ha leído el Decret 91/2023 y, en su
 * caso, el plan de gestión del espacio, y ninguno de los dos dice nada.
 */
export function noRegulada({ motivo, sources }) {
  return { status: 'not_regulated', motivo, sources };
}
