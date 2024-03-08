import { API } from '../constants';

/**
 * Realiza la autenticación de un usuario mediante el número de empleado y contraseña proporcionados.
 *
 * @param {string} employeeNumber - Número de empleado del usuario.
 * @param {string} password - Contraseña del usuario.
 * @param {function} setErrors - Función para establecer errores en el estado del componente.
 * @returns {Promise<(Object|boolean)>} - Objeto con la información del usuario autenticado si es exitoso, o `false` en caso de error.
 * @throws {Error} - Error lanzado en caso de fallo en la solicitud o error en el servidor.
 */
export async function login(employeeNumber, password, setErrors) {
  try {
    // Realiza una solicitud POST para autenticar al usuario con el número de empleado y contraseña
    const response = await fetch(API + '/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ employeeNumber, password })
    });

    // Verifica si la respuesta fue exitosa
    if (response.ok) {
      // Obtiene los datos de la respuesta (información del usuario autenticado)
      const data = await response.json();
      
      // Verifica si hay un error en la respuesta y establece errores si es necesario
      if (data?.error) {
        setErrors({ password: data.error });
        return false;
      }
      
      // Retorna la información del usuario autenticado
      return data;
    } else {
      // En caso de respuesta no exitosa, lanza un error con el mensaje del servidor
      throw new Error(`Error en la autenticación: ${response.statusText}`);
    }
  } catch (error) {
    // En caso de fallo, establece un error genérico y lanza un error con la descripción del error
    setErrors({ password: 'Hubo un error en el servidor' });
    throw new Error(error);
  }
}
