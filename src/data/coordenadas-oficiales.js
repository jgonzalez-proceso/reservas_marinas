/**
 * Coordenadas oficiales publicadas por el Govern para los vértices de las
 * reservas marinas de Mallorca, en ETRS89.
 *
 * ETRS89 geográfico y WGS84 difieren en menos de un metro a efectos de
 * cartografía web, así que estos valores se usan tal cual, sin reproyección.
 *
 * ESTOS PUNTOS NO SON LA GEOMETRÍA DE LA APLICACIÓN. Son solo los vértices en
 * mar abierto: la Badia de Palma, el Migjorn y el Llevant cierran contra la
 * línea de costa, no con un segmento recto entre el primer y el último punto.
 * Trazar polígonos con estas listas produciría límites que cortan por tierra.
 * La geometría viene de IDEIB; estas tablas son el control de calidad que
 * verifica que esa geometría se corresponde con lo publicado.
 *
 * Cada bloque declara todas las zonas de la reserva. La verificación mide la
 * distancia de cada punto al contorno más cercano de entre esas zonas: las
 * mayúsculas suelen corresponder al límite exterior y las minúsculas a las
 * zonificaciones interiores, pero la correspondencia exacta letra-zona no está
 * publicada de forma inequívoca y no se asume.
 */

export const TABLAS_OFICIALES = [
  {
    reserva: 'Reserva Marina de la Badia de Palma',
    nota: 'Incluye una zona de protección integral al sur de Cap Enderrocat.',
    zonas: [
      'rm-reserva-marina-de-la-badia-de-palma--reserva-marina--autonomica',
      'rm-reserva-marina-de-la-badia-de-palma--zona-de-proteccio-especial--autonomica',
    ],
    puntos: [
      { etiqueta: 'A', lat: 39.498933, lon: 2.747583, original: "39° 29,936' N — 2° 44,855' E" },
      { etiqueta: 'B', lat: 39.498933, lon: 2.702167, original: "39° 29,936' N — 2° 42,130' E" },
      { etiqueta: 'C', lat: 39.412167, lon: 2.729167, original: "39° 24,730' N — 2° 43,750' E" },
      { etiqueta: 'D', lat: 39.412167, lon: 2.739667, original: "39° 24,730' N — 2° 44,380' E" },
      { etiqueta: 'a', lat: 39.476533, lon: 2.722367, original: "39° 28,592' N — 2° 43,342' E" },
      { etiqueta: 'b', lat: 39.473833, lon: 2.704333, original: "39° 28,430' N — 2° 42,260' E" },
      { etiqueta: 'c', lat: 39.459167, lon: 2.727, original: "39° 27,550' N — 2° 43,620' E" },
      { etiqueta: 'd', lat: 39.4506, lon: 2.741367, original: "39° 27,036' N — 2° 44,482' E" },
    ],
  },

  {
    reserva: 'Reserva Marina del Migjorn de Mallorca',
    nota: 'La tabla gráfica oficial del Govern salta de la letra d a la f: la ausencia de e no es un error de transcripción.',
    zonas: [
      'rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica',
      'rm-reserva-marina-del-migjorn-de-mallorca--zona-de-veda-de-pesca-recreativa--autonomica',
      'rm-reserva-integral-del-migjorn-de-mallorca--zona-de-proteccio-especial--autonomica',
    ],
    puntos: [
      { etiqueta: 'A', lat: 39.363833, lon: 2.788917, original: "39° 21,830' N — 2° 47,335' E" },
      { etiqueta: 'B', lat: 39.260283, lon: 2.919717, original: "39° 15,617' N — 2° 55,183' E" },
      { etiqueta: 'C', lat: 39.2238, lon: 2.965583, original: "39° 13,428' N — 2° 57,935' E" },
      { etiqueta: 'D', lat: 39.2238, lon: 3.058917, original: "39° 13,428' N — 3° 03,535' E" },
      { etiqueta: 'E', lat: 39.322167, lon: 3.173917, original: "39° 19,330' N — 3° 10,435' E" },
      { etiqueta: 'F', lat: 39.328333, lon: 3.173917, original: "39° 19,700' N — 3° 10,435' E" },
      { etiqueta: 'a', lat: 39.292167, lon: 3.096333, original: "39° 17,530' N — 3° 05,780' E" },
      { etiqueta: 'b', lat: 39.2805, lon: 3.115833, original: "39° 16,830' N — 3° 06,950' E" },
      { etiqueta: 'c', lat: 39.288167, lon: 3.126333, original: "39° 17,290' N — 3° 07,580' E" },
      { etiqueta: 'd', lat: 39.302167, lon: 3.1095, original: "39° 18,130' N — 3° 06,570' E" },
      { etiqueta: 'f', lat: 39.3263, lon: 2.985967, original: "39° 19,578' N — 2° 59,158' E" },
      { etiqueta: 'g', lat: 39.306567, lon: 2.959833, original: "39° 18,394' N — 2° 57,590' E" },
      { etiqueta: 'h', lat: 39.325967, lon: 2.9107, original: "39° 19,558' N — 2° 54,642' E" },
      { etiqueta: 'i', lat: 39.362933, lon: 2.956333, original: "39° 21,776' N — 2° 57,380' E" },
    ],
  },

  {
    reserva: 'Reserva Marina del Llevant de Mallorca',
    nota: 'La zona de protección especial se sitúa entre Cap Ferrutx y Penya des Llamp.',
    zonas: [
      'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--autonomica',
      'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--estatal',
      'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-integral--autonomica',
      'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-integral--estatal',
      'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--zona-d-us-restringit--estatal',
    ],
    puntos: [
      { etiqueta: 'A', lat: 39.756167, lon: 3.32, original: "39° 45,370' N — 3° 19,200' E" },
      { etiqueta: 'B', lat: 39.867783, lon: 3.32, original: "39° 52,067' N — 3° 19,200' E" },
      { etiqueta: 'C', lat: 39.816667, lon: 3.441667, original: "39° 49,000' N — 3° 26,500' E" },
      { etiqueta: 'D', lat: 39.7025, lon: 3.5, original: "39° 42,150' N — 3° 30,000' E" },
      { etiqueta: 'E', lat: 39.7025, lon: 3.456333, original: "39° 42,150' N — 3° 27,380' E" },
      { etiqueta: 'F', lat: 39.747333, lon: 3.4595, original: "39° 44,840' N — 3° 27,570' E" },
      { etiqueta: 'a', lat: 39.788167, lon: 3.35, original: "39° 47,290' N — 3° 21,000' E" },
      { etiqueta: 'b', lat: 39.816667, lon: 3.35, original: "39° 49,000' N — 3° 21,000' E" },
      { etiqueta: 'c', lat: 39.816667, lon: 3.3975, original: "39° 49,000' N — 3° 23,850' E" },
      { etiqueta: 'd', lat: 39.764167, lon: 3.3975, original: "39° 45,850' N — 3° 23,850' E" },
    ],
  },

  {
    reserva: 'Reserva Marina de sa Dragonera',
    nota: 'Cartografía del Govern actualizada a 2025. Conviven figuras autonómicas y estatales.',
    zonas: [
      'rm-reserva-marina-de-sa-dragonera-reserva-marina-autonomica--reserva-marina--autonomica',
      'rm-reserva-marina-de-sa-dragonera-reserva-marina-estatal--reserva-marina--estatal',
      'rm-reserva-marina-de-sa-dragonera-reserva-marina-integral-estatal--reserva-integral--estatal',
      'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-cap-de-llebeig--zona-d-us-restringit--estatal',
      'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-cap-de-tramuntana--zona-d-us-restringit--estatal',
      'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-far-vell--zona-d-us-restringit--estatal',
      'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-pla-de-s-alga--zona-d-us-restringit--estatal',
      'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-sa-finestra--zona-d-us-restringit--estatal',
      'rm-entorn-dels-illots-dels-calafats--zona-d-alta-proteccio--autonomica',
    ],
    puntos: [
      { etiqueta: 'A', lat: 39.60555, lon: 2.356117, original: "39° 36,333' N — 2° 21,367' E" },
      { etiqueta: 'B', lat: 39.59805, lon: 2.338883, original: "39° 35,883' N — 2° 20,333' E" },
      { etiqueta: 'C', lat: 39.572767, lon: 2.30305, original: "39° 34,366' N — 2° 18,183' E" },
      { etiqueta: 'D', lat: 39.56715, lon: 2.302217, original: "39° 34,029' N — 2° 18,133' E" },
      { etiqueta: 'E', lat: 39.564583, lon: 2.346533, original: "39° 33,875' N — 2° 20,792' E" },
      { etiqueta: 'F', lat: 39.60555, lon: 2.332633, original: "39° 36,333' N — 2° 19,958' E" },
      { etiqueta: 'G', lat: 39.576333, lon: 2.289333, original: "39° 34,580' N — 2° 17,360' E" },
      { etiqueta: 'h', lat: 39.597183, lon: 2.338417, original: "39° 35,831' N — 2° 20,305' E" },
      { etiqueta: 'i', lat: 39.5919, lon: 2.340117, original: "39° 35,514' N — 2° 20,407' E" },
      { etiqueta: 'j', lat: 39.586217, lon: 2.3332, original: "39° 35,173' N — 2° 19,992' E" },
      { etiqueta: 'k', lat: 39.58675, lon: 2.328883, original: "39° 35,205' N — 2° 19,733' E" },
    ],
  },

  {
    reserva:
      'Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec',
    nota: 'Delimitación modificada en 2025 (Decret 26/2025), sustituyendo a la antigua reserva de les illes del Toro i les Malgrats.',
    zonas: [
      'rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica',
      'rm-zona-d-alta-proteccio-de-les-illes-malgrats--zona-d-alta-proteccio--autonomica',
      'rm-zona-d-alta-proteccio-de-l-illa-del-toro--zona-d-alta-proteccio--autonomica',
      'rm-zona-d-alta-proteccio-de-l-illa-del-sec--zona-d-alta-proteccio--autonomica',
      'rm-zona-de-proteccio-pesquera-de-la-badia-de-santa-ponca--zona-de-proteccio-pesquera--autonomica',
      'rm-zona-especial-de-busseig-de-l-illa-del-toro--zona-especial-de-busseig--autonomica',
      'rm-zona-especial-de-busseig-de-les-illes-malgrats--zona-especial-de-busseig--autonomica',
    ],
    puntos: [
      { etiqueta: 'A', lat: 39.4864, lon: 2.535267, original: "39° 29,184' N — 2° 32,116' E" },
      { etiqueta: 'B', lat: 39.48455, lon: 2.55245, original: "39° 29,073' N — 2° 33,147' E" },
      { etiqueta: 'C', lat: 39.439483, lon: 2.5176, original: "39° 26,369' N — 2° 31,056' E" },
      { etiqueta: 'D', lat: 39.45765, lon: 2.467383, original: "39° 27,459' N — 2° 28,043' E" },
      { etiqueta: 'E', lat: 39.487667, lon: 2.45215, original: "39° 29,260' N — 2° 27,129' E" },
      { etiqueta: 'F', lat: 39.4931, lon: 2.434133, original: "39° 29,586' N — 2° 26,048' E" },
      { etiqueta: 'G', lat: 39.509817, lon: 2.4593, original: "39° 30,589' N — 2° 27,558' E" },
      { etiqueta: 'H', lat: 39.518967, lon: 2.466817, original: "39° 31,138' N — 2° 28,009' E" },
      { etiqueta: 'i', lat: 39.50485, lon: 2.456233, original: "39° 30,291' N — 2° 27,374' E" },
      { etiqueta: 'j', lat: 39.496717, lon: 2.443783, original: "39° 29,803' N — 2° 26,627' E" },
      { etiqueta: 'k', lat: 39.492567, lon: 2.44795, original: "39° 29,554' N — 2° 26,877' E" },
      { etiqueta: 'l', lat: 39.498883, lon: 2.459417, original: "39° 29,933' N — 2° 27,565' E" },
      { etiqueta: 'm', lat: 39.4775, lon: 2.478067, original: "39° 28,650' N — 2° 28,684' E" },
      { etiqueta: 'n', lat: 39.461467, lon: 2.468417, original: "39° 27,688' N — 2° 28,105' E" },
      { etiqueta: 'o', lat: 39.459633, lon: 2.471183, original: "39° 27,578' N — 2° 28,271' E" },
      { etiqueta: 'p', lat: 39.471883, lon: 2.491533, original: "39° 28,313' N — 2° 29,492' E" },
      { etiqueta: 'q', lat: 39.481933, lon: 2.54005, original: "39° 28,916' N — 2° 32,403' E" },
      { etiqueta: 'r', lat: 39.480917, lon: 2.544717, original: "39° 28,855' N — 2° 32,683' E" },
      { etiqueta: 's', lat: 39.4773, lon: 2.540917, original: "39° 28,638' N — 2° 32,455' E" },
      { etiqueta: 't', lat: 39.4783, lon: 2.53795, original: "39° 28,698' N — 2° 32,277' E" },
      { etiqueta: 'u', lat: 39.4617, lon: 2.500267, original: "39° 27,702' N — 2° 30,016' E" },
    ],
  },
];

