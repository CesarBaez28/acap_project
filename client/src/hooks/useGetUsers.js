import { useState, useEffect, useContext } from "react";
import { API, TOKEN_NAME } from "../constants";
import { processedUserData } from "../utils/processedUserData";
import { UserContext } from "../contexts/userContext";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Hook personalizado para obtener datos de usuarios desde la API.
 *
 * @param {string} state - Estado de los usuarios a recuperar.
 * @returns {Array} - Estado que almacena los datos de usuarios procesados, función para actualizar el estado, estado de carga y función para actualizar el estado de carga.
 */
export function useGetUsers(state) {
  // Obtener el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Obtener el usuario actual del contexto
  const { user } = useContext(UserContext);

  // Estado para indicar si la carga está en progreso
  const [isLoading, setIsLoading] = useState(true);

  // Estado para almacenar los datos de usuarios procesados
  const [usersData, setUsersData] = useState(null);

  // Función para cargar los datos de usuarios desde la API
  const loadUserData = async () => {
    try {
      // Indicar que la carga está en progreso
      setIsLoading(true);

      // Realizar la solicitud a la API para obtener datos de usuarios
      const response = await fetch(API + `/users/find/${state}/${user.id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      // Obtener y procesar los datos de la respuesta
      const data = await response.json();
      const processedData = processedUserData(data);

      // Actualizar el estado con los datos de usuarios procesados
      setUsersData(processedData);
    } catch (error) {
      // Manejar errores durante la carga de datos
      throw new Error(error);
    } finally {
      // Indicar que la carga ha finalizado
      setIsLoading(false);
    }
  };

  // Efecto para cargar los datos de usuarios cuando cambia el usuario actual
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      loadUserData();
    }
  }, [user]);

  // Devolver los estados y funciones necesarios
  return [usersData, setUsersData, isLoading, setIsLoading];
}
