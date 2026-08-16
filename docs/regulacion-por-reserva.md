# Páginas oficiales de regulación, por reserva

Las 12 reservas marinas de Baleares publican su régimen de actividades en una página propia del sitio del Govern. Los títulos de esas páginas son todos idénticos («Regulación de actividades»), y las URL no llevan el nombre de la reserva, así que la correspondencia se obtuvo recorriendo el menú de navegación del propio sitio en orden de documento.

Esta tabla es la lista de trabajo para ir completando fichas reserva por reserva.

| Reserva | Isla | Página de regulación | Fichas |
|---|---|---|---|
| Badia de Palma | Mallorca | [`regulacion_de_actividades-854`](https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades-854/) | ✅ 2 |
| Migjorn de Mallorca | Mallorca | [`regulacion_de_actividades-862`](https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades-862/) | ✅ 3 |
| Ponent de Mallorca, el Toro, les Malgrats i el Sec | Mallorca | [`regulacian_de_actividades_0`](https://www.caib.es/sites/reservesmarines/es/regulacian_de_actividades_0/) | ✅ 7 |
| Llevant de Mallorca | Mallorca | [`regulacian_de_actividades_0_0`](https://www.caib.es/sites/reservesmarines/es/regulacian_de_actividades_0_0/) | ✅ 5 |
| Sa Dragonera | Mallorca | [`regulacian_de_actividades`](https://www.caib.es/sites/reservesmarines/es/regulacian_de_actividades/) | ✅ 9 |
| Nord de Menorca | Menorca | [`regulacion_de_actividades-870`](https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades-870/) | ✅ 3 |
| Illa de l'Aire | Menorca | [`regulacion_de_actividades_0_0`](https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades_0_0/) | ✅ 2 |
| Freus d'Eivissa i Formentera | Eivissa + Formentera | [`regulacion_de_actividades-874`](https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades-874/) | ✅ 3 |
| Costa nord-est d'Eivissa – Tagomago | Eivissa | [`regulacion_de_actividades_0`](https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades_0/) | ✅ 2 |
| Es Vedrà – Vedranell | Eivissa | [`regulacian_de_actividades_0_0_0`](https://www.caib.es/sites/reservesmarines/es/regulacian_de_actividades_0_0_0/) | ✅ 2 |
| Ses Bledes | Eivissa | [`regulacion_de_actividades_0_0_0`](https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades_0_0_0/) | ✅ 2 |
| Punta de sa Creu | Formentera | [`regulacion_de_actividades`](https://www.caib.es/sites/reservesmarines/es/regulacion_de_actividades/) | ✅ 1 |

Cuidado con los pares casi homónimos: `regulacian_…` (con *a*) y `regulacion_…` (con *o*) son páginas de reservas distintas. No es una errata de esta tabla, es como están publicadas.

**Mallorca está completa: 26 de 26 zonas, sin ningún campo `unknown` en las 6 actividades × 26 zonas.**

Un primer pase dejó 22 campos en `unknown` (sobre todo fondeo y navegación, que las páginas resumen del Govern no tratan). Se cerraron con fuentes primarias adicionales, no con la página resumen:

- **RD 191/2026** (BOE, 11 de marzo de 2026): prohíbe fondear sobre Posidonia oceanica y Cymodocea nodosa en todo el Mediterráneo español. Cierra el fondeo en las zonas donde la propia reserva no añade nada más específico — módulo compartido en `src/rules/normas-generales.js`.
- **Decreto 62/2016** (creación de sa Dragonera autonómica): su art. 2 prohíbe toda pesca marítima con tres excepciones tasadas que NO incluyen la submarina — se dedujo de ahí, no del régimen estatal.
- **Resolución de 19/02/2009 + prórroga de 15/05/2024** (veda del Migjorn): veda expresamente «desde tierra y embarcación», vigente.
- **Orden de 29/04/2005** (ZPE del Migjorn) y **Orden de 1/09/2006** (Badia de Palma, texto íntegro): ambas prohíben el fondeo, pero solo «sobre las fanerógamas marinas», no un fondeo total — de ahí `restricted`, no `prohibited`.
- **Decret 71/2016** (Llevant autonómico, norma de creación real — antes esta ficha solo citaba una página de zonificación): su art. 2.2 prohíbe anclar sobre posidonia en la reserva integral.

Se introdujo el estado `not_regulated` para los casos donde la norma específica de la zona, leída completa, sencillamente no toca la actividad (sobre todo navegación). Es distinto de `unknown`: aquí sí se ha leído la norma.

De paso, el texto íntegro de la Orden de 2006 reveló que la ficha de buceo general de la Badia de Palma estaba mal: decía `allowed` sin autorización, cuando el art. 9.1 exige permiso individual o colectivo. Se corrigió.

## Menorca

Las dos reservas marinas vigentes —no hay una tercera en el inventario oficial— y catorce espacios Natura 2000 marinos. Con esto, las doce reservas marinas de Baleares tienen ficha.

### La prohibición más severa de todo el archipiélago

El **Nord de Menorca** no se limita a prohibir la pesca submarina. Prohíbe además **portar fusiles** a las embarcaciones que solo naveguen por las aguas de la reserva y a las personas y vehículos que circulen por el dominio público marítimo-terrestre inmediato. Pasar por allí con el fusil a bordo ya es infracción, aunque no se pesque. No hay nada equivalente en ninguna otra reserva.

El régimen general es de cinco días: martes, jueves, sábados, domingos y festivos. Y las tres figuras no heredan unas de otras, porque el perímetro general las excluye: 28,19 + 10,15 + 12,49 = 50,83 km², que son las 5.083 ha que declara el Govern.

Las dos zonas de protección especial —Cala Barril-Pla de Mar y la badia de Fornells— son **una sola figura jurídica con dos geometrías**, no dos zonas. El IDEIB las publica con el mismo nombre y la misma protección, así que comparten `zoneId` y se distinguen por `featureId`.

### Illa de l'Aire: la única reserva con límite de velocidad

La **Orden 11/2026** es posterior al decreto de creación y añade dos cosas que ninguna otra reserva tiene: navegación a menos de 10 nudos y motos de agua prohibidas. Cuidado con su alcance: su art. 2 lo dice **solo para la Illa de l'Aire**. Al Nord de Menorca esa misma orden únicamente le regula el buceo colectivo, así que allí la navegación sigue siendo `not_regulated`.

Dentro de la zona especial de buceo —454 de las 719 ha— el art. 3.3 del Decreto 26/2019 prohíbe toda pesca salvo la caña desde tierra: **desde embarcación no se puede pescar**. Esta zona sí superó la comprobación de anidamiento y hereda del perímetro general, al contrario que las subzonas de las Pitiüses.

### La reserva remite a Natura 2000 por su propia norma

El art. 6 del Decreto 26/2019 obliga a cumplir el plan de gestión del LIC Punta Prima - Illa de l'Aire (ES5310073) en la parte de la reserva incluida en él —exactamente igual que hace el art. 6.2 del decreto de Tagomago—. Por eso las dos capas se cargan por separado y el motor las apila: sobre un punto del entorno de la isla llegan a coincidir cuatro figuras (ZEPA estatal, ZEC, reserva marina y zona especial de buceo).

De los catorce espacios Natura 2000, seis tienen plan de gestión aprobado que sí regula el mar (Decret 39/2021 de la costa est y Decret 17/2022 de la Illa de l'Aire: fondeo sobre fanerógamas y maërl, canales de varada, prohibición de vertidos y de circuitos de motos náuticas). Los otros seis están en tramitación y solo les alcanza el Decret 91/2023.

### Dos limitaciones que quedan escritas

- **La Orden de 15 de junio de 1999** del Nord de Menorca no ha podido leerse íntegra: el enlace que el propio Govern publica sirve un extracto del BOCAIB con el anexo de aparejos pero sin el articulado. Todo lo afirmado se apoya en la página oficial de regulación, el Decreto 26/2019, la Resolución de veda de 2024 y la Orden 11/2026. Si esa orden añade alguna regla de fondeo propia de las zonas de protección especial, no está recogida.
- **El Parc Natural de s'Albufera des Grau** regula la pesca submarina por zonas —prohibida en el entorno de los cabos de Favàritx y Mossenyor Vives, autorizable en otras— con una zonificación interna que este mapa no tiene cargada. El espacio aparece en el mapa sin ficha, marcado como no determinable.

## Las Pitiüses y Cabrera

Las cinco reservas de Eivissa y Formentera están completas, y Cabrera entra como lo que es: un **parque nacional**, no una reserva marina. Su geometría es el ámbito marino que publica el IDEIB (895,54 km²), coherente con las ~89.500 ha que declara el MITECO tras la ampliación de 2019; no se reconstruye a mano.

### La pesca submarina está prohibida en las cinco, y ninguna lo dice así

Los cuatro decretos se construyen «al revés»: prohíben toda clase de pesca marítima y luego tasan las excepciones. La modalidad submarina no aparece en ninguna de esas listas, y de ahí —no de una prohibición expresa— sale que esté prohibida. El art. 9.2 del Decret 41/2015 lo cierra al prohibir llevar instrumentos de pesca durante la inmersión, en apnea incluida.

| Reserva | Norma | Excepción que deja fuera a la submarina |
|---|---|---|
| Freus | Decreto 63/1999, art. 3 | solo pesca recreativa «de superficie» |
| Punta de sa Creu | Decreto 38/2018, art. 2.2 | solo recreativa desde embarcación |
| Tagomago | Decreto 45/2018, art. 3.2 | solo recreativa «de superficie» |
| Vedrà y ses Bledes | Decreto 25/2023, art. 4.2 | solo recreativa desde embarcación o artefactos flotantes |

En Vedrà y ses Bledes esa misma redacción resuelve una segunda duda: como la excepción se limita a la pesca **desde embarcación o artefactos flotantes**, la pesca recreativa desde tierra también queda prohibida. El art. 6.1 lo confirma expresamente para los islotes.

### Las subzonas están recortadas del perímetro general

Las tres zonas interiores de las Pitiüses parecían candidatas a `heredaDe`, y las tres lo rechazó la comprobación geométrica de `rules:check`. Medido sobre las geometrías oficiales, **ni un solo punto** de la reserva integral de la Llosa des Figueral, de la punta de na Bruta ni de la zona de na Bosc-es Vaixell-na Gorra cae dentro del polígono de su reserva:

- La reserva de es Vedrà tiene recortada la isla (un agujero de 0,64 km²) y la zona de na Bruta cae sobre ese recorte.
- Ses Bledes recorta los islotes (0,31 km²) y su zona de especial protección cae ahí.
- La integral de Tagomago está sencillamente fuera del perímetro general.

Es el mismo caso que el Migjorn. Como el motor no verá la reserva general sobre esos puntos, cada subzona lleva su régimen escrito entero, incluido lo que «se sobreentendía» heredado.

### Discrepancia conocida: el esparavel de la Punta de sa Creu

El art. 4.1 del Decreto 38/2018 dice literalmente «Queda prohibida la pesca recreativa desde tierra», y ese apartado sigue vigente. Pero la disposición final primera del Decreto 15/2022 reescribió los arts. 2.1.c y 4.3 para exceptuar y admitir el esparavel —que se lanza desde la orilla—, y la página oficial del Govern publica hoy «Desde tierra: el esparavel». Se recoge como restringida a ese único aparejo, con la contradicción escrita en las condiciones. No se resuelve por nuestra cuenta.

### Ampliación de los Freus (2026): no cargada

Existe un procedimiento de ampliación de la Reserva Marina dels Freus. Mientras no haya aprobación y publicación definitiva de la nueva delimitación, **la geometría proyectada no se carga**: el mapa usa exclusivamente la vigente que devuelve el IDEIB. Dibujar un perímetro que aún no rige daría por prohibido lo que hoy no lo está.

### Cabrera: el PRUG es anterior a la ampliación

Las prohibiciones generales del PRUG se refieren al parque nacional y alcanzan por tanto a las aguas incorporadas en 2019. Pero su zonificación de detalle —zonas de fondeo diurno, cupos de amarre, puntos de buceo— se dibujó sobre el parque anterior y no cubre la superficie añadida. Se dice así en la ficha, en vez de extender por nuestra cuenta un mapa de zonas a un territorio que la norma no zonificó.

## Red Natura 2000 y espacios naturales protegidos

Dos capas más, activas desde agosto de 2026. Cambian el mapa menos de lo que parece y más de lo que se espera.

**Lo que NO cambian.** El art. 5 del Decret 91/2023 remite la pesca recreativa submarina de los espacios Natura 2000 marinos al Decret 34/2014 y al Decret 31/2021 — la normativa general. El art. 4 hace lo propio con la pesca de superficie y el marisqueo. En 17 de las 21 zonas Natura 2000 cargadas, la conclusión para la pesca es «sin restricción específica». Comprobado además contra el Pla de Gestió Costa de Llevant, cuyo apartado 5.8.1 remite igualmente la pesca «en sus modalidades profesional, recreativa y submarina» a la dirección general de pesca.

**Lo que sí cambian.** Los planes de gestión aprobados sí regulan el mar por su cuenta:

| Norma | Qué añade |
|---|---|
| Pla de Gestió Costa de Llevant (Decret 17/2023), ap. 5.8.4 y 5.8.5 | Fondeo prohibido sobre *Posidonia*, *Cymodocea*, *Zostera*, maërl y coralígeno; navegación prohibida en zonas de baño y 3 nudos en la franja costera. En Portocolom, además, 3 nudos en toda la bahía y motos acuáticas prohibidas. |
| Pla de Gestió Serra de Tramuntana (Decret 49/2015), normas 3.9, 3.12 y 4.1 | Buceo permitido sin instrumentos de pesca; fondeo libre condicionado; prohibida la captura de *Pinna nobilis* y *Lithophaga lithophaga*. |
| PORN de la Serra de Tramuntana (Decreto 19/2007), arts. 77 a 83 | **Pesca submarina autorizable** (art. 80.1), pesca desde costa prohibida en las zonas terrestres de exclusión (art. 79.1), fondeo prohibido sobre posidonia y maërl (art. 82), navegación limitada (art. 77). |

Los espacios estatales (ES0000518, ES0000519, ES0000520 y el LIC del Canal de Menorca) no aportan régimen: la Orden AAA/1260/2014 solo somete a evaluación de repercusiones los planes y proyectos, y el plan de gestión que preveía su art. 4 no consta aprobado.

### Por qué el PORN es una figura aparte y no una etiqueta del ZEC

Porque las geometrías no coinciden. Medido por muestreo sobre las capas oficiales, la superficie de cada ZEC de Tramuntana que cae dentro del ámbito marino del Paratge Natural es:

| ZEC | Dentro del Paratge |
|---|---|
| Cala Figuera (ES5310094) | 99,9 % |
| Es Rajolí (ES5310077) | 99,9 % |
| S'Estaca - Punta de Deià (ES5310082) | 78,0 % |
| **Port des Canonge (ES5310081)** | **26,8 %** |

Etiquetar el polígono entero de Port des Canonge como «pesca submarina permitida con autorización» habría sido falso en el 73 % de su superficie. La autorización se ata a la geometría del PORN y es el motor quien decide, al cruzar las figuras que contienen el punto, si aplica. Dos puntos dentro del mismo ZEC dan hoy respuestas distintas, y es lo correcto.

### Pendiente

Dos espacios naturales protegidos de Mallorca están cargados sin ficha y se resuelven como «no determinable»: el **Parc Natural de la Península de Llevant** y el **Parc Natural Marítimo-terrestre es Trenc-Salobrar de Campos**. Se cargan igualmente porque ignorarlos sería peor: el art. 5 del Decret 91/2023 deja de remitir a la normativa general precisamente donde hay área marina de un espacio natural protegido, y el mapa debe al menos advertir que ahí hay una figura sin leer.

## La página no siempre basta

Ha pasado en las tres reservas completadas hasta ahora:

- **Ponent**: la página cubre la reserva y las zonas de alta protección, pero no las **zonas especiales de buceo**, regidas por el Decret 38/2022.
- **Sa Dragonera**: el ámbito estatal (reserva integral y cinco zonas de usos restringidos) se rige por la **Orden APA/1024/2020** del BOE, y els Calafats por la **Ordre 6/2025** del BOIB.
- **Llevant**: el ámbito estatal se rige por la **Orden APA/690/2018** del BOE.

Antes de dar una reserva por completa, comprobar el campo `NORMA` y `COMPETENT` de cada una de sus zonas: si aparece una norma distinta, o competencia estatal, hay que leer esa norma aparte. Las órdenes estatales están en el BOE en versión consolidada y se leen bien con `curl` sobre `https://www.boe.es/buscar/act.php?id=...`.

Las normas estatales se construyen «al revés» que las autonómicas: un artículo enumera los usos permitidos y otro prohíbe todo lo que no figure. Al redactar una ficha estatal hay que mirar **qué no está en la lista**, no solo lo que aparece como prohibido.

## Procedimiento para completar una reserva

1. Listar sus zonas y sus normas:
   ```bash
   node -e "const g=JSON.parse(require('fs').readFileSync('src/data/protected-areas.mallorca.geojson','utf8'));for(const f of g.features)console.log(f.properties.competencia,'|',f.properties.normas[0]?.titulo,'|',f.properties.zoneId)"
   ```
   (hay que leer el fichero: `require` de un `.geojson` lo interpreta como JavaScript y falla)
2. Leer la página de regulación de la tabla y cualquier norma específica que aparezca.
3. Crear `src/rules/reservas-marinas/<reserva>.js`, declarando `heredaDe` en las zonas realmente interiores al perímetro.
4. Registrar las fuentes nuevas en `src/rules/fuentes.js`.
5. Importar el fichero en `src/rules/index.js`.
6. `npm run rules:check` — valida esquema, fuentes, herencia y anidamiento geométrico real.

## Extracción del texto

El sitio del Govern devuelve el contenido en `latin-1` pese a declarar otra cosa, y los extractores automáticos resumen en vez de transcribir. Para leer una página entera:

```bash
curl -sL -A "Mozilla/5.0" "<URL>" -o pagina.html
```

y decodificar probando `cp1252` y `latin-1`, quedándose con la que no produzca caracteres de sustitución.
