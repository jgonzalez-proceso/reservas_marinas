# Trazabilidad de fuentes y verificación de coordenadas

> Documento generado por `npm run verify`. No editar a mano.

Generado: 2026-08-17T15:32:58.523Z

## Procedencia de los datos

### Reservas marinas
- Servicio: https://ideib.caib.es/geoserveis/rest/services/public/GOIB_ReservesMarines/MapServer
- Catálogo de datos abiertos: https://intranet.caib.es/opendatacataleg/dataset/limits-reserves-marines-illes-balears
- Descargado: 2026-08-17T15:29:57.938Z
- Geometrías: 42 · Hitos: 108
### Red Natura 2000 (ámbito marino)
- Servicio: https://ideib.caib.es/geoserveis/rest/services/public/GOIB_NATURA_N2000_IB/MapServer
- Catálogo de datos abiertos: https://www.caib.es/sites/xarxanatura/ca/inici-46017/
- Descargado: 2026-08-17T15:30:28.478Z
- Geometrías: 35 · Hitos: 0
### Espacios naturales protegidos (ámbito marino)
- Servicio: https://ideib.caib.es/geoserveis/rest/services/public/GOIB_NATURA_ENP_IB/MapServer
- Catálogo de datos abiertos: https://www.caib.es/sites/espaisnaturalsprotegits/ca/inici-22930/
- Descargado: 2026-08-17T15:30:34.468Z
- Geometrías: 7 · Hitos: 0
### Zonificación marina de los espacios naturales protegidos
- Servicio: https://ideib.caib.es/geoserveis/rest/services/public/GOIB_NATURA_ENP_04_AG/MapServer
- Catálogo de datos abiertos: https://www.caib.es/sites/espaisnaturalsprotegits/es/parc_natural_de_salbufera_des_grau/
- Descargado: 2026-08-17T15:30:41.173Z
- Geometrías: 198 · Hitos: 0
### Regulación específica de pesca submarina
- Servicio: https://ideib.caib.es/geoserveis/rest/services/public/GOIB_NATURA_ENP_04_AG/MapServer
- Catálogo de datos abiertos: https://www.caib.es/seucaib/es/tramites/tramite/1831120
- Descargado: 2026-08-17T15:30:41.525Z
- Geometrías: 2 · Hitos: 0
## Verificación contra las coordenadas oficiales publicadas

Distancia de cada vértice publicado por el Govern al contorno más cercano
de su reserva en la geometría de IDEIB. Umbrales: ≤5 m ok, ≤20 m aviso,
≤50 m revisar, >50 m error.

**64 puntos: 52 ok, 5 aviso, 4 revisar, 3 error.**

La columna *hito* mide la distancia al vértice publicado en la capa oficial de
hitos. Un hito a menos de 5 m confirma que la transcripción de la tabla es
correcta: si aun así el polígono difiere, la diferencia está en la geometría
publicada y no en el dato.

