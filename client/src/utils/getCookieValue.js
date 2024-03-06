/**
 * Obtiene el valor de una cookie por su nombre.
 *
 * @param {string} cookieName - Nombre de la cookie de la que se desea obtener el valor.
 * @returns {string|null} - Valor de la cookie o null si no se encuentra.
 */
export function getCookieValue(cookieName) {
  // Divide la cadena de cookies en un array y elimina los espacios en blanco alrededor de cada cookie.
  const cookies = document.cookie.split(';')
    .map(cookie => cookie.trim())
    // Encuentra la cookie que comienza con el nombre especificado.
    .find(cookie => cookie.startsWith(cookieName + '='));

  // Si se encuentra la cookie, devuelve su valor; de lo contrario, devuelve null.
  return cookies ? cookies.split('=')[1] : null;
}
