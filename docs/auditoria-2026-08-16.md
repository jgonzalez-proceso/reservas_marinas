# Auditoría completa — 16/08/2026

Auditoría de las cuatro áreas del proyecto: motor de resolución, pipeline de datos, capa de presentación (mapa/UI) y fichas normativas. Estado de partida: `npm run rules:check`, `npm run verify` y `npm run build` en verde; `npm audit` sin vulnerabilidades. Sin hallazgos críticos. Cada ítem lleva una casilla para marcar cuando se aplique.

Leyenda de severidad: **ALTO** = arreglar pronto (algunos son bloqueantes antes de activar la posidonia) · **MEDIO** = defecto real con escenario de fallo · **BAJO** = defecto menor o latente · **MEJORA** = no es un bug.

---

## ALTO

- [ ] **A1 · Paginación ArcGIS: pérdida silenciosa de registros** — `scripts/fetch-sources.mjs:87`. El bucle para cuando `lote.length < 1000`, pero si el `maxRecordCount` del servicio es menor (configurable por capa), la primera página ya cumple la condición y el resto se pierde sin aviso. Además no se envía `orderByFields`, y sin él ArcGIS no garantiza orden estable entre páginas (duplicados/saltos). Hoy ninguna capa activa supera 108 registros, pero la **posidonia es masiva y activará este bug**. Fix: comprobar `exceededTransferLimit` y añadir `orderByFields: 'OBJECTID'`. **Bloqueante antes de activar posidonia.**

- [ ] **A2 · Los ficheros obsoletos de `src/data/capas/` nunca se borran** — `scripts/fetch-sources.mjs:415-455`. `escribeCapa` solo escribe; si una fuente se desactiva o un fichero deja de generarse, el `.geojson` viejo permanece y el `import.meta.glob` de `main.js` lo sigue empaquetando: el navegador puede servir cartografía derogada. Fix: vaciar `capas/` antes de escribir, o borrar todo fichero no presente en el manifiesto.

- [ ] **A3 · La contención de `heredaDe` valida un solo punto (y a veces ninguno)** — `scripts/check-rules.mjs:76-107`. El comentario habla de «muestrear puntos interiores», pero el código toma el *primer* punto de la malla 23×23 que cae dentro y solo comprueba ese: una hija que solape un 5 % con la madre puede pasar. Y si la malla no encuentra ningún punto interior (polígono estrecho), `return null` → `continue`: la validación se omite en silencio. Fix: exigir que *todos* los puntos interiores de la malla estén contenidos, y tratar el fallo de muestreo como error.

- [ ] **A4 · La deduplicación no compara todos los atributos jurídicos** — `scripts/fetch-sources.mjs:34,133-135`. `ATRIBUTOS_JURIDICOS` omite `normaFecha`, `fichaUrl` y `planEstado`: dos registros con la misma norma y fecha distinta (una modificación con el mismo título), o «Aprovat» vs «En tramitació», colapsan en silencio quedándose el primero — contra la regla «atributos distintos → el script falla». Fix: añadir los tres campos.

- [x] **A5 · El botón «atrás» del navegador no funciona** — `src/main.js:47-53, 84-87`. ~~El hash solo se lee al arrancar y no hay listener de `hashchange`/`popstate`: al pulsar atrás el hash cambia pero el mapa sigue en la isla anterior, con la URL mintiendo. CLAUDE.md afirma que funciona.~~ Hecho el 16/08/2026: añadido `window.addEventListener('hashchange', () => window.location.reload())` en `src/main.js`. Verificado en navegador: Mallorca → Menorca (selector) → atrás → vuelve a Mallorca con hash, subtítulo y selector sincronizados, sin errores de consola.

- [x] **A6 · El fallback CORS de la ortofoto deja la tesela en blanco, no «sin filtrar»** — `src/map/baselayers.js:150-207`. ~~Con `img.crossOrigin = 'anonymous'`, si IDEIB retirase CORS la carga misma falla (`onerror` → tesela vacía); el `try/catch` del canvas contaminado es código muerto. CLAUDE.md promete degradación a «tesela sin filtrar».~~ Hecho el 16/08/2026: `onerror` ahora reintenta la carga sin `crossOrigin` y pinta la tesela sin filtrar (`pintaSinFiltrar`) en vez de dejarla en blanco. Verificado en navegador simulando el fallo de CORS (parcheando `Image` para forzar `onerror` solo con `crossOrigin='anonymous'`): el reintento sin CORS carga la imagen real y `done(null, canvas)` se llama con las dimensiones correctas; camino normal (con CORS) sigue filtrando y pintando bien, sin errores de consola.