| Reserva | Punto | Coordenada oficial | Al contorno | Al hito | Estado | Zona |
|---|---|---|---|---|---|---|
| Reserva Marina de la Badia de Palma | A | 39° 29,936' N — 2° 44,855' E | 0.5 m (dentro) | 1.0 m | ok | rm-reserva-marina-de-la-badia-de-palma--reserva-marina--autonomica |
| Reserva Marina de la Badia de Palma | B | 39° 29,936' N — 2° 42,130' E | 11.1 m | 11.1 m | aviso | rm-reserva-marina-de-la-badia-de-palma--reserva-marina--autonomica |
| Reserva Marina de la Badia de Palma | C | 39° 24,730' N — 2° 43,750' E | 1.2 m (dentro) | 2.7 m | ok | rm-reserva-marina-de-la-badia-de-palma--reserva-marina--autonomica |
| Reserva Marina de la Badia de Palma | D | 39° 24,730' N — 2° 44,380' E | 0.1 m | 0.1 m | ok | rm-reserva-marina-de-la-badia-de-palma--reserva-marina--autonomica |
| Reserva Marina de la Badia de Palma | a | 39° 28,592' N — 2° 43,342' E | 1.0 m | 1.1 m | ok | rm-reserva-marina-de-la-badia-de-palma--zona-de-proteccio-especial--autonomica |
| Reserva Marina de la Badia de Palma | b | 39° 28,430' N — 2° 42,260' E | 0.0 m | 0.0 m | ok | rm-reserva-marina-de-la-badia-de-palma--reserva-marina--autonomica |
| Reserva Marina de la Badia de Palma | c | 39° 27,550' N — 2° 43,620' E | 0.0 m | 1558.1 m | ok | rm-reserva-marina-de-la-badia-de-palma--reserva-marina--autonomica |
| Reserva Marina de la Badia de Palma | d | 39° 27,036' N — 2° 44,482' E | 0.5 m (dentro) | 0.7 m | ok | rm-reserva-marina-de-la-badia-de-palma--reserva-marina--autonomica |
| Reserva Marina del Migjorn de Mallorca | A | 39° 21,830' N — 2° 47,335' E | 172.9 m | 6841.1 m | documentada | rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica |
| Reserva Marina del Migjorn de Mallorca | B | 39° 15,617' N — 2° 55,183' E | 26.3 m (dentro) | 178.0 m | revisar | rm-reserva-marina-del-migjorn-de-mallorca--zona-de-veda-de-pesca-recreativa--autonomica |
| Reserva Marina del Migjorn de Mallorca | C | 39° 13,428' N — 2° 57,935' E | 20.0 m | 28.1 m | revisar | rm-reserva-marina-del-migjorn-de-mallorca--zona-de-veda-de-pesca-recreativa--autonomica |
| Reserva Marina del Migjorn de Mallorca | D | 39° 13,428' N — 3° 03,535' E | 0.4 m | 0.6 m | ok | rm-reserva-marina-del-migjorn-de-mallorca--zona-de-veda-de-pesca-recreativa--autonomica |
| Reserva Marina del Migjorn de Mallorca | E | 39° 19,330' N — 3° 10,435' E | 0.8 m (dentro) | 2.8 m | ok | rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica |
| Reserva Marina del Migjorn de Mallorca | F | 39° 19,700' N — 3° 10,435' E | 48.6 m | 688.3 m | revisar | rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica |
| Reserva Marina del Migjorn de Mallorca | a | 39° 17,530' N — 3° 05,780' E | 0.0 m | 2121.2 m | ok | rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica |
| Reserva Marina del Migjorn de Mallorca | b | 39° 16,830' N — 3° 06,950' E | 0.0 m | 0.0 m | ok | rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica |
| Reserva Marina del Migjorn de Mallorca | c | 39° 17,290' N — 3° 07,580' E | 0.0 m | 0.0 m | ok | rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica |
| Reserva Marina del Migjorn de Mallorca | d | 39° 18,130' N — 3° 06,570' E | 8.1 m | 2126.4 m | aviso | rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica |
| Reserva Marina del Migjorn de Mallorca | f | 39° 19,578' N — 2° 59,158' E | 17.5 m (dentro) | 9298.9 m | aviso | rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica |
| Reserva Marina del Migjorn de Mallorca | g | 39° 18,394' N — 2° 57,590' E | 2310.1 m (dentro) | 6190.3 m | documentada | rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica |
| Reserva Marina del Migjorn de Mallorca | h | 39° 19,558' N — 2° 54,642' E | 2924.2 m (dentro) | 7224.5 m | documentada | rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica |
| Reserva Marina del Migjorn de Mallorca | i | 39° 21,776' N — 2° 57,380' E | 18.2 m | 11776.7 m | aviso | rm-reserva-marina-del-migjorn-de-mallorca--reserva-marina--autonomica |
| Reserva Marina del Llevant de Mallorca | A | 39° 45,370' N — 3° 19,200' E | 0.2 m (dentro) | 3.9 m | ok | rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--autonomica |
| Reserva Marina del Llevant de Mallorca | B | 39° 52,067' N — 3° 19,200' E | 0.6 m | 0.6 m | ok | rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--autonomica |
| Reserva Marina del Llevant de Mallorca | C | 39° 49,000' N — 3° 26,500' E | 0.0 m | 0.0 m | ok | rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--estatal |
| Reserva Marina del Llevant de Mallorca | D | 39° 42,150' N — 3° 30,000' E | 0.0 m | 0.0 m | ok | rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--estatal |
| Reserva Marina del Llevant de Mallorca | E | 39° 42,150' N — 3° 27,380' E | 1.6 m | 7.0 m | ok | rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--estatal |
| Reserva Marina del Llevant de Mallorca | F | 39° 44,840' N — 3° 27,570' E | 1.7 m | 5.5 m | ok | rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--autonomica |
| Reserva Marina del Llevant de Mallorca | a | 39° 47,290' N — 3° 21,000' E | 3.1 m | 4.0 m | ok | rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--autonomica |
| Reserva Marina del Llevant de Mallorca | b | 39° 49,000' N — 3° 21,000' E | 0.0 m | 0.0 m | ok | rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--autonomica |
| Reserva Marina del Llevant de Mallorca | c | 39° 49,000' N — 3° 23,850' E | 0.0 m | 0.0 m | ok | rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--estatal |
| Reserva Marina del Llevant de Mallorca | d | 39° 45,850' N — 3° 23,850' E | 1.2 m (dentro) | 32.6 m | ok | rm-reserva-marina-del-levante-de-mallorca-cala-rajada--reserva-marina--autonomica |
| Reserva Marina de sa Dragonera | A | 39° 36,333' N — 2° 21,367' E | 4.0 m | 1779.4 m | ok | rm-reserva-marina-de-sa-dragonera-reserva-marina-autonomica--reserva-marina--autonomica |
| Reserva Marina de sa Dragonera | B | 39° 35,883' N — 2° 20,333' E | 2.3 m | 104.7 m | ok | rm-reserva-marina-de-sa-dragonera-reserva-marina-autonomica--reserva-marina--autonomica |
| Reserva Marina de sa Dragonera | C | 39° 34,366' N — 2° 18,183' E | 0.2 m | 628.7 m | ok | rm-reserva-marina-de-sa-dragonera-reserva-marina-autonomica--reserva-marina--autonomica |
| Reserva Marina de sa Dragonera | D | 39° 34,029' N — 2° 18,133' E | 0.5 m | 0.0 m | ok | rm-reserva-marina-de-sa-dragonera-reserva-marina-estatal--reserva-marina--estatal |
| Reserva Marina de sa Dragonera | E | 39° 33,875' N — 2° 20,792' E | 6.2 m | 2663.5 m | aviso | rm-reserva-marina-de-sa-dragonera-reserva-marina-autonomica--reserva-marina--autonomica |
| Reserva Marina de sa Dragonera | F | 39° 36,333' N — 2° 19,958' E | 0.9 m | 1.1 m | ok | rm-reserva-marina-de-sa-dragonera-reserva-marina-estatal--reserva-marina--estatal |
| Reserva Marina de sa Dragonera | G | 39° 34,580' N — 2° 17,360' E | 0.0 m | 0.0 m | ok | rm-reserva-marina-de-sa-dragonera-reserva-marina-estatal--reserva-marina--estatal |
| Reserva Marina de sa Dragonera | h | 39° 35,831' N — 2° 20,305' E | 0.3 m (dentro) | 0.3 m | ok | rm-reserva-marina-de-sa-dragonera-reserva-marina-autonomica--reserva-marina--autonomica |
| Reserva Marina de sa Dragonera | i | 39° 35,514' N — 2° 20,407' E | 0.8 m | 0.9 m | ok | rm-entorn-dels-illots-dels-calafats--zona-d-alta-proteccio--autonomica |
| Reserva Marina de sa Dragonera | j | 39° 35,173' N — 2° 19,992' E | 0.5 m | 0.7 m | ok | rm-entorn-dels-illots-dels-calafats--zona-d-alta-proteccio--autonomica |
| Reserva Marina de sa Dragonera | k | 39° 35,205' N — 2° 19,733' E | 0.4 m | 0.5 m | ok | rm-entorn-dels-illots-dels-calafats--zona-d-alta-proteccio--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | A | 39° 29,184' N — 2° 32,116' E | 0.2 m (dentro) | 0.8 m | ok | rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | B | 39° 29,073' N — 2° 33,147' E | 0.9 m | 0.9 m | ok | rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | C | 39° 26,369' N — 2° 31,056' E | 0.0 m | 0.0 m | ok | rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | D | 39° 27,459' N — 2° 28,043' E | 0.0 m (dentro) | 1.0 m | ok | rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | E | 39° 29,260' N — 2° 27,129' E | 0.0 m | 0.1 m | ok | rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | F | 39° 29,586' N — 2° 26,048' E | 0.7 m | 0.8 m | ok | rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | G | 39° 30,589' N — 2° 27,558' E | 0.1 m | 0.9 m | ok | rm-zona-de-proteccio-pesquera-de-la-badia-de-santa-ponca--zona-de-proteccio-pesquera--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | H | 39° 31,138' N — 2° 28,009' E | 0.0 m | 0.0 m | ok | rm-zona-de-proteccio-pesquera-de-la-badia-de-santa-ponca--zona-de-proteccio-pesquera--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | i | 39° 30,291' N — 2° 27,374' E | 0.5 m (dentro) | 0.8 m | ok | rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | j | 39° 29,803' N — 2° 26,627' E | 0.0 m | 0.5 m | ok | rm-zona-d-alta-proteccio-de-les-illes-malgrats--zona-d-alta-proteccio--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | k | 39° 29,554' N — 2° 26,877' E | 0.8 m | 0.8 m | ok | rm-zona-d-alta-proteccio-de-les-illes-malgrats--zona-d-alta-proteccio--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | l | 39° 29,933' N — 2° 27,565' E | 0.1 m | 0.5 m | ok | rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | m | 39° 28,650' N — 2° 28,684' E | 0.4 m | 0.4 m | ok | rm-zona-d-alta-proteccio-de-l-illa-del-toro--zona-d-alta-proteccio--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | n | 39° 27,688' N — 2° 28,105' E | 0.5 m | 0.5 m | ok | rm-zona-d-alta-proteccio-de-l-illa-del-toro--zona-d-alta-proteccio--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | o | 39° 27,578' N — 2° 28,271' E | 0.2 m (dentro) | 0.7 m | ok | rm-zona-d-alta-proteccio-de-l-illa-del-toro--zona-d-alta-proteccio--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | p | 39° 28,313' N — 2° 29,492' E | 0.6 m (dentro) | 0.9 m | ok | rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | q | 39° 28,916' N — 2° 32,403' E | 26.4 m | 0.0 m | revisar | rm-zona-d-alta-proteccio-de-l-illa-del-sec--zona-d-alta-proteccio--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | r | 39° 28,855' N — 2° 32,683' E | 0.0 m | 0.0 m | ok | rm-zona-d-alta-proteccio-de-l-illa-del-sec--zona-d-alta-proteccio--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | s | 39° 28,638' N — 2° 32,455' E | 0.0 m | 0.0 m | ok | rm-zona-d-alta-proteccio-de-l-illa-del-sec--zona-d-alta-proteccio--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | t | 39° 28,698' N — 2° 32,277' E | 0.0 m | 0.0 m | ok | rm-zona-d-alta-proteccio-de-l-illa-del-sec--zona-d-alta-proteccio--autonomica |
| Reserva Marina de les Illes del Ponent de Mallorca, el Toro, les Malgrats i el Sec | u | 39° 27,702' N — 2° 30,016' E | 0.0 m (dentro) | 1357.2 m | ok | rm-reserva-marina-del-ponent-de-mallorca--reserva-marina--autonomica |

## Discrepancias documentadas

Diferencias investigadas y aceptadas. Cualquier discrepancia nueva hace
fallar `npm run verify`.

### Reserva Marina del Migjorn de Mallorca — punto A

- Distancia al contorno: 172.9 m
- Revisado: 2026-08-15
- El vértice cae sobre la costa, en Cap Blanc. La geometría oficial está recortada a la línea de costa y el vértice publicado en el decreto no lo está, de ahí la separación.

### Reserva Marina del Migjorn de Mallorca — punto g

- Distancia al contorno: 2310.1 m
- Revisado: 2026-08-15
- El cuadrilátero f-g-h-i de la tabla no se corresponde con ningún polígono de la capa oficial vigente: f e i quedan a ~18 m del límite de la reserva marina, mientras g y h caen 2,3 y 2,9 km dentro. Pendiente de contrastar contra el plano de zonificación publicado por el Govern.

### Reserva Marina del Migjorn de Mallorca — punto h

- Distancia al contorno: 2924.2 m
- Revisado: 2026-08-15
- Mismo caso que el punto g del cuadrilátero f-g-h-i.
