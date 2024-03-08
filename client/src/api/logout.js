import { API, TOKEN_NAME } from '../constants';
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza la solicitud de cierre de sesión para un usuario autenticado.
 *
 * @returns {Promise<Number>} - Código de estado HTTP que indica el resultado de la solicitud de cierre de sesión.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function logout() {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud POST para cerrar la sesión del usuario
    const response = await fetch(API + '/logout', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    // Obtiene el código de estado HTTP de la respuesta
    const status = response.status;

    // Retorna el código de estado HTTP
    return status;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
