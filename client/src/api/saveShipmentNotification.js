import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza la solicitud para guardar una notificación de envío en el servidor.
 *
 * @param {Object} dataNotification - Información de la notificación de envío que se va a guardar.
 * @returns {Object} - Objeto JSON que contiene la información de la notificación de envío guardada.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function saveShipmentNotification({ dataNotification }) {
  const token = getCookieValue(TOKEN_NAME);

  // Obtiene la fecha actual en formato ISO
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  const isoDateString = date.toISOString();

  try {
    // Realiza una solicitud POST para guardar una notificación de envío
    const response = await fetch(API+'/shipments/notifications/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        shipment: dataNotification.shipment,
        message: dataNotification.message,
        date: isoDateString
      })
    });

    // Parsea la respuesta del servidor como JSON
    const data = await response.json();

    // Retorna el objeto JSON con la información de la notificación de envío guardada
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
