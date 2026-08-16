/**
 * Reserva Marina de la Badia de Palma.
 *
 * Contenido transcrito de la regulación de actividades publicada por el Govern
 * y de los trámites de la Seu Electrònica. La norma de creación es la Orden de
 * 1 de septiembre de 2006 (BOIB núm. 128).
 *
 * La reserva tiene dos zonas: el perímetro general y una zona de protección
 * especial al sur de Cap Enderrocat, que es el núcleo de la reserva.
 */

import { permiso } from '../schema.js';
import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';

const NORMAS = [
  {
    titulo:
      'Orden de 1 de septiembre de 2006 por la que se regulan las actividades a desarrollar en la reserva marina de la Bahía de Palma',
    fecha: '2006-09-01',
    url: 'https://www.caib.es/sites/reservesmarines/es/l/normativa_basica_-_reserva_marina_de_la_badia_de_palma-237/',
    tipo: 'creacion',
  },
  {
    titulo: 'Decret 41/2015, d’activitats d’extracció de flora o fauna marina i activitats subaquàtiques',
    fecha: null,
    url: 'https://www.caib.es/sites/reservesmarines/es/normativa_general_en_las_reservas_marinas/',
    tipo: 'general',
  },
];

const AUTORIZACION_EMBARCACION = permiso({
  importe: 0,
  nota: 'Gratuita. Exige disponer de licencia de pesca recreativa de embarcación en vigor.',
  vigencia: '3 años',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/3691781',
  ultimaVerificacion: '2026-08-15',
});

const AUTORIZACION_SUBMARINA = permiso({
  importe: 53.9,
  nota: 'Tasa por cada reserva marina.',
  vigencia: 'Consultar en el trámite',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/1683027/',
  ultimaVerificacion: '2026-08-15',
});

// Art. 9.1 de la Orden de 2006: el buceo con escafandra fuera del área de
// protección especial SÍ requiere permiso individual (nominal) o colectivo
// (centros de buceo, validez de un año natural) que entrega la Dirección
// General de Pesca. La ficha lo tenía antes como `allowed` sin autorización,
// que era un error: el texto íntegro de la orden confirma que sí hace falta.
const PERMISO_BUCEO_ESCAFANDRA = permiso({
  importe: 52.82,
  nota: 'Autorización anual individual, que habilita también el resto de reservas marinas de Mallorca, salvo las boyas de las zonas especiales de buceo del Toro y les Malgrats. Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Buceo colectivo (centros de buceo o clubes de inmersión): permiso con validez de un año natural, del 1 de enero al 31 de diciembre. Buceo individual (al margen de centros, sin ánimo de lucro): permiso nominal con la validez que fije la Dirección General de Pesca.',
  vigencia: '1 año (hay también diaria y quincenal). El permiso colectivo va por año natural, del 1 de enero al 31 de diciembre.',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/1139905',
  ultimaVerificacion: '2026-08-16',
});

