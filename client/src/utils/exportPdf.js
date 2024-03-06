import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

/**
 * Exporta datos de cintas a un archivo PDF utilizando la API .
 *
 * @param {Object} dataToExport - Datos que se van a exportar en formato JSON.
 * @throws {Error} Si hay un error durante la solicitud de exportación.
 */
export async function exportPdf(dataToExport) {
  try {
    // Obtiene el token de la cookie utilizando la función getCookieValue.
    const token = getCookieValue(TOKEN_NAME);

    // Realiza una solicitud POST a la API para exportar datos a un archivo PDF.
    const response = await fetch(API + '/cintas/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(dataToExport),
    });

    // Obtiene el blob (datos binarios) de la respuesta.
    const blob = await response.blob();

    // Crea una URL de objeto para el blob.
    const url = URL.createObjectURL(blob);

    // Crea un elemento de enlace (link) para descargar el archivo.
    const link = document.createElement('a');
    link.href = url;
    link.download = 'inventario.pdf';
    link.style.display = 'none';

    // Añade el enlace al cuerpo del documento.
    document.body.appendChild(link);

    // Simula un clic en el enlace para iniciar la descarga.
    link.click();

    // Elimina el enlace del cuerpo del documento.
    document.body.removeChild(link);

    // Revoca la URL del objeto para liberar recursos.
    URL.revokeObjectURL(url);
  } catch (error) {
    // Lanza un error si hay algún problema durante la solicitud de exportación.
    throw new Error(error);
  }
}

