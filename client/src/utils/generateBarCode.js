import { API } from "../constants"

export async function generateBarCode(label) {
  try {
    const response = await fetch(API + `/cintas/barcode/${label}`, { method: 'GET' })
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