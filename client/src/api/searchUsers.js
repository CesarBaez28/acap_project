import { API, TOKEN_NAME } from "../constants";
import { processedUserData } from "../utils/processedUserData";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza una búsqueda de usuarios en el servidor basada en un término de búsqueda y un identificador de usuario.
 *
 * @param {string} search - Término de búsqueda para buscar usuarios en el servidor.
 * @param {string} userId - Identificador del usuario utilizado como filtro adicional en la búsqueda.
 * @returns {Object} - Objeto JSON que contiene la información de los usuarios encontrados.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function searchUsers(search, userId) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud GET al servidor para buscar usuarios según el término de búsqueda y el identificador de usuario
    const response = await fetch(API + `/users/search?search=${search}&userId=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    // Parsea la respuesta del servidor como JSON
    const data = await response.json();

    // Procesa la información de los usuarios utilizando la función processedUserData
    const processedData = processedUserData(data);

    // Retorna el objeto JSON con la información de los usuarios encontrados
    return processedData;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
