# Publicación

**Estado: publicado y verificado.** `https://reservas.pecesmediterraneo.com/`
sirve la web desde Cloudflare Pages (proyecto `reservas-marinas`), con TLS
válido, los GeoJSON comprimidos en Brotli y cacheados para siempre. El DNS del
dominio lo gestiona Hostinger; solo se añadió el registro CNAME de más abajo,
sin tocar los nameservers ni ningún otro registro.

## Dónde vive: subdominio, no ruta de WordPress

La web se publica en un **subdominio** de `pecesmediterraneo.com` —`reservas.pecesmediterraneo.com`
o el nombre que se elija—, alojado **aparte** del WordPress y sin tocarlo.

Un subdominio no se compra: es una entrada en el DNS del dominio que ya está
registrado. Se pueden crear los que hagan falta sin coste adicional. Lo único
que se paga es la renovación anual del dominio, que ya se paga.

La alternativa —montarlo en una ruta del propio WordPress, `pecesmediterraneo.com/reservas`—
se descartó y conviene no reconsiderarla a la ligera. Esto es una aplicación
Vite que carga megabytes de GeoJSON y monta Leaflet sobre canvas; meterla dentro
de WordPress obliga a un proxy inverso o a un iframe, y en cualquiera de los dos
casos pasa a depender del tema, de los plugins y del hosting compartido de
WordPress para servir una carga que no se parece en nada a la de un blog. En un
subdominio es un **origen distinto**: se despliega solo, se cachea solo y una
caída de uno no arrastra al otro.

El precio de esa separación es de SEO: Google trata un subdominio como un sitio
semi-independiente y no hereda del todo la autoridad del dominio raíz. Sigue
siendo mucho mejor que un dominio nuevo, y se compensa enlazándolo desde el
WordPress.

## Dónde se aloja: Cloudflare

**El ancho de banda es la restricción que manda aquí, no la CPU ni el
almacenamiento.** Una visita que abra la vista de todas las islas se descarga
6,6 MB comprimidos; una isla suelta, unos 3 MB. Con eso:

| | Plan gratuito | Visitas completas/mes que caben |
|---|---|---|
| **Cloudflare** | sin límite documentado (política de uso razonable) | — |
| Vercel Hobby | 100 GB/mes | ~15.000 |
| Netlify Free | 100 GB/mes | ~15.000 |

Los tres sirven el sitio perfectamente y los tres dan HTTPS gratis, que hace
falta porque la geolocalización del navegador no funciona sin él. La razón para
elegir Cloudflare es que es el único cuyo plan gratuito no tiene el ancho de
banda como techo, y aquí el ancho de banda es 30 veces el de un sitio normal.
Se suma que **Vercel Hobby prohíbe el uso comercial** en sus condiciones, y esto
cuelga de un dominio comercial.

Los otros dos límites quedan holgados: el fichero mayor son 11 MB
(`natura2000.mallorca.geojson`) frente a los 25 MiB por fichero, y el sitio son
unos 24 ficheros frente a los 20.000 del plan gratuito.

### Un matiz que costó descubrir: hay dos asistentes con el mismo aspecto

Cloudflare ha ido unificando Pages y Workers bajo un mismo panel, y hoy
conviven **dos caminos** para conectar el mismo repositorio de GitHub:

- **Pages clásico** (*Create application → Pages → Connect to Git*): el
  dominio propio se resuelve con un **CNAME suelto** desde cualquier
  proveedor de DNS, sin tocar los nameservers del dominio. Es el que usa esta
  guía.
