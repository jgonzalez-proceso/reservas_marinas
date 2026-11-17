/**
 * Aviso legal y política de privacidad, generadas en el build.
 *
 * Existen porque la web pide consentimiento para una cookie de Google
 * Analytics y no decía en ninguna parte quién la publica, qué datos trata ni
 * cómo retirar ese consentimiento. Salió en la auditoría del 2026-11-17 como
 * el defecto más grave de la página.
 *
 * Tres reglas para tocar este fichero:
 *
 *  - **Lo que dice tiene que ser verdad en el código.** Cada afirmación de la
 *    política describe algo que hace `src/ui/medicion.js`,
 *    `functions/api/evento.js`, `src/ui/analytics.js` o `src/ui/cookies.js`.
 *    Si cambia lo que se mide o se añade una cookie, esto se cambia en el
 *    mismo commit. `test-paginas.mjs` comprueba lo que se puede comprobar solo:
 *    que toda cookie declarada en `src/` aparece aquí.
 *  - **El identificador de Analytics se importa, no se copia**: el nombre de
 *    su cookie sale de él.
 *  - **Los datos del titular están en un solo sitio**, `TITULAR`. Hoy la web es
 *    personal, gratuita y sin actividad económica, y por eso solo publica
 *    nombre, localidad y correo, que es lo que exige el art. 13 del RGPD. El
 *    día que se venda o se licencie pasa a ser un servicio con actividad
 *    económica y el art. 10 de la LSSI exige además NIF y domicilio: se añaden
 *    aquí.
 *
 * Solo en castellano, como las páginas de reservas por isla: no ejecutan el
 * bundle, que es quien traduce. Los enlaces que llevan a ellas sí se traducen.
 */

import { ID_MEDICION } from '../../src/ui/analytics.js';

import { ESTILOS_PAGINA } from './estilos.mjs';
import { SITIO } from './sitio.mjs';

export const TITULAR = {
  nombre: 'Javier González Llofriu',
  localidad: 'Palma (Illes Balears)',
  correo: 'javi.ugt@gmail.com',
};

/** Fecha de la última revisión del texto. Se cambia a mano al tocarlo. */
const REVISION = '2026-11-17';

export const RUTA_AVISO = 'aviso-legal/';
export const RUTA_PRIVACIDAD = 'politica-de-privacidad/';

/** Cookie propia de Google Analytics para esta web: `_ga_` + el identificador sin «G-». */
const COOKIE_GA = `_ga_${ID_MEDICION.replace(/^G-/, '')}`;

/** Para el pie de las demás páginas estáticas. */
export const ENLACES_LEGALES_HTML = `<a href="/${RUTA_AVISO}">Aviso legal</a> · <a href="/${RUTA_PRIVACIDAD}">Política de privacidad</a>`;

const esc = (s) =>
  String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const fechaLarga = (iso) =>
  new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  );

const correo = `<a href="mailto:${esc(TITULAR.correo)}">${esc(TITULAR.correo)}</a>`;

function pagina({ ruta, titulo, descripcion, cuerpo }) {
  const url = `${SITIO}${ruta}`;
  const jsonld = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: titulo,
          url,
          description: descripcion,
          inLanguage: 'es',
          dateModified: REVISION,
          isPartOf: { '@type': 'WebSite', name: 'Reservas Marinas Baleares', url: SITIO },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Mapa de reservas marinas de Baleares', item: SITIO },
            { '@type': 'ListItem', position: 2, name: titulo, item: url },
          ],
        },
      ],
    },
    null,
    2,
  );

  return `<!doctype html>
<!--
  GENERADO por scripts/paginas/legales.mjs en el build. No se edita a mano.
-->
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${esc(titulo)} · Reservas marinas de Baleares</title>
    <meta name="description" content="${esc(descripcion)}" />
    <meta name="color-scheme" content="dark" />
    <link rel="canonical" href="${esc(url)}" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <script type="application/ld+json">
${jsonld}
    </script>
    <style>
${ESTILOS_PAGINA}      main { max-width: 760px; }
      code { font-size: 0.9em; background: var(--fondo-3); padding: 1px 5px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <header class="barra">
      <a class="marca" href="/">Reservas marinas <span>· Illes Balears</span></a>
      <a class="boton" href="/">Abrir el mapa</a>
    </header>
    <main>
      <nav class="nota" aria-label="Ruta"><a href="/">Mapa de reservas marinas de Baleares</a> › ${esc(titulo)}</nav>
      <h1>${esc(titulo)}</h1>
${cuerpo}
      <p class="pie">Última revisión de este texto: ${esc(fechaLarga(REVISION))}. ${ENLACES_LEGALES_HTML}</p>
    </main>
  </body>
</html>
`;
}

