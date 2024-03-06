import { API, TOKEN_NAME } from "../constants";
import { processedEvidenceData } from "../utils/processedEvidenceData";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Obtiene la información de evidencias para una carpeta específica desde el servidor.
 *
 * @param {Object} folder - Objeto que contiene la información de la carpeta a buscar.
 * @param {string} folder.folderName - Nombre de la carpeta.
 * @param {string} folder.locationId - ID de la ubicación asociada a la carpeta.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de los datos.
 * @returns {Array} - Lista de evidencias procesadas para la carpeta especificada.
 */
export async function getEvidence(folder) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud POST para obtener la información de evidencias de la carpeta
    const response = await fetch(API + '/evidence/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(folder)
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Parsea los datos de la respuesta como JSON
      const data = await response.json();
      // Procesa los datos de evidencia utilizando una función de procesamiento específica
      const processedData = processedEvidenceData(data);
      // Retorna la lista de evidencias procesadas
      return processedData;
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error al obtener la información de evidencias: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
