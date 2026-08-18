/**
 * Text normatiu de les fitxes, en català.
 *
 * La clau és la cadena en castellà tal com està escrita a `src/rules/`. El
 * perquè està explicat a `src/i18n/normativa.js` i val la pena repetir-ne la
 * part que afecta qui edita aquest fitxer:
 *
 *   **Si algú canvia el castellà, aquesta entrada deixa de casar i el panell
 *   torna a mostrar el castellà corregit.** No es perd cap resposta i no se'n
 *   mostra cap d'antiga; el que es perd és la traducció, que s'ha de refer.
 *   `npm run i18n:check` les enumera com a òrfenes.
 *
 * Què NO hi ha aquí, i és deliberat:
 *
 *   - Els **títols de les normes**. «Decret 91/2023, de 15 de desembre, pel
 *     qual es regula la pesca marítima…» és com es diu aquesta norma i com
 *     s'ha de cercar al BOIB. Bona part ja són en català, perquè així les
 *     publica el butlletí.
 *   - Els **noms de les figures** (`nombreCorto`) i els **títols dels
 *     documents** que enllacen les fonts. Mateixa raó: són identificadors, i
 *     un enllaç el títol del qual no s'assembla al que hi ha en arribar és un
 *     enllaç pitjor.
 *
 * Els noms científics —Posidonia oceanica, Cymodocea nodosa— van en cursiva
 * en cap idioma i sense traduir en tots: són llatí i és el mateix llatí a
 * tot arreu.
 */

