import { API } from "../constants"

export async function exportExcel(dataToExport) {
  try {
    const response = await fetch(API + '/cintas/excel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToExport),
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'inventario.xlsx';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(error);
  }
}
