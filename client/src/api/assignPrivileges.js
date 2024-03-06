import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Asigna privilegios a una posición específica.
 *
 * @param {string} position - Identificador de la posición a la que se asignarán los privilegios.
 * @param {string} privileges - Identificador de los privilegios que se asignarán a la posición.
 * @returns {Promise<Object>} - Promesa que se resuelve con los datos de la respuesta del servidor.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud.
 */
export async function assignPrivileges(position, privileges) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza la solicitud para asignar privilegios a la posición
    const response = await fetch(API + '/privileges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ position: position, privileges: [privileges] })
    });

    // Parsea los datos de la respuesta
    const data = await response.json();

    // Retorna los datos de la respuesta
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error
    throw new Error(error);
  }
}
