import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza la solicitud para guardar una posición en el servidor.
 *
 * @param {string} position - Nombre de la posición que se va a guardar.
 * @returns {Object} - Objeto JSON que contiene la información de la posición guardada.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function savePosition(position) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud POST para guardar una posición
    const response = await fetch(API+'/positions/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({description: "", position: position, status: 1})
    });

    // Parsea la respuesta del servidor como JSON
    const data = await response.json();

    // Retorna el objeto JSON con la información de la posición guardada
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
