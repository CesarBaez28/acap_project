import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function generateBarCode(label) {
  const token = getCookieValue(TOKEN_NAME)
  try {
    const response = await fetch(API + `/cintas/barcode/${label}`, { 
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Abrir el cuadro de diálogo de impresión del navegador
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.print();
    } else {
      throw new Error('No se pudo abrir la ventana de impresión');
    }

    // Liberar la URL del objeto después de imprimir
    window.addEventListener('afterprint', () => {
      URL.revokeObjectURL(url);
    });
  } catch (error) {
    throw new Error(error)
  }
}