function avisoLegal() {
  return pagina({
    ruta: RUTA_AVISO,
    titulo: 'Aviso legal',
    descripcion:
      'Quién publica el mapa de reservas marinas de Baleares, qué valor tiene la información que da y de dónde salen sus datos.',
    cuerpo: `
      <p class="entradilla">Esta web es un proyecto personal, gratuito y sin publicidad. No es un servicio de ninguna administración y lo que dice no sustituye a la norma publicada.</p>

      <h2>Quién publica esta web</h2>
      <ul>
        <li><strong>Titular:</strong> ${esc(TITULAR.nombre)}</li>
        <li><strong>Localidad:</strong> ${esc(TITULAR.localidad)}</li>
        <li><strong>Contacto:</strong> ${correo}</li>
      </ul>
      <p>Es el mismo titular que publica <a href="https://pecesmediterraneo.com/">pecesmediterraneo.com</a>, la guía de fauna marina del Mediterráneo de la que esta web es un subdominio.</p>

      <h2>Qué es y qué no es</h2>
      <p>Es una web <strong>informativa y no oficial</strong>. Reúne las figuras de protección que recaen sobre cada punto del mar de las Illes Balears y resume, actividad por actividad, lo que dice la norma de cada una, con la cita de esa norma.</p>
      <p>La fuente vinculante es siempre la norma publicada en el <a href="https://www.caib.es/eboibfront/" rel="noopener noreferrer">BOIB</a> o en el <a href="https://www.boe.es/" rel="noopener noreferrer">BOE</a> y la cartografía oficial de <a href="https://ideib.caib.es/" rel="noopener noreferrer">IDEIB</a>. Si lo que lees aquí no coincide con la norma, manda la norma.</p>

      <h2>Límites de la información</h2>
      <ul>
        <li><strong>Puede haber errores.</strong> Las fichas las ha redactado el titular leyendo las normas. Se revisan, pero una norma puede haberse modificado después de la última revisión, o estar mal resumida.</li>
        <li><strong>No está todo.</strong> Faltan capas enteras —las praderas de posidonia, los campos de boyas, las zonas de servicio de los puertos— y la normativa general de pesca recreativa. Que un punto no caiga en ninguna zona del mapa no significa que allí no haya restricciones.</li>
        <li><strong>La cartografía tiene fecha.</strong> Se descarga de IDEIB y se publica con la fecha de descarga a la vista. Un límite puede haber cambiado desde entonces.</li>
        <li><strong>El GPS tiene margen de error.</strong> La función «¿Estoy dentro?» indica con qué precisión se ha obtenido tu posición, y dice que no puede determinarlo cuando estás más cerca del límite que ese margen.</li>
      </ul>
      <p>El uso de esta web es responsabilidad de quien la consulta. En la medida en que la ley lo permite, el titular no responde de las sanciones, daños o perjuicios que puedan derivarse de actuar según la información publicada aquí sin haberla contrastado con la norma vigente.</p>
      <p>Si encuentras un error, escribe a ${correo}: se corrige.</p>

      <h2>De dónde salen los datos</h2>
      <ul>
        <li><strong>Cartografía de las figuras de protección:</strong> servicios públicos de IDEIB, la Infraestructura de Datos Espaciales del Govern de les Illes Balears.</li>
        <li><strong>Normas:</strong> los textos oficiales del BOIB y del BOE, enlazados desde cada ficha.</li>
        <li><strong>Mapas de fondo:</strong> imagen de satélite de Esri y sus proveedores, ortofoto de IDEIB, OpenStreetMap y OpenSeaMap, cada uno con la atribución que aparece sobre el mapa.</li>
        <li><strong>Programa:</strong> el mapa se dibuja con Leaflet.</li>
      </ul>
      <p>Los textos explicativos, las fichas y el diseño son del titular. Los nombres, marcas y datos de terceros pertenecen a sus titulares.</p>

      <h2>Enlaces a otras webs</h2>
      <p>Esta web enlaza a boletines oficiales, a sedes electrónicas donde se tramitan autorizaciones y a otras páginas. El titular no controla su contenido ni responde de él, aunque comprueba periódicamente que los enlaces siguen funcionando.</p>

      <h2>Datos personales y cookies</h2>
      <p>Qué datos se tratan, qué cookies se usan y cómo cambiar tu elección está en la <a href="/${RUTA_PRIVACIDAD}">política de privacidad</a>.</p>

      <h2>Ley aplicable</h2>
      <p>Este aviso se rige por la legislación española.</p>`,
  });
}

