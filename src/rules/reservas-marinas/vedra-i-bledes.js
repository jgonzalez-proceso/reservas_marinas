/**
 * Reservas Marinas des Vedrà-Vedranell y de ses Bledes (Eivissa).
 *
 * Van juntas porque las crea una sola norma, el Decreto 25/2023, que las regula
 * en los mismos artículos. Separarlas en dos ficheros habría obligado a copiar
 * el mismo texto legal dos veces.
 *
 * Aquí la construcción «al revés» es especialmente estricta y resuelve dos
 * dudas de golpe. El art. 4.1.a prohíbe «toda clase de pesca marítima y de
 * extracción de flora y fauna marinas» y el 4.2 solo exceptúa tres cosas:
 * artes menores profesionales, pesca y marisqueo recreativos **desde
 * embarcación o artefactos flotantes**, y muestreo científico autorizado.
 *
 *   - La pesca submarina no está entre las excepciones -> prohibida.
 *   - La pesca recreativa desde tierra tampoco -> prohibida. Y el art. 6.1 lo
 *     dice además de forma expresa: «Queda prohibida la pesca recreativa desde
 *     cualquiera de los islotes».
 *
 * Las dos zonas de especial protección se declaran por el mismo motivo —las
 * colonias de gorgonias— pero NO tienen el mismo régimen, y conviene no
 * confundirlas:
 *
 *   ses Bledes (na Bosc, es Vaixell, na Gorra)   art. 2.2: prohibida toda pesca
 *       salvo la profesional con volantín, potera y curricán -> la pesca
 *       recreativa queda prohibida.
 *   Vedrà (punta de na Bruta)                    art. 3.2: solo se prohíbe el
 *       calado de trasmallos, que es arte profesional -> para el pescador
 *       recreativo y el buceador rige el régimen general de la reserva, que
 *       hereda.
 */

import { permiso } from '../schema.js';
import { fondeoPorPosidoniaGeneral } from '../normas-generales.js';

const NORMA_CREACION = {
  titulo:
    'Decreto 25/2023, de 2 de mayo, por el que se establecen las Reservas Marinas de ses Bledes y des Vedrà-Vedranell y se regulan las actividades de extracción de flora y fauna marina y las actividades subacuáticas, y se modifican el Decreto 34/2014 y el Decreto 17/2003',
  fecha: '2023-05-02',
  url: 'https://www.caib.es/eboibfront/pdf/es/2023/57/1135574',
  tipo: 'creacion',
};

const NORMA_41_2015 = {
  titulo:
    'Decret 41/2015, de 22 de maig, d’activitats d’extracció de flora o fauna marina i activitats subaquàtiques a les reserves marines',
  fecha: '2015-05-22',
  url: 'https://www.caib.es/eboibfront/eli/es-ib/d/2015/05/22/41/dof/spa/pdf',
  tipo: 'general',
};

const NORMA_PITIUSES = {
  titulo:
    'Decreto 15/2022, de 16 de mayo, por el que se establece un Plan de Gestión para la Pesca Profesional Artesanal en las Aguas Interiores de las islas Pitiusas',
  fecha: '2022-05-16',
  url: 'https://www.caib.es/eboibfront/pdf/es/2022/65/1111460',
  tipo: 'general',
};

const NORMAS = [NORMA_CREACION, NORMA_41_2015, NORMA_PITIUSES];

const VEDRA = 'rm-reserva-marina-es-vedra-vedranell--reserva-marina--autonomica';
const BLEDES = 'rm-reserva-marina-de-ses-bledes--reserva-marina--autonomica';

const AUTORIZACION_EMBARCACION = permiso({
  importe: 0,
  nota: 'Gratuita. Licencia específica que la Dirección General de Pesca entrega o renueva cada tres años (art. 6.2). Obliga a llevar registro de capturas.',
  vigencia: '3 años',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/3691781',
  ultimaVerificacion: '2026-08-15',
});

const PERMISO_BUCEO = permiso({
  importe: 52.82,
  nota: 'Autorización anual individual, que habilita también el resto de reservas marinas de Eivissa (Freus i Tagomago). Para estancias cortas hay autorización diaria (5,24 €) y quincenal (10,47 €). Permiso individual o colectivo; el colectivo solo para centros y clubes de buceo. La consejería puede fijar por orden un número máximo de autorizaciones por reserva o por zonas.',
  vigencia: '1 año (hay también diaria y quincenal)',
  url: 'https://www.caib.es/seucaib/es/tramites/tramite/1139905',
  ultimaVerificacion: '2026-08-16',
});

const SIN_INSTRUMENTOS =
  'Los buceadores, con escafandra o en apnea, no pueden llevar ni en la inmersión ni en la ' +
  'embarcación ningún instrumento utilizable para pescar o extraer especies marinas, salvo el ' +
  'cuchillo de seguridad (art. 9.2 del Decret 41/2015).';

