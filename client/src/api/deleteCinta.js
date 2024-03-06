import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Elimina una cinta identificada por su ID.
 *
 * @param {number} id - ID de la cinta que se desea eliminar.
 * @returns {Promise<number>} - Promesa que se resuelve con el estado de la respuesta del servidor.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud.
 */
export async function deleteCinta(id) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza la solicitud para eliminar la cinta
    const response = await fetch(API + `/cintas/delete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ id: 3, state: 'Eliminado' })
    });

    // Retorna el estado de la respuesta del servidor
    return response.status;
  } catch (error) {
    // En caso de fallo, lanza un error
    throw new Error(error);
  }
}
