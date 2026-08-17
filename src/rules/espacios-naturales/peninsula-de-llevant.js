/**
 * Parc Natural de la Península de Llevant — ámbito marino.
 *
 * El caso que enseña por qué esta aplicación apila figuras en vez de resolver
 * por la más famosa. Sobre el levante de Mallorca conviven cuatro capas:
 *
 *   Parc Natural de la Península de Llevant   6.192 ha de mar, PORN de 2023
 *   Reserva Marina del Llevant (aut. y est.)  4.040 y 4.640 ha
 *   Reserva Integral del Llevant              dentro de las anteriores
 *   Red Natura 2000                           ZEC/ZEPA superpuestas
 *
 * Y **no cubren lo mismo**. El ámbito marino del parque es mayor que el de la
 * reserva marina, así que hay agua que está dentro del parque y fuera de la
 * reserva. En ese agua la pesca recreativa submarina sigue prohibida, porque la
 * prohibición no viene de la reserva sino del art. 40.1.h del PORN de Llevant,
 * que la enumera entre los usos prohibidos del ámbito marino del parque.
 *
 * Atar esta regla al polígono de la reserva marina habría sido el error obvio y
 * habría dejado sin respuesta justo la franja donde hace falta.
 *
 * El art. 39 explica la relación entre normas: el régimen del ámbito marino del
 * parque es el de su capítulo V y, «en defecte de previsió», el del Decret
 * 71/2016 de la reserva marina y el del Decret 41/2015. Para la pesca submarina
 * no hace falta bajar a esas normas subsidiarias: la prohibición es expresa.
 *
 * La regla se ata al polígono marino del parque que publica la capa de límites
 * del IDEIB como AMBIT='Marí'. Comprobado contra la zonificación del PORN (capa
 * 28 del servicio GOIB_NATURA_ENP_IB): esta suma 6.194,2 ha frente a las
 * 6.192,0 del polígono de límites, y los 1.087 puntos muestreados dentro de ella
 * caen todos dentro de ese polígono.
 */

const REVISION = '2026-08-17';

const NORMA_PORN = {
  titulo:
    'Decreto 8/2023, de 20 de febrero, por el que se aprueba el Plan de Ordenación de los Recursos Naturales de Llevant y se amplían los límites del Parc Natural de la Península de Llevant',
  fecha: '2023-02-20',
  url: 'https://www.caib.es/sites/institutestudisautonomics/f/465088',
  tipo: 'creacion',
};

const FUENTES = ['boib-decreto-8-2023-porn-llevant'];

/**
 * El art. 39.1 en una línea, para que viaje con cada actividad.
 *
 * Importa porque explica por qué esta ficha y la de la reserva marina no se
 * contradicen: son dos escalones del mismo régimen, y el motor los apila.
 */
const MARCO_ART_39 =
  'El art. 39.1 del PORN fija que en el ámbito marino del parque rige su capítulo V y, en defecto ' +
  'de previsión, las prohibiciones y limitaciones del Decret 71/2016 (Reserva Marina del Llevant) ' +
  'y del Decret 41/2015. Donde la reserva marina también alcanza, sus normas se suman a estas.';

