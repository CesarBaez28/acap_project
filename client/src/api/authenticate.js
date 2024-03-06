import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from "../utils/getCookieValue";

/**
 * Autentica al usuario utilizando el número de empleado y la contraseña proporcionados.
 *
 * @param {string} employeeNumber - Número de empleado del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<Object>} - Promesa que se resuelve con los datos de la respuesta del servidor.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud.
 */
export async function authenticate(employeeNumber, password) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza la solicitud de autenticación al servidor
    const response = await fetch(API + '/authenticate', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ username: employeeNumber, password })
    });

    // Parsea los datos de la respuesta
    const data = await response.json();

    // Retorna los datos de la respuesta
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error
    throw new Error(error);
  }
}
