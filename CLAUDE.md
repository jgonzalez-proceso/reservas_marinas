# Restricciones marítimas — Illes Balears

## Qué es esto

**No es un mapa de reservas marinas. Es un motor de consulta de restricciones marítimas**, donde la reserva marina es *una* de las capas regulatorias.

El usuario pulsa un punto del mar. El motor reúne **todas** las figuras de protección que lo contienen, recupera sus fichas normativas y devuelve una conclusión por actividad: `PESCA SUBMARINA: PROHIBIDA`, con el motivo y la norma que lo justifica.

Este encuadre es deliberado. Diseñar alrededor de `ReservesMarines` obligaría a refactorizar media aplicación al incorporar Natura 2000, los espacios naturales protegidos o la protección de la posidonia — todas ellas se solapan sobre el mismo trozo de mar y todas aplican a la vez.

Estado: **cinco capas regulatorias activas**, 88 zonas, 87 con ficha redactada y citada.

- **Reservas marinas** (41 zonas, todas con ficha): las doce reservas de Baleares y sus zonas interiores, en sus ámbitos autonómico y estatal.
- **Red Natura 2000, ámbito marino** (35 zonas, todas con ficha): los espacios autonómicos del art. 2 del Decret 91/2023, los del ámbito marino de un plan de gestión aprobado que no están en esa lista, y 6 espacios marinos de gestión estatal.
- **Espacios naturales protegidos, ámbito marino** (7 zonas, 6 con ficha): Serra de Tramuntana, Cabrera, s'Albufera des Grau y sus reservas naturales, es Trenc-Salobrar y la Península de Llevant. Falta ses Salines d'Eivissa i Formentera, que se resuelve como `unknown` y marca el resultado como incompleto.
- **Zonificación marina de los ENP** (3 zonas, todas con ficha): el interior del ámbito marino de s'Albufera des Grau, repartido en zona de exclusión, de uso limitado y de uso compatible.
- **Regulación específica de pesca submarina** (2 zonas, ambas con ficha): los polígonos oficiales de pesca submarina prohibida y condicionada del mismo parque.

Cobertura por isla: **Mallorca 50/50**, **Menorca 27/27**, Eivissa 9/10, Formentera 4/5 y Cabrera 2/2. **Las doce reservas marinas de Baleares tienen ficha.** Cabrera **no se modela como reserva marina** sino como parque nacional, con el PRUG como fuente.

Lo único que falta es el ámbito marino del Parc Natural de ses Salines d'Eivissa i Formentera, que el mapa muestra y resuelve como no determinable.

La web lleva **selector de isla** y abre por defecto en **todas las islas a la vez**. La vista real se lee del hash de la URL (`#isla=eivissa`), para que se pueda compartir. `npm run rules:check` informa de la cobertura isla por isla.

`todas` **no es una isla** y por eso vive fuera de `ISLAS`, en `TODAS_LAS_ISLAS`. Meterla ahí rompería la validación de pertenencia —ninguna zona puede estar asignada a «todas»— y el reparto de la cartografía por fichero.

En esa vista hay que **deduplicar por `featureId`**: una figura que recae sobre dos islas está a propósito en los dos ficheros —el canal de Menorca en Mallorca y en Menorca, els Freus en Eivissa y en Formentera—, y sin deduplicar el panel enseñaría la misma reserva dos veces y el motor la contaría dos veces entre las figuras del punto.

El coste es real y conviene tenerlo presente: **29,6 MB de cartografía, unos 6,5 MB con gzip**, frente a 3,1 MB gzip de Mallorca sola o 2,9 de Menorca. Se descarga una vez y queda en caché, pero para una consulta puntual en el agua la vista de una isla es mucho más ligera.

**El encuadre inicial se aplaza un fotograma y fuerza `invalidateSize`.** Leaflet calcula el zoom con el tamaño del contenedor, y en el primer ciclo la disposición flexible todavía no ha asentado el ancho: daba zoom 9 en vez de 8 y dejaba Eivissa y Formentera fuera de pantalla.

La lista de trabajo reserva por reserva, con la URL oficial de cada una, está en [docs/regulacion-por-reserva.md](docs/regulacion-por-reserva.md).

## Comandos

```bash
abrir_web.bat        # arranca todo lo necesario y abre la web en Chrome
npm run dev          # servidor de desarrollo
npm run data         # descarga las fuentes activas y regenera src/data/
npm run verify       # contrasta las 64 coordenadas oficiales con la geometría
npm run rules:check  # integridad de fichas, islas y fuentes (corre antes del build)
npm test             # resuelve puntos reales y comprueba la conclusión
npm run links:check  # comprueba que los enlaces publicados siguen vivos (usa red)
npm run build        # rules:check + test + build de producción
```

`rules:check` valida la **forma** de las fichas: que citen fuente, que no haya ciclos de herencia, que ningún zoneId quede huérfano. Lo que no puede ver es si la conclusión que sale por el otro lado es la correcta, ni —sobre todo— **si una regla se ha atado al polígono equivocado**. Eso lo prueba `npm test`, que toma una coordenada concreta, la resuelve contra la cartografía real y comprueba el estado y de qué figura sale. Cada prueba afirma primero las propiedades geométricas del punto que usa, para que un cambio en una geometría oficial falle diciendo eso y no mande a buscar el error al sitio equivocado.

