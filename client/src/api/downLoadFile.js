import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue'

export async function downLoadFile(folderName, fileName) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API + `/evidence/downdLoadFile/${folderName}/${fileName}`, { 
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    })

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