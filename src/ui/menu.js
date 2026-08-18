/**
 * Menú de la cabecera en móvil: cajón lateral con submenús.
 *
 * En una pantalla estrecha no caben el título, dos desplegables y dos botones:
 * la cabecera se caía a dos filas y cada fila de cabecera es una fila menos de
 * mapa. El idioma, la isla y «Zonas» se recogen aquí; «¿Estoy dentro?» se
 * queda fuera, en la barra, porque es el botón que se usa en el agua y
 * esconderlo tras dos toques sería esconder la aplicación.
 *
 * Los desplegables nativos no se meten dentro del cajón: al pulsarlos el
 * sistema abre su propia hoja encima y el cajón deja de existir para el
 * usuario. En su lugar cada grupo abre un submenú que entra desde la derecha,
 * con la opción activa marcada y filas de 48 px: esto se usa a bordo, en
 * movimiento y con las manos mojadas.
 *
 * El menú no guarda estado propio de la aplicación. Recibe las opciones ya
 * resueltas y devuelve la elección a quien lo montó, que es quien sabe que
 * cambiar de isla o de idioma recarga la página.
 */

import { t } from '../i18n/index.js';

/** Duración del deslizamiento del cajón; ha de coincidir con la del CSS. */
const MS_TRANSICION = 350;

const crea = (etiqueta, clase, texto) => {
  const el = document.createElement(etiqueta);
  if (clase) el.className = clase;
  if (texto != null) el.textContent = texto;
  return el;
};

function creaBoton(clase, texto) {
  const b = crea('button', clase, texto);
  b.type = 'button';
  return b;
}

/**
 * Enfocar sin desplazar nada. El `preventScroll` no es una precaución: sin él
 * el menú se rompía entero.
 *
 * La lista del primer nivel puede desplazarse (`overflow-y: auto`), así que es
 * un contenedor desplazable, y al abrir un submenú se enfoca su primera opción
 * cuando el submenú todavía está en `translateX(100%)` —la transición acaba de
 * empezar—. El navegador hacía lo que se le pide en esos casos: desplazar el
 * contenedor para traer a la vista lo que se acaba de enfocar. Movía la lista
 * 298 px a la izquierda, el cajón la recortaba con su `overflow: hidden` y el
 * submenú salía en blanco. Y el desplazamiento no se deshacía solo, así que a
 * partir de ahí el menú ya no volvía a verse bien.
 */
function enfoca(elemento) {
  elemento?.focus({ preventScroll: true });
}

/**
 * @param {HTMLElement} boton  el de la hamburguesa, ya en la cabecera
 * @param {Array<Object>} entradas
 *   `{ etiqueta, valor, opciones: [{ valor, etiqueta, activa }], onElegir }`
 *   para un grupo con submenú, o `{ etiqueta, accion, deshabilitada }` para
 *   una acción directa. `deshabilitada` se consulta al abrir: «Zonas» no puede
 *   responder mientras la cartografía se está descargando.
 */
