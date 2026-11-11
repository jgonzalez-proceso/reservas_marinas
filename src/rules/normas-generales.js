/**
 * Normas de aplicación general, no específicas de ninguna reserva.
 *
 * Se centralizan aquí para no repetir el mismo texto largo en cada fichero de
 * reserva y para que una corrección futura (p. ej. si el RD 191/2026 se
 * modifica) se haga en un solo sitio.
 */

export const NORMA_RD_191_2026 = {
  titulo:
    'Real Decreto 191/2026, de 11 de marzo, para la conservación de praderas de fanerógamas marinas en aguas marinas del Mediterráneo español',
  fecha: '2026-03-11',
  url: 'https://www.boe.es/buscar/doc.php?id=BOE-A-2026-5877',
  tipo: 'general',
};

/**
 * Restricción de fondeo por el RD 191/2026, para zonas cuya propia norma de
 * reserva no añade una prohibición de fondeo más específica.
 *
 * No es una prohibición total de fondear: prohíbe fondear SOBRE las praderas
 * de Posidonia oceanica y Cymodocea nodosa, y también en arena si la cadena,
 * el ancla u otro elemento del fondeo afecta a la pradera. Por eso el estado
 * es `restricted`, no `prohibited` — fondear en arena limpia sigue siendo
 * posible.
 *
 * No requiere haber cartografiado la posidonia de este punto exacto: es una
 * prohibición legal de ámbito nacional, aplicable con independencia de que se
 * conozca o no la geometría de la pradera más cercana.
 */
/**
 * Las condiciones de la prohibición general, exportadas aparte.
 *
 * Existen como constante porque la regla genérica CEDE ante cualquier regla que
 * una figura haya escrito sobre el fondeo de su trozo de mar, y al ceder
 * desaparece entera. Eso es correcto cuando la regla del sitio ya dice lo de la
 * posidonia con sus propias palabras, que es lo habitual. No lo es cuando la
 * regla del sitio habla de otra cosa: en el Ponent de Mallorca la norma de la
 * reserva solo regula el fondeo junto a los cinco puntos de artes de parada, y
 * durante meses el panel contestó al fondeo en toda la reserva sin mencionar la
 * posidonia. Una ficha con regla propia que no trate las praderas tiene que
 * sumar estas condiciones, y `npm test` comprueba que ninguna se quede sin
 * ellas.
 *
 * Redacción ceñida al art. 5 del Real Decreto, leído íntegro el 2026-11-11:
 *
 *  - Lo afectado por el borneo son las praderas, no los elementos del fondeo
 *    (art. 5.1). La redacción anterior lo decía al revés.
 *  - El decreto habla de «boyas unitarias o campos de boyas» (art. 5.2); «boyas
 *    ecológicas» es un nombre comercial, no el de la norma.
 *  - La excepción de seguridad alcanza a la vida humana en el mar «o de la
 *    navegación» (art. 5.3.a), y lo que debe estar autorizado son los trabajos.
 *  - Ni este decreto ni el Decret 25/2018 distinguen por eslora. Se dice porque
 *    en el puerto circula lo contrario.
 *
 * Del Decret balear 25/2018 solo se cita lo que sigue en pie: el TSJIB anuló
 * sus arts. 7.3, 7.4 y 13.1 (sentencia 248/21, BOIB núm. 125 de 11-09-2021). La
 * regla de la cadena sobre pradera cercana ya no descansa en él sino en el
 * art. 5.1 del Real Decreto.
 *
 * Zonas de baño: el art. 73 del Reglamento General de Costas prohíbe usar
 * embarcaciones dentro de las BALIZADAS. En la franja sin balizar —200 m en
 * playas, 50 m en el resto— solo limita la velocidad a tres nudos. Escribir que
 * no se puede fondear a menos de 200 m de una playa sin balizar sería inventar
 * una prohibición que ese artículo no contiene.
 */
export const CONDICIONES_FONDEO_POSIDONIA = [
  'Prohibido fondear sobre praderas de Posidonia oceanica y de Cymodocea nodosa.',
  'Prohibido también en zonas de arena próximas si la cadena u otros elementos del fondeo quedan sobre la pradera o esta resulta afectada por el borneo.',
  'Sobre esas praderas solo se puede amarrar a sistemas de bajo impacto autorizados: boyas unitarias o campos de boyas. Donde hay un campo de boyas se amarra a la boya y nunca se fondea directamente sobre la pradera.',
  'La prohibición no depende de la eslora: ni el Real Decreto 191/2026 ni el Decret 25/2018 fijan un tamaño mínimo de embarcación.',
  'Excepciones: fuerza mayor o peligro para la seguridad de la vida humana en el mar o de la navegación, y trabajos científicos, de gestión, arqueológicos o de reparación de instalaciones preexistentes que estén autorizados.',
];

export const CONDICION_ZONAS_DE_BANO =
  'No se puede fondear dentro de una zona de baño balizada: el art. 73.1 del Reglamento General de Costas prohíbe allí la navegación de recreo y el uso de cualquier embarcación a vela o motor. Donde no hay balizamiento, la franja de 200 m frente a las playas y de 50 m en el resto de la costa se navega a tres nudos como máximo.';

/** Fuentes que sostienen las condiciones anteriores. */
export const FUENTES_FONDEO_GENERAL = [
  'boe-rd-191-2026',
  'boib-decret-25-2018-posidonia',
  'boe-rd-876-2014-costas',
];

export function fondeoPorPosidoniaGeneral(sourcesExtra = []) {
  return {
    status: 'restricted',
    // Esta regla no es de ninguna figura: es la norma estatal, que rige en todo
    // el Mediterráneo español. `generica` se lo dice al motor para que no
    // desplace a la regla de una figura que sí ha escrito algo sobre el fondeo
    // de ese trozo de mar concreto.
    generica: true,
    motivo:
      'El Real Decreto 191/2026 prohíbe con carácter general fondear sobre praderas de Posidonia oceanica y de Cymodocea nodosa en todo el Mediterráneo español, también en arena si la cadena queda sobre la pradera o el borneo la alcanza. En aguas de competencia balear lo prohíbe además el art. 7.1 del Decret 25/2018.',
    conditions: [...CONDICIONES_FONDEO_POSIDONIA, CONDICION_ZONAS_DE_BANO],
    sources: [...new Set([...FUENTES_FONDEO_GENERAL, ...sourcesExtra])],
  };
}
