/**
 * Estilos de las páginas estáticas que se generan en el build: las de reservas
 * por isla y las legales. Van dentro de cada página, no en un fichero enlazado,
 * por el mismo motivo que en `public/404.html`: los nombres de `assets/` llevan
 * hash y una página que dependa de ellos se rompe cuando cambian. Son los
 * tokens de `src/styles/main.css`.
 */
export const ESTILOS_PAGINA = `      :root {
        --fondo: #0d1620;
        --fondo-2: #131f2b;
        --fondo-3: #1a2836;
        --borde: #26374a;
        --texto: #e8eef4;
        --texto-2: #9fb2c4;
        --acento: #2f8fd0;
        --ok: #3f9268;
        --aviso: #d9a441;
        --stop: #c9453c;
        --desconocido: #6b7d8c;
        --neutro: #5f89ad;
        --radio: 10px;
        --fuente: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      }
      * { box-sizing: border-box; }
      html { scroll-padding-top: 72px; }
      body {
        margin: 0;
        background: var(--fondo);
        color: var(--texto);
        font-family: var(--fuente);
        line-height: 1.55;
        font-size: 16px;
      }
      a { color: #7cc0f0; }
      .barra {
        position: sticky; top: 0; z-index: 10;
        display: flex; align-items: center; justify-content: space-between; gap: 12px;
        padding: 10px 16px;
        background: var(--fondo-2);
        border-bottom: 1px solid var(--borde);
      }
      .barra a.marca { color: var(--texto); font-weight: 700; text-decoration: none; }
      a.boton {
        display: inline-block; padding: 9px 14px; border-radius: var(--radio);
        background: var(--acento); color: #08131c; font-weight: 600; text-decoration: none; white-space: nowrap;
      }
      a.boton:focus-visible, .barra a:focus-visible { outline: 2px solid var(--texto); outline-offset: 2px; }
      main { max-width: 1080px; margin: 0 auto; padding: 24px 16px 48px; }
      h1 { font-size: 1.8rem; line-height: 1.2; margin: 8px 0 12px; }
      h2 { font-size: 1.35rem; margin: 40px 0 8px; padding-top: 8px; border-top: 1px solid var(--borde); }
      h3 { font-size: 1.08rem; margin: 28px 0 6px; }
      h4 { font-size: 0.95rem; margin: 14px 0 4px; }
      p, li { color: var(--texto); }
      .nota, .pie { color: var(--texto-2); font-size: 0.9rem; }
      .entradilla { font-size: 1.05rem; }
      .aviso {
        background: var(--fondo-2); border: 1px solid var(--borde); border-left: 4px solid var(--aviso);
        border-radius: var(--radio); padding: 12px 14px; font-size: 0.92rem;
      }
      .tabla { overflow-x: auto; margin: 10px 0; border: 1px solid var(--borde); border-radius: var(--radio); }
      table { border-collapse: collapse; width: 100%; font-size: 0.9rem; }
      th, td { text-align: left; vertical-align: top; padding: 8px 10px; border-bottom: 1px solid var(--borde); }
      thead th { background: var(--fondo-3); font-weight: 600; }
      tbody tr:last-child > * { border-bottom: 0; }
      tbody th { font-weight: 600; white-space: nowrap; }
      .resumen td { text-align: center; }
      .resumen tbody th { white-space: normal; min-width: 11em; }
      .resumen thead th { text-align: center; }
      .resumen thead th:first-child { text-align: left; }
      .resumen tr.grupo th { background: var(--fondo-3); }
      .estado {
        display: inline-block; padding: 2px 8px; border-radius: 999px;
        font-size: 0.78rem; font-weight: 600; white-space: nowrap; color: #fff;
      }
      .estado--ok { background: var(--ok); }
      .estado--aviso { background: var(--aviso); color: #1d1405; }
      .estado--stop { background: var(--stop); }
      .estado--neutro { background: var(--neutro); }
      .estado--desconocido { background: var(--desconocido); }
      details { background: var(--fondo-2); border: 1px solid var(--borde); border-radius: var(--radio); padding: 8px 14px; margin: 10px 0; }
      summary { cursor: pointer; font-weight: 600; }
      details ul { margin: 4px 0 8px; padding-left: 20px; }
      .permiso { font-size: 0.92rem; }
      .normas { font-size: 0.88rem; color: var(--texto-2); }
      .indice { columns: 2 18em; padding-left: 20px; }
      /* En móvil las tablas dejan de ser tablas. Con tres columnas, la de la
         norma se quedaba en una palabra por renglón y la de la actividad se
         salía por la izquierda; con las siete del resumen solo se veía una.
         Cada fila pasa a ser un bloque: en las zonas, actividad y estado en un
         renglón y el texto de la norma debajo a todo el ancho; en el resumen,
         el nombre de la zona y debajo sus seis estados en dos columnas, cada
         uno con el rótulo que en escritorio va en la cabecera (data-label). */
      @media (max-width: 640px) {
        .tabla { overflow-x: visible; }
        .tabla table, .tabla tbody, .tabla tr, .tabla th, .tabla td { display: block; }
        .tabla thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
        .tabla th, .tabla td { padding: 0; border: 0; }
        .tabla tbody tr { padding: 10px 12px; border-bottom: 1px solid var(--borde); }
        .tabla tbody tr:last-child { border-bottom: 0; }
        .tabla tbody th { white-space: normal; }

        .zona .tabla tbody tr { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px; }
        .zona .tabla tbody th { flex: 1 1 auto; }
        .zona .tabla tbody td:last-child { flex: 1 0 100%; }

        .resumen tbody tr { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; }
        .resumen tbody th { grid-column: 1 / -1; min-width: 0; }
        .resumen tbody td { text-align: left; display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }
        .resumen tbody td::before { content: attr(data-label); font-size: 0.78rem; color: var(--texto-2); }
        .resumen tr.grupo { padding: 8px 12px; background: var(--fondo-3); }
      }
      @media (max-width: 560px) {
        h1 { font-size: 1.45rem; }
        .barra a.marca span { display: none; }
      }
`;
