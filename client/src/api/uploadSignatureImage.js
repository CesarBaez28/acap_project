import { API, TOKEN_NAME } from '../constants'
import { getCookieValue } from '../utils/getCookieValue'

/**
 * Sube una imagen de firma de chofer al servidor.
 *
 * @param {string} base64Image - Cadena de base64 que representa la imagen de firma.
 * @param {string} directoryName - Nombre del directorio donde se almacenará la imagen de firma.
 * @returns {Promise<object>} - Promesa que se resuelve con los datos de la respuesta de la solicitud.
 *                             En este caso, los datos se interpretan como JSON.
 * @throws {Error} - Se lanza si hay algún error durante la solicitud.
 */
export async function uploadSignatureImage(base64Image, directoryName) {
  // Obtiene el valor del token de la cookie 
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud POST en la API
    const response = await fetch(`${API}/signatures/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      // Convierte la imagen base64 y el nombre del directorio a formato JSON y los incluye en el cuerpo de la solicitud
      body: JSON.stringify({ base64Image, directoryName })
    });

    // Obtiene los datos de la respuesta interpretados como JSON
    const data = await response.json();

    // Devuelve los datos de la respuesta
    return data;
  } catch (error) {
    // Si hay un error durante la solicitud, lanza una excepción con el mensaje de error
    throw new Error(error);
  }
}
