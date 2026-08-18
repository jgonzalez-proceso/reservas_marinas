/**
 * Motor de resolución de restricciones.
 *
 * Dado un punto, reúne todas las figuras de protección que lo contienen,
 * recupera sus fichas normativas y devuelve una conclusión por actividad.
 *
 * Regla central: sobre un mismo punto pueden recaer varias figuras, y prevalece
 * la más restrictiva de las conocidas.
 *
 * `unknown` NO forma parte de la escala de restricción, y esto es deliberado.
 * Si se colocara arriba, una zona sin ficha redactada enmascararía una
 * prohibición conocida; si se colocara abajo, se presentaría como permisiva.
 * En su lugar, la ausencia de regla marca el resultado como `incompleto`, que
 * se muestra junto a la conclusión en vez de sustituirla.
 */

import { figurasEn } from './locate.js';

export const ACTIVIDADES = {
  pescaRecreativaEmbarcacion: 'Pesca recreativa desde embarcación',
  pescaSubmarina: 'Pesca submarina',
  pescaDesdeCosta: 'Pesca recreativa desde costa',
  buceo: 'Buceo',
  fondeo: 'Fondeo',
  navegacion: 'Navegación',
};

/**
 * De menos a más restrictivo. `unknown` queda fuera de la escala a propósito.
 *
 * `not_regulated` se sitúa por debajo de `allowed`: ambos aportan cero
 * restricción, pero si una figura permite expresamente la actividad y otra
 * simplemente no la menciona, la que la permite expresamente es la más
 * informativa y debe ganar como figura determinante.
 */
export const ESCALA = [
  'not_regulated',
  'allowed',
  'allowed_with_authorization',
  'restricted',
  'prohibited',
];

export const ESTADOS = {
  allowed: { etiqueta: 'Permitida', nivel: 'ok' },
  allowed_with_authorization: { etiqueta: 'Permitida con autorización', nivel: 'aviso' },
  restricted: { etiqueta: 'Restringida', nivel: 'aviso' },
  prohibited: { etiqueta: 'Prohibida', nivel: 'stop' },
  // No es lo mismo que `unknown`: aquí sí se ha consultado la norma de la
  // figura y esa norma concreta no regula esta actividad. Puede seguir
  // aplicando normativa general (p. ej. RD 191/2026) u otra figura superpuesta.
  not_regulated: { etiqueta: 'Sin restricción específica', nivel: 'neutro' },
  unknown: { etiqueta: 'No determinable', nivel: 'desconocido' },
};

const rango = (estado) => ESCALA.indexOf(estado);

/**
 * Mensaje para un punto que no cae en ninguna figura cargada.
 *
 * Nunca afirma que no haya restricciones. Con solo las reservas marinas
 * cargadas, decir "no hay restricciones" sería falso: quedan fuera Natura 2000,
 * los espacios naturales protegidos, la protección de la posidonia y la
 * normativa general de pesca recreativa.
 */
export const SIN_FIGURAS =
  'Este punto no está dentro de ninguna de las zonas de protección actualmente ' +
  'cargadas en el mapa. Sigue siendo aplicable la normativa general y pueden ' +
  'existir otras restricciones.';

