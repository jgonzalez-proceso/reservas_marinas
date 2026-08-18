/**
 * Catàleg d'interfície en català.
 *
 * Els noms oficials de les figures —«Zona d'alta protecció», «Àrea de
 * protecció estricta»— ja arriben en català des de l'IDEIB i no es toquen mai:
 * són l'identificador jurídic de la figura. Aquí només se'n tradueix la
 * descripció.
 */

export default {
  // -- Capçalera i estructura ------------------------------------------------
  'app.titulo': 'Restriccions marítimes',
  'app.subtitulo': 'Illes Balears',
  'app.subtituloIsla': 'Illes Balears · {isla}',
  'app.tituloDocumento': 'Restriccions marítimes · Illes Balears',
  'app.metaDescripcion':
    'Mapa de reserves marines i restriccions de pesca de les Illes Balears. Consulta què ' +
    's’hi pot fer a cada punt de la mar i quines autoritzacions calen.',
  'app.saltarAlMapa': 'Vés al mapa',
  'app.mapaAria': 'Mapa de zones de protecció',
  'app.listaAria': 'Llistat de zones',
  'app.panelAria': 'Restriccions del punt consultat',
  'app.cargando': 'Carregant la cartografia oficial…',
  'app.cargaError': '{mensaje} Torna a carregar la pàgina per intentar-ho de nou.',
  'app.errorManifiesto': 'El manifest no declara cartografia per a aquesta vista.',
  'app.errorFalta': 'Falta {fichero}; executa "npm run data".',
  'app.errorDescarga': 'No s’ha pogut carregar {fichero} ({estado}).',

  'cabecera.isla': 'Illa',
  'cabecera.islaAria': 'Illa que es mostra al mapa',
  'cabecera.idioma': 'Idioma',
  'cabecera.idiomaAria': 'Idioma de la interfície',
  'cabecera.zonas': 'Zones',
  'cabecera.estoyDentro': 'Soc a dins?',

  'islas.todas': 'Totes les illes',

  // -- Peu -------------------------------------------------------------------
  'pie.geometrias': '{n} geometries',
  'pie.deVista': ' de {vista}',
  'pie.datos': ' · dades',
  'pie.deFuentes': ' de {fuentes}',
  'pie.delDia': ' del {fecha}',
  'pie.fechaDesconocida': 'desconeguda',
  'pie.avisoHtml':
    'Web informativa no oficial. La font vinculant és la norma publicada al ' +
    '<a href="https://www.caib.es/eboibfront/" target="_blank" rel="noopener noreferrer">BOIB</a> ' +
    'o al <a href="https://www.boe.es/" target="_blank" rel="noopener noreferrer">BOE</a> i la ' +
    'cartografia oficial de l’' +
    '<a href="https://ideib.caib.es/reservesmarines/" target="_blank" rel="noopener noreferrer">IDEIB</a>. ' +
    'Comprova sempre la normativa vigent abans de sortir a pescar.',

  // -- Bloc «Què és aquest mapa» --------------------------------------------
  'acerca.resumen': 'Què és aquest mapa',
  'acerca.p1Html':
    'Això no és un mapa de reserves marines: és un motor de consulta de restriccions ' +
    'marítimes, on la reserva marina és una de les <strong>sis capes reguladores</strong> ' +
    'que es creuen sobre cada punt de la mar. Prem qualsevol punt i el motor reuneix totes ' +
    'les figures de protecció que el contenen —reserves marines, Xarxa Natura 2000, ' +
    'espais naturals protegits, la seva zonificació interna, la regulació específica de ' +
    'pesca submarina i la del fondeig— i retorna una conclusió per activitat: pesca des ' +
    'd’embarcació, pesca submarina, pesca des de costa, busseig, fondeig i navegació, amb ' +
    'el motiu i la norma que la justifica.',
  'acerca.p2Html':
    'Cobreix les <strong>96 zones</strong> carregades fins ara a les quatre illes i ' +
    'Cabrera, totes amb fitxa redactada i citada contra el BOIB o el BOE: les dotze reserves ' +
    'marines de Balears, els espais marins de la Xarxa Natura 2000, els set espais ' +
    'naturals protegits amb àmbit marí i la zonificació interna de s’Albufera des ' +
    'Grau i ses Salines.',
  'acerca.p3Html':
    'Encara hi falta feina: capes senceres com la posidònia o la zonificació de Cabrera i ' +
    'sa Dragonera encara no estan carregades, i dins les fitxes hi ha condicions que ' +
    'remeten a normes que aquest mapa encara no dibuixa. És una web informativa no oficial ' +
    '—la font vinculant sempre és la norma publicada i la cartografia de l’IDEIB—, no un ' +
    'substitut de consultar-la abans de sortir a pescar.',

  // -- Panell ----------------------------------------------------------------
  'panel.titulo': 'Toca el mapa',
  'panel.subtitulo': 'Consulta les restriccions de qualsevol punt.',
  'panel.subtituloLargo': 'Consulta les restriccions de qualsevol punt de la mar.',
  'panel.cerrar': 'Tanca el panell',
  'panel.ayuda1':
    'Prem sobre qualsevol punt per veure quines figures de protecció l’afecten i què s’hi ' +
    'pot fer.',
  'panel.ayuda2':
    'Si estàs navegant, fes servir el botó d’ubicació: a més de dir-te si ets a dins, et ' +
    'dirà a quina distància del límit ets i si el teu GPS dona per afirmar-ho.',
  'panel.sinFiguras': 'Cap figura en aquest punt',
  'panel.queSePuedeHacer': 'Què s’hi pot fer',
  'panel.figuraUna': 'Figura que afecta aquest punt',
  'panel.figurasVarias': '{n} figures afecten aquest punt',
  'panel.notaOrden':
    'Es llisten de la més general a la més restrictiva. Totes s’apliquen simultàniament.',
  'panel.arrastrar': 'Arrossega per reordenar «{nombre}»',
  'panel.autorizacionGratuita': 'Autorització gratuïta',
  'panel.tasa': 'Taxa: {importe}',
  'panel.importeNoPublicado': 'Requereix autorització · import no publicat',
  'panel.vigencia': ' · vigència {vigencia}',
  'panel.tramitar': 'Tramita-ho a la Seu Electrònica',
  'panel.importeVerificado': 'Import verificat el {fecha}',
  'panel.tambienRige': 'També hi regeix, per {nombre}:',
  'panel.loDetermina': 'Ho determina: ',
  'panel.tambienImponen': ' (també ho imposen: {lista})',
  'panel.heredada': 'Regla del règim general de {nombre}, que s’aplica també a aquesta zona.',
  'panel.incompletaCon':
    'Informació incompleta: {lista} encara no té redactada la seva regla per a aquesta ' +
    'activitat. Consulta la norma.',
  'panel.incompletaSin': 'Informació incompleta per a aquesta activitat.',
  'panel.normaUna': 'Norma',
  'panel.normasVarias': 'Normes ({n})',
  'panel.fuenteUna': 'Font',
  'panel.fuentesVarias': 'Fonts ({n})',
  'panel.descargo':
    'Informació orientativa i no oficial. La font vinculant és la norma publicada al ' +
    'BOIB o al BOE i la cartografia oficial de l’IDEIB.',
  'panel.competencia': 'competència {competencia}',
  'panel.distancia': 'A {distancia} del límit.',

  'competencia.Estatal': 'estatal',
  'competencia.Autonòmica': 'autonòmica',

  'panel.normativaEnCastellano':
    'Els motius, condicions i títols de norma es mostren en castellà, que és la llengua ' +
    'en què estan redactades i citades les fitxes d’aquest mapa.',

  // -- Activitats ------------------------------------------------------------
  'actividad.pescaRecreativaEmbarcacion': 'Pesca recreativa des d’embarcació',
  'actividad.pescaSubmarina': 'Pesca submarina',
  'actividad.pescaDesdeCosta': 'Pesca recreativa des de costa',
  'actividad.buceo': 'Busseig',
  'actividad.fondeo': 'Fondeig',
  'actividad.navegacion': 'Navegació',

  // -- Estats ----------------------------------------------------------------
  'estado.allowed': 'Permesa',
  'estado.allowed_with_authorization': 'Permesa amb autorització',
  'estado.restricted': 'Restringida',
  'estado.prohibited': 'Prohibida',
  'estado.not_regulated': 'Sense restricció específica',
  'estado.unknown': 'No determinable',

  // -- Motor -----------------------------------------------------------------
  'motor.sinFiguras':
    'Aquest punt no és dins cap de les zones de protecció actualment carregades al mapa. ' +
    'Continua sent aplicable la normativa general i poden existir altres restriccions.',
  'motor.sinRegla':
    'Cap de les figures que afecten aquest punt no té encara redactada la seva regla per a ' +
    'aquesta activitat. Consulta la norma directament.',

  // -- Llegenda --------------------------------------------------------------
  'leyenda.titulo': 'Llegenda',
  'leyenda.nota':
    'Les capes es poden encendre i apagar des del control del mapa. Apagar una capa no la ' +
    'desactiva: en prémer un punt es continuen consultant totes, i les seves figures ' +
    'apareixen igualment al panell. El color indica el tipus de figura, no allò que està ' +
    'prohibit; això ho diu el panell, activitat per activitat.',

  // -- Cercador --------------------------------------------------------------
  'buscador.placeholder': 'Cerca entre {n} zones…',
  'buscador.aria': 'Cerca una zona de protecció',
  'buscador.vacio': 'Cap zona coincideix amb la cerca.',
  'buscador.sinFicha': 'sense fitxa',
  'buscador.sinFichaTitulo': 'Les restriccions d’aquesta zona encara no estan redactades.',

  // -- Capes -----------------------------------------------------------------
  'capa.satelite': 'Satèl·lit',
  'capa.ortofoto': 'Ortofoto oficial (IDEIB)',
  'capa.callejero': 'Mapa (OpenStreetMap)',
  'capa.nautica': 'Carta nàutica (OpenSeaMap)',
  'capa.sinEfectoPesca': '{titulo} — sense efecte en la pesca',

  // -- Fonts de cartografia --------------------------------------------------
  'fuente.reservas-marinas': 'Reserves marines',
  'fuente.natura2000': 'Xarxa Natura 2000 (àmbit marí)',
  'fuente.espacios-naturales': 'Espais naturals protegits (àmbit marí)',
  'fuente.zonificacion-enp': 'Zonificació marina dels espais naturals protegits',
  'fuente.regulacion-fondeo': 'Regulació del fondeig',
  'fuente.regulacion-pesca-submarina': 'Regulació específica de pesca submarina',
  'fuente.posidonia': 'Protecció de la posidònia (Decret 25/2018)',

  // -- Descripcions dels tipus de figura ------------------------------------
  'proteccion.Reserva integral': 'Nucli de màxima protecció. Com a regla, cap extracció.',
  'proteccion.Zona de protecció màxima': 'Màxima restricció dins la reserva.',
  "proteccion.Zona d'alta protecció": 'Alta protecció; activitats molt limitades.',
  "proteccion.Zona d'us restringit": 'Ús restringit, normalment condicionat a autorització.',
  'proteccion.Zona de veda de pesca recreativa': 'Veda específica de pesca recreativa.',
  'proteccion.Zona de protecció especial': 'Restriccions addicionals sobre el règim general.',
  'proteccion.Zona de protecció pesquera': 'Restriccions de caràcter pesquer.',
  'proteccion.Zona especial de busseig': 'Busseig regulat de manera específica.',
  'proteccion.Reserva marina': 'Perímetre general de la reserva.',
  'proteccion.ZEC': 'Zona especial de conservació (Natura 2000).',
  'proteccion.LIC': 'Lloc d’importància comunitària (Natura 2000).',
  'proteccion.ZEPA': 'Zona d’especial protecció per a les aus (Natura 2000).',
  'proteccion.ZEC i ZEPA': 'Espai Natura 2000 amb doble designació.',
  'proteccion.LIC i ZEPA': 'Espai Natura 2000 amb doble designació.',
  'proteccion.Parc nacional':
    'Parc nacional maritimoterrestre; règim propi i molt restrictiu.',
  'proteccion.Parc natural':
    'Parc natural; el PORN o el PRUG fixen què es pot fer a la mar.',
  'proteccion.Paratge natural': 'Paratge natural; el PORN fixa el règim de l’àmbit marí.',
  'proteccion.Reserva natural': 'Reserva natural; màxima protecció dins l’espai.',
  "proteccion.Zona d'exclusió": 'Zona d’exclusió: ni pesca, ni fondeig, ni navegació.',
  "proteccion.Zona d'ús limitat": 'Ús limitat: fondeig regulat o prohibit sobre fanerògames.',
  "proteccion.Zona d'ús compatible": 'Ús compatible amb un cert grau d’aprofitament.',
  'proteccion.Àrea de protecció estricta':
    'Protecció estricta: ni pesca, ni fondeig, ni busseig recreatiu.',
  'proteccion.Àrea de conservació predominant':
    'Conservació predominant; el règim el fixa el parc.',
  'proteccion.Àrea de conservació': 'Conservació; la major part de l’àmbit marí del parc.',
  "proteccion.Àrea d'aprofitament condicionat a la conservació":
    'Aprofitament condicionat a la conservació.',
  'proteccion.Ús portuari': 'Zona d’ús portuari dins el parc.',
  'proteccion.Fondeig prohibit': 'Fondeig prohibit llevat de força major.',
  'proteccion.Fondeig regulat': 'Camp de boies: cal amarrar, no llançar l’àncora.',
  'proteccion.Fondeig lliure condicionat':
    'Fondeig lliure només sobre arena, mai sobre fanerògames.',
  'proteccion.Zona pesca submarina prohibida':
    'Pesca submarina prohibida per delimitació oficial.',
  'proteccion.Zona pesca submarina condicionada':
    'Pesca submarina autoritzable amb permís específic.',
  'proteccion.generico': 'Altres figures',
  'proteccion.genericoDescripcion': 'Figura de protecció sense color assignat.',

  // -- Geolocalització -------------------------------------------------------
  'ubicacion.noSoportada': 'Aquest navegador no permet obtenir la ubicació.',
  'ubicacion.denegada': 'Has denegat l’accés a la ubicació.',
  'ubicacion.noDeterminada': 'No s’ha pogut determinar la posició.',
  'ubicacion.tiempoAgotado': 'L’obtenció de la posició ha trigat massa.',
  'ubicacion.errorGenerico': 'No s’ha pogut obtenir la ubicació.',
  'ubicacion.dudosaTitulo': 'Posició dubtosa',
  'ubicacion.dudosaDetalle':
    'Ets aproximadament a {distancia} del límit de {nombre}. Precisió GPS actual: ' +
    '{precision}. No és possible determinar amb seguretat si ets a dins o a fora.',
  'ubicacion.dentroTitulo': 'Dins de {nombre}',
  'ubicacion.dentroDetalle': 'Ets aproximadament {distancia} dins del límit.',
  'ubicacion.dentroVarias': ' Aquest punt està afectat per {n} figures de protecció.',
  'ubicacion.fueraTitulo': 'Fora de les zones carregades',
  'ubicacion.fueraDetalle': 'El límit més proper, {nombre}, és a {distancia}. ',
  'ubicacion.precisionGps': ' Precisió GPS: {precision}.',
  'ubicacion.precisionDesconocida': 'desconeguda (se suposa ±{metros} m)',
  'ubicacion.sello': ' Posició llegida a les {hora}.',

  // -- Unitats ---------------------------------------------------------------
  'unidad.km': '{valor} km',
  'unidad.m': '{valor} m',
  'unidad.km2': '{valor} km²',
};
