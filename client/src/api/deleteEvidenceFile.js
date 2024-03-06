import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Elimina un archivo de evidencia de una carpeta específica.
 *
 * @param {string} folderName - Nombre de la carpeta que contiene el archivo.
 * @param {string} fileName - Nombre del archivo a eliminar.
 * @returns {Promise<string>} - Promesa que se resuelve con la respuesta del servidor.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud.
 */
export async function deleteEvidenceFile(folderName, fileName) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza la solicitud para eliminar el archivo de evidencia
    const response = await fetch(API + `/evidence/deleteFile/${folderName}/${fileName}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    // Obtiene y devuelve la respuesta del servidor como texto
    const data = await response.text();
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error
    throw new Error(error);
  }
}
