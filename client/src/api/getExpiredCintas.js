import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from "../utils/getCookieValue";

/**
 * Obtiene la información de cintas vencidas para una ubicación específica desde el servidor.
 *
 * @param {string} locationId - ID de la ubicación para la cual se desea obtener las cintas vencidas.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de los datos.
 * @returns {Promise<Array>} - Promesa con la Lista de información de cintas vencidas para la ubicación especificada.
 */
export async function getExpiredCintas(locationId) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);
  // Obtiene la fecha actual en formato ISO y establece la hora a las 00:00:00
  const date = new Date().toISOString().replace(/T.*$/, 'T00:00:00');

  try {
    // Realiza una solicitud GET para obtener la información de cintas vencidas
    const response = await fetch(API + `/cintas/getExpiredCintas/${date}/${locationId}`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Parsea los datos de la respuesta como JSON
      const data = await response.json();
      // Retorna la lista de información de cintas vencidas
      return data;
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error al obtener la información de cintas vencidas: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
