/**
 * English interface catalogue.
 *
 * The official names of the protected areas —«Zona d'alta protecció», «Àrea de
 * protecció estricta»— are never translated, in any language. They are the
 * legal identifier of the figure, and translating them would make it
 * impossible to look the figure up in the official gazette. Only the
 * descriptions are translated.
 *
 * The regulatory text of the fichas (reasons, conditions, titles of the
 * decrees) is shown in Spanish. That is deliberate and the panel says so: this
 * site cites every statement against the BOIB or the BOE, and an English
 * paraphrase of an article nobody has checked against the gazette would be a
 * different kind of claim from the one this project makes.
 */

export default {
  // -- Header and structure --------------------------------------------------
  'app.titulo': 'Maritime restrictions',
  'app.subtitulo': 'Balearic Islands',
  'app.subtituloIsla': 'Balearic Islands · {isla}',
  'app.tituloDocumento': 'Maritime restrictions · Balearic Islands',
  'app.metaDescripcion':
    'Map of marine reserves and fishing restrictions in the Balearic Islands. Check what may ' +
    'be done at each point of the sea and which permits are required.',
  'app.saltarAlMapa': 'Skip to map',
  'app.mapaAria': 'Map of protected areas',
  'app.listaAria': 'List of areas',
  'app.panelAria': 'Restrictions at the queried point',
  'app.cargando': 'Loading the official cartography…',
  'app.cargaError': '{mensaje} Reload the page to try again.',
  'app.errorManifiesto': 'The manifest declares no cartography for this view.',
  'app.errorFalta': '{fichero} is missing; run "npm run data".',
  'app.errorDescarga': 'Could not load {fichero} ({estado}).',

  'cabecera.isla': 'Island',
  'cabecera.islaAria': 'Island shown on the map',
  'cabecera.idioma': 'Language',
  'cabecera.idiomaAria': 'Interface language',
  'cabecera.zonas': 'Areas',
  'cabecera.estoyDentro': 'Am I inside?',

  'islas.todas': 'All islands',

  // -- Footer ----------------------------------------------------------------
  'pie.geometrias': '{n} geometries',
  'pie.deVista': ' of {vista}',
  'pie.datos': ' · data',
  'pie.deFuentes': ' from {fuentes}',
  'pie.delDia': ' of {fecha}',
  'pie.fechaDesconocida': 'unknown',
  'pie.avisoHtml':
    'Unofficial information site. The binding source is the regulation as published in the ' +
    '<a href="https://www.caib.es/eboibfront/" target="_blank" rel="noopener noreferrer">BOIB</a> ' +
    'or the <a href="https://www.boe.es/" target="_blank" rel="noopener noreferrer">BOE</a> and ' +
    'the official cartography from ' +
    '<a href="https://ideib.caib.es/reservesmarines/" target="_blank" rel="noopener noreferrer">IDEIB</a>. ' +
    'Always check the regulation in force before going out to fish.',

  // -- «What this map is» ----------------------------------------------------
  'acerca.resumen': 'What this map is',
  'acerca.p1Html':
    'This is not a map of marine reserves: it is a query engine for maritime restrictions, ' +
    'in which the marine reserve is one of <strong>six regulatory layers</strong> that ' +
    'overlap on every point of the sea. Tap any point and the engine gathers every ' +
    'protected area that contains it —marine reserves, the Natura 2000 network, protected ' +
    'natural areas, their internal zoning, the specific spearfishing regulation and the ' +
    'anchoring one— and returns a conclusion per activity: boat angling, spearfishing, ' +
    'shore angling, diving, anchoring and navigation, with the reason and the regulation ' +
    'behind it.',
  'acerca.p2Html':
    'It covers the <strong>96 areas</strong> loaded so far across the four islands and ' +
    'Cabrera, every one of them with a written record cited against the BOIB or the BOE: ' +
    'the twelve marine reserves of the Balearics, the marine Natura 2000 sites, the seven ' +
    'protected natural areas with a marine scope, and the internal zoning of s’Albufera ' +
    'des Grau and ses Salines.',
  'acerca.p3Html':
    'Work remains: whole layers such as the seagrass meadows or the zoning of Cabrera and ' +
    'sa Dragonera are not loaded yet, and within the records there are conditions that ' +
    'refer to regulations this map does not draw. This is an unofficial information site ' +
    '—the binding source is always the published regulation and the IDEIB cartography—, ' +
    'not a substitute for consulting it before going out to fish.',

  // -- Panel -----------------------------------------------------------------
  'panel.titulo': 'Tap the map',
  'panel.subtitulo': 'Check the restrictions at any point.',
  'panel.subtituloLargo': 'Check the restrictions at any point of the sea.',
  'panel.cerrar': 'Close panel',
  'panel.ayuda1':
    'Tap any point to see which protected areas affect it and what may be done there.',
  'panel.ayuda2':
    'If you are under way, use the location button: besides telling you whether you are ' +
    'inside, it will tell you how far from the boundary you are and whether your GPS is ' +
    'accurate enough to say so.',
  'panel.sinFiguras': 'No protected area at this point',
  'panel.queSePuedeHacer': 'What you may do here',
  'panel.figuraUna': 'One protected area affects this point',
  'panel.figurasVarias': '{n} protected areas affect this point',
  'panel.notaOrden':
    'Listed from the most general to the most restrictive. All of them apply at once.',
  'panel.arrastrar': 'Drag to reorder «{nombre}»',
  'panel.autorizacionGratuita': 'Free permit',
  'panel.tasa': 'Fee: {importe}',
  'panel.importeNoPublicado': 'Permit required · fee not published',
  'panel.vigencia': ' · valid for {vigencia}',
  'panel.tramitar': 'Apply at the Seu Electrònica',
  'panel.importeVerificado': 'Fee verified on {fecha}',
  'panel.tambienRige': 'Also in force here, from {nombre}:',
  'panel.loDetermina': 'Determined by: ',
  'panel.tambienImponen': ' (also imposed by: {lista})',
  'panel.heredada': 'Rule from the general regime of {nombre}, which applies to this area too.',
  'panel.incompletaCon':
    'Incomplete information: {lista} has no rule written yet for this activity. Check the ' +
    'regulation.',
  'panel.incompletaSin': 'Incomplete information for this activity.',
  'panel.normaUna': 'Regulation',
  'panel.normasVarias': 'Regulations ({n})',
  'panel.fuenteUna': 'Source',
  'panel.fuentesVarias': 'Sources ({n})',
  'panel.descargo':
    'Indicative and unofficial information. The binding source is the regulation as ' +
    'published in the BOIB or the BOE and the official IDEIB cartography.',
  'panel.competencia': '{competencia} jurisdiction',
  'panel.distancia': '{distancia} from the boundary.',

  'competencia.Estatal': 'national',
  'competencia.Autonòmica': 'regional',

  'panel.normativaEnCastellano':
    'Reasons, conditions and regulation titles are shown in Spanish, the language in which ' +
    'the records of this map are written and cited against the official gazette.',

  // -- Activities ------------------------------------------------------------
  'actividad.pescaRecreativaEmbarcacion': 'Recreational angling from a boat',
  'actividad.pescaSubmarina': 'Spearfishing',
  'actividad.pescaDesdeCosta': 'Recreational angling from the shore',
  'actividad.buceo': 'Diving',
  'actividad.fondeo': 'Anchoring',
  'actividad.navegacion': 'Navigation',

  // -- States ----------------------------------------------------------------
  'estado.allowed': 'Allowed',
  'estado.allowed_with_authorization': 'Allowed with a permit',
  'estado.restricted': 'Restricted',
  'estado.prohibited': 'Prohibited',
  'estado.not_regulated': 'No specific restriction',
  'estado.unknown': 'Not determinable',

  // -- Engine ----------------------------------------------------------------
  'motor.sinFiguras':
    'This point is not inside any of the protected areas currently loaded on the map. The ' +
    'general regulation still applies and other restrictions may exist.',
  'motor.sinRegla':
    'None of the protected areas affecting this point has a rule written yet for this ' +
    'activity. Check the regulation directly.',

  // -- Legend ----------------------------------------------------------------
  'leyenda.titulo': 'Legend',
  'leyenda.nota':
    'Layers can be switched on and off from the map control. Switching a layer off does not ' +
    'disable it: tapping a point still queries them all, and their areas still appear in ' +
    'the panel. The colour indicates the type of area, not what is forbidden; that is what ' +
    'the panel says, activity by activity.',

  // -- Search ----------------------------------------------------------------
  'buscador.placeholder': 'Search among {n} areas…',
  'buscador.aria': 'Search for a protected area',
  'buscador.vacio': 'No area matches the search.',
  'buscador.sinFicha': 'no record',
  'buscador.sinFichaTitulo': 'The restrictions for this area have not been written yet.',

  // -- Layers ----------------------------------------------------------------
  'capa.satelite': 'Satellite',
  'capa.ortofoto': 'Official orthophoto (IDEIB)',
  'capa.callejero': 'Map (OpenStreetMap)',
  'capa.nautica': 'Nautical chart (OpenSeaMap)',
  'capa.sinEfectoPesca': '{titulo} — no effect on fishing',

  // -- Cartography sources ---------------------------------------------------
  'fuente.reservas-marinas': 'Marine reserves',
  'fuente.natura2000': 'Natura 2000 network (marine scope)',
  'fuente.espacios-naturales': 'Protected natural areas (marine scope)',
  'fuente.zonificacion-enp': 'Marine zoning of the protected natural areas',
  'fuente.regulacion-fondeo': 'Anchoring regulation',
  'fuente.regulacion-pesca-submarina': 'Specific spearfishing regulation',
  'fuente.posidonia': 'Seagrass protection (Decret 25/2018)',

  // -- Descriptions of the types of area -------------------------------------
  'proteccion.Reserva integral': 'Core of maximum protection. As a rule, no extraction at all.',
  'proteccion.Zona de protecció màxima': 'Maximum restriction within the reserve.',
  "proteccion.Zona d'alta protecció": 'High protection; activities are heavily limited.',
  "proteccion.Zona d'us restringit": 'Restricted use, normally subject to a permit.',
  'proteccion.Zona de veda de pesca recreativa': 'Specific closure for recreational fishing.',
  'proteccion.Zona de protecció especial': 'Additional restrictions over the general regime.',
  'proteccion.Zona de protecció pesquera': 'Fishery-related restrictions.',
  'proteccion.Zona especial de busseig': 'Diving regulated in a specific way.',
  'proteccion.Reserva marina': 'General perimeter of the reserve.',
  'proteccion.ZEC': 'Special area of conservation (Natura 2000).',
  'proteccion.LIC': 'Site of community importance (Natura 2000).',
  'proteccion.ZEPA': 'Special protection area for birds (Natura 2000).',
  'proteccion.ZEC i ZEPA': 'Natura 2000 site with a double designation.',
  'proteccion.LIC i ZEPA': 'Natura 2000 site with a double designation.',
  'proteccion.Parc nacional':
    'Maritime-terrestrial national park; its own and very restrictive regime.',
  'proteccion.Parc natural':
    'Natural park; the PORN or the PRUG set out what may be done at sea.',
  'proteccion.Paratge natural': 'Natural site; the PORN sets the regime of the marine scope.',
  'proteccion.Reserva natural': 'Nature reserve; maximum protection within the area.',
  "proteccion.Zona d'exclusió": 'Exclusion zone: no fishing, no anchoring, no navigation.',
  "proteccion.Zona d'ús limitat": 'Limited use: anchoring regulated or banned over seagrass.',
  "proteccion.Zona d'ús compatible": 'Compatible use with a certain degree of exploitation.',
  'proteccion.Àrea de protecció estricta':
    'Strict protection: no fishing, no anchoring, no recreational diving.',
  'proteccion.Àrea de conservació predominant':
    'Predominant conservation; the regime is set by the park.',
  'proteccion.Àrea de conservació': 'Conservation; most of the marine scope of the park.',
  "proteccion.Àrea d'aprofitament condicionat a la conservació":
    'Exploitation conditional on conservation.',
  'proteccion.Ús portuari': 'Port use zone within the park.',
  'proteccion.Fondeig prohibit': 'Anchoring prohibited except in an emergency.',
  'proteccion.Fondeig regulat': 'Mooring buoy field: you must moor, not drop anchor.',
  'proteccion.Fondeig lliure condicionat':
    'Free anchoring on sand only, never over seagrass.',
  'proteccion.Zona pesca submarina prohibida':
    'Spearfishing prohibited by official delimitation.',
  'proteccion.Zona pesca submarina condicionada':
    'Spearfishing possible with a specific permit.',
  'proteccion.generico': 'Other areas',
  'proteccion.genericoDescripcion': 'Protected area with no colour assigned.',

  // -- Geolocation -----------------------------------------------------------
  'ubicacion.noSoportada': 'This browser cannot obtain your location.',
  'ubicacion.denegada': 'You have denied access to your location.',
  'ubicacion.noDeterminada': 'Your position could not be determined.',
  'ubicacion.tiempoAgotado': 'Obtaining your position took too long.',
  'ubicacion.errorGenerico': 'Your location could not be obtained.',
  'ubicacion.dudosaTitulo': 'Position too close to call',
  'ubicacion.dudosaDetalle':
    'You are roughly {distancia} from the boundary of {nombre}. Current GPS accuracy: ' +
    '{precision}. It is not possible to determine with any certainty whether you are ' +
    'inside or outside.',
  'ubicacion.dentroTitulo': 'Inside {nombre}',
  'ubicacion.dentroDetalle': 'You are roughly {distancia} inside the boundary.',
  'ubicacion.dentroVarias': ' This point is affected by {n} protected areas.',
  'ubicacion.fueraTitulo': 'Outside the loaded areas',
  'ubicacion.fueraDetalle': 'The nearest boundary, {nombre}, is {distancia} away. ',
  'ubicacion.precisionGps': ' GPS accuracy: {precision}.',
  'ubicacion.precisionDesconocida': 'unknown (±{metros} m assumed)',
  'ubicacion.sello': ' Position read at {hora}.',

  // -- Units -----------------------------------------------------------------
  'unidad.km': '{valor} km',
  'unidad.m': '{valor} m',
  'unidad.km2': '{valor} km²',
};
