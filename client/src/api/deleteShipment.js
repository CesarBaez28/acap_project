import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from "../utils/getCookieValue";

/**
 * Elimina un envío según su identificador.
 *
 * @param {string} shipmentId - Identificador único del envío a eliminar.
 * @returns {Promise<number>} - Promesa que se resuelve con el código de estado de la respuesta del servidor.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud.
 */
export async function deleteShipment(shipmentId) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza la solicitud para eliminar el envío por su identificador
    const response = await fetch(API + `/shipments/deleteById/${shipmentId}`, {
      method: "DELETE",
      headers: { 'Authorization': 'Bearer ' + token }
    });

    // Obtiene y devuelve el código de estado de la respuesta del servidor
    const data = response.status;
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error
    throw new Error(error);
  }
}
