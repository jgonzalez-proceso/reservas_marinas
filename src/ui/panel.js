/**
 * Panel de resultados: lateral en escritorio, hoja inferior en móvil.
 *
 * Presenta primero la conclusión por actividad —que es lo que el usuario ha
 * venido a saber— y después las figuras que la sustentan y sus normas.
 *
 * Reglas de honestidad que este panel respeta:
 *  - Nunca afirma que no haya restricciones.
 *  - Un resultado incompleto se declara incompleto, no se presenta como
 *    conclusión cerrada.
 *  - Toda conclusión muestra la figura y la norma que la determinan.
 */

import { ESTADOS } from '../engine/resolve.js';
import { colorDe, nivelDe } from '../map/estilos-proteccion.js';
import { FUENTES } from '../rules/fuentes.js';
import { leeOrdenActividades, guardaOrdenActividades } from './orden-actividades.js';

const el = (tag, clase, texto) => {
  const n = document.createElement(tag);
  if (clase) n.className = clase;
  if (texto != null) n.textContent = texto;
  return n;
};

/** Importes siempre con dos decimales: "53,90 €", nunca "53,9 EUR". */
const moneda = (importe, divisa = 'EUR') =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: divisa,
    minimumFractionDigits: 2,
  }).format(importe);

/** Cuánto encoge la tarjeta mientras se arrastra. */
const ESCALA_ARRASTRE = 0.94;

const gradosLegibles = (valor, positivo, negativo) => {
  const abs = Math.abs(valor);
  const g = Math.floor(abs);
  const m = (abs - g) * 60;
  return `${g}° ${m.toFixed(3).replace('.', ',')}' ${valor >= 0 ? positivo : negativo}`;
};

