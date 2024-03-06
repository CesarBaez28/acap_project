import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza la solicitud para guardar una carpeta en el servidor.
 *
 * @param {string} folder - Nombre de la carpeta que se va a guardar.
 * @returns {Object} - Objeto JSON que contiene la información de la carpeta guardada.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function saveFolder(folder) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud POST para guardar una carpeta
    const response = await fetch(API + '/folders/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ name: folder, description: "", status: 1 })
    });

    // Parsea la respuesta del servidor como JSON
    const data = await response.json();

    // Retorna el objeto JSON con la información de la carpeta guardada
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