function resuelveActividad(clave, figuras, fichas) {
  const aportaciones = [];
  const sinRegla = [];

  for (const fig of figuras) {
    const ficha = fichas[fig.zoneId];
    const regla = ficha?.actividades?.[clave];

    if (!regla || regla.status === 'unknown') {
      sinRegla.push(fig);
      continue;
    }
    aportaciones.push({ figura: fig, regla, ficha });
  }

  if (aportaciones.length === 0) {
    return {
      actividad: clave,
      titulo: ACTIVIDADES[clave],
      status: 'unknown',
      // `motivoClave` acompaña a `motivo` en vez de sustituirlo. El motor no
      // importa el modulo de idiomas —lo ejecutan tambien los scripts de Node,
      // que no tienen `document` ni `navigator`, y meterle interfaz a un motor
      // de reglas es la manera de que deje de poder probarse a solas—, asi que
      // publica la clave y deja que la traduzca quien pinta. Las dos unicas
      // frases de este fichero que ve el usuario son estas dos.
      motivoClave: figuras.length === 0 ? 'motor.sinFiguras' : 'motor.sinRegla',
      motivo:
        figuras.length === 0
          ? SIN_FIGURAS
          : 'Ninguna de las figuras que afectan a este punto tiene todavía redactada su ' +
            'regla para esta actividad. Consulta la norma directamente.',
      incompleto: figuras.length > 0,
      figurasSinRegla: sinRegla.map((f) => f.nombre),
      conditions: [],
      normas: [],
      permit: null,
      determinadaPor: null,
    };
  }

  // Manda la más restrictiva; a igual restricción, la más específica.
  //
  // El desempate por área ascendente es *lex specialis*: dentro de la zona de
  // alta protección de les Malgrats la pesca desde embarcación está permitida
  // con autorización, igual que en el resto de la reserva, pero solo con caña y
  // potera y en ventanas estacionales. Si mandara el perímetro general se
  // presentarían como aplicables el curricán y el spinning, que allí no lo son.
  // El zoneId cierra el desempate cuando dos figuras comparten perímetro, para
  // que el resultado sea estable entre ejecuciones.
  //
  // Antes del área se mira si la regla es propia de la figura o solo la norma
  // general que rige en cualquier parte. Una regla marcada `generica` —hoy, la
  // prohibición estatal de fondear sobre fanerógamas— no puede desplazar a la
  // que una figura ha escrito para ese trozo de mar concreto, aunque su
  // polígono sea más pequeño. En ses Salines pasaba: la Reserva Marina dels
  // Freus (120,4 km²) le ganaba por tamaño a la zona de fondeo libre
  // condicionado del PRUG (134,3 km²), y el panel contestaba con el Real
  // Decreto en vez de con el art. 117, que es el que dice que aquí solo se
  // puede fondear sobre arena. El estado no cambia: las dos dicen «restringida».
  const esGenerica = (a) => (a.regla.generica ? 1 : 0);
  aportaciones.sort(
    (a, b) =>
      rango(b.regla.status) - rango(a.regla.status) ||
      esGenerica(a) - esGenerica(b) ||
      a.figura.areaKm2 - b.figura.areaKm2 ||
      a.figura.zoneId.localeCompare(b.figura.zoneId),
  );
  const ganadora = aportaciones[0];

  // Las condiciones NO se fusionan entre figuras. Mezclar en una sola lista los
  // aparejos del régimen general con los de una zona interior que lo restringe
  // produce una lectura falsa: aparecerían como permitidas artes que en ese
  // punto están vedadas. Se muestran las de la figura que determina el estado y,
  // aparte, las de las demás, cada una atribuida a la suya.
  const conditions = [...new Set(ganadora.regla.conditions ?? [])];
  const propias = new Set(conditions);

  // Solo se añaden las condiciones de figuras igual de específicas o más que la
  // ganadora Y con su mismo estado. Las de una figura más general se omiten a
  // propósito: *lex specialis*, el régimen de la zona interior sustituye al del
  // perímetro que la contiene, no se suma a él. Enseñar los aparejos del
  // régimen general dentro de una zona que los restringe haría creer que están
  // permitidos.
  //
  // La igualdad de estado es la otra mitad de la misma regla. Una figura menos
  // restrictiva ha sido desplazada entera, y sus condiciones describen cómo
  // practicar la actividad bajo un régimen que aquí ya no manda: listar «con
  // caña y potera, de octubre a abril» debajo de una PROHIBICIÓN ofrece una
  // vía para pescar donde está vedado — el error opuesto al que existe esta
  // web. El caso es real: el Toro y les Malgrats llevan dos figuras con
  // geometría idéntica, y el filtro por área solo no las distingue. Como la
  // ganadora es la de mayor rango, igual rango equivale a igual estado.
  // Las obligaciones generales que sí sobreviven —autorización, registro de
  // capturas— viajan en el `permit`, que se hereda.
  const condicionesDeOtrasFiguras = aportaciones
    .slice(1)
    .filter(
      (a) =>
        a.regla.status === ganadora.regla.status &&
        a.figura.areaKm2 <= ganadora.figura.areaKm2,
    )
    .map((a) => ({
      nombre: a.figura.nombre,
      zoneId: a.figura.zoneId,
      conditions: (a.regla.conditions ?? []).filter((c) => !propias.has(c)),
    }))
    .filter((x) => x.conditions.length > 0);

  const normas = [];
  const vistas = new Set();
  for (const a of aportaciones) {
    for (const n of a.ficha.normas ?? []) {
      const k = `${n.titulo}|${n.url}`;
      if (!vistas.has(k)) {
        vistas.add(k);
        normas.push(n);
      }
    }
  }

  return {
    actividad: clave,
    titulo: ACTIVIDADES[clave],
    status: ganadora.regla.status,
    motivo: ganadora.regla.motivo ?? null,
    incompleto: sinRegla.length > 0,
    figurasSinRegla: sinRegla.map((f) => f.nombre),
    conditions,
    condicionesDeOtrasFiguras,
    schedule: ganadora.regla.schedule ?? null,
    permit: ganadora.regla.permit ?? null,
    // Las fuentes de todas las reglas aplicables, no solo las de la ganadora:
    // el usuario debe poder comprobar cada afirmación que se le muestra.
    sources: [...new Set(aportaciones.flatMap((a) => a.regla.sources ?? []))],
    normas,
    determinadaPor: {
      zoneId: ganadora.figura.zoneId,
      nombre: ganadora.figura.nombre,
      proteccion: ganadora.figura.proteccion,
    },
    // Presente cuando la regla no es propia de la zona sino del régimen general
    // de la reserva que la contiene. El panel lo dice, para que quede claro de
    // dónde sale la restricción.
    heredadaDe: ganadora.regla.heredadaDe ?? null,
    // Otras figuras con el mismo grado de restricción, para no dar a entender
    // que solo una la impone.
    tambienImponen: aportaciones
      .slice(1)
      .filter((a) => a.regla.status === ganadora.regla.status)
      .map((a) => a.figura.nombre),
  };
}

/**
 * Resuelve un punto completo.
 *
 * @param {{lat:number, lon:number}} punto
 * @param {Array} features   geometrías ya filtradas por isla
 * @param {Object} fichas    reglas indexadas por zoneId
 */
export function resolver(punto, features, fichas) {
  const figuras = figurasEn(punto, features);

  const actividades = {};
  for (const clave of Object.keys(ACTIVIDADES)) {
    actividades[clave] = resuelveActividad(clave, figuras, fichas);
  }

  return {
    punto,
    figuras,
    actividades,
    sinFiguras: figuras.length === 0,
    mensajeSinFiguras: SIN_FIGURAS,
    mensajeSinFigurasClave: 'motor.sinFiguras',
    // Cierto cuando alguna figura carece de ficha: la web debe decirlo en vez
    // de presentar la conclusión como completa.
    incompleto: Object.values(actividades).some((a) => a.incompleto),
  };
}
