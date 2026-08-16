/**
 * Paratge Natural de la Serra de Tramuntana — ámbito marino.
 *
 * Esta ficha existe porque un espacio Natura 2000 y un espacio natural
 * protegido son figuras distintas aunque se pisen sobre el mapa, y la
 * diferencia no es académica. En la Serra de Tramuntana el reparto es este:
 *
 *   Natura 2000 (Decret 91/2023, art. 5)   la pesca submarina se rige por la
 *                                          normativa general: la figura no la
 *                                          prohíbe ni la sujeta a permiso.
 *   Paratge Natural (PORN, art. 80)        la pesca submarina «se considera una
 *                                          actividad autorizable»: hace falta
 *                                          autorización del espacio protegido.
 *
 * Y las dos figuras NO cubren lo mismo. Medido sobre las geometrías oficiales,
 * de la ZEC de Port des Canonge solo el 26,8 % de su superficie cae dentro del
 * ámbito marino del Paratge; en cambio Es Rajolí y Cala Figuera están dentro
 * casi al 100 %, y S'Estaca - Punta de Deià al 78 %. Marcar la ZEC entera como
 * «permitida con autorización» habría sido falso en tres cuartas partes de Port
 * des Canonge. Por eso la autorización se ata a la geometría del Paratge y es el
 * motor, al cruzar las figuras que contienen el punto, quien decide si aplica.
 *
 * Es también la razón por la que el propio art. 5 del Decret 91/2023 solo
 * remite a la normativa general donde el espacio Natura 2000 no coincide con el
 * área marina de un espacio natural protegido: la norma está escrita como una
 * regla de conflicto entre capas, y así se resuelve aquí.
 *
 * El PORN se aplica «en el ámbito marino que delimita este Plan», que es la
 * geometría que el IDEIB publica como AMBIT='Marí' (1.127 ha), no las 61.846 ha
 * terrestres del paraje.
 */

import { permiso } from '../schema.js';

const NORMA_PORN = {
  titulo:
    'Decreto 19/2007, de 16 de marzo, por el que se aprueba el Plan de Ordenación de los Recursos Naturales de la Serra de Tramuntana',
  fecha: '2007-03-16',
  url: 'https://www.caib.es/sites/puntdinformacioambiental/f/138451',
  tipo: 'creacion',
};

const NORMA_DECLARACION = {
  titulo:
    'Acord del Consell de Govern de 16 de març de 2007 pel qual es declara Paratge Natural la Serra de Tramuntana',
  fecha: '2007-03-16',
  url: 'http://boib.caib.es//pdf/2007054/mp83.pdf',
  tipo: 'creacion',
};

// La misma tasa que en las reservas marinas, pero es otra autorización: se pide
// por espacio natural protegido, no por reserva, y exige además tarjeta
// federativa de actividades subacuáticas.
const AUTORIZACION_SUBMARINA_ENP = permiso({
  importe: 53.9,
  nota:
    'Autorización anual por espacio natural protegido. Exige licencia de pesca submarina en vigor y tarjeta federativa de actividades subacuáticas.',
  vigencia: '1 año',
  url: 'https://www.caib.es/seucaib/ca/200/persones%20/tramites/tramite/2679858',
  ultimaVerificacion: '2026-08-15',
});

// Los arts. 78 y 81 del PORN afectan a la pesca en general y conviene que
// viajen con todas las modalidades.
const ESPECIES_Y_ARTES =
  'El art. 81.3 del PORN prohíbe la captura o recolección de la nacra (Pinna nobilis); el art. 81.2 ' +
  'hace autorizable la captura de cigarra de mar (Scyllarides latus). El art. 78 prohíbe además, a ' +
  'la flota profesional, el arrastre, el cerco y el palangre de superficie.';

