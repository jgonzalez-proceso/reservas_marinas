# Restricciones marítimas — Illes Balears

Mapa interactivo para saber, sobre cualquier punto del mar, qué figuras de protección lo afectan, qué se puede hacer allí y qué autorizaciones hacen falta.

Arranca con **Mallorca**: 26 geometrías oficiales, 26 zonas, con las cinco reservas marinas de la isla y sus zonificaciones internas, autonómicas y estatales.

## Puesta en marcha

Doble clic en **`abrir_web.bat`**. Instala dependencias si es la primera vez, descarga la cartografía si falta, arranca el servidor —o reutiliza el que ya esté— y abre la web en una pestaña de Chrome.

Opciones, si se llama desde una consola:

```bash
abrir_web.bat -Datos        # vuelve a descargar la cartografía de IDEIB
abrir_web.bat -Puerto 5180  # usa otro puerto preferido
```

A mano, si se prefiere:

```bash
npm install
npm run data     # descarga la cartografía oficial de IDEIB
npm run verify   # contrasta las coordenadas publicadas por el Govern
npm run dev
```

## Qué hace

- **Pulsa cualquier punto** y devuelve todas las figuras que lo contienen, de la más general a la más restrictiva, y una conclusión por actividad: pesca desde embarcación, pesca submarina, pesca desde costa, buceo, fondeo y navegación.
- **Botón «¿Estoy dentro?»**: geolocaliza y responde *dentro*, *fuera* o **posición dudosa**, comparando la distancia al límite con la precisión real del GPS. A 5 m del límite con un GPS de ±18 m no se puede afirmar de qué lado estás, y la web lo dice en vez de inventarse una certeza.
- **Ortofoto oficial del Govern** (IDEIB) con carta náutica de OpenSeaMap superponible.
- Cada conclusión enlaza la norma que la respalda y, cuando procede, el trámite de la Seu Electrònica con su tasa.

## Estado de los datos

| | |
|---|---|
| Geometrías de Mallorca | 26 (26 zonas) |
| Zonas con ficha normativa redactada | **26 de 26 — Mallorca completa** |
| Pendiente | Menorca, Eivissa y Formentera (15 zonas descargadas, sin fichas) |
| Verificación de coordenadas | 64 puntos: 52 ok, 5 aviso, 4 revisar, 3 discrepancias documentadas |

Cuando una actividad concreta no está regulada por la fuente consultada, se muestra como *no determinable* y el panel lo declara. **Ni la ausencia de ficha ni un dato no publicado se interpretan nunca como ausencia de restricciones.**

## Fuentes

Cartografía del [servicio público de IDEIB](https://ideib.caib.es/reservesmarines/), Govern de les Illes Balears. Contenido normativo de las fichas de reservas marinas y los trámites de la Seu Electrònica de la CAIB, citados uno a uno en `docs/fuentes.md`.

Los datos se descargan en tiempo de construcción y se versionan: la web no depende del servicio de IDEIB para funcionar, solo le pide las teselas de ortofoto.

## Aviso

Web informativa **no oficial**. La fuente vinculante es la norma publicada en el BOIB o el BOE y la cartografía oficial de IDEIB. Comprueba siempre la normativa vigente antes de faenar.

---

Para trabajar sobre el proyecto, lee [CLAUDE.md](CLAUDE.md): recoge las reglas de datos, el modelo de reglas y las decisiones que no deben deshacerse sin motivo.
