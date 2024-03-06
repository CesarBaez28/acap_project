import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from "../utils/getCookieValue";

/**
 * Realiza la solicitud para guardar o actualizar la información de una cinta en el servidor.
 *
 * @param {string} label - Etiqueta de la cinta.
 * @param {string} description - Descripción de la cinta.
 * @param {Date} creationDate - Fecha de creación de la cinta.
 * @param {Date} expiryDate - Fecha de vencimiento de la cinta.
 * @param {Date} rententionDate - Fecha de retención de la cinta.
 * @param {string} location - Ubicación de la cinta.
 * @param {string} statusCinta - Estado de la cinta.
 * @param {string} id - Identificador de la cinta (opcional, utilizado para actualizar).
 * @returns {Object} - Objeto JSON que contiene la información de la cinta guardada o actualizada.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function saveCinta(label, description, creationDate, expiryDate, rententionDate, location, statusCinta, id) {
  const token = getCookieValue(TOKEN_NAME);
  creationDate = new Date(creationDate);
  expiryDate = new Date(expiryDate);
  rententionDate = new Date(rententionDate);

  try {
    // Realiza una solicitud POST para guardar o actualizar la información de una cinta
    const response = await fetch(API+'/cintas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        ...(id && { id }), // Agrega el campo 'id' solo si está presente
        location,
        statusCinta,
        label,
        description,
        creationDate,
        expiryDate,
        rententionDate,
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
