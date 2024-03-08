import { API, PENDING_STATUS_ID, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza la solicitud para guardar un envío en el servidor.
 *
 * @param {Object} dataShipment - Información del envío que se va a guardar.
 * @param {Array} cintas - Lista de cintas asociadas al envío.
 * @returns {Promise<Object>} - Objeto JSON que contiene la información del envío guardado.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function saveShipment({ dataShipment, cintas }) {
  const token = getCookieValue(TOKEN_NAME);
  
  // Obtiene la fecha actual en formato ISO
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  const isoDateString = date.toISOString();
  
  // Define el estado del envío como "Pendiente"
  const status = { id: PENDING_STATUS_ID };

  // Mapea las cintas para obtener solo los identificadores
  const cintasData = cintas.map(item => ({ id: item.id }));

  try {
    // Realiza una solicitud POST para guardar un envío
    const response = await fetch(API+'/shipments/save', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json', 
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        shipment: { ...dataShipment, status, date: isoDateString }, 
        cintas: cintasData
      })
    });

    // Parsea la respuesta del servidor como JSON
    const data = await response.json();

    // Retorna el objeto JSON con la información del envío guardado
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
