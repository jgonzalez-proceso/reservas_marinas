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
  'Autorización anual individual, que habilita también la otra reserva marina de Menorca (l’Illa de l’Aire). Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo del órgano competente. En el cabo de Cavalleria las inmersiones están contingentadas por sectores.':
    'Autorització anual individual, que habilita també l’altra reserva marina de Menorca (l’Illa de l’Aire). Per a estades curtes hi ha autorització diària (5,24 €) i quinzenal (10,47 €). Permís individual o col·lectiu de l’òrgan competent. Al cap de Cavalleria les immersions estan contingentades per sectors.',
  'Autorización anual individual, que habilita también las demás reservas marinas de la misma isla. Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo; el colectivo solo para centros y clubes de buceo. Las inmersiones deben comunicarse a la Dirección General.':
    'Autorització anual individual, que habilita també la resta de reserves marines de la mateixa illa. Per a estades curtes hi ha autorització diària (5,24 €) i quinzenal (10,47 €). Permís individual o col·lectiu; el col·lectiu només per a centres i clubs de busseig. Les immersions s’han de comunicar a la Direcció General.',
  'Autorización anual individual, válida solo en la zona autonómica de la reserva. Habilita también el resto de reservas marinas de Mallorca, salvo las boyas de las zonas especiales de buceo del Toro y les Malgrats. Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo que entrega el órgano competente en la materia.':
    'Autorització anual individual, vàlida només a la zona autonòmica de la reserva. Habilita també la resta de reserves marines de Mallorca, llevat de les boies de les zones especials de busseig del Toro i les Malgrats. Per a estades curtes hi ha autorització diària (5,24 €) i quinzenal (10,47 €). Permís individual o col·lectiu que atorga l’òrgan competent en la matèria.',
  'Autorización anual individual. Con ella se puede bucear también en el resto de reservas marinas de Mallorca, salvo en las zonas especiales de buceo del Toro y les Malgrats. Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Exige título oficial de buceo recreativo y seguro de accidentes y responsabilidad civil en vigor. Los centros y clubes de buceo tramitan la modalidad colectiva.':
    'Autorització anual individual. Amb ella també es pot bussejar a la resta de reserves marines de Mallorca, llevat de les zones especials de busseig del Toro i les Malgrats. Per a estades curtes hi ha autorització diària (5,24 €) i quinzenal (10,47 €). Exigeix títol oficial de busseig recreatiu i assegurança d’accidents i responsabilitat civil en vigor. Els centres i clubs de busseig tramiten la modalitat col·lectiva.',
  'Autorización de la Dirección General de Recursos Pesqueros y Acuicultura (Secretaría General de Pesca), en las modalidades y condiciones del anexo 3 de la Orden APA/690/2018.':
    'Autorització de la Direcció General de Recursos Pesquers i Aqüicultura (Secretaria General de Pesca), en les modalitats i condicions de l’annex 3 de l’Ordre APA/690/2018.',
  'Autorización de la Dirección General de Recursos Pesqueros, sujeta a cupos de inmersiones y a las condiciones del anexo 3 de la Orden APA/690/2018.':
    'Autorització de la Direcció General de Recursos Pesquers, subjecta a quotes d’immersions i a les condicions de l’annex 3 de l’Ordre APA/690/2018.',
  'Autorización nominal, individual e intransferible del ámbito marino del parque. Exige licencia de pesca recreativa submarina en vigor y licencia federativa o, en su defecto, certificado médico y seguro adecuados. Requiere informe preceptivo de la Dirección General de Espacios Naturales y Biodiversidad; el plazo máximo de resolución es de 6 meses. No presentar el registro de capturas comporta la pérdida de la autorización.':
    'Autorització nominal, individual i intransferible de l’àmbit marí del parc. Exigeix llicència de pesca recreativa submarina en vigor i llicència federativa o, si no, certificat mèdic i assegurança adequats. Requereix informe preceptiu de la Direcció General d’Espais Naturals i Biodiversitat; el termini màxim de resolució és de 6 mesos. No presentar el registre de captures comporta la pèrdua de l’autorització.',
  'Arts. 2, 3, 5, 6 y 7. Rige las aguas exteriores (ámbito estatal)':
    'Arts. 2, 3, 5, 6 i 7. Regeix les aigües exteriors (àmbit estatal)',

  // -- s’Albufera des Grau: PORN, PRUG i el pla sectorial pendent -------------
  'El régimen específico de pesca de superficie del parque depende de un Plan Sectorial de aprovechamiento pesquero que el art. 47.2 del PORN ordena aprobar y que, en la fecha de esta revisión, no consta aprobado: el propio PRUG de 2021 se remite a él «una vez aprobado». Los límites que siguen son los criterios que el anexo II del PRUG fija para ese futuro plan.':
    'El règim específic de pesca de superfície del parc depèn d’un Pla Sectorial d’aprofitament pesquer que l’art. 47.2 del PORN ordena aprovar i que, en la data d’aquesta revisió, no consta aprovat: el mateix PRUG de 2021 s’hi remet «un cop aprovat». Els límits que segueixen són els criteris que l’annex II del PRUG fixa per a aquest futur pla.',
  'Criterio del anexo II del PRUG: la pesca desde embarcación con volantín, con caña o con curricán solo podría practicarse los martes, jueves, sábados, domingos y festivos.':
    'Criteri de l’annex II del PRUG: la pesca des d’embarcació amb volantí, amb canya o amb curricà només es podria practicar els dimarts, dijous, dissabtes, diumenges i festius.',
  'Criterio del anexo II del PRUG: prohibición de campeonatos de pesca y registro obligatorio de la actividad de las embarcaciones con licencia recreativa ante la Dirección General de Pesca.':
    'Criteri de l’annex II del PRUG: prohibició de campionats de pesca i registre obligatori de l’activitat de les embarcacions amb llicència recreativa davant la Direcció General de Pesca.',
  'Criterio del anexo II del PRUG: un ejemplar diario por pescador de las especies del anexo 2 del Decreto 41/2015, con la captura del gitano (Mycteroperca rubra) y el verrugato (Umbrina cirrosa) prohibida.':
    'Criteri de l’annex II del PRUG: un exemplar diari per pescador de les espècies de l’annex 2 del Decret 41/2015, amb la captura del gitano (Mycteroperca rubra) i el reig de roca (Umbrina cirrosa) prohibida.',
  'Criterio del anexo II del PRUG: zona de exclusión en el entorno de los islotes y la bahía d’Addaia, sin ningún tipo de pesca ni marisqueo, ni profesional ni recreativo.':
    'Criteri de l’annex II del PRUG: zona d’exclusió a l’entorn dels illots i la badia d’Addaia, sense cap tipus de pesca ni marisqueig, ni professional ni recreatiu.',
  'El apartado 6.2.1 del PRUG prohíbe la navegación, el baño y el buceo, además de cualquier otro uso que no sea científico o de gestión, en la zona de s’Estany d’Addaia.':
    'L’apartat 6.2.1 del PRUG prohibeix la navegació, el bany i el busseig, a més de qualsevol altre ús que no sigui científic o de gestió, a la zona de s’Estany d’Addaia.',
  'El apartado 6.2.2.5 del PRUG prohíbe el fondeo y la navegación de embarcaciones de cualquier tipo en la zona de exclusión marina.':
    'L’apartat 6.2.2.5 del PRUG prohibeix el fondeig i la navegació d’embarcacions de qualsevol tipus a la zona d’exclusió marina.',
  'El apartado 6.2.2.5 del PRUG prohíbe la navegación de embarcaciones de cualquier tipo en la zona de exclusión marina, y el 6.2.1 la prohíbe expresamente en s’Estany d’Addaia.':
    'L’apartat 6.2.2.5 del PRUG prohibeix la navegació d’embarcacions de qualsevol tipus a la zona d’exclusió marina, i el 6.2.1 la prohibeix expressament a s’Estany d’Addaia.',
  'Prohibida además cualquier modificación del fondo marino que pueda alterar la viabilidad de las fanerógamas (apartado 6.2.7).':
    'Prohibida a més qualsevol modificació del fons marí que pugui alterar la viabilitat de les fanerògames (apartat 6.2.7).',
  'Prohibida en todo caso cualquier pesca dentro de la zona de exclusión marina, que este mapa dibuja como figura aparte (art. 47.1 del PORN).':
    'Prohibida en tot cas qualsevol pesca dins la zona d’exclusió marina, que aquest mapa dibuixa com a figura a part (art. 47.1 del PORN).',

  // -- ses Salines: PRUG, contradicció inclosa -------------------------------
  'El art. 93 del PRUG encarga a un plan sectorial de aprovechamientos pesqueros detallar las modalidades permitidas, las vedas y las capturas. Mientras no se apruebe rige el régimen transitorio del art. 94, que es el que se resume aquí.':
    'L’art. 93 del PRUG encarrega a un pla sectorial d’aprofitaments pesquers detallar les modalitats permeses, les vedes i les captures. Mentre no s’aprovi regeix el règim transitori de l’art. 94, que és el que es resumeix aquí.',
  'El art. 94.a prohíbe además cualquier pesca en el Estany Pudent (Formentera), que la cartografía oficial clasifica como ámbito terrestre y que por eso no está dibujado en este mapa.':
    'L’art. 94.a prohibeix a més qualsevol pesca a l’Estany Pudent (Formentera), que la cartografia oficial classifica com a àmbit terrestre i que per això no està dibuixat en aquest mapa.',
  'El art. 95 del PRUG remite, en todo lo que no prevé expresamente, al Decreto 63/1999 de la Reserva Marina dels Freus d’Eivissa i Formentera, y lo hace para todo el ámbito marino del parque. Este mapa dibuja la reserva como figura aparte: si el punto también cae dentro de ella, sus reglas se suman a estas.':
    'L’art. 95 del PRUG remet, en tot allò que no preveu expressament, al Decret 63/1999 de la Reserva Marina dels Freus d’Eivissa i Formentera, i ho fa per a tot l’àmbit marí del parc. Aquest mapa dibuixa la reserva com a figura a part: si el punt també hi cau dins, les seves regles se sumen a aquestes.',
  'Discrepancia documentada del propio PRUG: su art. 11.4.d prohíbe «en todo el ámbito marino la extracción de flora y fauna marina», mientras que el art. 94.b permite la pesca recreativa fuera de las áreas de protección estricta y el art. 94.c solo mantiene la prohibición para la flora. Aquí manda el capítulo de actividades pesqueras, que es el específico, y así lo aplica la información oficial del parque.':
    'Discrepància documentada del mateix PRUG: el seu art. 11.4.d prohibeix «a tot l’àmbit marí l’extracció de flora i fauna marina», mentre que l’art. 94.b permet la pesca recreativa fora de les àrees de protecció estricta i l’art. 94.c només manté la prohibició per a la flora. Aquí mana el capítol d’activitats pesqueres, que és l’específic, i així ho aplica la informació oficial del parc.',
  'Prohibida cualquier pesca en las áreas marinas de protección estricta, que este mapa dibuja como figura aparte (art. 94.a).':
    'Prohibida qualsevol pesca a les àrees marines de protecció estricta, que aquest mapa dibuixa com a figura a part (art. 94.a).',
  'Prohibida cualquier actividad que suponga una alteración significativa de los hábitats y las especies del parque (art. 4.1.c).':
    'Prohibida qualsevol activitat que suposi una alteració significativa dels hàbitats i les espècies del parc (art. 4.1.c).',

  // -- Serra de Tramuntana: PORN ----------------------------------------------
  'El art. 81.3 del PORN prohíbe la captura o recolección de la nacra (Pinna nobilis); el art. 81.2 hace autorizable la captura de cigarra de mar (Scyllarides latus). El art. 78 prohíbe además, a la flota profesional, el arrastre, el cerco y el palangre de superficie.':
    'L’art. 81.3 del PORN prohibeix la captura o recol·lecció de la nacra (Pinna nobilis); l’art. 81.2 fa autoritzable la captura d’esclata-sang de mar (Scyllarides latus). L’art. 78 prohibeix a més, a la flota professional, l’arrossegament, el cèrcol i el palangre de superfície.',

  // -- Llevant: reserva integral i règim estatal -----------------------------
  'Prohibida cualquier pesca marítima en el área de reserva integral (art. 40.1.j).':
    'Prohibida qualsevol pesca marítima a l’àrea de reserva integral (art. 40.1.j).',
  'En la zona de reserva integral se prohíben la pesca marítima y las actividades extractivas de flora y fauna, sin excepción para la pesca recreativa.':
    'A la zona de reserva integral es prohibeixen la pesca marítima i les activitats extractives de flora i fauna, sense excepció per a la pesca recreativa.',
  'No permitida en la reserva integral entre cap Ferrutx y la Penya des Llamp.':
    'No permesa a la reserva integral entre cap Ferrutx i la Penya des Llamp.',
  'No está permitido bucear en la zona de reserva marina integral.':
    'No és permès bussejar a la zona de reserva marina integral.',
  'Las tres prohibiciones anteriores no se aplican a las inmersiones dentro de Cala Lliteras y Cala Gat.':
    'Les tres prohibicions anteriors no s’apliquen a les immersions dins Cala Lliteras i Cala Gat.',
  'La regulación de la reserva prohíbe la pesca submarina en todo su ámbito, y va más lejos que la mera prohibición de la actividad: también prohíbe portar fusiles de pesca submarina a quien solo navegue por sus aguas o circule por la franja de costa inmediata.':
    'La regulació de la reserva prohibeix la pesca submarina a tot el seu àmbit, i va més enllà de la simple prohibició de l’activitat: també prohibeix portar fusells de pesca submarina a qui només navegui per les seves aigües o circuli per la franja de costa immediata.',

  // -- Zones de veda ----------------------------------------------------------
  'La Resolución de 16 de febrero de 2024 mantiene aquí la zona de veda para la pesca recreativa desde embarcación y desde tierra, al amparo del art. 4.2 de la Orden de 15 de junio de 1999.':
    'La Resolució de 16 de febrer de 2024 hi manté la zona de veda per a la pesca recreativa des d’embarcació i des de terra, a l’empara de l’art. 4.2 de l’Ordre de 15 de juny de 1999.',
  'La Resolución de 19 de febrero de 2009 declara esta zona vedada expresamente «para la pesca recreativa desde tierra y embarcación», por un período de 5 años. La Resolución de 15 de mayo de 2024 prorroga la veda otros 5 años.':
    'La Resolució de 19 de febrer de 2009 declara aquesta zona vedada expressament «per a la pesca recreativa des de terra i embarcació», per un període de 5 anys. La Resolució de 15 de maig de 2024 prorroga la veda 5 anys més.',
  'La Resolución de 4 de diciembre de 2023 declara esta zona vedada «para la pesca recreativa desde tierra o desde embarcación» por un periodo de tres años.':
    'La Resolució de 4 de desembre de 2023 declara aquesta zona vedada «per a la pesca recreativa des de terra o des d’embarcació» per un període de tres anys.',
  'La resolución que crea esta zona de veda regula únicamente la pesca recreativa; no menciona la navegación.':
    'La resolució que crea aquesta zona de veda regula únicament la pesca recreativa; no esmenta la navegació.',
  'La veda es trienal y se renueva: el art. 3.2.a del Decreto 63/1999 obliga a que cubra al menos el 35 % del perímetro o de la superficie de la reserva, así que la zona puede cambiar de sitio en la siguiente resolución.':
    'La veda és triennal i es renova: l’art. 3.2.a del Decret 63/1999 obliga que cobreixi almenys el 35 % del perímetre o de la superfície de la reserva, així que la zona pot canviar de lloc a la resolució següent.',
  'La veda es trienal y se renueva: la zona puede cambiar de sitio en la siguiente resolución.':
    'La veda és triennal i es renova: la zona pot canviar de lloc a la resolució següent.',
  'No permitida en la zona de protección máxima de s’Espardell ni en la zona de veda.':
    'No permesa a la zona de protecció màxima de s’Espardell ni a la zona de veda.',
  'No permitida en las zonas de protección especial ni en la zona de veda de pesca recreativa.':
    'No permesa a les zones de protecció especial ni a la zona de veda de pesca recreativa.',
  'La pesca recreativa no está permitida en el área de protección especial.':
    'La pesca recreativa no és permesa a l’àrea de protecció especial.',
  'La pesca recreativa se puede practicar en la reserva «excepto en las zonas de protección especial y en la de veda para la pesca recreativa».':
    'La pesca recreativa es pot practicar a la reserva «excepte a les zones de protecció especial i a la de veda per a la pesca recreativa».',

  // -- Captures, espècies i ormeigs -------------------------------------------
  'Captura prohibida del gitano (Mycteroperca rubra), el abadejo (Epinephelus costae), la cherna (Epinephelus caninus) y el verrugato (Umbrina cirrosa).':
    'Captura prohibida del gitano (Mycteroperca rubra), l’anfós llis (Epinephelus costae), l’anfós de fang (Epinephelus caninus) i el reig de roca (Umbrina cirrosa).',
  'Máximo un ejemplar al día y por pescador de lubina, corvallo, mero, cherne de ley, bodión verde, merlo, sargo breado, dorada, pez de San Pedro, dentón y cabracho.':
    'Màxim un exemplar al dia i per pescador de llobarro, corball, anfós, xerna, tord massot, tord roquer, sarg reial, orada, gall de Sant Pere, déntol i escórpora.',
  'Prohibida absolutamente la captura recreativa de invertebrados marinos, salvo cefalópodos.':
    'Prohibida absolutament la captura recreativa d’invertebrats marins, llevat de cefalòpodes.',
  'Permitida también la recolecta de puu.': 'Permesa també la recol·lecció de puu.',
  'Permitido también el spinning.': 'Permès també l’spinning.',
  'Los aparejos tradicionales requieren autorización específica.':
    'Els ormeigs tradicionals requereixen autorització específica.',
  'Solo se exceptúan el marisqueo profesional con nasa para pulpos en la temporada de la bahía de Palma y la toma de muestras con fines científicos.':
    'Només se n’exceptuen el marisqueig professional amb nansa per a pops en la temporada de la badia de Palma i la presa de mostres amb finalitats científiques.',
  'Prohibida cualquier modalidad de pesca, recreativa o profesional, y cualquier extracción.':
    'Prohibida qualsevol modalitat de pesca, recreativa o professional, i qualsevol extracció.',
  'Días hábiles: lunes, martes, sábados, domingos y festivos.':
    'Dies hàbils: dilluns, dimarts, dissabtes, diumenges i festius.',
  'Días hábiles: martes, viernes, sábados, domingos y festivos.':
    'Dies hàbils: dimarts, divendres, dissabtes, diumenges i festius.',
  'Días hábiles: martes, jueves, sábados, domingos y festivos nacionales, autonómicos e insulares.':
    'Dies hàbils: dimarts, dijous, dissabtes, diumenges i festius nacionals, autonòmics i insulars.',

  // -- Busseig: comunicacions i apnea -----------------------------------------
  'Las inmersiones deben comunicarse a la Dirección General a efectos de seguimiento (art. 9.3).':
    'Les immersions s’han de comunicar a la Direcció General a efectes de seguiment (art. 9.3).',
  'Las inmersiones en apnea (snorkel) no necesitan autorización previa (art. 9.7 del Decret 41/2015).':
    'Les immersions en apnea (snorkel) no necessiten autorització prèvia (art. 9.7 del Decret 41/2015).',
  'Las inmersiones en apnea son libres en toda la reserva.':
    'Les immersions en apnea són lliures a tota la reserva.',
  'Las inmersiones en apnea son libres y no necesitan permiso.':
    'Les immersions en apnea són lliures i no necessiten permís.',
  'Permitido con permiso individual o colectivo, sin inmersiones nocturnas individuales.':
    'Permès amb permís individual o col·lectiu, sense immersions nocturnes individuals.',

  // -- Espècies vedades i ormeigs prohibits ----------------------------------
  'Prohibida la extracción de erizos de mar, cangrejo moruno (Eriphia verrucosa) y bogavante (Homarus gammarus) hasta que los informes científicos muestren recuperación de sus poblaciones.':
    'Prohibida l’extracció de garotes, cranc pelut (Eriphia verrucosa) i llagosta americana (Homarus gammarus) fins que els informes científics mostrin recuperació de les seves poblacions.',
  'Prohibida la extracción de erizos de mar, cangrejo moruno (Eriphia verrucosa) y bogavante (Homarus gammarus).':
    'Prohibida l’extracció de garotes, cranc pelut (Eriphia verrucosa) i llagosta americana (Homarus gammarus).',
  'Prohibidas en todo el parque la extracción de coral rojo (Corallium rubrum), la de las especies del anexo del Decreto 63/1999 y la de flora marina, salvo toma de muestras científicas expresamente autorizada (art. 94.c).':
    'Prohibides a tot el parc l’extracció de corall vermell (Corallium rubrum), la de les espècies de l’annex del Decret 63/1999 i la de flora marina, llevat de presa de mostres científiques expressament autoritzada (art. 94.c).',
  'Prohibido el uso de pez vivo como cebo.': 'Prohibit l’ús de peix viu com a esquer.',
  'Prohibido pescar utilizando pez vivo como cebo.':
    'Prohibit pescar utilitzant peix viu com a esquer.',
  'Prohibidos los señuelos artificiales tipo rapala o cucharilla.':
    'Prohibits els enganys artificials tipus rapala o cullereta.',
  'Prohibidos el spinning, el jigging y cualquier modalidad no autorizada expresamente.':
    'Prohibits l’spinning, el jigging i qualsevol modalitat no autoritzada expressament.',
  'Prohibidos el spinning, el jigging, los campeonatos y cualquier modalidad no autorizada expresamente.':
    'Prohibits l’spinning, el jigging, els campionats i qualsevol modalitat no autoritzada expressament.',
  'Prohibidos en todo el parque los concursos de pesca, la pesca de arrastre, la de cerco y el palangre de superficie (art. 94.c).':
    'Prohibits a tot el parc els concursos de pesca, la pesca d’arrossegament, la de cèrcol i el palangre de superfície (art. 94.c).',
  'Prohibidas las competiciones de pesca deportiva en todo el ámbito marino del parque (art. 40.1.g).':
    'Prohibides les competicions de pesca esportiva a tot l’àmbit marí del parc (art. 40.1.g).',
  'Anzuelo de un mínimo de 7 mm de anchura interior (seno) en todas las modalidades, salvo para el raor.':
    'Ham d’un mínim de 7 mm d’amplada interior (si) en totes les modalitats, llevat del raor.',
  'Anzuelo de un mínimo de 7 mm de anchura interior (seno), salvo para el raor.':
    'Ham d’un mínim de 7 mm d’amplada interior (si), llevat del raor.',
  'Aparejos permitidos: curricán de fondo, fluixa, potera para cefalópodos (máximo una línea con dos poteras por pescador), volantín o caña con o sin carrete (máximo una línea por persona y cuatro anzuelos) y el salabre para subir las capturas.':
    'Ormeigs permesos: curricà de fons, fluixa, poteres per a cefalòpodes (màxim una línia amb dues poteres per pescador), volantí o canya amb rodet o sense (màxim una línia per persona i quatre hams) i el salabre per pujar les captures.',
  'Los aparejos tradicionales requieren autorización específica.':
    'Els ormeigs tradicionals requereixen autorització específica.',

  // -- Pesca des dels illots i règims transitoris ----------------------------
  'Prohibida la pesca desde los islotes.': 'Prohibida la pesca des dels illots.',
  'Prohibida toda clase de pesca marítima y de marisqueo desde la propia Illa de l’Aire (art. 3.1.c del Decreto 26/2019).':
    'Prohibida tota classe de pesca marítima i de marisqueig des de la mateixa Illa de l’Aire (art. 3.1.c del Decret 26/2019).',
  'Queda prohibida toda clase de pesca marítima y de extracción, y la pesca submarina no figura entre las excepciones.':
    'Queda prohibida tota classe de pesca marítima i d’extracció, i la pesca submarina no figura entre les excepcions.',
  'Régimen transitorio: rige hasta que la Consejería regule la actividad pesquera por orden, con un plazo máximo de 24 meses desde la entrada en vigor del decreto (6 de julio de 2025). Si vence sin orden, se aplica el régimen general de las aguas interiores.':
    'Règim transitori: regeix fins que la Conselleria reguli l’activitat pesquera per ordre, amb un termini màxim de 24 mesos des de l’entrada en vigor del decret (6 de juliol de 2025). Si venç sense ordre, s’aplica el règim general de les aigües interiors.',
  'Solo del 1 de enero al 30 de abril.': 'Només de l’1 de gener al 30 d’abril.',
  'Solo se puede pescar los miércoles, los fines de semana y los días festivos.':
    'Només es pot pescar els dimecres, els caps de setmana i els dies festius.',
  'Solo se admite el uso científico o de gestión.':
    'Només s’admet l’ús científic o de gestió.',

  // -- Busseig, bany i motos aquàtiques --------------------------------------
  'Prohibidas las inmersiones en el interior de cuevas submarinas.':
    'Prohibides les immersions a l’interior de coves submarines.',
  'Prohibido el uso de motos de agua.': 'Prohibit l’ús de motos aquàtiques.',
  'Prohibido también el baño.': 'Prohibit també el bany.',
  'Prohibido llevar cualquier instrumento utilizable para la pesca o la extracción, salvo el cuchillo de seguridad.':
    'Prohibit dur qualsevol instrument utilitzable per a la pesca o l’extracció, llevat del ganivet de seguretat.',
  'Prohibido llevar, en la inmersión o en la embarcación, cualquier instrumento o aparejo que se pueda emplear para la pesca o la extracción de especies marinas.':
    'Prohibit dur, a la immersió o a l’embarcació, qualsevol instrument o ormeig que es pugui emprar per a la pesca o l’extracció d’espècies marines.',

  // -- Fondeig i navegació ----------------------------------------------------
  'Prohibido fondear en las zonas de baño balizadas y sobre yacimientos arqueológicos.':
    'Prohibit fondejar a les zones de bany abalisades i sobre jaciments arqueològics.',
  'Prohibido fondear sobre Posidonia oceanica, Cymodocea nodosa y fondos de maërl o coralígeno. Si la cartografía y lo que se ve desde la embarcación no coinciden, manda lo que se ve.':
    'Prohibit fondejar sobre Posidonia oceanica, Cymodocea nodosa i fons de maërl o coral·ligen. Si la cartografia i el que es veu des de l’embarcació no coincideixen, mana el que es veu.',
  'Prohibido también en zonas de arena próximas si la cadena, el ancla u otros elementos del fondeo afectan a la pradera (RD 191/2026).':
    'Prohibit també en zones d’arena properes si la cadena, l’àncora o altres elements del fondeig afecten la prada (RD 191/2026).',
  'Rige además el Real Decreto 191/2026 en todo el Mediterráneo español.':
    'Regeix a més el Reial Decret 191/2026 a tot el Mediterrani espanyol.',
  'Velocidad de tránsito: superior a 3 nudos e inferior a 6, salvo emergencia, vigilancia, defensa nacional u orden público.':
    'Velocitat de trànsit: superior a 3 nusos i inferior a 6, llevat d’emergència, vigilància, defensa nacional o ordre públic.',
  'Ante la observación de cetáceos hay que actuar conforme al Real Decreto 1727/2007 de medidas de protección de los cetáceos (art. 41.1).':
    'Davant l’observació de cetacis cal actuar d’acord amb el Reial Decret 1727/2007 de mesures de protecció dels cetacis (art. 41.1).',

  // -- Resums de zona: superfícies i què hi mana -----------------------------
  '1.044,8 ha en la mitad sur del ámbito marino del parque, desde Es Grau hasta la illa d’en Colom, donde la pesca submarina es autorizable: con la autorización específica del parque y la licencia de pesca submarina en vigor, y solo los miércoles, fines de semana y festivos.':
    '1.044,8 ha a la meitat sud de l’àmbit marí del parc, des d’Es Grau fins a la illa d’en Colom, on la pesca submarina és autoritzable: amb l’autorització específica del parc i la llicència de pesca submarina en vigor, i només els dimecres, caps de setmana i festius.',
  '1.272 ha del ámbito marino del parque, la categoría mayoritaria. Corresponden a las áreas marinas de conservación predominante del PORN: fondos con comunidades de fanerógamas donde el fondeo está regulado o prohibido. La categoría en sí no prohíbe pescar; eso lo dicen el PORN, el PRUG y la capa de pesca submarina.':
    '1.272 ha de l’àmbit marí del parc, la categoria majoritària. Corresponen a les àrees marines de conservació predominant del PORN: fons amb comunitats de fanerògames on el fondeig està regulat o prohibit. La categoria en si no prohibeix pescar; això ho diuen el PORN, el PRUG i la capa de pesca submarina.',
  '13.165 ha: la mayor parte del ámbito marino del parque, como dice el propio art. 14.1 del PRUG. Categoría de zonificación, sin régimen de usos propio: manda el régimen general del parque y, para el fondeo, la capa de regulación del fondeo.':
    '13.165 ha: la major part de l’àmbit marí del parc, com diu el mateix art. 14.1 del PRUG. Categoria de zonificació, sense règim d’usos propi: mana el règim general del parc i, per al fondeig, la capa de regulació del fondeig.',
  '13.531 ha: todo el ámbito marino del parque que no es zona de fondeo prohibido ni regulado, más s’Estany des Peix. «Libre» no quiere decir en cualquier sitio: el ancla solo puede fijarse sobre arena y nunca sobre posidonia, y el responsable de comprobarlo es el patrón.':
    '13.531 ha: tot l’àmbit marí del parc que no és zona de fondeig prohibit ni regulat, més s’Estany des Peix. «Lliure» no vol dir a qualsevol lloc: l’àncora només es pot fixar sobre arena i mai sobre posidònia, i el responsable de comprovar-ho és el patró.',
  '154,1 ha en la zona marina de s’Espardell. Categoría de zonificación del PRUG: no impone por sí misma ninguna restricción de pesca ni de buceo, que vienen del régimen general del parque.':
    '154,1 ha a la zona marina de s’Espardell. Categoria de zonificació del PRUG: no imposa per si mateixa cap restricció de pesca ni de busseig, que vénen del règim general del parc.',
  '344,6 ha en cuatro sectores: sa Torreta, Illetes - s’Alga, es Caló de s’Oli y s’Estany des Peix. Categoría de zonificación sin régimen de usos propio; el fondeo de s’Estany des Peix tiene sí su regulación específica, en la capa de regulación del fondeo.':
    '344,6 ha en quatre sectors: sa Torreta, Illetes - s’Alga, es Caló de s’Oli i s’Estany des Peix. Categoria de zonificació sense règim d’usos propi; el fondeig de s’Estany des Peix sí que té la seva regulació específica, a la capa de regulació del fondeig.',
  '36 hectáreas alrededor de los islotes dels Calafats, entre la punta des Lledó y la punta de cala en Regau, dentro de la reserva autonómica. Prohibida toda clase de pesca y extracción, salvo muestreo científico y dos artes profesionales concretas.':
    '36 hectàrees al voltant dels illots dels Calafats, entre la punta des Lledó i la punta de cala en Regau, dins la reserva autonòmica. Prohibida tota classe de pesca i extracció, llevat de mostreig científic i dues arts professionals concretes.',
  '39,3 ha de lámina de agua clasificadas como uso portuario dentro del parque. La categoría no regula por sí misma la pesca ni el buceo; sobre estas aguas manda además la normativa portuaria, que este mapa no carga.':
    '39,3 ha de làmina d’aigua classificades com a ús portuari dins el parc. La categoria no regula per si mateixa la pesca ni el busseig; sobre aquestes aigües mana a més la normativa portuària, que aquest mapa no carrega.',
  '427,4 ha en cuatro polígonos —la zona marina de s’Espardell, es Caló de s’Oli y Punta Alta norte y sur— donde el PRUG prohíbe cualquier pesca, cualquier fondeo y las inmersiones recreativas. Es el núcleo más protegido del ámbito marino del parque.':
    '427,4 ha en quatre polígons —la zona marina de s’Espardell, es Caló de s’Oli i Punta Alta nord i sud— on el PRUG prohibeix qualsevol pesca, qualsevol fondeig i les immersions recreatives. És el nucli més protegit de l’àmbit marí del parc.',
  '451,2 ha en seis polígonos: las áreas marinas de protección estricta, el sector marino del Caló de s’Oli en Formentera y el sector más meridional de la cala de sa Torreta, en s’Espalmador. Aquí no se puede fondear de ninguna manera.':
    '451,2 ha en sis polígons: les àrees marines de protecció estricta, el sector marí del Caló de s’Oli a Formentera i el sector més meridional de la cala de sa Torreta, a s’Espalmador. Aquí no s’hi pot fondejar de cap manera.',
  '454 ha alrededor de la isla, la mayor parte de la reserva. Aquí el art. 3.3 del Decreto 26/2019 prohíbe toda pesca y extracción salvo una excepción: la caña desde tierra. Desde embarcación no se puede pescar.':
    '454 ha al voltant de l’illa, la major part de la reserva. Aquí l’art. 3.3 del Decret 26/2019 prohibeix tota pesca i extracció llevat d’una excepció: la canya des de terra. Des d’embarcació no s’hi pot pescar.',
  '468,8 ha del ámbito marino del parque que el PRUG considera compatibles con cierto grado de aprovechamiento. Es la categoría menos restrictiva de la zonificación marina y no añade nada por sí misma: rige el régimen general del parque.':
    '468,8 ha de l’àmbit marí del parc que el PRUG considera compatibles amb un cert grau d’aprofitament. És la categoria menys restrictiva de la zonificació marina i no hi afegeix res per si mateixa: regeix el règim general del parc.',
  '69,3 ha en tres campos de boyas de bajo impacto: la bahía de s’Alga en s’Espalmador, la parte sur e interna del Caló de s’Oli en Formentera y la playa de ses Salines en Eivissa. Hay que amarrar a la boya; no se puede echar el ancla.':
    '69,3 ha en tres camps de boies de baix impacte: la badia de s’Alga a s’Espalmador, la part sud i interna del Caló de s’Oli a Formentera i la platja de ses Salines a Eivissa. Cal amarrar a la boia; no s’hi pot llançar l’àncora.',
  '705,8 ha en la mitad norte del ámbito marino del parque —el entorno de los cabos de Favàritx y Mossenyor Vives y la bahía d’Addaia— donde la pesca submarina está prohibida. La autorización del parque no habilita a pescar aquí. Esta capa solo regula la pesca submarina: el resto de actividades se rigen por el régimen del parque.':
    '705,8 ha a la meitat nord de l’àmbit marí del parc —l’entorn dels caps de Favàritx i Mossenyor Vives i la badia d’Addaia— on la pesca submarina està prohibida. L’autorització del parc no habilita a pescar-hi. Aquesta capa només regula la pesca submarina: la resta d’activitats es regeixen pel règim del parc.',
  'Ámbito marino de 15.390 ha entre Eivissa y Formentera, el 85 % del parque. La pesca submarina está prohibida en todo él, esté o no el punto dentro de la Reserva Marina dels Freus. El fondeo tiene tres regímenes cartografiados y el buceo deportivo necesita autorización del órgano gestor.':
    'Àmbit marí de 15.390 ha entre Eivissa i Formentera, el 85 % del parc. La pesca submarina hi és prohibida arreu, sigui o no el punt dins la Reserva Marina dels Freus. El fondeig té tres règims cartografiats i el busseig esportiu necessita autorització de l’òrgan gestor.',
  'Ámbito marino de 17,4 km² del parque natural, en la costa nordeste de Menorca, entre Addaia y el sur de la illa d’en Colom. La pesca submarina no está prohibida en todo él: hace falta una autorización propia del parque, y hay 705,8 ha del norte —el entorno de Favàritx, Mossenyor Vives y Addaia— donde está prohibida sin más. El régimen de la pesca de superficie sigue pendiente del Plan Sectorial de aprovechamiento pesquero, que no consta aprobado.':
    'Àmbit marí de 17,4 km² del parc natural, a la costa nord-est de Menorca, entre Addaia i el sud de la illa d’en Colom. La pesca submarina no hi és prohibida arreu: cal una autorització pròpia del parc, i hi ha 705,8 ha del nord —l’entorn de Favàritx, Mossenyor Vives i Addaia— on és prohibida sense més. El règim de la pesca de superfície continua pendent del Pla Sectorial d’aprofitament pesquer, que no consta aprovat.',
  'Ámbito marino de 2.326 ha del parque natural, frente a es Trenc, es Salobrar de Campos y ses Salines de sa Colònia de Sant Jordi. La pesca submarina está prohibida en todo él por el art. 4.1.c de la Ley 2/2017 de declaración, sin depender de ningún plan posterior.':
    'Àmbit marí de 2.326 ha del parc natural, davant es Trenc, es Salobrar de Campos i ses Salines de sa Colònia de Sant Jordi. La pesca submarina hi és prohibida arreu per l’art. 4.1.c de la Llei 2/2017 de declaració, sense dependre de cap pla posterior.',
  'Ámbito marino de 6.192 ha del parque natural, desde el cap des Freu hasta la badia d’Alcúdia. Es más extenso que la Reserva Marina del Llevant: hay mar dentro del parque y fuera de la reserva. La pesca recreativa submarina está prohibida en todo él por el art. 40.1.h del PORN, con independencia de la reserva.':
    'Àmbit marí de 6.192 ha del parc natural, des del cap des Freu fins a la badia d’Alcúdia. És més extens que la Reserva Marina del Llevant: hi ha mar dins el parc i fora de la reserva. La pesca recreativa submarina hi és prohibida arreu per l’art. 40.1.h del PORN, amb independència de la reserva.',
  'Ámbito marino de las reservas naturales declaradas por el Decret 51/2003, un único polígono de 9,8 ha en el interior del port d’Addaia. Es el punto más protegido de todo el parque: ni pesca, ni fondeo, ni navegación, ni buceo, ni baño. El PRUG lo recoge como zona de exclusión marina, con una geometría prácticamente coincidente que este mapa dibuja aparte.':
    'Àmbit marí de les reserves naturals declarades pel Decret 51/2003, un únic polígon de 9,8 ha a l’interior del port d’Addaia. És el punt més protegit de tot el parc: ni pesca, ni fondeig, ni navegació, ni busseig, ni bany. El PRUG el recull com a zona d’exclusió marina, amb una geometria pràcticament coincident que aquest mapa dibuixa a part.',
  'Ámbito marino del parque nacional, 895 km². La pesca recreativa está prohibida en todas sus modalidades, incluida la submarina; la única actividad extractiva admitida es la pesca artesanal tradicional profesional de los barcos censados. Navegar, fondear y bucear exigen autorización previa del parque.':
    'Àmbit marí del parc nacional, 895 km². La pesca recreativa hi és prohibida en totes les modalitats, inclosa la submarina; l’única activitat extractiva admesa és la pesca artesanal tradicional professional de les barques censades. Navegar, fondejar i bussejar exigeixen autorització prèvia del parc.',
  'Aguas exteriores frente al cabo Ferrutx. Únicamente se permiten actividades científicas expresamente autorizadas por la Secretaría General de Pesca.':
    'Aigües exteriors davant el cap Ferrutx. Únicament s’hi permeten activitats científiques expressament autoritzades per la Secretaria General de Pesca.',
  'Aguas exteriores, competencia del Estado. La pesca desde tierra con caña al volantín y la recolecta de puu no necesitan autorización; la pesca desde embarcación y el buceo autónomo sí. La pesca submarina, el jigging, el spinning y los concursos de pesca están expresamente prohibidos.':
    'Aigües exteriors, competència de l’Estat. La pesca des de terra amb canya al volantí i la recol·lecció de puu no necessiten autorització; la pesca des d’embarcació i el busseig autònom sí. La pesca submarina, el jigging, l’spinning i els concursos de pesca hi són expressament prohibits.',
  'Aguas exteriores, competencia del Estado. Solo se permite lo que la Orden APA/1024/2020 enumera expresamente: pesca profesional de artes menores, pesca recreativa desde embarcación y actividades científicas o didácticas, todas con autorización. Lo demás está prohibido, incluidos la pesca desde tierra, la pesca submarina y el fondeo.':
    'Aigües exteriors, competència de l’Estat. Només s’hi permet el que l’Ordre APA/1024/2020 enumera expressament: pesca professional d’arts menors, pesca recreativa des d’embarcació i activitats científiques o didàctiques, totes amb autorització. La resta hi és prohibit, inclosos la pesca des de terra, la pesca submarina i el fondeig.',
  'Aguas interiores del Freu de sa Dragonera, competencia del Govern. La pesca recreativa está permitida con límites de aparejo, salvo desde la costa de la isla y sus islotes. La pesca profesional de artes menores queda reservada a la cofradía de Andratx y a quien acredite habitualidad en la zona.':
    'Aigües interiors del Freu de sa Dragonera, competència del Govern. La pesca recreativa hi és permesa amb límits d’ormeig, llevat des de la costa de l’illa i els seus illots. La pesca professional d’arts menors queda reservada a la confraria d’Andratx i a qui acrediti habitualitat a la zona.',
  'Aguas interiores, competencia del Govern. La pesca y el marisqueo recreativos están permitidos determinados días de la semana, salvo en la reserva integral entre cap Ferrutx y la Penya des Llamp. El esparavel, el salabre y el curricán de fondo solo se permiten en este ámbito, no en el estatal.':
    'Aigües interiors, competència del Govern. La pesca i el marisqueig recreatius hi són permesos determinats dies de la setmana, llevat de la reserva integral entre cap Ferrutx i la Penya des Llamp. L’esparver, el salabre i el curricà de fons només es permeten en aquest àmbit, no a l’estatal.',
  'Alrededor de les Illes Malgrats y dels Conills. La pesca recreativa está permitida solo en ventanas estacionales concretas y nunca desde los islotes.':
    'Al voltant de les Illes Malgrats i dels Conills. La pesca recreativa hi és permesa només en finestres estacionals concretes i mai des dels illots.',
  'Actividades que se tienen que autorizar previamente (proyectos de investigación, buceo deportivo, filmaciones) y actividades incompatibles (motos acuáticas, pesca submarina, baño en la laguna de s’Espalmador, desembarco en los islotes). Permiso diario o anual para el buceo con botella y para pernoctar fondeado':
    'Activitats que s’han d’autoritzar prèviament (projectes de recerca, busseig esportiu, filmacions) i activitats incompatibles (motos aquàtiques, pesca submarina, bany a la llacuna de s’Espalmador, desembarcament als illots). Permís diari o anual per al busseig amb ampolla i per pernoctar fondejat',
  'Anual': 'Anual',
  '1 año (hay también diaria y quincenal). El permiso colectivo va por año natural, del 1 de enero al 31 de diciembre.':
    '1 any (n’hi ha també de diària i quinzenal). El permís col·lectiu va per any natural, de l’1 de gener al 31 de desembre.',

  // -- Ormeigs permesos per reserva ------------------------------------------
  'Aparejos permitidos: curricán de fondo, fluixa, potera, volantín o caña.':
    'Ormeigs permesos: curricà de fons, fluixa, poteres, volantí o canya.',
  'Aparejos permitidos: el curricán de superficie, con un máximo de dos líneas por embarcación; la potera para cefalópodos, máximo una línea con dos poteras por pescador; la caña o el volantín, máximo una línea por pescador y cuatro anzuelos.':
    'Ormeigs permesos: el curricà de superfície, amb un màxim de dues línies per embarcació; les poteres per a cefalòpodes, màxim una línia amb dues poteres per pescador; la canya o el volantí, màxim una línia per pescador i quatre hams.',
  'Aparejos permitidos: la caña, con o sin carrete; la potera para cefalópodos, máximo una por persona; el volantín, con un máximo de 6 anzuelos de más de 7 mm; la fisga; el salabre y los aparejos específicos para la captura de puu (baveró, cuerda, bou y estaca).':
    'Ormeigs permesos: la canya, amb rodet o sense; les poteres per a cefalòpodes, màxim una per persona; el volantí, amb un màxim de 6 hams de més de 7 mm; el fitó; el salabre i els ormeigs específics per a la captura de puu (baveró, corda, bou i estaca).',
  'Aparejos permitidos: volantín o caña (con o sin carrete) con un máximo de 6 anzuelos, potera, fisga (solo pesca diurna) y salabre.':
    'Ormeigs permesos: volantí o canya (amb rodet o sense) amb un màxim de 6 hams, poteres, fitó (només pesca diürna) i salabre.',
  'Aparejos permitidos: volantín o caña (con o sin carrete), con un máximo de una línea por persona y 6 anzuelos; el spinning; la potera para cefalópodos, máximo una por persona; la fisga (solo de día) y el salabre.':
    'Ormeigs permesos: volantí o canya (amb rodet o sense), amb un màxim d’una línia per persona i 6 hams; l’spinning; les poteres per a cefalòpodes, màxim una per persona; el fitó (només de dia) i el salabre.',
  'Aparejos permitidos: volantín y caña (un solo aparejo por pescador) con un máximo de 6 anzuelos desde tierra; la potera; la fisga, solo de día; el salabre; el curricán de superficie y de fondo.':
    'Ormeigs permesos: volantí i canya (un sol ormeig per pescador) amb un màxim de 6 hams des de terra; les poteres; el fitó, només de dia; el salabre; el curricà de superfície i de fons.',
  'Aparejos permitidos: volantín y caña, potera, fisga (solo de día), salabre y curricán de superficie y de fondo.':
    'Ormeigs permesos: volantí i canya, poteres, fitó (només de dia), salabre i curricà de superfície i de fons.',
  'Aparejos permitidos: volantín, potera y curricán de superficie (fluixa). Las líneas pueden ser manuales o con caña de carrete.':
    'Ormeigs permesos: volantí, poteres i curricà de superfície (fluixa). Les línies poden ser manuals o amb canya de rodet.',
  'Aparejos permitidos: volantín, potera y curricán de superficie; las líneas pueden ser manuales o con caña de carrete. Máximo dos líneas por embarcación para el curricán.':
    'Ormeigs permesos: volantí, poteres i curricà de superfície; les línies poden ser manuals o amb canya de rodet. Màxim dues línies per embarcació per al curricà.',

  // -- Busseig col·lectiu i autoritzacions per figura ------------------------
  'Buceo colectivo con escafandra: solo en los 4 puntos balizados que fija el anexo 4 del Decret 26/2025.':
    'Busseig col·lectiu amb escafandre: només als 4 punts abalisats que fixa l’annex 4 del Decret 26/2025.',
  'Buceo colectivo con escafandra: solo en los 6 puntos balizados que fija el anexo 3 del Decret 26/2025.':
    'Busseig col·lectiu amb escafandre: només als 6 punts abalisats que fixa l’annex 3 del Decret 26/2025.',
  'Autorización anual individual, que habilita también el resto de reservas marinas de Eivissa (Freus, ses Bledes i es Vedrà-Vedranell). Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo; el colectivo solo para centros y clubes de buceo. En las zonas incluidas en espacios Natura 2000 hay que cumplir además su plan de gestión.':
    'Autorització anual individual, que habilita també la resta de reserves marines d’Eivissa (Freus, ses Bledes i es Vedrà-Vedranell). Per a estades curtes hi ha autorització diària (5,24 €) i quinzenal (10,47 €). Permís individual o col·lectiu; el col·lectiu només per a centres i clubs de busseig. A les zones incloses en espais Natura 2000 cal complir a més el seu pla de gestió.',
  'Autorización anual individual, que habilita también el resto de reservas marinas de Mallorca, salvo las boyas de las zonas especiales de buceo del Toro y les Malgrats. Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Buceo colectivo (centros de buceo o clubes de inmersión): permiso con validez de un año natural, del 1 de enero al 31 de diciembre. Buceo individual (al margen de centros, sin ánimo de lucro): permiso nominal con la validez que fije la Dirección General de Pesca.':
    'Autorització anual individual, que habilita també la resta de reserves marines de Mallorca, llevat de les boies de les zones especials de busseig del Toro i les Malgrats. Per a estades curtes hi ha autorització diària (5,24 €) i quinzenal (10,47 €). Busseig col·lectiu (centres de busseig o clubs d’immersió): permís amb validesa d’un any natural, de l’1 de gener al 31 de desembre. Busseig individual (al marge de centres, sense ànim de lucre): permís nominal amb la validesa que fixi la Direcció General de Pesca.',
  'Autorización anual individual, que habilita también la otra reserva marina de Formentera (els Freus d’Eivissa i Formentera). Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo; el colectivo solo para centros y clubes de buceo.':
    'Autorització anual individual, que habilita també l’altra reserva marina de Formentera (els Freus d’Eivissa i Formentera). Per a estades curtes hi ha autorització diària (5,24 €) i quinzenal (10,47 €). Permís individual o col·lectiu; el col·lectiu només per a centres i clubs de busseig.',
  'Autorización anual individual, que habilita también la otra reserva marina de Menorca (el Nord de Menorca). Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo del órgano competente. El buceo colectivo se concentra en dos puntos balizados y las embarcaciones amarradas no pueden superar 12 m de eslora.':
    'Autorització anual individual, que habilita també l’altra reserva marina de Menorca (el Nord de Menorca). Per a estades curtes hi ha autorització diària (5,24 €) i quinzenal (10,47 €). Permís individual o col·lectiu de l’òrgan competent. El busseig col·lectiu es concentra en dos punts abalisats i les embarcacions amarrades no poden superar 12 m d’eslora.',
  'Autorización anual por espacio natural protegido. Exige licencia de pesca submarina en vigor y tarjeta federativa de actividades subacuáticas.':
    'Autorització anual per espai natural protegit. Exigeix llicència de pesca submarina en vigor i targeta federativa d’activitats subaquàtiques.',
  'Autorización de buceo del parque nacional. Exige acreditar el nivel de formación mínimo requerido.':
    'Autorització de busseig del parc nacional. Exigeix acreditar el nivell de formació mínim requerit.',
  'Autorización de fondeo o pernocta del parque nacional. Se solicita con un máximo de veinte días de antelación y un mínimo de dos, y hay que confirmarla el día de llegada antes de las 17.00 h.':
    'Autorització de fondeig o pernoctació del parc nacional. Se sol·licita amb un màxim de vint dies d’antelació i un mínim de dos, i cal confirmar-la el dia d’arribada abans de les 17.00 h.',
  'Autorización de navegación del parque nacional. En la solicitud constan los datos del patrón, del armador y de la embarcación.':
    'Autorització de navegació del parc nacional. A la sol·licitud hi consten les dades del patró, de l’armador i de l’embarcació.',
  'Autorización del espacio natural protegido, que se solicita por espacio y es anual.':
    'Autorització de l’espai natural protegit, que se sol·licita per espai i és anual.',
  'Autorización del órgano gestor del parque natural. La información oficial del espacio la exige para el buceo deportivo y ofrece permiso diario o anual. La Consejería determina en qué puntos se pueden hacer inmersiones colectivas y puede condicionarlas a instalar sistemas de amarre de bajo impacto.':
    'Autorització de l’òrgan gestor del parc natural. La informació oficial de l’espai l’exigeix per al busseig esportiu i ofereix permís diari o anual. La Conselleria determina en quins punts es poden fer immersions col·lectives i pot condicionar-les a instal·lar sistemes d’amarratge de baix impacte.',
  'Autorización específica anual de la Dirección General de Pesca Sostenible (Secretaría General de Pesca). Se solicita por registro electrónico o en cualquier registro público; la documentación exigida figura en el art. 10 de la Orden APA/1024/2020. El Govern indica que el trámite telemático está en preparación.':
    'Autorització específica anual de la Direcció General de Pesca Sostenible (Secretaria General de Pesca). Se sol·licita per registre electrònic o a qualsevol registre públic; la documentació exigida figura a l’art. 10 de l’Ordre APA/1024/2020. El Govern indica que el tràmit telemàtic és en preparació.',
  'Autorización específica para los aparejos tradicionales de Eivissa, única modalidad admitida desde tierra. La entrega la Dirección General de Pesca.':
    'Autorització específica per als ormeigs tradicionals d’Eivissa, única modalitat admesa des de terra. La lliura la Direcció General de Pesca.',

  // -- Advertències i casos dubtosos ------------------------------------------
  'Atención: el art. 4.1 del Decreto 38/2018 conserva la frase «Queda prohibida la pesca recreativa desde tierra», que el Decreto 15/2022 no derogó expresamente aunque admitiera el esparavel. La página oficial del Govern publica el esparavel como permitido desde tierra. Conviene confirmarlo con el Servicio de Recursos Marinos antes de pescar.':
    'Atenció: l’art. 4.1 del Decret 38/2018 conserva la frase «Queda prohibida la pesca recreativa des de terra», que el Decret 15/2022 no va derogar expressament encara que admetés l’esparver. La pàgina oficial del Govern publica l’esparver com a permès des de terra. Convé confirmar-ho amb el Servei de Recursos Marins abans de pescar.',
  'Bahía de Portocolom, con la pradera de posidonia catalogada como «regular». Es el espacio con más restricciones náuticas del plan: 3 nudos en toda la bahía, motos acuáticas prohibidas y ningún campo de fondeo nuevo.':
    'Badia de Portocolom, amb la prada de posidònia catalogada com a «regular». És l’espai amb més restriccions nàutiques del pla: 3 nusos a tota la badia, motos aquàtiques prohibides i cap camp de fondeig nou.',

  // -- Referències de font: on està escrit cada cosa -------------------------
  'Apartado 2.2 (usos prohibidos): jj) pesca deportiva en cualquier modalidad, ll) navegación, mm) buceo sin autorización, ii) apnea en mayo y junio. Apartado 2.3.2 (pesca profesional) y 2.3.3 (navegación y anclaje)':
    'Apartat 2.2 (usos prohibits): jj) pesca esportiva en qualsevol modalitat, ll) navegació, mm) busseig sense autorització, ii) apnea al maig i al juny. Apartat 2.3.2 (pesca professional) i 2.3.3 (navegació i ancoratge)',
  'Apartado 5.6 del plan: 5.6.1 fondeo, 5.6.3 instalaciones náuticas de temporada, 5.6.4 buceo y 5.6.5 pesca':
    'Apartat 5.6 del pla: 5.6.1 fondeig, 5.6.3 instal·lacions nàutiques de temporada, 5.6.4 busseig i 5.6.5 pesca',
  'Aprobado por el pleno del Consell el 24 de febrero de 2022. Reserva los amarres a embarcaciones que acrediten fondear en el enclave antes del 5 de julio de 2002, con eslora máxima de 10 m. Regula la asignación de amarres, no la geometría del fondeo':
    'Aprovat pel ple del Consell el 24 de febrer de 2022. Reserva els amarratges a embarcacions que acreditin fondejar a l’enclavament abans del 5 de juliol de 2002, amb eslora màxima de 10 m. Regula l’assignació d’amarratges, no la geometria del fondeig',
  'Art. 2, régimen de la reserva integral de cabo Ferrutx':
    'Art. 2, règim de la reserva integral de cap Ferrutx',
  'Art. 2, régimen jurídico dentro del área de protección especial':
    'Art. 2, règim jurídic dins l’àrea de protecció especial',
  'Art. 5, fondeo sobre Posidonia oceanica y Cymodocea nodosa':
    'Art. 5, fondeig sobre Posidonia oceanica i Cymodocea nodosa',
  'Art. 73, zonas de baño balizadas y franjas de 200 m en playas y 50 m en el resto de la costa':
    'Art. 73, zones de bany abalisades i franges de 200 m a les platges i 50 m a la resta de la costa',
  'Arts. 1 y 2. Norma de creación del ámbito autonómico de sa Dragonera':
    'Arts. 1 i 2. Norma de creació de l’àmbit autonòmic de sa Dragonera',
  'Arts. 2 y 3': 'Arts. 2 i 3',
  'Arts. 2 y 3. Afecta a arrastre, dragas, jábegas y redes similares sobre dos polígonos concretos, no a la pesca recreativa ni a todo el LIC':
    'Arts. 2 i 3. Afecta l’arrossegament, les dragues, les xàvegues i xarxes similars sobre dos polígons concrets, no la pesca recreativa ni tot el LIC',
  'BOCAIB núm. 74, de 8 de junio de 1999. Art. 2 (zona de protección máxima de s’Espardell) y art. 3 (régimen fuera de ella)':
    'BOCAIB núm. 74, de 8 de juny de 1999. Art. 2 (zona de protecció màxima de s’Espardell) i art. 3 (règim fora d’ella)',
  'BOIB núm. 104, de 2 d’agost de 2014. Régimen general al que remiten los arts. 4 y 5 del Decret 91/2023':
    'BOIB núm. 104, de 2 d’agost de 2014. Règim general al qual remeten els arts. 4 i 5 del Decret 91/2023',
  'BOIB núm. 104, de 5 d’agost de 2021. Apartado 5.3 del plan: 5.3.1 fondeo y 5.3.2 navegación':
    'BOIB núm. 104, de 5 d’agost de 2021. Apartat 5.3 del pla: 5.3.1 fondeig i 5.3.2 navegació',
  'BOIB núm. 104, de 5 de agosto de 2021. Apartados 5.3.1 (fondeo), 5.3.2 (navegación), 5.3.3 (instalaciones náuticas), 5.3.4 (buceo), 5.3.5 (pesca), 6.2.1 (s’Estany d’Addaia), 6.2.2 (navegación y fondeo; 6.2.2.5 zona de exclusión marina), 6.2.5 (buceo con escafandra: grupos de menos de 8 personas), 6.2.7, 6.3.1 y 7.1 (zonificación). Anexo II: criterios básicos para la elaboración del Plan Sectorial de aprovechamiento pesquero (5.1 pesca submarina, 5.2 pesca de superficie, 6.1 zona de exclusión de Addaia)':
    'BOIB núm. 104, de 5 d’agost de 2021. Apartats 5.3.1 (fondeig), 5.3.2 (navegació), 5.3.3 (instal·lacions nàutiques), 5.3.4 (busseig), 5.3.5 (pesca), 6.2.1 (s’Estany d’Addaia), 6.2.2 (navegació i fondeig; 6.2.2.5 zona d’exclusió marina), 6.2.5 (busseig amb escafandre: grups de menys de 8 persones), 6.2.7, 6.3.1 i 7.1 (zonificació). Annex II: criteris bàsics per a l’elaboració del Pla Sectorial d’aprofitament pesquer (5.1 pesca submarina, 5.2 pesca de superfície, 6.1 zona d’exclusió d’Addaia)',
  'BOIB núm. 128, de 12 de septiembre de 2006 (corrección en BOIB núm. 139, de 5 de octubre de 2006). Arts. 2 (área de protección especial) y 9 (buceo)':
    'BOIB núm. 128, de 12 de setembre de 2006 (correcció al BOIB núm. 139, de 5 d’octubre de 2006). Arts. 2 (àrea de protecció especial) i 9 (busseig)',
  'BOIB núm. 144, de 17 de noviembre de 2018. Art. 2 (prohibiciones y excepciones tasadas), art. 4 (pesca recreativa). Modificado por el Decreto 15/2022':
    'BOIB núm. 144, de 17 de novembre de 2018. Art. 2 (prohibicions i excepcions taxades), art. 4 (pesca recreativa). Modificat pel Decret 15/2022',
  'BOIB núm. 157, de 15 de diciembre de 2018. Art. 2 (reserva integral de la Llosa des Figueral), art. 3 (prohibiciones y fondeo), art. 5 (pesca recreativa) y art. 6.2 (remisión a los planes de gestión de los LIC)':
    'BOIB núm. 157, de 15 de desembre de 2018. Art. 2 (reserva integral de la Llosa des Figueral), art. 3 (prohibicions i fondeig), art. 5 (pesca recreativa) i art. 6.2 (remissió als plans de gestió dels LIC)',
  'BOIB núm. 166, de 7 de diciembre de 2023. Veda de tres años para la pesca recreativa desde tierra o desde embarcación':
    'BOIB núm. 166, de 7 de desembre de 2023. Veda de tres anys per a la pesca recreativa des de terra o des d’embarcació',
  'BOIB núm. 170, de 16 de desembre de 2023. Art. 2 (relación de espacios con ámbito marino), art. 3 (pesca profesional), art. 4 (pesca recreativa de superficie y marisqueo) y art. 5 (pesca recreativa submarina)':
    'BOIB núm. 170, de 16 de desembre de 2023. Art. 2 (relació d’espais amb àmbit marí), art. 3 (pesca professional), art. 4 (pesca recreativa de superfície i marisqueig) i art. 5 (pesca recreativa submarina)',
  'BOIB núm. 25, de 20 de febrero de 2024. Prórroga trienal de la veda establecida por primera vez en 2009, al amparo del art. 4.2 de la Orden de 15 de junio de 1999':
    'BOIB núm. 25, de 20 de febrer de 2024. Pròrroga triennal de la veda establerta per primera vegada el 2009, a l’empara de l’art. 4.2 de l’Ordre de 15 de juny de 1999',
  'BOIB núm. 36, de 21 de març de 2023. Apartado 5.8 del plan: 5.8.1 pesca, 5.8.4 fondeo, 5.8.5 navegación':
    'BOIB núm. 36, de 21 de març de 2023. Apartat 5.8 del pla: 5.8.1 pesca, 5.8.4 fondeig, 5.8.5 navegació',
  'BOIB núm. 46, de 9 de abril de 2026': 'BOIB núm. 46, de 9 d’abril de 2026',
  'BOIB núm. 48, de 13 de abril de 2019. Art. 1 (delimitación), art. 2 (zona especial de buceo), art. 3 (prohibiciones; 3.1.c pesca desde la Illa de l’Aire, 3.1.d cuevas submarinas, 3.3 régimen de la zona de buceo) y art. 5 (pesca recreativa de superficie)':
    'BOIB núm. 48, de 13 d’abril de 2019. Art. 1 (delimitació), art. 2 (zona especial de busseig), art. 3 (prohibicions; 3.1.c pesca des de la Illa de l’Aire, 3.1.d coves submarines, 3.3 règim de la zona de busseig) i art. 5 (pesca recreativa de superfície)',
  'BOIB núm. 54 EXT., de 11 de abril de 2007. Ámbito marino: art. 77 (tránsito marino), 78 (pesca profesional), 79 (pesca recreativa), 80 (pesca submarina), 81 (protección de especies marinas), 82 (fondeo) y 83 (buceo)':
    'BOIB núm. 54 EXT., d’11 d’abril de 2007. Àmbit marí: art. 77 (trànsit marí), 78 (pesca professional), 79 (pesca recreativa), 80 (pesca submarina), 81 (protecció d’espècies marines), 82 (fondeig) i 83 (busseig)',
  'BOIB núm. 57, de 4 de mayo de 2023. Art. 2 (zona de especial protección de ses Bledes), art. 3 (punta de na Bruta), art. 4 (prohibiciones y excepciones tasadas), art. 6 (pesca recreativa) y art. 7 (actividades subacuáticas)':
    'BOIB núm. 57, de 4 de maig de 2023. Art. 2 (zona d’especial protecció de ses Bledes), art. 3 (punta de na Bruta), art. 4 (prohibicions i excepcions taxades), art. 6 (pesca recreativa) i art. 7 (activitats subaquàtiques)',
  'BOIB núm. 65, de 19 de mayo de 2022. Disposición final primera: reescribe los arts. 2.1.c y 4.3 del Decreto 38/2018 para admitir el esparavel':
    'BOIB núm. 65, de 19 de maig de 2022. Disposició final primera: reescriu els arts. 2.1.c i 4.3 del Decret 38/2018 per admetre l’esparver',
  'BOIB núm. 68, de 23 de mayo de 2024, sección III. Prórroga de 5 años desde su publicación. El enlace lleva al sumario del boletín, no al PDF de la resolución':
    'BOIB núm. 68, de 23 de maig de 2024, secció III. Pròrroga de 5 anys des de la seva publicació. L’enllaç porta al sumari del butlletí, no al PDF de la resolució',
  'BOIB núm. 71, d’1 de juny de 2021. Régimen general al que remiten los arts. 4 y 5 del Decret 91/2023':
    'BOIB núm. 71, d’1 de juny de 2021. Règim general al qual remeten els arts. 4 i 5 del Decret 91/2023',
  'BOIB núm. 73, de 11 de junio de 2026. Art. 2 (velocidad inferior a 10 nudos y prohibición de motos de agua, solo en la Illa de l’Aire), art. 3 (buceo colectivo en la Illa de l’Aire) y art. 4 (buceo colectivo en el Nord de Menorca)':
    'BOIB núm. 73, d’11 de juny de 2026. Art. 2 (velocitat inferior a 10 nusos i prohibició de motos aquàtiques, només a la Illa de l’Aire), art. 3 (busseig col·lectiu a la Illa de l’Aire) i art. 4 (busseig col·lectiu al Nord de Menorca)',
  'BOIB núm. 77, de 23 de maig de 2015. Art. 4 (pesca profesional), art. 5 (pesca recreativa de superficie y aparejos permitidos) y art. 9 (actividades subacuáticas; el 9.2 prohíbe llevar instrumentos de pesca en inmersión)':
    'BOIB núm. 77, de 23 de maig de 2015. Art. 4 (pesca professional), art. 5 (pesca recreativa de superfície i ormeigs permesos) i art. 9 (activitats subaquàtiques; el 9.2 prohibeix dur instruments de pesca en immersió)',
  'BOIB núm. 79, de 27 de maig de 2015. Normas de regulación del ámbito marino: 3.9 (buceo), 3.12 (fondeo libre condicionado), 4.1 (Pinna nobilis y Lithophaga lithophaga)':
    'BOIB núm. 79, de 27 de maig de 2015. Normes de regulació de l’àmbit marí: 3.9 (busseig), 3.12 (fondeig lliure condicionat), 4.1 (Pinna nobilis i Lithophaga lithophaga)',
  'BOIB núm. 82, de 10 de junio de 2003': 'BOIB núm. 82, de 10 de juny de 2003',
  'BOIB núm. 82, de 10 de junio de 2003. Art. 47 (pesca: 47.1 prohibición total en el área de protección estricta, 47.2 remisión al Plan Sectorial de aprovechamiento pesquero, 47.3 autorización previa para la pesca submarina, 47.4 laguna) y art. 50 (actividades de ocio: 50.1 ordenación del anclaje, 50.3 buceo colectivo, 50.5 prohibición de fondear sobre posidonia, 50.6 prohibición de navegación y baño en las zonas húmedas)':
    'BOIB núm. 82, de 10 de juny de 2003. Art. 47 (pesca: 47.1 prohibició total a l’àrea de protecció estricta, 47.2 remissió al Pla Sectorial d’aprofitament pesquer, 47.3 autorització prèvia per a la pesca submarina, 47.4 llacuna) i art. 50 (activitats de lleure: 50.1 ordenació de l’ancoratge, 50.3 busseig col·lectiu, 50.5 prohibició de fondejar sobre posidònia, 50.6 prohibició de navegació i bany a les zones humides)',
  'BOIB núm. 196, de 31 de diciembre de 2005. Art. 7 (zonificación), art. 11.4 (regulaciones generales: prohibida la pesca submarina y la extracción de flora y fauna marina), art. 12 (áreas de protección estricta), art. 93 (plan sectorial de aprovechamientos pesqueros), art. 94 (régimen transitorio de pesca: 94.a áreas de protección estricta y Estany Pudent, 94.b resto del ámbito marino, 94.c prohibiciones en todo el parque), art. 95 (supletoriedad del Decreto 63/1999), art. 102 (actividades incompatibles: 102.e motos acuáticas, 102.f servicios lucrativos, 102.h competiciones), art. 110 (inmersiones: autorización, incompatibilidad con las áreas de protección estricta, feeding e instrumentos de extracción), art. 117 (ordenación del fondeo: prohibido, regulado y libre condicionado; s’Estany des Peix) y art. 118 (zonas de baño: franja de 200 m)':
    'BOIB núm. 196, de 31 de desembre de 2005. Art. 7 (zonificació), art. 11.4 (regulacions generals: prohibida la pesca submarina i l’extracció de flora i fauna marina), art. 12 (àrees de protecció estricta), art. 93 (pla sectorial d’aprofitaments pesquers), art. 94 (règim transitori de pesca: 94.a àrees de protecció estricta i Estany Pudent, 94.b resta de l’àmbit marí, 94.c prohibicions a tot el parc), art. 95 (supletorietat del Decret 63/1999), art. 102 (activitats incompatibles: 102.e motos aquàtiques, 102.f serveis lucratius, 102.h competicions), art. 110 (immersions: autorització, incompatibilitat amb les àrees de protecció estricta, feeding i instruments d’extracció), art. 117 (ordenació del fondeig: prohibit, regulat i lliure condicionat; s’Estany des Peix) i art. 118 (zones de bany: franja de 200 m)',
  'BOIB núm. 23, de 21 de febrero de 2023. Versión consolidada del Institut d’Estudis Autonòmics actualizada a 04/04/2024. Capítulo V, actividades en el ámbito marino: art. 39 (marco general y remisión subsidiaria al Decret 71/2016 y al Decret 41/2015) y art. 40 (usos prohibidos; 40.1.d fondeo estacional, 40.1.f arrastre y cerco, 40.1.g competiciones de pesca deportiva, 40.1.h pesca recreativa submarina, 40.1.j reserva integral, 40.1.i motonáutica, 40.1.k party boats, 40.2 fondeo sobre posidonia)':
    'BOIB núm. 23, de 21 de febrer de 2023. Versió consolidada de l’Institut d’Estudis Autonòmics actualitzada a 04/04/2024. Capítol V, activitats a l’àmbit marí: art. 39 (marc general i remissió subsidiària al Decret 71/2016 i al Decret 41/2015) i art. 40 (usos prohibits; 40.1.d fondeig estacional, 40.1.f arrossegament i cèrcol, 40.1.g competicions de pesca esportiva, 40.1.h pesca recreativa submarina, 40.1.j reserva integral, 40.1.i motonàutica, 40.1.k party boats, 40.2 fondeig sobre posidònia)',
  'BOIB núm. 81, de 4 de julio de 2017 (corrección de errores en BOIB núm. 92, de 29 de julio de 2017). Versión consolidada del Institut d’Estudis Autonòmics actualizada a 13/06/2026. Art. 4 (normas de protección del ámbito marino): 4.1.a usos admitidos, 4.1.b usos autorizables, 4.1.c usos prohibidos — acuicultura intensiva y pesca submarina —, 4.2 remisión al PORN para el anclaje, el fondeo, el amarre y la circulación de embarcaciones':
    'BOIB núm. 81, de 4 de juliol de 2017 (correcció d’errors al BOIB núm. 92, de 29 de juliol de 2017). Versió consolidada de l’Institut d’Estudis Autonòmics actualitzada a 13/06/2026. Art. 4 (normes de protecció de l’àmbit marí): 4.1.a usos admesos, 4.1.b usos autoritzables, 4.1.c usos prohibits — aqüicultura intensiva i pesca submarina —, 4.2 remissió al PORN per a l’ancoratge, el fondeig, l’amarratge i la circulació d’embarcacions',
  'BOIB núm. 86, de 5 de juliol de 2025. Art. 2 (prohibicions generals), art. 4 (pesca recreativa i marisqueig), art. 5 (activitats subaquàtiques), arts. 7, 8 i 9 (zones d’alta protecció del Toro, les Malgrats i el Sec), disposició transitòria única (badia de Santa Ponça), disposició derogatòria única (deroga els arts. 1 a 10 i els annexos del Decret 38/2022) i annexos 3 i 4 (busseig col·lectiu)':
    'BOIB núm. 86, de 5 de juliol de 2025. Art. 2 (prohibicions generals), art. 4 (pesca recreativa i marisqueig), art. 5 (activitats subaquàtiques), arts. 7, 8 i 9 (zones d’alta protecció del Toro, les Malgrats i el Sec), disposició transitòria única (badia de Santa Ponça), disposició derogatòria única (deroga els arts. 1 a 10 i els annexos del Decret 38/2022) i annexos 3 i 4 (busseig col·lectiu)',
  // Ja escrita en català a la fitxa; es repeteix aquí perquè la clau ha
  // d’existir i perquè, si algú la reescrivís en castellà, hi hagués on posar
  // la versió catalana.
  'DEROGAT en tot el seu articulat: la disposició derogatòria única del Decret 26/2025 deroga els articles 1 a 10 i els annexos. Es manté citat només com a antecedent de les figures que l’IDEIB continua publicant sota aquesta norma; el règim vigent és el del Decret 26/2025':
    'DEROGAT en tot el seu articulat: la disposició derogatòria única del Decret 26/2025 deroga els articles 1 a 10 i els annexos. Es manté citat només com a antecedent de les figures que l’IDEIB continua publicant sota aquesta norma; el règim vigent és el del Decret 26/2025',
  'Declara ES0000518, ES0000519 y ES0000520. Art. 4 (planes de gestión), art. 5 (gestión estatal) y art. 6 (régimen de protección)':
    'Declara ES0000518, ES0000519 i ES0000520. Art. 4 (plans de gestió), art. 5 (gestió estatal) i art. 6 (règim de protecció)',
  'Campo Layer: «Fondeig prohibit» 451,2 ha en 6 polígonos, «Fondeig regulat» 69,3 ha en 3 y «Fondeig lliure condicionat» 13.531 ha en 2':
    'Camp Layer: «Fondeig prohibit» 451,2 ha en 6 polígons, «Fondeig regulat» 69,3 ha en 3 i «Fondeig lliure condicionat» 13.531 ha en 2',
  'Campo ZONIFICACI sobre el ámbito marino (AMBIT=«Marí»): àrea de protecció estricta 427,4 ha, àrea de conservació predominant 154,1 ha, àrea de conservació 13.164,9 ha, àrea d’aprofitament condicionat 344,6 ha y ús portuari 39,3 ha':
    'Camp ZONIFICACI sobre l’àmbit marí (AMBIT=«Marí»): àrea de protecció estricta 427,4 ha, àrea de conservació predominant 154,1 ha, àrea de conservació 13.164,9 ha, àrea d’aprofitament condicionat 344,6 ha i ús portuari 39,3 ha',
  'Campo ZONIFICACI sobre el ámbito marino (AMBIT=«Marí»): zona d’exclusió 9,8 ha, zona d’ús limitat 1.272,0 ha y zona d’ús compatible 468,8 ha':
    'Camp ZONIFICACI sobre l’àmbit marí (AMBIT=«Marí»): zona d’exclusió 9,8 ha, zona d’ús limitat 1.272,0 ha i zona d’ús compatible 468,8 ha',
  'Dos polígonos, campo TIPUS: «Zona pesca submarina condicionada» (1.044,8 ha) y «Zona pesca submarina prohibida» (705,8 ha)':
    'Dos polígons, camp TIPUS: «Zona pesca submarina condicionada» (1.044,8 ha) i «Zona pesca submarina prohibida» (705,8 ha)',

  // -- Canya i volantí: variants per reserva ---------------------------------
  'Caña o volantín, del 1 de octubre al 30 de abril: máximo 1 línea por pescador y 4 anzuelos de 7 mm o más (5,7 mm o más para raors).':
    'Canya o volantí, de l’1 d’octubre al 30 d’abril: màxim 1 línia per pescador i 4 hams de 7 mm o més (5,7 mm o més per als raors).',
  'Caña o volantín: máximo 1 línea por pescador y 4 anzuelos de 7 mm o más (5,7 mm o más para el raor).':
    'Canya o volantí: màxim 1 línia per pescador i 4 hams de 7 mm o més (5,7 mm o més per al raor).',
  'Caña o volantín: máximo 1 línea por pescador y 4 anzuelos de 7 mm o más (5,7 mm o más para los raors).':
    'Canya o volantí: màxim 1 línia per pescador i 4 hams de 7 mm o més (5,7 mm o més per als raors).',
  'Caña o volantín: máximo 1 línea por pescador y 4 anzuelos de 7 mm o más (5,7 mm o más para raors).':
    'Canya o volantí: màxim 1 línia per pescador i 4 hams de 7 mm o més (5,7 mm o més per a raors).',
  'Caña o volantín: máximo 1 línea por pescador y 4 anzuelos, de ancho superior a 7 mm y máximo 9 mm.':
    'Canya o volantí: màxim 1 línia per pescador i 4 hams, d’amplada superior a 7 mm i màxim 9 mm.',
  'Caña o volantín: máximo 1 línea por pescador y 6 anzuelos de 7 mm o más.':
    'Canya o volantí: màxim 1 línia per pescador i 6 hams de 7 mm o més.',
  'Caña: máximo 1 línea por pescador y 6 anzuelos de 7 mm o más.':
    'Canya: màxim 1 línia per pescador i 6 hams de 7 mm o més.',
  'Curricán de fondo: máximo 2 líneas por embarcación, en la modalidad tradicional; solo permitido en el ámbito autonómico.':
    'Curricà de fons: màxim 2 línies per embarcació, en la modalitat tradicional; només permès a l’àmbit autonòmic.',
  'Curricán de superficie (fluixa): máximo 2 líneas por embarcación.':
    'Curricà de superfície (fluixa): màxim 2 línies per embarcació.',
  'Curricán de superficie: máximo 2 líneas por embarcación, en las modalidades tradicionales de las Illes Balears.':
    'Curricà de superfície: màxim 2 línies per embarcació, en les modalitats tradicionals de les Illes Balears.',
  'Curricán de superficie: máximo 2 líneas por embarcación, sin lastrar y navegando a más de 3 nudos.':
    'Curricà de superfície: màxim 2 línies per embarcació, sense llastar i navegant a més de 3 nusos.',
  'Desde tierra y con autorización específica se permiten los aparejos tradicionales de Eivissa: el esparavel o rall, el morenell y la lienza o llenceta.':
    'Des de terra i amb autorització específica es permeten els ormeigs tradicionals d’Eivissa: l’esparver o rall, el morenell i la llenceta.',
  'Dentro de la zona especial de buceo solo se puede pescar con caña, con o sin carrete.':
    'Dins la zona especial de busseig només es pot pescar amb canya, amb rodet o sense.',
  'Días autorizados: martes, jueves, sábados, domingos y festivos nacionales.':
    'Dies autoritzats: dimarts, dijous, dissabtes, diumenges i festius nacionals.',

  // -- Vigències de permís ----------------------------------------------------
  'Consultar en el trámite': 'Consultau-ho al tràmit',
  'De 1 a 7 días': 'D’1 a 7 dies',
  'Diaria o anual, según la modalidad solicitada': 'Diària o anual, segons la modalitat sol·licitada',
  'Cuando la demanda supera la oferta, el cupo es de veinte embarcaciones chárter y treinta privadas.':
    'Quan la demanda supera l’oferta, la quota és de vint embarcacions xàrter i trenta privades.',

  // -- Fondeig: campanyes de boies i zones de refugi -------------------------
  'Cala Agulla es uno de los tres lugares de la reserva estatal donde se puede fondear sin autorización.':
    'Cala Agulla és un dels tres llocs de la reserva estatal on es pot fondejar sense autorització.',
  'Como zona de refugio con mal tiempo se priorizan las boyas libres de los campos existentes; si no las hay, el fondeo sobre fondo arenoso, como el que hay entre es Babo y s’Arenal.':
    'Com a zona de refugi amb mal temps es prioritzen les boies lliures dels camps existents; si no n’hi ha, el fondeig sobre fons arenós, com el que hi ha entre es Babo i s’Arenal.',
  'Del 1 de mayo al 31 de octubre, ambos incluidos, prohibido fondear a menos de 100 m de la costa en s’Arenalet, Font Celada y es Matzoc (art. 40.1.d).':
    'De l’1 de maig al 31 d’octubre, tots dos inclosos, prohibit fondejar a menys de 100 m de la costa a s’Arenalet, Font Celada i es Matzoc (art. 40.1.d).',
  'Donde hay campo de boyas hay que amarrar a la boya: no se puede echar el ancla.':
    'On hi ha camp de boies cal amarrar a la boia: no s’hi pot llançar l’àncora.',
  'Donde no hay balizamiento, la zona de baño se entiende como una franja de 200 m en las playas y 50 m en el resto de la costa; dentro de ella no se puede navegar a más de 3 nudos.':
    'On no hi ha abalisament, la zona de bany s’entén com una franja de 200 m a les platges i 50 m a la resta de la costa; dins seu no es pot navegar a més de 3 nusos.',

  // -- s’Albufera des Grau: apartats del PRUG --------------------------------
  'El apartado 5.1.2 del anexo II del PRUG no permite la pesca submarina en el entorno de los cabos de Favàritx y Mossenyor Vives, y el IDEIB publica el polígono exacto en su capa de regulación de pesca submarina del parque.':
    'L’apartat 5.1.2 de l’annex II del PRUG no permet la pesca submarina a l’entorn dels caps de Favàritx i Mossenyor Vives, i l’IDEIB publica el polígon exacte a la seva capa de regulació de pesca submarina del parc.',
  'El apartado 5.3.1 del PRUG prohíbe fondear sobre Posidonia oceanica, Cymodocea nodosa y fondos de maërl o coralígeno, y el art. 50.5 del PORN ya prohibía hacerlo sobre posidonia. Hay además tres campos de boyas donde no se puede echar el ancla.':
    'L’apartat 5.3.1 del PRUG prohibeix fondejar sobre Posidonia oceanica, Cymodocea nodosa i fons de maërl o coral·ligen, i l’art. 50.5 del PORN ja ho prohibia sobre posidònia. Hi ha a més tres camps de boies on no s’hi pot llançar l’àncora.',
  'El apartado 6.2.5 del PRUG permite el buceo recreativo con escafandra autónoma en grupos de menos de 8 personas y lo hace autorizable a partir de 8. Las empresas que lo ofrezcan con ánimo de lucro necesitan autorización siempre, sea cual sea el número de participantes.':
    'L’apartat 6.2.5 del PRUG permet el busseig recreatiu amb escafandre autònom en grups de menys de 8 persones i el fa autoritzable a partir de 8. Les empreses que l’ofereixin amb ànim de lucre necessiten autorització sempre, sigui quin sigui el nombre de participants.',
  'El apartado 7.1.2 del PRUG define estas zonas como las que acogen comunidades importantes de fanerógamas marinas «donde el fondeo es una actividad regulada o prohibida».':
    'L’apartat 7.1.2 del PRUG defineix aquestes zones com les que acullen comunitats importants de fanerògames marines «on el fondeig és una activitat regulada o prohibida».',

  // -- Illa de l’Aire: pla de gestió -----------------------------------------
  'El apartado 5.6.1 del plan de gestión prohíbe fondear sobre Posidonia oceanica y extiende la prohibición a la Cymodocea nodosa y a los fondos de maërl o coralígeno.':
    'L’apartat 5.6.1 del pla de gestió prohibeix fondejar sobre Posidonia oceanica i estén la prohibició a la Cymodocea nodosa i als fons de maërl o coral·ligen.',
  'El apartado 5.6.3 del Pla de Gestió Illa de l’Aire prohíbe los circuitos de motos náuticas y de otras embarcaciones a motor, y el 5.6.2 cualquier vertido desde las embarcaciones. Dentro de la reserva marina rige además el límite de 10 nudos de la Orden 11/2026.':
    'L’apartat 5.6.3 del Pla de Gestió Illa de l’Aire prohibeix els circuits de motos nàutiques i d’altres embarcacions a motor, i el 5.6.2 qualsevol abocament des de les embarcacions. Dins la reserva marina regeix a més el límit de 10 nusos de l’Ordre 11/2026.',
  'El art. 2 de la Orden 11/2026 obliga a navegar a menos de 10 nudos dentro de la reserva y prohíbe el uso de motos de agua. Es una restricción posterior al decreto de creación.':
    'L’art. 2 de l’Ordre 11/2026 obliga a navegar a menys de 10 nusos dins la reserva i prohibeix l’ús de motos aquàtiques. És una restricció posterior al decret de creació.',

  // -- Cabrera: PRUG del parc nacional ---------------------------------------
  'El apartado 2.3.3 del PRUG considera el anclaje actividad compatible pero sujeta a autorización administrativa previa, con cupos por zona y por día.':
    'L’apartat 2.3.3 del PRUG considera l’ancoratge activitat compatible però subjecta a autorització administrativa prèvia, amb quotes per zona i per dia.',
  'El apartado jj) de los usos prohibidos del PRUG prohíbe «el ejercicio de la pesca deportiva en cualquiera de sus modalidades», sin excepción para la pesca desde embarcación.':
    'L’apartat jj) dels usos prohibits del PRUG prohibeix «l’exercici de la pesca esportiva en qualsevol de les seves modalitats», sense excepció per a la pesca des d’embarcació.',
  'El apartado jj) de los usos prohibidos del PRUG prohíbe «el ejercicio de la pesca deportiva en cualquiera de sus modalidades». El apartado kk) prohíbe además toda actividad que suponga explotación directa de los recursos naturales, salvo la pesca artesanal tradicional de carácter profesional.':
    'L’apartat jj) dels usos prohibits del PRUG prohibeix «l’exercici de la pesca esportiva en qualsevol de les seves modalitats». L’apartat kk) prohibeix a més tota activitat que suposi explotació directa dels recursos naturals, llevat de la pesca artesanal tradicional de caràcter professional.',
  'El apartado ll) de los usos prohibidos del PRUG prohíbe la navegación por el interior de las aguas del parque salvo la necesaria para los fines de la ley de creación, la pesca artesanal censada, el uso público y la gestión del parque y el salvamento marítimo. Navegar con embarcación propia exige por tanto autorización.':
    'L’apartat ll) dels usos prohibits del PRUG prohibeix la navegació per l’interior de les aigües del parc llevat de la necessària per als fins de la llei de creació, la pesca artesanal censada, l’ús públic i la gestió del parc i el salvament marítim. Navegar amb embarcació pròpia exigeix per tant autorització.',
  'El apartado mm) del PRUG prohíbe bucear sin la correspondiente autorización administrativa y sin acreditar el nivel de formación mínimo exigido.':
    'L’apartat mm) del PRUG prohibeix bussejar sense la corresponent autorització administrativa i sense acreditar el nivell de formació mínim exigit.',

  // -- ses Salines: fondeig i busseig segons el PRUG -------------------------
  'El área de protección estricta es una categoría de zonificación del PRUG: fija la vocación del área, no un régimen de usos propio. Lo que se puede hacer aquí lo determinan las normas generales del parque y, para el fondeo, la capa oficial de regulación del fondeo.':
    'L’àrea de protecció estricta és una categoria de zonificació del PRUG: fixa la vocació de l’àrea, no un règim d’usos propi. El que s’hi pot fer ho determinen les normes generals del parc i, per al fondeig, la capa oficial de regulació del fondeig.',
  'El art. 110 del PRUG admite el submarinismo deportivo en las aguas del parque, pero lo sujeta a autorización del órgano gestor de los espacios naturales protegidos. La información oficial del parque incluye el buceo deportivo entre las actividades que se tienen que autorizar previamente.':
    'L’art. 110 del PRUG admet el submarinisme esportiu a les aigües del parc, però el subjecta a autorització de l’òrgan gestor dels espais naturals protegits. La informació oficial del parc inclou el busseig esportiu entre les activitats que s’han d’autoritzar prèviament.',
  'El art. 110 del PRUG considera las inmersiones submarinas incompatibles con las áreas de protección estricta: allí solo pueden hacerse cuando estén relacionadas con la gestión del parque o vinculadas a actividades científicas o de estudio debidamente autorizadas.':
    'L’art. 110 del PRUG considera les immersions submarines incompatibles amb les àrees de protecció estricta: allà només s’hi poden fer quan estiguin relacionades amb la gestió del parc o vinculades a activitats científiques o d’estudi degudament autoritzades.',
  'El art. 110 regula bajo el mismo epígrafe el submarinismo «con escafandra o en apnea», pero la información pública del parque solo exige el permiso para el buceo con botella. Quien vaya a bucear a pulmón debería confirmarlo con la oficina del parque antes de salir.':
    'L’art. 110 regula sota el mateix epígraf el submarinisme «amb escafandre o en apnea», però la informació pública del parc només exigeix el permís per al busseig amb ampolla. Qui vagi a bussejar a pulmó hauria de confirmar-ho amb l’oficina del parc abans de sortir.',
  'El art. 117 del PRUG reparte el ámbito marino del parque en zonas de fondeo prohibido, de fondeo regulado con campo de boyas y de fondeo libre condicionado. Fuera de las dos primeras rige el régimen condicionado: solo sobre arena y nunca sobre posidonia.':
    'L’art. 117 del PRUG reparteix l’àmbit marí del parc en zones de fondeig prohibit, de fondeig regulat amb camp de boies i de fondeig lliure condicionat. Fora de les dues primeres regeix el règim condicionat: només sobre arena i mai sobre posidònia.',
  'El art. 117.a del PRUG prohíbe totalmente cualquier tipo de fondeo en estas zonas, salvo por causas de fuerza mayor. El IDEIB publica los polígonos exactos.':
    'L’art. 117.a del PRUG prohibeix totalment qualsevol tipus de fondeig en aquestes zones, llevat de causes de força major. L’IDEIB publica els polígons exactes.',
  'El art. 117.a del PRUG, por remisión al art. 30.3 del PORN, prohíbe el anclaje de embarcaciones en las áreas marinas de protección estricta.':
    'L’art. 117.a del PRUG, per remissió a l’art. 30.3 del PORN, prohibeix l’ancoratge d’embarcacions a les àrees marines de protecció estricta.',
  'El art. 117.b del PRUG dispone campos de boyas fijas de bajo impacto ambiental en las zonas con más presión de embarcaciones sobre fondos vulnerables. En ellas los patrones deben amarrar la embarcación a las boyas habilitadas.':
    'L’art. 117.b del PRUG disposa camps de boies fixes de baix impacte ambiental a les zones amb més pressió d’embarcacions sobre fons vulnerables. Allà els patrons han d’amarrar l’embarcació a les boies habilitades.',
  'El art. 117.c del PRUG considera de fondeo libre condicionado todo lo que no es zona prohibida ni regulada. En ellas el ancla solo se puede fijar sobre fondos arenosos, y nunca sobre formaciones de Posidonia oceanica, siendo el patrón de la embarcación el responsable de esa circunstancia.':
    'L’art. 117.c del PRUG considera de fondeig lliure condicionat tot allò que no és zona prohibida ni regulada. Allà l’àncora només es pot fixar sobre fons arenosos, i mai sobre formacions de Posidonia oceanica, i el patró de l’embarcació és el responsable d’aquesta circumstància.',

  // -- Àrees de protecció especial i reserves integrals ----------------------
  'El art. 2 de la Orden de 2005 prohíbe pesca, extracción, buceo con escafandra y el fondeo sobre fanerógamas dentro del área de protección especial, pero no menciona la navegación.':
    'L’art. 2 de l’Ordre de 2005 prohibeix pesca, extracció, busseig amb escafandre i el fondeig sobre fanerògames dins l’àrea de protecció especial, però no esmenta la navegació.',
  'El art. 2 de la Orden de 2006 prohíbe el buceo con escafandra autónoma dentro del área de protección especial. Es la excepción al régimen general de la reserva, donde el buceo sí se puede practicar con permiso.':
    'L’art. 2 de l’Ordre de 2006 prohibeix el busseig amb escafandre autònom dins l’àrea de protecció especial. És l’excepció al règim general de la reserva, on el busseig sí que es pot practicar amb permís.',
  'El art. 2 de la Orden de 2006 prohíbe expresamente el fondeo de embarcaciones sobre las fanerógamas marinas dentro del área de protección especial. El Real Decreto 191/2026 refuerza esa misma prohibición con carácter general en todo el Mediterráneo español.':
    'L’art. 2 de l’Ordre de 2006 prohibeix expressament el fondeig d’embarcacions sobre les fanerògames marines dins l’àrea de protecció especial. El Reial Decret 191/2026 reforça aquesta mateixa prohibició amb caràcter general a tot el Mediterrani espanyol.',
  'El art. 2 de la Orden de 2006 prohíbe pesca, extracción, buceo con escafandra y el fondeo sobre fanerógamas dentro del área de protección especial, pero no menciona la navegación.':
    'L’art. 2 de l’Ordre de 2006 prohibeix pesca, extracció, busseig amb escafandre i el fondeig sobre fanerògames dins l’àrea de protecció especial, però no esmenta la navegació.',
  'El art. 2 de la Orden de 29 de abril de 2005 prohíbe el buceo con escafandra autónoma dentro del área de protección especial. Es la excepción al régimen general de la reserva, donde el buceo sí se puede practicar con autorización.':
    'L’art. 2 de l’Ordre de 29 d’abril de 2005 prohibeix el busseig amb escafandre autònom dins l’àrea de protecció especial. És l’excepció al règim general de la reserva, on el busseig sí que es pot practicar amb autorització.',
  'El art. 2 de la Orden de 29 de abril de 2005 prohíbe expresamente «el fondeo de embarcaciones sobre praderas de fanerógamas» dentro del área de protección especial. El Real Decreto 191/2026 refuerza esa misma prohibición con carácter general en todo el Mediterráneo español.':
    'L’art. 2 de l’Ordre de 29 d’abril de 2005 prohibeix expressament «el fondeig d’embarcacions sobre prades de fanerògames» dins l’àrea de protecció especial. El Reial Decret 191/2026 reforça aquesta mateixa prohibició amb caràcter general a tot el Mediterrani espanyol.',
  'El art. 2 del Decret 71/2016 prohíbe la pesca, la extracción, el anclaje sobre posidonia y el buceo con escafandra en la reserva integral, pero no menciona la navegación.':
    'L’art. 2 del Decret 71/2016 prohibeix la pesca, l’extracció, l’ancoratge sobre posidònia i el busseig amb escafandre a la reserva integral, però no esmenta la navegació.',
  'El art. 2.2 del Decret 71/2016 prohíbe expresamente «el anclaje de embarcaciones sobre posidonia» en la reserva integral. El Real Decreto 191/2026 amplía esa misma prohibición a Cymodocea nodosa y al fondeo en arena que afecte a la pradera por la cadena o el borneo, con carácter general en todo el Mediterráneo español.':
    'L’art. 2.2 del Decret 71/2016 prohibeix expressament «l’ancoratge d’embarcacions sobre posidònia» a la reserva integral. El Reial Decret 191/2026 amplia aquesta mateixa prohibició a Cymodocea nodosa i al fondeig en arena que afecti la prada per la cadena o el borneig, amb caràcter general a tot el Mediterrani espanyol.',
  'El art. 2 del Decreto 62/2016 prohíbe toda clase de pesca marítima dentro de la reserva, con tres excepciones tasadas: pesca profesional de artes menores, pesca y marisqueo recreativos desde tierra y embarcación, y muestreo científico autorizado. La pesca submarina no está entre ellas.':
    'L’art. 2 del Decret 62/2016 prohibeix tota classe de pesca marítima dins la reserva, amb tres excepcions taxades: pesca professional d’arts menors, pesca i marisqueig recreatius des de terra i embarcació, i mostreig científic autoritzat. La pesca submarina no hi és entre elles.',
  'El art. 2 del Decreto 63/1999 prohíbe en esta zona cualquier tipo de pesca marítima. Además el buceo con escafandra está prohibido y en apnea no se pueden portar instrumentos de pesca.':
    'L’art. 2 del Decret 63/1999 prohibeix en aquesta zona qualsevol tipus de pesca marítima. A més el busseig amb escafandre hi és prohibit i en apnea no s’hi poden portar instruments de pesca.',
  'El art. 2 del Decreto 63/1999 prohíbe expresamente el buceo con escafandra autónoma en la zona de protección máxima. La Dirección General puede autorizar la inmersión con finalidades científicas.':
    'L’art. 2 del Decret 63/1999 prohibeix expressament el busseig amb escafandre autònom a la zona de protecció màxima. La Direcció General pot autoritzar la immersió amb finalitats científiques.',
  'El art. 2 del Decreto 63/1999 prohíbe expresamente el fondeo de embarcaciones en la zona de protección máxima de s’Espardell. Es una prohibición total, no limitada a las praderas de fanerógamas.':
    'L’art. 2 del Decret 63/1999 prohibeix expressament el fondeig d’embarcacions a la zona de protecció màxima de s’Espardell. És una prohibició total, no limitada a les prades de fanerògames.',
  'El art. 2 del Decreto 63/1999 prohíbe pesca, extracción, fondeo y buceo con escafandra en esta zona, pero no la navegación de paso.':
    'L’art. 2 del Decret 63/1999 prohibeix pesca, extracció, fondeig i busseig amb escafandre en aquesta zona, però no la navegació de pas.',
  'El art. 2.1.a del Decreto 38/2018 prohíbe toda clase de pesca marítima y el 2.2 solo exceptúa las artes menores profesionales, la pesca recreativa desde embarcación y el muestreo científico. La submarina no está entre las excepciones, y la página oficial la declara expresamente prohibida.':
    'L’art. 2.1.a del Decret 38/2018 prohibeix tota classe de pesca marítima i el 2.2 només n’exceptua les arts menors professionals, la pesca recreativa des d’embarcació i el mostreig científic. La submarina no és entre les excepcions, i la pàgina oficial la declara expressament prohibida.',
  'El art. 2.1.c prohíbe toda pesca marítima y marisqueo entre la línea de costa y los 10 m de profundidad, salvo precisamente el esparavel.':
    'L’art. 2.1.c prohibeix tota pesca marítima i marisqueig entre la línia de costa i els 10 m de fondària, llevat precisament de l’esparver.',
  'El art. 2.2 del Decreto 25/2023 prohíbe en esta zona toda clase de pesca marítima y de extracción de flora y fauna marinas, y solo exceptúa la pesca profesional con volantín, potera y curricán, la gestión de los espacios protegidos y las actividades científicas.':
    'L’art. 2.2 del Decret 25/2023 prohibeix en aquesta zona tota classe de pesca marítima i d’extracció de flora i fauna marines, i només n’exceptua la pesca professional amb volantí, poteres i curricà, la gestió dels espais protegits i les activitats científiques.',
  'El art. 2.2 del Decreto 25/2023 prohíbe en esta zona toda clase de pesca marítima y de extracción de flora y fauna marinas. Las excepciones que enumera son profesionales o científicas, ninguna recreativa; la página oficial lo confirma: «La pesca recreativa no está permitida».':
    'L’art. 2.2 del Decret 25/2023 prohibeix en aquesta zona tota classe de pesca marítima i d’extracció de flora i fauna marines. Les excepcions que enumera són professionals o científiques, cap de recreativa; la pàgina oficial ho confirma: «La pesca recreativa no està permesa».',
  'El art. 2.2 del Decreto 25/2023 prohíbe en esta zona toda clase de pesca marítima, y la modalidad submarina ya estaba prohibida en el conjunto de la reserva.':
    'L’art. 2.2 del Decret 25/2023 prohibeix en aquesta zona tota classe de pesca marítima, i la modalitat submarina ja era prohibida al conjunt de la reserva.',
  'El art. 2.2 del Decreto 25/2023 regula la pesca y la extracción en esta zona, y el decreto no establece límites de navegación en ninguna de las dos reservas.':
    'L’art. 2.2 del Decret 25/2023 regula la pesca i l’extracció en aquesta zona, i el decret no estableix límits de navegació a cap de les dues reserves.',
  'El art. 2.2 del Decreto 25/2023 restringe aquí la pesca y la extracción, no las actividades subacuáticas: para el buceo rige el art. 7, común a toda la reserva, que exige autorización para la escafandra autónoma.':
    'L’art. 2.2 del Decret 25/2023 restringeix aquí la pesca i l’extracció, no les activitats subaquàtiques: per al busseig regeix l’art. 7, comú a tota la reserva, que exigeix autorització per a l’escafandre autònom.',
  'El art. 2.2.b del Decreto 38/2018 exceptúa de la prohibición general la pesca recreativa desde embarcación, que el art. 4 sujeta a licencia específica, a temporada y a una profundidad mínima.':
    'L’art. 2.2.b del Decret 38/2018 exceptua de la prohibició general la pesca recreativa des d’embarcació, que l’art. 4 subjecta a llicència específica, a temporada i a una fondària mínima.',

  // -- Illa de l’Aire i Nord de Menorca (Decrets 26/2019 i 45/2018) ----------
  'El art. 3.1.a del Decreto 26/2019 prohíbe toda clase de pesca marítima y de extracción de flora y fauna marinas, y el 3.2 solo exceptúa las artes menores profesionales, la pesca y el marisqueo recreativos del art. 5 —titulado «Pesca recreativa de superficie»— y el muestreo científico. La modalidad submarina no está entre las excepciones.':
    'L’art. 3.1.a del Decret 26/2019 prohibeix tota classe de pesca marítima i d’extracció de flora i fauna marines, i el 3.2 només n’exceptua les arts menors professionals, la pesca i el marisqueig recreatius de l’art. 5 —titulat «Pesca recreativa de superfície»— i el mostreig científic. La modalitat submarina no és entre les excepcions.',
  'El art. 3.1.a del Decreto 45/2018 prohíbe toda clase de pesca marítima y el 3.2 solo exceptúa las artes menores profesionales, la pesca recreativa «de superficie» y el muestreo científico. La submarina no está entre las excepciones, y la página oficial la declara expresamente prohibida.':
    'L’art. 3.1.a del Decret 45/2018 prohibeix tota classe de pesca marítima i el 3.2 només n’exceptua les arts menors professionals, la pesca recreativa «de superfície» i el mostreig científic. La submarina no és entre les excepcions, i la pàgina oficial la declara expressament prohibida.',
  'El art. 3.2.b del Decreto 45/2018 exceptúa de la prohibición general la pesca recreativa de superficie, que el art. 5 limita a tres aparejos y sujeta a licencia específica.':
    'L’art. 3.2.b del Decret 45/2018 exceptua de la prohibició general la pesca recreativa de superfície, que l’art. 5 limita a tres ormeigs i subjecta a llicència específica.',
  'El art. 3.3 del Decreto 26/2019 prohíbe en la zona especial de buceo toda clase de pesca marítima y de extracción, con la única excepción de la caña desde tierra. La modalidad submarina ya estaba además prohibida en el conjunto de la reserva.':
    'L’art. 3.3 del Decret 26/2019 prohibeix a la zona especial de busseig tota classe de pesca marítima i d’extracció, amb l’única excepció de la canya des de terra. La modalitat submarina ja era a més prohibida al conjunt de la reserva.',
  'El art. 3.3 del Decreto 26/2019 prohíbe en la zona especial de buceo toda clase de pesca marítima y de extracción, y solo exceptúa la pesca recreativa desde tierra con caña, con o sin carrete, y el muestreo científico autorizado.':
    'L’art. 3.3 del Decret 26/2019 prohibeix a la zona especial de busseig tota classe de pesca marítima i d’extracció, i només n’exceptua la pesca recreativa des de terra amb canya, amb rodet o sense, i el mostreig científic autoritzat.',
  'El art. 3.3 del Decreto 26/2019 solo exceptúa de la prohibición la pesca recreativa desde tierra con caña: desde embarcación no se puede pescar en la zona especial de buceo.':
    'L’art. 3.3 del Decret 26/2019 només exceptua de la prohibició la pesca recreativa des de terra amb canya: des d’embarcació no s’hi pot pescar, a la zona especial de busseig.',
  'El art. 3.3 del Decreto 45/2018 prohíbe en la reserva integral las actividades subacuáticas, la pesca, la extracción y el fondeo, pero no la navegación de paso.':
    'L’art. 3.3 del Decret 45/2018 prohibeix a la reserva integral les activitats subaquàtiques, la pesca, l’extracció i el fondeig, però no la navegació de pas.',
  'El art. 3.3 del Decreto 45/2018 prohíbe expresamente el fondeo de embarcaciones dentro de la reserva integral de la Llosa des Figueral. Es una prohibición total, no limitada a las praderas de fanerógamas.':
    'L’art. 3.3 del Decret 45/2018 prohibeix expressament el fondeig d’embarcacions dins la reserva integral de la Llosa des Figueral. És una prohibició total, no limitada a les prades de fanerògames.',
  'El art. 5.3 del Decreto 45/2018 admite desde tierra únicamente los aparejos tradicionales de Eivissa, y solo con autorización específica: sin ella no se puede pescar desde tierra.':
    'L’art. 5.3 del Decret 45/2018 admet des de terra únicament els ormeigs tradicionals d’Eivissa, i només amb autorització específica: sense ella no es pot pescar des de terra.',
  'El Decreto 38/2018 regula pesca, extracción y actividades subacuáticas, pero no establece límites de navegación dentro de la reserva.':
    'El Decret 38/2018 regula pesca, extracció i activitats subaquàtiques, però no estableix límits de navegació dins la reserva.',
  'El Decreto 45/2018 regula pesca, extracción y actividades subacuáticas, y solo prohíbe el fondeo dentro de la reserva integral; no establece límites de navegación.':
    'El Decret 45/2018 regula pesca, extracció i activitats subaquàtiques, i només prohibeix el fondeig dins la reserva integral; no estableix límits de navegació.',
  'El Decreto 63/1999 y la regulación de actividades de esta reserva organizan pesca, extracción y actividades subacuáticas, pero no establecen límites de navegación en el perímetro general.':
    'El Decret 63/1999 i la regulació d’activitats d’aquesta reserva organitzen pesca, extracció i activitats subaquàtiques, però no estableixen límits de navegació al perímetre general.',
  'El Decret 71/2016 regula la extracción de flora y fauna y las actividades subacuáticas, pero no establece ninguna limitación de navegación para el ámbito autonómico.':
    'El Decret 71/2016 regula l’extracció de flora i fauna i les activitats subaquàtiques, però no estableix cap limitació de navegació per a l’àmbit autonòmic.',

  // -- Es Trenc: Llei 2/2017 --------------------------------------------------
  'El art. 4.1.a de la Ley 2/2017 admite en el ámbito marino los usos pesqueros y los usos comunes del art. 31 de la Ley de Costas —entre ellos pescar—, pero solo en la medida en que sean compatibles con los objetivos de protección del espacio y conforme al instrumento de planificación, que puede regularlos y ordenarlos.':
    'L’art. 4.1.a de la Llei 2/2017 admet a l’àmbit marí els usos pesquers i els usos comuns de l’art. 31 de la Llei de Costes —entre ells pescar—, però només en la mesura que siguin compatibles amb els objectius de protecció de l’espai i d’acord amb l’instrument de planificació, que els pot regular i ordenar.',
  'El art. 4.2 de la Ley 2/2017 encarga al PORN regular específicamente el anclaje, el fondeo, el amarre y la circulación de embarcaciones en el ámbito marino del parque. Rige además, en todo el Mediterráneo español, la prohibición de fondear sobre praderas de fanerógamas.':
    'L’art. 4.2 de la Llei 2/2017 encarrega al PORN regular específicament l’ancoratge, el fondeig, l’amarratge i la circulació d’embarcacions a l’àmbit marí del parc. Regeix a més, a tot el Mediterrani espanyol, la prohibició de fondejar sobre prades de fanerògames.',
  'El art. 4.2 de la Ley 2/2017 remite al PORN la regulación específica de la circulación de embarcaciones y del transporte colectivo de viajeros por mar dentro del ámbito marino del parque.':
    'L’art. 4.2 de la Llei 2/2017 remet al PORN la regulació específica de la circulació d’embarcacions i del transport col·lectiu de viatgers per mar dins l’àmbit marí del parc.',
  'El PORN desarrolla el art. 4 de la Ley 2/2017. Su articulado no está cargado en este mapa: en la fecha de esta revisión el eboibfront devolvía 503 por mantenimiento':
    'El PORN desplega l’art. 4 de la Llei 2/2017. El seu articulat no està carregat en aquest mapa: en la data d’aquesta revisió l’eboibfront retornava 503 per manteniment',

  // -- Península de Llevant: PORN --------------------------------------------
  'El art. 40.1 del PORN prohíbe en el ámbito marino del parque cualquier vertido desde las embarcaciones, las competiciones y las excursiones o rutas organizadas de motonáutica, y las fiestas en embarcaciones con emisión de ruido mediante equipos de música.':
    'L’art. 40.1 del PORN prohibeix a l’àmbit marí del parc qualsevol abocament des de les embarcacions, les competicions i les excursions o rutes organitzades de motonàutica, i les festes en embarcacions amb emissió de renou mitjançant equips de música.',
  'El art. 40.1.h del PORN de Llevant enumera «la pesca recreativa submarina» entre los usos prohibidos del ámbito marino del Parc Natural de la Península de Llevant. La prohibición alcanza todo el ámbito marino del parque y no depende de estar dentro de la reserva marina.':
    'L’art. 40.1.h del PORN de Llevant enumera «la pesca recreativa submarina» entre els usos prohibits de l’àmbit marí del Parc Natural de la Península de Llevant. La prohibició abasta tot l’àmbit marí del parc i no depèn de ser dins la reserva marina.',
  'El art. 40.2 del PORN prohíbe con carácter general fondear sobre Posidonia oceanica, y el art. 40.1.d prohíbe fondear del 1 de mayo al 31 de octubre a menos de cien metros de la costa en las playas de s’Arenalet, Font Celada y es Matzoc.':
    'L’art. 40.2 del PORN prohibeix amb caràcter general fondejar sobre Posidonia oceanica, i l’art. 40.1.d prohibeix fondejar de l’1 de maig al 31 d’octubre a menys de cent metres de la costa a les platges de s’Arenalet, Font Celada i es Matzoc.',
  'El PORN no prohíbe el buceo en el conjunto del ámbito marino, pero sí lo prohíbe con escafandra autónoma en el área de reserva integral (art. 40.1.j). Fuera de ella rige, en defecto de previsión, el régimen de autorizaciones del Decret 41/2015.':
    'El PORN no prohibeix el busseig al conjunt de l’àmbit marí, però sí que el prohibeix amb escafandre autònom a l’àrea de reserva integral (art. 40.1.j). Fora d’ella regeix, en defecte de previsió, el règim d’autoritzacions del Decret 41/2015.',
  'El PORN no prohíbe la pesca recreativa de superficie en todo el ámbito marino, pero sí prohíbe las competiciones de pesca deportiva (art. 40.1.g) y toda pesca en el área de reserva integral (art. 40.1.j). Donde además alcanza la reserva marina, su régimen se suma.':
    'El PORN no prohibeix la pesca recreativa de superfície a tot l’àmbit marí, però sí que prohibeix les competicions de pesca esportiva (art. 40.1.g) i tota pesca a l’àrea de reserva integral (art. 40.1.j). On a més arriba la reserva marina, el seu règim s’hi suma.',
  'En el área de reserva integral el art. 40.1.j prohíbe además cualquier pesca marítima y el buceo con escafandra autónoma.':
    'A l’àrea de reserva integral l’art. 40.1.j prohibeix a més qualsevol pesca marítima i el busseig amb escafandre autònom.',
  'El buceo recreativo no figura entre las actividades permitidas en la reserva integral, donde solo cabe la investigación autorizada.':
    'El busseig recreatiu no figura entre les activitats permeses a la reserva integral, on només hi cap la recerca autoritzada.',
  'El fondeo solo está permitido en Cala Moltó o Es Gulló, Cala Agulla y Son Moll. La reserva integral no está entre ellos.':
    'El fondeig només és permès a Cala Moltó o Es Gulló, Cala Agulla i Son Moll. La reserva integral no hi és entre ells.',

  // -- s’Albufera des Grau: pesca submarina autoritzable ---------------------
  'El art. 47.3 del PORN somete la pesca recreativa submarina a autorización previa de la administración competente en medio ambiente, además de la licencia de pesca. El apartado 5.1.1 del anexo II del PRUG lo reitera y el trámite está abierto y con tasa publicada. Pero hay zonas del parque donde esa autorización no habilita nada: consúltese la capa de regulación específica de pesca submarina, que este mapa dibuja aparte.':
    'L’art. 47.3 del PORN sotmet la pesca recreativa submarina a autorització prèvia de l’administració competent en medi ambient, a més de la llicència de pesca. L’apartat 5.1.1 de l’annex II del PRUG ho reitera i el tràmit és obert i amb taxa publicada. Però hi ha zones del parc on aquesta autorització no habilita res: consulteu la capa de regulació específica de pesca submarina, que aquest mapa dibuixa a part.',
  'El IDEIB publica este polígono como zona de pesca submarina condicionada: dentro de él la autorización previa del art. 47.3 del PORN sí habilita a pescar, con las condiciones que fija el apartado 5.1.2 del anexo II del PRUG.':
    'L’IDEIB publica aquest polígon com a zona de pesca submarina condicionada: dins seu l’autorització prèvia de l’art. 47.3 del PORN sí que habilita a pescar, amb les condicions que fixa l’apartat 5.1.2 de l’annex II del PRUG.',

  // -- Serra de Tramuntana: PORN ---------------------------------------------
  'El art. 77 del PORN prohíbe la navegación deportiva y de recreo en las zonas de baño y limita la velocidad a 3 nudos en la franja contigua a la costa.':
    'L’art. 77 del PORN prohibeix la navegació esportiva i d’esbarjo a les zones de bany i limita la velocitat a 3 nusos a la franja contigua a la costa.',
  'El art. 79.1 del PORN permite expresamente la pesca recreativa desde embarcación en el ámbito marino del Plan, sin perjuicio de la normativa sectorial de pesca.':
    'L’art. 79.1 del PORN permet expressament la pesca recreativa des d’embarcació a l’àmbit marí del Pla, sens perjudici de la normativa sectorial de pesca.',
  'El art. 79.1 del PORN permite la pesca recreativa pero prohíbe expresamente practicarla desde las zonas terrestres de exclusión del Plan.':
    'L’art. 79.1 del PORN permet la pesca recreativa però prohibeix expressament practicar-la des de les zones terrestres d’exclusió del Pla.',
  'El art. 80.1 del PORN dice literalmente que «la pesca submarina se considera una actividad autorizable». No está prohibida por estar en un espacio protegido, pero tampoco es libre: requiere autorización específica del espacio natural protegido.':
    'L’art. 80.1 del PORN diu literalment que «la pesca submarina es considera una activitat autoritzable». No és prohibida pel fet de ser en un espai protegit, però tampoc no és lliure: requereix autorització específica de l’espai natural protegit.',
  'El art. 82 del PORN prohíbe fondear sobre praderas de Posidonia oceanica y sobre fondos de maërl en el ámbito marino del Plan. El Real Decreto 191/2026 mantiene esa prohibición en todo el Mediterráneo español y la extiende a la Cymodocea nodosa.':
    'L’art. 82 del PORN prohibeix fondejar sobre prades de Posidonia oceanica i sobre fons de maërl a l’àmbit marí del Pla. El Reial Decret 191/2026 manté aquesta prohibició a tot el Mediterrani espanyol i l’estén a la Cymodocea nodosa.',
  'El art. 83.1 del PORN permite el buceo recreativo y deportivo en el ámbito marino del Plan.':
    'L’art. 83.1 del PORN permet el busseig recreatiu i esportiu a l’àmbit marí del Pla.',
  'El Plan Rector de Uso y Gestión puede establecer regulaciones más exhaustivas sobre modalidades, vedas, tallas mínimas, número de capturas, días permitidos y competiciones (art. 79.2).':
    'El Pla Rector d’Ús i Gestió pot establir regulacions més exhaustives sobre modalitats, vedes, talles mínimes, nombre de captures, dies permesos i competicions (art. 79.2).',
  'El Plan Rector de Uso y Gestión puede establecer regulaciones más exhaustivas sobre modalidades, vedas, tallas mínimas, número de capturas, días permitidos y competiciones (art. 80.2).':
    'El Pla Rector d’Ús i Gestió pot establir regulacions més exhaustives sobre modalitats, vedes, talles mínimes, nombre de captures, dies permesos i competicions (art. 80.2).',
  'El Plan Rector de Uso y Gestión puede regular la inmersión en cuevas submarinas y establecer restricciones zonales o temporales más estrictas (arts. 83.1 y 83.4).':
    'El Pla Rector d’Ús i Gestió pot regular la immersió en coves submarines i establir restriccions zonals o temporals més estrictes (arts. 83.1 i 83.4).',

  // -- Ponent de Mallorca: Decret 26/2025 ------------------------------------
  'El art. 5.1 del Decret 26/2025 remite al art. 9 del Decret 41/2015: bucear con escafandra autónoma exige autorización específica de la Dirección General. Las inmersiones en apnea son libres en toda la reserva.':
    'L’art. 5.1 del Decret 26/2025 remet a l’art. 9 del Decret 41/2015: bussejar amb escafandre autònom exigeix autorització específica de la Direcció General. Les immersions en apnea són lliures a tota la reserva.',
  'El art. 5.1 del Decret 26/2025 remite las actividades subacuáticas al art. 9 del Decret 41/2015, cuyo apartado 2 prohíbe llevar, tanto en la inmersión como en la embarcación, cualquier instrumento que pueda usarse para pescar o extraer especies marinas, salvo el cuchillo de seguridad. Eso excluye la pesca submarina en toda la reserva.':
    'L’art. 5.1 del Decret 26/2025 remet les activitats subaquàtiques a l’art. 9 del Decret 41/2015, l’apartat 2 del qual prohibeix dur, tant a la immersió com a l’embarcació, qualsevol instrument que es pugui fer servir per pescar o extreure espècies marines, llevat del ganivet de seguretat. Això exclou la pesca submarina a tota la reserva.',
  'El art. 9.2 del Decret 26/2025 prohíbe toda clase de pesca marítima y de extracción, y la pesca submarina no figura entre las excepciones.':
    'L’art. 9.2 del Decret 26/2025 prohibeix tota classe de pesca marítima i d’extracció, i la pesca submarina no figura entre les excepcions.',

  // -- ses Salines: art. 94 del PRUG -----------------------------------------
  'El art. 94.b del PRUG permite fuera de las áreas de protección estricta la pesca recreativa desde embarcación y la profesional de artes menores, con las limitaciones de la normativa de la Reserva Marina dels Freus y del futuro plan sectorial.':
    'L’art. 94.b del PRUG permet fora de les àrees de protecció estricta la pesca recreativa des d’embarcació i la professional d’arts menors, amb les limitacions de la normativa de la Reserva Marina dels Freus i del futur pla sectorial.',
  'El art. 94.b del PRUG permite la pesca recreativa desde tierra en el ámbito marino del parque fuera de las áreas de protección estricta, pero en los términos y con las limitaciones de la normativa de la Reserva Marina dels Freus y, cuando se apruebe, del plan sectorial de aprovechamientos pesqueros.':
    'L’art. 94.b del PRUG permet la pesca recreativa des de terra a l’àmbit marí del parc fora de les àrees de protecció estricta, però en els termes i amb les limitacions de la normativa de la Reserva Marina dels Freus i, quan s’aprovi, del pla sectorial d’aprofitaments pesquers.',
  'El desembarco está restringido a los lugares autorizados.':
    'El desembarcament està restringit als llocs autoritzats.',
  'El desembarco y el uso público de los islotes están prohibidos. La única excepción es s’Espalmador, donde solo se puede desembarcar por los canales de entrada y salida y transitar por el dominio público y el camino señalizado.':
    'El desembarcament i l’ús públic dels illots hi són prohibits. L’única excepció és s’Espalmador, on només es pot desembarcar pels canals d’entrada i sortida i transitar pel domini públic i el camí senyalitzat.',

  // -- Busseig col·lectiu, punts abalisats i permisos ------------------------
  'El buceo colectivo se hará preferentemente en dos puntos balizados —el islote des Cagaires y el cabo de Llebeig—, con boyas instaladas de abril a octubre y de uso exclusivo de los centros autorizados; la eslora de las embarcaciones amarradas no puede superar los 12 m (arts. 3.1 y 3.3 de la Orden 11/2026).':
    'El busseig col·lectiu es farà preferentment en dos punts abalisats —l’illot des Cagaires i el cap de Llebeig—, amb boies instal·lades d’abril a octubre i d’ús exclusiu dels centres autoritzats; l’eslora de les embarcacions amarrades no pot superar els 12 m (arts. 3.1 i 3.3 de l’Ordre 11/2026).',
  'El buceo colectivo se hará preferentemente en seis puntos balizados —dos en la Isla des Porros, dos en la Losa del Patró Pere y dos en el islote de cala Tirant—, con boyas instaladas de abril a octubre y de uso exclusivo de los centros autorizados; la eslora de las embarcaciones amarradas no puede superar los 12 m (arts. 4.1 y 4.3 de la Orden 11/2026).':
    'El busseig col·lectiu es farà preferentment en sis punts abalisats —dos a l’Illa des Porros, dos a la Llosa del Patró Pere i dos a l’illot de cala Tirant—, amb boies instal·lades d’abril a octubre i d’ús exclusiu dels centres autoritzats; l’eslora de les embarcacions amarrades no pot superar els 12 m (arts. 4.1 i 4.3 de l’Ordre 11/2026).',
  'El buceo con escafandra autónoma está permitido con permiso individual o colectivo. Además, el art. 6.2 del Decreto 45/2018 obliga a cumplir el marco normativo de los planes de gestión de los espacios Natura 2000 en las partes de la reserva incluidas en ellos.':
    'El busseig amb escafandre autònom és permès amb permís individual o col·lectiu. A més, l’art. 6.2 del Decret 45/2018 obliga a complir el marc normatiu dels plans de gestió dels espais Natura 2000 a les parts de la reserva incloses en ells.',
  'El buceo con escafandra autónoma está permitido en el perímetro general, excepto en el área de protección especial, y requiere autorización específica de la Dirección General (art. 9.1 del Decret 41/2015, que incluye esta reserva en su ámbito por el art. 2.1.d). Las inmersiones en apnea son libres.':
    'El busseig amb escafandre autònom és permès al perímetre general, excepte a l’àrea de protecció especial, i requereix autorització específica de la Direcció General (art. 9.1 del Decret 41/2015, que inclou aquesta reserva al seu àmbit per l’art. 2.1.d). Les immersions en apnea són lliures.',
  'El buceo con escafandra autónoma está permitido en la reserva salvo en la zona de protección máxima de s’Espardell, y requiere permiso individual o colectivo del órgano competente (art. 9.1 del Decret 41/2015).':
    'El busseig amb escafandre autònom és permès a la reserva llevat de la zona de protecció màxima de s’Espardell, i requereix permís individual o col·lectiu de l’òrgan competent (art. 9.1 del Decret 41/2015).',
  'El buceo con escafandra autónoma está permitido fuera del área de protección especial, pero requiere permiso individual o colectivo de la Dirección General de Pesca. Las inmersiones en apnea son libres en toda la reserva.':
    'El busseig amb escafandre autònom és permès fora de l’àrea de protecció especial, però requereix permís individual o col·lectiu de la Direcció General de Pesca. Les immersions en apnea són lliures a tota la reserva.',
  'El buceo con escafandra autónoma se puede practicar con permiso individual o colectivo, salvo en el interior de las cuevas submarinas de la Illa de l’Aire, que el art. 3.1.d del Decreto 26/2019 prohíbe expresamente.':
    'El busseig amb escafandre autònom es pot practicar amb permís individual o col·lectiu, llevat de l’interior de les coves submarines de la Illa de l’Aire, que l’art. 3.1.d del Decret 26/2019 prohibeix expressament.',
  'El buceo con escafandra autónoma se puede practicar en la reserva con permiso individual o colectivo del órgano competente (art. 9.1 del Decret 41/2015).':
    'El busseig amb escafandre autònom es pot practicar a la reserva amb permís individual o col·lectiu de l’òrgan competent (art. 9.1 del Decret 41/2015).',
  'El buceo con escafandra requiere permiso individual o colectivo del órgano competente. Hay dos zonas aptas, y en el cabo de Cavalleria las inmersiones están contingentadas.':
    'El busseig amb escafandre requereix permís individual o col·lectiu de l’òrgan competent. Hi ha dues zones aptes, i al cap de Cavalleria les immersions estan contingentades.',
  'El buceo con escafandra requiere permiso individual o colectivo. Las inmersiones en apnea son libres en toda la zona autonómica.':
    'El busseig amb escafandre requereix permís individual o col·lectiu. Les immersions en apnea són lliures a tota la zona autonòmica.',
  'Empresas con ánimo de lucro: autorización siempre.':
    'Empreses amb ànim de lucre: autorització sempre.',
  'El uso del campo de boyas queda sujeto al régimen que establezca su entidad gestora.':
    'L’ús del camp de boies queda subjecte al règim que estableixi la seva entitat gestora.',

  // -- Ormeigs concrets i àmbits ---------------------------------------------
  'El curricán de fondo no se permite en el ámbito estatal.':
    'El curricà de fons no és permès a l’àmbit estatal.',
  'El esparavel y el salabre no se permiten en el ámbito estatal.':
    'L’esparver i el salabre no són permesos a l’àmbit estatal.',
  'El esparavel puede autorizarse como aparejo tradicional.':
    'L’esparver es pot autoritzar com a ormeig tradicional.',
  'El esparavel requiere autorización especial del Consell Insular.':
    'L’esparver requereix autorització especial del Consell Insular.',
  'El único aparejo admitido desde tierra es el esparavel. El Decreto 15/2022 lo exceptuó de la prohibición de pescar entre la costa y los 10 m de profundidad y lo añadió a la lista de aparejos permitidos del art. 4.3.':
    'L’únic ormeig admès des de terra és l’esparver. El Decret 15/2022 el va exceptuar de la prohibició de pescar entre la costa i els 10 m de fondària i el va afegir a la llista d’ormeigs permesos de l’art. 4.3.',
  'El marisqueo recreativo desde embarcación sí está exceptuado y se puede practicar.':
    'El marisqueig recreatiu des d’embarcació sí que és exceptuat i es pot practicar.',
  'El lanzamiento y la varada de embarcaciones deben hacerse por canales debidamente señalizados.':
    'L’avarada i la treta d’embarcacions s’han de fer per canals degudament senyalitzats.',
  'El lanzamiento y la varada de embarcaciones deben hacerse por canales señalizados.':
    'L’avarada i la treta d’embarcacions s’han de fer per canals senyalitzats.',

  // -- Espais Natura 2000 grans -----------------------------------------------
  'El mayor espacio Natura 2000 marino autonómico de Mallorca: 30.961 ha sobre las dos bahías del norte. Su plan de gestión está en tramitación, así que solo le aplica el Decret 91/2023, que remite la pesca recreativa a la normativa general.':
    'El major espai Natura 2000 marí autonòmic de Mallorca: 30.961 ha sobre les dues badies del nord. El seu pla de gestió és en tramitació, així que només li aplica el Decret 91/2023, que remet la pesca recreativa a la normativa general.',
  'El mayor espacio Natura 2000 marino autonómico de Menorca, 5.091 ha frente a la costa norte. Se solapa con la Reserva Marina del Nord de Menorca, y es el régimen de la reserva el que restringe allí la pesca. Plan de gestión en tramitación.':
    'El major espai Natura 2000 marí autonòmic de Menorca, 5.091 ha davant la costa nord. Se superposa amb la Reserva Marina del Nord de Menorca, i és el règim de la reserva el que hi restringeix la pesca. Pla de gestió en tramitació.',

  // -- Resums d’espais Natura 2000 -------------------------------------------
  'Espacio con doble designación en la costa nordeste. Su plan de gestión regula el fondeo y la navegación; la pesca se rige por la normativa general.':
    'Espai amb doble designació a la costa nord-est. El seu pla de gestió regula el fondeig i la navegació; la pesca es regeix per la normativa general.',
  'Espacio con doble designación que se solapa con el ámbito marino del Parc Natural de s’Albufera des Grau. Aviso: dentro del parque natural la pesca submarina está prohibida en unas zonas concretas y es autorizable en otras, con una zonificación que este mapa todavía no tiene cargada.':
    'Espai amb doble designació que se superposa amb l’àmbit marí del Parc Natural de s’Albufera des Grau. Avís: dins el parc natural la pesca submarina és prohibida en unes zones concretes i autoritzable en unes altres, amb una zonificació que aquest mapa encara no té carregada.',
  'Espacio costero del noroeste de Menorca. Plan de gestión en tramitación.':
    'Espai costaner del nord-oest de Menorca. Pla de gestió en tramitació.',
  'Espacio costero del sur de Menorca. Plan de gestión en tramitación.':
    'Espai costaner del sud de Menorca. Pla de gestió en tramitació.',
  'Espacio costero junto a Cala Rajada, con doble designación. No figura en el art. 2 del Decret 91/2023, pero sí en el ámbito del Pla de Gestió Costa de Llevant.':
    'Espai costaner vora Cala Rajada, amb doble designació. No figura a l’art. 2 del Decret 91/2023, però sí a l’àmbit del Pla de Gestió Costa de Llevant.',
  'Espacio de 14.813 ha en el nordeste de Mallorca, con doble designación y una franja marina. Se solapa con figuras del llevant, donde manda el régimen de esas figuras. Plan de gestión en tramitación.':
    'Espai de 14.813 ha al nord-est de Mallorca, amb doble designació i una franja marina. Se superposa amb figures del llevant, on mana el règim d’aquelles figures. Pla de gestió en tramitació.',
  'Espacio marino del suroeste de Menorca. Plan de gestión en tramitación.':
    'Espai marí del sud-oest de Menorca. Pla de gestió en tramitació.',
  'Espacio marítimo-terrestre de la costa de llevant. La pesca se rige por la normativa general; el fondeo y la navegación, por el plan de gestión.':
    'Espai maritimoterrestre de la costa de llevant. La pesca es regeix per la normativa general; el fondeig i la navegació, pel pla de gestió.',
  'Espacio marítimo-terrestre de la Serra de Tramuntana. Pesca recreativa según la normativa general; buceo permitido y fondeo condicionado por el Pla de Gestió.':
    'Espai maritimoterrestre de la Serra de Tramuntana. Pesca recreativa segons la normativa general; busseig permès i fondeig condicionat pel Pla de Gestió.',
  'Espacio marítimo-terrestre del norte de Menorca. Plan de gestión en tramitación.':
    'Espai maritimoterrestre del nord de Menorca. Pla de gestió en tramitació.',
  'Espacio marítimo-terrestre entre Valldemossa y Deià, con extensas praderas de Posidonia oceanica bien conservadas. Pesca recreativa según la normativa general; fondeo condicionado.':
    'Espai maritimoterrestre entre Valldemossa i Deià, amb extenses prades de Posidonia oceanica ben conservades. Pesca recreativa segons la normativa general; fondeig condicionat.',
  'Espacio Natura 2000 con ámbito marino en la Serra de Tramuntana. La pesca recreativa, incluida la submarina, se rige por la normativa general: la figura no la prohíbe. El fondeo sí está condicionado por el plan de gestión.':
    'Espai Natura 2000 amb àmbit marí a la Serra de Tramuntana. La pesca recreativa, inclosa la submarina, es regeix per la normativa general: la figura no la prohibeix. El fondeig sí que està condicionat pel pla de gestió.',
  'Espacio Natura 2000 de sa Dragonera, con doble designación. Se solapa con la reserva marina del Freu de sa Dragonera y con el parque natural: allí manda el régimen de esas figuras, no la remisión a la normativa general de los arts. 4 y 5 del Decret 91/2023.':
    'Espai Natura 2000 de sa Dragonera, amb doble designació. Se superposa amb la reserva marina del Freu de sa Dragonera i amb el parc natural: allà mana el règim d’aquelles figures, no la remissió a la normativa general dels arts. 4 i 5 del Decret 91/2023.',
  'Franja litoral de la costa de llevant de Mallorca. La pesca se rige por la normativa general; el fondeo y la navegación tienen normas propias en el plan de gestión.':
    'Franja litoral de la costa de llevant de Mallorca. La pesca es regeix per la normativa general; el fondeig i la navegació tenen normes pròpies al pla de gestió.',
  'Franja litoral de la costa sur de Menorca. Plan de gestión en tramitación.':
    'Franja litoral de la costa sud de Menorca. Pla de gestió en tramitació.',
  'Franja marina de 1.127 ha del Paratge Natural, regulada por el PORN de 2007. Aquí la pesca submarina no está prohibida, pero sí es una actividad autorizable: hace falta autorización del espacio protegido, además de la licencia. Se solapa parcialmente con las ZEC marinas de la Serra de Tramuntana, que por sí solas no exigen esa autorización.':
    'Franja marina de 1.127 ha del Paratge Natural, regulada pel PORN de 2007. Aquí la pesca submarina no és prohibida, però sí que és una activitat autoritzable: cal autorització de l’espai protegit, a més de la llicència. Se superposa parcialment amb les ZEC marines de la Serra de Tramuntana, que per si soles no exigeixen aquesta autorització.',
  'La Orden AAA/1299/2014 se limita a aprobar la propuesta de inclusión de este espacio en la lista de lugares de importancia comunitaria: no regula la pesca recreativa ni las actividades subacuáticas, y el espacio no tiene todavía plan de gestión aprobado. En particular, no existe ninguna prohibición de pesca submarina derivada de esta figura.':
    'L’Ordre AAA/1299/2014 es limita a aprovar la proposta d’inclusió d’aquest espai a la llista de llocs d’importància comunitària: no regula la pesca recreativa ni les activitats subaquàtiques, i l’espai encara no té pla de gestió aprovat. En particular, no hi ha cap prohibició de pesca submarina derivada d’aquesta figura.',

  // -- sa Dragonera: zones d’usos restringits --------------------------------
  'Franja de 0,1 millas frente al litoral oeste de la isla, entre cabo de Tramuntana y cabo de Llebeig. Es el núcleo de la reserva: únicamente se permiten actividades científicas expresamente autorizadas por la Secretaría General de Pesca.':
    'Franja de 0,1 milles davant el litoral oest de l’illa, entre cap de Tramuntana i cap de Llebeig. És el nucli de la reserva: únicament s’hi permeten activitats científiques expressament autoritzades per la Secretaria General de Pesca.',
  'Franja de 50 metros de ancho frente al litoral oeste de sa Dragonera, en el cabo de Llebeig. Se puede bucear con autorización y hacer snorkel desde embarcación, pero no pescar en ninguna modalidad.':
    'Franja de 50 metres d’amplada davant el litoral oest de sa Dragonera, al cap de Llebeig. S’hi pot bussejar amb autorització i fer snorkel des d’embarcació, però no pescar en cap modalitat.',
  'Franja de 50 metros de ancho frente al litoral oeste de sa Dragonera, en el cabo de Tramuntana. Se puede bucear con autorización y hacer snorkel desde embarcación, pero no pescar en ninguna modalidad.':
    'Franja de 50 metres d’amplada davant el litoral oest de sa Dragonera, al cap de Tramuntana. S’hi pot bussejar amb autorització i fer snorkel des d’embarcació, però no pescar en cap modalitat.',
  'Franja de 50 metros de ancho frente al litoral oeste de sa Dragonera, en el Far Vell. Se puede bucear con autorización y hacer snorkel desde embarcación, pero no pescar en ninguna modalidad.':
    'Franja de 50 metres d’amplada davant el litoral oest de sa Dragonera, al Far Vell. S’hi pot bussejar amb autorització i fer snorkel des d’embarcació, però no pescar en cap modalitat.',
  'Franja de 50 metros de ancho frente al litoral oeste de sa Dragonera, en la cova de sa Finestra. Se puede bucear con autorización y hacer snorkel desde embarcación, pero no pescar en ninguna modalidad.':
    'Franja de 50 metres d’amplada davant el litoral oest de sa Dragonera, a la cova de sa Finestra. S’hi pot bussejar amb autorització i fer snorkel des d’embarcació, però no pescar en cap modalitat.',
  'Franja de 50 metros de ancho frente al litoral oeste de sa Dragonera, en la punta de s’Alga. Se puede bucear con autorización y hacer snorkel desde embarcación, pero no pescar en ninguna modalidad.':
    'Franja de 50 metres d’amplada davant el litoral oest de sa Dragonera, a la punta de s’Alga. S’hi pot bussejar amb autorització i fer snorkel des d’embarcació, però no pescar en cap modalitat.',
  'La apnea sí se permite en las zonas de usos restringidos del ámbito estatal.':
    'L’apnea sí que és permesa a les zones d’usos restringits de l’àmbit estatal.',
  'La navegación dentro de la Reserva Marina del Freu de sa Dragonera está limitada a menos de 10 nudos.':
    'La navegació dins la Reserva Marina del Freu de sa Dragonera és limitada a menys de 10 nusos.',
  'Está prohibido llevar, tanto en la inmersión como en la embarcación, cualquier instrumento que pueda usarse para pescar o extraer especies marinas, salvo el cuchillo de seguridad. Eso excluye la pesca submarina.':
    'És prohibit dur, tant a la immersió com a l’embarcació, qualsevol instrument que es pugui fer servir per pescar o extreure espècies marines, llevat del ganivet de seguretat. Això exclou la pesca submarina.',
  'Ese tránsito debe hacerse siempre con el arma descargada y colgada de la boya de señalización.':
    'Aquest trànsit s’ha de fer sempre amb l’arma descarregada i penjada de la boia de senyalització.',

  // -- Llevant estatal: fondeig i excepcions ---------------------------------
  'En el resto de la reserva, solo por emergencia relacionada con la seguridad de la vida humana en el mar, la seguridad nacional o el orden público.':
    'A la resta de la reserva, només per emergència relacionada amb la seguretat de la vida humana a la mar, la seguretat nacional o l’ordre públic.',
  'Fondeo libre en Cala Agulla, por fuera de la zona de baño y de los canales de acceso.':
    'Fondeig lliure a Cala Agulla, per fora de la zona de bany i dels canals d’accés.',
  'Fondeo libre únicamente en Cala Moltó o Es Gulló, Cala Agulla y Son Moll, por fuera de las zonas de baño y de los canales de acceso.':
    'Fondeig lliure únicament a Cala Moltó o Es Gulló, Cala Agulla i Son Moll, per fora de les zones de bany i dels canals d’accés.',
  'Fuera de esos lugares el fondeo está prohibido salvo emergencia.':
    'Fora d’aquests llocs el fondeig és prohibit llevat d’emergència.',
  'En la zona de reserva integral se prohíben tanto la pesca marítima como las actividades subacuáticas.':
    'A la zona de reserva integral es prohibeixen tant la pesca marítima com les activitats subaquàtiques.',

  // -- Cabrera: fondeig i amarratges -----------------------------------------
  'Fondeo diurno solo en las zonas habilitadas, entre una hora después del amanecer y una hora antes del ocaso: 30 fondeos en es Burri, 12 en la zona del muelle y 8 en la Coveta Roja.':
    'Fondeig diürn només a les zones habilitades, entre una hora després de l’alba i una hora abans de l’ocàs: 30 fondeigs a es Burri, 12 a la zona del moll i 8 a la Coveta Roja.',
  'La autorización permite amarrar a las boyas del puerto o fondear en las zonas de uso restringido de fondeo diurno.':
    'L’autorització permet amarrar a les boies del port o fondejar a les zones d’ús restringit de fondeig diürn.',
  'La delimitación de las áreas de fondeo está en el plano 8 del anexo IV del PRUG y no se publica como capa cartográfica: este mapa no la tiene.':
    'La delimitació de les àrees de fondeig és al plànol 8 de l’annex IV del PRUG i no es publica com a capa cartogràfica: aquest mapa no la té.',
  'Hay que respetar en todo momento los fondos cubiertos por praderas de posidonia.':
    'Cal respectar en tot moment els fons coberts per prades de posidònia.',
  'Hay que evitar ruidos excesivos —motores, bocinas, música— para no alterar las colonias de aves que anidan en estas costas.':
    'Cal evitar renous excessius —motors, botzines, música— per no alterar les colònies d’aus que nien en aquestes costes.',

  // -- ses Salines i s’Estany des Peix ---------------------------------------
  'En el Estany des Peix de Formentera están vedados la fluixa y el curricán, tanto de fondo como de superficie: es zona de alevinaje y zona de baño.':
    'A l’Estany des Peix de Formentera hi són vedats la fluixa i el curricà, tant de fons com de superfície: és zona d’alevinatge i zona de bany.',
  'En s’Estany des Peix las anclas y ferretones no se pueden fijar en ningún caso sobre comunidades de Caulerpa prolifera, Cymodocea nodosa ni Zostera noltii.':
    'A s’Estany des Peix les àncores i ferrets no es poden fixar en cap cas sobre comunitats de Caulerpa prolifera, Cymodocea nodosa ni Zostera noltii.',
  'La navegación no está prohibida con carácter general en el ámbito marino del parque, pero el art. 102 declara incompatibles las motos acuáticas y los aparatos náuticos recreativos análogos, y el art. 118 prohíbe navegar dentro de las zonas de baño.':
    'La navegació no és prohibida amb caràcter general a l’àmbit marí del parc, però l’art. 102 declara incompatibles les motos aquàtiques i els aparells nàutics recreatius anàlegs, i l’art. 118 prohibeix navegar dins les zones de bany.',
  'La navegación no está prohibida con carácter general en el ámbito marino del parque, pero sí lo está en la zona de exclusión y en las zonas húmedas, y el PRUG prohíbe los circuitos de motos náuticas y de otros vehículos a motor en todo el parque.':
    'La navegació no és prohibida amb caràcter general a l’àmbit marí del parc, però sí que ho és a la zona d’exclusió i a les zones humides, i el PRUG prohibeix els circuits de motos nàutiques i d’altres vehicles a motor a tot el parc.',

  // -- s’Albufera des Grau: busseig per mida de grup -------------------------
  'Grupos de 8 o más: autorización previa del órgano gestor del parque.':
    'Grups de 8 o més: autorització prèvia de l’òrgan gestor del parc.',
  'Grupos de menos de 8 personas: permitido sin autorización.':
    'Grups de menys de 8 persones: permès sense autorització.',
  'En la bahía d’Addaia el anexo II del PRUG añade una zona sin ningún tipo de pesca ni marisqueo, ni profesional ni recreativo.':
    'A la badia d’Addaia l’annex II del PRUG hi afegeix una zona sense cap tipus de pesca ni marisqueig, ni professional ni recreatiu.',
  'Excepciones únicas: gestión del parque y actividades científicas o de estudio debidamente autorizadas.':
    'Excepcions úniques: gestió del parc i activitats científiques o d’estudi degudament autoritzades.',
  'La información oficial del parque lo confirma sin matices: «queda totalmente prohibida por normativa la pesca recreativa con la modalidad de pesca submarina o de fusil».':
    'La informació oficial del parc ho confirma sense matisos: «queda totalment prohibida per normativa la pesca recreativa amb la modalitat de pesca submarina o de fusell».',

  // -- Remissions a plans de gestió superposats ------------------------------
  'En la parte de la reserva incluida en el LIC Punta Prima - Illa de l’Aire (ES5310073) hay que cumplir además el marco normativo de su plan de gestión.':
    'A la part de la reserva inclosa al LIC Punta Prima - Illa de l’Aire (ES5310073) cal complir a més el marc normatiu del seu pla de gestió.',
  'En las zonas de la reserva incluidas en el LIC nord de Sant Joan (ES5310112), el LIC y ZEPA de Tagomago (ES0000082), el LIC àrea marina de Tagomago (ES5310107), el LIC y ZEPA dels illots de Santa Eulària, Redona i es Canar (ES0000242) y la ZEPA del espacio marino del levante de Eivissa (ES0000517) hay que cumplir además su plan de gestión.':
    'A les zones de la reserva incloses al LIC nord de Sant Joan (ES5310112), el LIC i ZEPA de Tagomago (ES0000082), el LIC àrea marina de Tagomago (ES5310107), el LIC i ZEPA dels illots de Santa Eulària, Redona i es Canar (ES0000242) i la ZEPA de l’espai marí del llevant d’Eivissa (ES0000517) cal complir a més el seu pla de gestió.',
  'En lo no previsto rige el Decret 25/2018 sobre la conservación de la Posidonia oceanica, y el RD 191/2026 en todo el Mediterráneo español.':
    'En allò no previst regeix el Decret 25/2018 sobre la conservació de la Posidonia oceanica, i el RD 191/2026 a tot el Mediterrani espanyol.',
  'Es Trenc es uno de los sistemas litorales con más superficie de fanerógamas marinas de Mallorca: aquí esa prohibición general afecta a buena parte del fondo.':
    'Es Trenc és un dels sistemes litorals amb més superfície de fanerògames marines de Mallorca: aquí aquesta prohibició general afecta bona part del fons.',
  'La ley de declaración no enumera el buceo ni entre los usos admitidos ni entre los prohibidos, y el art. 4.1.b hace autorizables precisamente los usos no definidos como una cosa ni la otra. Corresponde al PORN concretar en qué condiciones.':
    'La llei de declaració no enumera el busseig ni entre els usos admesos ni entre els prohibits, i l’art. 4.1.b fa autoritzables precisament els usos no definits com una cosa ni l’altra. Correspon al PORN concretar en quines condicions.',

  // -- Illa de l’Aire i Nord de Menorca: navegació i fondeig -----------------
  'En las zonas de fondeo libre que rodean la isla se pueden instalar hasta tres puntos de fondeo ecológico, a los que las embarcaciones deben amarrarse preferentemente.':
    'A les zones de fondeig lliure que envolten l’illa s’hi poden instal·lar fins a tres punts de fondeig ecològic, als quals les embarcacions s’han d’amarrar preferentment.',
  'En toda la bahía hay que navegar a 3 nudos o menos, o a la mínima velocidad de gobierno, con el motor a ralentí, para no remover el sedimento.':
    'A tota la badia cal navegar a 3 nusos o menys, o a la mínima velocitat de govern, amb el motor al ralentí, per no remoure el sediment.',
  'La Orden 11/2026 limita la velocidad y prohíbe las motos de agua, pero su art. 2 lo hace solo dentro de la Reserva Marina de la Isla del Aire. Para el Nord de Menorca esa orden únicamente regula el buceo colectivo, y la regulación de actividades de la reserva no establece límites de navegación.':
    'L’Ordre 11/2026 limita la velocitat i prohibeix les motos aquàtiques, però el seu art. 2 ho fa només dins la Reserva Marina de la Illa de l’Aire. Per al Nord de Menorca aquesta ordre únicament regula el busseig col·lectiu, i la regulació d’activitats de la reserva no estableix límits de navegació.',
  'La Orden de 2006 regula pesca, extracción y buceo, pero no establece ninguna limitación específica de navegación para esta reserva. Se aplica la normativa general de navegación.':
    'L’Ordre de 2006 regula pesca, extracció i busseig, però no estableix cap limitació específica de navegació per a aquesta reserva. S’hi aplica la normativa general de navegació.',

  // -- Excepcions científiques i potestats de la Direcció General ------------
  'La dirección general competente puede establecer limitaciones adicionales, temporales o permanentes, publicándolas en boletín oficial y balizando la zona.':
    'La direcció general competent pot establir limitacions addicionals, temporals o permanents, publicant-les al butlletí oficial i abalisant la zona.',
  'La dirección general competente puede restringir la actividad por zonas y periodos, y controlar las inmersiones en cuevas submarinas, mediante resolución publicada.':
    'La direcció general competent pot restringir l’activitat per zones i períodes, i controlar les immersions en coves submarines, mitjançant resolució publicada.',
  'La Dirección General de Pesca puede autorizar el fondeo por motivos de índole científica, de seguridad o de salvamento.':
    'La Direcció General de Pesca pot autoritzar el fondeig per motius d’índole científica, de seguretat o de salvament.',
  'La Dirección General de Pesca puede autorizar la inmersión y la toma de muestras de flora y fauna con finalidades científicas.':
    'La Direcció General de Pesca pot autoritzar la immersió i la presa de mostres de flora i fauna amb finalitats científiques.',
  'La Dirección General de Pesca puede autorizar la inmersión, el fondeo y la toma de muestras por motivos de índole científica, de seguridad o de salvamento (art. 3.3).':
    'La Direcció General de Pesca pot autoritzar la immersió, el fondeig i la presa de mostres per motius d’índole científica, de seguretat o de salvament (art. 3.3).',

  // -- Vedes generals i permisos ---------------------------------------------
  'Está prohibida cualquier modalidad de pesca hasta que se establezca un plan de pesca, y la pesca submarina no figura entre las excepciones.':
    'És prohibida qualsevol modalitat de pesca fins que s’estableixi un pla de pesca, i la pesca submarina no figura entre les excepcions.',
  'Está prohibida cualquier modalidad de pesca hasta que se establezca un plan de pesca. La excepción alcanza al marisqueo recreativo desde embarcación, que sí está permitido, pero no a la pesca.':
    'És prohibida qualsevol modalitat de pesca fins que s’estableixi un pla de pesca. L’excepció abasta el marisqueig recreatiu des d’embarcació, que sí que és permès, però no la pesca.',
  'Es una de las excepciones tasadas del art. 3.2 del Decreto 26/2019, con licencia específica trienal, tres aparejos y días hábiles limitados. No se puede practicar en la zona especial de buceo.':
    'És una de les excepcions taxades de l’art. 3.2 del Decret 26/2019, amb llicència específica triennal, tres ormeigs i dies hàbils limitats. No es pot practicar a la zona especial de busseig.',
  'Esparavel: requiere autorización específica y solo se permite en el ámbito autonómico.':
    'Esparver: requereix autorització específica i només és permès a l’àmbit autonòmic.',
  'Fisga: solo de día.': 'Fitó: només de dia.',
  'La pesca con potera y la fluixa se puede practicar cada día.':
    'La pesca amb poteres i la fluixa es pot practicar cada dia.',
  'Gratuita. El art. 4.2 del Decreto 38/2018 la fija como bianual; el trámite y la página de la reserva la publican hoy como trienal, igual que en el resto de reservas.':
    'Gratuïta. L’art. 4.2 del Decret 38/2018 la fixa com a biennal; el tràmit i la pàgina de la reserva la publiquen avui com a triennal, igual que a la resta de reserves.',
  'Gratuita. Exige disponer de licencia de pesca recreativa de embarcación en vigor.':
    'Gratuïta. Exigeix disposar de llicència de pesca recreativa d’embarcació en vigor.',
  'Gratuita. Exige licencia de pesca recreativa de embarcación en vigor y llevar registro de capturas.':
    'Gratuïta. Exigeix llicència de pesca recreativa d’embarcació en vigor i dur registre de captures.',
  'Gratuita. Licencia específica que la Dirección General de Pesca entrega o renueva cada tres años (art. 5.2). Obliga a llevar registro de capturas.':
    'Gratuïta. Llicència específica que la Direcció General de Pesca lliura o renova cada tres anys (art. 5.2). Obliga a dur registre de captures.',
  'Exige licencia de pesca submarina en vigor y tarjeta federativa de actividades subacuáticas. Tasa de 53,90 € por autorización y por espacio natural protegido':
    'Exigeix llicència de pesca submarina en vigor i targeta federativa d’activitats subaquàtiques. Taxa de 53,90 € per autorització i per espai natural protegit',
  'Índice oficial de la evolución normativa desde la Orden de 15 de junio de 1999 (BOCAIB núm. 81) hasta la Orden 11/2026. El enlace que el propio Govern publica para la Orden de 1999 sirve un extracto parcial del BOCAIB que no contiene su articulado':
    'Índex oficial de l’evolució normativa des de l’Ordre de 15 de juny de 1999 (BOCAIB núm. 81) fins a l’Ordre 11/2026. L’enllaç que el mateix Govern publica per a l’Ordre de 1999 serveix un extracte parcial del BOCAIB que no en conté l’articulat',

  // -- Pesca submarina: on està prohibida ------------------------------------
  'La pesca submarina está expresamente prohibida en el ámbito estatal de la reserva, junto con el jigging, el spinning y los concursos de pesca de recreo.':
    'La pesca submarina està expressament prohibida a l’àmbit estatal de la reserva, juntament amb el jigging, l’spinning i els concursos de pesca d’esbarjo.',
  'La pesca submarina está expresamente prohibida en el ámbito estatal de la reserva.':
    'La pesca submarina està expressament prohibida a l’àmbit estatal de la reserva.',
  'La pesca submarina está expresamente prohibida en todo el ámbito del Parc Natural de ses Salines. El art. 11.4.c la enumera entre los usos prohibidos de las regulaciones generales y el art. 94.c la repite en el régimen pesquero, junto al arrastre, el cerco, el palangre de superficie y los concursos de pesca.':
    'La pesca submarina està expressament prohibida a tot l’àmbit del Parc Natural de ses Salines. L’art. 11.4.c l’enumera entre els usos prohibits de les regulacions generals i l’art. 94.c la repeteix al règim pesquer, juntament amb l’arrossegament, el cèrcol, el palangre de superfície i els concursos de pesca.',
  'La pesca submarina está expresamente prohibida en todo el ámbito marino del Parc Natural Maritimoterrestre Es Trenc-Salobrar de Campos. El art. 4.1.c de la Ley 2/2017 la enumera entre los usos prohibidos, junto a la acuicultura intensiva y a cualquier actividad que suponga una alteración significativa de los hábitats y las especies del parque.':
    'La pesca submarina està expressament prohibida a tot l’àmbit marí del Parc Natural Maritimoterrestre Es Trenc-Salobrar de Campos. L’art. 4.1.c de la Llei 2/2017 l’enumera entre els usos prohibits, juntament amb l’aqüicultura intensiva i qualsevol activitat que suposi una alteració significativa dels hàbitats i les espècies del parc.',
  'La pesca submarina está prohibida en la zona de protección especial.':
    'La pesca submarina és prohibida a la zona de protecció especial.',
  'La pesca submarina está prohibida en la zona de veda.':
    'La pesca submarina és prohibida a la zona de veda.',
  'La pesca submarina está prohibida en todo el parque: bucear con fusil no es una opción aquí en ninguna modalidad.':
    'La pesca submarina és prohibida a tot el parc: bussejar amb fusell no hi és una opció en cap modalitat.',
  'La pesca submarina no está permitida en el área de protección especial.':
    'La pesca submarina no és permesa a l’àrea de protecció especial.',
  'La pesca submarina no está permitida en ningún punto de la reserva.':
    'La pesca submarina no és permesa a cap punt de la reserva.',
  'La pesca deportiva está prohibida «en cualquiera de sus modalidades» (apartado jj), lo que incluye la submarina. El apartado mm) prohíbe además llevar durante la inmersión cualquier instrumento utilizable para pescar o extraer especies marinas, salvo el cuchillo reglamentario.':
    'La pesca esportiva és prohibida «en qualsevol de les seves modalitats» (apartat jj), la qual cosa inclou la submarina. L’apartat mm) prohibeix a més dur durant la immersió qualsevol instrument utilitzable per pescar o extreure espècies marines, llevat del ganivet reglamentari.',
  'La prohibición alcanza el ámbito marino completo del parque, sin distinguir zonas de la zonificación del PORN.':
    'La prohibició abasta l’àmbit marí complet del parc, sense distingir zones de la zonificació del PORN.',
  'La prohibición se aplica al ámbito marino completo del parque, que es más extenso que el de la Reserva Marina del Llevant.':
    'La prohibició s’aplica a l’àmbit marí complet del parc, que és més extens que el de la Reserva Marina del Llevant.',
  'La prohibición incluye las áreas marinas de protección estricta, por remisión al art. 30.3 del PORN.':
    'La prohibició inclou les àrees marines de protecció estricta, per remissió a l’art. 30.3 del PORN.',
  'La prohibición alcanza el buceo recreativo en cualquier modalidad.':
    'La prohibició abasta el busseig recreatiu en qualsevol modalitat.',
  'No depende de la aprobación de ningún PRUG: deriva directamente de la ley de declaración, en vigor desde 2017.':
    'No depèn de l’aprovació de cap PRUG: deriva directament de la llei de declaració, en vigor des del 2017.',
  'Los buceadores no pueden llevar instrumentos de pesca submarina: la actividad está prohibida en todo el ámbito marino (art. 4.1.c).':
    'Els bussejadors no poden dur instruments de pesca submarina: l’activitat és prohibida a tot l’àmbit marí (art. 4.1.c).',
  'Los buceadores no pueden llevar instrumentos de pesca submarina: la pesca recreativa submarina está prohibida en todo el ámbito marino del parque (art. 40.1.h).':
    'Els bussejadors no poden dur instruments de pesca submarina: la pesca recreativa submarina és prohibida a tot l’àmbit marí del parc (art. 40.1.h).',
  'Los buceadores no pueden llevar, en la mano ni en la embarcación, instrumentos utilizables para pescar o extraer especies marinas (art. 83.2).':
    'Els bussejadors no poden dur, ni a la mà ni a l’embarcació, instruments utilitzables per pescar o extreure espècies marines (art. 83.2).',
  'Licencia de pesca submarina en vigor.': 'Llicència de pesca submarina en vigor.',

  // -- Pesca de superfície: on no és permesa ---------------------------------
  'La pesca desde artefactos flotantes solo está permitida en el ámbito autonómico.':
    'La pesca des d’artefactes flotants només és permesa a l’àmbit autonòmic.',
  'La pesca desde costa no está permitida en la zona de protección especial.':
    'La pesca des de costa no és permesa a la zona de protecció especial.',
  'La pesca desde tierra está expresamente prohibida en el ámbito estatal de la reserva.':
    'La pesca des de terra està expressament prohibida a l’àmbit estatal de la reserva.',
  'La pesca recreativa desde costa no está permitida en esta zona de alta protección.':
    'La pesca recreativa des de costa no és permesa en aquesta zona d’alta protecció.',
  'La pesca recreativa desde embarcación no está permitida en esta zona de alta protección.':
    'La pesca recreativa des d’embarcació no és permesa en aquesta zona d’alta protecció.',
  'La pesca recreativa desde embarcación no está permitida en la zona de protección especial.':
    'La pesca recreativa des d’embarcació no és permesa a la zona de protecció especial.',
  'No permitida en la zona de protección especial ni en la zona de veda.':
    'No permesa a la zona de protecció especial ni a la zona de veda.',
  'No permitida en la zona de protección especial.': 'No permesa a la zona de protecció especial.',
  'La pesca y el marisqueo recreativos desde tierra están expresamente exceptuados de la prohibición general que rige mientras no haya plan de pesca.':
    'La pesca i el marisqueig recreatius des de terra estan expressament exceptuats de la prohibició general que regeix mentre no hi hagi pla de pesca.',
  'La pesca y el marisqueo recreativos están permitidos en la reserva excepto en la zona de reserva integral situada entre el cap Ferrutx y la Penya des Llamp.':
    'La pesca i el marisqueig recreatius són permesos a la reserva excepte a la zona de reserva integral situada entre el cap Ferrutx i la Penya des Llamp.',
  'La pesca y el marisqueo recreativos están permitidos en la reserva excepto en la zona de reserva integral.':
    'La pesca i el marisqueig recreatius són permesos a la reserva excepte a la zona de reserva integral.',
  'La pesca con volantín o curricán de superficie solo se puede practicar los martes, jueves, sábados, domingos y festivos nacionales, autonómicos e insulares. Con potera se puede pescar cada día.':
    'La pesca amb volantí o curricà de superfície només es pot practicar els dimarts, dijous, dissabtes, diumenges i festius nacionals, autonòmics i insulars. Amb poteres es pot pescar cada dia.',
  'La única actividad pesquera extractiva admitida es la profesional artesanal, tradicional y selectiva de las embarcaciones incluidas en el censo del parque, y solo en las modalidades y épocas expresamente autorizadas.':
    'L’única activitat pesquera extractiva admesa és la professional artesanal, tradicional i selectiva de les embarcacions incloses al cens del parc, i només en les modalitats i èpoques expressament autoritzades.',
  'Mismo régimen que desde costa: el PORN prohíbe las competiciones de pesca deportiva y toda pesca en el área de reserva integral, y prohíbe además a la flota profesional el arrastre y el cerco en todo el ámbito marino del parque.':
    'Mateix règim que des de costa: el PORN prohibeix les competicions de pesca esportiva i tota pesca a l’àrea de reserva integral, i prohibeix a més a la flota professional l’arrossegament i el cèrcol a tot l’àmbit marí del parc.',
  'Mismo régimen que la pesca desde costa: el art. 4.1.a la admite como uso pesquero y como uso común del art. 31 de la Ley de Costas, condicionada a la compatibilidad con los objetivos de protección y a lo que disponga el instrumento de planificación.':
    'Mateix règim que la pesca des de costa: l’art. 4.1.a l’admet com a ús pesquer i com a ús comú de l’art. 31 de la Llei de Costes, condicionada a la compatibilitat amb els objectius de protecció i al que disposi l’instrument de planificació.',
  'La zonificación terrestre del PORN no está cargada en este mapa: antes de pescar desde tierra hay que comprobar en la cartografía oficial si el punto es zona de exclusión.':
    'La zonificació terrestre del PORN no està carregada en aquest mapa: abans de pescar des de terra cal comprovar a la cartografia oficial si el punt és zona d’exclusió.',

  // -- Busseig: apnea, nocturnes i escoles -----------------------------------
  'Las inmersiones en apnea son libres en toda la reserva marina y no necesitan permiso.':
    'Les immersions en apnea són lliures a tota la reserva marina i no necessiten permís.',
  'Las inmersiones en apnea son libres en toda la zona autonómica.':
    'Les immersions en apnea són lliures a tota la zona autonòmica.',
  'Las inmersiones en apnea son libres.': 'Les immersions en apnea són lliures.',
  'Las inmersiones nocturnas requieren una autorización especial adicional de la Dirección General de Pesca.':
    'Les immersions nocturnes requereixen una autorització especial addicional de la Direcció General de Pesca.',
  'Las inmersiones recreativas son incompatibles con las áreas de protección estricta, donde solo se admiten las de gestión del parque o las científicas debidamente autorizadas.':
    'Les immersions recreatives són incompatibles amb les àrees de protecció estricta, on només s’admeten les de gestió del parc o les científiques degudament autoritzades.',
  'Las inmersiones son libres en el resto de la reserva «excepto en las zonas de protección especial»: el buceo con escafandra no está admitido aquí.':
    'Les immersions són lliures a la resta de la reserva «excepte a les zones de protecció especial»: el busseig amb escafandre no hi és admès.',
  'Las tareas formativas de escuela de buceo solo pueden hacerse en la cala de Ses Pedretes, con notificación previa a la Dirección General de Pesca.':
    'Les tasques formatives d’escola de busseig només es poden fer a la cala de Ses Pedretes, amb notificació prèvia a la Direcció General de Pesca.',
  'Las actividades subacuáticas de recreo solo figuran entre los usos permitidos de las zonas de usos restringidos. En el resto de la reserva estatal no están recogidas, y lo no recogido queda prohibido.':
    'Les activitats subaquàtiques d’esbarjo només figuren entre els usos permesos de les zones d’usos restringits. A la resta de la reserva estatal no hi són recollides, i allò no recollit queda prohibit.',
  'Las actividades subacuáticas de recreo solo se permiten fuera de la reserva integral.':
    'Les activitats subaquàtiques d’esbarjo només es permeten fora de la reserva integral.',
  'Las actividades subacuáticas están prohibidas en la reserva integral. La Dirección General puede autorizarlas por motivos científicos, de seguridad o de salvamento.':
    'Les activitats subaquàtiques són prohibides a la reserva integral. La Direcció General les pot autoritzar per motius científics, de seguretat o de salvament.',
  'Los clubes o centros que ofrezcan la actividad deben acreditarse ante el organismo gestor de los espacios naturales protegidos.':
    'Els clubs o centres que ofereixin l’activitat s’han d’acreditar davant l’organisme gestor dels espais naturals protegits.',
  'Máximo 12 submarinistas por punto y visita, y nunca más de 48 personas buceando a la vez en el entorno inmediato del islote (boyas 3, 4, 5 y 6).':
    'Màxim 12 submarinistes per punt i visita, i mai més de 48 persones bussejant alhora a l’entorn immediat de l’illot (boies 3, 4, 5 i 6).',
  'Máximo 12 submarinistas por punto y visita, y nunca más de 48 personas buceando a la vez en la zona.':
    'Màxim 12 submarinistes per punt i visita, i mai més de 48 persones bussejant alhora a la zona.',
  'Máximo 15 buceadores por grupo, salvo que el órgano gestor lo eleve por motivos de conservación.':
    'Màxim 15 bussejadors per grup, llevat que l’òrgan gestor ho elevi per motius de conservació.',

  // -- Vedes: què regulen i què no -------------------------------------------
  'La veda creada en 2009 regula únicamente la pesca recreativa; no restringe el buceo. Esta zona no es la zona de protección especial, así que sigue aplicando el régimen general de la reserva: buceo con escafandra con autorización específica de la Dirección General (art. 9.1 del Decret 41/2015). Las inmersiones en apnea son libres.':
    'La veda creada el 2009 regula únicament la pesca recreativa; no restringeix el busseig. Aquesta zona no és la zona de protecció especial, així que continua aplicant-se el règim general de la reserva: busseig amb escafandre amb autorització específica de la Direcció General (art. 9.1 del Decret 41/2015). Les immersions en apnea són lliures.',
  'La veda regula únicamente la pesca recreativa; no restringe el buceo. Esta zona no es la de protección máxima, así que sigue aplicando el régimen general de la reserva: buceo con escafandra con permiso individual o colectivo.':
    'La veda regula únicament la pesca recreativa; no restringeix el busseig. Aquesta zona no és la de protecció màxima, així que continua aplicant-se el règim general de la reserva: busseig amb escafandre amb permís individual o col·lectiu.',
  'La veda regula únicamente la pesca recreativa; no restringe el buceo. Esta zona no es una zona de protección especial, así que rige el régimen general de la reserva: permiso individual o colectivo e inmersiones libres.':
    'La veda regula únicament la pesca recreativa; no restringeix el busseig. Aquesta zona no és una zona de protecció especial, així que regeix el règim general de la reserva: permís individual o col·lectiu i immersions lliures.',
  'Las resoluciones que crean y prorrogan esta zona de veda regulan únicamente la pesca recreativa; no mencionan la navegación.':
    'Les resolucions que creen i prorroguen aquesta zona de veda regulen únicament la pesca recreativa; no esmenten la navegació.',
  'La zona está fuera de la reserva marina y su régimen transitorio solo regula la actividad pesquera. Ninguna norma propia de esta zona toca el buceo.':
    'La zona és fora de la reserva marina i el seu règim transitori només regula l’activitat pesquera. Cap norma pròpia d’aquesta zona no toca el busseig.',
  'La zona está fuera de la reserva marina y su régimen transitorio solo regula la actividad pesquera. Ninguna norma propia de esta zona toca la navegación.':
    'La zona és fora de la reserva marina i el seu règim transitori només regula l’activitat pesquera. Cap norma pròpia d’aquesta zona no toca la navegació.',
  'La regulación de actividades de esta reserva no organiza sus disposiciones por zonas de navegación ni menciona límites de navegación en el perímetro general.':
    'La regulació d’activitats d’aquesta reserva no organitza les seves disposicions per zones de navegació ni esmenta límits de navegació al perímetre general.',
  'La regulación de la reserva restringe en estas zonas la pesca, la extracción y el buceo, pero no la navegación de paso.':
    'La regulació de la reserva restringeix en aquestes zones la pesca, l’extracció i el busseig, però no la navegació de pas.',

  // -- Navegació: velocitats i motos ------------------------------------------
  'Las embarcaciones de pesca de arrastre en tránsito pueden navegar hasta 12 nudos cuando crucen la reserva hacia sus caladeros tradicionales.':
    'Les embarcacions de pesca d’arrossegament en trànsit poden navegar fins a 12 nusos quan travessin la reserva cap als seus calladors tradicionals.',
  'Los buques en tránsito deben navegar a más de 3 y menos de 6 nudos, y está prohibido el uso de motos de agua (arts. 7.4 y 7.5 del Decret 26/2025).':
    'Els vaixells en trànsit han de navegar a més de 3 i menys de 6 nusos, i és prohibit l’ús de motos aquàtiques (arts. 7.4 i 7.5 del Decret 26/2025).',
  'Los buques en tránsito deben navegar a más de 3 y menos de 6 nudos, y está prohibido el uso de motos de agua (arts. 8.4 y 8.5 del Decret 26/2025).':
    'Els vaixells en trànsit han de navegar a més de 3 i menys de 6 nusos, i és prohibit l’ús de motos aquàtiques (arts. 8.4 i 8.5 del Decret 26/2025).',

  // -- Fondeig: zones i excepcions -------------------------------------------
  'Las zonas de fondeo prohibido y de fondeo regulado están dibujadas en este mapa como figura aparte: conviene comprobar en cuál cae el punto.':
    'Les zones de fondeig prohibit i de fondeig regulat estan dibuixades en aquest mapa com a figura a part: convé comprovar en quina cau el punt.',
  'La zonificación de fondeo del PRUG es anterior a la ampliación de 2019 y no cubre las aguas incorporadas entonces.':
    'La zonificació de fondeig del PRUG és anterior a l’ampliació del 2019 i no cobreix les aigües incorporades aleshores.',
  'Máximo de cincuenta permisos por día para fondear en el puerto de Cabrera; la autorización va, como norma general, de uno a siete días.':
    'Màxim de cinquanta permisos per dia per fondejar al port de Cabrera; l’autorització va, com a norma general, d’un a set dies.',

  // -- Límits d’ormeig i de captura -------------------------------------------
  'Las excepciones alcanzan a la pesca profesional de artes menores (artes de parada en el Racó de s’Almadrava y jonquillera) y al muestreo científico (art. 8.2 del Decret 26/2025).':
    'Les excepcions abasten la pesca professional d’arts menors (arts de parada al Racó de s’Almadrava i jonquillera) i el mostreig científic (art. 8.2 del Decret 26/2025).',
  'Límite de captura de un ejemplar por día y pescador para las especies sujetas a él.':
    'Límit de captura d’un exemplar per dia i pescador per a les espècies que hi estan subjectes.',
  'Los anzuelos del volantín deben superar los 7 mm de anchura, salvo para el raor, que deben superar los 5,7 mm.':
    'Els hams del volantí han de superar els 7 mm d’amplada, llevat del raor, que han de superar els 5,7 mm.',
  'Los anzuelos del volantín deben superar los 7 mm de seno, salvo para el raor, que deben superar los 5,7 mm.':
    'Els hams del volantí han de superar els 7 mm de si, llevat del raor, que han de superar els 5,7 mm.',
  'Los armadores de las embarcaciones autorizadas deben llevar registro de las capturas obtenidas; no hacerlo implica la pérdida de la licencia.':
    'Els armadors de les embarcacions autoritzades han de dur registre de les captures obtingudes; no fer-ho implica la pèrdua de la llicència.',
  'Máximo 1 caña por pescador.': 'Màxim 1 canya per pescador.',
  'Máximo de 4 anzuelos desde embarcación, con un solo aparejo por pescador.':
    'Màxim de 4 hams des d’embarcació, amb un sol ormeig per pescador.',
  'Máximo de dos líneas por embarcación para el curricán de superficie.':
    'Màxim de dues línies per embarcació per al curricà de superfície.',
  'Máximo de una línea por persona y cuatro anzuelos.':
    'Màxim d’una línia per persona i quatre hams.',
  'No se puede pescar desde artefactos flotantes.':
    'No es pot pescar des d’artefactes flotants.',
  'No se puede pescar fondeado.': 'No es pot pescar fondejat.',
  'No se pueden llevar a bordo aparejos no permitidos.':
    'No es poden dur a bord ormeigs no permesos.',
  'No se pueden utilizar peces ni cefalópodos vivos como cebo.':
    'No es poden utilitzar peixos ni cefalòpodes vius com a esquer.',

  // -- Resums de zona restants ------------------------------------------------
  'LIC de 7.123 ha entre cap Enderrocat y cap Blanc. Comparte nombre con la ZEPA ES0000081 pero es otro espacio, con otro perímetro. Plan de gestión en tramitación.':
    'LIC de 7.123 ha entre cap Enderrocat i cap Blanc. Comparteix nom amb la ZEPA ES0000081 però és un altre espai, amb un altre perímetre. Pla de gestió en tramitació.',
  'LIC marino estatal entre Mallorca y Menorca, con fondos de maërl, coralígeno y praderas de posidonia. Aviso aparte: la Orden AAA/1479/2016 estableció dentro del canal una zona protegida de pesca que afecta al arrastre, dragas, jábegas y redes similares —pesca profesional— sobre dos polígonos concretos que este mapa no tiene cargados.':
    'LIC marí estatal entre Mallorca i Menorca, amb fons de maërl, coral·ligen i prades de posidònia. Avís a part: l’Ordre AAA/1479/2016 va establir dins el canal una zona protegida de pesca que afecta l’arrossegament, les dragues, les xàvegues i xarxes similars —pesca professional— sobre dos polígons concrets que aquest mapa no té carregats.',
  'Litoral de cales entre Manacor y Felanitx. No figura en el art. 2 del Decret 91/2023, pero sí en el ámbito del Pla de Gestió Costa de Llevant, cuyas normas de fondeo y navegación se le aplican.':
    'Litoral de cales entre Manacor i Felanitx. No figura a l’art. 2 del Decret 91/2023, però sí a l’àmbit del Pla de Gestió Costa de Llevant, les normes de fondeig i navegació del qual se li apliquen.',
  'Los 9,8 ha del ámbito marino del parque clasificados como zona de exclusión, en el interior del port d’Addaia. Corresponden al área marina de protección estricta del PORN y coinciden con el ámbito marino de las reservas naturales. Aquí no se puede pescar, fondear, navegar ni bucear.':
    'Les 9,8 ha de l’àmbit marí del parc classificades com a zona d’exclusió, a l’interior del port d’Addaia. Corresponen a l’àrea marina de protecció estricta del PORN i coincideixen amb l’àmbit marí de les reserves naturals. Aquí no s’hi pot pescar, fondejar, navegar ni bussejar.',
  'No se pueden utilizar peces vivos como cebo.':
    'No es poden utilitzar peixos vius com a esquer.',

  // -- Nuclis de màxima protecció ---------------------------------------------
  'Núcleo de la reserva del Migjorn, entre Cala Figuereta y la Punta des Baus. Ni pesca recreativa en ninguna modalidad, ni buceo con escafandra.':
    'Nucli de la reserva del Migjorn, entre Cala Figuereta i la Punta des Baus. Ni pesca recreativa en cap modalitat, ni busseig amb escafandre.',
  'Núcleo de la reserva, al sur de Cap Enderrocat. Es la zona de mayor restricción: ni pesca ni buceo con escafandra.':
    'Nucli de la reserva, al sud de Cap Enderrocat. És la zona de més restricció: ni pesca ni busseig amb escafandre.',
  'Núcleo de la reserva, en el perímetro marino de la isla de s’Espardell. El art. 2 del Decreto 63/1999 prohíbe aquí cuatro cosas a la vez: toda pesca marítima, la extracción de flora y fauna, el fondeo de embarcaciones y el buceo con escafandra autónoma.':
    'Nucli de la reserva, al perímetre marí de l’illa de s’Espardell. L’art. 2 del Decret 63/1999 hi prohibeix quatre coses alhora: tota pesca marítima, l’extracció de flora i fauna, el fondeig d’embarcacions i el busseig amb escafandre autònom.',
  'Núcleo de la reserva, entre el cap Ferrutx y la Penya des Llamp. Ni pesca ni marisqueo recreativos, y tampoco buceo.':
    'Nucli de la reserva, entre el cap Ferrutx i la Penya des Llamp. Ni pesca ni marisqueig recreatius, i tampoc busseig.',
  'Núcleo de máxima protección en el perímetro marino de la Llosa des Figueral. Aquí se prohíben a la vez las actividades subacuáticas, la pesca marítima, la extracción de flora y fauna y el fondeo de embarcaciones.':
    'Nucli de màxima protecció al perímetre marí de la Llosa des Figueral. Aquí es prohibeixen alhora les activitats subaquàtiques, la pesca marítima, l’extracció de flora i fauna i el fondeig d’embarcacions.',
  'Núcleo protegido alrededor de l’Illa del Toro. No se permite ninguna modalidad de pesca recreativa. El buceo sí, con permiso y sin inmersiones nocturnas individuales.':
    'Nucli protegit al voltant de l’Illa del Toro. No s’hi permet cap modalitat de pesca recreativa. El busseig sí, amb permís i sense immersions nocturnes individuals.',
  'Núcleo protegido alrededor de l’illa des Sec, en la bahía de Palma. No se permite ninguna modalidad de pesca recreativa.':
    'Nucli protegit al voltant de l’illa des Sec, a la badia de Palma. No s’hi permet cap modalitat de pesca recreativa.',

  // -- Perímetres generals de reserva ----------------------------------------
  'Perímetro general de la reserva, 719 ha frente al sudeste de Menorca. Pesca submarina prohibida y toda pesca prohibida desde la propia isla. Desde embarcación, volantín y curricán solo cinco días a la semana. Navegación limitada a 10 nudos y motos de agua prohibidas.':
    'Perímetre general de la reserva, 719 ha davant el sud-est de Menorca. Pesca submarina prohibida i tota pesca prohibida des de la mateixa illa. Des d’embarcació, volantí i curricà només cinc dies a la setmana. Navegació limitada a 10 nusos i motos aquàtiques prohibides.',
  'Perímetro general de la reserva, entre Andratx y Palma. La pesca recreativa está permitida con aparejos limitados; desde embarcación exige autorización trienal y registro de capturas. La pesca profesional de artes menores requiere figurar en un censo de embarcaciones autorizadas.':
    'Perímetre general de la reserva, entre Andratx i Palma. La pesca recreativa hi és permesa amb ormeigs limitats; des d’embarcació exigeix autorització triennal i registre de captures. La pesca professional d’arts menors requereix figurar en un cens d’embarcacions autoritzades.',
  'Perímetro general de la reserva, entre Eivissa y Formentera. La pesca recreativa está permitida salvo en la zona de protección máxima de s’Espardell y en la zona de veda; la submarina, prohibida en toda la reserva. Desde embarcación exige autorización trienal y registro de capturas.':
    'Perímetre general de la reserva, entre Eivissa i Formentera. La pesca recreativa hi és permesa llevat de la zona de protecció màxima de s’Espardell i de la zona de veda; la submarina, prohibida a tota la reserva. Des d’embarcació exigeix autorització triennal i registre de captures.',
  'Perímetro general de la reserva, entre la Punta des Morter, la Illa des Porros y el Cap Gros. Pesca submarina prohibida —y prohibido incluso llevar el fusil a bordo—. La pesca recreativa solo se puede practicar martes, jueves, sábados, domingos y festivos.':
    'Perímetre general de la reserva, entre la Punta des Morter, la Illa des Porros i el Cap Gros. Pesca submarina prohibida —i prohibit fins i tot dur el fusell a bord—. La pesca recreativa només es pot practicar dimarts, dijous, dissabtes, diumenges i festius.',
  'Perímetro general de la reserva. La pesca desde costa está permitida a diario con aparejos limitados; desde embarcación exige autorización trienal y registro de capturas.':
    'Perímetre general de la reserva. La pesca des de costa hi és permesa a diari amb ormeigs limitats; des d’embarcació exigeix autorització triennal i registre de captures.',
  'Perímetro general de la reserva. La pesca recreativa está permitida solo determinados días de la semana y requiere autorización cuando se practica desde embarcación.':
    'Perímetre general de la reserva. La pesca recreativa hi és permesa només determinats dies de la setmana i requereix autorització quan es practica des d’embarcació.',
  'Perímetro general de la reserva. Pesca submarina prohibida; desde embarcación, solo volantín, potera y curricán de superficie con autorización trienal; desde tierra, aparejos tradicionales con autorización específica. El buceo debe cumplir además los planes de gestión de los espacios Natura 2000 que se solapan con la reserva.':
    'Perímetre general de la reserva. Pesca submarina prohibida; des d’embarcació, només volantí, poteres i curricà de superfície amb autorització triennal; des de terra, ormeigs tradicionals amb autorització específica. El busseig ha de complir a més els plans de gestió dels espais Natura 2000 que se superposen amb la reserva.',
  'Perímetro marino de l’Illa del Toro, entre el Clot des Moro y la cala de s’Art. Prohibida toda clase de pesca marítima y de extracción, con la excepción del muestreo científico y de artes menores profesionales concretas. El buceo colectivo está limitado a puntos, visitas y número de submarinistas.':
    'Perímetre marí de l’Illa del Toro, entre el Clot des Moro i la cala de s’Art. Prohibida tota classe de pesca marítima i d’extracció, amb l’excepció del mostreig científic i d’arts menors professionals concretes. El busseig col·lectiu és limitat a punts, visites i nombre de submarinistes.',
  'Perímetro marino de les Illes Malgrats y dels Conills, entre la Punta de na Foradada y el cap Negret. Prohibida toda clase de pesca y extracción salvo excepciones tasadas, con ventanas estacionales para la pesca recreativa.':
    'Perímetre marí de les Illes Malgrats i dels Conills, entre la Punta de na Foradada i el cap Negret. Prohibida tota classe de pesca i extracció llevat d’excepcions taxades, amb finestres estacionals per a la pesca recreativa.',

  // -- Resums d’espais Natura 2000 petits ------------------------------------
  'Pequeña ZEC costera de 13 ha en la costa de llevant. No figura en el art. 2 del Decret 91/2023, pero sí en el ámbito del Pla de Gestió Costa de Llevant.':
    'Petita ZEC costanera de 13 ha a la costa de llevant. No figura a l’art. 2 del Decret 91/2023, però sí a l’àmbit del Pla de Gestió Costa de Llevant.',
  'Pequeña ZEC costera de 39 ha, dentro del Pla de Gestió de la costa est de Menorca.':
    'Petita ZEC costanera de 39 ha, dins el Pla de Gestió de la costa est de Menorca.',
  'Pequeño espacio marino junto al cabo de Cala Figuera, en la parte exterior de la bahía de Palma. Plan de gestión en tramitación.':
    'Petit espai marí vora el cap de Cala Figuera, a la part exterior de la badia de Palma. Pla de gestió en tramitació.',

  // -- Pesca permesa: finestres, dies i condicions ---------------------------
  'Permitida como excepción a la prohibición general, solo con caña, del 1 de enero al 30 de abril y nunca desde los islotes.':
    'Permesa com a excepció a la prohibició general, només amb canya, de l’1 de gener al 30 d’abril i mai des dels illots.',
  'Permitida como excepción a la prohibición general, solo con potera y volantín en sus ventanas estacionales y con la autorización trienal de la reserva.':
    'Permesa com a excepció a la prohibició general, només amb poteres i volantí en les seves finestres estacionals i amb l’autorització triennal de la reserva.',
  'Permitida con aparejos limitados, excepto desde la costa de sa Dragonera y sus islotes, donde no se puede pescar.':
    'Permesa amb ormeigs limitats, excepte des de la costa de sa Dragonera i els seus illots, on no s’hi pot pescar.',
  'Permitida con aparejos limitados, salvo entre la cala de s’Art y el Morro d’en Feliu, donde la pesca y el marisqueo están prohibidos.':
    'Permesa amb ormeigs limitats, llevat d’entre la cala de s’Art i el Morro d’en Feliu, on la pesca i el marisqueig hi són prohibits.',
  'Permitida con autorización trienal específica y registro obligatorio de las capturas.':
    'Permesa amb autorització triennal específica i registre obligatori de les captures.',
  'Permitida con los aparejos del art. 5 del Decret 41/2015, salvo desde la propia Illa de l’Aire, donde el art. 3.1.c del Decreto 26/2019 prohíbe toda pesca y marisqueo.':
    'Permesa amb els ormeigs de l’art. 5 del Decret 41/2015, llevat des de la mateixa Illa de l’Aire, on l’art. 3.1.c del Decret 26/2019 prohibeix tota pesca i marisqueig.',
  'Permitida en aguas interiores con autorización trienal y aparejos limitados. Es el único ámbito de la reserva donde también se puede pescar desde artefactos flotantes.':
    'Permesa a aigües interiors amb autorització triennal i ormeigs limitats. És l’únic àmbit de la reserva on també es pot pescar des d’artefactes flotants.',
  'Permitida en el perímetro general con autorización trienal específica y obligación de registrar las capturas. No se puede practicar en la zona de protección máxima ni en la zona de veda.':
    'Permesa al perímetre general amb autorització triennal específica i obligació de registrar les captures. No es pot practicar a la zona de protecció màxima ni a la zona de veda.',
  'Permitida en el perímetro general con los aparejos tasados, pero no en la zona de protección máxima de s’Espardell ni en la zona de veda de pesca recreativa.':
    'Permesa al perímetre general amb els ormeigs taxats, però no a la zona de protecció màxima de s’Espardell ni a la zona de veda de pesca recreativa.',
  'Permitida los mismos cinco días que desde tierra, con autorización trienal específica y obligación de registrar las capturas.':
    'Permesa els mateixos cinc dies que des de terra, amb autorització triennal específica i obligació de registrar les captures.',
  'Permitida lunes, martes, sábados, domingos y festivos, con autorización específica sujeta a tasa.':
    'Permesa dilluns, dimarts, dissabtes, diumenges i festius, amb autorització específica subjecta a taxa.',
  'Permitida lunes, martes, sábados, domingos y festivos, con autorización individual anual sujeta a tasa.':
    'Permesa dilluns, dimarts, dissabtes, diumenges i festius, amb autorització individual anual subjecta a taxa.',
  'Permitida martes, jueves, sábados, domingos y festivos, con aparejos limitados, salvo en la reserva integral.':
    'Permesa dimarts, dijous, dissabtes, diumenges i festius, amb ormeigs limitats, llevat de la reserva integral.',
  'Permitida martes, jueves, sábados, domingos y festivos, con autorización trienal y registro obligatorio de capturas.':
    'Permesa dimarts, dijous, dissabtes, diumenges i festius, amb autorització triennal i registre obligatori de captures.',
  'Permitida martes, viernes, sábados, domingos y festivos, con autorización trienal. La pesca con potera y la fluixa se puede practicar cada día.':
    'Permesa dimarts, divendres, dissabtes, diumenges i festius, amb autorització triennal. La pesca amb poteres i la fluixa es pot practicar cada dia.',
  'Permitida previa autorización de la Secretaría General de Pesca, en las modalidades y condiciones del anexo 3 de la Orden APA/690/2018.':
    'Permesa amb autorització prèvia de la Secretaria General de Pesca, en les modalitats i condicions de l’annex 3 de l’Ordre APA/690/2018.',
  'Permitida previa autorización de la Secretaría General de Pesca, en las modalidades y condiciones del anexo 3.':
    'Permesa amb autorització prèvia de la Secretaria General de Pesca, en les modalitats i condicions de l’annex 3.',
  'Permitida sin autorización en las modalidades de caña al volantín y recolecta de puu, como en el resto de la reserva estatal fuera de la integral.':
    'Permesa sense autorització en les modalitats de canya al volantí i recol·lecció de puu, com a la resta de la reserva estatal fora de la integral.',
  'Permitida sin autorización en las modalidades de caña al volantín y recolecta de puu, con los aparejos que permite la Comunidad Autónoma.':
    'Permesa sense autorització en les modalitats de canya al volantí i recol·lecció de puu, amb els ormeigs que permet la Comunitat Autònoma.',
  'Permitida solo cinco días a la semana y con aparejos tasados, y en ningún caso dentro de las zonas de protección especial ni de la zona de veda.':
    'Permesa només cinc dies a la setmana i amb ormeigs taxats, i en cap cas dins les zones de protecció especial ni de la zona de veda.',
  'Permitida solo desde embarcación, en días concretos y con dos aparejos, previa autorización específica anual de la Secretaría General de Pesca.':
    'Permesa només des d’embarcació, en dies concrets i amb dos ormeigs, amb autorització específica anual prèvia de la Secretaria General de Pesca.',
  'Permitida solo en ventanas estacionales y con la autorización trienal de la reserva.':
    'Permesa només en finestres estacionals i amb l’autorització triennal de la reserva.',
  'Permitida solo martes, viernes, sábados, domingos y festivos.':
    'Permesa només dimarts, divendres, dissabtes, diumenges i festius.',
  'Permitida también la recolección de puu.': 'Permesa també la recol·lecció de puu.',
  'Permitida todos los días en el perímetro general, con aparejos limitados y un máximo de 6 anzuelos.':
    'Permesa tots els dies al perímetre general, amb ormeigs limitats i un màxim de 6 hams.',
  'Permitida todos los días en el perímetro general, con autorización trienal específica y obligación de registrar las capturas.':
    'Permesa tots els dies al perímetre general, amb autorització triennal específica i obligació de registrar les captures.',
  'Permitida únicamente entre el 1 de enero y el 30 de abril, y nunca desde los islotes.':
    'Permesa únicament entre l’1 de gener i el 30 d’abril, i mai des dels illots.',
  'Permitidos también el spinning y la recolección de puu.':
    'Permesos també l’spinning i la recol·lecció de puu.',
  'Permitidos también el spinning, la fisga, el salabre y la recolección de puu.':
    'Permesos també l’spinning, el fitó, el salabre i la recol·lecció de puu.',
  'Prohibida desde la costa de sa Dragonera y desde los islotes.':
    'Prohibida des de la costa de sa Dragonera i des dels illots.',
  'Prohibida en la zona de protección especial, en la zona de veda y en el Parc Natural d’Es Trenc-Salobrar.':
    'Prohibida a la zona de protecció especial, a la zona de veda i al Parc Natural d’Es Trenc-Salobrar.',
  'Prohibida en la zona especial de buceo.': 'Prohibida a la zona especial de busseig.',
  'Prohibida la pesca y el marisqueo entre la cala de s’Art y el Morro d’en Feliu.':
    'Prohibida la pesca i el marisqueig entre la cala de s’Art i el Morro d’en Feliu.',
  'Prohibida la pesca recreativa desde las zonas terrestres de exclusión que delimita el PORN.':
    'Prohibida la pesca recreativa des de les zones terrestres d’exclusió que delimita el PORN.',
  'Prohibido acercarse a menos de 150 m de los puntos de artes de parada cuando estén calados.':
    'Prohibit acostar-se a menys de 150 m dels punts d’arts de parada quan són calats.',

  // -- Poteres i finestres estacionals ---------------------------------------
  'Potera para cefalópodos: del 1 de octubre al 31 de diciembre.':
    'Poteres per a cefalòpodes: de l’1 d’octubre al 31 de desembre.',
  'Potera, del 1 de octubre al 31 de diciembre: máximo 1 línea por pescador con 2 poteras.':
    'Poteres, de l’1 d’octubre al 31 de desembre: màxim 1 línia per pescador amb 2 poteres.',
  'Potera: 1 por pescador.': 'Poteres: 1 per pescador.',
  'Potera: máximo 1 línea con 2 poteras por pescador.':
    'Poteres: màxim 1 línia amb 2 poteres per pescador.',
  'Potera: máximo 1 por pescador.': 'Poteres: màxim 1 per pescador.',

  // -- Busseig: permisos i límits per punt -----------------------------------
  'Permitido con permiso individual o colectivo, sin inmersiones nocturnas individuales (art. 5.2 del Decret 26/2025).':
    'Permès amb permís individual o col·lectiu, sense immersions nocturnes individuals (art. 5.2 del Decret 26/2025).',
  'Permitido con permiso, salvo en el sector noroeste, entre el Clot des Moro y els Pans, donde el buceo recreativo está absolutamente prohibido. El buceo colectivo solo puede practicarse en 6 puntos balizados, con un máximo de 12 submarinistas por punto y visita.':
    'Permès amb permís, llevat del sector nord-oest, entre el Clot des Moro i els Pans, on el busseig recreatiu és absolutament prohibit. El busseig col·lectiu només es pot practicar en 6 punts abalisats, amb un màxim de 12 submarinistes per punt i visita.',
  'Permitido con permiso. El buceo colectivo solo puede practicarse en 4 puntos balizados, con un máximo de 12 submarinistas por punto y visita.':
    'Permès amb permís. El busseig col·lectiu només es pot practicar en 4 punts abalisats, amb un màxim de 12 submarinistes per punt i visita.',
  'Prohibidas las inmersiones desde tierra.': 'Prohibides les immersions des de terra.',
  'Prohibido alimentar a la fauna durante las inmersiones (feeding).':
    'Prohibit alimentar la fauna durant les immersions (feeding).',
  'Prohibida la alimentación o «feeding» de la fauna (apartado 5.3.4.2).':
    'Prohibida l’alimentació o «feeding» de la fauna (apartat 5.3.4.2).',
  'Prohibida la alimentación o «feeding» de las especies marinas (art. 83.3).':
    'Prohibida l’alimentació o «feeding» de les espècies marines (art. 83.3).',
  'Prohibida la manipulación o alimentación de las especies.':
    'Prohibida la manipulació o alimentació de les espècies.',
  'Prohibida la recolección o extracción de organismos, vivos o muertos, salvo por motivos científicos previamente justificados y autorizados.':
    'Prohibida la recol·lecció o extracció d’organismes, vius o morts, llevat de motius científics prèviament justificats i autoritzats.',

  // -- Fondeig, navegació i activitats incompatibles -------------------------
  'Obligatorio amarrar a las boyas habilitadas: no se puede echar el ancla sobre el fondo.':
    'Obligatori amarrar a les boies habilitades: no s’hi pot llançar l’àncora sobre el fons.',
  'Prohibido cualquier tipo de fondeo, salvo fuerza mayor.':
    'Prohibit qualsevol tipus de fondeig, llevat de força major.',
  'Prohibido anclar sobre posidonia en toda la reserva integral (Decret 71/2016, art. 2.2).':
    'Prohibit ancorar sobre posidònia a tota la reserva integral (Decret 71/2016, art. 2.2).',
  'Prohibido con carácter general fondear sobre Posidonia oceanica; si hay praderas próximas, tampoco la cadena ni los demás elementos del fondeo pueden afectarlas (ap. 5.6.1).':
    'Prohibit amb caràcter general fondejar sobre Posidonia oceanica; si hi ha prades properes, tampoc la cadena ni els altres elements del fondeig no les poden afectar (ap. 5.6.1).',
  'Prohibida la instalación de nuevos campos de fondeo y de otros elementos náuticos que supongan un aumento de embarcaciones motorizadas, hasta que se disponga del estudio de capacidad de carga previsto en el plan.':
    'Prohibida la instal·lació de nous camps de fondeig i d’altres elements nàutics que suposin un augment d’embarcacions motoritzades, fins que es disposi de l’estudi de capacitat de càrrega previst al pla.',
  'Prohibida la navegación deportiva y de recreo en las zonas de baño debidamente indicadas.':
    'Prohibida la navegació esportiva i d’esbarjo a les zones de bany degudament indicades.',
  'Prohibida la navegación en la zona de exclusión marina, que este mapa dibuja como figura aparte.':
    'Prohibida la navegació a la zona d’exclusió marina, que aquest mapa dibuixa com a figura a part.',
  'Prohibida cualquier actividad recreativa de navegación y el baño dentro de s’Albufera des Grau y las demás zonas húmedas (art. 50.6 del PORN).':
    'Prohibida qualsevol activitat recreativa de navegació i el bany dins s’Albufera des Grau i les altres zones humides (art. 50.6 del PORN).',
  'Prohibido cualquier tipo de vertido desde las embarcaciones (art. 40.1.a).':
    'Prohibit qualsevol tipus d’abocament des de les embarcacions (art. 40.1.a).',
  'Prohibidas las competiciones y las excursiones o rutas organizadas de motonáutica (art. 40.1.i).':
    'Prohibides les competicions i les excursions o rutes organitzades de motonàutica (art. 40.1.i).',
  'Prohibidas las competiciones y los entrenamientos deportivos con emisión de ruidos o gases, incluidas las carreras de vehículos a motor acuáticos (art. 102.h).':
    'Prohibides les competicions i els entrenaments esportius amb emissió de renous o gasos, incloses les curses de vehicles a motor aquàtics (art. 102.h).',
  'Prohibidas las embarcaciones que presten servicios particulares lucrativos, salvo las actividades debidamente autorizadas como las de buceo (art. 102.f).':
    'Prohibides les embarcacions que prestin serveis particulars lucratius, llevat de les activitats degudament autoritzades com les de busseig (art. 102.f).',
  'Prohibidas las fiestas en embarcaciones (party boats o asimilables) y la emisión de ruido mediante dispositivos de música o similares (art. 40.1.k).':
    'Prohibides les festes en embarcacions (party boats o assimilables) i l’emissió de renou mitjançant dispositius de música o similars (art. 40.1.k).',
  'Prohibidas las motos acuáticas y otros aparatos náuticos recreativos análogos —esquí, paracaidismo, flotadores y demás aparatos remolcados— salvo los de los servicios públicos de rescate (art. 102.e).':
    'Prohibides les motos aquàtiques i altres aparells nàutics recreatius anàlegs —esquí, paracaigudisme, flotadors i altres aparells remolcats— llevat dels dels serveis públics de rescat (art. 102.e).',
  'Prohibidas en todo el ámbito marino la pesca de arrastre y la de cerco (art. 40.1.f), y la acuicultura (art. 40.1.e).':
    'Prohibides a tot l’àmbit marí la pesca d’arrossegament i la de cèrcol (art. 40.1.f), i l’aqüicultura (art. 40.1.e).',
  'Prohibida cualquier actividad de acuicultura, sea cual sea su tipología (art. 94.c).':
    'Prohibida qualsevol activitat d’aqüicultura, sigui quina sigui la seva tipologia (art. 94.c).',
  'Prohibida la celebración de competiciones.': 'Prohibida la celebració de competicions.',

  // -- Busseig: on està prohibit ---------------------------------------------
  'Prohibido el buceo con escafandra autónoma en el área de reserva integral (art. 40.1.j).':
    'Prohibit el busseig amb escafandre autònom a l’àrea de reserva integral (art. 40.1.j).',
  'Prohibido el buceo con escafandra en el área de protección especial.':
    'Prohibit el busseig amb escafandre a l’àrea de protecció especial.',
  'Prohibido el buceo con escafandra en la zona de protección máxima de s’Espardell.':
    'Prohibit el busseig amb escafandre a la zona de protecció màxima de s’Espardell.',
  'Prohibido el buceo en apnea en mayo y junio en las zonas de desove de la cigarra de mar.':
    'Prohibit el busseig en apnea al maig i al juny a les zones de fresa de l’esclata-sang de mar.',
  'Prohibido el buceo en la zona de exclusión marina, que este mapa dibuja como figura aparte.':
    'Prohibit el busseig a la zona d’exclusió marina, que aquest mapa dibuixa com a figura a part.',
  'Prohibido el buceo recreativo en el interior de las cuevas submarinas de la Illa de l’Aire.':
    'Prohibit el busseig recreatiu a l’interior de les coves submarines de la Illa de l’Aire.',
  'Prohibido el buceo recreativo en el sector noroeste de la zona, entre el Clot des Moro y els Pans (anexo 3.3 del Decret 26/2025).':
    'Prohibit el busseig recreatiu al sector nord-oest de la zona, entre el Clot des Moro i els Pans (annex 3.3 del Decret 26/2025).',
  'Prohibido en el área de protección especial.': 'Prohibit a l’àrea de protecció especial.',
  'Prohibido el uso de torpedos o scooters subacuáticos.':
    'Prohibit l’ús de torpedes o scooters subaquàtics.',
  'Resto de la reserva, excepto las zonas de protección especial: inmersiones libres y sin límite diario.':
    'Resta de la reserva, excepte les zones de protecció especial: immersions lliures i sense límit diari.',
  'Solo dentro de las zonas de buceo señaladas: las inmersiones fuera de ellas están prohibidas.':
    'Només dins les zones de busseig assenyalades: les immersions fora d’elles hi són prohibides.',
  'Requiere permiso individual o colectivo. Las inmersiones en apnea son libres en toda la reserva, pero no se puede bucear en la reserva integral.':
    'Requereix permís individual o col·lectiu. Les immersions en apnea són lliures a tota la reserva, però no s’hi pot bussejar, a la reserva integral.',
  'Zona del cabo de Cavalleria: dividida en cinco sectores con un máximo de 50 inmersiones diarias en cada uno, salvo el sector 4b de sa Nitja, donde el máximo es de 2 inmersiones diarias y hace falta autorización previa del órgano gestor.':
    'Zona del cap de Cavalleria: dividida en cinc sectors amb un màxim de 50 immersions diàries a cadascun, llevat del sector 4b de sa Nitja, on el màxim és de 2 immersions diàries i cal autorització prèvia de l’òrgan gestor.',
  'Tarjeta federativa de actividades subacuáticas.':
    'Targeta federativa d’activitats subaquàtiques.',

  // -- Instruments a bord i modalitats prohibides ----------------------------
  'Prohibido llevar cualquier instrumento utilizable para pescar o extraer especies marinas, salvo el cuchillo reglamentario.':
    'Prohibit dur qualsevol instrument utilitzable per pescar o extreure espècies marines, llevat del ganivet reglamentari.',
  'Prohibido llevar, en la inmersión o en la embarcación, cualquier instrumento utilizable para la pesca o la extracción de especies marinas, salvo el cuchillo de seguridad.':
    'Prohibit dur, a la immersió o a l’embarcació, qualsevol instrument utilitzable per a la pesca o l’extracció d’espècies marines, llevat del ganivet de seguretat.',
  'Prohibido utilizar, tener o transportar a bordo cualquier instrumento que pueda emplearse para la extracción de especies marinas.':
    'Prohibit utilitzar, tenir o transportar a bord qualsevol instrument que es pugui emprar per a l’extracció d’espècies marines.',
  'Prohibidos el jigging y el spinning.': 'Prohibits el jigging i l’spinning.',
  'Prohibidos los concursos de pesca de recreo.': 'Prohibits els concursos de pesca d’esbarjo.',
  'Prohibidos los dragados submarinos y la extracción de arena de los fondos marinos (art. 40.1.b y 40.1.c).':
    'Prohibits els dragatges submarins i l’extracció d’arena dels fons marins (art. 40.1.b i 40.1.c).',

  // -- Fondeig: prohibicions per figura --------------------------------------
  'Prohibido el fondeo en la zona de exclusión marina, que este mapa dibuja como figura aparte.':
    'Prohibit el fondeig a la zona d’exclusió marina, que aquest mapa dibuixa com a figura a part.',
  'Prohibido fondear en las áreas marinas de protección estricta (art. 117.a y art. 30.3 del PORN).':
    'Prohibit fondejar a les àrees marines de protecció estricta (art. 117.a i art. 30.3 del PORN).',
  'Prohibido fondear sobre las fanerógamas marinas del área de protección especial.':
    'Prohibit fondejar sobre les fanerògames marines de l’àrea de protecció especial.',
  'Prohibido fondear sobre las praderas de fanerógamas del área de protección especial.':
    'Prohibit fondejar sobre les prades de fanerògames de l’àrea de protecció especial.',
  'Prohibido fondear sobre praderas de Posidonia oceanica en todo el ámbito marino del parque (art. 40.2).':
    'Prohibit fondejar sobre prades de Posidonia oceanica a tot l’àmbit marí del parc (art. 40.2).',
  'Prohibido fondear sobre praderas de Posidonia oceanica y de Cymodocea nodosa, y en arena próxima si la cadena o el ancla acaban afectando a la pradera (RD 191/2026).':
    'Prohibit fondejar sobre prades de Posidonia oceanica i de Cymodocea nodosa, i en arena propera si la cadena o l’àncora acaben afectant la prada (RD 191/2026).',
  'Prohibido fondear sobre praderas de Posidonia oceanica y sobre fondos de maërl (art. 82).':
    'Prohibit fondejar sobre prades de Posidonia oceanica i sobre fons de maërl (art. 82).',
  'Prohibido también sobre Cymodocea nodosa y en arena próxima si la cadena, el ancla u otros elementos del fondeo afectan a la pradera (RD 191/2026).':
    'Prohibit també sobre Cymodocea nodosa i en arena propera si la cadena, l’àncora o altres elements del fondeig afecten la prada (RD 191/2026).',
  'Prohibido también sobre praderas de Cymodocea nodosa, y en arena próxima si la cadena o el ancla acaban afectando a la pradera (RD 191/2026).':
    'Prohibit també sobre prades de Cymodocea nodosa, i en arena propera si la cadena o l’àncora acaben afectant la prada (RD 191/2026).',
  'Prohibido también sobre las matas aisladas de Posidonia oceanica, incluidas las que no tienen hojas vivas pero forman bioestructuras estables; no entran en la prohibición los depósitos de hojarasca sobre arena.':
    'Prohibit també sobre les mates aïllades de Posidonia oceanica, incloses les que no tenen fulles vives però formen bioestructures estables; no entren en la prohibició els dipòsits de fullaraca sobre arena.',
  'Queda totalmente prohibido cualquier tipo de fondeo, salvo por causa de fuerza mayor.':
    'Queda totalment prohibit qualsevol tipus de fondeig, llevat de causa de força major.',
  'Solo se puede fondear sin autorización en tres lugares concretos: Cala Moltó o Es Gulló, Cala Agulla y Son Moll. En el resto de la reserva estatal el fondeo está prohibido.':
    'Només es pot fondejar sense autorització a tres llocs concrets: Cala Moltó o Es Gulló, Cala Agulla i Son Moll. A la resta de la reserva estatal el fondeig hi és prohibit.',
  'Solo se puede pernoctar en la zona de uso especial del puerto de Cabrera, en las cincuenta boyas de amarre habilitadas.':
    'Només es pot pernoctar a la zona d’ús especial del port de Cabrera, a les cinquanta boies d’amarratge habilitades.',
  'También pueden fondear sin autorización las embarcaciones profesionales que estén pescando con potera en fondos detríticos.':
    'També poden fondejar sense autorització les embarcacions professionals que estiguin pescant amb poteres en fons detrítics.',
  'Tres zonas de fondeo regulado con campo de boyas: hay que amarrar a la boya y no se puede echar el ancla. En la bahía d’Es Grau el fondeo fuera de las boyas está prohibido, con un máximo de 260 anclajes fijos incluidos los amarres al muelle.':
    'Tres zones de fondeig regulat amb camp de boies: cal amarrar a la boia i no s’hi pot llançar l’àncora. A la badia d’Es Grau el fondeig fora de les boies hi és prohibit, amb un màxim de 260 ancoratges fixos inclosos els amarratges al moll.',
  'S’Estany des Peix tiene además su propio reglamento de fondeo y amarres, aprobado por el Consell Insular de Formentera, que reserva los amarres a embarcaciones acreditadas y con eslora limitada. Este mapa no dibuja esos amarres.':
    'S’Estany des Peix té a més el seu propi reglament de fondeig i amarratges, aprovat pel Consell Insular de Formentera, que reserva els amarratges a embarcacions acreditades i amb eslora limitada. Aquest mapa no dibuixa aquests amarratges.',

  // -- Navegació: velocitats, motos i excepcions -----------------------------
  'Prohibido el uso de motos acuáticas, salvo las de los organismos de vigilancia y control.':
    'Prohibit l’ús de motos aquàtiques, llevat de les dels organismes de vigilància i control.',
  'Prohibido el uso de motos de agua dentro de la reserva.':
    'Prohibit l’ús de motos aquàtiques dins la reserva.',
  'Prohibidos los circuitos de motos náuticas u otras embarcaciones a motor; se exceptúan las excursiones de contenido naturalístico, que deben pasar una evaluación de repercusiones ambientales.':
    'Prohibits els circuits de motos nàutiques o altres embarcacions a motor; se n’exceptuen les excursions de contingut naturalístic, que han de passar una avaluació de repercussions ambientals.',
  'Prohibidos los circuitos de motos náuticas y de otros vehículos de motor (apartado 5.3.3).':
    'Prohibits els circuits de motos nàutiques i d’altres vehicles de motor (apartat 5.3.3).',
  'Quedan fuera de esa prohibición las embarcaciones cuya única finalidad sea el transporte marítimo, público o privado, y cualquier embarcación o aparato náutico a vela.':
    'Queden fora d’aquesta prohibició les embarcacions la finalitat única de les quals sigui el transport marítim, públic o privat, i qualsevol embarcació o aparell nàutic a vela.',
  'Se admite únicamente el tránsito a nado desde la playa de s’Escala, en línea recta y dirección noroeste, para acceder por el camino más corto a la zona donde sí se puede pescar.':
    'S’admet únicament el trànsit a nedar des de la platja de s’Escala, en línia recta i direcció nord-oest, per accedir pel camí més curt a la zona on sí que es pot pescar.',
  'Se exceptúan las emergencias relacionadas con la seguridad de la vida humana en la mar y las actuaciones de vigilancia, seguimiento, control, defensa nacional y orden público.':
    'Se n’exceptuen les emergències relacionades amb la seguretat de la vida humana a la mar i les actuacions de vigilància, seguiment, control, defensa nacional i ordre públic.',
  'Se permiten los circuitos y actividades de navegación sin motor.':
    'Es permeten els circuits i activitats de navegació sense motor.',
  'Velocidad inferior a 10 nudos para buques y embarcaciones, para evitar ruidos y perturbaciones.':
    'Velocitat inferior a 10 nusos per a vaixells i embarcacions, per evitar renous i pertorbacions.',
  'Velocidad inferior a 10 nudos, salvo emergencia relacionada con la seguridad de la vida humana en el mar o actuaciones de vigilancia, control, defensa nacional u orden público.':
    'Velocitat inferior a 10 nusos, llevat d’emergència relacionada amb la seguretat de la vida humana a la mar o actuacions de vigilància, control, defensa nacional o ordre públic.',
  'Velocidad máxima de diez nudos en el parque y de dos nudos dentro del puerto.':
    'Velocitat màxima de deu nusos al parc i de dos nusos dins el port.',

  // -- Ormeigs i finestres restants ------------------------------------------
  'Requiere licencia de pesca recreativa de embarcación en vigor.':
    'Requereix llicència de pesca recreativa d’embarcació en vigor.',
  'Salabre: solo permitido en el ámbito autonómico.':
    'Salabre: només permès a l’àmbit autonòmic.',
  'Se puede mariscar puu con una cuerda y dos bous por recolector.':
    'Es pot mariscar puu amb una corda i dos bous per recol·lector.',
  'Se pueden autorizar como aparejos tradicionales el esparavel, la lienza, el morenell y la moixonera.':
    'Es poden autoritzar com a ormeigs tradicionals l’esparver, la llenceta, el morenell i la moixonera.',
  'Solo a más de 10 m de profundidad: entre la línea de costa y esa cota está prohibida toda pesca marítima y marisqueo, salvo el esparavel.':
    'Només a més de 10 m de fondària: entre la línia de costa i aquesta cota hi és prohibida tota pesca marítima i marisqueig, llevat de l’esparver.',
  'Solo entre el 1 de julio y el 31 de marzo.': 'Només entre l’1 de juliol i el 31 de març.',
  'Único aparejo admitido desde tierra: el esparavel.':
    'Únic ormeig admès des de terra: l’esparver.',
  'Único aparejo admitido: la caña, con o sin carrete.':
    'Únic ormeig admès: la canya, amb rodet o sense.',
  'Volantín desde embarcación: del 1 de octubre al 30 de abril.':
    'Volantí des d’embarcació: de l’1 d’octubre al 30 d’abril.',
  'Se exceptúan la toma de muestras con fines científicos y la pesca profesional de artes menores: artes de parada (moruna o solta) en cala en Regau, y junquillera en su temporada.':
    'Se n’exceptuen la presa de mostres amb finalitats científiques i la pesca professional d’arts menors: arts de parada (moruna o solta) a cala en Regau, i jonquillera en la seva temporada.',
  'Se exceptúan la toma de muestras con fines científicos y la pesca profesional de artes menores: artes de parada (moruna o solta) en el Clot des Moro, y jonquillera (art. 7.2 del Decret 26/2025).':
    'Se n’exceptuen la presa de mostres amb finalitats científiques i la pesca professional d’arts menors: arts de parada (moruna o solta) al Clot des Moro, i jonquillera (art. 7.2 del Decret 26/2025).',

  // -- Permisos: vigència, taxes i notes restants ----------------------------
  'Según autorización': 'Segons autorització',
  'Tasa por cada reserva marina.': 'Taxa per cada reserva marina.',
  'Tasa por cada reserva marina. Autorización individual específica.':
    'Taxa per cada reserva marina. Autorització individual específica.',
  'Tasa de 53,90 €; validez hasta el 31 de diciembre del año de emisión; exige licencia de pesca recreativa submarina en vigor e informe preceptivo de la Dirección General de Espacios Naturales y Biodiversidad; plazo de resolución de 6 meses; la no presentación del registro de capturas comporta la pérdida de la autorización':
    'Taxa de 53,90 €; validesa fins al 31 de desembre de l’any d’emissió; exigeix llicència de pesca recreativa submarina en vigor i informe preceptiu de la Direcció General d’Espais Naturals i Biodiversitat; termini de resolució de 6 mesos; la no presentació del registre de captures comporta la pèrdua de l’autorització',
  'Tasas por duración y reserva: diaria 5,24 €; quincenal 10,47 €; anual 52,82 €. La semanal (15,71 €) solo existe para la reserva del Ponent de Mallorca. La anual habilita el resto de reservas de la misma isla, salvo las zonas especiales de buceo del Toro y les Malgrats. Exige título oficial de buceo recreativo y seguro de accidentes y responsabilidad civil en vigor; los menores necesitan consentimiento del tutor. Tramitación telemática. Los centros y clubes usan la autorización colectiva (trámite 106992)':
    'Taxes per durada i reserva: diària 5,24 €; quinzenal 10,47 €; anual 52,82 €. La setmanal (15,71 €) només existeix per a la reserva del Ponent de Mallorca. L’anual habilita la resta de reserves de la mateixa illa, llevat de les zones especials de busseig del Toro i les Malgrats. Exigeix títol oficial de busseig recreatiu i assegurança d’accidents i responsabilitat civil en vigor; els menors necessiten consentiment del tutor. Tramitació telemàtica. Els centres i clubs fan servir l’autorització col·lectiva (tràmit 106992)',
  'Punto quinto, zona de veda para la pesca recreativa desde tierra y embarcación':
    'Punt cinquè, zona de veda per a la pesca recreativa des de terra i embarcació',

  // -- Resums de zona restants ------------------------------------------------
  'RÉGIMEN TRANSITORIO. Esta zona ha quedado fuera del área de la reserva marina. Hasta que la Consejería regule la actividad pesquera por orden, está prohibida cualquier actividad pesquera salvo tres excepciones tasadas: la pesca y el marisqueo recreativos desde tierra, el marisqueo recreativo desde embarcación y la pesca profesional con artes de tiro.':
    'RÈGIM TRANSITORI. Aquesta zona ha quedat fora de l’àrea de la reserva marina. Fins que la Conselleria reguli l’activitat pesquera per ordre, hi és prohibida qualsevol activitat pesquera llevat de tres excepcions taxades: la pesca i el marisqueig recreatius des de terra, el marisqueig recreatiu des d’embarcació i la pesca professional amb arts de tir.',
  'Reserva del nordeste de Formentera. Pesca submarina prohibida. Desde embarcación solo entre el 1 de julio y el 31 de marzo, a más de 10 m de profundidad y con tres aparejos; desde tierra, solo el esparavel. Spinning, jigging y competiciones, prohibidos.':
    'Reserva del nord-est de Formentera. Pesca submarina prohibida. Des d’embarcació només entre l’1 de juliol i el 31 de març, a més de 10 m de fondària i amb tres ormeigs; des de terra, només l’esparver. Spinning, jigging i competicions, prohibits.',
  'Reserva del oeste de Eivissa. Mismo régimen que es Vedrà: pesca recreativa solo desde embarcación con autorización trienal, prohibida desde los islotes y en modalidad submarina. Contiene además una zona de especial protección donde no se permite ninguna pesca recreativa.':
    'Reserva de l’oest d’Eivissa. Mateix règim que es Vedrà: pesca recreativa només des d’embarcació amb autorització triennal, prohibida des dels illots i en modalitat submarina. Conté a més una zona d’especial protecció on no s’hi permet cap pesca recreativa.',
  'Reserva del suroeste de Eivissa, alrededor de es Vedrà y es Vedranell. La pesca recreativa solo se permite desde embarcación o artefactos flotantes, con autorización trienal; desde los islotes y en modalidad submarina, prohibida.':
    'Reserva del sud-oest d’Eivissa, al voltant d’es Vedrà i es Vedranell. La pesca recreativa només es permet des d’embarcació o artefactes flotants, amb autorització triennal; des dels illots i en modalitat submarina, prohibida.',
  'Una sola figura jurídica con dos áreas separadas —Cala Barril-Pla de Mar y la bahía de Fornells—, unas 1.015 ha en total. Ni pesca recreativa en ninguna modalidad, ni buceo con escafandra.':
    'Una sola figura jurídica amb dues àrees separades —Cala Barril-Pla de Mar i la badia de Fornells—, unes 1.015 ha en total. Ni pesca recreativa en cap modalitat, ni busseig amb escafandre.',
  'Zona de 2 ha declarada para proteger las colonias de gorgonias de la punta de na Bruta. Su única regla propia es profesional —el art. 3.2 prohíbe calar trasmallos—, así que para el pescador recreativo y el buceador rige el mismo régimen que en el resto de la reserva.':
    'Zona de 2 ha declarada per protegir les colònies de gorgònies de la punta de na Bruta. La seva única regla pròpia és professional —l’art. 3.2 prohibeix calar tremalls—, així que per al pescador recreatiu i el bussejador regeix el mateix règim que a la resta de la reserva.',
  'Zona declarada para proteger las colonias de gorgonias. El art. 2.2 prohíbe aquí toda clase de pesca marítima y de extracción, con la única excepción de la pesca profesional con volantín, potera y curricán: la pesca recreativa no está permitida en ninguna modalidad.':
    'Zona declarada per protegir les colònies de gorgònies. L’art. 2.2 hi prohibeix tota classe de pesca marítima i d’extracció, amb l’única excepció de la pesca professional amb volantí, poteres i curricà: la pesca recreativa no hi és permesa en cap modalitat.',
  'Zona especial entre la línea de costa y el límite exterior de la reserva estatal, frente a Cala Agulla. La Orden APA/690/2018 la declara zona especial pero no le fija un régimen de usos distinto del resto de la reserva fuera de la integral. Cala Agulla es, además, uno de los tres lugares donde sí se puede fondear.':
    'Zona especial entre la línia de costa i el límit exterior de la reserva estatal, davant Cala Agulla. L’Ordre APA/690/2018 la declara zona especial però no li fixa un règim d’usos diferent del de la resta de la reserva fora de la integral. Cala Agulla és, a més, un dels tres llocs on sí que es pot fondejar.',
  'Zona vedada a la pesca recreativa dentro de la reserva del Migjorn, creada por Resolución de 19/02/2009 y prorrogada por 5 años en 2024. La veda alcanza tanto la pesca desde tierra como desde embarcación; no afecta al buceo.':
    'Zona vedada a la pesca recreativa dins la reserva del Migjorn, creada per Resolució de 19/02/2009 i prorrogada per 5 anys el 2024. La veda abasta tant la pesca des de terra com des d’embarcació; no afecta el busseig.',
  'Zona vedada a la pesca recreativa desde tierra y desde embarcación, unas 1.249 ha. Se estableció por primera vez en 2009 y se prorroga cada tres años; la resolución vigente es de 16 de febrero de 2024. No afecta al buceo.':
    'Zona vedada a la pesca recreativa des de terra i des d’embarcació, unes 1.249 ha. Es va establir per primera vegada el 2009 i es prorroga cada tres anys; la resolució vigent és de 16 de febrer de 2024. No afecta el busseig.',
  'Zona vedada a la pesca recreativa, tanto desde tierra como desde embarcación. La crea una resolución trienal renovada desde el año 2000; la vigente es de 4 de diciembre de 2023. No afecta al buceo.':
    'Zona vedada a la pesca recreativa, tant des de terra com des d’embarcació. La crea una resolució triennal renovada des de l’any 2000; la vigent és de 4 de desembre de 2023. No afecta el busseig.',

  // -- Espais Natura 2000 restants -------------------------------------------
  'ZEC costera de la costa este, dentro del Pla de Gestió de la costa est de Menorca.':
    'ZEC costanera de la costa est, dins el Pla de Gestió de la costa est de Menorca.',
  'ZEC de la costa nordeste, dentro del Pla de Gestió de la costa est de Menorca.':
    'ZEC de la costa nord-est, dins el Pla de Gestió de la costa est de Menorca.',
  'ZEC estrictamente marina de la costa de llevant. La pesca se rige por la normativa general; el fondeo y la navegación tienen normas propias en el plan de gestión.':
    'ZEC estrictament marina de la costa de llevant. La pesca es regeix per la normativa general; el fondeig i la navegació tenen normes pròpies al pla de gestió.',
  'ZEC estrictamente marina frente a la costa de Tramuntana. Pesca recreativa según la normativa general; buceo permitido y fondeo condicionado por el Pla de Gestió.':
    'ZEC estrictament marina davant la costa de Tramuntana. Pesca recreativa segons la normativa general; busseig permès i fondeig condicionat pel Pla de Gestió.',
  'ZEC marina que se solapa con la Reserva Marina de la Illa de l’Aire. El art. 6 del Decreto 26/2019 obliga a cumplir este plan de gestión en la parte coincidente: las dos figuras se acumulan por mandato de la propia norma de la reserva.':
    'ZEC marina que se superposa amb la Reserva Marina de la Illa de l’Aire. L’art. 6 del Decret 26/2019 obliga a complir aquest pla de gestió a la part coincident: les dues figures s’acumulen per mandat de la mateixa norma de la reserva.',
  'ZEPA de 11.645 ha entre cap Enderrocat y cap Blanc. Comparte nombre con el LIC ES5310128 pero es otro espacio, con otro perímetro. Plan de gestión en tramitación.':
    'ZEPA d’11.645 ha entre cap Enderrocat i cap Blanc. Comparteix nom amb el LIC ES5310128 però és un altre espai, amb un altre perímetre. Pla de gestió en tramitació.',
  'ZEPA marina estatal de 162.710 ha, la mayor de Baleares. Se solapa con la Reserva Marina del Nord de Menorca, y es el régimen de la reserva —no esta ZEPA— el que restringe allí la pesca.':
    'ZEPA marina estatal de 162.710 ha, la major de Balears. Se superposa amb la Reserva Marina del Nord de Menorca, i és el règim de la reserva —no aquesta ZEPA— el que hi restringeix la pesca.',
  'ZEPA marina estatal de 23.778 ha frente al sudeste de Menorca, en el entorno de la Illa de l’Aire. No impone por sí sola ninguna restricción a la pesca recreativa.':
    'ZEPA marina estatal de 23.778 ha davant el sud-est de Menorca, a l’entorn de la Illa de l’Aire. No imposa per si sola cap restricció a la pesca recreativa.',
  'ZEPA marina estatal de 40.240 ha, desde la bahía de Palma hacia Cabrera y ses Salines, declarada por las colonias de aves marinas. No impone restricciones de pesca recreativa ni de buceo: la Orden que la declara no las regula y no tiene plan de gestión aprobado.':
    'ZEPA marina estatal de 40.240 ha, des de la badia de Palma cap a Cabrera i ses Salines, declarada per les colònies d’aus marines. No imposa restriccions de pesca recreativa ni de busseig: l’Ordre que la declara no les regula i no té pla de gestió aprovat.',
  'ZEPA marina estatal de 47.166 ha que bordea sa Dragonera, els Malgrats, els Conills y el Toro. Se solapa con varias reservas marinas, y es el régimen de esas reservas —no esta ZEPA— el que restringe allí la pesca.':
    'ZEPA marina estatal de 47.166 ha que voreja sa Dragonera, els Malgrats, els Conills i el Toro. Se superposa amb diverses reserves marines, i és el règim d’aquelles reserves —no aquesta ZEPA— el que hi restringeix la pesca.',
  'ZEPA marina estatal de 99.072 ha frente a toda la costa norte de Mallorca. Es la figura más extensa del mapa y no impone por sí sola ninguna restricción a la pesca recreativa.':
    'ZEPA marina estatal de 99.072 ha davant tota la costa nord de Mallorca. És la figura més extensa del mapa i no imposa per si sola cap restricció a la pesca recreativa.',
};