function politicaPrivacidad() {
  return pagina({
    ruta: RUTA_PRIVACIDAD,
    titulo: 'Política de privacidad y cookies',
    descripcion:
      'Qué datos trata el mapa de reservas marinas de Baleares, qué cookies usa y cómo cambiar tu elección. Tu posición GPS no sale de tu dispositivo.',
    cuerpo: `
      <p class="entradilla">En corto: esta web no tiene registro ni formularios, tu posición GPS no sale de tu dispositivo y solo se usa una cookie de análisis si la aceptas.</p>

      <h2>Quién es el responsable</h2>
      <ul>
        <li><strong>Responsable:</strong> ${esc(TITULAR.nombre)}</li>
        <li><strong>Localidad:</strong> ${esc(TITULAR.localidad)}</li>
        <li><strong>Contacto:</strong> ${correo}</li>
      </ul>

      <h2>Qué datos se tratan y para qué</h2>

      <h3>Tu posición</h3>
      <p>Solo se pide cuando pulsas «¿Estoy dentro?», y el permiso lo da tu navegador. La posición se compara con la cartografía <strong>dentro de tu dispositivo</strong>: no se envía a ningún servidor ni se guarda.</p>

      <h3>Contador anónimo de uso</h3>
      <p>Para saber cuánto se usa el mapa y qué zonas se consultan, cada consulta y cada entrada a la web suman uno en un contador propio. Lo que se anota es:</p>
      <ul>
        <li>si fue una entrada a la web, un punto pulsado en el mapa o una consulta por GPS;</li>
        <li>la isla que se estaba viendo y el idioma de la interfaz;</li>
        <li>qué figuras de protección salieron y qué conclusión dio cada actividad;</li>
        <li>de un punto pulsado en el mapa, la casilla de aproximadamente un kilómetro en la que cae;</li>
        <li>de una consulta por GPS, solo si el resultado fue dentro, fuera o dudoso: <strong>nunca la posición</strong>;</li>
        <li>de una entrada, el nombre del sitio desde el que llegaste (por ejemplo, <code>www.google.com</code>), sin la dirección completa.</li>
      </ul>
      <p>No usa cookies, no guarda tu dirección IP y no lleva ningún identificador: no permite saber quién eres ni relacionar una consulta con otra. Los recuentos se conservan tres meses.</p>

      <h3>Estadísticas de visitas sin cookies</h3>
      <p>La web usa Cloudflare Web Analytics, que cuenta visitas, país y tipo de dispositivo de forma agregada, sin cookies y sin seguirte de una web a otra.</p>

      <h3>Google Analytics, solo si lo aceptas</h3>
      <p>Si pulsas «Aceptar» en el aviso de cookies, se carga Google Analytics 4 para medir cuánta gente usa el mapa y cómo llega a él. Recoge las páginas que ves, datos de tu navegador y dispositivo y tu ubicación aproximada a partir de la dirección IP, y guarda un identificador en las cookies que se detallan más abajo. Si pulsas «Rechazar», o no contestas, no se carga.</p>
      <p>La base legal es tu consentimiento, que puedes retirar cuando quieras. Los datos se conservan el plazo configurado en Google Analytics, catorce meses como máximo.</p>

      <h3>Datos técnicos de la conexión</h3>
      <p>Como cualquier web, al abrirla tu navegador envía tu dirección IP y sus datos técnicos al servidor que la aloja, Cloudflare, que los usa para servir las páginas y protegerlas de ataques. La base legal es el interés legítimo en que la web funcione y sea segura.</p>

      <h3>Si nos escribes</h3>
      <p>Tu dirección de correo y lo que cuentes se usan solo para contestarte.</p>

      <h2 id="cookies">Cookies</h2>
      <ul>
        <li><code>idioma</code> — propia, 1 año. Recuerda el idioma que has elegido.</li>
        <li><code>orden-actividades</code> — propia, 1 año. Recuerda el orden en que has colocado las actividades.</li>
        <li><code>consentimiento-analitica</code> — propia, 1 año. Recuerda si aceptaste o rechazaste la cookie de análisis, para no volver a preguntar.</li>
        <li><code>_ga</code> y <code>${esc(COOKIE_GA)}</code> — de Google, hasta 2 años. Análisis de uso. <strong>Solo si aceptas.</strong></li>
      </ul>
      <p>Las tres primeras guardan preferencias que eliges tú y no necesitan consentimiento. Las de Google Analytics sí, y por eso solo se instalan si aceptas.</p>
      <p><strong>Para cambiar tu elección</strong>, abre <a href="/#cookies">las preferencias de cookies</a>, o pulsa «Preferencias de cookies» dentro de «Qué es este mapa». Si rechazas después de haber aceptado, la web deja de cargar Google Analytics y borra <code>${esc(COOKIE_GA)}</code>. La cookie <code>_ga</code> es común con pecesmediterraneo.com, que tiene su propio aviso: se gestiona desde allí o borrándola en tu navegador.</p>

      <h2>Quién más interviene</h2>
      <ul>
        <li><strong>Cloudflare, Inc.</strong> aloja la web y presta las estadísticas sin cookies y el contador. <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener noreferrer">Su política de privacidad</a>.</li>
        <li><strong>Google Ireland Limited</strong> presta Google Analytics, solo si lo aceptas. <a href="https://policies.google.com/privacy" rel="noopener noreferrer">Su política de privacidad</a>.</li>
        <li><strong>Los proveedores de los mapas de fondo.</strong> Las imágenes del mapa las pide tu navegador directamente a quien las publica, que por tanto ve tu dirección IP: Esri para la imagen de satélite, y el Govern de les Illes Balears (IDEIB), OpenStreetMap y OpenSeaMap si activas sus capas.</li>
      </ul>
      <p>Cloudflare y Google pueden tratar datos en Estados Unidos. Ambas declaran estar adheridas al Marco de Privacidad de Datos UE-EE. UU.</p>
      <p>No se venden datos ni se ceden a nadie más, salvo obligación legal.</p>

      <h2>Tus derechos</h2>
      <p>Puedes pedir el acceso a tus datos, su rectificación o supresión, la limitación u oposición a su tratamiento y su portabilidad, y retirar el consentimiento que hayas dado, escribiendo a ${correo}. Ten en cuenta que el contador y las estadísticas sin cookies no guardan nada que permita identificarte, así que sobre esos datos no hay forma de localizar los tuyos.</p>
      <p>Si crees que tus datos no se tratan correctamente, puedes reclamar ante la <a href="https://www.aepd.es/" rel="noopener noreferrer">Agencia Española de Protección de Datos</a>.</p>

      <h2>Cambios en esta política</h2>
      <p>Si cambia lo que se mide o se añade una cookie, este texto se actualiza a la vez y cambia la fecha de revisión de abajo.</p>`,
  });
}

/** Ruta publicada -> HTML. El plugin de `vite.config.js` las emite todas. */
export const PAGINAS_LEGALES = {
  [RUTA_AVISO]: avisoLegal,
  [RUTA_PRIVACIDAD]: politicaPrivacidad,
};
