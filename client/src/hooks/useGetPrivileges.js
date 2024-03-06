import { useState, useEffect } from "react";
import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Hook personalizado para obtener una lista de privilegios desde la API.
 *
 * @returns {Array} - Un array que contiene la lista de privilegios y la función para actualizarla.
 */
export function useGetPrivileges() {
  // Obtener el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Estado para almacenar la lista de privilegios
  const [privileges, setPrivileges] = useState();

  // Función para cargar la lista de privilegios desde la API
  const loadPrivileges = async () => {
    try {
      // Realizar la solicitud a la API
      const response = await fetch(API + '/privileges/findAll', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      // Obtener y almacenar los datos de la respuesta
      const data = await response.json();
      setPrivileges(data);
    } catch (error) {
      // Manejar errores durante la carga de datos
      throw new Error(error);
    }
  };

  // Efecto para cargar la lista de privilegios al montar el componente
  useEffect(() => {
    loadPrivileges();
  }, []);

  // Devolver el estado y la función para actualizar la lista de privilegios
  return [privileges, setPrivileges];
}
