import { API, TOKEN_NAME } from '../constants';
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza una búsqueda de cintas en el servidor basada en un término de búsqueda.
 *
 * @param {string} search - Término de búsqueda para buscar cintas en el servidor.
 * @returns {Object} - Objeto JSON que contiene la información de las cintas encontradas.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function searchCinta(search) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud GET al servidor para buscar cintas según el término de búsqueda
    const response = await fetch(API + `/cintas/search/${search}`, { 
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });
    
    // Parsea la respuesta del servidor como JSON
    const data = await response.json();

    // Retorna el objeto JSON con la información de las cintas encontradas
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
