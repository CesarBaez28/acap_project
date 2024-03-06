import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Descarga un archivo del servidor.
 *
 * @param {string} folderName - Nombre de la carpeta donde se encuentra el archivo.
 * @param {string} fileName - Nombre del archivo a descargar.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o descarga del archivo.
 */
export async function downLoadFile(folderName, fileName) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza la solicitud GET para descargar el archivo
    const response = await fetch(API + `/evidence/downdLoadFile/${folderName}/${fileName}`, { 
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Obtiene el archivo como un objeto Blob
      const blob = await response.blob();

      // Crea un enlace para descargar el archivo y lo simula un clic automático
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // En caso de respuesta no exitosa, registra un error en la consola
      console.error(`Error al descargar el archivo: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error
    throw new Error(error);
  }
}