- [x] **A7 · Buceo del Migjorn contradice la aplicación del art. 9.1 del Decret 41/2015** — `src/rules/reservas-marinas/migjorn-de-mallorca.js:125-132, 168-176`. ~~Declara buceo `allowed` sin permiso teniendo el Decret 41/2015 en sus `normas`, mientras Freus, Sa Creu, Tagomago, Vedrà-Bledes y Nord de Menorca citan ese mismo artículo para concluir `allowed_with_authorization`.~~ **Confirmado contra el BOIB y corregido el 16/08/2026.** Texto oficial (BOIB núm. 77 de 23/05/2015): el art. 2.1.d) incluye nominalmente la «Reserva Marina del Migjorn de Mallorca» en el ámbito del decreto, y el art. 9.1 exige «una autorización específica, que entregará la Dirección General» para bucear con escafandra en las reservas de ese ámbito. El hallazgo era correcto: el buceo pasa a `allowed_with_authorization` con `permit`, en el perímetro general y en la zona de veda. Se añaden además el art. 9.7 (la apnea no exige autorización), el 9.2 (sin instrumentos de pesca) y el 9.3 (comunicar las inmersiones). Verificado en el motor: `allowed_with_authorization`, permiso con importe `null` → el panel muestra «Requiere autorización · importe no publicado», no «0,00 €».

- [x] **A8 · El Decret 26/2025 del Ponent está registrado y no respalda ninguna afirmación** — `src/rules/fuentes.js:54-60` + `ponent-de-mallorca.js`. ~~Las figuras que ese decreto crea citan la web del CAIB y el Decret 38/2022 — la norma de la reserva *sustituida*.~~ **Confirmado contra el BOIB y corregido el 16/08/2026, y el problema era mayor que el descrito:** la **disposición derogatoria única del Decret 26/2025 deroga los artículos 1 a 10 y los anexos del Decret 38/2022**, es decir, todo su articulado. La ficha no solo omitía la norma vigente: sostenía 14 afirmaciones sobre artículos derogados. Corregido: las 27 citas pasan al Decret 26/2025 (BOIB núm. 86 de 05/07/2025), el 38/2022 queda solo como antecedente de las dos geometrías que IDEIB sigue publicando bajo esa norma, con `tipo: 'derogada'` (valor nuevo del enum, ver G12). Al contrastar el articulado aparecieron además cuatro divergencias con el texto vigente, todas corregidas: (a) las zonas de alta protección del Toro y les Malgrats imponen navegación entre 3 y 6 nudos y prohíben las motos de agua (arts. 7.4-7.5 y 8.4-8.5), que no constaban; (b) el anexo 3.3 prohíbe **absolutamente el buceo recreativo en el sector noroeste** del Toro, entre el Clot des Moro y els Pans, que tampoco constaba; (c) el límite de «4 visitas diarias por punto» ya no está en la norma (ahora se remite a una orden, con tope de 12 buceadores por punto y 48 simultáneos); (d) la jonquillera ya no lleva la ventana «1 de enero a 30 de abril». Verificado en el motor sobre un punto del Toro: la navegación pasa a `restricted` con las tres condiciones, y las condiciones específicas de la zona de buceo (los 6 puntos y la prohibición del sector noroeste) llegan al panel vía `condicionesDeOtrasFiguras` al ser figuras de idéntica área.

---

## MEDIO

### Motor

- [x] **M1 · La constante de poda no es cota inferior al norte de ~40,22° N** — `src/engine/locate.js:48`. Hecho el 17/08/2026: `METROS_POR_GRADO_MINIMO` baja de 85.000 a 84.000, que conserva la cota hasta pasado 41° N (a 40,30° N, el borde norte del ámbito, 1° de longitud son 84.896 m). Verificado contra `@turf/point-to-polygon-distance` sobre 1.029 puntos de las 21 figuras de Menorca —la isla con vértices por encima de 40,2 N—: diferencia máxima 0,0000 m.

- [ ] **M2 · Precisión GPS desconocida se trata como precisión perfecta** — `src/engine/locate.js:203-208`. Si `accuracy` llega `undefined`/`NaN`/`Infinity`, `r = 0` y el veredicto es un «dentro»/«fuera» rotundo a 2 m del límite — lo contrario de la filosofía del proyecto. Fix: con precisión desconocida asumir un radio conservador o resolver `dudosa`.

- [ ] **M3 · `condicionesDeOtrasFiguras` incluye figuras MENOS restrictivas que la ganadora** — `src/engine/resolve.js:137-145`. El filtro es solo por área, no por estado: sobre una zona de veda (`prohibited`) puede listarse debajo las condiciones de una figura permisiva coincidente («con caña y potera, de abril a octubre») — el error opuesto al que existe esta web. Caso real: Toro/Malgrats con geometrías coincidentes. Fix: exigir además estado igual o más restrictivo que la ganadora.

