import { API, TOKEN_NAME } from "../constants";
import { formatDateDataShipmentsReceived } from "../utils/formatDateData";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Obtiene los envíos recibidos en un rango de fechas desde el servidor y formatea los datos de fechas.
 *
 * @param {string} startDate - Fecha de inicio del rango (formato: 'YYYY-MM-DD').
 * @param {string} endDate - Fecha de fin del rango (formato: 'YYYY-MM-DD').
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de los datos.
 * @returns {Array} - Lista de envíos recibidos en el rango de fechas con datos de fecha formateados.
 */
export async function getReceivedShipmentsBetweenDate(startDate, endDate) {
  const token = getCookieValue(TOKEN_NAME);

  // Formatea las fechas para incluir la hora de inicio y fin del día respectivamente
  startDate = new Date(startDate).toISOString().replace(/T.*$/, 'T00:00:00');
  endDate = new Date(endDate).toISOString().replace(/T.*$/, 'T23:59:59');
  
  try {
    // Realiza una solicitud GET para obtener los envíos recibidos en el rango de fechas
    const response = await fetch(API + `/receiveCintas/findByDateReceived/${startDate}/${endDate}`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Parsea los datos de la respuesta como JSON
      const data = await response.json();
      // Formatea los datos de fechas utilizando la función formatDateDataShipmentsReceived
      const formattedData = formatDateDataShipmentsReceived(data);
      // Retorna la lista de envíos recibidos con datos de fecha formateados
      return formattedData;
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error al obtener los envíos recibidos: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
