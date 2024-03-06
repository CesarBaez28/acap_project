import { useState, useEffect } from "react";
import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from "../utils/getCookieValue";

/**
 * Hook personalizado para obtener la lista de choferes desde la API.
 *
 * @returns {Array} - Un array que contiene la lista de choferes y la función para actualizarla.
 */
export function useGetDrivers() {
  // Obtener el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Estado para almacenar la lista de choferes
  const [drivers, setDrivers] = useState(null);

  // Función para cargar la lista de choferes desde la API
  const loadData = async () => {
    try {
      // Realizar la solicitud a la API
      const response = await fetch(API + '/drivers/findAll', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      // Obtener y almacenar los datos de la respuesta
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      // Manejar errores durante la carga de datos
      throw new Error(error);
    }
  };

  // Efecto para cargar la lista de choferes al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  // Devolver el estado y la función para actualizar la lista de choferes
  return [drivers, setDrivers];
}
