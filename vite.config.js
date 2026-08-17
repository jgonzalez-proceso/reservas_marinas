import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
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