export function creaMenu(boton, entradas) {
  const velo = crea('div', 'menu__velo');

  const nav = crea('nav', 'menu');
  nav.id = 'menu';
  nav.setAttribute('aria-label', t('menu.titulo'));

  const cabecera = crea('div', 'menu__cabecera');
  const cerrar = creaBoton('menu__cerrar', '×');
  cerrar.setAttribute('aria-label', t('menu.cerrar'));
  cabecera.append(crea('p', 'menu__titulo', t('menu.titulo')), cerrar);

  const lista = crea('ul', 'menu__items');

  /** Grupo cuyo submenú está a la vista, o `null` en el primer nivel. */
  let grupoAbierto = null;
  let abierto = false;

  const grupos = [];

  for (const entrada of entradas) {
    const li = crea('li', 'menu__item');

    if (!entrada.opciones) {
      const accion = creaBoton('menu__enlace', entrada.etiqueta);
      accion.addEventListener('click', () => {
        cierra({ devuelveFoco: false });
        entrada.accion();
      });
      li.append(accion);
      grupos.push({ li, accion, entrada });
      lista.append(li);
      continue;
    }

    const abridor = creaBoton('menu__enlace menu__enlace--grupo');
    abridor.setAttribute('aria-expanded', 'false');
    abridor.append(
      crea('span', 'menu__etiqueta', entrada.etiqueta),
      crea('span', 'menu__valor', entrada.valor ?? ''),
    );

    const submenu = crea('div', 'menu__submenu');
    const subLista = crea('ul', 'menu__items');

    const volver = creaBoton('menu__enlace menu__enlace--volver', t('menu.volver'));
    const liVolver = crea('li', 'menu__item');
    liVolver.append(volver);
    subLista.append(liVolver);

    for (const opcion of entrada.opciones) {
      const liOpcion = crea('li', 'menu__item');
      const b = creaBoton('menu__enlace menu__enlace--opcion', opcion.etiqueta);
      // `aria-current` y no `aria-selected`: esto no es una lista de selección
      // ARIA, son botones. Marca cuál es la opción que está en uso.
      if (opcion.activa) b.setAttribute('aria-current', 'true');
      b.addEventListener('click', () => entrada.onElegir(opcion.valor));
      liOpcion.append(b);
      subLista.append(liOpcion);
    }

    submenu.append(subLista);
    li.append(abridor, submenu);

    const grupo = { li, submenu, abridor, entrada };
    abridor.addEventListener('click', () => abreGrupo(grupo));
    volver.addEventListener('click', () => {
      cierraGrupos();
      enfoca(abridor);
    });

    grupos.push(grupo);
    lista.append(li);
  }

  nav.append(cabecera, lista);
  document.body.append(velo, nav);

  function abreGrupo(grupo) {
    cierraGrupos();
    grupo.li.classList.add('abierto');
    grupo.abridor.setAttribute('aria-expanded', 'true');
    grupoAbierto = grupo;
    enfoca(grupo.submenu.querySelector('.menu__enlace--opcion'));
  }

  function cierraGrupos() {
    for (const g of grupos) {
      g.li.classList.remove('abierto');
      g.abridor?.setAttribute('aria-expanded', 'false');
    }
    grupoAbierto = null;
  }

  /**
   * Lo que se puede enfocar ahora mismo.
   *
   * El submenú abierto tapa el cajón entero, cabecera incluida, así que
   * mientras está a la vista es lo único alcanzable. No se deduce del DOM
   * —un `visibility: hidden` heredado no se ve desde `offsetParent`— sino del
   * estado, que es quien lo sabe con certeza.
   */
  function focosActivos() {
    const raiz = grupoAbierto ? grupoAbierto.submenu : nav;
    return [...raiz.querySelectorAll('button:not(:disabled)')].filter(
      (b) => grupoAbierto || !b.closest('.menu__submenu'),
    );
  }

  function abre() {
    abierto = true;
    // Estado que puede haber cambiado desde el último uso: «Zonas» arranca
    // deshabilitado y se habilita cuando termina de cargar la cartografía.
    for (const g of grupos) {
      if (g.accion) g.accion.disabled = Boolean(g.entrada.deshabilitada?.());
    }
    document.body.classList.add('con-menu');
    boton.setAttribute('aria-expanded', 'true');
    enfoca(focosActivos()[0]);
  }

  function cierra({ devuelveFoco = true } = {}) {
    abierto = false;
    document.body.classList.remove('con-menu');
    boton.setAttribute('aria-expanded', 'false');
    if (devuelveFoco) enfoca(boton);
    // El submenú se recoge cuando el cajón ya ha salido de pantalla. Hacerlo a
    // la vez enseña el primer nivel deslizándose mientras el cajón se va, que
    // parece un fallo de dibujo.
    window.setTimeout(() => {
      if (!abierto) cierraGrupos();
    }, MS_TRANSICION);
  }

  boton.addEventListener('click', () => (abierto ? cierra() : abre()));
  cerrar.addEventListener('click', () => cierra());
  velo.addEventListener('click', () => cierra());

  nav.addEventListener('keydown', (evento) => {
    // Escape sube un nivel antes de cerrar del todo: dentro de un submenú lo
    // que se quiere deshacer casi siempre es haber entrado en él.
    if (evento.key === 'Escape') {
      evento.preventDefault();
      if (grupoAbierto) {
        const { abridor } = grupoAbierto;
        cierraGrupos();
        enfoca(abridor);
      } else {
        cierra();
      }
      return;
    }

    // El cajón se comporta como un diálogo: el tabulador da vueltas dentro en
    // vez de irse al mapa de detrás, que está tapado y no se puede ver.
    if (evento.key !== 'Tab') return;
    const focos = focosActivos();
    if (focos.length === 0) return;
    const primero = focos[0];
    const ultimo = focos[focos.length - 1];
    if (evento.shiftKey && document.activeElement === primero) {
      evento.preventDefault();
      enfoca(ultimo);
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      enfoca(primero);
    }
  });

  return { abre, cierra };
}
