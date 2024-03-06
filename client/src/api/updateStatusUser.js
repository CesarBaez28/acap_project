import { API, TOKEN_NAME } from '../constants'
import { getCookieValue } from '../utils/getCookieValue'

/**
 * Actualiza el estado de un usuario en el servidor.
 *
 * @param {string} id - Identificador único del usuario que se actualizará.
 * @param {string} state - Nuevo estado que se asignará al usuario.
 * @returns {Promise<string>} - Promesa que se resuelve con los datos de la respuesta de la solicitud.
 *                             En este caso, el cuerpo de la respuesta se convierte a texto.
 * @throws {Error} - Se lanza si hay algún error durante la solicitud.
 */
export async function updateStatusUser(id, state) {
  // Obtiene el valor del token de la cookie utilizando la función getCookieValue
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud PUT al endpoint `/users/update/status/${id}/${state}` en la API
    const response = await fetch(`${API}/users/update/status/${id}/${state}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    // Obtiene los datos de la respuesta como texto
    const data = await response.text();

    // Devuelve los datos de la respuesta
    return data;
  } catch (error) {
    // Si hay un error durante la solicitud, lanza una excepción con el mensaje de error
    throw new Error(error);
  }
}
