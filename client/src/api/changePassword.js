import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Cambia la contraseña del usuario identificado por su ID.
 *
 * @param {number} userId - ID del usuario cuya contraseña se desea cambiar.
 * @param {string} currentPassword - Contraseña actual del usuario.
 * @param {string} newPassword - Nueva contraseña que se desea establecer.
 * @returns {Promise<Object>} - Promesa que se resuelve con los datos de la respuesta del servidor.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud.
 */
export async function changePassword(userId, currentPassword, newPassword) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza la solicitud para cambiar la contraseña del usuario
    const response = await fetch(API + `/users/update/password/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ currentPassword, newPassword })
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
