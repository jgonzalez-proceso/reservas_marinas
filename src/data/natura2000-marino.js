/**
 * Espacios Natura 2000 con ámbito marino que se cargan en el mapa.
 *
 * Esta tabla es una LISTA BLANCA, y es deliberada. La capa oficial del IDEIB
 * publica más de doscientos espacios Natura 2000 de Baleares, y la inmensa
 * mayoría son exclusivamente terrestres: encinares, barrancos, cuevas, basses
 * temporals. Cargarlos todos multiplicaría por diez el peso de la cartografía y
 * llenaría el panel de figuras que no dicen nada sobre el mar.
 *
 * El criterio de inclusión NO es geométrico. No se decide mirando si un
 * polígono «parece» tocar el agua, igual que la pertenencia a isla no se decide
 * por centroide (véase src/data/islas.js). Cada espacio entra por un motivo
 * jurídico expreso, y ese motivo se escribe aquí:
 *
 *   'decret-91-2023-art-2'
 *       El art. 2 del Decret 91/2023 enumera nominalmente los espacios Natura
 *       2000 «amb àmbit marí» declarados por la Comunidad Autónoma. Es la
 *       determinación del propio Govern sobre qué espacios tienen mar, y es la
 *       que activa el régimen de pesca de los arts. 3, 4 y 5 de ese Decreto.
 *
 *   'ambit-mari-del-pla-de-gestio'
 *       No figura en el art. 2, pero está dentro del ámbito de un plan de
 *       gestión aprobado cuyas normas marinas (fondeo, navegación) se aplican
 *       «en el ámbito marino del plan de gestión», sin distinguir espacio por
 *       espacio. El Pla de Gestió Costa de Llevant de Mallorca (Decret 17/2023)
 *       es el caso: su apartado 5.8 rige los siete espacios del plan.
 *
 *   'estatal-aguas-exteriores'
 *       Espacio marino de gestión estatal. El Decret 91/2023 no le alcanza —es
 *       norma autonómica y estos espacios están en aguas exteriores—, así que su
 *       régimen se busca en el instrumento estatal correspondiente.
 *
 * Los códigos son los SITE_CODE oficiales de la Red Natura 2000. Son el
 * identificador jurídico del espacio y no cambian aunque cambie su denominación
 * o su figura: cuatro de los espacios de la Costa de Llevant que el art. 2 lista
 * todavía como LIC ya están declarados ZEC en la cartografía vigente, y siguen
 * siendo los mismos espacios.
 *
 * `npm run rules:check` avisa si un código de esta tabla no aparece en la capa
 * descargada: significa que el servicio ha dejado de publicarlo y hay que mirar
 * por qué.
 */

export const MOTIVOS_INCLUSION = {
  'decret-91-2023-art-2':
    'Listado nominalmente en el art. 2 del Decret 91/2023 como espacio Natura 2000 con ámbito marino.',
  'ambit-mari-del-pla-de-gestio':
    'Dentro del ámbito marino de un plan de gestión aprobado que regula actividades en el mar.',
  'estatal-aguas-exteriores':
    'Espacio marino de la Red Natura 2000 de gestión estatal, en aguas exteriores.',
};