export default [
  {
    zoneId: 'rm-reserva-marina-de-la-badia-de-palma--reserva-marina--autonomica',
    nombreCorto: 'Reserva Marina de la Badia de Palma',
    resumen:
      'Perímetro general de la reserva. La pesca recreativa está permitida solo determinados días de la semana y requiere autorización cuando se practica desde embarcación.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'restricted',
        motivo: 'Permitida solo martes, viernes, sábados, domingos y festivos.',
        conditions: ['Días hábiles: martes, viernes, sábados, domingos y festivos.'],
        schedule: { dias: ['martes', 'viernes', 'sábado', 'domingo', 'festivos'] },
        sources: ['caib-regulacion-palma', 'boib-orden-2006-palma'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida martes, viernes, sábados, domingos y festivos, con autorización trienal. La pesca con potera y la fluixa se puede practicar cada día.',
        conditions: [
          'Días hábiles: martes, viernes, sábados, domingos y festivos.',
          'La pesca con potera y la fluixa se puede practicar cada día.',
          'Requiere licencia de pesca recreativa de embarcación en vigor.',
        ],
        schedule: { dias: ['martes', 'viernes', 'sábado', 'domingo', 'festivos'] },
        permit: AUTORIZACION_EMBARCACION,
        sources: ['caib-regulacion-palma', 'tramite-autorizacion-embarcacion'],
      },
      pescaSubmarina: {
        status: 'allowed_with_authorization',
        motivo:
          'Permitida lunes, martes, sábados, domingos y festivos, con autorización específica sujeta a tasa.',
        conditions: ['Días hábiles: lunes, martes, sábados, domingos y festivos.'],
        schedule: { dias: ['lunes', 'martes', 'sábado', 'domingo', 'festivos'] },
        permit: AUTORIZACION_SUBMARINA,
        sources: ['caib-regulacion-palma', 'tramite-autorizacion-submarina'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El buceo con escafandra autónoma está permitido fuera del área de protección especial, pero requiere permiso individual o colectivo de la Dirección General de Pesca. Las inmersiones en apnea son libres en toda la reserva.',
        conditions: [
          'Las inmersiones en apnea son libres en toda la reserva marina.',
          'Prohibido llevar, en la inmersión o en la embarcación, cualquier instrumento utilizable para la pesca o la extracción de especies marinas, salvo el cuchillo de seguridad.',
          'Las inmersiones nocturnas requieren una autorización especial adicional de la Dirección General de Pesca.',
          'Prohibido en el área de protección especial.',
        ],
        permit: PERMISO_BUCEO_ESCAFANDRA,
        sources: ['caib-regulacion-palma', 'boib-orden-2006-palma', 'tramite-autorizacion-buceo'],
      },
      fondeo: fondeoPorPosidoniaGeneral(),
      navegacion: {
        status: 'not_regulated',
        motivo:
          'La Orden de 2006 regula pesca, extracción y buceo, pero no establece ninguna limitación específica de navegación para esta reserva. Se aplica la normativa general de navegación.',
        sources: ['boib-orden-2006-palma'],
      },
    },
  },

  {
    zoneId: 'rm-reserva-marina-de-la-badia-de-palma--zona-de-proteccio-especial--autonomica',
    nombreCorto: 'Badia de Palma — zona de protección especial',
    resumen:
      'Núcleo de la reserva, al sur de Cap Enderrocat. Es la zona de mayor restricción: ni pesca ni buceo con escafandra.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo: 'La pesca recreativa no está permitida en el área de protección especial.',
        sources: ['caib-regulacion-palma', 'boib-orden-2006-palma'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo: 'La pesca recreativa no está permitida en el área de protección especial.',
        sources: ['caib-regulacion-palma', 'boib-orden-2006-palma'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo: 'La pesca submarina no está permitida en el área de protección especial.',
        sources: ['caib-regulacion-palma', 'boib-orden-2006-palma'],
      },
      buceo: {
        status: 'prohibited',
        motivo:
          'El art. 2 de la Orden de 2006 prohíbe el buceo con escafandra autónoma dentro del área de protección especial. Es la excepción al régimen general de la reserva, donde el buceo sí se puede practicar con permiso.',
        sources: ['caib-regulacion-palma', 'boib-orden-2006-palma'],
      },
      fondeo: {
        status: 'restricted',
        motivo:
          'El art. 2 de la Orden de 2006 prohíbe expresamente el fondeo de embarcaciones sobre las fanerógamas marinas dentro del área de protección especial. El Real Decreto 191/2026 refuerza esa misma prohibición con carácter general en todo el Mediterráneo español.',
        conditions: [
          'Prohibido fondear sobre las fanerógamas marinas del área de protección especial.',
          'Prohibido también en zonas de arena próximas si la cadena, el ancla u otros elementos del fondeo afectan a la pradera (RD 191/2026).',
          'Solo se permite fondear sobre esas praderas con sistemas de bajo impacto debidamente autorizados.',
        ],
        sources: ['boib-orden-2006-palma', 'boe-rd-191-2026'],
      },
      navegacion: {
        status: 'not_regulated',
        motivo:
          'El art. 2 de la Orden de 2006 prohíbe pesca, extracción, buceo con escafandra y el fondeo sobre fanerógamas dentro del área de protección especial, pero no menciona la navegación.',
        sources: ['boib-orden-2006-palma'],
      },
    },
  },
];
