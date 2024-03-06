import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Obtiene información sobre una cinta específica basada en su etiqueta.
 *
 * @param {string} label - Etiqueta de la cinta a buscar.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de los datos.
 * @returns {Object} - Información de la cinta encontrada.
 */
export async function getCintaByLabel(label) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud GET para obtener la información de la cinta por etiqueta
    const response = await fetch(API + `/cintas/findByLabel/${label}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Parsea los datos de la respuesta como JSON y los retorna
      const data = await response.json();
      return data;
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error al obtener información de la cinta: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
