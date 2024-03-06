import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza la solicitud para guardar un estado en el servidor.
 *
 * @param {string} state - Estado que se va a guardar.
 * @returns {Object} - Objeto JSON que contiene la información del estado guardado.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function saveStatus(state) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud POST para guardar el estado
    const response = await fetch(API+'/status/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ state, description: '' })
    });

    // Parsea la respuesta del servidor como JSON
    const data = await response.json();

    // Retorna el objeto JSON con la información del estado guardado
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
