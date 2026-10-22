/**
 * Middleware de Pages: que el dominio propio sea la única copia indexable.
 *
 * Cloudflare publica cada proyecto Pages también en `<proyecto>.pages.dev`, y
 * cada despliegue de preview en `<hash>.<proyecto>.pages.dev`. Son copias
 * completas de la web, y los rastreadores las encuentran solos: el
 * 2026-10-22 el panel mostraba 291 peticiones en 15 minutos sobre pages.dev
 * sin ninguna visita de verdad. Un buscador que indexe esa copia la pone a
 * competir con https://reservas.pecesmediterraneo.com/ y diluye el trabajo de
 * indexación —en castellano, con su canonical— hecho sobre el dominio propio.
 *
 * `public/_headers` no sirve para esto porque no distingue por host: lo que
 * pusiera ahí se aplicaría también al dominio propio. Por eso es código.
 *
 *  - **`reservas-marinas.pages.dev` redirige con 301** al dominio propio,
 *    misma ruta y misma consulta. Es la forma más clara de decirle a un
 *    buscador cuál es la buena.
 *  - **Los previews no redirigen: llevan `X-Robots-Tag: noindex`.** Existen
 *    para probar un despliegue antes de que llegue a producción; redirigirlos
 *    los dejaría inservibles.
 *  - **Solo se redirigen GET y HEAD, y nunca `/api/`.** El contador anónimo
 *    recibe POST, y un 301 sobre un POST el navegador lo repite como GET o lo
 *    descarta: se perderían consultas sin ningún error a la vista.
 *  - **En cualquier otro host no se toca nada.** El dominio propio pasa por
 *    `context.next()` y sale con las cabeceras de `_headers` intactas.
 *
 * `public/_routes.json` deja fuera `/assets/*`: la cartografía, el JS y el
 * CSS no pasan por aquí. No son páginas que un buscador indexe, y cada
 * petición que entra en una Function cuenta contra el límite diario del plan
 * gratuito. Una visita a la vista de todas las islas son decenas de ficheros;
 * si el límite se agotara, lo que dejaría de servirse sería la web entera.
 */

const CANONICO = 'https://reservas.pecesmediterraneo.com';
const PAGES_DEV_PRODUCCION = 'reservas-marinas.pages.dev';

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (!url.hostname.endsWith('.pages.dev')) return context.next();

  const lectura = request.method === 'GET' || request.method === 'HEAD';
  if (url.hostname === PAGES_DEV_PRODUCCION && lectura && !url.pathname.startsWith('/api/')) {
    return Response.redirect(CANONICO + url.pathname + url.search, 301);
  }

  const respuesta = await context.next();
  const conNoindex = new Response(respuesta.body, respuesta);
  conNoindex.headers.set('X-Robots-Tag', 'noindex');
  return conNoindex;
}
