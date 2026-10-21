#!/usr/bin/env node
/**
 * Informe del contador anónimo de consultas, en la consola.
 *
 *   npm run eventos [-- días]
 *
 * Lee CF_ACCOUNT_ID y CF_API_TOKEN del entorno o de un `.env` en la raíz
 * (ignorado por git; nunca se versiona). El token necesita el permiso
 * «Account Analytics: Read». Por defecto, los últimos 30 días.
 *
 * La misma información, con gráficos y mapa, la abre `npm run panel`. Las
 * consultas viven en `eventos-datos.mjs` para que los dos cuenten lo mismo.
 */

import { compruebaCredenciales, leeDias, leeEventos } from './eventos-datos.mjs';

compruebaCredenciales();
const datos = await leeEventos(leeDias(process.argv[2]));

const tabla = (titulo, filas) => {
  console.log(`## ${titulo}`);
  if (!filas.length) console.log('(sin datos)');
  else console.table(filas);
  console.log();
};

console.log(`Contador anónimo de consultas · últimos ${datos.dias} días\n`);
tabla('Consultas por tipo', [datos.porTipo]);
tabla('Consultas por día (hora de Madrid)', datos.porDia.filter((d) => d.mapa || d.gps));
tabla('Vista e idioma', datos.vistas);
tabla('Figuras más consultadas (la más específica del punto)', datos.figuras.slice(0, 25));
tabla(
  'Pesca submarina: qué se contestó',
  Object.entries(datos.porActividad.pescaSubmarina).map(([estado, n]) => ({ estado, consultas: n })),
);
tabla('GPS: dentro, fuera o dudosa', datos.gps);
tabla('Celdas de ~1 km más pulsadas en el mapa', datos.celdas.slice(0, 25));