export function creaPanel(contenedor, { onCerrar } = {}) {
  contenedor.innerHTML = '';

  // El usuario puede arrastrar las tarjetas a su gusto; el orden vive en esta
  // variable mientras dura la sesión y se relee de la cookie al arrancar, así
  // que sobrevive a cerrar la pestaña o la app.
  let ordenActividades = leeOrdenActividades();

  const cabecera = el('header', 'panel__cabecera');
  const titulo = el('h2', 'panel__titulo', 'Toca el mapa');
  const subtitulo = el('p', 'panel__subtitulo', 'Consulta las restricciones de cualquier punto.');
  const cerrar = el('button', 'panel__cerrar', '×');
  cerrar.setAttribute('aria-label', 'Cerrar panel');
  cerrar.addEventListener('click', () => onCerrar?.());
  cabecera.append(titulo, subtitulo, cerrar);

  const cuerpo = el('div', 'panel__cuerpo');
  contenedor.append(cabecera, cuerpo);

  function pintaVacio() {
    cuerpo.innerHTML = '';
    titulo.textContent = 'Toca el mapa';
    subtitulo.textContent = 'Consulta las restricciones de cualquier punto del mar.';
    const ayuda = el('div', 'vacio');
    ayuda.append(
      el(
        'p',
        null,
        'Pulsa sobre cualquier punto para ver qué figuras de protección lo afectan y qué se puede hacer allí.',
      ),
      el(
        'p',
        null,
        'Si estás navegando, usa el botón de ubicación: además de decirte si estás dentro, te dirá a qué distancia del límite estás y si tu GPS da para afirmarlo.',
      ),
    );
    cuerpo.append(ayuda);
  }

  function pintaResultado(resultado, { veredicto = null } = {}) {
    cuerpo.innerHTML = '';

    const { punto, figuras, actividades, sinFiguras, mensajeSinFiguras } = resultado;

    if (veredicto) {
      titulo.textContent = veredicto.titulo;
      subtitulo.textContent = veredicto.detalle;
      cabecera.dataset.nivel = veredicto.nivel;
    } else {
      titulo.textContent = sinFiguras ? 'Sin figuras en este punto' : figuras[0].nombre;
      subtitulo.textContent =
        `${gradosLegibles(punto.lat, 'N', 'S')}  ·  ${gradosLegibles(punto.lon, 'E', 'W')}`;
      delete cabecera.dataset.nivel;
    }

    if (sinFiguras) {
      const aviso = el('div', 'aviso aviso--neutro');
      aviso.append(el('p', null, mensajeSinFiguras));
      cuerpo.append(aviso);
      cuerpo.append(bloqueDescargo());
      return;
    }

    // -- Conclusión por actividad ---------------------------------------------
    const secAct = el('section', 'seccion');
    secAct.append(el('h3', 'seccion__titulo', 'Qué se puede hacer aquí'));

    for (const clave of ordenActividades) {
      secAct.append(tarjetaActividad(actividades[clave], clave));
    }
    cuerpo.append(secAct);
    habilitaReorden(secAct);

    // -- Figuras que afectan al punto -----------------------------------------
    const secFig = el('section', 'seccion');
    secFig.append(
      el(
        'h3',
        'seccion__titulo',
        figuras.length === 1
          ? 'Figura que afecta a este punto'
          : `${figuras.length} figuras afectan a este punto`,
      ),
    );
    if (figuras.length > 1) {
      secFig.append(
        el(
          'p',
          'seccion__nota',
          'Se listan de la más general a la más restrictiva. Todas aplican simultáneamente.',
        ),
      );
    }
    for (const fig of figuras) secFig.append(tarjetaFigura(fig));
    cuerpo.append(secFig);

    cuerpo.append(bloqueDescargo());
  }

  function tarjetaActividad(a, clave) {
    const estado = ESTADOS[a.status];
    const card = el('article', `actividad actividad--${estado.nivel}`);
    card.dataset.clave = clave;

    const fila = el('div', 'actividad__fila');
    const asa = el('span', 'actividad__asa', '⠿');
    asa.setAttribute('role', 'button');
    asa.setAttribute('aria-label', `Arrastrar para reordenar «${a.titulo}»`);
    asa.setAttribute('tabindex', '0');
    fila.append(asa);
    fila.append(el('span', 'actividad__nombre', a.titulo));
    fila.append(el('span', 'actividad__estado', estado.etiqueta));
    card.append(fila);

    if (a.motivo) card.append(el('p', 'actividad__motivo', a.motivo));

    if (a.permit) {
      const p = el('div', 'permiso');
      // Importe nulo significa «no publicado», no «gratis»: sin este caso el
      // panel anunciaba «Tasa: 0,00 €» para permisos cuyo precio no consta.
      const importe =
        a.permit.importe === 0
          ? 'Autorización gratuita'
          : Number.isFinite(a.permit.importe)
            ? `Tasa: ${moneda(a.permit.importe, a.permit.moneda)}`
            : 'Requiere autorización · importe no publicado';
      p.append(el('strong', null, importe));
      if (a.permit.vigencia) p.append(el('span', null, ` · vigencia ${a.permit.vigencia}`));
      if (a.permit.nota) p.append(el('p', 'permiso__nota', a.permit.nota));
      if (a.permit.url) {
        const enlace = el('a', 'permiso__enlace', 'Tramitar en la Seu Electrònica');
        enlace.href = a.permit.url;
        enlace.target = '_blank';
        enlace.rel = 'noopener noreferrer';
        p.append(enlace);
      }
      if (a.permit.ultimaVerificacion) {
        p.append(el('p', 'permiso__fecha', `Importe verificado el ${a.permit.ultimaVerificacion}`));
      }
      card.append(p);
    }

    if (a.conditions?.length) {
      const ul = el('ul', 'condiciones');
      for (const c of a.conditions) ul.append(el('li', null, c));
      card.append(ul);
    }

    // Las condiciones de las demás figuras van atribuidas a la suya, nunca
    // mezcladas con las anteriores: los aparejos del régimen general de una
    // reserva no son los que rigen dentro de una zona interior que los limita.
    for (const otra of a.condicionesDeOtrasFiguras ?? []) {
      const bloque = el('div', 'condiciones-otra');
      bloque.append(el('span', 'condiciones-otra__titulo', `También rige aquí, por ${otra.nombre}:`));
      const ul = el('ul', 'condiciones');
      for (const c of otra.conditions) ul.append(el('li', null, c));
      bloque.append(ul);
      card.append(bloque);
    }

    if (a.determinadaPor) {
      const det = el('p', 'actividad__origen');
      det.append(document.createTextNode('Lo determina: '));
      det.append(el('strong', null, a.determinadaPor.nombre));
      // El nombre solo no basta para identificar la figura. Sobre un mismo
      // punto del Llevant conviven la reserva marina y la reserva integral con
      // idéntica denominación, y sobre s'Albufera des Grau el parque, su
      // zonificación y la capa de pesca submarina llevan los tres el nombre del
      // parque. Sin el tipo de protección, «lo determina» no identifica nada.
      if (a.determinadaPor.proteccion) {
        det.append(document.createTextNode(` · ${a.determinadaPor.proteccion}`));
      }
      if (a.tambienImponen?.length) {
        det.append(
          document.createTextNode(
            ` (también lo imponen: ${a.tambienImponen.join('; ')})`,
          ),
        );
      }
      card.append(det);
    }

    if (a.heredadaDe) {
      card.append(
        el(
          'p',
          'actividad__heredada',
          `Regla del régimen general de ${a.heredadaDe.nombreCorto}, que se aplica también a esta zona.`,
        ),
      );
    }

    // La marca de incompleto es la pieza que impide leer una conclusión parcial
    // como si fuera completa.
    if (a.incompleto) {
      const inc = el('p', 'actividad__incompleto');
      inc.textContent =
        a.figurasSinRegla.length > 0
          ? `Información incompleta: ${a.figurasSinRegla.join('; ')} todavía no tiene redactada su regla para esta actividad. Consulta la norma.`
          : 'Información incompleta para esta actividad.';
      card.append(inc);
    }

    if (a.normas?.length) card.append(listaNormas(a.normas));
    if (a.sources?.length) card.append(listaFuentes(a.sources));

    return card;
  }

  /**
   * Deja reordenar las tarjetas de actividad arrastrándolas por su asa, que es
   * el único punto de agarre para no competir con el scroll táctil del resto
   * de la tarjeta.
   *
   * Durante el gesto, la tarjeta arrastrada NO se mueve en el DOM: sale del
   * flujo con `position: fixed`, se encoge y sigue al puntero, mientras un
   * hueco de su mismo alto se abre entre las demás para marcar dónde caerá.
   * Esto no es solo estética. La primera versión reordenaba la propia tarjeta
   * en el DOM a mitad de gesto, y mover un nodo libera la captura del puntero
   * —el navegador dispara `pointercancel`—, así que el arrastre real se
   * cortaba en cuanto se cruzaba la primera vecina. Por eso, además, los
   * eventos de movimiento se escuchan en `window` y no en el asa, que viaja
   * dentro de la tarjeta y queda con `pointer-events: none`.
   */
  function habilitaReorden(contenedor) {
    const tarjetasDe = () => [...contenedor.querySelectorAll(':scope > .actividad')];
    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // El contenedor con scroll es el cuerpo del panel; hace falta para poder
    // arrastrar hasta un destino que queda fuera de pantalla.
    const desplazable = contenedor.closest('.panel__cuerpo');

    const guarda = () => {
      // Se lee del DOM ya consolidado. A mitad de gesto la tarjeta arrastrada
      // sigue en su posición original y quien marca el destino es el hueco, así
      // que llamar aquí antes de soltar guardaría el orden anterior.
      ordenActividades = tarjetasDe().map((t) => t.dataset.clave);
      guardaOrdenActividades(ordenActividades);
    };

    /**
     * FLIP: mide dónde está cada tarjeta, aplica el cambio de orden y la anima
     * desde su posición anterior hasta la nueva. Sin esto, abrir el hueco en
     * otro sitio haría saltar de golpe a las demás tarjetas.
     */
    const conDeslizamiento = (reordena) => {
      const antes = new Map(tarjetasDe().map((t) => [t, t.getBoundingClientRect().top]));
      reordena();
      if (sinMovimiento) return;
      for (const t of tarjetasDe()) {
        if (t === sesion?.tarjeta) continue;
        const y0 = antes.get(t);
        if (y0 == null) continue;
        const delta = y0 - t.getBoundingClientRect().top;
        if (Math.abs(delta) < 1) continue;
        t.animate([{ transform: `translateY(${delta}px)` }, { transform: 'none' }], {
          duration: 180,
          easing: 'cubic-bezier(0.2, 0, 0, 1)',
        });
      }
    };

    /** Gesto en curso, o `null`. */
    let sesion = null;

    /**
     * Recoloca el hueco según por dónde va el puntero.
     *
     * El destino se calcula entero en cada movimiento contra una referencia
     * estable —dónde quedaría cada tarjeta si la arrastrada no ocupara sitio—
     * en lugar de ir intercambiando con la vecina inmediata. Encadenar
     * intercambios realimenta el cálculo, porque al mover el hueco cambian los
     * rectángulos que deciden el movimiento siguiente: con una tarjeta baja
     * sobre otra mucho más alta —que aquí es lo normal, van de 380 a 820 px—
     * el hueco entraba en un ciclo de ida y vuelta. Contra una referencia que
     * no depende de dónde esté el hueco, el cruce es además mucho más corto:
     * medido sobre el layout con el hueco puesto, pasar la primera vecina
     * pedía casi mil píxeles de arrastre.
     */
    const recolocaHueco = (punteroY) => {
      const { tarjeta, hueco, libera } = sesion;
      const otras = tarjetasDe().filter((t) => t !== tarjeta);

      // Se mide del layout (`offsetTop` / `offsetHeight`), nunca de
      // `getBoundingClientRect`: mientras corre la animación de deslizamiento
      // las tarjetas llevan un `transform` que el rectángulo pintado sí
      // refleja, y leer una posición a medio animar devolvía un destino
      // equivocado que disparaba otra animación — el hueco se quedaba
      // oscilando entre dos posiciones. El layout es inmune al transform.
      const base = contenedor.getBoundingClientRect().top - contenedor.offsetTop;
      const y = punteroY - base;

      // `destino` es la posición que le toca al hueco; `actual`, la que ocupa.
      // Como los topes de referencia crecen con el orden, la comparación es
      // cierta exactamente para un prefijo y basta con contarla.
      let destino = 0;
      let actual = 0;
      for (const otra of otras) {
        // FOLLOWING: `otra` va detrás del hueco, así que sin él subiría.
        const vaDetras = hueco.compareDocumentPosition(otra) & Node.DOCUMENT_POSITION_FOLLOWING;
        if (!vaDetras) actual++;
        const top = vaDetras ? otra.offsetTop - libera : otra.offsetTop;
        if (y > top + otra.offsetHeight / 2) destino++;
      }

      if (destino === actual) return;
      conDeslizamiento(() => {
        if (destino < otras.length) contenedor.insertBefore(hueco, otras[destino]);
        else contenedor.append(hueco);
      });
    };

    // Arrastrar contra el borde del panel lo desplaza. Con las seis tarjetas y
    // sus condiciones desplegadas, el destino puede no caber en pantalla, y sin
    // esto el gesto sería imposible de completar sin soltar a medias.
    const MARGEN_DESPLAZAMIENTO = 48;
    const VELOCIDAD_DESPLAZAMIENTO = 10;
    const desplazaSiTocaBorde = () => {
      if (!sesion) return;
      sesion.bucle = requestAnimationFrame(desplazaSiTocaBorde);
      if (!desplazable) return;
      const rect = desplazable.getBoundingClientRect();
      let velocidad = 0;
      if (sesion.punteroY < rect.top + MARGEN_DESPLAZAMIENTO) velocidad = -VELOCIDAD_DESPLAZAMIENTO;
      else if (sesion.punteroY > rect.bottom - MARGEN_DESPLAZAMIENTO) velocidad = VELOCIDAD_DESPLAZAMIENTO;
      if (!velocidad) return;
      const antes = desplazable.scrollTop;
      desplazable.scrollTop += velocidad;
      if (desplazable.scrollTop !== antes) recolocaHueco(sesion.punteroY);
    };

    const alMover = (ev) => {
      if (!sesion || ev.pointerId !== sesion.pointerId) return;
      ev.preventDefault();
      sesion.punteroY = ev.clientY;
      sesion.tarjeta.style.transform =
        `translate(${ev.clientX - sesion.origenX}px, ${ev.clientY - sesion.origenY}px) scale(${ESCALA_ARRASTRE})`;
      recolocaHueco(ev.clientY);
    };

    const alSoltar = (ev) => {
      if (!sesion || ev.pointerId !== sesion.pointerId) return;
      const { tarjeta, hueco, bucle } = sesion;
      cancelAnimationFrame(bucle);

      // La tarjeta vuelve al flujo justo donde el hueco lo marcaba.
      const desde = tarjeta.getBoundingClientRect();
      contenedor.insertBefore(tarjeta, hueco);
      hueco.remove();
      tarjeta.classList.remove('actividad--arrastrando');
      tarjeta.removeAttribute('style');
      document.body.classList.remove('reordenando');

      // Aterrizaje: anima desde donde estaba flotando hasta su sitio, para que
      // no aparezca de golpe en otro punto de la pantalla.
      if (!sinMovimiento) {
        const hasta = tarjeta.getBoundingClientRect();
        tarjeta.animate(
          [
            {
              transform: `translate(${desde.left - hasta.left}px, ${desde.top - hasta.top}px) scale(${ESCALA_ARRASTRE})`,
            },
            { transform: 'none' },
          ],
          { duration: 200, easing: 'cubic-bezier(0.2, 0, 0, 1)' },
        );
      }

      sesion = null;
      window.removeEventListener('pointermove', alMover);
      window.removeEventListener('pointerup', alSoltar);
      window.removeEventListener('pointercancel', alSoltar);
      guarda();
      tarjeta.querySelector('.actividad__asa')?.focus();
    };

    /** Reordena con el teclado: misma operación, sin gesto. */
    const mueve = (tarjeta, delta) => {
      const hermano = delta < 0 ? tarjeta.previousElementSibling : tarjeta.nextElementSibling;
      if (!hermano?.classList.contains('actividad')) return;
      conDeslizamiento(() => {
        if (delta < 0) contenedor.insertBefore(tarjeta, hermano);
        else contenedor.insertBefore(hermano, tarjeta);
      });
      guarda();
      tarjeta.querySelector('.actividad__asa')?.focus();
    };

    for (const tarjeta of tarjetasDe()) {
      const asa = tarjeta.querySelector('.actividad__asa');

      asa.addEventListener('keydown', (ev) => {
        if (ev.key === 'ArrowUp') {
          ev.preventDefault();
          mueve(tarjeta, -1);
        } else if (ev.key === 'ArrowDown') {
          ev.preventDefault();
          mueve(tarjeta, 1);
        }
      });

      asa.addEventListener('pointerdown', (ev) => {
        if (sesion || (ev.pointerType === 'mouse' && ev.button !== 0)) return;
        ev.preventDefault();

        const rect = tarjeta.getBoundingClientRect();

        // El hueco conserva el alto exacto de la tarjeta, así que el resto del
        // panel no da un salto al sacarla del flujo.
        const hueco = el('div', 'actividad__hueco');
        hueco.style.height = `${rect.height}px`;
        contenedor.insertBefore(hueco, tarjeta);

        // Posición antes que la clase: así la tarjeta ya nace fija en su sitio
        // en vez de parpadear una esquina de la ventana.
        tarjeta.style.width = `${rect.width}px`;
        tarjeta.style.left = `${rect.left}px`;
        tarjeta.style.top = `${rect.top}px`;
        tarjeta.style.transform = `scale(${ESCALA_ARRASTRE})`;
        tarjeta.classList.add('actividad--arrastrando');
        document.body.classList.add('reordenando');

        sesion = {
          tarjeta,
          hueco,
          pointerId: ev.pointerId,
          origenX: ev.clientX,
          origenY: ev.clientY,
          punteroY: ev.clientY,
          bucle: 0,
          // Cuánto subirían las tarjetas que van detrás si el hueco no
          // estuviera: su alto más el margen que lo separa de la siguiente.
          // El margen se lee del CSS en vez de repetir aquí su valor.
          libera: rect.height + parseFloat(getComputedStyle(hueco).marginTop),
        };

        window.addEventListener('pointermove', alMover, { passive: false });
        window.addEventListener('pointerup', alSoltar);
        window.addEventListener('pointercancel', alSoltar);
        desplazaSiTocaBorde();
      });
    }
  }

  function tarjetaFigura(fig) {
    const card = el('article', 'figura');
    card.style.setProperty('--color-figura', colorDe(fig.proteccion));

    const cab = el('div', 'figura__cabecera');
    cab.append(el('span', 'figura__punto'));
    cab.append(el('span', 'figura__nombre', fig.nombre));
    card.append(cab);

    const meta = el('p', 'figura__meta');
    meta.textContent = [
      fig.proteccion,
      fig.competencia ? `competencia ${fig.competencia.toLowerCase()}` : null,
      `${fig.areaKm2.toLocaleString('es-ES', { maximumFractionDigits: 1 })} km²`,
    ]
      .filter(Boolean)
      .join(' · ');
    card.append(meta);

    card.append(el('p', 'figura__descripcion', nivelDe(fig.proteccion).descripcion));

    if (Number.isFinite(fig.metrosAlBorde)) {
      const d = fig.metrosAlBorde;
      card.append(
        el(
          'p',
          'figura__distancia',
          `A ${d >= 1000 ? `${(d / 1000).toFixed(1).replace('.', ',')} km` : `${Math.round(d)} m`} del límite.`,
        ),
      );
    }

    if (fig.normas?.length) card.append(listaNormas(fig.normas));
    return card;
  }

  function listaNormas(normas) {
    const cont = el('div', 'normas');
    cont.append(el('span', 'normas__titulo', normas.length > 1 ? 'Normas' : 'Norma'));
    const ul = el('ul');
    for (const n of normas) {
      const li = el('li');
      if (n.url) {
        const a = el('a', null, n.titulo);
        a.href = n.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        li.append(a);
      } else {
        li.append(document.createTextNode(n.titulo));
      }
      if (n.fecha) li.append(el('span', 'normas__fecha', ` (${n.fecha})`));
      ul.append(li);
    }
    cont.append(ul);
    return cont;
  }

  function listaFuentes(claves) {
    const cont = el('div', 'fuentes');
    cont.append(el('span', 'fuentes__titulo', 'Fuente'));
    const ul = el('ul');
    for (const k of claves) {
      const f = FUENTES[k];
      if (!f) continue;
      const li = el('li');
      const a = el('a', null, f.titulo);
      a.href = f.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.append(a);
      if (f.referencia) li.append(el('span', 'fuentes__ref', ` — ${f.referencia}`));
      ul.append(li);
    }
    cont.append(ul);
    return cont;
  }

  function bloqueDescargo() {
    const d = el('div', 'descargo');
    d.append(
      el(
        'p',
        null,
        'Información orientativa y no oficial. La fuente vinculante es la norma publicada en el BOIB o el BOE y la cartografía oficial de IDEIB.',
      ),
    );
    return d;
  }

  pintaVacio();
  return { pintaResultado, pintaVacio, elemento: contenedor };
}