export const N2000_MARINO = {
  // -- Mallorca, ámbito marino del art. 2 del Decret 91/2023 -----------------
  // Serra de Tramuntana
  ES5310094: { nombre: 'Cala Figuera', motivo: 'decret-91-2023-art-2', isla: 'mallorca' },
  ES5310077: { nombre: 'Es Rajolí', motivo: 'decret-91-2023-art-2', isla: 'mallorca' },
  ES5310081: { nombre: 'Port des Canonge', motivo: 'decret-91-2023-art-2', isla: 'mallorca' },
  ES5310082: {
    nombre: "S'Estaca - Punta de Deià",
    motivo: 'decret-91-2023-art-2',
    isla: 'mallorca',
  },

  // Badies del nord
  ES5310005: {
    nombre: 'Badies de Pollença i Alcúdia',
    motivo: 'decret-91-2023-art-2',
    isla: 'mallorca',
  },

  // Costa de Llevant
  ES5310097: {
    nombre: 'Àrea marina Costa de Llevant',
    motivo: 'decret-91-2023-art-2',
    isla: 'mallorca',
  },
  ES5310030: { nombre: 'Costa de Llevant', motivo: 'decret-91-2023-art-2', isla: 'mallorca' },
  ES5310099: { nombre: 'Portocolom', motivo: 'decret-91-2023-art-2', isla: 'mallorca' },
  ES5310096: { nombre: "Punta de n'Amer", motivo: 'decret-91-2023-art-2', isla: 'mallorca' },

  // Migjorn i llevant
  ES5310103: {
    nombre: 'Àrea marina cap de cala Figuera',
    motivo: 'decret-91-2023-art-2',
    isla: 'mallorca',
  },
  ES0000081: {
    nombre: 'Cap Enderrocat i cap Blanc (ZEPA)',
    motivo: 'decret-91-2023-art-2',
    isla: 'mallorca',
  },
  ES5310128: {
    nombre: 'Cap Enderrocat i cap Blanc (LIC)',
    motivo: 'decret-91-2023-art-2',
    isla: 'mallorca',
  },
  ES0000221: { nombre: 'Sa Dragonera', motivo: 'decret-91-2023-art-2', isla: 'mallorca' },
  ES0000227: { nombre: "Muntanyes d'Artà", motivo: 'decret-91-2023-art-2', isla: 'mallorca' },

  // -- Mallorca, resto del ámbito del Pla de Gestió Costa de Llevant ---------
  // No están en el art. 2, así que el régimen de pesca del Decret 91/2023 no
  // les alcanza; pero el apartado 5.8 del Decret 17/2023 sí, porque se aplica
  // al ámbito marino del plan en conjunto.
  ES5310098: {
    nombre: 'Cales de Manacor',
    motivo: 'ambit-mari-del-pla-de-gestio',
    isla: 'mallorca',
  },
  ES5310100: { nombre: 'Punta de Ras', motivo: 'ambit-mari-del-pla-de-gestio', isla: 'mallorca' },
  ES0000080: { nombre: 'Cap Vermell', motivo: 'ambit-mari-del-pla-de-gestio', isla: 'mallorca' },

  // -- Menorca, ámbito marino del art. 2 del Decret 91/2023 -----------------
  //
  // El LIC de l'àrea marina Punta Prima - Illa de l'Aire entra además invocado
  // por otra norma: el art. 6 del Decreto 26/2019 de la reserva marina obliga a
  // cumplir su plan de gestión en la parte de la reserva incluida en él.
  ES5310073: {
    nombre: 'Àrea marina Punta Prima - Illa de l’Aire',
    motivo: 'decret-91-2023-art-2',
    isla: 'menorca',
  },
  ES5310035: {
    nombre: 'Àrea marina del nord de Menorca',
    motivo: 'decret-91-2023-art-2',
    isla: 'menorca',
  },
  ES5310036: {
    nombre: 'Àrea marina del sud de Ciutadella',
    motivo: 'decret-91-2023-art-2',
    isla: 'menorca',
  },
  ES5310068: { nombre: 'Cap Negre', motivo: 'decret-91-2023-art-2', isla: 'menorca' },
  ES5310069: { nombre: 'Cala d’Algairens', motivo: 'decret-91-2023-art-2', isla: 'menorca' },
  ES5310070: {
    nombre: 'Punta Redona - Arenal d’en Castell',
    motivo: 'decret-91-2023-art-2',
    isla: 'menorca',
  },
  ES5310071: { nombre: 'Cala en Brut', motivo: 'decret-91-2023-art-2', isla: 'menorca' },
  ES5310072: { nombre: 'Caleta de Binillautí', motivo: 'decret-91-2023-art-2', isla: 'menorca' },
  ES5310074: {
    nombre: 'De cala Llucalari a Calescoves',
    motivo: 'decret-91-2023-art-2',
    isla: 'menorca',
  },
  ES5310075: { nombre: 'Arenal de Son Saura', motivo: 'decret-91-2023-art-2', isla: 'menorca' },
  ES0000233: { nombre: 'D’Addaia a s’Albufera', motivo: 'decret-91-2023-art-2', isla: 'menorca' },
  ES0000234: { nombre: 'S’Albufera des Grau', motivo: 'decret-91-2023-art-2', isla: 'menorca' },

  // -- Eivissa y Formentera, ámbito marino del art. 2 del Decret 91/2023 ------
  //
  // Faltaron enteras hasta el 2026-11-11, y no por decisión de la norma: el
  // art. 2 las lista igual que a las de Mallorca y Menorca. Fue una omisión de
  // esta tabla, y de las que cuestan: cuatro planes de gestión aprobados
  // cambian respuestas aquí —uno limita el fondeo por eslora, otro prohíbe la
  // pesca submarina, otro la hace autorizable solo ciertos días—.
  //
  // Pla de Gestió Natura 2000 de Formentera (Decret 17/2020)
  ES5310109: { nombre: 'Àrea marina de cala Saona', motivo: 'decret-91-2023-art-2', isla: 'formentera' },
  ES5310110: {
    nombre: 'Àrea marina de Platja de Tramuntana',
    motivo: 'decret-91-2023-art-2',
    isla: 'formentera',
  },
  ES5310111: {
    nombre: 'Àrea marina de Platja de Migjorn',
    motivo: 'decret-91-2023-art-2',
    isla: 'formentera',
  },
  ES5310024: { nombre: 'La Mola', motivo: 'decret-91-2023-art-2', isla: 'formentera' },
  ES5310025: { nombre: 'Cap de Barbaria', motivo: 'decret-91-2023-art-2', isla: 'formentera' },

  // Pla de Gestió Natura 2000 de ses Salines d'Eivissa i Formentera (Decret 48/2015)
  ES0000084: {
    nombre: "Ses Salines d'Eivissa i Formentera",
    motivo: 'decret-91-2023-art-2',
    isla: ['eivissa', 'formentera'],
  },

  // Pla de Gestió Natura 2000 Costa Oest d'Eivissa (Decret 49/2022)
  ES5310104: { nombre: "Costa de l'oest d'Eivissa", motivo: 'decret-91-2023-art-2', isla: 'eivissa' },
  ES5310023: { nombre: "Illots de ponent d'Eivissa", motivo: 'decret-91-2023-art-2', isla: 'eivissa' },
  ES0000078: { nombre: 'Es Vedrà - es Vedranell', motivo: 'decret-91-2023-art-2', isla: 'eivissa' },

  // Pla de Gestió Natura 2000 Illots del llevant d'Eivissa (Decret 29/2022)
  ES5310107: { nombre: 'Àrea marina de Tagomago', motivo: 'decret-91-2023-art-2', isla: 'eivissa' },
  ES0000082: { nombre: 'Tagomago', motivo: 'decret-91-2023-art-2', isla: 'eivissa' },
  ES0000242: {
    nombre: 'Illots de Santa Eulària, Rodona i es Canar',
    motivo: 'decret-91-2023-art-2',
    isla: 'eivissa',
  },

  // Norte de Eivissa: en el art. 2, con el plan de gestión en tramitación
  ES5310105: { nombre: "Es Amunts d'Eivissa", motivo: 'decret-91-2023-art-2', isla: 'eivissa' },
  ES5310106: {
    nombre: 'Àrea marina de ses Margalides',
    motivo: 'decret-91-2023-art-2',
    isla: 'eivissa',
  },
  ES5310112: { nombre: 'Nord de Sant Joan', motivo: 'decret-91-2023-art-2', isla: 'eivissa' },

  // -- Gestión estatal, aguas exteriores ------------------------------------
  ES0000515: {
    nombre: 'Espacio marino de Formentera y del sur de Ibiza',
    motivo: 'estatal-aguas-exteriores',
    isla: ['eivissa', 'formentera'],
  },
  ES0000516: {
    nombre: 'Espacio marino del poniente y norte de Ibiza',
    motivo: 'estatal-aguas-exteriores',
    isla: 'eivissa',
  },
  ES0000517: {
    nombre: 'Espacio marino del levante de Ibiza',
    motivo: 'estatal-aguas-exteriores',
    isla: 'eivissa',
  },
  // ZEC de gestión estatal con medidas de conservación aprobadas (Orden
  // AAA/1366/2016). Es el único espacio estatal de Baleares cuyo instrumento
  // regula algo que le importa a un patrón: el fondeo.
  ES5310108: {
    nombre: 'Área marina del cap Martinet',
    motivo: 'estatal-aguas-exteriores',
    isla: 'eivissa',
  },
  ES0000518: {
    nombre: 'Espacio marino del sur de Mallorca y Cabrera',
    motivo: 'estatal-aguas-exteriores',
    isla: ['mallorca', 'cabrera'],
  },
  ES0000519: {
    nombre: 'Espacio marino del poniente de Mallorca',
    motivo: 'estatal-aguas-exteriores',
    isla: 'mallorca',
  },
  ES0000520: {
    nombre: 'Espacio marino del norte de Mallorca',
    motivo: 'estatal-aguas-exteriores',
    isla: 'mallorca',
  },
  ES0000521: {
    nombre: 'Espacio marino del norte y oeste de Menorca',
    motivo: 'estatal-aguas-exteriores',
    isla: 'menorca',
  },
  ES0000522: {
    nombre: 'Espacio marino del sureste de Menorca',
    motivo: 'estatal-aguas-exteriores',
    isla: 'menorca',
  },
  // El canal separa ambas islas: su borde occidental llega hasta la costa de
  // llevant de Mallorca, así que la figura recae sobre las dos.
  ESZZ16002: {
    nombre: 'Canal de Menorca',
    motivo: 'estatal-aguas-exteriores',
    isla: ['mallorca', 'menorca'],
  },
};

/** Códigos que se descargan. El resto de la capa oficial se ignora. */
export const CODIGOS_MARINOS = Object.keys(N2000_MARINO);

export function esMarino(codigo) {
  return Object.prototype.hasOwnProperty.call(N2000_MARINO, codigo);
}
