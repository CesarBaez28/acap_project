import { API } from "../constants";

/**
 * Obtiene los permisos asociados a un cargo específico desde el servidor.
 *
 * @async
 * @param {Object} position - Información del cargo para el cual se desean obtener los permisos.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o procesamiento de los datos.
 * @returns {Array} - Lista de permisos asociados al cargo proporcionado.
 */
export async function getPermissions(position) {
  try {
    // Realiza una solicitud POST para obtener los permisos asociados al cargo
    const response = await fetch(API + '/privileges/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(position)
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Parsea los datos de la respuesta como JSON
      const data = await response.json();
      // Retorna la lista de permisos asociados al cargo
      return data;
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error al obtener los permisos: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, lanza un error con la descripción del error
    throw new Error(error);
  }
}
