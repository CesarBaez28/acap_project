import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Descarga una carpeta de evidencias como un archivo comprimido (ZIP) desde el servidor.
 *
 * @param {string} folderName - Nombre de la carpeta que se va a descargar.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o descarga de la carpeta.
 */
export async function downloadFolderOfEvidence(folderName) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza la solicitud GET para descargar la carpeta como un archivo ZIP
    const response = await fetch(API + `/evidence/download/${folderName}`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Obtiene el archivo ZIP como un objeto Blob
      const blob = await response.blob();

      // Crea un enlace para descargar el archivo ZIP y simula un clic automático
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${folderName}.zip`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      // Elimina el enlace y revoca la URL del objeto para liberar recursos
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      // En caso de respuesta no exitosa, lanza un error
      throw new Error(`Error al descargar la carpeta: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error
    throw new Error(error);
  }
}
