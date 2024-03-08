import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Obtiene las cintas retenidas para una ubicación específica y una fecha determinada.
 *
 * @param {string} locationId - Identificador de la ubicación para la cual se obtendrán las cintas retenidas.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de los datos.
 * @returns {Promise<Array>} - Lista de cintas retenidas para la ubicación y fecha especificadas.
 */
export async function getRetainedCintas(locationId) {
  const token = getCookieValue(TOKEN_NAME);
  // Obtiene la fecha actual y formatea la hora para ser '00:00:00'
  const date = new Date().toISOString().replace(/T.*$/, 'T00:00:00');

  try {
    // Realiza una solicitud GET para obtener las cintas retenidas
    const response = await fetch(API + `/cintas/getRetainedCintas/${date}/${locationId}`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Parsea los datos de la respuesta como JSON y los retorna
      const data = await response.json();
      return data;
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error al obtener las cintas retenidas: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
