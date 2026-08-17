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
export function fondeoPorPosidoniaGeneral(sourcesExtra = []) {
  return {
    status: 'restricted',
    // Esta regla no es de ninguna figura: es la norma estatal, que rige en todo
    // el Mediterráneo español. `generica` se lo dice al motor para que no
    // desplace a la regla de una figura que sí ha escrito algo sobre el fondeo
    // de ese trozo de mar concreto.
    generica: true,
    motivo:
      'El Real Decreto 191/2026 prohíbe con carácter general fondear sobre praderas de Posidonia oceanica y de Cymodocea nodosa en todo el Mediterráneo español, incluido el fondeo en arena si la cadena, el ancla u otro elemento del fondeo afecta a la pradera.',
    conditions: [
      'Prohibido fondear sobre praderas de Posidonia oceanica y de Cymodocea nodosa.',
      'Prohibido también en zonas de arena próximas si la cadena, el ancla u otros elementos del fondeo se sitúan sobre la pradera o resultan afectados por el borneo.',
      'Solo se permite fondear sobre esas praderas con sistemas de bajo impacto debidamente autorizados (boyas ecológicas).',
      'Excepciones: fuerza mayor o peligro para la vida humana, trabajos científicos, de gestión ambiental o arqueológicos autorizados, y reparación de instalaciones preexistentes autorizadas.',
    ],
    sources: ['boe-rd-191-2026', ...sourcesExtra],
  };
}