`links:check` **no se engancha al build**: el build tiene que funcionar sin red y de forma determinista, y esto depende de que el CAIB y el BOE estén en pie. Se ejecuta al tocar fuentes o permisos. Existe porque el panel manda a la gente a tramitar autorizaciones y a leer normas: la URL de permisos de buceo llevaba meses devolviendo **404** en siete fichas y ningún control lo veía.

Dos cosas que costó aprender y que el script ya incorpora. **Un 200 no basta**: el eboibfront contesta a un documento inexistente con un 200 y una redirección a su propia página `pdfError`, así que se compara el destino final, no solo el código. Y **nada se declara roto a la primera**: con seis peticiones en paralelo el BOIB desvía a `pdfError` enlaces que están perfectamente sanos —la misma URL que parecía rota sirve un PDF de 27 MB cuando se le pregunta sola—, así que la concurrencia baja a 4 y todo veredicto malo se reintenta. Un verificador que acusa en falso se acaba ignorando, que es la manera segura de perder un 404 de verdad.

Los 4xx hacen fallar; los 5xx, los 429 y los fallos de red solo avisan, porque son del servidor o del momento. `--estricto` hace fallar también con los avisos.

`abrir_web.ps1` **no comprueba si el puerto está ocupado, sino si responde nuestra web**. Comprobar el puerto es poco fiable en Windows —un proceso puede escuchar solo en `::1` y una prueba por IPv4 lo da por libre— y además no distingue nuestro servidor del de otro proyecto. La URL buena se lee de la salida de Vite, tomando la **última** coincidencia del log: si un arranque anterior dejó contenido, la primera sería la suya. Antes de buscarla hay que **quitar los códigos ANSI**: Vite pinta el puerto en negrita aunque su salida esté redirigida a un fichero, y `http://localhost:<ESC>[1m5173` no casa con ninguna expresión que espere el número pegado a los dos puntos — el script se quedaba los 90 s de espera mirando un servidor que ya estaba listo. Si aun así el log no da URL, se prueba el rango de puertos: la respuesta de la web manda sobre el log. La cartografía se da por descargada si hay ficheros en `src/data/capas/`, no por un nombre concreto; cuando se comprobaba `protected-areas.mallorca.geojson`, que ya no se genera, cada arranque volvía a descargar los 29,6 MB de IDEIB.

## Control de versiones

Este repositorio está en GitHub (`jgonzalez-proceso/reservas_marinas`, rama `main`) y **cada cambio se comitea y se pushea sin pedir confirmación previa**: es una autorización permanente, no algo que haya que volver a preguntar en cada sesión. Tras cualquier edición de código, datos o documentación —incluida esta— el asistente debe dejar el árbol de trabajo limpio con un commit descriptivo y empujarlo a `origin/main` antes de dar la tarea por terminada.

Excepción: operaciones destructivas o que reescriben historia (`push --force`, `reset --hard`, `rebase`, borrar ramas) siguen requiriendo confirmación explícita del usuario, igual que en cualquier otro repositorio.

Nota de entorno: el git de este equipo necesita `http.sslBackend=schannel` (almacén de certificados de Windows) para hablar con GitHub; con el backend `openssl` por defecto la verificación TLS falla por la inspección TLS de la red corporativa. Ya está configurado a nivel de repositorio (`git config http.sslBackend schannel`), no hace falta repetirlo.

## Estructura

```
scripts/
  fetch-sources.mjs      descarga genérica por fuente registrada
  verify-coords.mjs      control de calidad de la cartografía
  check-rules.mjs        integridad previa al build
  check-links.mjs        los enlaces publicados siguen vivos (fuera del build)
  test-reglas.mjs        resuelve puntos reales y comprueba la conclusión
src/
  sources/registry.js    fuentes declaradas (activas y registradas)
  sources/normalize.js   identidad, canonicalización geométrica, atributos
  engine/locate.js       punto -> figuras que lo contienen, distancia con signo
  engine/resolve.js      figuras -> conclusión por actividad
  rules/reservas-marinas/    fichas de las reservas
  rules/natura2000/          fichas de la Red Natura 2000 marina
  rules/espacios-naturales/  fichas de los ENP con ámbito marino
  rules/albufera-des-grau.js las 7 fichas del parque: reparte tres fuentes
                             pero sale de dos normas, así que va entero
  rules/normas-generales.js  normas que no son de ninguna figura (RD 191/2026)
  map/                   capas base, capa de áreas, geolocalización
  ui/                    panel, leyenda, buscador
  data/                  GENERADO + tablas declarativas
  data/capas/            GENERADO: lo que descarga el navegador
docs/fuentes.md          GENERADO por npm run verify
```

## Reglas del proyecto

### Datos generados

`src/data/protected-areas.geojson`, `src/data/capas/*.geojson`, `src/data/hitos.geojson` y `src/data/manifest.json` **son generados por `npm run data`**. No se editan a mano. Se versionan en el repo para que la web no dependa del servicio de IDEIB en tiempo de ejecución.

`src/data/islas.js`, `src/data/natura2000-marino.js` y `src/data/coordenadas-oficiales.js` **sí** son declarativos y se editan a mano.

