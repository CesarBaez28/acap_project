import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

/**
 * Realiza la carga de archivos al servidor mediante una solicitud POST.
 *
 * @param {FileList} files - Lista de archivos a cargar.
 * @param {string} folder - Nombre de la carpeta donde se almacenarán los archivos.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de los datos.
 * @returns {Object} - Datos de la respuesta del servidor después de la carga de archivos.
 */
export async function fileUpload(files, folder) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME)

  try {
    // Crea un objeto FormData y agrega los datos necesarios
    const formData = new FormData()

    formData.append('folderName', folder);

    for (const element of files) {
      formData.append('files', element);
    }

    // Realiza la solicitud POST para cargar los archivos
    const response = await fetch(API+'/evidence/uploadFiles', {
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + token},
      body: formData
    })

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}