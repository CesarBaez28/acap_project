import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza la solicitud para cambiar el nombre de un archivo de evidencia en una carpeta específica.
 *
 * @param {string} folderName - Nombre de la carpeta donde se encuentra el archivo de evidencia.
 * @param {string} oldFileName - Nombre actual del archivo de evidencia que se desea cambiar.
 * @param {string} newFileName - Nuevo nombre que se asignará al archivo de evidencia.
 * @returns {Promise<string>} - Mensaje de confirmación o respuesta del servidor después de cambiar el nombre del archivo.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function renameEvidenceFile(folderName, oldFileName, newFileName) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud PUT para cambiar el nombre de un archivo de evidencia
    const response = await fetch(API + `/evidence/renameFile/${folderName}/${oldFileName}?newFileName=${newFileName}`, {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + token}
    });

    // Parsea la respuesta del servidor como texto
    const data = await response.text();

    // Retorna el mensaje de confirmación o respuesta del servidor
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
