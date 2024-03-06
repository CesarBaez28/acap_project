import { useState, useEffect } from "react";
import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Hook personalizado para obtener estados desde la API y filtrar según un criterio.
 *
 * @param {Array} filter - Lista de estados a filtrar.
 * @returns {Array} - Estado que almacena la lista de estados filtrada y función para actualizar el estado.
 */
export function useGetStatus(filter) {
  // Obtener el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Estado para almacenar la lista de estados filtrada
  const [status, setStatus] = useState();

  // Función para cargar los estados desde la API y aplicar el filtro
  const loadStatus = async () => {
    try {
      // Realizar la solicitud a la API para obtener todos los estados
      const response = await fetch(API + '/status/findAll', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      // Obtener y procesar los datos de la respuesta
      const data = await response.json();

      // Filtrar la lista de estados según el criterio definido en el filtro
      const filterData = data.filter(item => !filter.includes(item.state));

      // Actualizar el estado con la lista filtrada de estados
      setStatus(filterData);
    } catch (error) {
      // Manejar errores durante la carga de datos
      throw new Error(error);
    }
  };

  // Efecto para cargar los estados al montar el componente
  useEffect(() => {
    loadStatus();
  }, []);

  // Devolver el estado y la función para actualizar el estado
  return [status, setStatus];
}