- [ ] **M4 · El `permit` NO sobrevive a la sustitución, contra lo que dicen CLAUDE.md y los comentarios** — `src/rules/schema.js:150-177` + `resolve.js:169`. La herencia solo copia reglas enteras cuando la hija calla; si la hija declara su propia regla, el permit de la madre (autorización, registro de capturas) desaparece del resultado. Fix: fusionar el permit heredado cuando la regla hija no declare uno, o corregir la documentación y auditar que las hijas lo redeclaren.

### Pipeline de datos

- [ ] **M5 · Polygon vs MultiPolygon equivalentes no colapsan en la canonicalización** — `src/sources/normalize.js:197-211`. La misma geometría publicada como `Polygon` en una capa y `MultiPolygon` de un elemento en otra genera claves distintas → la figura se dibuja y apila dos veces. Fix: normalizar MultiPolygon de un elemento a Polygon antes de la clave.

- [ ] **M6 · `verify-coords` no falla con zonas declaradas inexistentes** — `scripts/verify-coords.mjs:83-85, 179-182`. `zonasAusentes` solo se imprime: un typo en un zoneId de las tablas reduce las candidatas en silencio y los puntos pueden emparejar con otra zona y salir en verde. Fix: `process.exit(1)` si hay ausentes.

- [ ] **M7 · Las discrepancias documentadas son exenciones sin valor esperado** — `src/data/coordenadas-oficiales.js:173-188` + `verify-coords.mjs:158`. Si el punto `g` del Migjorn (documentado a 2,3 km) pasara a estar a 10 km, seguiría exento. Fix: guardar `distanciaEsperadaM` por entrada y fallar si la medida se desvía (±10 %).

- [ ] **M8 · `Test-NuestraWeb` acepta cualquier proyecto Vite** — `abrir_web.ps1:42-49`. El discriminador es `src/main.js`, el entry-point estándar de Vite: otro proyecto en 5173-5178 pasaría la prueba y se abriría Chrome sobre la web equivocada. Fix (1 línea): buscar el `<title>` propio.

- [ ] **M9 · El hito «más próximo» se busca en todas las reservas** — `scripts/verify-coords.mjs:106-111`. `transcripcionConfirmada` puede activarla un hito de otra reserva colindante a <5 m. Fix: filtrar los hitos por las zonas de la tabla.

- [ ] **M10 · Ordinales de `featureId` dependientes de locale** — `scripts/fetch-sources.mjs:362-365`. `localeCompare` sin locale usa la collation del sistema (los ordinales `--01/--02` pueden cambiar entre máquinas y ensuciar el diff), y `String(objectId)` ordena «10» antes que «9». Fix: comparación por code points y OBJECTID numérico.

- [ ] **M11 · `Math.min(...lons)` revienta con geometrías grandes** — `scripts/check-rules.mjs:80-83`. El spread tiene límite (~65k argumentos en V8); el día que una ficha con polígono grande declare `heredaDe`, `rules:check` morirá con `RangeError`. Fix: bucle o `reduce`.

- [ ] **M12 · `motivoInclusion` se estampa por colisión de código entre fuentes** — `scripts/fetch-sources.mjs:318, 339`. `aFeatureArea` consulta `N2000_MARINO[codigo]` para cualquier fuente; los ENP también publican `SITE_CODE` (es Trenc = ES0000037, código Natura real). Fix: condicionar a `source.id === 'natura2000'`.

### Mapa / UI

- [ ] **M13 · El marcador de consulta se dibuja DEBAJO de las áreas** — `src/main.js:174-175` + `areas-layer.js:74`. El `circleMarker` y el círculo de precisión van al overlayPane (z 400) y los planos de áreas a 401-405: el punto consultado queda tapado justo al resaltar la zona. Fix: pane propio con z 406.

- [ ] **M14 · Sin `watchPosition`: el veredicto GPS caduca al derivar la embarcación** — `src/map/ubicacion.js:19-35`. Una sola lectura con `maximumAge: 5000`; el «estás 40 m dentro» queda obsoleto sin aviso. Fix: seguimiento continuo opcional o al menos timestamp de la lectura en el veredicto.

- [ ] **M15 · Durante la descarga la UI responde en silencio; si falla, queda medio muerta** — `src/main.js:162-171, 196, 251-271`. No hay carrera (verificado), pero: (a) durante los 6,5 MB de la vista «todas» el mapa y «¿Estoy dentro?» están activos sin reacción ni aviso; (b) si `cargaAreas` lanza, el return temprano deja botones vivos sin listeners. Fix: `disabled` + indicador de carga; en error, deshabilitar con mensaje.

