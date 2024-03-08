import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza una búsqueda de cintas con fechas en el servidor basada en un término de búsqueda y un rango de fechas.
 *
 * @param {string} search - Término de búsqueda para buscar elementos en el servidor.
 * @param {Date} initialDate - Fecha de inicio del rango de búsqueda.
 * @param {Date} finalDate - Fecha de fin del rango de búsqueda.
 * @returns {Promise<Object>} - Objeto JSON que contiene la información de los elementos encontrados.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function searchWithDates(search, initialDate, finalDate) {
  const token = getCookieValue(TOKEN_NAME);

  // Convierte las fechas a formato ISO y ajusta las horas a las 00:00:00
  initialDate = new Date(initialDate).toISOString().replace(/T.*$/, 'T00:00:00');
  finalDate = new Date(finalDate).toISOString().replace(/T.*$/, 'T00:00:00');

  try {
    // Realiza una solicitud GET al servidor para buscar cintas con fechas según el término de búsqueda y el rango de fechas
    const response = await fetch(API + `/cintas/searchWithDates?search=${search}&begin=${initialDate}&end=${finalDate}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    // Parsea la respuesta del servidor como JSON
    const data = await response.json();

    // Retorna el objeto JSON con la información de las cintas encontrados
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
