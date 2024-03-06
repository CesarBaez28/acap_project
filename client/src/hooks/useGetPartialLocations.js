import { useEffect, useState } from "react";
import { API, TOKEN_NAME } from '../constants';
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Hook personalizado para obtener una lista filtrada de ubicaciones desde la API.
 *
 * @param {Array} filter - Un array que contiene las ubicaciones a excluir de la lista.
 * @returns {Array} - Un array que contiene la lista de ubicaciones filtradas y la función para actualizarla.
 */
export function useGetPartialLocations(filter) {
  // Obtener el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Estado para almacenar la lista de ubicaciones filtradas
  const [locations, setLocations] = useState();

  // Función para cargar la lista de ubicaciones desde la API y aplicar el filtro
  const loadLocations = async () => {
    try {
      // Realizar la solicitud a la API
      const response = await fetch(API + '/location/findAll', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      // Obtener y almacenar los datos de la respuesta
      const data = await response.json();

      // Filtrar las ubicaciones según el array de filtro
      const filterData = data.filter(item => !filter.includes(item.location));
      setLocations(filterData);
    } catch (error) {
      // Manejar errores durante la carga de datos
      throw new Error(error);
    }
  };

  // Efecto para cargar la lista de ubicaciones al montar el componente
  useEffect(() => {
    loadLocations();
  }, []);

  // Devolver el estado y la función para actualizar la lista de ubicaciones filtradas
  return [locations, setLocations];
}