- [ ] **M16 · Cookie corrupta rompe el arranque de la app** — `src/ui/cookies.js:8` + `orden-actividades.js:24`. `decodeURIComponent` puede lanzar `URIError` con `%` malformado y el try/catch solo envuelve `JSON.parse`: la excepción sube hasta `main()` y nada monta. Fix: try/catch dentro de `leeCookie`.

- [ ] **M17 · Hash con isla válida pero sin cartografía → error crudo** — `src/main.js:47-53, 72, 112`. `islaDelHash` valida contra `ISLAS` pero no contra el manifest: una URL compartida hacia una isla sin ficheros acaba en «El manifiesto no declara cartografía». Fix: caer a `ISLA_ACTIVA` si la isla no está en el manifest.

- [ ] **M18 · Sin alternativa de teclado para la función principal** — `index.html:35` + `main.js`. La consulta de un punto solo existe vía clic; `role="application"` sin interacción accesible dentro. WCAG 2.1.1. (El buscador mitiga pero no resuelve un punto.)

### Fichas normativas

- [ ] **M19 · `allowed` con restricción de calendario en el Llevant estatal** — `llevant-de-mallorca.js:260-271, 353-363`. Pesca desde costa `allowed` con «días hábiles: martes, jueves…» y máximo de anzuelos; el mismo patrón es `restricted` en Badia de Palma, Migjorn y Nord de Menorca. Rompe la semántica del enum.

- [ ] **M20 · El Decret 39/2021 existe como dos fuentes y dos normas distintas** — `fuentes.js:193-200` y `:406-413`; tipo `creacion` en `natura2000/menorca.js:34-40` y `modificacion` en `albufera-des-grau.js:73-79`. Es un solo decreto (aprueba plan Natura 2000 y PRUG a la vez). Unificar para evitar divergencia futura.

- [ ] **M21 · Dos «Decret 38/2022» con la misma fecha y títulos incompatibles** — `ponent-de-mallorca.js:37-43` (crea Toro-Malgrats) vs `illa-de-l-aire.js:46-51` («modifica el Decreto 26/2019», otra URL). Verificar si son el mismo decreto (unificar títulos) o dos con el mismo número (documentarlo).

- [ ] **M22 · La «zona especial de buceo» de la Illa de l'Aire no tiene regla propia de buceo** — `illa-de-l-aire.js:205-246`. Solo declara pesca y hereda el buceo del perímetro, pese a que `fuentes.js:365-372` referencia «art. 3.3: régimen de la zona de buceo». O el artículo solo habla de pesca (documentarlo) o falta la regla.

- [ ] **M23 · Misma autorización, vigencias distintas** — trámite 1683027: «Consultar en el trámite» en `badia-de-palma.js:39-45` y «1 año» en `migjorn-de-mallorca.js:73-79`.

- [ ] **M24 · URLs de fuentes CAIB que difieren en una letra (patrón de copy-paste)** — pares `regulacian_/regulacion_`, sufijos `_0`, `_0_0`, `_0_0_0` en dragonera/sa-creu, ponent/tagomago, llevant/illa-aire, vedra/bledes. Verificar que cada clave abre la página de *su* reserva.

---

## BAJO

### Motor