La isla de una zona se declara en `islas.js`, salvo la de los espacios Natura 2000, que va en `natura2000-marino.js` junto al motivo por el que el espacio entra en el mapa. Se decide lo mismo en el mismo sitio y no hay dos tablas que puedan desincronizarse.

### Identidad: zoneId frente a featureId

- `zoneId` — identidad **jurídica** de la zona: fuente + denominación + protección + **competencia** (`rm-reserva-marina-de-la-badia-de-palma--reserva-marina--autonomica`). A esto se vinculan las fichas.
- `featureId` — identidad de una **geometría concreta** (`…--01`). Varias geometrías pueden compartir `zoneId`: una figura legal puede tener polígonos discontinuos.

Nunca deduplicar por `zoneId`, ni por `NOM` + `PROTECCIO`.

**La competencia forma parte de la identidad, no es un atributo descriptivo.** En el Llevant conviven una reserva marina estatal de 46,4 km² y una autonómica de 40,4 km² con el mismo nombre y el mismo tipo de protección, y sus regímenes difieren de verdad: la página oficial fija «máx. 6 anzuelos (máx. 4 en la zona estatal)» y reserva el esparavel, el salabre y el curricán de fondo al ámbito autonómico. Sin la competencia en el `zoneId` ambas colapsaban en una sola ficha incapaz de expresar esa diferencia.

### Estatal y autonómico son regímenes distintos

Cuatro de las cinco reservas de Mallorca tienen figuras de ambas administraciones. Las normas estatales (Orden APA/1024/2020 para sa Dragonera, Orden APA/690/2018 para el Llevant) se construyen **al revés** que las autonómicas: un artículo enumera los usos permitidos y otro prohíbe todo lo que no figure en esa lista. Al redactar una ficha estatal hay que mirar **qué no está en la lista**, no solo lo que aparece como prohibido — así es como se concluye, por ejemplo, que el buceo recreativo está prohibido en el ámbito estatal de sa Dragonera fuera de las zonas de usos restringidos.

### Un importe nulo no es gratis

`permit.importe === 0` significa gratuito; `null` significa **no publicado**. El panel los distingue: «Autorización gratuita» frente a «Requiere autorización · importe no publicado». Sin esa distinción anunciaba «Tasa: 0,00 €» para permisos cuyo precio no consta en ninguna fuente.

### Deduplicación: geometría idéntica no implica duplicado

Sobre un mismo perímetro pueden recaer varias figuras vigentes a la vez. Comprobado en los datos: l'Illa del Toro y les Illes Malgrats son **simultáneamente** zona d'alta protecció (Decret 26/2025) y zona especial de busseig (Decret 38/2022), con geometría coincidente.

La clave de deduplicación es geometría canónica + `zoneId`:

| Caso | Acción |
|---|---|
| misma geometría, mismo zoneId, mismos atributos | duplicado, se descarta |
| misma geometría, mismo zoneId, atributos distintos | **el script falla** |
| misma geometría, distinto zoneId | figuras superpuestas, se conservan ambas |

El caso fatal es real: una misma figura legal no puede estar regida a la vez por dos normas distintas. Requiere revisión humana contra el BOIB/BOE. **«El OBJECTID mayor gana» no tiene ninguna garantía jurídica y no se usa.**

La canonicalización normaliza orientación de anillo, punto inicial y orden de polígonos antes de comparar, porque dos geometrías equivalentes llegan del servicio con representaciones distintas.

### Natura 2000 no es sinónimo de prohibición

Es la corrección más importante de toda la capa, y va contra la intuición. El **art. 5 del Decret 91/2023** dice que en los espacios Natura 2000 marinos la pesca recreativa submarina se rige por el Decret 34/2014 y el Decret 31/2021 — la normativa general. El art. 4 hace lo mismo con la pesca de superficie y el marisqueo. Pintar Natura 2000 de rojo sería afirmar en el mapa lo contrario de lo que dice la norma.

Lo que sí ocurre es que muchos de estos espacios **se solapan** con reservas marinas o con el área marina de un espacio natural protegido, y ahí la restricción viene de esa otra figura. Los dos artículos lo escriben como una regla de conflicto entre capas: la remisión a la normativa general vale «que no coincideixin totalment ni parcialment amb l'àmbit d'una reserva marina o amb l'àrea marina d'un espai natural protegit».

Esa regla **no se resuelve dentro de la ficha** —una ficha no sabe qué otras figuras hay sobre el punto— sino en `engine/resolve.js`, que apila todas y deja mandar a la más restrictiva. Por eso las tres capas son fuentes independientes y no una tabla fusionada a mano.

Medido sobre las geometrías oficiales, en la ZEC de Port des Canonge (ES5310081) solo el **26,8 %** de la superficie cae dentro del ámbito marino del Paratge Natural de la Serra de Tramuntana; en Es Rajolí y Cala Figuera es el 99,9 % y en S'Estaca - Punta de Deià el 78 %. Marcar la ZEC entera como «permitida con autorización» habría sido falso en tres cuartas partes de Port des Canonge. La autorización se ata a la geometría del PORN, no a la del espacio Natura 2000.

### El ámbito forma parte de la identidad

