import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

/**
 * Genera un código de barras asociado a una etiqueta y abre el cuadro de diálogo de impresión del navegador.
 *
 * @param {string} label - Etiqueta asociada al código de barras.
 * @throws {Error} - Error si la ventana de impresión no se puede abrir.
 */
export async function generateBarCode(label) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud para obtener el código de barras mediante la API
    const response = await fetch(API + `/cintas/barcode/${label}`, { 
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

    // Obtiene el blob de la respuesta
    const blob = await response.blob();

    // Crea una URL a partir del blob
    const url = URL.createObjectURL(blob);

    // Abre una nueva ventana (página) para mostrar el código de barras
    const printWindow = window.open(url, '_blank');

    // Verifica si la ventana se ha abierto correctamente
    if (printWindow) {
      // Imprime la ventana recién abierta
      printWindow.print();
    } else {
      throw new Error('No se pudo abrir la ventana de impresión');
    }

    // Libera la URL del objeto después de imprimir
    window.addEventListener('afterprint', () => {
      URL.revokeObjectURL(url);
    });

  } catch (error) {
    throw new Error(error);
  }
}