- [ ] **B1 · `heredadaDe` se re-etiqueta en herencia multinivel** — `schema.js:155-160`. Si la madre heredó de la abuela, la nieta atribuye la regla a la madre. Fix: `heredadaDe: regla.heredadaDe ?? {...}`.
- [ ] **B2 · La rama sin aportaciones devuelve un objeto con otra forma** — `resolve.js:85-102`. Faltan `sources`, `condicionesDeOtrasFiguras`, `schedule`, etc. respecto a la rama normal. Igualar el contrato.
- [ ] **B3 · Con `features` vacío la certeza GPS es `'fuera'`** — `locate.js:241-243`. Sin geometrías cargadas se afirma «fuera» con certeza — afirmación de ausencia prohibida. Añadir estado `sin_datos`.
- [ ] **B4 · `areaKm2` no numérico rompe el orden en silencio** — `locate.js:193` + `resolve.js:117`. El desempate *lex specialis* entero depende de él y nadie valida que exista. Añadir validación en `rules:check`/normalize.
- [ ] **B5 · zoneIds duplicados colapsan sin aviso en runtime** — `rules/index.js:63` + `schema.js:132`. `check-rules` los detecta en build, pero `Object.fromEntries` pisaría una ficha en silencio. Lanzar en `resuelveHerencia`.
- [ ] **B6 · `figurasSinRegla` y `tambienImponen` llevan solo `nombre`** — `resolve.js:97, 165, 188`. Contra la regla «el nombre solo no identifica ninguna figura» (s'Albufera: tres figuras con el mismo nombre). Incluir `proteccion` y deduplicar.

### Pipeline

- [ ] **B7 · `fusionaPorCodigo` descarta entradas sin código en silencio** — `fetch-sources.mjs:184`. Hoy inalcanzable, pero violaría «un dato oficial nunca se elimina en silencio» si se reutiliza.
- [ ] **B8 · Posible corrimiento de un día en `normaFecha`** — `normalize.js:127`. Epoch-millis proyectado a UTC puede retroceder un día si el servicio guardó medianoche local.
- [ ] **B9 · Salida «Infinity m» si una tabla se queda sin candidatas** — `verify-coords.mjs:91, 151`. Cosmético; se resuelve junto con M6.
- [ ] **B10 · Doble designación con competencias mezcladas: fusión latente incorrecta** — `fetch-sources.mjs:180-199`. Si un SITE_CODE apareciera en capa autonómica y estatal a la vez, ambas mitades reclamarían ambas designaciones. Fallar si el grupo mezcla competencias.
- [ ] **B11 · `Get-Chrome` puede abortar el script** — `abrir_web.ps1:72-76`. Con `$ErrorActionPreference='Stop'`, `Join-Path $null` (sin ProgramFiles(x86)) mata el script antes del fallback al registro.
- [ ] **B12 · Pre-check de servidor limitado a puerto+5** — `abrir_web.ps1:116-119`. Con varios Vite abiertos puede arrancarse un segundo servidor propio.
- [ ] **B13 · Crash a mitad de escritura deja estado mixto indetectable** — `fetch-sources.mjs:425-485`. Entre el combinado y el manifest hay varias escrituras; nada coteja después los hashes del manifest contra los ficheros. Escribir a temporal+rename o verificar hashes en `rules:check`.

### UI

- [ ] **B14 · Precedencia frágil en `islaDelHash`** — `main.js:50`. El ternario funciona por casualidad (valores truthy); paréntesis explícitos.
- [ ] **B15 · Fuente desconocida → pane z 400, debajo de todo** — `areas-layer.js:49-52, 74`. `pesoFuente` devuelve −1 para fuentes no listadas (p. ej. posidonia sin tocar `ORDEN_FUENTES`). Fallar en dev o ponerlas encima.
- [ ] **B16 · Atribuciones sin `rel="noopener"`** — `baselayers.js:44-45, 221, 257, 264`.
- [ ] **B17 · Cookie sin `Secure`** — `cookies.js:17`.
- [ ] **B18 · `window.alert()` para errores de geolocalización** — `main.js:262`. El panel ya sabe pintar avisos.
- [ ] **B19 · Veredicto «fuera» con detalle vacío** — `ubicacion.js:77-86`. Sin `masCercana` ni precisión, el subtítulo queda en blanco.
- [ ] **B20 · `pintaEstadoDatos` enumera fuentes que la isla activa no tiene** — `main.js:131-140`.
- [ ] **B21 · `window.__restriccions` expuesto en producción** — `main.js:276`. Condicionar a `import.meta.env.DEV`.
- [ ] **B22 · Asa de reordenación: sin Enter/Espacio y aria-label incompleto** — `panel.js:149-152, 434-442`.
- [ ] **B23 · `#btn-lista` y leyenda sin estado ARIA completo** — `index.html:26` + `leyenda.js:21-24, 67-70`. Falta `aria-expanded`/`aria-controls`/`type="button"`.
- [ ] **B24 · `aria-live="polite"` sobre el panel entero** — `index.html:44`. El lector relee todo el panel en cada consulta; mejor una región de estado corta.

### Fichas

- [x] **B25 · Fuentes registradas y nunca citadas** — `boib-decret-26-2025` (ver A8), `boe-orden-aaa-1479-2016-canal-menorca` (la ficha la mete en `normas` pero no en `sources`), `boe-ampliacion-cabrera-2019` (norma inline sin citar la clave). **Hecho el 16/08/2026**, cerrando las tres: el Decret 26/2025 quedo resuelto en A8 (27 citas); el LIC del Canal de Menorca cita ahora la Orden AAA/1479/2016, porque concluir que la figura no restringe la pesca recreativa exige haber leido tambien esa orden —es la que si regula pesca dentro del canal, aunque solo profesional de arrastre sobre dos poligonos—; y Cabrera cita el Acuerdo de ampliacion de 2019 en buceo, fondeo y navegacion, que son las tres reglas cuyo alcance depende de que el PRUG no zonifico las aguas incorporadas. Comprobado con un script: la unica fuente del registro sin citar es ya el Decret 38/2022, y es deliberado (derogado, solo antecedente).
- [x] **B26 · Tipo de norma inconsistente en resoluciones de veda análogas** — `creacion` en Migjorn, `modificacion` en Freus y Nord de Menorca para el mismo tipo de resolución. Hecho el 16/08/2026: criterio unificado —en la ficha de la zona que crea, la resolucion de veda es su norma de `creacion`; como modificacion del regimen general figura en la ficha de la reserva. Corregidas Freus y Nord de Menorca, que la declaraban `modificacion` en la propia ficha de la zona de veda. La resolucion del Estany des Peix se mantiene como `modificacion` a proposito: no crea una zona con ficha propia, veda dos modalidades en el regimen general.
- [x] **B27 · Motivos de `prohibited` redactados como permiso** — Badia de Palma ZPE (`badia-de-palma.js:144-149`) y Migjorn ZPE (`migjorn-de-mallorca.js:211-215`). ~~«El buceo… está permitido… excepto…» bajo un PROHIBIDO.~~ Hecho el 16/08/2026: ambos motivos se reescriben en positivo desde la norma que impone la prohibición (art. 2 de la Orden de 29/04/2005 en el Migjorn, art. 2 de la Orden de 2006 en Palma), citando además esa orden como fuente —antes solo citaban la web— y dejando la mención al régimen general como aclaración final, no como frase de apertura. Verificado en el motor sobre un punto interior de la zona de protección especial del Migjorn.
- [x] **B28 · `fecha: null` inconsistente en normas con fecha conocible** — Decret 41/2015 con fecha en 5 fichas y `null` en otras 5; también `NORMA_26_2025` y el PRUG de Cabrera. Hecho el 16/08/2026: el Decret 41/2015 lleva ya su fecha real (2015-05-22, BOIB num. 77 de 23/05/2015) en las cinco fichas que la tenian a `null` —Palma, Llevant, Migjorn, Ponent y sa Dragonera—, y el Decret 26/2025 la recibio en A8 (2025-07-04). Siguen con `fecha: null` la orden del Migjorn y el PRUG de Cabrera, que no llevan fecha en la fuente publicada.
- [x] **B29 · Tagomago pesca desde costa `restricted` cuando todo lo admitido exige autorización** — `tagomago.js:75-88`. Encajaría mejor `allowed_with_authorization` con `permit`. Hecho el 16/08/2026: pasa a `allowed_with_authorization` con `permit` propio. El art. 5.3 del Decreto 45/2018 solo admite desde tierra los aparejos tradicionales de Eivissa **y solo con autorizacion especifica**, asi que sin ella no se puede pescar en absoluto; como `restricted` el panel decia «permitida con restricciones», que invita a bajar con una cana —aparejo que ni siquiera esta entre los admitidos. El permiso va con `importe: null` porque no consta publicado. Verificado en el motor y en el panel: «PERMITIDA CON AUTORIZACION · Requiere autorizacion · importe no publicado».
- [x] **B30 · Cabrera: condición de apnea mayo-junio colgada de pescaSubmarina** — `cabrera.js:94-98`; es una restricción de inmersión (ya está en buceo). Hecho el 16/08/2026: eliminada de `pescaSubmarina`, donde ademas colgaba de una actividad ya prohibida todo el ano y sugeria que la prohibicion fuese estacional. Se conserva en `buceo`, que es donde la restriccion opera.
- [x] **B31 · Migjorn ZPE: las prohibiciones de pesca no citan la Orden de 2005 que crea la zona** — `migjorn-de-mallorca.js:194-210`. Hecho el 16/08/2026: las tres prohibiciones de pesca de la zona de proteccion especial citan ahora `boib-orden-2005-migjorn-zpe` ademas de la web, igual que ya hacian el fondeo y la navegacion de esa misma ficha.
- [x] **B37 · Enlace de permiso de buceo roto (404) en 7 fichas** — descubierto el 16/08/2026 al afinar el `permit` del Migjorn. `https://www.caib.es/sites/reservesmarines/es/permisos_de_busseig/` devuelve **404** y era la URL del `permit` de buceo en Freus, Illa de l'Aire, Migjorn, Nord de Menorca, Punta de sa Creu, Tagomago y Vedrà-Bledes: el botón «Tramitar en la Seu Electrònica» llevaba al vacío en las siete. Sustituida por el trámite real, verificado con HTTP 200: [Autorización para el buceo recreativo individual](https://www.caib.es/seucaib/es/tramites/tramite/1139905) (el colectivo, para centros y clubes, es el 106992). **Conviene revisar por lotes el resto de URLs de `permit` y de `fuentes.js`**, porque este falló en silencio: nada en el proyecto comprueba que los enlaces publicados sigan vivos.

- [x] **B38 · El `permit` de buceo del Migjorn decía «importe no publicado» y sí lo está** — `migjorn-de-mallorca.js`. Al abrir el trámite aparecen las tasas reales, y no son un importe único: varían por duración **y por reserva**. Para el Migjorn hay diaria (5,24 €), quincenal (10,47 €) y anual (52,82 €); la semanal de 15,71 € es **exclusiva del Ponent** y aquí no se puede pedir. Se declara la anual como `importe`, con la escala completa en la nota: anunciar la diaria dejaría corto a quien acabe pagando diez veces más. La anual habilita además el resto de reservas de Mallorca salvo las zonas especiales de buceo del Toro y les Malgrats. Añadida la clave de fuente `tramite-autorizacion-buceo`, que no existía. **Extendido el 16/08/2026 al resto de fichas**: 24 fichas pasan de `importe: null` a la tarifa real, con la escala y el alcance por isla en cada nota, y la fuente del trámite añadida a 18 reglas de buceo. Dos matices que obligaron a no aplicar la tarifa en bloque: el **Ponent es la única reserva con modalidad semanal (15,71 €) y la única sin quincenal**, y en el **Llevant y sa Dragonera la tarifa solo vale en la zona autonómica** — sus permisos de ámbito **estatal** (Orden APA/690/2018 y APA/1024/2020) van por la Secretaría General de Pesca, no publican importe y conservan `null`, igual que Cabrera, que tiene régimen propio de parque nacional.

- [x] **B32 · Única fuente no oficial del registro** — `boib-resolucion-2024-migjorn-veda-prorroga` (`fuentes.js:127-133`) enlaza a industriaspesqueras.com; sustituir por el BOIB núm. 68 de 23-05-2024. Hecho el 16/08/2026: sustituida por el sumario oficial del BOIB num. 68 de 23/05/2024. No fue posible fijar la URL directa del PDF —el eboibfront sirve el indice por JavaScript y no responde a una descarga simple—, asi que la `referencia` recoge la cita completa (seccion III) y advierte de que el enlace lleva al sumario, no a la resolucion. Con esto no queda ninguna fuente no oficial en el registro.

### Incoherencias documentales menores

- [ ] **B33 · Área del residuo de les Malgrats** — CLAUDE.md e `islas.js` dicen 0,005 m²; `fetch-sources.mjs:41-42` dice «10 cm × 10 cm» (= 0,01 m²).
- [ ] **B34 · `natura2000-marino.js:39-41` dice que `rules:check` «avisa»** — en realidad falla (que es lo correcto); corregir el comentario.
- [ ] **B35 · Los ciclos de herencia se detectan con throw en el import, no como informe de `rules:check`** — `schema.js:142-144`. Cumple de facto, pero muere con stack trace en vez de listar el problema.
- [ ] **B36 · Trama de contorno: `espacios-naturales` no tiene entrada en `TRAMA_POR_FUENTE`** — `estilos-proteccion.js:197-202`. Contorno sólido idéntico al de reservas marinas, contra el criterio declarado de distinguir fuente por trama. O es intencional (documentarlo) o falta la trama.

---

## MEJORAS

- [x] **G1 · Inicializar git.** ~~El proyecto no es un repositorio pese a que CLAUDE.md habla de versionar los datos «en el repo». Sin git no hay historia, ni diffs de la cartografía regenerada (que es justo el control de calidad que M10 protege), ni marcha atrás.~~ Hecho el 16/08/2026: repo inicializado, primer commit y subido a GitHub (`jgonzalez-proceso/reservas_marinas`, rama `main`), con push automático operativo vía deploy key SSH.
- [ ] **G2 · `figurasEn` calcula `distanciaAlBorde` para todas las figuras en cada clic** — `locate.js:176-193`. Es el coste dominante del clic con Natura 2000 cargado (171k vértices en una ZEPA); calcularlo perezosamente o solo al expandir la figura en el panel.
- [ ] **G3 · Añadir una meta CSP a `index.html`** — orígenes externos conocidos y fijos (ideib.caib.es, arcgisonline, openstreetmap, openseamap); fácil de acotar.
- [ ] **G4 · `permiso()` no normaliza `importe` ausente a `null`** — `schema.js:189-191`. Fijar en origen la semántica `null` = no publicado.
- [ ] **G5 · `validaFicha` no comprueba claves de `sources` ni la forma de `schedule`** — `schema.js:85-105`. Lo cubre `check-rules`, pero trasladarlo al schema da red a cualquier otro consumidor. `schedule` además es campo libre con claves heterogéneas (`dias`, `temporada`, `canya`… mezcla castellano/catalán) imposible de renderizar uniforme.
- [ ] **G6 · El buscador encuadra pero no cuenta nada de la zona** — `buscador.js:84` + `main.js:243-247`. Llamar a `consulta` sobre un punto interior representativo daría continuidad.
- [ ] **G7 · Exponer *de qué figura* es la certeza GPS** — `locate.js:227-239`. Dentro de una reserva a −430 m con otra figura a +100 m, `certeza='fuera'` (de esa otra) puede leerse descontextualizado.
- [ ] **G8 · Condiciones heredadas con deícticos de la madre** — convención de redacción: evitar «en esta zona» en condiciones que viajan a las hijas.
- [ ] **G9 · Candidata a herencia no declarada: ZPE de la Badia de Palma** — reescribe entero su régimen sin `heredaDe`; si la geometría confirma contención, heredar; si no, comentario tipo Tagomago para que nadie lo «arregle».
- [ ] **G10 · Verificar tamaños táctiles del asa `⠿` y el botón «×»** — `panel.js:55, 149`; candidatos a quedar bajo los 44×44 px recomendados (depende del CSS).
- [x] **G13 · Verificador de enlaces (`npm run links:check`)** — hecho el 16/08/2026, a raíz de B37: nada comprobaba que las URLs publicadas siguieran vivas, y el 404 del permiso de buceo llevaba meses ahí. `scripts/check-links.mjs` recorre las tres familias de enlaces que la web publica —`url` de cada fuente, de cada norma y de cada `permit`—, las deduplica y las comprueba, diciendo de cada rota **dónde** se publica. Fuera del build a propósito: el build debe funcionar sin red. Los 4xx fallan; los 5xx, 429 y errores de red solo avisan (`--estricto` los hace fallar también).

  Dos lecciones del propio estreno, ya incorporadas al script. **Un 200 no basta**: el eboibfront responde a un documento inexistente con 200 y redirección a su página `pdfError`, así que se compara el destino final. Y **nada se declara roto a la primera**: en la primera pasada, con 6 peticiones en paralelo, el BOIB desvió a `pdfError` dos enlaces **sanos** —la misma URL sirve un PDF de 27 MB cuando se le pregunta sola—, así que la concurrencia baja a 4 y todo veredicto malo se reintenta. Un verificador que acusa en falso se acaba ignorando, que es la forma segura de perder un 404 real.

  Estado tras la limpieza: **67/67 enlaces correctos, 0 redirecciones, 0 rotos**. Por el camino se corrigieron tres URLs que redirigían (una a `http` con doble barra, otra de `http` a `https` y otra a un portal antiguo de espacios naturales) y se cambiaron dos planes de gestión Natura 2000 —el Decret 49/2015 de la Serra de Tramuntana y el 39/2021 de la costa este de Menorca— del PDF del boletín completo (27 y 35 MB) a la forma ELI canónica, que sirve la disposición concreta en 59 kB.

- [ ] **G11 · Vite 8 disponible** — actual 7.3.6, latest 8.2.1. Sin prisa; revisar changelog de breaking changes antes.
- [x] **G12 · `TIPOS_NORMA` no podía expresar una norma derogada** — `src/rules/schema.js:42`. Surgido al resolver A8: el enum solo tenía `creacion`, `modificacion` y `general`, así que el Decret 38/2022 —articulado derogado entero, pero conservado porque IDEIB publica dos geometrías bajo él— solo podía declararse como `creacion`, dándolo por vigente. Añadido `derogada` el 16/08/2026. El panel no usa este campo, así que el cambio no afecta a la interfaz; lo valida `rules:check`.

---

## Verificado como correcto

No todo son hallazgos: se comprobó explícitamente que el código cumple los invariantes centrales de CLAUDE.md — sin XSS (todo el DOM por `textContent`), dedup por `featureId` en vista «todas», espera a todas las capas antes de resolver (sin carreras: los listeners se registran después de `cargaAreas`), capas ocultas que siguen computando, `unknown` fuera de la escala y `not_regulated` bajo `allowed`, herencia que no se borra con `unknown` propio, importe `0` vs `null`, planos z 401-405, `autoZIndex:false`, canonicalización de anillos correcta, slugs catalanes (`ç`, `l·l`) bien, `abrir_web.ps1` cumple sus tres requisitos (ANSI, última URL, contenido no puerto), punto exactamente en el borde → `dudosa`, agujeros/islotes correctos en contención y distancia, y las 85 fichas pasan validación estructural completa (0 estados fuera de enum, 0 afirmaciones sin fuente, 0 `heredaDe` huérfanos, 0 zoneIds duplicados).
