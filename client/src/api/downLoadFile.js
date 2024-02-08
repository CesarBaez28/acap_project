import { API } from "../constants";

export async function downLoadFile(folderName, fileName) {
  try {
    const response = await fetch(API + `/evidence/downdLoadFile/${folderName}/${fileName}`, { method: 'GET' })

    if (response.ok) {
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error(`Error al descargar el archivo: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(error)
  }
}