const MOTIVO_DESDE_COSTA =
  'El art. 4.2.b del Decreto 25/2023 solo exceptúa de la prohibición general la pesca y el ' +
  'marisqueo recreativos «desde embarcación o artefactos flotantes»; la pesca desde tierra queda ' +
  'fuera de esa excepción. El art. 6.1 lo confirma expresamente: «Queda prohibida la pesca ' +
  'recreativa desde cualquiera de los islotes».';

const MOTIVO_SUBMARINA =
  'El art. 4.1.a del Decreto 25/2023 prohíbe toda clase de pesca marítima y de extracción de flora ' +
  'y fauna marinas, y el 4.2 solo exceptúa las artes menores profesionales, la pesca recreativa ' +
  'desde embarcación o artefactos flotantes y el muestreo científico autorizado. La modalidad ' +
  'submarina no está entre las excepciones.';

/** Régimen común de los dos perímetros generales. */
function regimenGeneral(fuentePagina) {
  const fuentes = ['boib-decreto-25-2023-vedra-bledes', fuentePagina];
  return {
    pescaDesdeCosta: {
      status: 'prohibited',
      motivo: MOTIVO_DESDE_COSTA,
      sources: fuentes,
    },
    pescaRecreativaEmbarcacion: {
      status: 'allowed_with_authorization',
      motivo:
        'Es una de las tres excepciones tasadas del art. 4.2: la pesca y el marisqueo recreativos ' +
        'desde embarcación o artefactos flotantes, con licencia específica trienal y solo con los ' +
        'aparejos previstos.',
      conditions: [
        'Caña o volantín: máximo una línea por pescador y cuatro anzuelos, de más de 7 mm de seno y ' +
          'más de 5,7 mm para el raor.',
        'Potera: máximo una línea con dos poteras por pescador.',
        'Curricán de superficie (fluixa): máximo dos líneas por embarcación.',
        'Curricán de fondo: máximo una línea por embarcación.',
        'Spinning permitido.',
        'Prohibido en todo caso usar peces o cefalópodos vivos como cebo.',
        'Obligatorio llevar registro de capturas; no presentarlo comporta la pérdida de la licencia.',
      ],
      permit: AUTORIZACION_EMBARCACION,
      sources: [...fuentes, 'tramite-autorizacion-embarcacion', 'tramite-autorizacion-buceo'],
    },
    pescaSubmarina: {
      status: 'prohibited',
      motivo: MOTIVO_SUBMARINA,
      conditions: [SIN_INSTRUMENTOS],
      sources: [...fuentes, 'decret-41-2015'],
    },
    buceo: {
      status: 'allowed_with_authorization',
      motivo:
        'El art. 7.1 del Decreto 25/2023 remite las actividades subacuáticas al art. 9 del Decret ' +
        '41/2015, que exige autorización específica para el buceo con escafandra autónoma.',
      conditions: [
        'Las inmersiones en apnea son libres en toda la reserva y no necesitan permiso.',
        'Prohibidas las inmersiones nocturnas para el buceo individual con escafandra (art. 7.1).',
        SIN_INSTRUMENTOS,
      ],
      permit: PERMISO_BUCEO,
      sources: [...fuentes, 'decret-41-2015'],
    },
    fondeo: fondeoPorPosidoniaGeneral(['boib-decreto-25-2023-vedra-bledes']),
    navegacion: {
      status: 'not_regulated',
      motivo:
        'El Decreto 25/2023 regula pesca, extracción y actividades subacuáticas, pero no establece ' +
        'límites de navegación dentro de estas reservas.',
      sources: fuentes,
    },
  };
}

