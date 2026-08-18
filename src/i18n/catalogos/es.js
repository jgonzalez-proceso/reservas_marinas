/**
 * Catalogo de interfaz en castellano: el original.
 *
 * Toda cadena que el usuario pueda leer vive aqui, salvo el texto normativo de
 * las fichas, que se queda en `src/rules/` porque es contenido citado y no
 * interfaz. La frontera es esa: si cambiarlo exige releer el BOIB, no es
 * interfaz.
 *
 * Las claves son planas y con punto. Un objeto anidado se lee mejor en el
 * fichero y mucho peor en el diff, que es donde de verdad se revisan estas
 * cosas: con claves planas, anadir una linea es una linea.
 *
 * Las que acaban en `Html` llevan marcado y se insertan con `innerHTML`. Es
 * seguro porque el contenido son estos ficheros y nada mas —aqui no entra
 * texto de nadie— y hace falta porque partir un parrafo con un enlace en medio
 * en tres cadenas es la manera segura de que ningun traductor pueda ordenarlo
 * como lo pide su idioma.
 */

export default {
  // -- Cabecera y estructura -------------------------------------------------
  'app.titulo': 'Restricciones marítimas',
  'app.subtitulo': 'Illes Balears',
  'app.subtituloIsla': 'Illes Balears · {isla}',
  'app.tituloDocumento': 'Restricciones marítimas · Illes Balears',
  'app.metaDescripcion':
    'Mapa de reservas marinas y restricciones de pesca de las Illes Balears. Consulta qué ' +
    'se puede hacer en cada punto del mar y qué autorizaciones hacen falta.',
  'app.saltarAlMapa': 'Ir al mapa',
  'app.mapaAria': 'Mapa de zonas de protección',
  'app.listaAria': 'Listado de zonas',
  'app.panelAria': 'Restricciones del punto consultado',
  'app.cargando': 'Cargando la cartografía oficial…',
  'app.cargaError': '{mensaje} Recarga la página para reintentarlo.',
  'app.errorManifiesto': 'El manifiesto no declara cartografía para esta vista.',
  'app.errorFalta': 'Falta {fichero}; ejecuta "npm run data".',
  'app.errorDescarga': 'No se ha podido cargar {fichero} ({estado}).',

  'cabecera.isla': 'Isla',
  'cabecera.islaAria': 'Isla que se muestra en el mapa',
  'cabecera.idioma': 'Idioma',
  'cabecera.idiomaAria': 'Idioma de la interfaz',
  'cabecera.zonas': 'Zonas',
  'cabecera.estoyDentro': '¿Estoy dentro?',

  'menu.titulo': 'Menú',
  'menu.abrir': 'Abrir menú',
  'menu.cerrar': 'Cerrar menú',
  'menu.volver': 'Volver',

  'islas.todas': 'Todas las islas',

  // -- Pie -------------------------------------------------------------------
  'pie.geometrias': '{n} geometrías',
  'pie.deVista': ' de {vista}',
  'pie.datos': ' · datos',
  'pie.deFuentes': ' de {fuentes}',
  'pie.delDia': ' del {fecha}',
  'pie.fechaDesconocida': 'desconocida',
  'pie.avisoHtml':
    'Web informativa no oficial. La fuente vinculante es la norma publicada en el ' +
    '<a href="https://www.caib.es/eboibfront/" target="_blank" rel="noopener noreferrer">BOIB</a> ' +
    'o el <a href="https://www.boe.es/" target="_blank" rel="noopener noreferrer">BOE</a> y la ' +
    'cartografía oficial de ' +
    '<a href="https://ideib.caib.es/reservesmarines/" target="_blank" rel="noopener noreferrer">IDEIB</a>. ' +
    'Comprueba siempre la normativa vigente antes de faenar.',

  // -- Bloque «Que es este mapa» --------------------------------------------
  'acerca.resumen': 'Qué es este mapa',
  'acerca.p1Html':
    'Esto no es un mapa de reservas marinas: es un motor de consulta de restricciones ' +
    'marítimas, donde la reserva marina es una de <strong>seis capas regulatorias</strong> ' +
    'que se cruzan sobre cada punto del mar. Pulsa cualquier punto y el motor reúne todas ' +
    'las figuras de protección que lo contienen —reservas marinas, Red Natura 2000, ' +
    'espacios naturales protegidos, su zonificación interna, la regulación específica de ' +
    'pesca submarina y la del fondeo— y devuelve una conclusión por actividad: pesca desde ' +
    'embarcación, pesca submarina, pesca desde costa, buceo, fondeo y navegación, con el ' +
    'motivo y la norma que la justifica.',
  'acerca.p2Html':
    'Cubre las <strong>96 zonas</strong> cargadas hasta ahora en las cuatro islas y ' +
    'Cabrera, todas con ficha redactada y citada contra el BOIB o el BOE: las doce reservas ' +
    'marinas de Baleares, los espacios marinos de la Red Natura 2000, los siete espacios ' +
    'naturales protegidos con ámbito marino y la zonificación interna de s’Albufera des ' +
    'Grau y ses Salines.',
  'acerca.p3Html':
    'Sigue faltando trabajo: capas enteras como la posidonia o la zonificación de Cabrera y ' +
    'sa Dragonera todavía no están cargadas, y dentro de las fichas hay condiciones que ' +
    'remiten a normas que este mapa aún no dibuja. Es una web informativa no oficial —la ' +
    'fuente vinculante es siempre la norma publicada y la cartografía de IDEIB—, no un ' +
    'sustituto de consultarla antes de faenar.',

  // -- Panel -----------------------------------------------------------------
  'panel.titulo': 'Toca el mapa',
  'panel.subtitulo': 'Consulta las restricciones de cualquier punto.',
  'panel.subtituloLargo': 'Consulta las restricciones de cualquier punto del mar.',
  'panel.cerrar': 'Cerrar panel',
  'panel.ayuda1':
    'Pulsa sobre cualquier punto para ver qué figuras de protección lo afectan y qué se ' +
    'puede hacer allí.',
  'panel.ayuda2':
    'Si estás navegando, usa el botón de ubicación: además de decirte si estás dentro, te ' +
    'dirá a qué distancia del límite estás y si tu GPS da para afirmarlo.',
  'panel.sinFiguras': 'Sin figuras en este punto',
  'panel.queSePuedeHacer': 'Qué se puede hacer aquí',
  'panel.figuraUna': 'Figura que afecta a este punto',
  'panel.figurasVarias': '{n} figuras afectan a este punto',
  'panel.notaOrden':
    'Se listan de la más general a la más restrictiva. Todas aplican simultáneamente.',
  'panel.arrastrar': 'Arrastrar para reordenar «{nombre}»',
  'panel.autorizacionGratuita': 'Autorización gratuita',
  'panel.tasa': 'Tasa: {importe}',
  'panel.importeNoPublicado': 'Requiere autorización · importe no publicado',
  'panel.vigencia': ' · vigencia {vigencia}',
  'panel.tramitar': 'Tramitar en la Seu Electrònica',
  'panel.importeVerificado': 'Importe verificado el {fecha}',
  'panel.tambienRige': 'También rige aquí, por {nombre}:',
  'panel.loDetermina': 'Lo determina: ',
  'panel.tambienImponen': ' (también lo imponen: {lista})',
  'panel.heredada': 'Regla del régimen general de {nombre}, que se aplica también a esta zona.',
  'panel.incompletaCon':
    'Información incompleta: {lista} todavía no tiene redactada su regla para esta ' +
    'actividad. Consulta la norma.',
  'panel.incompletaSin': 'Información incompleta para esta actividad.',
  'panel.normaUna': 'Norma',
  'panel.normasVarias': 'Normas ({n})',
  'panel.fuenteUna': 'Fuente',
  'panel.fuentesVarias': 'Fuentes ({n})',
  'panel.descargo':
    'Información orientativa y no oficial. La fuente vinculante es la norma publicada en el ' +
    'BOIB o el BOE y la cartografía oficial de IDEIB.',
  'panel.competencia': 'competencia {competencia}',
  'panel.distancia': 'A {distancia} del límite.',

  'competencia.Estatal': 'estatal',
  'competencia.Autonòmica': 'autonómica',

  // Aviso que aparece solo cuando la interfaz va en un idioma y el texto
  // normativo en otro. Se dice una vez y arriba: marcar frase por frase
  // convertiria el panel en un campo de asteriscos.
  'panel.normativaEnCastellano':
    'Los motivos, condiciones y títulos de norma se muestran en castellano, que es la lengua ' +
    'en que están redactadas y citadas las fichas de este mapa.',

  // -- Actividades -----------------------------------------------------------
  'actividad.pescaRecreativaEmbarcacion': 'Pesca recreativa desde embarcación',
  'actividad.pescaSubmarina': 'Pesca submarina',
  'actividad.pescaDesdeCosta': 'Pesca recreativa desde costa',
  'actividad.buceo': 'Buceo',
  'actividad.fondeo': 'Fondeo',
  'actividad.navegacion': 'Navegación',

  // -- Estados ---------------------------------------------------------------
  'estado.allowed': 'Permitida',
  'estado.allowed_with_authorization': 'Permitida con autorización',
  'estado.restricted': 'Restringida',
  'estado.prohibited': 'Prohibida',
  'estado.not_regulated': 'Sin restricción específica',
  'estado.unknown': 'No determinable',

  // -- Motor -----------------------------------------------------------------
  'motor.sinFiguras':
    'Este punto no está dentro de ninguna de las zonas de protección actualmente ' +
    'cargadas en el mapa. Sigue siendo aplicable la normativa general y pueden ' +
    'existir otras restricciones.',
  'motor.sinRegla':
    'Ninguna de las figuras que afectan a este punto tiene todavía redactada su ' +
    'regla para esta actividad. Consulta la norma directamente.',

  // -- Leyenda ---------------------------------------------------------------
  'leyenda.titulo': 'Leyenda',
  'leyenda.nota':
    'Las capas se pueden encender y apagar desde el control del mapa. Apagar una capa no la ' +
    'desactiva: al pulsar un punto se sigue consultando todas, y sus figuras aparecen ' +
    'igualmente en el panel. El color indica el tipo de figura, no lo que está prohibido; ' +
    'eso lo dice el panel, actividad por actividad.',

  // -- Buscador --------------------------------------------------------------
  'buscador.placeholder': 'Buscar entre {n} zonas…',
  'buscador.aria': 'Buscar zona de protección',
  'buscador.vacio': 'Ninguna zona coincide con la búsqueda.',
  'buscador.sinFicha': 'sin ficha',
  'buscador.sinFichaTitulo': 'Las restricciones de esta zona todavía no están redactadas.',

  // -- Capas base y superpuestas --------------------------------------------
  'capa.satelite': 'Satélite',
  'capa.ortofoto': 'Ortofoto oficial (IDEIB)',
  'capa.callejero': 'Mapa (OpenStreetMap)',
  'capa.nautica': 'Carta náutica (OpenSeaMap)',
  'capa.sinEfectoPesca': '{titulo} — sin efecto en la pesca',

  // -- Nombres de las fuentes de cartografia --------------------------------
  // Estan tambien en manifest.json, que es un fichero generado y por tanto no
  // se traduce: se traducen aqui por id de fuente y el generado se queda como
  // esta. Un id sin entrada cae al titulo del manifiesto, que es castellano.
  'fuente.reservas-marinas': 'Reservas marinas',
  'fuente.natura2000': 'Red Natura 2000 (ámbito marino)',
  'fuente.espacios-naturales': 'Espacios naturales protegidos (ámbito marino)',
  'fuente.zonificacion-enp': 'Zonificación marina de los espacios naturales protegidos',
  'fuente.regulacion-fondeo': 'Regulación del fondeo',
  'fuente.regulacion-pesca-submarina': 'Regulación específica de pesca submarina',
  'fuente.posidonia': 'Protección de la posidonia (Decret 25/2018)',

  // -- Descripciones de los tipos de figura ---------------------------------
  // La clave es el nombre oficial tal y como lo publica IDEIB, en catalan o en
  // castellano segun la capa. Ese nombre NO se traduce en ningun idioma: es el
  // identificador juridico de la figura, y traducirlo impediria buscarlo en el
  // boletin. Lo que se traduce es la descripcion.
  'proteccion.Reserva integral': 'Núcleo de máxima protección. Como regla, ninguna extracción.',
  'proteccion.Zona de protecció màxima': 'Máxima restricción dentro de la reserva.',
  "proteccion.Zona d'alta protecció": 'Alta protección; actividades muy limitadas.',
  "proteccion.Zona d'us restringit": 'Uso restringido, normalmente condicionado a autorización.',
  'proteccion.Zona de veda de pesca recreativa': 'Veda específica de pesca recreativa.',
  'proteccion.Zona de protecció especial': 'Restricciones adicionales sobre el régimen general.',
  'proteccion.Zona de protecció pesquera': 'Restricciones de carácter pesquero.',
  'proteccion.Zona especial de busseig': 'Buceo regulado de forma específica.',
  'proteccion.Reserva marina': 'Perímetro general de la reserva.',
  'proteccion.ZEC': 'Zona especial de conservación (Natura 2000).',
  'proteccion.LIC': 'Lugar de importancia comunitaria (Natura 2000).',
  'proteccion.ZEPA': 'Zona de especial protección para las aves (Natura 2000).',
  'proteccion.ZEC i ZEPA': 'Espacio Natura 2000 con doble designación.',
  'proteccion.LIC i ZEPA': 'Espacio Natura 2000 con doble designación.',
  'proteccion.Parc nacional':
    'Parque nacional marítimo-terrestre; régimen propio y muy restrictivo.',
  'proteccion.Parc natural':
    'Parque natural; el PORN o el PRUG fijan lo que se puede hacer en el mar.',
  'proteccion.Paratge natural': 'Paraje natural; el PORN fija el régimen del ámbito marino.',
  'proteccion.Reserva natural': 'Reserva natural; máxima protección dentro del espacio.',
  "proteccion.Zona d'exclusió": 'Zona de exclusión: ni pesca, ni fondeo, ni navegación.',
  "proteccion.Zona d'ús limitat": 'Uso limitado: fondeo regulado o prohibido sobre fanerógamas.',
  "proteccion.Zona d'ús compatible": 'Uso compatible con cierto grado de aprovechamiento.',
  'proteccion.Àrea de protecció estricta':
    'Protección estricta: ni pesca, ni fondeo, ni buceo recreativo.',
  'proteccion.Àrea de conservació predominant':
    'Conservación predominante; el régimen lo fija el parque.',
  'proteccion.Àrea de conservació': 'Conservación; la mayor parte del ámbito marino del parque.',
  "proteccion.Àrea d'aprofitament condicionat a la conservació":
    'Aprovechamiento condicionado a la conservación.',
  'proteccion.Ús portuari': 'Zona de uso portuario dentro del parque.',
  'proteccion.Fondeig prohibit': 'Fondeo prohibido salvo fuerza mayor.',
  'proteccion.Fondeig regulat': 'Campo de boyas: hay que amarrar, no echar el ancla.',
  'proteccion.Fondeig lliure condicionat': 'Fondeo libre solo sobre arena, nunca sobre fanerógamas.',
  'proteccion.Zona pesca submarina prohibida':
    'Pesca submarina prohibida por delimitación oficial.',
  'proteccion.Zona pesca submarina condicionada':
    'Pesca submarina autorizable con permiso específico.',
  'proteccion.generico': 'Otras figuras',
  'proteccion.genericoDescripcion': 'Figura de protección sin color asignado.',

  // -- Geolocalizacion -------------------------------------------------------
  'ubicacion.noSoportada': 'Este navegador no permite obtener la ubicación.',
  'ubicacion.denegada': 'Has denegado el acceso a la ubicación.',
  'ubicacion.noDeterminada': 'No se ha podido determinar la posición.',
  'ubicacion.tiempoAgotado': 'La obtención de la posición ha tardado demasiado.',
  'ubicacion.errorGenerico': 'No se ha podido obtener la ubicación.',
  'ubicacion.dudosaTitulo': 'Posición dudosa',
  'ubicacion.dudosaDetalle':
    'Estás aproximadamente a {distancia} del límite de {nombre}. Precisión GPS actual: ' +
    '{precision}. No es posible determinar con seguridad si estás dentro o fuera.',
  'ubicacion.dentroTitulo': 'Dentro de {nombre}',
  'ubicacion.dentroDetalle': 'Estás aproximadamente {distancia} dentro del límite.',
  'ubicacion.dentroVarias': ' Este punto está afectado por {n} figuras de protección.',
  'ubicacion.fueraTitulo': 'Fuera de las zonas cargadas',
  'ubicacion.fueraDetalle': 'El límite más cercano, {nombre}, está a {distancia}. ',
  'ubicacion.precisionGps': ' Precisión GPS: {precision}.',
  'ubicacion.precisionDesconocida': 'desconocida (se asume ±{metros} m)',
  'ubicacion.sello': ' Posición leída a las {hora}.',

  // -- Unidades --------------------------------------------------------------
  'unidad.km': '{valor} km',
  'unidad.m': '{valor} m',
  'unidad.km2': '{valor} km²',
};
