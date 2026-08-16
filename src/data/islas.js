/**
 * Pertenencia de cada zona a una isla, declarada explícitamente.
 *
 * NO se deriva del centroide ni del bounding box de la geometría. En polígonos
 * marinos grandes el centroide puede caer lejos de la isla que la figura
 * regula, y la pertenencia jurídica de una zona no se decide por una
 * aproximación geométrica. Los centroides se han usado únicamente como apoyo
 * de consulta al redactar esta tabla; lo vinculante es lo escrito aquí.
 *
 * Cuando se activen muchas capas, esta tabla se sustituirá por una intersección
 * espacial contra las geometrías oficiales de las islas — nunca por centroides.
 *
 * Valores: 'mallorca' | 'menorca' | 'eivissa' | 'formentera' | 'cabrera'
 * Una zona que abarca varias islas admite un array.
 *
 * Toda zona de una fuente activa debe figurar aquí: `npm run rules:check`
 * falla si aparece una zona sin asignar.
 */
export const ISLAS_POR_ZONA = {
  // -- Mallorca --------------------------------------------------------------

  // Illots dels Calafats, frente a Sant Elm, contiguos a sa Dragonera.
  'rm-entorn-dels-illots-dels-calafats--zona-d-alta-proteccio--autonomica': 'mallorca',

  'rm-reserva-marina-de-la-badia-de-palma--reserva-marina--autonomica': 'mallorca',
  'rm-reserva-marina-de-la-badia-de-palma--zona-de-proteccio-especial--autonomica': 'mallorca',

  'rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica': 'mallorca',
  'rm-reserva-marina-del-migjorn-de-mallorca--zona-de-veda-de-pesca-recreativa--autonomica': 'mallorca',
  'rm-reserva-integral-del-migjorn-de-mallorca--zona-de-proteccio-especial--autonomica': 'mallorca',

  // Llevant: la reserva marina y la integral existen por duplicado, una estatal
  // y otra autonómica, con perímetros y regímenes distintos.
  'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--autonomica': 'mallorca',
  'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--estatal': 'mallorca',
  'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-integral--autonomica': 'mallorca',
  'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-integral--estatal': 'mallorca',
  'rm-reserva-marina-del-levante-de-mallorca-cala-rajada--zona-d-us-restringit--estatal': 'mallorca',

  // sa Dragonera: figuras autonómicas y estatales conviven con regímenes
  // distintos. Se conservan todas por separado.
  'rm-reserva-marina-de-sa-dragonera-reserva-marina-autonomica--reserva-marina--autonomica': 'mallorca',
  'rm-reserva-marina-de-sa-dragonera-reserva-marina-estatal--reserva-marina--estatal': 'mallorca',
  'rm-reserva-marina-de-sa-dragonera-reserva-marina-integral-estatal--reserva-integral--estatal': 'mallorca',
  'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-cap-de-llebeig--zona-d-us-restringit--estatal':
    'mallorca',
  'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-cap-de-tramuntana--zona-d-us-restringit--estatal':
    'mallorca',
  'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-far-vell--zona-d-us-restringit--estatal':
    'mallorca',
  'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-pla-de-s-alga--zona-d-us-restringit--estatal':
    'mallorca',
  'rm-reserva-marina-de-sa-dragonera-zona-d-usos-restringits-zur-sa-finestra--zona-d-us-restringit--estatal':
    'mallorca',

  // Ponent de Mallorca (Decret 26/2025) y las figuras que conviven con ella.
  'rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica': 'mallorca',
  // 'rm-reserva-marina-illes-malgrats--reserva-marina' ya no figura: su geometría
  // era un residuo de 0,005 m² de la reserva derogada y fetch-sources la descarta.
  'rm-zona-d-alta-proteccio-de-les-illes-malgrats--zona-d-alta-proteccio--autonomica': 'mallorca',
  'rm-zona-d-alta-proteccio-de-l-illa-del-toro--zona-d-alta-proteccio--autonomica': 'mallorca',
  'rm-zona-d-alta-proteccio-de-l-illa-del-sec--zona-d-alta-proteccio--autonomica': 'mallorca',
  'rm-zona-de-proteccio-pesquera-de-la-badia-de-santa-ponca--zona-de-proteccio-pesquera--autonomica': 'mallorca',
  // Zonas de buceo del Decret 38/2022, con perímetro coincidente con las
  // zonas de alta protección del Toro y els Malgrats.
  'rm-zona-especial-de-busseig-de-l-illa-del-toro--zona-especial-de-busseig--autonomica': 'mallorca',
  'rm-zona-especial-de-busseig-de-les-illes-malgrats--zona-especial-de-busseig--autonomica': 'mallorca',

  // -- Espacios naturales protegidos, ámbito marino --------------------------
  //
  // Solo se carga la parte marina de cada espacio: la terrestre es mucho mayor
  // y no dice nada sobre lo que se puede hacer en el agua. El sufijo `--mari`
  // del zoneId es esa distinción, y es jurídica: el PORN de la Serra de
  // Tramuntana regula la pesca y el fondeo «en el ámbito marino que delimita
  // este Plan».
  'enp-es530018-paratge-natural-de-la-serra-de-tramuntana--paratge-natural--mari': 'mallorca',
  'enp-es530007-parc-natural-de-la-peninsula-de-llevant--parc-natural--mari': 'mallorca',
  'enp-es0000037-parc-natural-maritimoterrestre-es-trenc-salobrar-de-campos--parc-natural--mari':
    'mallorca',
  'enp-es530002-parc-nacional-maritimoterrestre-de-l-arxipelag-de-cabrera--parc-nacional--mari':
    'cabrera',
  'enp-es530004-parc-natural-de-s-albufera-des-grau--parc-natural--mari': 'menorca',
  'enp-es530014-reserves-naturals-de-les-illes-des-porros-s-estany-la-bassa-de-morella-es-prat-i-l-illa-d-en-colom--reserva-natural--mari':
    'menorca',
  'enp-es530010-parc-natural-de-ses-salines-d-eivissa-i-formentera--parc-natural--mari': [
    'eivissa',
    'formentera',
  ],

  // -- Zonificación marina de los ENP ----------------------------------------
  //
  // Categorías del art. 22 de la Ley 5/2005 dentro del ámbito marino del Parc
  // Natural de s'Albufera des Grau, delimitadas por el PRUG (Decret 39/2021).
  // No son figuras distintas del parque: son el interior del parque, y por eso
  // lo que se puede hacer en cada punto depende de en cuál se esté.
  'zon-04-ag-parc-natural-de-s-albufera-des-grau--zona-d-exclusio--mari': 'menorca',
  'zon-04-ag-parc-natural-de-s-albufera-des-grau--zona-d-us-limitat--mari': 'menorca',
  'zon-04-ag-parc-natural-de-s-albufera-des-grau--zona-d-us-compatible--mari': 'menorca',

  // -- Regulación específica de pesca submarina -------------------------------
  'psub-04-ag-parc-natural-de-s-albufera-des-grau--zona-pesca-submarina-condicionada--mari':
    'menorca',
  'psub-04-ag-parc-natural-de-s-albufera-des-grau--zona-pesca-submarina-prohibida--mari': 'menorca',

  // -- Menorca ---------------------------------------------------------------
  'rm-reserva-marina-del-nord-de-menorca--reserva-marina--autonomica': 'menorca',
  'rm-reserva-marina-del-nord-de-menorca--zona-de-proteccio-especial--autonomica': 'menorca',
  'rm-reserva-marina-del-nord-de-menorca--zona-de-veda-de-pesca-recreativa--autonomica': 'menorca',
  'rm-reserva-marina-de-l-illa-de-l-aire--reserva-marina--autonomica': 'menorca',
  'rm-reserva-marina-de-l-illa-de-l-aire--zona-especial-de-busseig--autonomica': 'menorca',

  // -- Eivissa ---------------------------------------------------------------
  'rm-reserva-marina-costa-nord-est-eivissa-tagomago--reserva-marina--autonomica': 'eivissa',
  'rm-reserva-integral-costa-nord-est-eivissa-tagomago--reserva-integral--autonomica': 'eivissa',
  'rm-reserva-marina-de-ses-bledes--reserva-marina--autonomica': 'eivissa',
  'rm-reserva-marina-de-ses-bledes-zona-d-especial-proteccio-de-na-bosc-es-vaixell-i-na-gorra--zona-de-proteccio-especial--autonomica':
    'eivissa',
  'rm-reserva-marina-es-vedra-vedranell--reserva-marina--autonomica': 'eivissa',
  'rm-reserva-marina-es-vedra-vedranell-zona-d-especial-proteccio-es-vedra-punta-de-na-bruta--zona-de-proteccio-especial--autonomica':
    'eivissa',

  // -- Formentera ------------------------------------------------------------
  // Punta de sa Creu, en la costa nord-est de Formentera.
  'rm-reserva-marina-punta-de-sa-creu--reserva-marina--autonomica': 'formentera',

  // -- Eivissa y Formentera --------------------------------------------------
  // Els Freus separan ambas islas: la figura recae sobre las dos.
  'rm-reserva-marina-dels-freus-d-eivissa-i-formentera--reserva-marina--autonomica': ['eivissa', 'formentera'],
  'rm-reserva-marina-dels-freus-d-eivissa-i-formentera--zona-de-proteccio-maxima--autonomica': [
    'eivissa',
    'formentera',
  ],
  'rm-reserva-marina-dels-freus-d-eivissa-i-formentera--zona-de-veda-de-pesca-recreativa--autonomica': [
    'eivissa',
    'formentera',
  ],
};

/**
 * Vista de todas las islas a la vez.
 *
 * No es una isla: es la opción por defecto del selector, y por eso vive fuera
 * de `ISLAS`. Meterla ahí rompería la validación de pertenencia —ninguna zona
 * puede estar asignada a «todas»— y el reparto de la cartografía por fichero.
 */
export const TODAS_LAS_ISLAS = 'todas';
export const ETIQUETA_TODAS = 'Todas las islas';

/** Vista que la web abre si la URL no dice otra cosa. */
export const ISLA_ACTIVA = TODAS_LAS_ISLAS;

export const ISLAS = {
  mallorca: 'Mallorca',
  menorca: 'Menorca',
  eivissa: 'Eivissa',
  formentera: 'Formentera',
  cabrera: 'Cabrera',
};

export function zonaEnIsla(isla, valor) {
  if (!valor) return false;
  return Array.isArray(valor) ? valor.includes(isla) : valor === isla;
}
