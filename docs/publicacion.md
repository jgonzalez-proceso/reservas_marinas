# Publicación

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
custom domain* y se escribe `reservas.pecesmediterraneo.com`. Cloudflare
muestra el destino exacto al que apuntar (normalmente `<proyecto>.pages.dev`).

Después, en el panel donde esté el dominio (el registrador, o el hosting de
WordPress si gestiona ahí el DNS — **no** hace falta que sea Cloudflare), se
añade **un registro CNAME**:

```
reservas    CNAME    <proyecto>.pages.dev
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

## Qué comprobar después del primer despliegue

**La compresión de los GeoJSON.** Es la comprobación que de verdad importa y la
única que no se puede dar por hecha desde aquí. Las CDN deciden qué comprimen
por una lista de tipos MIME, y `application/geo+json` —el tipo que le
corresponde a un `.geojson`— no está en ninguna. Sin comprimir, la cartografía
son 31 MB en vez de 6,6.

`public/_headers` lo fuerza a `application/json`, que sí está en todas las
listas. Verificar que ha surtido efecto:

```bash
curl -sI -H 'Accept-Encoding: gzip' https://reservas.pecesmediterraneo.com/assets/capas/ | head
```

Sobre la URL real de un `.geojson` (sale del código fuente de la página), la
respuesta tiene que traer `content-encoding: gzip` o `br`. Si no lo trae, la web
funciona igual pero descarga cinco veces más, que en una barca con cobertura de
móvil es la diferencia entre usarla y cerrarla.

Lo segundo, `cache-control: public, max-age=31536000, immutable` en
`/assets/*`. Es lo que convierte los 6,6 MB en una descarga única en vez del
peaje de cada consulta. Los nombres llevan hash de contenido, así que cachear
para siempre es seguro: si los datos cambian, cambia el nombre del fichero.

## Un aviso sobre el aviso legal

Publicar esto bajo un dominio comercial no cambia lo que la web es, pero sí sube
lo que está en juego. El pie ya dice que es informativa no oficial y que la
fuente vinculante es el BOIB, el BOE y la cartografía de IDEIB. **Ese texto no
se toca al publicar**, y conviene que el enlace desde el WordPress no la
presente como algo que no es: no es un servicio oficial ni sustituye a
consultar la norma.
