import { useState, useEffect } from "react";
import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Hook personalizado para obtener una lista de posiciones desde la API.
 *
 * @returns {Array} - Un array que contiene la lista de posiciones y la función para actualizarla.
 */
export function useGetPositions() {
  // Obtener el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Estado para almacenar la lista de posiciones
  const [positions, setPositions] = useState(null);

  // Función para cargar la lista de posiciones desde la API
  const loadPositions = async () => {
    try {
      // Realizar la solicitud a la API
      const response = await fetch(API + '/positions/findAll', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      // Obtener y almacenar los datos de la respuesta
      const data = await response.json();
      setPositions(data);
    } catch (error) {
      // Manejar errores durante la carga de datos
      throw new Error(error);
    }
  };

  // Efecto para cargar la lista de posiciones al montar el componente
  useEffect(() => {
    loadPositions();
  }, []);

  // Devolver el estado y la función para actualizar la lista de posiciones
  return [positions, setPositions];
}