export default [
  {
    zoneId: 'enp-es530007-parc-natural-de-la-peninsula-de-llevant--parc-natural--mari',
    nombreCorto: 'Parc Natural de la Península de Llevant (ámbito marino)',
    resumen:
      'Ámbito marino de 6.192 ha del parque natural, desde el cap des Freu hasta la badia d’Alcúdia. ' +
      'Es más extenso que la Reserva Marina del Llevant: hay mar dentro del parque y fuera de la ' +
      'reserva. La pesca recreativa submarina está prohibida en todo él por el art. 40.1.h del PORN, ' +
      'con independencia de la reserva.',
    normas: [NORMA_PORN],
    ultimaRevision: REVISION,
    actividades: {
      // El motivo de esta ficha.
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'El art. 40.1.h del PORN de Llevant enumera «la pesca recreativa submarina» entre los usos ' +
          'prohibidos del ámbito marino del Parc Natural de la Península de Llevant. La prohibición ' +
          'alcanza todo el ámbito marino del parque y no depende de estar dentro de la reserva marina.',
        conditions: [
          'La prohibición se aplica al ámbito marino completo del parque, que es más extenso que el de la Reserva Marina del Llevant.',
          'En el área de reserva integral el art. 40.1.j prohíbe además cualquier pesca marítima y el buceo con escafandra autónoma.',
          MARCO_ART_39,
        ],
        sources: FUENTES,
      },

      pescaDesdeCosta: {
        status: 'restricted',
        motivo:
          'El PORN no prohíbe la pesca recreativa de superficie en todo el ámbito marino, pero sí ' +
          'prohíbe las competiciones de pesca deportiva (art. 40.1.g) y toda pesca en el área de ' +
          'reserva integral (art. 40.1.j). Donde además alcanza la reserva marina, su régimen se suma.',
        conditions: [
          'Prohibidas las competiciones de pesca deportiva en todo el ámbito marino del parque (art. 40.1.g).',
          'Prohibida cualquier pesca marítima en el área de reserva integral (art. 40.1.j).',
          MARCO_ART_39,
        ],
        sources: FUENTES,
      },

      pescaRecreativaEmbarcacion: {
        status: 'restricted',
        motivo:
          'Mismo régimen que desde costa: el PORN prohíbe las competiciones de pesca deportiva y toda ' +
          'pesca en el área de reserva integral, y prohíbe además a la flota profesional el arrastre y ' +
          'el cerco en todo el ámbito marino del parque.',
        conditions: [
          'Prohibidas las competiciones de pesca deportiva en todo el ámbito marino del parque (art. 40.1.g).',
          'Prohibida cualquier pesca marítima en el área de reserva integral (art. 40.1.j).',
          'Prohibidas en todo el ámbito marino la pesca de arrastre y la de cerco (art. 40.1.f), y la acuicultura (art. 40.1.e).',
          MARCO_ART_39,
        ],
        sources: FUENTES,
      },

      buceo: {
        status: 'restricted',
        motivo:
          'El PORN no prohíbe el buceo en el conjunto del ámbito marino, pero sí lo prohíbe con ' +
          'escafandra autónoma en el área de reserva integral (art. 40.1.j). Fuera de ella rige, en ' +
          'defecto de previsión, el régimen de autorizaciones del Decret 41/2015.',
        conditions: [
          'Prohibido el buceo con escafandra autónoma en el área de reserva integral (art. 40.1.j).',
          'Los buceadores no pueden llevar instrumentos de pesca submarina: la pesca recreativa submarina está prohibida en todo el ámbito marino del parque (art. 40.1.h).',
          MARCO_ART_39,
        ],
        sources: FUENTES,
      },

      fondeo: {
        status: 'restricted',
        motivo:
          'El art. 40.2 del PORN prohíbe con carácter general fondear sobre Posidonia oceanica, y el ' +
          'art. 40.1.d prohíbe fondear del 1 de mayo al 31 de octubre a menos de cien metros de la ' +
          'costa en las playas de s’Arenalet, Font Celada y es Matzoc.',
        conditions: [
          'Prohibido fondear sobre praderas de Posidonia oceanica en todo el ámbito marino del parque (art. 40.2).',
          'Del 1 de mayo al 31 de octubre, ambos incluidos, prohibido fondear a menos de 100 m de la costa en s’Arenalet, Font Celada y es Matzoc (art. 40.1.d).',
          'Prohibidos los dragados submarinos y la extracción de arena de los fondos marinos (art. 40.1.b y 40.1.c).',
          'En lo no previsto rige el Decret 25/2018 sobre la conservación de la Posidonia oceanica, y el RD 191/2026 en todo el Mediterráneo español.',
        ],
        sources: [...FUENTES, 'boe-rd-191-2026'],
      },

      navegacion: {
        status: 'restricted',
        motivo:
          'El art. 40.1 del PORN prohíbe en el ámbito marino del parque cualquier vertido desde las ' +
          'embarcaciones, las competiciones y las excursiones o rutas organizadas de motonáutica, y las ' +
          'fiestas en embarcaciones con emisión de ruido mediante equipos de música.',
        conditions: [
          'Prohibido cualquier tipo de vertido desde las embarcaciones (art. 40.1.a).',
          'Prohibidas las competiciones y las excursiones o rutas organizadas de motonáutica (art. 40.1.i).',
          'Prohibidas las fiestas en embarcaciones (party boats o asimilables) y la emisión de ruido mediante dispositivos de música o similares (art. 40.1.k).',
          'Ante la observación de cetáceos hay que actuar conforme al Real Decreto 1727/2007 de medidas de protección de los cetáceos (art. 41.1).',
          MARCO_ART_39,
        ],
        sources: FUENTES,
      },
    },
  },
];
