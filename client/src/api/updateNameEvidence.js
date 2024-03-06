import { API, TOKEN_NAME } from '../constants'
import { getCookieValue } from '../utils/getCookieValue'

/**
 * Actualiza el nombre de una evidencia en el servidor.
 *
 * @param {Object} evidenceData - Objeto que contiene la información de la evidencia a renombrar.
 *                                Debe tener la propiedad 'id' que representa el identificador único de la evidencia.
 * @param {string} newName - Nuevo nombre que se asignará a la evidencia.
 * @returns {Promise<string>} - Promesa que se resuelve con los datos de la respuesta de la solicitud.
 *                             En este caso, el cuerpo de la respuesta se convierte a texto.
 * @throws {Error} - Se lanza si hay algún error durante la solicitud.
 */
export async function updateNameEvidence(evidenceData, newName) {
  // Obtiene el valor del token del usuario de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud PUT en la API
    const response = await fetch(`${API}/evidence/rename/${evidenceData.id}/${newName}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    // Obtiene los datos de la respuesta como texto
    const data = await response.text();

    // Devuelve los datos de la respuesta
    return data;
  } catch (error) {
    // Si hay un error durante la solicitud, lanza una excepción con el mensaje de error
    throw new Error(error);
  }
}
