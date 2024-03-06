import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza la solicitud para guardar información sobre cintas recibidas en el servidor.
 *
 * @param {Object} shipmetData - Datos de la cinta recibida a ser guardados.
 * @returns {Object} - Objeto JSON que contiene la información de la cinta recibida guardada.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function saveCintasReceived({ shipmetData }) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud POST para guardar información sobre cintas recibidas
    const response = await fetch(API+'/receiveCintas/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(shipmetData)
    });

    // Parsea la respuesta del servidor como JSON
    const data = await response.json();

    // Retorna el objeto JSON con la información de la cinta recibida guardada
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
