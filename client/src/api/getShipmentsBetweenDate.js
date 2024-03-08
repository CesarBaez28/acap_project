import { API, TOKEN_NAME } from '../constants';
import { formatDateData } from '../utils/formatDateData';
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Obtiene los envíos realizados en un rango de fechas específico.
 *
 * @param {string} startDate - Fecha de inicio del rango en formato ISO (por ejemplo, '2022-03-01T00:00:00').
 * @param {string} endDate - Fecha de fin del rango en formato ISO (por ejemplo, '2022-03-31T23:59:59').
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de los datos.
 * @returns {Promise<Array>} - Lista de envíos realizados en el rango de fechas especificado.
 */
export async function getShipmentsBetweenDate(startDate, endDate) {
  const token = getCookieValue(TOKEN_NAME);

  // Formatea las fechas de inicio y fin para tener la hora '00:00:00' y '23:59:59', respectivamente
  startDate = new Date(startDate).toISOString().replace(/T.*$/, 'T00:00:00');
  endDate = new Date(endDate).toISOString().replace(/T.*$/, 'T23:59:59');

  try {
    // Realiza una solicitud GET para obtener los envíos en el rango de fechas especificado
    const response = await fetch(API + `/shipments/findByDateBetween/${startDate}/${endDate}`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Parsea los datos de la respuesta como JSON y los formatea utilizando la función formatDateData
      const data = await response.json();
      const formattedData = formatDateData(data);
      return formattedData;
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error al obtener los envíos en el rango de fechas: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
