/**
 * Normalización de atributos e identidad de las geometrías.
 *
 * Dos conceptos de identidad, deliberadamente separados:
 *
 *   zoneId    Identidad jurídica de la zona. A esto se vincula la ficha
 *             normativa. Varias geometrías pueden compartir zoneId (islotes,
 *             zonas discontinuas de una misma figura legal).
 *   featureId Identidad de una geometría concreta. zoneId + ordinal.
 *
 * Nunca se usa zoneId para deduplicar geometrías: dos polígonos distintos de
 * la misma figura legal comparten zoneId legítimamente.
 */

export function slugify(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2018\u2019'`]/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

/**
 * Identidad jurídica: fuente + denominación + tipo de protección + competencia.
 *
 * La competencia forma parte de la identidad, no es un atributo descriptivo.
 * En el Llevant de Mallorca conviven una reserva marina estatal de 46,4 km² y
 * una autonómica de 40,4 km² con el mismo nombre y el mismo tipo de protección,
 * y sus regímenes difieren de verdad: la página oficial fija «máx. 6 anzuelos
 * (máx. 4 en la zona estatal)» y reserva el esparavel, el salabre y el curricán
 * de fondo al ámbito autonómico. Sin la competencia en el zoneId ambas figuras
 * colapsarían en una sola ficha incapaz de expresar esa diferencia.
 *
 * Se omite el sufijo cuando la fuente no publica competencia, para no inventar
 * un valor que no existe.
 *
 * Cuando la fuente publica un código oficial, ese código encabeza el zoneId.
 * En Natura 2000 el nombre no basta: «Cap Enderrocat i cap Blanc» designa a la
 * vez el LIC ES5310128 (7.123 ha) y la ZEPA ES0000081 (11.645 ha), que son dos
 * espacios distintos con perímetros distintos. El SITE_CODE es el
 * identificador jurídico del espacio y no cambia aunque cambien su
 * denominación o su figura.
 *
 * El ámbito cierra la identidad cuando la fuente lo publica. Los espacios
 * naturales protegidos se declaran con una parte terrestre y otra marina, y sus
 * normas no son las mismas: el PORN de la Serra de Tramuntana regula el fondeo
 * y la pesca submarina «en el ámbito marino que delimita este Plan». Son dos
 * geometrías y dos regímenes, así que son dos zonas.
 */
export function zoneIdFor(source, attrs) {
  const nombre = slugify(attrs.nombre) || 'sin-nombre';
  const codigo = slugify(attrs.codigo);
  const proteccion = slugify(attrs.proteccion) || 'sin-proteccion';
  const identidad = codigo ? `${codigo}-${nombre}` : nombre;

  let id = `${source.prefijo}-${identidad}--${proteccion}`;
  for (const extra of [attrs.competencia, attrs.ambito]) {
    const s = slugify(extra);
    if (s) id += `--${s}`;
  }
  return id;
}

/**
 * Limpia una URL publicada por el servicio.
 *
 * La capa de Natura 2000 arrastra el identificador de sesión del servidor en
 * algunas fichas (`…_lic_zepa;jsessionid=319147E4…`). Es basura de la sesión
 * del funcionario que cargó el dato, no parte de la dirección: caduca y en
 * algunos servidores devuelve error.
 */
export function limpiaUrl(url) {
  if (!url) return null;
  return String(url).replace(/;jsessionid=[^?#]*/i, '') || null;
}

/**
 * Traduce los campos crudos del servicio al esquema común.
 *
 * `capa.fijos` aporta los valores que no vienen en ningún campo del registro
 * sino en la propia identidad de la capa. En Natura 2000, la denominación
 * (ZEC/LIC/ZEPA) y la competencia se saben por la capa consultada, no por un
 * atributo: el campo `TIPO` es la letra del SITETYPE y `AC` vale lo mismo para
 * todos los espacios de cada grupo.
 */
export function normalizeAttrs(capa, props) {
  const out = {};
  for (const [destino, origen] of Object.entries(capa.mapea ?? {})) {
    const v = props?.[origen];
    out[destino] = v === undefined || v === null || v === '' ? null : v;
  }
  for (const [destino, valor] of Object.entries(capa.fijos ?? {})) {
    out[destino] = valor;
  }
  if (out.fichaUrl) out.fichaUrl = limpiaUrl(out.fichaUrl);
  if (out.normaUrl) out.normaUrl = limpiaUrl(out.normaUrl);
  // La fecha de la norma se normaliza a día en origen. El servicio la sirve en
  // milisegundos de epoch y arrastra ruido por debajo del día: la capa de
  // reservas publica el Decret 26/2025 con 00:00:00 en unos registros y
  // 00:00:01 en otros. El atributo jurídico es la FECHA de la disposición;
  // comparar milisegundos convertía ese ruido en una contradicción falsa en la
  // deduplicación, y una fecha realmente distinta (otro día) debe seguir
  // siendo contradicción.
  if (out.normaFecha != null) {
    const d = new Date(out.normaFecha);
    out.normaFecha = Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
  }
  return out;
}

/**
 * Denominación de un espacio Natura 2000 a partir de las capas en las que
 * aparece. El orden reproduce el que usa el art. 2 del Decret 91/2023
 * («ZEC i ZEPA», «LIC i ZEPA»), para que la ficha y el boletín se lean igual.
 */
const ORDEN_DESIGNACIONES = ['ZEC', 'LIC', 'ZEPA'];

export function fusionaDesignaciones(designaciones) {
  const unicas = [...new Set(designaciones.filter(Boolean))];
  unicas.sort((a, b) => ORDEN_DESIGNACIONES.indexOf(a) - ORDEN_DESIGNACIONES.indexOf(b));
  return unicas.join(' i ');
}

/**
 * Construye la lista de normas a partir de los campos del servicio.
 * Siempre devuelve un array: una zona puede estar afectada por su norma de
 * creación, modificaciones posteriores y normativa general. El campo NORMA de
 * IDEIB alimenta esta lista pero no representa por sí solo el régimen vigente.
 */
export function normasDesdeAtributos(attrs) {
  if (!attrs.normaTitulo && !attrs.normaUrl) return [];
  return [
    {
      titulo: attrs.normaTitulo ?? 'Norma no especificada en el servicio oficial',
      fecha: attrs.normaFecha ? new Date(attrs.normaFecha).toISOString().slice(0, 10) : null,
      url: attrs.normaUrl ?? null,
      tipo: 'creacion',
      origen: 'ideib',
    },
  ];
}

// ---------------------------------------------------------------------------
// Canonicalización geométrica
//
// Dos geometrías equivalentes pueden llegar del servicio con distinto punto
// inicial de anillo, orientación de anillo u orden de polígonos, y producir
// JSON diferente. Serializar sin canonicalizar haría que la deduplicación
// pasara por alto duplicados reales.
// ---------------------------------------------------------------------------

const PRECISION = 7;

function redondea(par) {
  return [Number(par[0].toFixed(PRECISION)), Number(par[1].toFixed(PRECISION))];
}

function comparaPar(a, b) {
  return a[0] - b[0] || a[1] - b[1];
}

/** Rota el anillo para que empiece en su vértice menor y fija la dirección. */
function canonRing(ring) {
  let pts = ring.map(redondea);

  // Quita el vértice de cierre repetido, si lo hay.
  const n = pts.length;
  if (n > 1 && pts[0][0] === pts[n - 1][0] && pts[0][1] === pts[n - 1][1]) {
    pts = pts.slice(0, -1);
  }
  if (pts.length === 0) return [];

  // Rota hasta empezar por el vértice lexicográficamente menor.
  let min = 0;
  for (let i = 1; i < pts.length; i++) {
    if (comparaPar(pts[i], pts[min]) < 0) min = i;
  }
  const directo = [...pts.slice(min), ...pts.slice(0, min)];

  // Misma operación sobre el anillo invertido; se queda el menor de los dos.
  // Así una geometría y su versión con winding opuesto colapsan en la misma
  // representación canónica.
  const inv = [...pts].reverse();
  let minInv = 0;
  for (let i = 1; i < inv.length; i++) {
    if (comparaPar(inv[i], inv[minInv]) < 0) minInv = i;
  }
  const inverso = [...inv.slice(minInv), ...inv.slice(0, minInv)];

  const sDirecto = JSON.stringify(directo);
  const sInverso = JSON.stringify(inverso);
  return sDirecto <= sInverso ? directo : inverso;
}

function canonPolygon(rings) {
  const canon = rings.map(canonRing).filter((r) => r.length > 0);
  if (canon.length <= 1) return canon;
  // El anillo exterior se mantiene primero; los agujeros se ordenan.
  const [exterior, ...agujeros] = canon;
  agujeros.sort((a, b) => (JSON.stringify(a) < JSON.stringify(b) ? -1 : 1));
  return [exterior, ...agujeros];
}

/** Clave estable e independiente de winding, punto inicial y orden de polígonos. */
export function canonicalGeometryKey(geometry) {
  if (!geometry) return 'null';
  if (geometry.type === 'Polygon') {
    return 'P' + JSON.stringify(canonPolygon(geometry.coordinates));
  }
  if (geometry.type === 'MultiPolygon') {
    const polys = geometry.coordinates.map((p) => JSON.stringify(canonPolygon(p)));
    polys.sort();
    return 'M' + JSON.stringify(polys);
  }
  if (geometry.type === 'Point') {
    return 'p' + JSON.stringify(redondea(geometry.coordinates));
  }
  return 'X' + JSON.stringify(geometry);
}
