import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza la solicitud para guardar información de evidencia en el servidor.
 *
 * @param {Object} folder - Objeto que representa la carpeta de evidencia a la que se agregarán los archivos.
 * @param {(File|File[])} files - Archivo o array de archivos a ser guardados como evidencia.
 * @returns {Object} - Objeto JSON que contiene la información de la evidencia guardada.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function saveEvidenceData(folder, files) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Convierte files en un array si no lo es
    const filesArray = Array.isArray(files) ? files : [files];

    // Mapea cada archivo a un objeto que representa la información de la evidencia
    const evidence = filesArray.map((file) => {
      const fileSizeInMB = file.size / (1024 * 1024);
      const roundedFileSize = Math.ceil(fileSizeInMB * 10) / 10;
      return {
        path: `evidence/${folder.name}`,
        name: file.path,
        size: `${roundedFileSize} MB`,
        extension: file.type,
        evidenceDate: new Date(file.lastModifiedDate).toISOString(),
      };
    });

    // Realiza una solicitud POST para guardar información de evidencia
    const response = await fetch(API + '/evidence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ folders: folder, evidence: evidence }),
    });

    // Parsea la respuesta del servidor como JSON
    const data = await response.json();

    // Retorna el objeto JSON con la información de la evidencia guardada
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
