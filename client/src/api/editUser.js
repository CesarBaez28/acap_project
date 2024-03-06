import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Edita la información de un usuario mediante una solicitud PUT al servidor.
 *
 * @param {Object} userData - Datos actualizados del usuario.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de los datos.
 * @returns {Object} - Datos del usuario después de la edición.
 */
export async function editUser({ userData }) {
  // Obtiene el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  try {
    // Realiza la solicitud PUT para editar la información del usuario
    const response = await fetch(API + '/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ ...userData })
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Parsea los datos de la respuesta como JSON y los retorna
      const data = await response.json();
      return data;
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error al editar el usuario: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
