import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  // Los GeoJSON se sirven como recurso aparte, no empaquetados en el bundle:
  // pesan megabytes y conviene que el navegador los cachee por separado.
  assetsInclude: ['**/*.geojson'],
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
  },
  server: {
    port: 5173,
    open: false,
  },
});
