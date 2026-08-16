/**
 * Leyenda de niveles de protección. Plegada por defecto en móvil.
 *
 * Solo se enumeran los niveles que están dibujados en ese momento. Una leyenda
 * con colores que no aparecen en el mapa desorienta más que ayuda, y con las
 * capas conmutables el conjunto dibujado cambia sobre la marcha: `actualiza`
 * la rehace cuando se enciende o apaga una fuente.
 */

import { NIVELES, nivelDe } from '../map/estilos-proteccion.js';

const NOTA =
  'Las capas se pueden encender y apagar desde el control del mapa. Apagar una capa no la ' +
  'desactiva: al pulsar un punto se sigue consultando todas, y sus figuras aparecen igualmente en ' +
  'el panel. El color indica el tipo de figura, no lo que está prohibido; eso lo dice el panel, ' +
  'actividad por actividad.';

export function creaLeyenda(contenedor, features) {
  contenedor.innerHTML = '';

  const boton = document.createElement('button');
  boton.className = 'leyenda__toggle';
  boton.setAttribute('aria-expanded', 'false');
  boton.textContent = 'Leyenda';

  const lista = document.createElement('ul');
  lista.className = 'leyenda__lista';

  const nota = document.createElement('p');
  nota.className = 'leyenda__nota';
  nota.textContent = NOTA;

  const fila = (proteccion, color, descripcion) => {
    const li = document.createElement('li');
    const muestra = document.createElement('span');
    muestra.className = 'leyenda__muestra';
    muestra.style.background = color;
    muestra.style.borderColor = color;
    const texto = document.createElement('span');
    texto.className = 'leyenda__texto';
    const t = document.createElement('strong');
    t.textContent = proteccion;
    const d = document.createElement('span');
    d.textContent = descripcion;
    texto.append(t, d);
    li.append(muestra, texto);
    return li;
  };

  function actualiza(visibles) {
    const presentes = new Set(visibles.map((f) => f.properties.proteccion));
    const usados = NIVELES.filter((n) => presentes.has(n.proteccion)).sort(
      (a, b) => a.orden - b.orden,
    );
    const otros = [...presentes].filter((p) => !NIVELES.some((n) => n.proteccion === p));

    lista.innerHTML = '';
    for (const n of usados) lista.append(fila(n.proteccion, n.color, n.descripcion));
    for (const p of otros) {
      const n = nivelDe(p);
      lista.append(fila(p, n.color, n.descripcion));
    }
  }

  actualiza(features);

  boton.addEventListener('click', () => {
    const abierto = contenedor.classList.toggle('leyenda--abierta');
    boton.setAttribute('aria-expanded', String(abierto));
  });

  contenedor.append(boton, lista, nota);

  // Arranca plegada en cualquier tamaño de pantalla. La leyenda explica los
  // colores del mapa, que es información de apoyo: quien abre la web quiere ver
  // el mar y pulsar un punto, no leer una lista de figuras. Desplegada tapaba
  // parte del mapa desde el primer segundo.

  return { actualiza };
}
