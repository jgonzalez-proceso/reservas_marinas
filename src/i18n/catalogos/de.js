/**
 * Deutscher Oberflächenkatalog.
 *
 * Die amtlichen Namen der Schutzgebiete —«Zona d'alta protecció», «Àrea de
 * protecció estricta»— werden in keiner Sprache übersetzt. Sie sind die
 * juristische Kennung des Gebiets, und übersetzt liessen sie sich im
 * Amtsblatt nicht mehr auffinden. Übersetzt wird nur die Beschreibung.
 *
 * Der normative Text der Datenblätter (Begründungen, Auflagen, Titel der
 * Verordnungen) erscheint auf Spanisch. Das ist Absicht, und das Panel sagt es
 * auch: diese Seite belegt jede Aussage gegen das BOIB oder das BOE, und eine
 * deutsche Wiedergabe eines Artikels, die niemand gegen das Amtsblatt geprüft
 * hat, wäre eine andere Art von Aussage als die, die dieses Projekt macht.
 */

export default {
  // -- Kopfzeile und Aufbau --------------------------------------------------
  'app.titulo': 'Meeresbeschränkungen',
  'app.subtitulo': 'Balearen',
  'app.subtituloIsla': 'Balearen · {isla}',
  'app.tituloDocumento': 'Meeresbeschränkungen · Balearen',
  'app.metaDescripcion':
    'Karte der Meeresschutzgebiete und Fischereibeschränkungen der Balearen. Prüfe, was an ' +
    'jedem Punkt des Meeres erlaubt ist und welche Genehmigungen nötig sind.',
  'app.saltarAlMapa': 'Zur Karte springen',
  'app.mapaAria': 'Karte der Schutzgebiete',
  'app.listaAria': 'Liste der Gebiete',
  'app.panelAria': 'Beschränkungen am abgefragten Punkt',
  'app.cargando': 'Amtliche Kartografie wird geladen…',
  'app.cargaError': '{mensaje} Lade die Seite neu, um es erneut zu versuchen.',
  'app.errorManifiesto': 'Das Manifest weist für diese Ansicht keine Kartografie aus.',
  'app.errorFalta': '{fichero} fehlt; führe "npm run data" aus.',
  'app.errorDescarga': '{fichero} konnte nicht geladen werden ({estado}).',

  'cabecera.isla': 'Insel',
  'cabecera.islaAria': 'Auf der Karte gezeigte Insel',
  'cabecera.idioma': 'Sprache',
  'cabecera.idiomaAria': 'Sprache der Oberfläche',
  'cabecera.zonas': 'Gebiete',
  'cabecera.estoyDentro': 'Bin ich drin?',

  'menu.titulo': 'Menü',
  'menu.abrir': 'Menü öffnen',
  'menu.cerrar': 'Menü schließen',
  'menu.volver': 'Zurück',

  'islas.todas': 'Alle Inseln',

  // -- Fusszeile -------------------------------------------------------------
  'pie.geometrias': '{n} Geometrien',
  'pie.deVista': ' von {vista}',
  'pie.datos': ' · Daten',
  'pie.deFuentes': ' von {fuentes}',
  'pie.delDia': ' vom {fecha}',
  'pie.fechaDesconocida': 'unbekannt',
  'pie.avisoHtml':
    'Inoffizielle Informationsseite. Verbindlich ist die im ' +
    '<a href="https://www.caib.es/eboibfront/" target="_blank" rel="noopener noreferrer">BOIB</a> ' +
    'oder im <a href="https://www.boe.es/" target="_blank" rel="noopener noreferrer">BOE</a> ' +
    'veröffentlichte Vorschrift sowie die amtliche Kartografie des ' +
    '<a href="https://ideib.caib.es/reservesmarines/" target="_blank" rel="noopener noreferrer">IDEIB</a>. ' +
    'Prüfe immer die geltenden Vorschriften, bevor du zum Fischen hinausfährst.',

  // -- «Was diese Karte ist» -------------------------------------------------
  'acerca.resumen': 'Was diese Karte ist',
  'acerca.p1Html':
    'Dies ist keine Karte der Meeresschutzgebiete, sondern eine Abfragemaschine für ' +
    'Meeresbeschränkungen, in der das Meeresschutzgebiet eine von <strong>sechs ' +
    'Regelungsebenen</strong> ist, die sich über jedem Punkt des Meeres überlagern. Tippe ' +
    'einen beliebigen Punkt an, und die Maschine sammelt alle Schutzgebiete, die ihn ' +
    'enthalten —Meeresschutzgebiete, Natura-2000-Netz, Naturschutzgebiete, deren interne ' +
    'Zonierung, die besondere Regelung der Unterwasserjagd und die des Ankerns— und liefert ' +
    'ein Ergebnis je Tätigkeit: Angeln vom Boot, Unterwasserjagd, Angeln von der Küste, ' +
    'Tauchen, Ankern und Navigation, mit der Begründung und der Vorschrift dahinter.',
  'acerca.p2Html':
    'Sie deckt die bislang geladenen <strong>96 Gebiete</strong> auf den vier Inseln und ' +
    'Cabrera ab, jedes davon mit einem Datenblatt, das gegen das BOIB oder das BOE belegt ' +
    'ist: die zwölf Meeresschutzgebiete der Balearen, die marinen Natura-2000-Gebiete, die ' +
    'sieben Naturschutzgebiete mit Meeresanteil und die interne Zonierung von s’Albufera ' +
    'des Grau und ses Salines.',
  'acerca.p3Html':
    'Es bleibt Arbeit: ganze Ebenen wie die Seegraswiesen oder die Zonierung von Cabrera ' +
    'und sa Dragonera sind noch nicht geladen, und in den Datenblättern gibt es Auflagen, ' +
    'die auf Vorschriften verweisen, die diese Karte noch nicht zeichnet. Es ist eine ' +
    'inoffizielle Informationsseite —verbindlich ist stets die veröffentlichte Vorschrift ' +
    'und die Kartografie des IDEIB— und kein Ersatz dafür, sie vor der Ausfahrt zu prüfen.',

  // -- Panel -----------------------------------------------------------------
  'panel.titulo': 'Tippe auf die Karte',
  'panel.subtitulo': 'Prüfe die Beschränkungen an jedem beliebigen Punkt.',
  'panel.subtituloLargo': 'Prüfe die Beschränkungen an jedem beliebigen Punkt des Meeres.',
  'panel.cerrar': 'Panel schliessen',
  'panel.ayuda1':
    'Tippe auf einen beliebigen Punkt, um zu sehen, welche Schutzgebiete ihn betreffen und ' +
    'was dort erlaubt ist.',
  'panel.ayuda2':
    'Wenn du unterwegs bist, nutze die Standortschaltfläche: sie sagt dir nicht nur, ob du ' +
    'drin bist, sondern auch, wie weit du von der Grenze entfernt bist und ob dein GPS ' +
    'genau genug ist, um das zu behaupten.',
  'panel.sinFiguras': 'Kein Schutzgebiet an diesem Punkt',
  'panel.queSePuedeHacer': 'Was hier erlaubt ist',
  'panel.figuraUna': 'Ein Schutzgebiet betrifft diesen Punkt',
  'panel.figurasVarias': '{n} Schutzgebiete betreffen diesen Punkt',
  'panel.notaOrden':
    'Aufgeführt vom allgemeinsten bis zum einschränkendsten. Alle gelten gleichzeitig.',
  'panel.arrastrar': 'Zum Umsortieren ziehen: «{nombre}»',
  'panel.autorizacionGratuita': 'Genehmigung kostenlos',
  'panel.tasa': 'Gebühr: {importe}',
  'panel.importeNoPublicado': 'Genehmigung erforderlich · Gebühr nicht veröffentlicht',
  'panel.vigencia': ' · gültig {vigencia}',
  'panel.tramitar': 'Bei der Seu Electrònica beantragen',
  'panel.importeVerificado': 'Gebühr geprüft am {fecha}',
  'panel.tambienRige': 'Hier gilt ausserdem, durch {nombre}:',
  'panel.loDetermina': 'Massgeblich: ',
  'panel.tambienImponen': ' (ebenfalls auferlegt durch: {lista})',
  'panel.heredada':
    'Regel aus der allgemeinen Ordnung von {nombre}, die auch für dieses Gebiet gilt.',
  'panel.incompletaCon':
    'Unvollständige Angabe: für {lista} ist die Regel zu dieser Tätigkeit noch nicht ' +
    'verfasst. Prüfe die Vorschrift.',
  'panel.incompletaSin': 'Unvollständige Angabe zu dieser Tätigkeit.',
  'panel.normaUna': 'Vorschrift',
  'panel.normasVarias': 'Vorschriften ({n})',
  'panel.fuenteUna': 'Quelle',
  'panel.fuentesVarias': 'Quellen ({n})',
  'panel.descargo':
    'Orientierende und inoffizielle Angabe. Verbindlich ist die im BOIB oder im BOE ' +
    'veröffentlichte Vorschrift und die amtliche Kartografie des IDEIB.',
  'panel.competencia': '{competencia} Zuständigkeit',
  'panel.distancia': '{distancia} von der Grenze.',

  'competencia.Estatal': 'staatliche',
  'competencia.Autonòmica': 'regionale',

  'panel.normativaEnCastellano':
    'Begründungen, Auflagen und Titel der Vorschriften erscheinen auf Spanisch — in der ' +
    'Sprache, in der die Datenblätter dieser Karte verfasst und gegen das Amtsblatt belegt ' +
    'sind.',

  // -- Tätigkeiten -----------------------------------------------------------
  'actividad.pescaRecreativaEmbarcacion': 'Freizeitangeln vom Boot',
  'actividad.pescaSubmarina': 'Unterwasserjagd',
  'actividad.pescaDesdeCosta': 'Freizeitangeln von der Küste',
  'actividad.buceo': 'Tauchen',
  'actividad.fondeo': 'Ankern',
  'actividad.navegacion': 'Navigation',

  // -- Zustände --------------------------------------------------------------
  'estado.allowed': 'Erlaubt',
  'estado.allowed_with_authorization': 'Erlaubt mit Genehmigung',
  'estado.restricted': 'Eingeschränkt',
  'estado.prohibited': 'Verboten',
  'estado.not_regulated': 'Keine besondere Beschränkung',
  'estado.unknown': 'Nicht bestimmbar',

  // -- Maschine --------------------------------------------------------------
  'motor.sinFiguras':
    'Dieser Punkt liegt in keinem der derzeit auf der Karte geladenen Schutzgebiete. Die ' +
    'allgemeinen Vorschriften gelten weiterhin, und es können weitere Beschränkungen ' +
    'bestehen.',
  'motor.sinRegla':
    'Für keines der Schutzgebiete an diesem Punkt ist die Regel zu dieser Tätigkeit bereits ' +
    'verfasst. Prüfe die Vorschrift direkt.',

  // -- Legende ---------------------------------------------------------------
  'leyenda.titulo': 'Legende',
  'leyenda.nota':
    'Ebenen lassen sich über das Kartensteuerelement ein- und ausschalten. Eine ' +
    'ausgeschaltete Ebene ist nicht deaktiviert: beim Antippen eines Punktes werden ' +
    'weiterhin alle abgefragt, und ihre Gebiete erscheinen trotzdem im Panel. Die Farbe ' +
    'zeigt die Art des Gebiets an, nicht das, was verboten ist; das sagt das Panel, ' +
    'Tätigkeit für Tätigkeit.',

  // -- Suche -----------------------------------------------------------------
  'buscador.placeholder': 'Unter {n} Gebieten suchen…',
  'buscador.aria': 'Nach einem Schutzgebiet suchen',
  'buscador.vacio': 'Kein Gebiet entspricht der Suche.',
  'buscador.sinFicha': 'ohne Datenblatt',
  'buscador.sinFichaTitulo': 'Die Beschränkungen dieses Gebiets sind noch nicht verfasst.',

  // -- Ebenen ----------------------------------------------------------------
  'capa.satelite': 'Satellit',
  'capa.ortofoto': 'Amtliches Orthofoto (IDEIB)',
  'capa.callejero': 'Karte (OpenStreetMap)',
  'capa.nautica': 'Seekarte (OpenSeaMap)',
  'capa.sinEfectoPesca': '{titulo} — ohne Auswirkung auf die Fischerei',

  // -- Kartografiequellen ----------------------------------------------------
  'fuente.reservas-marinas': 'Meeresschutzgebiete',
  'fuente.natura2000': 'Natura-2000-Netz (Meeresanteil)',
  'fuente.espacios-naturales': 'Naturschutzgebiete (Meeresanteil)',
  'fuente.zonificacion-enp': 'Marine Zonierung der Naturschutzgebiete',
  'fuente.regulacion-fondeo': 'Ankerregelung',
  'fuente.regulacion-pesca-submarina': 'Besondere Regelung der Unterwasserjagd',
  'fuente.posidonia': 'Schutz der Seegraswiesen (Decret 25/2018)',

  // -- Beschreibungen der Gebietstypen ---------------------------------------
  'proteccion.Reserva integral': 'Kern mit höchstem Schutz. Grundsätzlich keinerlei Entnahme.',
  'proteccion.Zona de protecció màxima': 'Stärkste Einschränkung innerhalb des Schutzgebiets.',
  "proteccion.Zona d'alta protecció": 'Hoher Schutz; Tätigkeiten stark eingeschränkt.',
  "proteccion.Zona d'us restringit": 'Eingeschränkte Nutzung, in der Regel genehmigungspflichtig.',
  'proteccion.Zona de veda de pesca recreativa': 'Besondere Schonzeit für das Freizeitangeln.',
  'proteccion.Zona de protecció especial':
    'Zusätzliche Einschränkungen über die allgemeine Ordnung hinaus.',
  'proteccion.Zona de protecció pesquera': 'Fischereibezogene Einschränkungen.',
  'proteccion.Zona especial de busseig': 'Besonders geregeltes Tauchen.',
  'proteccion.Reserva marina': 'Allgemeiner Umriss des Schutzgebiets.',
  'proteccion.ZEC': 'Besonderes Schutzgebiet (Natura 2000).',
  'proteccion.LIC': 'Gebiet von gemeinschaftlicher Bedeutung (Natura 2000).',
  'proteccion.ZEPA': 'Besonderes Vogelschutzgebiet (Natura 2000).',
  'proteccion.ZEC i ZEPA': 'Natura-2000-Gebiet mit doppelter Ausweisung.',
  'proteccion.LIC i ZEPA': 'Natura-2000-Gebiet mit doppelter Ausweisung.',
  'proteccion.Parc nacional':
    'Meeres- und Landnationalpark; eigene und sehr restriktive Ordnung.',
  'proteccion.Parc natural':
    'Naturpark; PORN oder PRUG legen fest, was auf dem Meer erlaubt ist.',
  'proteccion.Paratge natural': 'Naturraum; der PORN legt die Ordnung des Meeresanteils fest.',
  'proteccion.Reserva natural': 'Naturreservat; höchster Schutz innerhalb des Gebiets.',
  "proteccion.Zona d'exclusió": 'Sperrzone: kein Fischen, kein Ankern, keine Navigation.',
  "proteccion.Zona d'ús limitat":
    'Eingeschränkte Nutzung: Ankern geregelt oder über Seegras verboten.',
  "proteccion.Zona d'ús compatible": 'Verträgliche Nutzung mit gewissem Grad an Bewirtschaftung.',
  'proteccion.Àrea de protecció estricta':
    'Strenger Schutz: kein Fischen, kein Ankern, kein Freizeittauchen.',
  'proteccion.Àrea de conservació predominant':
    'Vorrangige Erhaltung; die Ordnung legt der Park fest.',
  'proteccion.Àrea de conservació': 'Erhaltung; der grösste Teil des Meeresanteils des Parks.',
  "proteccion.Àrea d'aprofitament condicionat a la conservació":
    'Bewirtschaftung unter dem Vorbehalt der Erhaltung.',
  'proteccion.Ús portuari': 'Hafennutzungszone innerhalb des Parks.',
  'proteccion.Fondeig prohibit': 'Ankern verboten, ausser bei höherer Gewalt.',
  'proteccion.Fondeig regulat': 'Bojenfeld: festmachen, nicht ankern.',
  'proteccion.Fondeig lliure condicionat':
    'Freies Ankern nur über Sand, niemals über Seegras.',
  'proteccion.Zona pesca submarina prohibida':
    'Unterwasserjagd durch amtliche Abgrenzung verboten.',
  'proteccion.Zona pesca submarina condicionada':
    'Unterwasserjagd mit besonderer Genehmigung möglich.',
  'proteccion.generico': 'Weitere Gebiete',
  'proteccion.genericoDescripcion': 'Schutzgebiet ohne zugewiesene Farbe.',

  // -- Standortbestimmung ----------------------------------------------------
  'ubicacion.noSoportada': 'Dieser Browser kann den Standort nicht ermitteln.',
  'ubicacion.denegada': 'Du hast den Zugriff auf den Standort verweigert.',
  'ubicacion.noDeterminada': 'Die Position konnte nicht bestimmt werden.',
  'ubicacion.tiempoAgotado': 'Die Positionsbestimmung hat zu lange gedauert.',
  'ubicacion.errorGenerico': 'Der Standort konnte nicht ermittelt werden.',
  'ubicacion.dudosaTitulo': 'Position zu knapp',
  'ubicacion.dudosaDetalle':
    'Du bist etwa {distancia} von der Grenze von {nombre} entfernt. Aktuelle ' +
    'GPS-Genauigkeit: {precision}. Es lässt sich nicht sicher bestimmen, ob du innerhalb ' +
    'oder ausserhalb bist.',
  'ubicacion.dentroTitulo': 'Innerhalb von {nombre}',
  'ubicacion.dentroDetalle': 'Du bist etwa {distancia} innerhalb der Grenze.',
  'ubicacion.dentroVarias': ' Dieser Punkt ist von {n} Schutzgebieten betroffen.',
  'ubicacion.fueraTitulo': 'Ausserhalb der geladenen Gebiete',
  'ubicacion.fueraDetalle': 'Die nächste Grenze, {nombre}, ist {distancia} entfernt. ',
  'ubicacion.precisionGps': ' GPS-Genauigkeit: {precision}.',
  'ubicacion.precisionDesconocida': 'unbekannt (±{metros} m angenommen)',
  'ubicacion.sello': ' Position gelesen um {hora}.',

  // -- Einheiten -------------------------------------------------------------
  'unidad.km': '{valor} km',
  'unidad.m': '{valor} m',
  'unidad.km2': '{valor} km²',
};
