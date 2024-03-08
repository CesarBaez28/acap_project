import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza la solicitud para remover privilegios de un cargo específico.
 *
 * @param {string} position - Identificador del cargo al que se le van a remover privilegios.
 * @param {string} privileges - Privilegios que se van a remover del cargo.
 * @returns {Promise<Object>} - Objeto JSON que contiene la respuesta de la solicitud.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function removePrivileges(position, privileges) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud POST para remover privilegios de un cargo específico
    const response = await fetch(API + '/privileges/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ position, privileges: [privileges] })
    });

    // Parsea la respuesta JSON de la solicitud
    const data = await response.json();

    // Retorna el objeto JSON de la respuesta
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