Los espacios naturales protegidos se publican partidos en dos registros por el campo `AMBIT`: el Paratge Natural de la Serra de Tramuntana son 61.846 ha terrestres y 1.127 marinas. No son la misma zona ni tienen el mismo régimen —el PORN regula la pesca y el fondeo «en el ámbito marino que delimita este Plan»—, así que el ámbito entra en el `zoneId` igual que la competencia (`…--paratge-natural--mari`).

`AMBIT` **no es la competencia**, aunque el registro lo mapeara así en su primera versión. Solo se carga el ámbito marino: la parte terrestre es mucho mayor y no dice nada sobre lo que se puede hacer en el agua.

### La prohibición es de la figura que la escribe, no de la más famosa

En el levante de Mallorca conviven cuatro capas sobre el mismo mar: el Parc Natural de la Península de Llevant (61,9 km² marinos), la Reserva Marina del Llevant en sus ámbitos autonómico (40,4 km²) y estatal (46,4 km²), la reserva integral y las ZEC/ZEPA. **No cubren lo mismo.** Medido sobre las geometrías oficiales, el **16 %** de los puntos del ámbito marino del parque cae fuera de la reserva marina autonómica.

La pesca recreativa submarina está prohibida allí por el **art. 40.1.h del PORN de Llevant** (Decreto 8/2023), que es norma del *parque*. Atarla al polígono de la reserva marina —el reflejo obvio, porque es la figura que suena— habría dejado sin respuesta justo esa franja. Por eso la regla vive en la ficha del `enp-…--parc-natural--mari` y hay una prueba que pulsa un punto **dentro del parque y fuera de la reserva** y exige `prohibited`.

El mismo art. 39.1 lo escribe como una jerarquía y no como una alternativa: en el ámbito marino del parque rige su capítulo V y, «en defecte de previsió», el Decret 71/2016 de la reserva marina y el Decret 41/2015. Las capas se apilan; ninguna sustituye a otra.

**Es Trenc es el caso gemelo, y todavía más directo.** Allí la prohibición no está en un plan sino en la ley de declaración: el art. 4.1.c de la **Ley 2/2017** enumera la pesca submarina entre los usos prohibidos del ámbito marino del parque. No depende de que se apruebe el PRUG ni de la zonificación interior.

**En los dos casos la regla se ata al polígono de límites (`AMBIT='Marí'`, capa 35), no a la zonificación del PORN** (capas 27 y 28). Comprobado: la zonificación marina suma 2.325,6 ha en es Trenc y 6.194,2 en Llevant, frente a 2.326,0 y 6.192,0 del límite, y los 4.351 puntos muestreados dentro de la zonificación caen todos dentro del límite. El límite es un perímetro continuo; la zonificación son piezas que podrían dejar huecos. Cargar las capas 27 y 28 añadiría 1,2 MB de geometría sin cambiar ninguna respuesta.

### El límite de un espacio protegido no basta: s'Albufera des Grau

Es el caso que obligó a cargar el **interior** de un espacio, no solo su perímetro. Dentro del mismo Parc Natural de s'Albufera des Grau la pesca submarina está prohibida en 705,8 ha y es autorizable en 1.044,8 ha. Una sola ficha «Parc Natural de s'Albufera des Grau» con una única conclusión habría sido falsa en el 40 % o en el 60 % de su superficie, según cuál se eligiera.

La frontera **no se reconstruye a partir del texto.** El anexo II del PRUG la describe con dos rectas imaginarias —una al norte desde la punta oeste de s'Escala, otra al este desde el Morro de sa Falconera—, pero el IDEIB ya publica los dos polígonos en una capa propia (`GOIB_NATURA_ENP_04_AG`, capa 12, campo `TIPUS`). Redibujarlos a mano sería introducir un error donde hay un dato oficial.

Por eso el parque son **tres capas independientes que se apilan**, no una:

| Figura | Superficie | Qué añade |
|---|---|---|
| Parc Natural (límite) | 17,4 km² | Autorización previa para pescar a pulmón, fondeo y buceo regulados |
| Zonificación PRUG | el mismo interior | La zona de exclusión: ni pesca, ni fondeo, ni navegación, ni buceo |
| Pesca submarina | el mismo interior | Dónde la autorización habilita y dónde no |

Tres hallazgos que conviene no volver a descubrir:

- **La zona de exclusión marina del PRUG y el ámbito marino de las reservas naturales del Decret 51/2003 son el mismo trozo de agua**: 9,755 ha frente a 9,766 ha, mismo centro hasta la quinta decimal, en el interior del port d'Addaia. No colapsan en la deduplicación porque su geometría canónica no es idéntica —están digitalizadas dos veces con distinto número de vértices— y **no deben colapsar**: son dos figuras jurídicas con dos normas distintas que dicen lo mismo.
- **El Plan Sectorial de aprovechamiento pesquero no está aprobado.** El art. 47.2 del PORN de 2003 remite a él la pesca profesional y recreativa, y el apartado 5.3.5.1 del PRUG de 2021 sigue hablando de él como aplicable «una vez aprobado». Lo que el PRUG contiene es su anexo II, *«Criterios básicos para la elaboración del Plan Sectorial»*, que es el mandato del art. 30.g) de la Ley 5/2005 al redactor del futuro plan. Por eso la pesca de superficie queda en `restricted` y sus condiciones se citan **como criterios publicados, no como régimen exigible**. La excepción es la pesca submarina: sus condiciones sí se aplican porque viajan dentro de la autorización del art. 47.3, y la propia cartografía oficial las ha llevado a polígonos.
- **El buceo no es `allowed_with_authorization`.** El apartado 6.2.5 del PRUG lo permite en grupos de menos de 8 personas y lo hace autorizable a partir de 8; las empresas necesitan permiso siempre. Marcarlo como «requiere autorización» empujaría a pedir un permiso que la mayoría de los buceadores no necesita, así que es `restricted` con el umbral escrito en las condiciones.

