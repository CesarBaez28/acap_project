import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Realiza la solicitud para guardar un usuario en el servidor.
 *
 * @param {Object} userData - Datos del usuario que se van a guardar.
 * @returns {Object} - Objeto JSON que contiene la información del usuario guardado.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function saveUser({ userData }) {
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza una solicitud POST para guardar el usuario
    const response = await fetch(API+'/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + token 
      },
      body: JSON.stringify({ ...userData })
    });

    // Parsea la respuesta del servidor como JSON
    const data = await response.json();

    // Retorna el objeto JSON con la información del usuario guardado
    return data;
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
