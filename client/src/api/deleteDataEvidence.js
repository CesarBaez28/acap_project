import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Elimina datos de evidencia, incluyendo archivos asociados.
 *
 * @param {Object} file - Información del archivo a eliminar.
 * @param {number} file.id - ID del archivo.
 * @param {string} file.path - Ruta del archivo.
 * @param {string} file.name - Nombre del archivo.
 * @param {number} file.size - Tamaño del archivo.
 * @param {string} file.extension - Extensión del archivo.
 * @returns {Promise<Object>} - Promesa que se resuelve con la respuesta del servidor.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud.
 */
export async function deleteDataEvidence(file) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Prepara la información de la evidencia a eliminar
    const evidence = [{
      id: file.id,
      path: file.path,
      name: file.name,
      size: file.size,
      extension: file.extension
    }];

    // Realiza la solicitud para eliminar la evidencia
    const response = await fetch(API + '/evidence/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ folders: file.folders, evidence: evidence })
    });

    // Obtiene y devuelve la respuesta del servidor como un objeto JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error
    throw new Error(error);
  }
}
