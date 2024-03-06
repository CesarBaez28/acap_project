import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Obtiene la lista de cintas dentro de un rango de fechas desde el servidor.
 *
 * @param {string} initialDate - Fecha inicial del rango (formato: 'YYYY-MM-DD').
 * @param {string} finalDate - Fecha final del rango (formato: 'YYYY-MM-DD').
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de los datos.
 * @returns {Array} - Lista de cintas dentro del rango de fechas especificado.
 */
export async function getCintasWithDates(initialDate, finalDate) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Formatea las fechas al formato ISO y establece la hora a las 00:00:00
  initialDate = new Date(initialDate).toISOString().replace(/T.*$/, 'T00:00:00');
  finalDate = new Date(finalDate).toISOString().replace(/T.*$/, 'T00:00:00');

  try {
    // Realiza una solicitud GET para obtener la lista de cintas en el rango de fechas
    const response = await fetch(API + `/cintas/findByDate?begin=${initialDate}&end=${finalDate}&status=${1}`, {
      method: 'GET',
      headers: {'Authorization' : 'Bearer ' + token}
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Parsea los datos de la respuesta como JSON y los retorna
      const data = await response.json();
      return data;
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error al obtener la lista de cintas en el rango de fechas: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
