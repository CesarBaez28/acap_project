import { API, TOKEN_NAME } from '../constants';
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Obtiene y abre en una nueva ventana el archivo de imagen de firma asociado a la ruta proporcionada.
 *
 * @param {string} path - Ruta del archivo de imagen de firma que se desea obtener y abrir.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de la imagen de firma.
 */
export async function getSignatureImage(path) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud POST para obtener el archivo de imagen de firma asociado a la ruta
    const response = await fetch(API + `/signatures/downLoad`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({path: path})
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Obtiene el blob de la respuesta y crea una URL del objeto blob
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Abre una nueva ventana con la URL de la imagen de firma
      window.open(url, '_blank');
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error al obtener la imagen de firma: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
