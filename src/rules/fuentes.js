/**
 * Fuentes citables por las fichas.
 *
 * Toda afirmación de una ficha remite a una de estas claves. Si un dato no
 * tiene fuente, no se escribe: `npm run rules:check` rechaza cualquier
 * actividad con estado distinto de `unknown` que no cite ninguna.
 */

export const FUENTES = {
  'caib-regulacion-palma': {
    titulo: 'Regulación de actividades — Reserva Marina de la Badia de Palma',
    url: 'https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades-854/',
    consultada: '2026-08-15',
  },
  'caib-regulacion-migjorn': {
    titulo: 'Regulación de actividades — Reserva Marina del Migjorn de Mallorca',
    url: 'https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades-862/',
    consultada: '2026-08-15',
  },
  'boib-orden-2006-palma': {
    titulo:
      'Orden de la Consejera de Agricultura y Pesca de 1 de septiembre de 2006, por la que se regulan las actividades a desarrollar en la reserva marina de la Bahía de Palma',
    url: 'https://www.caib.es/sites/reservesmarines/ca/d/boib_num_128_de_12_de_septiembre_de_2006-2154/',
    referencia:
      'BOIB núm. 128, de 12 de septiembre de 2006 (corrección en BOIB núm. 139, de 5 de octubre de 2006). Arts. 2 (área de protección especial) y 9 (buceo)',
    consultada: '2026-08-15',
  },
  'tramite-autorizacion-embarcacion': {
    titulo:
      'Autorizaciones de pesca recreativa desde embarcación en las reservas marinas',
    url: 'https://www.caib.es/seucaib/es/tramites/tramite/3691781',
    consultada: '2026-08-15',
  },
  'tramite-autorizacion-submarina': {
    titulo:
      'Autorizaciones de pesca submarina en las reservas marinas de la Bahía de Palma y del Migjorn de Mallorca',
    url: 'https://www.caib.es/seucaib/es/tramites/tramite/1683027/',
    consultada: '2026-08-15',
  },
  'caib-regulacion-ponent': {
    titulo:
      'Regulación de actividades — Reserva Marina del Ponent de Mallorca, el Toro, les Malgrats i el Sec',
    url: 'https://www.caib.es/sites/reservesmarines/es/regulacian_de_actividades_0/',
    consultada: '2026-08-15',
  },
  'boib-decret-38-2022': {
    titulo:
      'Decret 38/2022, de 5 de setembre, pel qual s’estableix la Reserva Marina de les illes del Toro i de les Malgrats i s’hi regulen les activitats d’extracció de flora i fauna marines i les activitats subaquàtiques',
    url: 'https://www.caib.es/eboibfront/ca/2022/11621/664355/decret-38-2022-de-5-de-setembre-pel-qual-s-estable',
    referencia:
      'Arts. 4 i 5; art. 7 (zona especial de busseig de l’Illa del Toro) i art. 8 (illes Malgrats); annexos 2 i 3',
    consultada: '2026-08-15',
  },
  'boib-decret-26-2025': {
    titulo:
      'Decret 26/2025, pel qual s’estableix la Reserva Marina del Ponent de Mallorca i s’hi regulen les activitats',
    url: 'https://www.caib.es/eboibfront/pdf/ca/2025/86/1195240',
    referencia: 'BOIB núm. 86, de 2025',
    consultada: '2026-08-15',
  },
  'caib-regulacion-dragonera': {
    titulo: 'Regulación de actividades — Reserva Marina de sa Dragonera',
    url: 'https://www.caib.es/sites/reservesmarines/es/regulacian_de_actividades/',
    consultada: '2026-08-15',
  },
  'caib-regulacion-llevant': {
    titulo: 'Regulación de actividades — Reserva Marina del Llevant de Mallorca',
    url: 'https://www.caib.es/sites/reservesmarines/es/regulacian_de_actividades_0_0/',
    consultada: '2026-08-15',
  },
  'boe-orden-apa-1024-2020': {
    titulo:
      'Orden APA/1024/2020, de 27 de octubre, por la que se establece la reserva marina de interés pesquero de la isla Dragonera, y se definen su delimitación, zonas y usos',
    url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2020-13657',
    referencia: 'Arts. 2, 3, 5, 6 y 7. Rige las aguas exteriores (ámbito estatal)',
    consultada: '2026-08-15',
  },
  'boe-orden-apa-690-2018': {
    titulo:
      'Orden APA/690/2018, de 19 de junio, por la que se regula la reserva marina de interés pesquero del Levante de Mallorca-Cala Rajada y se definen su delimitación y usos permitidos',
    url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2018-8990',
    referencia: 'Arts. 2, 3, 5, 6 y 7. Rige las aguas exteriores (ámbito estatal)',
    consultada: '2026-08-15',
  },
  'boib-ordre-6-2025': {
    titulo:
      'Ordre 6/2025 del conseller d’Agricultura, Pesca i Medi Natural, de regulació de la velocitat de navegació i de la zona d’alta protecció dels illots dels Calafats',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/o/2025/03/06/6/dof/cat',
    referencia: 'Arts. 2 y 3',
    consultada: '2026-08-15',
  },
  'boe-rd-191-2026': {
    titulo:
      'Real Decreto 191/2026, de 11 de marzo, para la conservación de praderas de fanerógamas marinas en aguas marinas del Mediterráneo español',
    url: 'https://www.boe.es/buscar/doc.php?id=BOE-A-2026-5877',
    referencia: 'Art. 5, fondeo sobre Posidonia oceanica y Cymodocea nodosa',
    consultada: '2026-08-15',
  },
  'boib-decret-62-2016-dragonera': {
    titulo:
      'Decreto 62/2016, de 7 de octubre, por el que se establece la Reserva Marina del Freu de sa Dragonera y se regulan las actividades de extracción de flora y fauna marina y las actividades subacuáticas',
    url: 'http://www.caib.es/eboibfront/pdf/es/2016/128/962190',
    referencia: 'Arts. 1 y 2. Norma de creación del ámbito autonómico de sa Dragonera',
    consultada: '2026-08-15',
  },
  'boib-decret-71-2016-llevant': {
    titulo:
      'Decreto 71/2016, de 16 de diciembre, por el que se regulan las actividades de extracción de flora o fauna marinas y las actividades subacuáticas en la Reserva Marina del Llevant de Mallorca',
    url: 'https://www.caib.es/eboibfront/es/2016/10590/588893/decret-71-2016-de-16-de-desembre-pel-qual-es-regul',
    referencia: 'Art. 2, régimen de la reserva integral de cabo Ferrutx',
    consultada: '2026-08-15',
  },
  'boib-orden-2005-migjorn-zpe': {
    titulo:
      'Orden de la Consejera de Agricultura y Pesca de 29 de abril de 2005, por la que se establece un área de protección especial en la reserva marina del Migjorn de Mallorca',
    url: 'https://www.caib.es/sites/puntdinformacioambiental/f/139747',
    referencia: 'Art. 2, régimen jurídico dentro del área de protección especial',
    consultada: '2026-08-15',
  },
  'boib-resolucion-2009-migjorn-veda': {
    titulo:
      'Resolución de la Consejera de Agricultura y Pesca de 19 de febrero de 2009, por la que se establecen medidas complementarias de regulación en la reserva marina del Migjorn de Mallorca',
    url: 'https://boib.caib.es/pdf/2009031/mp54.pdf',
    referencia: 'Punto quinto, zona de veda para la pesca recreativa desde tierra y embarcación',
    consultada: '2026-08-15',
  },
  'boib-resolucion-2024-migjorn-veda-prorroga': {
    titulo:
      'Resolución del director general de Pesca de 15 de mayo de 2024, por la que se prorroga la zona de veda para la pesca recreativa en la reserva marina del Migjorn de Mallorca',
    url: 'https://industriaspesqueras.com/noticia-79110-sec-Legislaci%C3%B3n',
    referencia: 'Prórroga de 5 años desde su publicación en el BOIB núm. 68, de 23 de mayo de 2024',
    consultada: '2026-08-15',
  },
  // -- Espacios naturales protegidos -----------------------------------------
  'boib-decreto-19-2007-porn-tramuntana': {
    titulo:
      'Decreto 19/2007, de 16 de marzo, por el que se aprueba el Plan de Ordenación de los Recursos Naturales de la Serra de Tramuntana',
    url: 'https://www.caib.es/sites/puntdinformacioambiental/f/138451',
    referencia:
      'BOIB núm. 54 EXT., de 11 de abril de 2007. Ámbito marino: art. 77 (tránsito marino), 78 (pesca profesional), 79 (pesca recreativa), 80 (pesca submarina), 81 (protección de especies marinas), 82 (fondeo) y 83 (buceo)',
    consultada: '2026-08-15',
  },
  'tramite-autorizacion-submarina-enp': {
    titulo:
      'Autorización para practicar la pesca submarina en los espacios de relevancia ambiental de las Illes Balears',
    url: 'https://www.caib.es/seucaib/ca/200/persones%20/tramites/tramite/2679858',
    referencia:
      'Exige licencia de pesca submarina en vigor y tarjeta federativa de actividades subacuáticas. Tasa de 53,90 € por autorización y por espacio natural protegido',
    consultada: '2026-08-15',
  },

  // -- Red Natura 2000 -------------------------------------------------------
  'boib-decret-91-2023': {
    titulo:
      'Decret 91/2023, de 15 de desembre, pel qual es regula la pesca marítima i el marisqueig a les zones que integren la xarxa ecològica europea Natura 2000 declarades per la Comunitat Autònoma de les Illes Balears',
    url: 'https://www.caib.es/eboibfront/pdf/es/2023/170/1151625',
    referencia:
      'BOIB núm. 170, de 16 de desembre de 2023. Art. 2 (relación de espacios con ámbito marino), art. 3 (pesca profesional), art. 4 (pesca recreativa de superficie y marisqueo) y art. 5 (pesca recreativa submarina)',
    consultada: '2026-08-15',
  },
  'boib-decret-17-2023-costa-llevant': {
    titulo:
      'Decret 17/2023, de 20 de març, pel qual s’aprova el Pla de Gestió Natura 2000 Costa de Llevant de Mallorca',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2023/03/20/17/dof/spa/pdf',
    referencia:
      'BOIB núm. 36, de 21 de març de 2023. Apartado 5.8 del plan: 5.8.1 pesca, 5.8.4 fondeo, 5.8.5 navegación',
    consultada: '2026-08-15',
  },
  'boib-decret-49-2015-tramuntana': {
    titulo:
      'Decret 49/2015, de 22 de maig, pel qual s’aprova el Pla de Gestió Natura 2000 de la Serra de Tramuntana',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2015/05/22/49/dof/spa/pdf',
    referencia:
      'BOIB núm. 79, de 27 de maig de 2015. Normas de regulación del ámbito marino: 3.9 (buceo), 3.12 (fondeo libre condicionado), 4.1 (Pinna nobilis y Lithophaga lithophaga)',
    consultada: '2026-08-15',
  },
  'boib-decret-34-2014-pesca-recreativa': {
    titulo:
      'Decret 34/2014, d’1 d’agost, pel qual es fixen els principis generals de la pesca recreativa i esportiva a les aigües interiors de les Illes Balears',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2014/08/01/34/dof/spa/html',
    referencia:
      'BOIB núm. 104, de 2 d’agost de 2014. Régimen general al que remiten los arts. 4 y 5 del Decret 91/2023',
    consultada: '2026-08-15',
  },
  'boib-decret-31-2021-marisqueig': {
    titulo:
      'Decret 31/2021, de 31 de maig, pel qual es regula el marisqueig professional i recreatiu a les Illes Balears',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2021/05/31/31/dof/spa/html',
    referencia:
      'BOIB núm. 71, d’1 de juny de 2021. Régimen general al que remiten los arts. 4 y 5 del Decret 91/2023',
    consultada: '2026-08-15',
  },
  'boib-decret-39-2021-costa-est-menorca': {
    titulo:
      'Decret 39/2021, de 2 d’agost, pel qual s’aprova el Pla de Gestió Natura 2000 de la costa est de Menorca',
    url: 'https://www.caib.es/eboibfront/pdf/VisPdf?action=VisEdicte&idDocument=1094310&lang=es',
    referencia:
      'BOIB núm. 104, de 5 d’agost de 2021. Apartado 5.3 del plan: 5.3.1 fondeo y 5.3.2 navegación',
    consultada: '2026-08-15',
  },
  'boib-decret-17-2022-illa-aire-n2000': {
    titulo:
      'Decret 17/2022, de 23 de maig, pel qual s’aprova el Pla de Gestió Natura 2000 Illa de l’Aire',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2022/05/23/17/dof/spa/pdf',
    referencia:
      'Apartado 5.6 del plan: 5.6.1 fondeo, 5.6.3 instalaciones náuticas de temporada, 5.6.4 buceo y 5.6.5 pesca',
    consultada: '2026-08-15',
  },
  'boib-decret-25-2018-posidonia': {
    titulo:
      'Decret 25/2018, de 27 de juliol, sobre la conservació de la Posidonia oceanica a les Illes Balears',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2018/07/27/25/dof/spa/html',
    consultada: '2026-08-15',
  },
  'boe-rd-876-2014-costas': {
    titulo:
      'Real Decreto 876/2014, de 10 de octubre, por el que se aprueba el Reglamento General de Costas',
    url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2014-10345',
    referencia: 'Art. 73, zonas de baño balizadas y franjas de 200 m en playas y 50 m en el resto de la costa',
    consultada: '2026-08-15',
  },
  'boe-orden-aaa-1260-2014': {
    titulo:
      'Orden AAA/1260/2014, de 9 de julio, por la que se declaran Zonas de Especial Protección para las Aves en aguas marinas españolas',
    url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2014-7576',
    referencia:
      'Declara ES0000518, ES0000519 y ES0000520. Art. 4 (planes de gestión), art. 5 (gestión estatal) y art. 6 (régimen de protección)',
    consultada: '2026-08-15',
  },
  'boe-orden-aaa-1299-2014': {
    titulo:
      'Orden AAA/1299/2014, de 9 de julio, por la que se aprueba la propuesta de inclusión en la lista de lugares de importancia comunitaria de la Red Natura 2000 de los espacios marinos ESZZ16001, ESZZ16002 Canal de Menorca, ESZZ12002 y ESZZ12001',
    url: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2014-7726',
    consultada: '2026-08-15',
  },
  'boe-orden-aaa-1479-2016-canal-menorca': {
    titulo:
      'Orden AAA/1479/2016, de 7 de septiembre, por la que se establece una zona protegida de pesca en el área del Canal de Menorca',
    url: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2016-8512',
    referencia:
      'Arts. 2 y 3. Afecta a arrastre, dragas, jábegas y redes similares sobre dos polígonos concretos, no a la pesca recreativa ni a todo el LIC',
    consultada: '2026-08-15',
  },

  'decret-41-2015': {
    titulo:
      'Decret 41/2015, de 22 de maig, pel qual es regulen les activitats d’extracció de flora o fauna marina i les activitats subaquàtiques a les reserves marines de les aigües interiors del litoral de les Illes Balears',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2015/05/22/41/dof/spa/pdf',
    referencia:
      'BOIB núm. 77, de 23 de maig de 2015. Art. 4 (pesca profesional), art. 5 (pesca recreativa de superficie y aparejos permitidos) y art. 9 (actividades subacuáticas; el 9.2 prohíbe llevar instrumentos de pesca en inmersión)',
    consultada: '2026-08-15',
  },

  // -- Eivissa i Formentera --------------------------------------------------
  'caib-regulacion-freus': {
    titulo: 'Regulación de actividades — Reserva Marina dels Freus d’Eivissa i Formentera',
    url: 'https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades-874/',
    consultada: '2026-08-15',
  },
  'boib-decreto-63-1999-freus': {
    titulo:
      'Decreto 63/1999, de 28 de mayo, por el que se establece la reserva marina de los Freus de Eivissa y Formentera',
    url: 'http://www.caib.es/eboibfront/pdf/VisPdf?action=VisHistoric&p_any=1999&p_numero=074&p_finpag=8126&p_inipag=8125&idDocument=125247&lang=es',
    referencia:
      'BOCAIB núm. 74, de 8 de junio de 1999. Art. 2 (zona de protección máxima de s’Espardell) y art. 3 (régimen fuera de ella)',
    consultada: '2026-08-15',
  },
  'boib-resolucion-2023-freus-veda': {
    titulo:
      'Resolución del director general de Pesca de 4 de diciembre de 2023 por la que se establece una zona de veda para la pesca recreativa en la Reserva Marina de los Freus de Ibiza y Formentera',
    url: 'https://www.caib.es/eboibfront/pdf/es/2023/166/1150935',
    referencia:
      'BOIB núm. 166, de 7 de diciembre de 2023. Veda de tres años para la pesca recreativa desde tierra o desde embarcación',
    consultada: '2026-08-15',
  },
  'boib-resolucion-2026-estany-des-peix': {
    titulo:
      'Resolución del director general de Pesca de 31 de marzo de 2026 por la que se veda la pesca de fluixa y curricán en el Estany des Peix',
    url: 'https://www.caib.es/eboibfront/pdf/es/2026/46/1216671',
    referencia: 'BOIB núm. 46, de 9 de abril de 2026',
    consultada: '2026-08-15',
  },

  'caib-regulacion-sa-creu': {
    titulo: 'Regulación de actividades — Reserva Marina de la Punta de sa Creu',
    url: 'https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades/',
    consultada: '2026-08-15',
  },
  'boib-decreto-38-2018-sa-creu': {
    titulo:
      'Decreto 38/2018, de 16 de noviembre, por el que se establece la Reserva Marina de la Punta de sa Creu y se regulan las actividades de extracción de flora y fauna marina y las actividades subacuáticas',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2018/11/16/38/dof/spa/pdf',
    referencia:
      'BOIB núm. 144, de 17 de noviembre de 2018. Art. 2 (prohibiciones y excepciones tasadas), art. 4 (pesca recreativa). Modificado por el Decreto 15/2022',
    consultada: '2026-08-15',
  },
  'boib-decreto-15-2022-pitiuses': {
    titulo:
      'Decreto 15/2022, de 16 de mayo, por el que se establece un Plan de Gestión para la Pesca Profesional Artesanal en las Aguas Interiores de las islas Pitiusas y se modifica el Decreto 38/2018',
    url: 'https://www.caib.es/eboibfront/pdf/es/2022/65/1111460',
    referencia:
      'BOIB núm. 65, de 19 de mayo de 2022. Disposición final primera: reescribe los arts. 2.1.c y 4.3 del Decreto 38/2018 para admitir el esparavel',
    consultada: '2026-08-15',
  },

  'caib-regulacion-tagomago': {
    titulo: 'Regulación de actividades — Reserva Marina de la costa nord-est d’Eivissa-Tagomago',
    url: 'https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades_0/',
    consultada: '2026-08-15',
  },
  'boib-decreto-45-2018-tagomago': {
    titulo:
      'Decreto 45/2018, de 14 de diciembre, por el que se establece la Reserva Marina de la costa noreste de Ibiza-Tagomago y se regulan las actividades de extracción de flora y fauna marina y las actividades subacuáticas',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2018/12/14/45/dof/spa/pdf',
    referencia:
      'BOIB núm. 157, de 15 de diciembre de 2018. Art. 2 (reserva integral de la Llosa des Figueral), art. 3 (prohibiciones y fondeo), art. 5 (pesca recreativa) y art. 6.2 (remisión a los planes de gestión de los LIC)',
    consultada: '2026-08-15',
  },

  'caib-regulacion-vedra': {
    titulo: 'Regulación de actividades — Reserva Marina des Vedrà-Vedranell',
    url: 'https://www.caib.es/sites/reservesmarines/es/regulacian_de_actividades_0_0_0/',
    consultada: '2026-08-15',
  },
  'caib-regulacion-bledes': {
    titulo: 'Regulación de actividades — Reserva Marina de ses Bledes',
    url: 'https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades_0_0_0/',
    consultada: '2026-08-15',
  },
  'boib-decreto-25-2023-vedra-bledes': {
    titulo:
      'Decreto 25/2023, de 2 de mayo, por el que se establecen las Reservas Marinas de ses Bledes y des Vedrà-Vedranell y se regulan las actividades de extracción de flora y fauna marina y las actividades subacuáticas, y se modifican el Decreto 34/2014 y el Decreto 17/2003',
    url: 'https://www.caib.es/eboibfront/pdf/es/2023/57/1135574',
    referencia:
      'BOIB núm. 57, de 4 de mayo de 2023. Art. 2 (zona de especial protección de ses Bledes), art. 3 (punta de na Bruta), art. 4 (prohibiciones y excepciones tasadas), art. 6 (pesca recreativa) y art. 7 (actividades subacuáticas)',
    consultada: '2026-08-15',
  },

  // -- Menorca ---------------------------------------------------------------
  'caib-regulacion-nord-menorca': {
    titulo: 'Regulación de actividades — Reserva Marina del Nord de Menorca',
    url: 'https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades-870/',
    consultada: '2026-08-15',
  },
  'caib-normativa-nord-menorca': {
    titulo: 'Normativa de la Reserva Marina del Norte de Menorca',
    url: 'https://www.caib.es/sites/reservesmarines/es/normativa_basica_sobre_la_reserva-864/',
    referencia:
      'Índice oficial de la evolución normativa desde la Orden de 15 de junio de 1999 (BOCAIB núm. 81) hasta la Orden 11/2026. El enlace que el propio Govern publica para la Orden de 1999 sirve un extracto parcial del BOCAIB que no contiene su articulado',
    consultada: '2026-08-15',
  },
  'boib-resolucion-2024-nord-menorca-veda': {
    titulo:
      'Resolución del director general de Pesca de 16 de febrero de 2024 por la que se establece una zona de veda para la pesca recreativa en la Reserva Marina del Norte de Menorca',
    url: 'https://www.caib.es/eboibfront/pdf/es/2024/25/1155873',
    referencia:
      'BOIB núm. 25, de 20 de febrero de 2024. Prórroga trienal de la veda establecida por primera vez en 2009, al amparo del art. 4.2 de la Orden de 15 de junio de 1999',
    consultada: '2026-08-15',
  },
  'caib-regulacion-illa-aire': {
    titulo: 'Regulación de actividades — Reserva Marina de la Illa de l’Aire',
    url: 'https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades_0_0/',
    consultada: '2026-08-15',
  },
  'boib-decreto-26-2019-illa-aire': {
    titulo:
      'Decreto 26/2019, de 12 de abril, por el que se establece la Reserva Marina de la Illa de l’Aire y se regulan en ella las actividades de extracción de flora y fauna marina y las actividades subacuáticas, y se modifica la Orden de 15 de junio de 1999 de la Reserva Marina del Nord de Menorca',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2019/04/12/26/dof/spa/pdf',
    referencia:
      'BOIB núm. 48, de 13 de abril de 2019. Art. 1 (delimitación), art. 2 (zona especial de buceo), art. 3 (prohibiciones; 3.1.c pesca desde la Illa de l’Aire, 3.1.d cuevas submarinas, 3.3 régimen de la zona de buceo) y art. 5 (pesca recreativa de superficie)',
    consultada: '2026-08-15',
  },
  'boib-orden-11-2026-menorca': {
    titulo:
      'Orden 11/2026, del consejero de Agricultura, Pesca y Medio Natural, de 5 de junio, por la que se regula la velocidad de las embarcaciones dentro de la Reserva Marina de la Isla del Aire y la práctica del buceo colectivo con escafandra en las reservas marinas de Menorca',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/o/2026/06/05/11/dof/spa/pdf',
    referencia:
      'BOIB núm. 73, de 11 de junio de 2026. Art. 2 (velocidad inferior a 10 nudos y prohibición de motos de agua, solo en la Illa de l’Aire), art. 3 (buceo colectivo en la Illa de l’Aire) y art. 4 (buceo colectivo en el Nord de Menorca)',
    consultada: '2026-08-15',
  },

  // -- Cabrera ---------------------------------------------------------------
  'prug-cabrera': {
    titulo:
      'Plan Rector de Uso y Gestión del Parque Nacional Marítimo-Terrestre del Archipiélago de Cabrera',
    url: 'https://www.miteco.gob.es/content/dam/miteco/es/parques-nacionales-oapn/red-parques-nacionales/parques-nacionales/PRUGCabrera_tcm30-62821.pdf',
    referencia:
      'Apartado 2.2 (usos prohibidos): jj) pesca deportiva en cualquier modalidad, ll) navegación, mm) buceo sin autorización, ii) apnea en mayo y junio. Apartado 2.3.2 (pesca profesional) y 2.3.3 (navegación y anclaje)',
    consultada: '2026-08-15',
  },
  'boe-ampliacion-cabrera-2019': {
    titulo:
      'Resolución de 7 de febrero de 2019, del Organismo Autónomo Parques Nacionales, por la que se publica el Acuerdo del Consejo de Ministros de 1 de febrero de 2019, por el que se amplían los límites del Parque Nacional Marítimo-Terrestre del Archipiélago de Cabrera',
    url: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2019-2215',
    consultada: '2026-08-15',
  },
  // -- Parc Natural de s'Albufera des Grau ------------------------------------
  'porn-albufera-des-grau': {
    titulo:
      'Acuerdo del Consejo de Gobierno de 16 de mayo de 2003 por el que se aprueba definitivamente el Plan de Ordenación de los Recursos Naturales de s’Albufera des Grau (Menorca)',
    url: 'https://www.caib.es/sites/puntdinformacioambiental/f/138734',
    referencia:
      'BOIB núm. 82, de 10 de junio de 2003. Art. 47 (pesca: 47.1 prohibición total en el área de protección estricta, 47.2 remisión al Plan Sectorial de aprovechamiento pesquero, 47.3 autorización previa para la pesca submarina, 47.4 laguna) y art. 50 (actividades de ocio: 50.1 ordenación del anclaje, 50.3 buceo colectivo, 50.5 prohibición de fondear sobre posidonia, 50.6 prohibición de navegación y baño en las zonas húmedas)',
    consultada: '2026-08-15',
  },
  'boib-decret-39-2021': {
    titulo:
      'Decreto 39/2021, de 2 de agosto, por el que se aprueba el Plan de Gestión Natura 2000 de la Costa Este de Menorca y el Plan rector de uso y gestión del Parque Natural de s’Albufera des Grau y de las reservas naturales de las illes des Porros (illots d’Addaia), s’Estany, la bassa de Morella, es Prat y la illa d’en Colom',
    url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2021/08/02/39/dof/spa',
    referencia:
      'BOIB núm. 104, de 5 de agosto de 2021. Apartados 5.3.1 (fondeo), 5.3.2 (navegación), 5.3.3 (instalaciones náuticas), 5.3.4 (buceo), 5.3.5 (pesca), 6.2.1 (s’Estany d’Addaia), 6.2.2 (navegación y fondeo; 6.2.2.5 zona de exclusión marina), 6.2.5 (buceo con escafandra: grupos de menos de 8 personas), 6.2.7, 6.3.1 y 7.1 (zonificación). Anexo II: criterios básicos para la elaboración del Plan Sectorial de aprovechamiento pesquero (5.1 pesca submarina, 5.2 pesca de superficie, 6.1 zona de exclusión de Addaia)',
    consultada: '2026-08-15',
  },
  'boib-decret-51-2003': {
    titulo:
      'Decret 51/2003, de 16 de maig, d’ampliació del Parc natural de s’Albufera des Grau i de declaració de les reserves naturals de les illes des Porros, s’Estany, la bassa de Morella, es Prat i l’illa d’en Colom',
    url: 'https://www.caib.es/sites/espaisnaturalsprotegits/ca/parc_natural_de_salbufera_des_grau-21725/archivopub.do?ctrl=MCRST34ZI79442&id=79442',
    referencia: 'BOIB núm. 82, de 10 de junio de 2003',
    consultada: '2026-08-15',
  },
  'tramite-autorizacion-submarina-albufera': {
    titulo:
      'Solicitud de la autorización para practicar la pesca marítima submarina en el ámbito marino del Parque Natural de s’Albufera des Grau',
    url: 'https://www.caib.es/seucaib/es/tramites/tramite/1831120',
    referencia:
      'Tasa de 53,90 €; validez hasta el 31 de diciembre del año de emisión; exige licencia de pesca recreativa submarina en vigor e informe preceptivo de la Dirección General de Espacios Naturales y Biodiversidad; plazo de resolución de 6 meses; la no presentación del registro de capturas comporta la pérdida de la autorización',
    consultada: '2026-08-15',
  },
  'ideib-pesca-submarina-albufera': {
    titulo:
      'Regulació Pesca Submarina Parc Natural Albufera Grau — cartografía oficial (IDEIB, capa 12 del servicio GOIB_NATURA_ENP_04_AG)',
    url: 'https://ideib.caib.es/geoserveis/rest/services/public/GOIB_NATURA_ENP_04_AG/MapServer/12',
    referencia:
      'Dos polígonos, campo TIPUS: «Zona pesca submarina condicionada» (1.044,8 ha) y «Zona pesca submarina prohibida» (705,8 ha)',
    consultada: '2026-08-15',
  },
  'ideib-zonificacion-albufera': {
    titulo:
      'Zonificació Parc Natural Albufera Grau — cartografía oficial (IDEIB, capa 10 del servicio GOIB_NATURA_ENP_04_AG)',
    url: 'https://ideib.caib.es/geoserveis/rest/services/public/GOIB_NATURA_ENP_04_AG/MapServer/10',
    referencia:
      'Campo ZONIFICACI sobre el ámbito marino (AMBIT=«Marí»): zona d’exclusió 9,8 ha, zona d’ús limitat 1.272,0 ha y zona d’ús compatible 468,8 ha',
    consultada: '2026-08-15',
  },

  'rescab-autorizaciones': {
    titulo: 'Portal de autorizaciones del Parque Nacional de Cabrera (navegación, fondeo y buceo)',
    url: 'https://www.caib.es/rescabfront/?lang=es',
    consultada: '2026-08-15',
  },
};

export function fuente(clave) {
  const f = FUENTES[clave];
  if (!f) throw new Error(`Fuente no registrada: ${clave}`);
  return f;
}