export default {
  // -- Xarxa Natura 2000: la remissió a la normativa general ------------------
  // Aquestes quatre cadenes surten 78, 78, 78 i 52 vegades. Són la correcció
  // més important de tota la capa i la que va contra la intuïció: ser dins un
  // espai Natura 2000 no prohibeix pescar.
  'Estar dentro de un espacio de la Red Natura 2000 no añade por sí solo ninguna prohibición de pesca recreativa.':
    'Ser dins un espai de la Xarxa Natura 2000 no afegeix per si sol cap prohibició de pesca recreativa.',
  'La remisión a la normativa general solo opera donde este espacio no coincide, total ni parcialmente, con el ámbito de una reserva marina o con el área marina de un espacio natural protegido. Donde sí coincide, manda el régimen de esa otra figura, que este mapa resuelve por separado y muestra junto a esta.':
    'La remissió a la normativa general només opera on aquest espai no coincideix, totalment ni parcialment, amb l’àmbit d’una reserva marina o amb l’àrea marina d’un espai natural protegit. On sí que coincideix, mana el règim d’aquella altra figura, que aquest mapa resol per separat i mostra al costat d’aquesta.',
  'Rige la normativa general de pesca recreativa de las Illes Balears: Decret 34/2014 (licencia, modalidades, tallas mínimas y cupos) y Decret 31/2021 (marisqueo).':
    'Regeix la normativa general de pesca recreativa de les Illes Balears: Decret 34/2014 (llicència, modalitats, talles mínimes i quotes) i Decret 31/2021 (marisqueig).',
  'El art. 4 del Decret 91/2023 no impone a los espacios Natura 2000 con ámbito marino ninguna restricción propia de pesca recreativa de superficie ni de marisqueo recreativo: remite expresamente al Decret 34/2014 y al Decret 31/2021, es decir, a la normativa general.':
    'L’art. 4 del Decret 91/2023 no imposa als espais Natura 2000 amb àmbit marí cap restricció pròpia de pesca recreativa de superfície ni de marisqueig recreatiu: remet expressament al Decret 34/2014 i al Decret 31/2021, és a dir, a la normativa general.',
  'El art. 5 del Decret 91/2023 no prohíbe la pesca recreativa submarina en los espacios Natura 2000 con ámbito marino: remite expresamente al Decret 34/2014 y al Decret 31/2021, sin perjuicio de que el plan de gestión del espacio establezca regulación adicional.':
    'L’art. 5 del Decret 91/2023 no prohibeix la pesca recreativa submarina als espais Natura 2000 amb àmbit marí: remet expressament al Decret 34/2014 i al Decret 31/2021, sens perjudici que el pla de gestió de l’espai estableixi regulació addicional.',
  'Donde este espacio se solapa con una reserva marina o con otra figura de protección, manda el régimen de esa figura; este mapa la resuelve por separado.':
    'On aquest espai se superposa amb una reserva marina o amb una altra figura de protecció, mana el règim d’aquella figura; aquest mapa la resol per separat.',
  'Sigue aplicando íntegramente la normativa general de pesca recreativa y de actividades subacuáticas que corresponda a estas aguas.':
    'Continua aplicant-se íntegrament la normativa general de pesca recreativa i d’activitats subaquàtiques que correspongui a aquestes aigües.',
  'Rige la normativa general de pesca recreativa de las Illes Balears.':
    'Regeix la normativa general de pesca recreativa de les Illes Balears.',
  'El Decret 91/2023 no establece límites de navegación, y este espacio no tiene todavía plan de gestión aprobado que pueda establecerlos.':
    'El Decret 91/2023 no estableix límits de navegació, i aquest espai encara no té pla de gestió aprovat que en pugui establir.',
  'El Decret 91/2023 regula la pesca y el marisqueo, no las actividades subacuáticas recreativas. Este espacio no tiene todavía plan de gestión aprobado que pueda añadir nada.':
    'El Decret 91/2023 regula la pesca i el marisqueig, no les activitats subaquàtiques recreatives. Aquest espai encara no té pla de gestió aprovat que hi pugui afegir res.',
  'El plan de gestión de este espacio está en tramitación. El art. 5 permite que, cuando se apruebe, establezca regulación adicional sobre la pesca submarina.':
    'El pla de gestió d’aquest espai és en tramitació. L’art. 5 permet que, quan s’aprovi, estableixi regulació addicional sobre la pesca submarina.',
  'El plan de gestión aprobado de este espacio no establece regulación adicional de la pesca submarina; el art. 5 se lo permitiría, pero no la ha ejercido.':
    'El pla de gestió aprovat d’aquest espai no estableix regulació addicional de la pesca submarina; l’art. 5 li ho permetria, però no ho ha fet.',
  'El plan de gestión permite la práctica del buceo salvo donde lo prohíba o lo condicione la normativa de la reserva marina: no añade por sí mismo ninguna restricción.':
    'El pla de gestió permet la pràctica del busseig llevat d’on ho prohibeixi o ho condicioni la normativa de la reserva marina: no hi afegeix per si mateix cap restricció.',

  // -- Fondeig sobre fanerògames: el RD 191/2026 -----------------------------
  'El Real Decreto 191/2026 prohíbe con carácter general fondear sobre praderas de Posidonia oceanica y de Cymodocea nodosa en todo el Mediterráneo español, incluido el fondeo en arena si la cadena, el ancla u otro elemento del fondeo afecta a la pradera.':
    'El Reial Decret 191/2026 prohibeix amb caràcter general fondejar sobre prades de Posidonia oceanica i de Cymodocea nodosa a tot el Mediterrani espanyol, inclòs el fondeig en arena si la cadena, l’àncora o un altre element del fondeig afecta la prada.',
  'Excepciones: fuerza mayor o peligro para la vida humana, trabajos científicos, de gestión ambiental o arqueológicos autorizados, y reparación de instalaciones preexistentes autorizadas.':
    'Excepcions: força major o perill per a la vida humana, treballs científics, de gestió ambiental o arqueològics autoritzats, i reparació d’instal·lacions preexistents autoritzades.',
  'Prohibido fondear sobre praderas de Posidonia oceanica y de Cymodocea nodosa.':
    'Prohibit fondejar sobre prades de Posidonia oceanica i de Cymodocea nodosa.',
  'Prohibido también en zonas de arena próximas si la cadena, el ancla u otros elementos del fondeo se sitúan sobre la pradera o resultan afectados por el borneo.':
    'Prohibit també en zones d’arena properes si la cadena, l’àncora o altres elements del fondeig se situen sobre la prada o en resulten afectats pel borneig.',
  'Solo se permite fondear sobre esas praderas con sistemas de bajo impacto debidamente autorizados (boyas ecológicas).':
    'Només es permet fondejar sobre aquestes prades amb sistemes de baix impacte degudament autoritzats (boies ecològiques).',
  'Prohibido fondear sobre Posidonia oceanica. Si hay praderas próximas, tampoco la cadena ni los demás elementos del anclaje pueden afectarlas.':
    'Prohibit fondejar sobre Posidonia oceanica. Si hi ha prades properes, tampoc la cadena ni els altres elements de l’ancoratge no les poden afectar.',
  'Prohibido igualmente el anclaje sobre praderas de Cymodocea nodosa y Zostera noltii y sobre fondos de maërl o coralígeno.':
    'Prohibit igualment l’ancoratge sobre prades de Cymodocea nodosa i Zostera noltii i sobre fons de maërl o coral·ligen.',
  'Prohibido igualmente sobre praderas de Cymodocea nodosa y sobre fondos de maërl o coralígeno.':
    'Prohibit igualment sobre prades de Cymodocea nodosa i sobre fons de maërl o coral·ligen.',
  'En lo no regulado por el plan rige el Decret 25/2018 de conservación de la Posidonia oceanica.':
    'En allò no regulat pel pla regeix el Decret 25/2018 de conservació de la Posidonia oceanica.',
  'Prohibido anclar en las zonas de baño debidamente balizadas (art. 73.1 del Reglamento General de Costas).':
    'Prohibit ancorar a les zones de bany degudament abalisades (art. 73.1 del Reglament General de Costes).',
  'Prohibido fondear en las zonas de baño debidamente balizadas (art. 73.1 del Reglamento General de Costas).':
    'Prohibit fondejar a les zones de bany degudament abalisades (art. 73.1 del Reglament General de Costes).',

  // -- Pla de Gestió Costa de Llevant ----------------------------------------
  'El apartado 5.8.1 del Pla de Gestió Costa de Llevant remite la pesca, también en su modalidad submarina, a la regulación que dicte la dirección general competente en materia de pesca: el plan no establece por sí mismo restricciones pesqueras.':
    'L’apartat 5.8.1 del Pla de Gestió Costa de Llevant remet la pesca, també en la modalitat submarina, a la regulació que dicti la direcció general competent en matèria de pesca: el pla no estableix per si mateix restriccions pesqueres.',
  'El apartado 5.8 del Pla de Gestió Costa de Llevant regula pesca, fondeo, navegación, acuicultura y fiestas en embarcaciones, pero no el buceo recreativo.':
    'L’apartat 5.8 del Pla de Gestió Costa de Llevant regula pesca, fondeig, navegació, aqüicultura i festes en embarcacions, però no el busseig recreatiu.',
  'El apartado 5.8.4 del Pla de Gestió Costa de Llevant prohíbe fondear sobre Posidonia oceanica —y que la cadena la alcance— y extiende la prohibición a Cymodocea nodosa, Zostera noltii y fondos de maërl o coralígeno.':
    'L’apartat 5.8.4 del Pla de Gestió Costa de Llevant prohibeix fondejar sobre Posidonia oceanica —i que la cadena hi arribi— i estén la prohibició a Cymodocea nodosa, Zostera noltii i fons de maërl o coral·ligen.',
  'El apartado 5.8.5 del Pla de Gestió Costa de Llevant prohíbe la navegación deportiva y de recreo en las zonas de baño balizadas y limita la velocidad a 3 nudos en la franja contigua a la costa.':
    'L’apartat 5.8.5 del Pla de Gestió Costa de Llevant prohibeix la navegació esportiva i d’esbarjo a les zones de bany abalisades i limita la velocitat a 3 nusos a la franja contigua a la costa.',
  'El apartado 5.3.1 del plan de gestión prohíbe fondear sobre Posidonia oceanica y extiende la prohibición a la Cymodocea nodosa y a los fondos de maërl o coralígeno.':
    'L’apartat 5.3.1 del pla de gestió prohibeix fondejar sobre Posidonia oceanica i estén la prohibició a la Cymodocea nodosa i als fons de maërl o coral·ligen.',
  'El apartado 5.3.2 del Pla de Gestió de la costa est de Menorca obliga a lanzar y varar las embarcaciones por canales señalizados y prohíbe cualquier vertido desde ellas.':
    'L’apartat 5.3.2 del Pla de Gestió de la costa est de Menorca obliga a avarar i treure les embarcacions per canals senyalitzats i prohibeix qualsevol abocament des d’elles.',

  // -- ZEPA marina estatal ----------------------------------------------------
  'La Orden AAA/1260/2014, que declara esta ZEPA marina, no regula la pesca recreativa ni las actividades subacuáticas: su art. 6 se limita a someter a evaluación de repercusiones los planes, programas y proyectos que puedan afectar al espacio (art. 45.4 y 5 de la Ley 42/2007). El plan de gestión que preveía su art. 4 no consta aprobado en la fecha de esta revisión.':
    'L’Ordre AAA/1260/2014, que declara aquesta ZEPA marina, no regula la pesca recreativa ni les activitats subaquàtiques: el seu art. 6 es limita a sotmetre a avaluació de repercussions els plans, programes i projectes que puguin afectar l’espai (art. 45.4 i 5 de la Llei 42/2007). El pla de gestió que preveia el seu art. 4 no consta aprovat en la data d’aquesta revisió.',
  'En el ámbito marino de este plan está prohibida la captura o recolección de Pinna nobilis y de Lithophaga lithophaga (norma 4.1). La captura de cigarra de mar (Scyllarides latus) requiere autorización (norma 3.5).':
    'A l’àmbit marí d’aquest pla està prohibida la captura o recol·lecció de Pinna nobilis i de Lithophaga lithophaga (norma 4.1). La captura d’esclata-sang de mar (Scyllarides latus) requereix autorització (norma 3.5).',

  // -- Busseig i instruments a bord ------------------------------------------
  'Los buceadores, con escafandra o en apnea, no pueden llevar ni en la inmersión ni en la embarcación ningún instrumento utilizable para pescar o extraer especies marinas, salvo el cuchillo de seguridad (art. 9.2 del Decret 41/2015).':
    'Els bussejadors, amb escafandre o en apnea, no poden dur ni a la immersió ni a l’embarcació cap instrument utilitzable per pescar o extreure espècies marines, llevat del ganivet de seguretat (art. 9.2 del Decret 41/2015).',
  'Prohibido llevar cualquier instrumento utilizable para la pesca o la extracción, salvo un cuchillo por seguridad.':
    'Prohibit dur qualsevol instrument utilitzable per a la pesca o l’extracció, llevat d’un ganivet per seguretat.',
  'Prohibidas las inmersiones nocturnas y las inmersiones desde tierra.':
    'Prohibides les immersions nocturnes i les immersions des de terra.',
  'Prohibido efectuar pruebas de mar o prácticas de escuelas de buceo.':
    'Prohibit efectuar proves de mar o pràctiques d’escoles de busseig.',
  'Prohibidos los elementos mecánicos de propulsión submarina.':
    'Prohibits els elements mecànics de propulsió submarina.',
  'Está expresamente prohibido que las embarcaciones que naveguen por las aguas de la reserva, y las personas y vehículos que circulen por el dominio público marítimo-terrestre inmediato, porten fusiles de pesca submarina. Llevarlo a bordo ya es infracción, aunque no se pesque.':
    'Està expressament prohibit que les embarcacions que naveguin per les aigües de la reserva, i les persones i vehicles que circulin pel domini públic maritimoterrestre immediat, portin fusells de pesca submarina. Dur-lo a bord ja és infracció, encara que no es pesqui.',

  // -- Navegació i fondeig a les reserves ------------------------------------
  'Buques en tránsito: velocidad superior a 6 nudos e inferior a 10 nudos.':
    'Vaixells en trànsit: velocitat superior a 6 nusos i inferior a 10 nusos.',
  'Los buques en tránsito procurarán navegar a la mayor distancia posible de la costa.':
    'Els vaixells en trànsit procuraran navegar a la major distància possible de la costa.',
  'La libre navegación está permitida sin autorización en toda la reserva, pero los buques en tránsito deben navegar entre 6 y 10 nudos y lo más lejos posible de la costa.':
    'La lliure navegació és permesa sense autorització a tota la reserva, però els vaixells en trànsit han de navegar entre 6 i 10 nusos i tan lluny de la costa com sigui possible.',
  'Prohibida la navegación deportiva y de recreo dentro de las zonas de baño debidamente balizadas.':
    'Prohibida la navegació esportiva i d’esbarjo dins les zones de bany degudament abalisades.',
  'Donde no hay balizamiento, la zona de baño se entiende como una franja contigua a la costa de 200 m de ancho en las playas y 50 m en el resto del litoral; dentro de ella no se puede navegar a más de 3 nudos.':
    'On no hi ha abalisament, la zona de bany s’entén com una franja contigua a la costa de 200 m d’amplada a les platges i 50 m a la resta del litoral; dins seu no es pot navegar a més de 3 nusos.',
  'Prohibidas las motos de agua en toda la reserva.':
    'Prohibides les motos aquàtiques a tota la reserva.',
  'Prohibido cualquier tipo de vertido desde las embarcaciones.':
    'Prohibit qualsevol tipus d’abocament des de les embarcacions.',
  'Ante cetáceos, tortugas o aves marinas hay que mantener una distancia mínima de 60 m, sin bocinas, altavoces ni aceleraciones bruscas.':
    'Davant cetacis, tortugues o aus marines cal mantenir una distància mínima de 60 m, sense botzines, altaveus ni acceleracions brusques.',
  'El fondeo está prohibido en toda la reserva marina estatal, salvo por emergencia relacionada con la seguridad de la vida humana en el mar, la seguridad nacional o el orden público.':
    'El fondeig és prohibit a tota la reserva marina estatal, llevat d’emergència relacionada amb la seguretat de la vida humana a la mar, la seguretat nacional o l’ordre públic.',
  'En los 5 puntos tradicionales de artes de parada de la reserva está prohibido acercarse a menos de 150 m, y fondear o navegar dentro de los polígonos que los forman, cuando la solta o la moruna estén caladas.':
    'Als 5 punts tradicionals d’arts de parada de la reserva està prohibit acostar-s’hi a menys de 150 m, i fondejar o navegar dins els polígons que els formen, quan la solta o la moruna són calades.',

  // -- Pesca: prohibicions i obligacions -------------------------------------
  'Prohibida cualquier modalidad de pesca y de marisqueo, recreativa o profesional.':
    'Prohibida qualsevol modalitat de pesca i de marisqueig, recreativa o professional.',
  'Obligatorio llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.':
    'Obligatori dur registre de captures; no presentar-lo comporta la pèrdua de la llicència.',
  'Días hábiles: martes, jueves, sábados, domingos y festivos.':
    'Dies hàbils: dimarts, dijous, dissabtes, diumenges i festius.',
  'La pesca submarina está expresamente prohibida en el ámbito estatal de la reserva, junto con la pesca desde tierra, el jigging y el spinning.':
    'La pesca submarina està expressament prohibida a l’àmbit estatal de la reserva, juntament amb la pesca des de terra, el jigging i l’spinning.',
  'En la zona de reserva integral únicamente pueden realizarse actividades científicas expresamente autorizadas.':
    'A la zona de reserva integral només s’hi poden fer activitats científiques expressament autoritzades.',
  'Solo se permiten las actividades que tengan por objeto la conservación, la vigilancia, la investigación o la educación ambiental dirigida por el órgano gestor.':
    'Només es permeten les activitats que tinguin per objecte la conservació, la vigilància, la recerca o l’educació ambiental dirigida per l’òrgan gestor.',
  'El art. 47.1 del PORN prohíbe cualquier tipo de pesca en el área de protección estricta, que el PRUG renombró como zona de exclusión marina. El anexo II del PRUG añade que dentro de ella no cabe ninguna extracción, ni profesional ni recreativa.':
    'L’art. 47.1 del PORN prohibeix qualsevol tipus de pesca a l’àrea de protecció estricta, que el PRUG va reanomenar com a zona d’exclusió marina. L’annex II del PRUG hi afegeix que dins seu no hi cap cap extracció, ni professional ni recreativa.',

  // -- Categories de zonificació que no imposen res --------------------------
  'La zona de uso compatible es una categoría de zonificación del art. 22 de la Ley 5/2005: fija la vocación del área, no un régimen de usos propio. Lo que se puede hacer aquí lo determinan el PORN y el PRUG del parque y, para la pesca submarina, la capa de regulación específica.':
    'La zona d’ús compatible és una categoria de zonificació de l’art. 22 de la Llei 5/2005: fixa la vocació de l’àrea, no un règim d’usos propi. El que s’hi pot fer ho determinen el PORN i el PRUG del parc i, per a la pesca submarina, la capa de regulació específica.',
  'El área de aprovechamiento condicionado a la conservación es una categoría de zonificación del PRUG: fija la vocación del área, no un régimen de usos propio. Lo que se puede hacer aquí lo determinan las normas generales del parque y, para el fondeo, la capa oficial de regulación del fondeo.':
    'L’àrea d’aprofitament condicionat a la conservació és una categoria de zonificació del PRUG: fixa la vocació de l’àrea, no un règim d’usos propi. El que s’hi pot fer ho determinen les normes generals del parc i, per al fondeig, la capa oficial de regulació del fondeig.',

  // -- Abast de les capes oficials -------------------------------------------
  'Esta capa oficial delimita únicamente dónde y cómo se puede fondear dentro del parque. No regula ninguna otra actividad: para las demás rige el régimen del Parc Natural de ses Salines y de las figuras que coincidan sobre el punto.':
    'Aquesta capa oficial delimita únicament on i com es pot fondejar dins el parc. No regula cap altra activitat: per a la resta regeix el règim del Parc Natural de ses Salines i de les figures que coincideixin sobre el punt.',
  'Esta capa oficial delimita únicamente dónde se puede y dónde no se puede pescar a pulmón. No regula ninguna otra actividad: para las demás rige el régimen del Parc Natural de s’Albufera des Grau y de su zonificación.':
    'Aquesta capa oficial delimita únicament on es pot i on no es pot pescar a pulmó. No regula cap altra activitat: per a la resta regeix el règim del Parc Natural de s’Albufera des Grau i de la seva zonificació.',
  'Si la cartografía y lo que se ve en el fondo se contradicen, manda siempre la observación directa sobre el terreno.':
    'Si la cartografia i el que es veu al fons es contradiuen, mana sempre l’observació directa sobre el terreny.',

  // -- Permisos: vigència i notes --------------------------------------------
  '3 años': '3 anys',
  '1 año (hay también diaria y quincenal)': '1 any (n’hi ha també de diària i quinzenal)',
  '1 año (hay también diaria y semanal)': '1 any (n’hi ha també de diària i setmanal)',
  'Autorización anual individual, que habilita también el resto de reservas marinas de Mallorca, salvo las boyas de las zonas especiales de buceo del Toro y les Malgrats. Para estancias cortas esta reserva tiene autorización diaria (5,24 €) y semanal (15,71 €); es la única con semanal y la única sin quincenal. Permiso individual o colectivo que entrega la Dirección General de Pesca y Medio Marino.':
    'Autorització anual individual, que habilita també la resta de reserves marines de Mallorca, llevat de les boies de les zones especials de busseig del Toro i les Malgrats. Per a estades curtes aquesta reserva té autorització diària (5,24 €) i setmanal (15,71 €); és l’única amb setmanal i l’única sense quinzenal. Permís individual o col·lectiu que atorga la Direcció General de Pesca i Medi Marí.',
  'Autorización de la Dirección General de Pesca Sostenible, sujeta a cupos de inmersiones. Las boyas de los puntos de buceo se reservan por la aplicación de la Dirección General de Pesca i Medi Marí del Govern.':
    'Autorització de la Direcció General de Pesca Sostenible, subjecta a quotes d’immersions. Les boies dels punts de busseig es reserven per l’aplicació de la Direcció General de Pesca i Medi Marí del Govern.',

  // -- Categories de zonificació del PRUG de ses Salines ---------------------
  'El área de conservación es una categoría de zonificación del PRUG: fija la vocación del área, no un régimen de usos propio. Lo que se puede hacer aquí lo determinan las normas generales del parque y, para el fondeo, la capa oficial de regulación del fondeo.':
    'L’àrea de conservació és una categoria de zonificació del PRUG: fixa la vocació de l’àrea, no un règim d’usos propi. El que s’hi pot fer ho determinen les normes generals del parc i, per al fondeig, la capa oficial de regulació del fondeig.',
  'El área de conservación predominante es una categoría de zonificación del PRUG: fija la vocación del área, no un régimen de usos propio. Lo que se puede hacer aquí lo determinan las normas generales del parque y, para el fondeo, la capa oficial de regulación del fondeo.':
    'L’àrea de conservació predominant és una categoria de zonificació del PRUG: fixa la vocació de l’àrea, no un règim d’usos propi. El que s’hi pot fer ho determinen les normes generals del parc i, per al fondeig, la capa oficial de regulació del fondeig.',
  // La cadena origen diu «El zona»; és una errada de concordança de la fitxa i
  // la clau l’ha de reproduir tal qual o no casaria. En català es redacta bé.
  'El zona de uso portuario es una categoría de zonificación del PRUG: fija la vocación del área, no un régimen de usos propio. Lo que se puede hacer aquí lo determinan las normas generales del parque y, para el fondeo, la capa oficial de regulación del fondeo.':
    'La zona d’ús portuari és una categoria de zonificació del PRUG: fixa la vocació de l’àrea, no un règim d’usos propi. El que s’hi pot fer ho determinen les normes generals del parc i, per al fondeig, la capa oficial de regulació del fondeig.',
  'La zona de uso limitado es una categoría de zonificación del art. 22 de la Ley 5/2005: fija la vocación del área, no un régimen de usos propio. Lo que se puede hacer aquí lo determinan el PORN y el PRUG del parque y, para la pesca submarina, la capa de regulación específica.':
    'La zona d’ús limitat és una categoria de zonificació de l’art. 22 de la Llei 5/2005: fixa la vocació de l’àrea, no un règim d’usos propi. El que s’hi pot fer ho determinen el PORN i el PRUG del parc i, per a la pesca submarina, la capa de regulació específica.',

  // -- Parc Natural de ses Salines: PRUG -------------------------------------
  'La pesca submarina está expresamente prohibida en todo el ámbito del Parc Natural de ses Salines: el art. 11.4.c del PRUG la enumera entre los usos prohibidos y el art. 94.c la repite en el régimen pesquero.':
    'La pesca submarina està expressament prohibida a tot l’àmbit del Parc Natural de ses Salines: l’art. 11.4.c del PRUG l’enumera entre els usos prohibits i l’art. 94.c la repeteix al règim pesquer.',
  'La prohibición alcanza todo el parque y no depende de estar dentro de la Reserva Marina dels Freus.':
    'La prohibició abasta tot el parc i no depèn de ser dins la Reserva Marina dels Freus.',
  'El art. 110 prohíbe además llevar, tener o transportar a bordo instrumentos utilizables para extraer especies marinas.':
    'L’art. 110 prohibeix a més dur, tenir o transportar a bord instruments utilitzables per extreure espècies marines.',
  'El art. 118 prohíbe navegar y fondear dentro de las zonas de baño, que define como una franja de 200 m paralela a la línea de costa; las embarcaciones solo pueden atravesarlas por los canales de entrada y salida señalizados. Esa franja no se publica como capa cartográfica y este mapa no la dibuja.':
    'L’art. 118 prohibeix navegar i fondejar dins les zones de bany, que defineix com una franja de 200 m paral·lela a la línia de costa; les embarcacions només les poden travessar pels canals d’entrada i sortida senyalitzats. Aquesta franja no es publica com a capa cartogràfica i aquest mapa no la dibuixa.',
  'El art. 4.1.b cierra el régimen: son autorizables todos los usos que no estén expresamente definidos como admitidos ni como prohibidos. Aquí el silencio de la norma no equivale a libertad, sino a necesidad de autorización del órgano gestor del parque.':
    'L’art. 4.1.b tanca el règim: són autoritzables tots els usos que no estiguin expressament definits com a admesos ni com a prohibits. Aquí el silenci de la norma no equival a llibertat, sinó a necessitat d’autorització de l’òrgan gestor del parc.',
  'El art. 94.a del PRUG prohíbe la pesca de cualquier tipo en las áreas de protección estricta, donde aplica además el mismo régimen que la zona de protección máxima de la Reserva Marina dels Freus (art. 2 del Decreto 63/1999).':
    'L’art. 94.a del PRUG prohibeix la pesca de qualsevol tipus a les àrees de protecció estricta, on s’aplica a més el mateix règim que a la zona de protecció màxima de la Reserva Marina dels Freus (art. 2 del Decret 63/1999).',
  'Rige aquí el régimen de la zona de protección máxima de la Reserva Marina dels Freus, por remisión expresa del art. 94.a.':
    'Aquí regeix el règim de la zona de protecció màxima de la Reserva Marina dels Freus, per remissió expressa de l’art. 94.a.',
  'Fondeo libre condicionado: sobre fondo arenoso, evitando praderas de Posidonia oceanica y fondos de maërl.':
    'Fondeig lliure condicionat: sobre fons arenós, evitant prades de Posidonia oceanica i fons de maërl.',
  'Excepción única: embarcaciones dedicadas a vigilancia, investigación, seguimiento naturalístico y educación ambiental dirigida por el órgano gestor.':
    'Excepció única: embarcacions dedicades a vigilància, recerca, seguiment naturalístic i educació ambiental dirigida per l’òrgan gestor.',
  'La embarcación debe permanecer amarrada a la boya asignada; en ningún caso fondear.':
    'L’embarcació ha de romandre amarrada a la boia assignada; en cap cas fondejar.',
  'Pasar la noche fondeado requiere permiso, diario o anual, según la información oficial del parque.':
    'Passar la nit fondejat requereix permís, diari o anual, segons la informació oficial del parc.',

  // -- Parc Natural de la Península de Llevant --------------------------------
  'El art. 39.1 del PORN fija que en el ámbito marino del parque rige su capítulo V y, en defecto de previsión, las prohibiciones y limitaciones del Decret 71/2016 (Reserva Marina del Llevant) y del Decret 41/2015. Donde la reserva marina también alcanza, sus normas se suman a estas.':
    'L’art. 39.1 del PORN fixa que a l’àmbit marí del parc regeix el seu capítol V i, en defecte de previsió, les prohibicions i limitacions del Decret 71/2016 (Reserva Marina del Llevant) i del Decret 41/2015. On la reserva marina també arriba, les seves normes se sumen a aquestes.',

  // -- Es Trenc - Salobrar de Campos ------------------------------------------
  'El PORN aprobado por el Decreto 27/2023 desarrolla estas normas y su articulado no está cargado en este mapa: antes de salir conviene consultarlo. La prohibición de pesca submarina no depende de él, porque la impone directamente el art. 4.1.c de la Ley 2/2017.':
    'El PORN aprovat pel Decret 27/2023 desplega aquestes normes i el seu articulat no està carregat en aquest mapa: abans de sortir convé consultar-lo. La prohibició de pesca submarina no en depèn, perquè la imposa directament l’art. 4.1.c de la Llei 2/2017.',

  // -- Busseig: règim per zones ----------------------------------------------
  'El buceo autónomo se permite previa autorización de la Dirección General de Pesca Sostenible y con cupos. El snorkel desde embarcación al pairo no necesita autorización.':
    'El busseig autònom es permet amb autorització prèvia de la Direcció General de Pesca Sostenible i amb quotes. L’snorkel des d’embarcació a la capa no necessita autorització.',
  'El buceo autónomo requiere autorización. La apnea y el snorkel no la necesitan, pero solo hasta 20 metros de la costa y entre la salida y la puesta del sol.':
    'El busseig autònom requereix autorització. L’apnea i l’snorkel no en necessiten, però només fins a 20 metres de la costa i entre la sortida i la posta del sol.',
  'Snorkel (gafas, tubo y aletas) desde embarcación al pairo: sin autorización, bajo responsabilidad de quien lo practica.':
    'Snorkel (ulleres, tub i aletes) des d’embarcació a la capa: sense autorització, sota responsabilitat de qui el practica.',
  'Apnea y snorkel sin autorización, hasta 20 m de distancia de la costa y entre el orto y el ocaso del sol.':
    'Apnea i snorkel sense autorització, fins a 20 m de distància de la costa i entre l’ortus i l’ocàs del sol.',
  'Las inmersiones en apnea son libres en toda la reserva y no necesitan permiso.':
    'Les immersions en apnea són lliures a tota la reserva i no necessiten permís.',
  'Las inmersiones en apnea son libres en toda la reserva marina.':
    'Les immersions en apnea són lliures a tota la reserva marina.',
  'En las zonas de alta protección, los buceadores individuales no pueden realizar inmersiones nocturnas.':
    'A les zones d’alta protecció, els bussejadors individuals no poden fer immersions nocturnes.',
  'Prohibidas las inmersiones nocturnas para el buceo individual con escafandra (art. 7.1).':
    'Prohibides les immersions nocturnes per al busseig individual amb escafandre (art. 7.1).',
  'Las inmersiones colectivas deben comunicarse en un plazo máximo de tres meses (art. 5.1).':
    'Les immersions col·lectives s’han de comunicar en un termini màxim de tres mesos (art. 5.1).',
  'No está permitido bucear en el interior de las cuevas marinas.':
    'No és permès bussejar a l’interior de les coves marines.',
  'Los buceadores, con escafandra o en apnea, no pueden llevar ni en la inmersión ni en la embarcación ningún instrumento utilizable para pescar o extraer especies marinas, salvo el cuchillo de seguridad.':
    'Els bussejadors, amb escafandre o en apnea, no poden dur ni a la immersió ni a l’embarcació cap instrument utilitzable per pescar o extreure espècies marines, llevat del ganivet de seguretat.',
  'Los buceadores no pueden llevar, ni en la mano ni en la embarcación, instrumentos que puedan utilizarse para pescar o extraer especies marinas; se exceptúa el cuchillo de buceo por ser elemento de seguridad.':
    'Els bussejadors no poden dur, ni a la mà ni a l’embarcació, instruments que es puguin utilitzar per pescar o extreure espècies marines; se n’exceptua el ganivet de busseig per ser element de seguretat.',
  'El número de inmersiones diarias y de turnos se fijará por orden del consejero de Agricultura, Pesca y Medio Natural.':
    'El nombre d’immersions diàries i de torns es fixarà per ordre del conseller d’Agricultura, Pesca i Medi Natural.',
  'La norma 3.9 del Pla de Gestió de la Serra de Tramuntana permite expresamente el buceo recreativo y deportivo en el ámbito marino del plan.':
    'La norma 3.9 del Pla de Gestió de la Serra de Tramuntana permet expressament el busseig recreatiu i esportiu a l’àmbit marí del pla.',

  // -- Zones d’usos restringits i d’alta protecció ---------------------------
  'En las zonas de usos restringidos solo se permiten actividades subacuáticas de recreo, científicas y didácticas. Cualquier uso no recogido queda prohibido.':
    'A les zones d’usos restringits només es permeten activitats subaquàtiques d’esbarjo, científiques i didàctiques. Qualsevol ús no recollit queda prohibit.',
  'La pesca no figura entre las actividades permitidas en las zonas de usos restringidos, y lo no recogido queda prohibido.':
    'La pesca no figura entre les activitats permeses a les zones d’usos restringits, i allò no recollit queda prohibit.',
  'Dentro de la zona de alta protección queda prohibida toda clase de pesca marítima y de extracción de flora y fauna marinas.':
    'Dins la zona d’alta protecció queda prohibida tota classe de pesca marítima i d’extracció de flora i fauna marines.',
  'Dentro de la zona especial de buceo queda prohibida toda clase de pesca marítima y de extracción de flora y fauna marinas.':
    'Dins la zona especial de busseig queda prohibida tota classe de pesca marítima i d’extracció de flora i fauna marines.',
  'La pesca submarina no está permitida en esta zona de alta protección.':
    'La pesca submarina no és permesa en aquesta zona d’alta protecció.',
  'El art. 9.2 del Decret 26/2025 prohíbe toda clase de pesca marítima y de extracción de flora y fauna marinas en esta zona de alta protección.':
    'L’art. 9.2 del Decret 26/2025 prohibeix tota classe de pesca marítima i d’extracció de flora i fauna marines en aquesta zona d’alta protecció.',

  // -- Decret 25/2023 (Pitiüses) ---------------------------------------------
  'El art. 4.1.a del Decreto 25/2023 prohíbe toda clase de pesca marítima y de extracción de flora y fauna marinas, y el 4.2 solo exceptúa las artes menores profesionales, la pesca recreativa desde embarcación o artefactos flotantes y el muestreo científico autorizado. La modalidad submarina no está entre las excepciones.':
    'L’art. 4.1.a del Decret 25/2023 prohibeix tota classe de pesca marítima i d’extracció de flora i fauna marines, i el 4.2 només n’exceptua les arts menors professionals, la pesca recreativa des d’embarcació o artefactes flotants i el mostreig científic autoritzat. La modalitat submarina no és entre les excepcions.',
  'El art. 4.2.b del Decreto 25/2023 solo exceptúa de la prohibición general la pesca y el marisqueo recreativos «desde embarcación o artefactos flotantes»; la pesca desde tierra queda fuera de esa excepción. El art. 6.1 lo confirma expresamente: «Queda prohibida la pesca recreativa desde cualquiera de los islotes».':
    'L’art. 4.2.b del Decret 25/2023 només exceptua de la prohibició general la pesca i el marisqueig recreatius «des d’embarcació o artefactes flotants»; la pesca des de terra queda fora d’aquesta excepció. L’art. 6.1 ho confirma expressament: «Queda prohibida la pesca recreativa des de qualsevol dels illots».',
  'El art. 7.1 del Decreto 25/2023 remite las actividades subacuáticas al art. 9 del Decret 41/2015, que exige autorización específica para el buceo con escafandra autónoma.':
    'L’art. 7.1 del Decret 25/2023 remet les activitats subaquàtiques a l’art. 9 del Decret 41/2015, que exigeix autorització específica per al busseig amb escafandre autònom.',
  'El Decreto 25/2023 regula pesca, extracción y actividades subacuáticas, pero no establece límites de navegación dentro de estas reservas.':
    'El Decret 25/2023 regula pesca, extracció i activitats subaquàtiques, però no estableix límits de navegació dins aquestes reserves.',
  'Dentro de esta zona está prohibido calar trasmallos (art. 3.2 del Decreto 25/2023). Es un arte profesional: no afecta a la pesca recreativa.':
    'Dins aquesta zona està prohibit calar tremalls (art. 3.2 del Decret 25/2023). És un art professional: no afecta la pesca recreativa.',
  'Es una de las tres excepciones tasadas del art. 4.2: la pesca y el marisqueo recreativos desde embarcación o artefactos flotantes, con licencia específica trienal y solo con los aparejos previstos.':
    'És una de les tres excepcions taxades de l’art. 4.2: la pesca i el marisqueig recreatius des d’embarcació o artefactes flotants, amb llicència específica triennal i només amb els ormeigs previstos.',

  // -- Decret 63/1999 (Freus) -------------------------------------------------
  'El art. 2 del Decreto 63/1999 prohíbe en esta zona «cualquier tipo de pesca marítima» y la extracción de flora y fauna marinas, sin excepción para la pesca recreativa.':
    'L’art. 2 del Decret 63/1999 prohibeix en aquesta zona «qualsevol tipus de pesca marítima» i l’extracció de flora i fauna marines, sense excepció per a la pesca recreativa.',
  'El art. 3 del Decreto 63/1999 prohíbe toda clase de pesca marítima en la reserva salvo excepciones tasadas, y entre ellas solo figura la pesca recreativa «de superficie» del art. 5 del Decret 41/2015, que no incluye la modalidad submarina. El art. 9.2 del mismo decreto remata la cuestión al prohibir llevar instrumentos de pesca durante la inmersión.':
    'L’art. 3 del Decret 63/1999 prohibeix tota classe de pesca marítima a la reserva llevat d’excepcions taxades, i entre elles només hi figura la pesca recreativa «de superfície» de l’art. 5 del Decret 41/2015, que no inclou la modalitat submarina. L’art. 9.2 del mateix decret tanca la qüestió en prohibir dur instruments de pesca durant la immersió.',

  // -- Aparells i ormeigs -----------------------------------------------------
  'Caña o volantín: máximo 1 línea por pescador y 4 anzuelos en la zona estatal.':
    'Canya o volantí: màxim 1 línia per pescador i 4 hams a la zona estatal.',
  'Caña o volantín: máximo una línea por pescador y cuatro anzuelos, de más de 7 mm de seno y más de 5,7 mm para el raor.':
    'Canya o volantí: màxim una línia per pescador i quatre hams, de més de 7 mm de si i més de 5,7 mm per al raor.',
  'Caña o volantín: máximo 2 líneas por pescador y 6 anzuelos de 7 mm o más.':
    'Canya o volantí: màxim 2 línies per pescador i 6 hams de 7 mm o més.',
  'Curricán de fondo: máximo una línea por embarcación.':
    'Curricà de fons: màxim una línia per embarcació.',
  'Curricán de fondo: máximo 1 línea por embarcación.':
    'Curricà de fons: màxim 1 línia per embarcació.',
  'Curricán de superficie (fluixa): máximo dos líneas por embarcación.':
    'Curricà de superfície (fluixa): màxim dues línies per embarcació.',
  'Curricán de superficie: máximo 2 líneas por embarcación.':
    'Curricà de superfície: màxim 2 línies per embarcació.',
  'Potera: máximo 1 línea por pescador con 2 poteras.':
    'Poteres: màxim 1 línia per pescador amb 2 poteres.',
  'Potera: máximo una línea con dos poteras por pescador.':
    'Poteres: màxim una línia amb dues poteres per pescador.',
  'Spinning permitido.': 'Spinning permès.',
  'Prohibido usar peces o cefalópodos vivos como cebo.':
    'Prohibit fer servir peixos o cefalòpodes vius com a esquer.',
  'En ningún caso se pueden utilizar peces o cefalópodos vivos como cebo.':
    'En cap cas es poden utilitzar peixos o cefalòpodes vius com a esquer.',
  'Prohibido en todo caso usar peces o cefalópodos vivos como cebo.':
    'Prohibit en tot cas fer servir peixos o cefalòpodes vius com a esquer.',
  'Las competiciones de pesca no están permitidas.':
    'Les competicions de pesca no són permeses.',
  'Los armadores autorizados deben llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.':
    'Els armadors autoritzats han de dur registre de captures; no presentar-lo comporta la pèrdua de la llicència.',
  'Hay que presentar cada año el registro de capturas en las hojas que se entregan con la autorización; no hacerlo impide la renovación.':
    'Cal presentar cada any el registre de captures als fulls que es lliuren amb l’autorització; no fer-ho impedeix la renovació.',

  // -- Navegació i abocaments -------------------------------------------------
  'El lanzamiento o la varada de embarcaciones debe hacerse por canales debidamente señalizados.':
    'L’avarada o la treta d’embarcacions s’ha de fer per canals degudament senyalitzats.',
  'Se admiten los circuitos y actividades de navegación sin motor cuando no desembarquen en islotes.':
    'S’admeten els circuits i activitats de navegació sense motor quan no desembarquin als illots.',
  'La libre navegación está permitida sin autorización, pero los buques en tránsito deben navegar entre 6 y 10 nudos y lo más lejos posible de la costa.':
    'La lliure navegació és permesa sense autorització, però els vaixells en trànsit han de navegar entre 6 i 10 nusos i tan lluny de la costa com sigui possible.',
  'Ni el Decret 91/2023 ni el Pla de Gestió de la Serra de Tramuntana establecen límites de navegación en el ámbito marino de estos espacios.':
    'Ni el Decret 91/2023 ni el Pla de Gestió de la Serra de Tramuntana no estableixen límits de navegació a l’àmbit marí d’aquests espais.',

  // -- Fondeig: matisos per figura -------------------------------------------
  'Prohibido con carácter general fondear sobre Posidonia oceanica; si hay praderas próximas, tampoco la cadena ni los demás elementos del fondeo pueden afectarlas (ap. 5.3.1).':
    'Prohibit amb caràcter general fondejar sobre Posidonia oceanica; si hi ha prades properes, tampoc la cadena ni els altres elements del fondeig no les poden afectar (ap. 5.3.1).',
  'Prohibido fondear sobre praderas de Posidonia oceanica y de Cymodocea nodosa, incluido el caso de anclar en arena si la cadena o el ancla alcanzan la pradera (RD 191/2026).':
    'Prohibit fondejar sobre prades de Posidonia oceanica i de Cymodocea nodosa, inclòs el cas d’ancorar en arena si la cadena o l’àncora arriben a la prada (RD 191/2026).',
  'Solo se permite fondear sobre esas praderas con sistemas de bajo impacto debidamente autorizados.':
    'Només es permet fondejar sobre aquestes prades amb sistemes de baix impacte degudament autoritzats.',
  'La norma 3.12 del plan declara todo su ámbito «área de fondeo libre condicionado»: se puede fondear, pero el patrón debe procurar hacerlo sobre fondo arenoso y evitar fijar el ancla sobre praderas de Posidonia oceanica o fondos de maërl. El Real Decreto 191/2026 convierte esa cautela en prohibición expresa en todo el Mediterráneo español.':
    'La norma 3.12 del pla declara tot el seu àmbit «àrea de fondeig lliure condicionat»: es pot fondejar, però el patró ha de procurar fer-ho sobre fons arenós i evitar fixar l’àncora sobre prades de Posidonia oceanica o fons de maërl. El Reial Decret 191/2026 converteix aquesta cautela en prohibició expressa a tot el Mediterrani espanyol.',
  'El ancla solo puede fijarse sobre fondo arenoso y nunca sobre formaciones de Posidonia oceanica, y el patrón de la embarcación es responsable de comprobarlo (art. 117.c). Rige además el Real Decreto 191/2026, que extiende la prohibición a la Cymodocea nodosa en todo el Mediterráneo español.':
    'L’àncora només es pot fixar sobre fons arenós i mai sobre formacions de Posidonia oceanica, i el patró de l’embarcació és responsable de comprovar-ho (art. 117.c). Regeix a més el Reial Decret 191/2026, que estén la prohibició a la Cymodocea nodosa a tot el Mediterrani espanyol.',
  'Prohibida la alimentación o «feeding» de las especies marinas (norma 3.10).':
    'Prohibida l’alimentació o «feeding» de les espècies marines (norma 3.10).',

  // -- Espais fora de l’art. 2 del Decret 91/2023 -----------------------------
  'Este espacio no figura en el art. 2 del Decret 91/2023, así que su régimen de pesca no le alcanza. El plan de gestión que sí lo cubre remite la pesca (desde costa) a la dirección general competente en materia de pesca, sin establecer restricciones propias.':
    'Aquest espai no figura a l’art. 2 del Decret 91/2023, així que el seu règim de pesca no l’abasta. El pla de gestió que sí que el cobreix remet la pesca (des de costa) a la direcció general competent en matèria de pesca, sense establir restriccions pròpies.',
  'Este espacio no figura en el art. 2 del Decret 91/2023, así que su régimen de pesca no le alcanza. El plan de gestión que sí lo cubre remite la pesca (desde embarcación) a la dirección general competente en materia de pesca, sin establecer restricciones propias.':
    'Aquest espai no figura a l’art. 2 del Decret 91/2023, així que el seu règim de pesca no l’abasta. El pla de gestió que sí que el cobreix remet la pesca (des d’embarcació) a la direcció general competent en matèria de pesca, sense establir restriccions pròpies.',
  'Este espacio no figura en el art. 2 del Decret 91/2023, así que su régimen de pesca no le alcanza. El plan de gestión que sí lo cubre remite la pesca (submarina) a la dirección general competente en materia de pesca, sin establecer restricciones propias.':
    'Aquest espai no figura a l’art. 2 del Decret 91/2023, així que el seu règim de pesca no l’abasta. El pla de gestió que sí que el cobreix remet la pesca (submarina) a la direcció general competent en matèria de pesca, sense establir restriccions pròpies.',
  'La Orden AAA/1260/2014, que declara esta ZEPA marina, no regula la pesca recreativa ni las actividades subacuáticas: su art. 6 se limita a someter a evaluación de repercusiones los planes, programas y proyectos que puedan afectar al espacio (art. 45.4 y 5 de la Ley 42/2007). El plan de gestión que preveía su art. 4 no consta aprobado en la fecha de esta revisión. En particular, no existe ninguna prohibición de pesca submarina derivada de esta figura.':
    'L’Ordre AAA/1260/2014, que declara aquesta ZEPA marina, no regula la pesca recreativa ni les activitats subaquàtiques: el seu art. 6 es limita a sotmetre a avaluació de repercussions els plans, programes i projectes que puguin afectar l’espai (art. 45.4 i 5 de la Llei 42/2007). El pla de gestió que preveia el seu art. 4 no consta aprovat en la data d’aquesta revisió. En particular, no hi ha cap prohibició de pesca submarina derivada d’aquesta figura.',
  'La Orden AAA/1299/2014 se limita a aprobar la propuesta de inclusión de este espacio en la lista de lugares de importancia comunitaria: no regula la pesca recreativa ni las actividades subacuáticas, y el espacio no tiene todavía plan de gestión aprobado.':
    'L’Ordre AAA/1299/2014 es limita a aprovar la proposta d’inclusió d’aquest espai a la llista de llocs d’importància comunitària: no regula la pesca recreativa ni les activitats subaquàtiques, i l’espai encara no té pla de gestió aprovat.',

  // -- Permisos: vigència i notes --------------------------------------------
  '1 año': '1 any',
  'Hasta el 31 de diciembre del año de emisión': 'Fins al 31 de desembre de l’any d’emissió',
  'Gratuita. Exige licencia de pesca recreativa de embarcación en vigor y llevar registro de capturas; no presentarlo comporta la pérdida de la licencia. Prohibidas las competiciones en toda la reserva.':
    'Gratuïta. Exigeix llicència de pesca recreativa d’embarcació en vigor i dur registre de captures; no presentar-lo comporta la pèrdua de la llicència. Prohibides les competicions a tota la reserva.',
  'Gratuita. Exige licencia de pesca recreativa de embarcación en vigor y llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.':
    'Gratuïta. Exigeix llicència de pesca recreativa d’embarcació en vigor i dur registre de captures; no presentar-lo comporta la pèrdua de la llicència.',
  'Gratuita. Exige licencia de pesca recreativa en vigor y llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.':
    'Gratuïta. Exigeix llicència de pesca recreativa en vigor i dur registre de captures; no presentar-lo comporta la pèrdua de la llicència.',
  'Gratuita. Licencia específica que la Dirección General de Pesca entrega o renueva cada tres años (art. 6.2). Obliga a llevar registro de capturas.':
    'Gratuïta. Llicència específica que la Direcció General de Pesca lliura o renova cada tres anys (art. 6.2). Obliga a dur registre de captures.',
  'Autorización anual individual, que habilita también el resto de reservas marinas de Eivissa (Freus i Tagomago). Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo; el colectivo solo para centros y clubes de buceo. La consejería puede fijar por orden un número máximo de autorizaciones por reserva o por zonas.':
    'Autorització anual individual, que habilita també la resta de reserves marines d’Eivissa (Freus i Tagomago). Per a estades curtes hi ha autorització diària (5,24 €) i quinzenal (10,47 €). Permís individual o col·lectiu; el col·lectiu només per a centres i clubs de busseig. La conselleria pot fixar per ordre un nombre màxim d’autoritzacions per reserva o per zones.',
};
