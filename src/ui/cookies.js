/**
 * Envoltorio mínimo sobre `document.cookie`, sin dependencias.
 */

export function leeCookie(nombre) {
  const clave = `${nombre}=`;
  for (const parte of document.cookie.split('; ')) {
    if (parte.startsWith(clave)) return decodeURIComponent(parte.slice(clave.length));
  }
  return null;
}

/** Un año de vigencia: es una preferencia de interfaz, no una sesión. */
export function escribeCookie(nombre, valor, diasExpiracion = 365) {
  const expira = new Date();
  expira.setDate(expira.getDate() + diasExpiracion);
  document.cookie = `${nombre}=${encodeURIComponent(valor)}; expires=${expira.toUTCString()}; path=/; SameSite=Lax`;
}
