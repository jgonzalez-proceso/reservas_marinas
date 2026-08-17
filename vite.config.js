import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

const SITIO = 'https://reservas.pecesmediterraneo.com/';

/**
 * Emite el sitemap.xml en el build en vez de guardarlo en public/.
 *
 * El motivo es `lastmod`. Un sitemap escrito a mano lo congela en la fecha en
 * que alguien se acordó de tocarlo, y entonces miente: dice que la página no
 * cambia cuando lo que cambia es justo lo que importa, la cartografía. Aquí se
 * toma de `manifest.json`, que es la fecha en la que `npm run data` descargó
 * las capas oficiales. Si los datos son de ayer, el sitemap dice ayer.
 *
 * Hay una sola URL porque hay una sola URL: las vistas por isla van en el hash
 * y un buscador no las distingue. El día que existan rutas propias por isla,
 * este es el sitio donde se añaden.
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
</urlset>
`,
      });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [sitemap()],
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
