import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Obtiene los envíos recibidos en una ubicación específica durante un rango de fechas desde el servidor.
 *
 * @param {string} locationId - Identificador de la ubicación para la cual se desean obtener los envíos recibidos.
 * @param {string} begin - Fecha de inicio del rango (formato: 'YYYY-MM-DD').
 * @param {string} end - Fecha de fin del rango (formato: 'YYYY-MM-DD').
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de los datos.
 * @returns {Promise<Array>} - Lista de envíos recibidos en la ubicación y rango de fechas proporcionados.
 */
export async function getReceivedShipmentByLocationAndDate(locationId, begin, end) {
  const token = getCookieValue(TOKEN_NAME);

  // Formatea las fechas para incluir la hora de inicio y fin del día respectivamente
  begin = new Date(begin).toISOString().replace(/T.*$/, 'T00:00:00');
  end = new Date(end).toISOString().replace(/T.*$/, 'T23:59:59');
  
  try {
    // Realiza una solicitud GET para obtener los envíos recibidos en la ubicación y rango de fechas
    const response = await fetch(API + `/receiveCintas/findByLocationToAndBetweenDate/${locationId}/${begin}/${end}`, { 
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Parsea los datos de la respuesta como JSON
      const data = await response.json();
      // Retorna la lista de envíos recibidos en la ubicación y rango de fechas
      return data;
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error al obtener los envíos recibidos: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
