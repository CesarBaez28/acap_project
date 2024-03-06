import { API, TOKEN_NAME } from '../constants'
import { getCookieValue } from '../utils/getCookieValue'

/**
 * Actualiza la ubicación de las cintas en el servidor.
 *
 * @param {Array} cintas - Lista de objetos que representan las cintas a actualizar.
 * @param {Object} location - Objeto que contiene la información de la nueva ubicación.
 *                             Debe tener propiedades 'value' y 'label'.
 * @returns {Promise<number>} - Promesa que se resuelve con el estado de la respuesta de la solicitud.
 *                             Puede ser el código de estado HTTP.
 * @throws {Error} - Se lanza si hay algún error durante la solicitud.
 */
export async function updateCintasLocation(cintas, location) {
  // Obtiene el valor del token de la cookie utilizando la función getCookieValue
  const token = getCookieValue(TOKEN_NAME);

  // Extrae los IDs de las cintas para incluirlos en la solicitud
  const ids = cintas.map(({ id }) => id);

  try {
    // Realiza una solicitud PUT al endpoint '/cintas/changeLocations' en la API
    const response = await fetch(`${API}/cintas/changeLocations`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      // Convierte los IDs y la información de la nueva ubicación a formato JSON y lo incluye en el cuerpo de la solicitud
      body: JSON.stringify({ ids: ids, location: { id: location.value, location: location.label } })
    });

    // Obtiene el código de estado de la respuesta
    const status = response.status;

    // Devuelve el código de estado
    return status;
  } catch (error) {
    // Si hay un error durante la solicitud, lanza una excepción con el mensaje de error
    throw new Error(error);
  }
}