- **Workers con assets estáticos** (*Compute (Workers) → Import a
  repository*, la pantalla "Set up your application" con los campos "Build
  command" y **"Deploy command"** por separado): funciona igual de bien para
  un sitio estático, pero poner un dominio propio a un Worker exige que
  **los nameservers de todo el dominio apunten a Cloudflare** —no vale el
  CNAME suelto—, porque afecta también al correo del dominio (MX, SPF,
  DKIM) y no solo a la web.

Si el asistente que aparece es el segundo (se distingue por el campo "Deploy
command"), hay que salir y buscar explícitamente *Pages* en el menú de
creación, no *Workers* ni "Import a repository".

**Dónde estaba escondido en la práctica (agosto de 2026):** el botón grande de
*Workers & Pages → Create application* lleva directo a la pantalla de Workers
("Ship something new", con "Continue with GitHub" / "Start with Hello
World!" / etc.). Pages no aparece ahí como opción visible — hay que fijarse
en un enlace pequeño **debajo** de esas tarjetas: *"Looking to deploy Pages?
Get started"*. Ese es el que lleva al asistente correcto.

Dentro ya del proyecto Pages, al añadir el dominio propio (*Custom domains →
Set up a custom domain*) Cloudflare vuelve a ofrecer la misma bifurcación con
otro nombre: **"Cloudflare DNS"** (mueve los nameservers, el camino de
Workers) frente a **"My DNS provider"** (CNAME suelto, el correcto). Hay que
elegir *"My DNS provider" → "Begin CNAME setup"*.

Por si en el futuro interesa el camino de Workers —o para desplegar a mano
sin pasar por el panel—, el repositorio ya trae [wrangler.jsonc](../wrangler.jsonc)
con `dist/` declarado como directorio de assets. **No lo usa el flujo de
Pages clásico** ni hace falta tocarlo para lo que describe esta guía.

## Cómo se despliega

El repositorio ya está en GitHub, así que el despliegue es continuo: cada push a
`main` reconstruye y publica sin intervención.

1. En el panel de Cloudflare → **Workers & Pages** → *Create application* →
   pestaña **Pages** → *Connect to Git*, y se elige
   `jgonzalez-proceso/reservas_marinas`.
2. Configuración de compilación:
   - Comando de build: `npm run build`
   - Directorio de salida: `dist`
   - Versión de Node: 20 o superior
3. El primer despliegue deja el sitio en `<proyecto>.pages.dev`. Conviene
   **probarlo ahí antes de tocar el DNS**: si algo falla, falla en una URL que
   no es la tuya.

`npm run build` corre `rules:check` y `npm test` antes de compilar, así que un
despliegue con una ficha rota o una regla atada al polígono equivocado **falla
en Cloudflare y no llega a publicarse**. Es deliberado: en esta web una
respuesta equivocada es peor que una web caída.

`links:check` no entra en el build y por eso no corre aquí — necesita red y
depende de que el CAIB y el BOE estén en pie. Se sigue ejecutando a mano al
tocar fuentes o permisos.

## El dominio propio y el DNS

Primero, dentro del proyecto Pages ya creado: *Custom domains → Set up a
custom domain* y se escribe `reservas.pecesmediterraneo.com`. En el paso
"Setup Method" hay que elegir **"My DNS provider" → "Begin CNAME setup"**
(no "Cloudflare DNS"). Cloudflare muestra entonces el destino exacto al que
apuntar.

Después, en el panel donde esté el dominio —en este caso **Hostinger**
(*Dominios → DNS/Nameservers*)—, se añade **un registro CNAME**:

```
reservas    CNAME    reservas-marinas.pages.dev
```

Esto es lo que distingue a Pages clásico del flujo de Workers descrito arriba:
**no exige mover los nameservers del dominio a Cloudflare**. No se toca ningún
otro registro — el `A`/`CNAME` de `pecesmediterraneo.com` y el de `www` siguen
apuntando al WordPress, y el correo del dominio (MX, SPF, DKIM) no se ve
afectado en absoluto. La propagación tarda entre unos minutos y un par de
horas; Cloudflare emite el certificado TLS solo cuando ve el CNAME resuelto y
lo confirma en el propio panel de *Custom domains*.

El CNAME funciona porque es un subdominio. En el dominio raíz no valdría —los
apex no admiten CNAME, y ahí Pages sí pediría los nameservers— pero ese caso
no se da aquí.

En Hostinger el registro no reemplazó nada: ya existían un `CNAME www →
pecesmediterraneo.com` y varios registros de correo (`hostingermail-*`,
`autodiscover`, `autoconfig`, `_dmarc`) que siguen intactos. `reservas` es una
fila nueva y nada más.

## Qué se comprobó tras el despliegue

**La compresión de los GeoJSON.** Es la comprobación que de verdad importa. Las
CDN deciden qué comprimen por una lista de tipos MIME, y
`application/geo+json` —el tipo que le corresponde a un `.geojson`— no está en
ninguna. Sin comprimir, la cartografía son 31 MB en vez de 6,6.

`public/_headers` lo fuerza a `application/json`, que sí está en todas las
listas. Comprobado sobre el fichero más grande, el de 11 MB:

```bash
curl -sI -H 'Accept-Encoding: gzip, br' \
  https://reservas.pecesmediterraneo.com/assets/capas/natura2000.mallorca-<hash>.geojson
```

Responde `content-type: application/json; charset=utf-8` y
`content-encoding: br` (Cloudflare prefiere Brotli sobre gzip cuando el
cliente lo admite, y comprime mejor). Si algún día no lo trajera, la web
funcionaría igual pero descargando varias veces más, que en una barca con
cobertura de móvil es la diferencia entre usarla y cerrarla.

Lo segundo, `cache-control: public, max-age=31536000, immutable` en
`/assets/*` — confirmado también. Es lo que convierte los 6,6 MB en una
descarga única en vez del peaje de cada consulta. Los nombres llevan hash de
contenido, así que cachear para siempre es seguro: si los datos cambian,
cambia el nombre del fichero.

## Indexación en buscadores

La web se publicó sin `robots.txt`, sin `sitemap.xml` y sin `404.html`, y con
esa combinación Cloudflare Pages devolvía **200 con el index.html a cualquier
ruta**: `/robots.txt` y `/sitemap.xml` contestaban HTML, y cada URL inventada
era una copia indexable de la portada. Los tres ficheros existen ya. Tras cada
despliegue conviene confirmar que siguen en su sitio:

```bash
curl -sI https://reservas.pecesmediterraneo.com/pagina-que-no-existe   # 404
curl -s  https://reservas.pecesmediterraneo.com/robots.txt             # texto
curl -s  https://reservas.pecesmediterraneo.com/sitemap.xml            # XML
```

El `sitemap.xml` **no está en `public/`**: lo emite un plugin de
`vite.config.js` durante el build, tomando el `lastmod` de `manifest.json`. Un
sitemap escrito a mano congela esa fecha en el día que alguien se acordó de
tocarlo, y entonces afirma que la página no cambia justo cuando lo que cambia
es lo único que importa, la cartografía.

Lleva **una sola URL porque hay una sola URL**. Las vistas por isla viven en el
hash (`#isla=eivissa`) y un buscador no distingue fragmentos: para Google todas
son la misma página, y por eso el `canonical` de `index.html` apunta a la raíz.
El día que existan rutas propias por isla, el plugin del sitemap es donde se
añaden.

Falta el alta en Google Search Console, que es lo que de verdad dispara la
indexación: sin verificar la propiedad no se puede enviar el sitemap ni pedir
el rastreo de una URL.

## Un aviso sobre el aviso legal

Publicar esto bajo un dominio comercial no cambia lo que la web es, pero sí sube
lo que está en juego. El pie ya dice que es informativa no oficial y que la
fuente vinculante es el BOIB, el BOE y la cartografía de IDEIB. **Ese texto no
se toca al publicar**, y conviene que el enlace desde el WordPress no la
presente como algo que no es: no es un servicio oficial ni sustituye a
consultar la norma.