**Las categorías de zonificación que no imponen nada van a `not_regulated`, no a `restricted`.** Las zonas de uso limitado y de uso compatible son categorías de planificación del art. 22 de la Ley 5/2005: fijan la vocación del área, no un régimen de usos. Si se les pusiera `restricted`, ganarían al parque por ser más pequeñas —*lex specialis*— y el panel enseñaría una restricción genérica en lugar de las condiciones reales del PORN y el PRUG. La única excepción es el fondeo en la zona de uso limitado, que el apartado 7.1.2 sí regula («donde el fondeo es una actividad regulada o prohibida») y cuya ficha lleva por eso sus condiciones completas, para no perder información al desplazar a la del parque.

### Lista blanca de espacios Natura 2000

La capa oficial publica más de doscientos espacios de Baleares y la mayoría son exclusivamente terrestres. `src/data/natura2000-marino.js` declara cuáles se cargan y **por qué motivo jurídico**, nunca por criterio geométrico:

| Motivo | Significado |
|---|---|
| `decret-91-2023-art-2` | El art. 2 lo lista nominalmente como espacio con ámbito marino. |
| `ambit-mari-del-pla-de-gestio` | No está en ese art. 2, pero sí en el ámbito marino de un plan de gestión aprobado cuyas normas marinas se aplican al plan en conjunto. |
| `estatal-aguas-exteriores` | Espacio marino de gestión estatal; su régimen está en el instrumento estatal. |

`rules:check` falla si un código declarado deja de aparecer en la capa descargada: significa que el espacio ha cambiado de designación o el servicio ha dejado de publicarlo, y eso hay que mirarlo.

Un espacio con doble designación lo publica el servicio **dos veces**, una por capa, con el mismo OBJECTID y la misma geometría. Es una sola figura jurídica —el art. 2 lista sa Dragonera una vez, como «LIC i ZEPA»—, así que se fusionan por `SITE_CODE` antes de calcular el `zoneId`, y la designación resultante es la unión de las capas donde aparece.

### Pertenencia a isla: nunca por centroide

`src/data/islas.js` declara explícitamente la isla de cada `zoneId`. **Prohibido derivarla de centroides o bounding boxes**: en polígonos marinos grandes el centroide puede caer lejos de la isla que la figura regula, y la pertenencia jurídica no se decide por una aproximación geométrica. Cuando se activen muchas capas, se sustituirá por intersección espacial contra las geometrías oficiales de las islas.

`npm run rules:check` falla si aparece una zona sin isla asignada.

### Modelo de reglas: enum, no booleanos

El estado de una actividad es uno de: `allowed`, `allowed_with_authorization`, `restricted`, `prohibited`, `not_regulated`, `unknown`. Nunca una combinación de booleanos como `permitida` + `requiereAutorizacion` + `salvoEnZonaX`, que es ambigua de leer y fácil de contradecir.

**`not_regulated` no es lo mismo que `unknown`.** `unknown` significa «no lo hemos investigado». `not_regulated` significa «hemos leído la norma de esta figura y no dice nada sobre esta actividad» — es una afirmación positiva, por eso exige fuente igual que cualquier otro estado no-`unknown`. Entra en la escala de restricción justo por debajo de `allowed` (ambos aportan cero restricción; si una figura permite algo expresamente y otra simplemente calla, la que lo permite expresamente gana como figura determinante). Se usa sobre todo para `navegación`, que casi ninguna orden de reserva regula.

- **La ausencia de ficha resuelve a `unknown`, jamás a `allowed`.**
- **`unknown` NO entra en la escala de restricción.** Si se pusiera arriba, una zona sin ficha enmascararía una prohibición conocida; si se pusiera abajo, se leería como permisiva. En su lugar marca el resultado como `incompleto`, que se muestra **junto** a la conclusión, no en su lugar.
- **Ninguna afirmación sin fuente.** Toda actividad con estado distinto de `unknown` debe citar al menos una clave de `src/rules/fuentes.js`. `rules:check` lo exige.
- **Las tasas viven dentro de cada `permit`**, con su `ultimaVerificacion`. No hay constante global de importes: no todas las reservas permiten las mismas modalidades y los importes cambian.
- **`normas` siempre es una lista.** Una figura puede estar afectada por su norma de creación, modificaciones posteriores y normativa general. El campo `NORMA` de IDEIB alimenta la lista pero no representa por sí solo el régimen vigente.

### Herencia de reglas: `heredaDe`

Una zona interior se rige por el régimen general de su reserva salvo en lo que su propia norma modifique. La ficha hija declara `heredaDe: '<zoneId>'` y solo escribe las actividades que cambian.

