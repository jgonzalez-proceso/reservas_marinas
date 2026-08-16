/**
 * Buscador y listado de zonas. Filtra por nombre o tipo de protección y centra
 * el mapa en la zona elegida.
 */

import { colorDe } from '../map/estilos-proteccion.js';

const normaliza = (s) =>
  String(s ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

export function creaBuscador(contenedor, features, { onElegir, tieneFicha }) {
  const zonas = [];
  const vistas = new Set();
  for (const f of features) {
    const p = f.properties;
    if (vistas.has(p.zoneId)) continue;
    vistas.add(p.zoneId);
    zonas.push({
      zoneId: p.zoneId,
      nombre: p.nombre,
      proteccion: p.proteccion,
      competencia: p.competencia,
      busqueda: normaliza(`${p.nombre} ${p.proteccion} ${p.competencia ?? ''}`),
    });
  }
  zonas.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

  contenedor.innerHTML = '';

  const campo = document.createElement('input');
  campo.type = 'search';
  campo.className = 'buscador__campo';
  campo.placeholder = `Buscar entre ${zonas.length} zonas…`;
  campo.setAttribute('aria-label', 'Buscar zona de protección');

  const lista = document.createElement('ul');
  lista.className = 'buscador__lista';

  function pinta(filtro = '') {
    const q = normaliza(filtro).trim();
    const visibles = q ? zonas.filter((z) => z.busqueda.includes(q)) : zonas;

    lista.innerHTML = '';
    if (visibles.length === 0) {
      const li = document.createElement('li');
      li.className = 'buscador__vacio';
      li.textContent = 'Ninguna zona coincide con la búsqueda.';
      lista.append(li);
      return;
    }

    for (const z of visibles) {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = 'buscador__item';

      const punto = document.createElement('span');
      punto.className = 'buscador__color';
      punto.style.background = colorDe(z.proteccion);

      const texto = document.createElement('span');
      texto.className = 'buscador__texto';
      const nombre = document.createElement('strong');
      nombre.textContent = z.nombre;
      const meta = document.createElement('span');
      meta.textContent = z.proteccion;
      texto.append(nombre, meta);

      btn.append(punto, texto);

      // Señalar qué zonas aún no tienen regla redactada evita que el usuario
      // interprete un panel escueto como "aquí no hay restricciones".
      if (!tieneFicha(z.zoneId)) {
        const marca = document.createElement('span');
        marca.className = 'buscador__pendiente';
        marca.textContent = 'sin ficha';
        marca.title = 'Las restricciones de esta zona todavía no están redactadas.';
        btn.append(marca);
      }

      btn.addEventListener('click', () => onElegir(z.zoneId));
      li.append(btn);
      lista.append(li);
    }
  }

  campo.addEventListener('input', () => pinta(campo.value));
  pinta();

  contenedor.append(campo, lista);
  return { elemento: contenedor, refresca: () => pinta(campo.value) };
}
