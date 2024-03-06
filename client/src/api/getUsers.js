import { API, TOKEN_NAME } from '../constants';
import { processedUserData } from '../utils/processedUserData';
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Obtiene información de usuarios según el estado y los identificadores proporcionados.
 *
 * @param {string} state - Estado de los usuarios que se desea obtener (ej. 'active', 'inactive').
 * @param {string[]} usersId - Arreglo de identificadores de usuarios que se desean obtener.
 * @returns {Object[]} - Arreglo de objetos con la información procesada de los usuarios obtenidos.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de los usuarios.
 */
export async function getUsers(state, usersId) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud GET para obtener información de usuarios según el estado y los identificadores
    const response = await fetch(API + `/users/find/${state}/${usersId}`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Obtiene los datos de la respuesta y procesa la información de los usuarios
      const data = await response.json();
      const processedData = processedUserData(data);
      return processedData;
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error al obtener información de usuarios: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