- **Una regla propia `unknown` NO borra la heredada.** Que la norma específica calle sobre el fondeo significa que rige el régimen general, no que se desconozca.
- Las `normas` se acumulan: la zona queda sujeta a la suya y a la de la reserva.
- Las reglas heredadas llevan `heredadaDe` y el panel lo dice: *«Regla del régimen general de X»*.

**La herencia se declara, nunca se infiere de la geometría.** En el Migjorn las zonas de veda e integral son polígonos *adyacentes* al perímetro general, no interiores, y heredar allí sería jurídicamente falso. Santa Ponça, por la misma razón, no hereda: la página oficial dice que «ha quedado fuera del área de la reserva marina actual».

**Y no se infiere tampoco cuando «es obvio».** Las tres zonas interiores de las Pitiüses parecían candidatas claras y las tres las rechazó esta comprobación: ni un punto de la reserva integral de la Llosa des Figueral, de la punta de na Bruta ni de la zona de na Bosc-es Vaixell-na Gorra cae dentro del polígono de su reserva. Las dos últimas caen sobre los agujeros con que la geometría oficial recorta las islas —0,64 km² en es Vedrà, 0,31 en ses Bledes—; la primera está sencillamente fuera del perímetro. Como el motor no verá la reserva general sobre esos puntos, cada subzona lleva su régimen escrito entero.

`rules:check` valida existencia, ausencia de ciclos y —muestreando un punto interior— que la hija esté **realmente contenida** en la madre. Si no, falla.

### Las condiciones no se fusionan entre figuras

A igual grado de restricción manda la figura **más específica** (menor área; el `zoneId` desempata para que sea estable). Es *lex specialis*: dentro de la zona de alta protección de les Malgrats la pesca desde embarcación está permitida con autorización igual que en el resto de la reserva, pero solo con caña y potera y en ventanas estacionales.

Por eso `resolve.js` muestra **solo las condiciones de la figura que determina el estado**, y añade las de otras figuras únicamente cuando son igual de específicas o más. Fusionarlas todas haría aparecer el curricán y el spinning como permitidos dentro de una zona que los prohíbe — el error opuesto al que existe esta web.

Las obligaciones generales que sí sobreviven a la sustitución —autorización, registro de capturas, prohibición de competiciones— viajan en el `permit`, que se hereda.

### Geometrías degeneradas

`fetch-sources.mjs` descarta los polígonos por debajo de 100 m². La capa oficial arrastra residuos de figuras derogadas reducidos a un punto: «Reserva Marina Illes Malgrats» (OBJECTID 3566) mide 0,005 m², resto de la reserva que sustituyó el Decret 26/2025. No puede contener ningún punto, pero ocupaba una línea del listado como si fuera real.

Se descarta **con constancia**, pero el detalle no viaja al navegador. `main.js` importa `manifest.json`, así que todo lo que se meta ahí acaba en el bundle: las 441 esquirlas del recorte marino de la zonificación de s'Albufera des Grau eran 120 kB de JavaScript que nadie llega a leer. El recuento y un resumen por figura se quedan en `manifest.json` —donde se mira todo lo demás— y el detalle completo, con OBJECTID, nombre, área y motivo, va a **`src/data/descartadas.json`**, versionado y fuera del build. En consola se enumeran hasta 20 y a partir de ahí se resumen. Un dato oficial nunca se elimina en silencio.

### El clic devuelve todas las figuras

Los polígonos se dibujan con `interactive: false`. El clic lo escucha el mapa y lo resuelve el motor, que devuelve **todas** las figuras que contienen el punto, ordenadas de la más general a la más restrictiva. Nunca se resuelve por «el polígono de encima».

El dibujo se ordena por área descendente para que las zonas interiores pequeñas queden visibles y alcanzables con el dedo.

### Ningún mensaje puede afirmar ausencia de restricciones

Fuera de toda figura, el mensaje es el de `SIN_FIGURAS` en `engine/resolve.js`:

> Este punto no está dentro de ninguna de las zonas de protección actualmente cargadas en el mapa. Sigue siendo aplicable la normativa general y pueden existir otras restricciones.

Con solo las reservas marinas cargadas, decir «no hay restricciones» sería falso: faltan Natura 2000, los ENP, la posidonia y la normativa general de pesca recreativa.

### Los datos se sirven partidos por isla y por fuente

`src/data/capas/<fuente>.<isla>.geojson` es lo que descarga el navegador; `src/data/protected-areas.geojson` es el fichero combinado que solo usan los scripts. Están en directorios distintos a propósito: el `import.meta.glob` de `main.js` apunta a `capas/`, y cuando apuntaba a todo `src/data` metía en el build los 16 MB del combinado, que el navegador no llega a pedir nunca.

Las tres capas de la isla activa se descargan **en paralelo y se espera a tenerlas todas** antes de resolver ningún punto. Contestar con parte de las capas cargadas daría una respuesta que parece completa sin serlo.

Las capas se pueden ocultar desde el control del mapa, pero **ocultar no desactiva**: el motor resuelve siempre contra todas las geometrías cargadas. La visibilidad es comodidad de lectura, no un filtro jurídico, y sería peligroso que apagar una capa hiciera desaparecer una prohibición de la respuesta. La leyenda lo dice, y la leyenda enumera solo lo que está dibujado en ese momento.