export default [
  {
    zoneId: VEDRA,
    nombreCorto: 'Reserva Marina des Vedrà-Vedranell',
    resumen:
      'Reserva del suroeste de Eivissa, alrededor de es Vedrà y es Vedranell. La pesca recreativa ' +
      'solo se permite desde embarcación o artefactos flotantes, con autorización trienal; desde los ' +
      'islotes y en modalidad submarina, prohibida.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: regimenGeneral('caib-regulacion-vedra'),
  },

  {
    zoneId:
      'rm-reserva-marina-es-vedra-vedranell-zona-d-especial-proteccio-es-vedra-punta-de-na-bruta--zona-de-proteccio-especial--autonomica',
    nombreCorto: 'Es Vedrà — zona de especial protección de la punta de na Bruta',
    // NO hereda, aunque a primera vista lo pareciera. La geometría oficial de
    // la reserva tiene recortada la isla de es Vedrà (un agujero de 0,64 km²) y
    // esta zona cae sobre ese recorte: ni un solo punto suyo está dentro del
    // polígono de la reserva. Declarar `heredaDe` aquí lo rechaza
    // `npm run rules:check`, y con razón. Como el motor no verá la reserva
    // general sobre estos puntos, el régimen se escribe entero.
    resumen:
      'Zona de 2 ha declarada para proteger las colonias de gorgonias de la punta de na Bruta. Su ' +
      'única regla propia es profesional —el art. 3.2 prohíbe calar trasmallos—, así que para el ' +
      'pescador recreativo y el buceador rige el mismo régimen que en el resto de la reserva.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: (() => {
      const base = regimenGeneral('caib-regulacion-vedra');
      const nota =
        'Dentro de esta zona está prohibido calar trasmallos (art. 3.2 del Decreto 25/2023). Es un ' +
        'arte profesional: no afecta a la pesca recreativa.';
      for (const clave of ['pescaDesdeCosta', 'pescaRecreativaEmbarcacion', 'pescaSubmarina']) {
        base[clave] = { ...base[clave], conditions: [...(base[clave].conditions ?? []), nota] };
      }
      return base;
    })(),
  },

  {
    zoneId: BLEDES,
    nombreCorto: 'Reserva Marina de ses Bledes',
    resumen:
      'Reserva del oeste de Eivissa. Mismo régimen que es Vedrà: pesca recreativa solo desde ' +
      'embarcación con autorización trienal, prohibida desde los islotes y en modalidad submarina. ' +
      'Contiene además una zona de especial protección donde no se permite ninguna pesca recreativa.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: regimenGeneral('caib-regulacion-bledes'),
  },

  {
    zoneId:
      'rm-reserva-marina-de-ses-bledes-zona-d-especial-proteccio-de-na-bosc-es-vaixell-i-na-gorra--zona-de-proteccio-especial--autonomica',
    nombreCorto: 'Ses Bledes — zona de especial protección de na Bosc, es Vaixell i na Gorra',
    // Tampoco hereda, por lo mismo que la punta de na Bruta: cae sobre el
    // recorte que la geometría de la reserva hace de los islotes. El buceo y el
    // fondeo se escriben aquí porque el motor no verá la reserva general.
    resumen:
      'Zona declarada para proteger las colonias de gorgonias. El art. 2.2 prohíbe aquí toda clase de ' +
      'pesca marítima y de extracción, con la única excepción de la pesca profesional con volantín, ' +
      'potera y curricán: la pesca recreativa no está permitida en ninguna modalidad.',
    normas: NORMAS,
    ultimaRevision: '2026-08-15',
    actividades: {
      pescaDesdeCosta: {
        status: 'prohibited',
        motivo:
          'El art. 2.2 del Decreto 25/2023 prohíbe en esta zona toda clase de pesca marítima y de ' +
          'extracción de flora y fauna marinas, y solo exceptúa la pesca profesional con volantín, ' +
          'potera y curricán, la gestión de los espacios protegidos y las actividades científicas.',
        sources: ['boib-decreto-25-2023-vedra-bledes', 'caib-regulacion-bledes'],
      },
      pescaRecreativaEmbarcacion: {
        status: 'prohibited',
        motivo:
          'El art. 2.2 del Decreto 25/2023 prohíbe en esta zona toda clase de pesca marítima y de ' +
          'extracción de flora y fauna marinas. Las excepciones que enumera son profesionales o ' +
          'científicas, ninguna recreativa; la página oficial lo confirma: «La pesca recreativa no ' +
          'está permitida».',
        sources: ['boib-decreto-25-2023-vedra-bledes', 'caib-regulacion-bledes'],
      },
      pescaSubmarina: {
        status: 'prohibited',
        motivo:
          'El art. 2.2 del Decreto 25/2023 prohíbe en esta zona toda clase de pesca marítima, y la ' +
          'modalidad submarina ya estaba prohibida en el conjunto de la reserva.',
        conditions: [SIN_INSTRUMENTOS],
        sources: ['boib-decreto-25-2023-vedra-bledes', 'decret-41-2015'],
      },
      buceo: {
        status: 'allowed_with_authorization',
        motivo:
          'El art. 2.2 del Decreto 25/2023 restringe aquí la pesca y la extracción, no las actividades ' +
          'subacuáticas: para el buceo rige el art. 7, común a toda la reserva, que exige autorización ' +
          'para la escafandra autónoma.',
        conditions: [
          'Las inmersiones en apnea son libres y no necesitan permiso.',
          'Prohibidas las inmersiones nocturnas para el buceo individual con escafandra (art. 7.1).',
          SIN_INSTRUMENTOS,
        ],
        permit: PERMISO_BUCEO,
        sources: ['boib-decreto-25-2023-vedra-bledes', 'caib-regulacion-bledes', 'decret-41-2015', 'tramite-autorizacion-buceo'],
      },
      fondeo: fondeoPorPosidoniaGeneral(['boib-decreto-25-2023-vedra-bledes']),
      navegacion: {
        status: 'not_regulated',
        motivo:
          'El art. 2.2 del Decreto 25/2023 regula la pesca y la extracción en esta zona, y el decreto ' +
          'no establece límites de navegación en ninguna de las dos reservas.',
        sources: ['boib-decreto-25-2023-vedra-bledes'],
      },
    },
  },
];