export const TOTAL_PUNTOS = TABLAS_OFICIALES.reduce((n, t) => n + t.puntos.length, 0);

/**
 * Discrepancias investigadas y documentadas entre las tablas publicadas y la
 * geometría oficial de IDEIB.
 *
 * Solo estas eximen del fallo del verificador. Cualquier discrepancia nueva
 * —por ejemplo tras una actualización del dataset del Govern— hace fallar
 * `npm run verify`, que es justo lo que se quiere: una diferencia no revisada
 * nunca debe pasar en silencio.
 *
 * Clave: `<reserva>|<etiqueta>`.
 */
export const DISCREPANCIAS_CONOCIDAS = {
  'Reserva Marina del Migjorn de Mallorca|A': {
    motivo:
      'El vértice cae sobre la costa, en Cap Blanc. La geometría oficial está recortada a la línea de costa y el vértice publicado en el decreto no lo está, de ahí la separación.',
    revisadoEl: '2026-08-15',
  },
  'Reserva Marina del Migjorn de Mallorca|g': {
    motivo:
      'El cuadrilátero f-g-h-i de la tabla no se corresponde con ningún polígono de la capa oficial vigente: f e i quedan a ~18 m del límite de la reserva marina, mientras g y h caen 2,3 y 2,9 km dentro. Pendiente de contrastar contra el plano de zonificación publicado por el Govern.',
    revisadoEl: '2026-08-15',
  },
  'Reserva Marina del Migjorn de Mallorca|h': {
    motivo: 'Mismo caso que el punto g del cuadrilátero f-g-h-i.',
    revisadoEl: '2026-08-15',
  },
};