**Qué capas arrancan encendidas lo decide `afectaALaPesca`, en `src/rules/index.js`**, no una lista fija. Una fuente arranca apagada si de ninguna de sus zonas consta que imponga algo propio a la pesca recreativa —estado `allowed_with_authorization`, `restricted` o `prohibited` en alguna de las tres modalidades—. Hoy eso apaga la Red Natura 2000: sus más de 5.000 km² sobre Mallorca teñían media pantalla y tapaban las zonas pequeñas, que son las que llevan las prohibiciones, sin restringir ni una modalidad de pesca. Si mañana un plan de gestión añade una regla pesquera, la capa se enciende sola.

**Ante la duda, se dibuja.** Una zona sin ficha, o con la actividad en `unknown`, cuenta como que afecta: no hemos leído su norma, así que no podemos afirmar que no imponga nada, y esconderla sería dar por bueno un silencio que solo es nuestro. Por eso los dos ENP sin ficha siguen visibles.

Cada fuente se dibuja en su propio **plano de Leaflet** con un z fijo, de abajo arriba: `natura2000` 401, `zonificacion-enp` 402, `espacios-naturales` 403, `reservas-marinas` 404 y `regulacion-pesca-submarina` 405. Sin planos, apagar y volver a encender una capa desde el control la recolocaría encima de todo, que es justo lo que se quería evitar. La de pesca submarina va arriba del todo porque es la que contesta directamente a la pregunta de esta web, y quedar debajo del parque la haría invisible justo donde importa.

**La leyenda arranca plegada en cualquier tamaño de pantalla.** Explica los colores, que es información de apoyo: quien abre la web quiere ver el mar y pulsar un punto, no leer una lista de figuras que además tapa parte del mapa desde el primer segundo.

**«Lo determina» muestra el nombre y el tipo de protección, nunca solo el nombre.** Sobre un mismo punto del Llevant conviven la reserva marina y la reserva integral con idéntica denominación, y sobre s'Albufera des Grau el parque, su zonificación y la capa de pesca submarina llevan los tres el nombre del parque. Sin el tipo, la frase no identifica ninguna figura.

El dibujo va sobre **canvas**, no sobre SVG. Con Natura 2000 cargado, Mallorca pasa de unos miles de vértices a más de cuatrocientos mil: la ZEPA del norte tiene 171.000 ella sola, porque su límite de tierra recorre toda la costa. Un elemento SVG por polígono con esa densidad bloquea el navegador en un móvil.

### Poda de distancias: exacta, no aproximada

`distanciaAlBorde` medía contra todos los segmentos de todos los polígonos, y con esas geometrías el veredicto de GPS tardaba 1,4 s. Ahora el contorno se trocea en bloques de 128 vértices con su caja envolvente, y `evaluaPosicion` recorre además las figuras por caja más próxima. La distancia a una caja es una **cota inferior** de la distancia real, así que lo que ya está más lejos que el mejor resultado conocido se descarta sin medirlo: 4–78 ms, y el resultado es idéntico al de medir todo (comprobado contra `@turf/point-to-polygon-distance`, diferencia máxima 0,00 m).

La constante de metros por grado se elige **por debajo** del valor real en Baleares. Quedarse corto mantiene la cota como cota inferior: podría podar de menos, nunca de más. Nunca subirla para ganar velocidad.

### Geolocalización: dentro, fuera o dudosa

`@turf/point-to-polygon-distance` devuelve distancia **con signo** (negativa dentro). Con la precisión `r` del GPS:

- `d < -r` → dentro con certeza
- `d > +r` → fuera con certeza
- `|d| ≤ r` → **posición dudosa**, y se dice explícitamente que no es determinable

A 5 m del límite con GPS de ±18 m no se puede afirmar de qué lado se está. Responder «estás fuera» con esa confianza es lo que hace que a alguien lo multen.

## Fuentes de datos

Servidor ArcGIS REST público del Govern, `https://ideib.caib.es/geoserveis/rest/services/public/`. Nativo en EPSG:25831; se pide `outSR=4326`.

| Fuente | Servicio | Estado |
|---|---|---|
| `reservas-marinas` | `GOIB_ReservesMarines` (capa 1 polígonos, capa 0 hitos) | **activa** |
| `natura2000` | `GOIB_NATURA_N2000_IB` (ZEC/LIC/ZEPA, autonómica y estatal) | **activa**, filtrada a la lista blanca marina |
| `espacios-naturales` | `GOIB_NATURA_ENP_IB` (capa 35, límites ENP) | **activa**, filtrada a `AMBIT='Marí'` |
| `zonificacion-enp` | `GOIB_NATURA_ENP_04_AG` (capa 10, zonificación PRUG) | **activa**, filtrada a `AMBIT='Marí'` |
| `regulacion-pesca-submarina` | `GOIB_NATURA_ENP_04_AG` (capa 12) | **activa** |
| `posidonia` | `GOIB_Posidonia_IB` (Decret 25/2018) | registrada |

Activar una fuente es cambiar `activa: true` en `src/sources/registry.js`, ejecutar `npm run data`, asignar islas y redactar fichas.

