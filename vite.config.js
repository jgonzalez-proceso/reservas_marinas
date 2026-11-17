import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

import { RESERVAS_POR_ISLA, SITIO, fechaPagina, paginaReservasIsla, rutaIsla } from './scripts/paginas/reservas-isla.mjs';
import { PAGINAS_LEGALES } from './scripts/paginas/legales.mjs';

/**
 * Emite el sitemap.xml en el build en vez de guardarlo en public/.
 *
 * El motivo es `lastmod`. Un sitemap escrito a mano lo congela en la fecha en
 * que alguien se acordó de tocarlo, y entonces miente: dice que la página no
 * cambia cuando lo que cambia es justo lo que importa, la cartografía. Aquí se
 * toma de `manifest.json`, que es la fecha en la que `npm run data` descargó
 * las capas oficiales. Si los datos son de ayer, el sitemap dice ayer.
 *
 * Las vistas del mapa por isla van en el hash y un buscador no las distingue,
 * así que el mapa es una sola URL. Las que sí son URLs propias son las páginas
 * estáticas de reservas por isla (ver `paginasReservas`), y entran aquí.
 */
function sitemap() {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const manifest = JSON.parse(readFileSync('src/data/manifest.json', 'utf8'));
      const lastmod = manifest.generado.slice(0, 10);
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITIO}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
${Object.keys(RESERVAS_POR_ISLA)
  .map((isla) => `  <url>\n    <loc>${SITIO}${rutaIsla(isla)}</loc>\n    <lastmod>${fechaPagina(isla)}</lastmod>\n  </url>\n`)
  .join('')}</urlset>
`,
      });
    },
  };
}

/**
 * Páginas estáticas «Reservas marinas de <isla>», generadas de las fichas.
 *
 * Son para los buscadores: el mapa contesta a «¿qué rige en este punto?», pero
 * quien busca «reservas marinas de mallorca» quiere leer cuáles hay y qué se
 * puede hacer en cada una. Salen de `src/rules/`, así que no hay texto que
 * mantener a mano. Ver `scripts/paginas/reservas-isla.mjs`.
 */
function paginasReservas() {
  return {
    name: 'paginas-reservas',
    apply: 'build',
    generateBundle() {
      for (const isla of Object.keys(RESERVAS_POR_ISLA)) {
        this.emitFile({
          type: 'asset',
          fileName: `${rutaIsla(isla)}index.html`,
          source: paginaReservasIsla(isla),
        });
      }
    },
  };
}

/**
 * Aviso legal y política de privacidad. Mismo esquema que las páginas de
 * reservas: se generan en el build y van sueltas, sin el bundle. No entran en
 * el sitemap: nadie las busca, y enviarlas a Google como contenido sería
 * restarle peso a las cinco páginas que sí lo son. Se pueden rastrear igual,
 * porque todas las demás enlazan a ellas.
 */
function paginasLegales() {
  return {
    name: 'paginas-legales',
    apply: 'build',
    generateBundle() {
      for (const [ruta, genera] of Object.entries(PAGINAS_LEGALES)) {
        this.emitFile({ type: 'asset', fileName: `${ruta}index.html`, source: genera() });
      }
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [sitemap(), paginasReservas(), paginasLegales()],
  // Los GeoJSON se sirven como recurso aparte, no empaquetados en el bundle:
  // pesan megabytes y conviene que el navegador los cachee por separado.
  assetsInclude: ['**/*.geojson'],
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // La cartografía sale a assets/capas/ y no a assets/ a secas. No es
        // orden: es lo que permite escribir en public/_headers una regla de
        // caché y de tipo MIME que solo alcance a los GeoJSON. Un patrón como
        // `/assets/*.geojson` depende de que el splat de la CDN admita sufijo
        // —y si no lo admite, casa tambien con el JS y el CSS y los sirve como
        // JSON, que rompe la web entera—. Un directorio propio cierra la duda.
        assetFileNames(info) {
          const nombre = info.names?.[0] ?? info.name ?? '';
          return nombre.endsWith('.geojson')
            ? 'assets/capas/[name]-[hash][extname]'
            : 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