export default [
  {
    zoneId: 'enp-es530018-paratge-natural-de-la-serra-de-tramuntana--paratge-natural--mari',
    nombreCorto: 'Paratge Natural de la Serra de Tramuntana (ámbito marino)',
    resumen:
      'Franja marina de 1.127 ha del Paratge Natural, regulada por el PORN de 2007. Aquí la pesca ' +
      'submarina no está prohibida, pero sí es una actividad autorizable: hace falta autorización ' +
      'del espacio protegido, además de la licencia. Se solapa parcialmente con las ZEC marinas de ' +
      'la Serra de Tramuntana, que por sí solas no exigen esa autorización.',
    normas: [NORMA_DECLARACION, NORMA_PORN],
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaRecreativaEmbarcacion: {
        status: 'allowed',
        motivo:
          'El art. 79.1 del PORN permite expresamente la pesca recreativa desde embarcación en el ' +
          'ámbito marino del Plan, sin perjuicio de la normativa sectorial de pesca.',
        conditions: [
          ESPECIES_Y_ARTES,
          'El Plan Rector de Uso y Gestión puede establecer regulaciones más exhaustivas sobre ' +
            'modalidades, vedas, tallas mínimas, número de capturas, días permitidos y competiciones ' +
            '(art. 79.2).',
        ],
        sources: ['boib-decreto-19-2007-porn-tramuntana'],
      },

      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'El art. 79.1 del PORN permite la pesca recreativa pero prohíbe expresamente practicarla ' +
          'desde las zonas terrestres de exclusión del Plan.',
        conditions: [
          'Prohibida la pesca recreativa desde las zonas terrestres de exclusión que delimita el PORN.',
          'La zonificación terrestre del PORN no está cargada en este mapa: antes de pescar desde ' +
            'tierra hay que comprobar en la cartografía oficial si el punto es zona de exclusión.',
          ESPECIES_Y_ARTES,
        ],
        sources: ['boib-decreto-19-2007-porn-tramuntana'],
      },

      // El caso que da sentido a toda esta ficha.
      pescaSubmarina: {
        status: 'allowed_with_authorization',
        motivo:
          'El art. 80.1 del PORN dice literalmente que «la pesca submarina se considera una actividad ' +
          'autorizable». No está prohibida por estar en un espacio protegido, pero tampoco es libre: ' +
          'requiere autorización específica del espacio natural protegido.',
        conditions: [
          'Licencia de pesca submarina en vigor.',
          'Tarjeta federativa de actividades subacuáticas.',
          'Autorización del espacio natural protegido, que se solicita por espacio y es anual.',
          'El Plan Rector de Uso y Gestión puede establecer regulaciones más exhaustivas sobre ' +
            'modalidades, vedas, tallas mínimas, número de capturas, días permitidos y competiciones ' +
            '(art. 80.2).',
          ESPECIES_Y_ARTES,
        ],
        permit: AUTORIZACION_SUBMARINA_ENP,
        sources: ['boib-decreto-19-2007-porn-tramuntana', 'tramite-autorizacion-submarina-enp'],
      },

      buceo: {
        status: 'allowed',
        motivo:
          'El art. 83.1 del PORN permite el buceo recreativo y deportivo en el ámbito marino del Plan.',
        conditions: [
          'Los clubes o centros que ofrezcan la actividad deben acreditarse ante el organismo gestor ' +
            'de los espacios naturales protegidos.',
          'Los buceadores no pueden llevar, en la mano ni en la embarcación, instrumentos utilizables ' +
            'para pescar o extraer especies marinas (art. 83.2).',
          'Prohibida la alimentación o «feeding» de las especies marinas (art. 83.3).',
          'El Plan Rector de Uso y Gestión puede regular la inmersión en cuevas submarinas y ' +
            'establecer restricciones zonales o temporales más estrictas (arts. 83.1 y 83.4).',
        ],
        sources: ['boib-decreto-19-2007-porn-tramuntana'],
      },

      fondeo: {
        status: 'restricted',
        motivo:
          'El art. 82 del PORN prohíbe fondear sobre praderas de Posidonia oceanica y sobre fondos de ' +
          'maërl en el ámbito marino del Plan. El Real Decreto 191/2026 mantiene esa prohibición en ' +
          'todo el Mediterráneo español y la extiende a la Cymodocea nodosa.',
        conditions: [
          'Prohibido fondear sobre praderas de Posidonia oceanica y sobre fondos de maërl (art. 82).',
          'Prohibido también sobre praderas de Cymodocea nodosa, y en arena próxima si la cadena o el ' +
            'ancla acaban afectando a la pradera (RD 191/2026).',
        ],
        sources: ['boib-decreto-19-2007-porn-tramuntana', 'boe-rd-191-2026'],
      },

      navegacion: {
        status: 'restricted',
        motivo:
          'El art. 77 del PORN prohíbe la navegación deportiva y de recreo en las zonas de baño y ' +
          'limita la velocidad a 3 nudos en la franja contigua a la costa.',
        conditions: [
          'Prohibida la navegación deportiva y de recreo en las zonas de baño debidamente indicadas.',
          'Donde no hay balizamiento, la zona de baño se entiende como una franja de 200 m en las ' +
            'playas y 50 m en el resto de la costa; dentro de ella no se puede navegar a más de 3 nudos.',
          'El lanzamiento y la varada de embarcaciones deben hacerse por canales señalizados.',
          'Prohibido cualquier tipo de vertido desde las embarcaciones.',
        ],
        sources: ['boib-decreto-19-2007-porn-tramuntana'],
      },
    },
  },
];