Las fuentes admiten dos filtros: `filtroWhere` es la cláusula que se manda al servicio —optimización de red, para no descargar doscientos espacios terrestres y tirarlos después— y `incluye(attrs)` es la regla de verdad, que se aplica igualmente sobre lo descargado. Las capas de zonificación PRUG de Cabrera y sa Dragonera (22 y 23) siguen sin cargarse: subdividen el interior de esos espacios y necesitan fichas propias.

**Ortofoto:** el mapa arranca sobre el **satélite mundial de Esri** y la ortofoto oficial del IDEIB es una base **activable** desde el selector. La oficial enseña el fondo marino a través del agua —posidonia, roquedo—, que en un mapa de reservas marinas es información útil y el satélite no da: ahí el mar es una masa plana. A cambio su mosaico está cosido a partir de vuelos de fechas distintas y las costuras entre bloques se notan sobre todo en mar abierto, donde el tono del agua depende del día del vuelo; se comprobó pidiendo al WMS la misma zona a 128 y a 2048 píxeles y el corte cae en el mismo sitio, así que no es un efecto del zoom sino del propio mosaico. Por eso no es la base de arranque. El caché REST de `GOIB_Orto_IB` es EPSG:25831 y obligaría a montar todo el mapa en ese CRS, dejando fuera OpenStreetMap y OpenSeaMap. Su **WMS sí anuncia EPSG:3857**, y por ahí se consume. El endpoint correcto es `/geoserveis/services/…` — **sin** `/rest`, que devuelve el directorio HTML de ArcGIS, no capacidades WMS.

**La ortofoto no cubre el mar abierto y sus huecos son color, no nodata.** Hasta z11 el mosaico sirve una batimetría que rellena su bbox declarado (0,96–4,45 E / 38,28–40,30 N) con esquinas en blanco opaco; desde z12 pasa al vuelo fotográfico (tierra + franja costera de pocos km) y las teselas del borde del vuelo llevan el blanco horneado en los píxeles. `transparent: true` no puede eliminarlo: para el WMS ese blanco es imagen. La base «Ortofoto» es por eso un grupo: satélite mundial de Esri debajo y la ortofoto IDEIB encima, limitada a z≥12 (el umbral medido donde el servicio cambia de batimetría a vuelo), acotada a su bbox y con el casi-blanco (r,g,b ≥ 250) filtrado a transparente en un canvas por tesela; además se come la franja antialiasada del borde del vuelo y se difumina el alfa en rampa hacia el límite, pidiendo cada tesela con un margen extra que luego se recorta para que un borde que caiga justo en el corte de tesela también quede limpio. El vuelo llega además mucho más pálido que el satélite de Esri (velo blanco, negros levantados; comprobado tesela a tesela) y, como Esri carga primero, sin corregir parecía que al mapa le caía niebla al terminar de cargar: cada tesela se corrige recolocando el punto negro y subiendo la saturación, siempre después del filtro de blanco, que decide sobre los píxeles originales. El filtro depende de que el WMS del IDEIB sirva CORS abierto (hoy lo hace, reflejando el origen); si dejara de hacerlo, la tesela se muestra sin filtrar en vez de romper la capa. Los falsos positivos del filtro son inofensivos: debajo está la imagen de Esri del mismo lugar. El control de capas va con `autoZIndex: false`: sobre un `L.layerGroup` propagaría el mismo z a todos sus hijos y dejaría fondo y ortofoto en el mismo plano.

## Cosas aprendidas de los datos

- **La zonificación no se modela igual en todas las reservas.** En el Ponent, las zonas del Toro y els Malgrats están *dentro* del polígono de la reserva marina (3 figuras apiladas). En el Migjorn, la zona de veda y la integral son polígonos *adyacentes*, fuera del perímetro general. Por eso el motor apila lo que hay y no presupone anidamiento.
- Los agujeros de los polígonos son islotes y escollos (el mayor del Migjorn son 5,7 ha), no zonificación interna.
- Las tablas oficiales del Migjorn publican un cuadrilátero `f-g-h-i` que no se corresponde con ningún polígono vigente. Documentado en `DISCREPANCIAS_CONOCIDAS`.
- La capa de hitos permite distinguir un error de transcripción de una diferencia de geometría: si el hito coincide y el polígono no, el dato está bien y lo que difiere es la cartografía.

## Verificación de coordenadas

`npm run verify` mide cada vértice publicado contra el contorno más cercano de su reserva: ≤5 m ok, ≤20 m aviso, ≤50 m revisar, >50 m error.

Estado actual de la verificacion: **64 puntos — 52 ok, 5 aviso, 4 revisar, 3 error documentados.**

Las discrepancias >50 m solo dejan de fallar si están en `DISCREPANCIAS_CONOCIDAS` de `src/data/coordenadas-oficiales.js` **con su motivo**. Una discrepancia nueva hace fallar el script, que es lo que se quiere. **Nunca subir el umbral para que dejen de aparecer.**

## Aviso legal

Web informativa **no oficial**. La fuente vinculante es la norma publicada en el BOIB o el BOE y la cartografía oficial de IDEIB. El pie muestra siempre la fecha de descarga de los datos, tomada de `manifest.json`.
