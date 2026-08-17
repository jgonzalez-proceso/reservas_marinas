/**
 * Envoltorio mínimo sobre `document.cookie`, sin dependencias.
 */

export function leeCookie(nombre) {
  const clave = `${nombre}=`;
  for (const parte of document.cookie.split('; ')) {
    if (parte.startsWith(clave)) {
      // decodeURIComponent lanza URIError ante un % malformado, y una cookie
      // puede venir escrita por otra vía (extensión, versión antigua). Una
      // preferencia ilegible es una preferencia ausente; sin este catch, la
      // excepción subía por leeOrdenActividades hasta main() y la aplicación
      // entera dejaba de montar por un dato de comodidad.
      try {
        return decodeURIComponent(parte.slice(clave.length));
      } catch {
        return null;
      }
    }
  }
  return null;
}

/** Un año de vigencia: es una preferencia de interfaz, no una sesión. */
export function escribeCookie(nombre, valor, diasExpiracion = 365) {
  const expira = new Date();
  expira.setDate(expira.getDate() + diasExpiracion);
  document.cookie = `${nombre}=${encodeURIComponent(valor)}; expires=${expira.toUTCString()}; path=/; SameSite=Lax`;
}
