import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from "../utils/getCookieValue";

/**
 * Realiza la solicitud para guardar o actualizar la información de una cinta en el servidor.
 *
 * @param {object} cintaData - Objeto con los datos de la cinta.
 * @returns {Promise<Object>} - Objeto JSON que contiene la información de la cinta guardada o actualizada.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 * 
 */
export async function saveCinta(cintaData) {
  const token = getCookieValue(TOKEN_NAME);
  cintaData.creationDate = new Date(cintaData.creationDate);
  cintaData.expiryDate = new Date(cintaData.expiryDate);
  cintaData.rententionDate = new Date(cintaData.rententionDate);

  try {
    // Realiza una solicitud POST para guardar o actualizar la información de una cinta
    const response = await fetch(API + '/cintas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        ...(cintaData.id && { id: cintaData.id }), // Agrega el campo 'id' solo si está presente
        location: cintaData.location,
        statusCinta: cintaData.statusCinta,
        label: cintaData.label,
        description: cintaData.description,
        creationDate: cintaData.creationDate,
        expiryDate: cintaData.expiryDate,
        rententionDate: cintaData.rententionDate,
        status: 1
      })
    });

    // Parsea la respuesta del servidor como JSON
    const data = await response.json();

    // Retorna el objeto JSON con la información de la cinta guardada o actualizada
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}

