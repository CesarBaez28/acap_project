/**
 * Elimina una cookie específica del navegador.
 *
 * @param {string} cookieName - Nombre de la cookie que se va a eliminar.
 */
export function deleteCookie(cookieName) {
  // Establece la fecha de expiración en el pasado para eliminar la cookie.
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
