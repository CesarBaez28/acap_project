import { useEffect, useState } from "react";
import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Hook personalizado para obtener la lista de carpetas desde la API.
 *
 * @returns {Array} - Un array que contiene la lista de carpetas y la función para actualizarla.
 */
export function useGetFolders() {
  // Obtener el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Estado para almacenar la lista de carpetas
  const [folders, setFolders] = useState();

  // Función para cargar la lista de carpetas desde la API
  const loadFolders = async () => {
    try {
      // Realizar la solicitud a la API
      const response = await fetch(API + '/folders/findAll', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      // Obtener y almacenar los datos de la respuesta
      const data = await response.json();
      setFolders(data);
    } catch (error) {
      // Manejar errores durante la carga de datos
      throw new Error(error);
    }
  };

  // Efecto para cargar la lista de carpetas al montar el componente
  useEffect(() => {
    loadFolders();
  }, []);

  // Devolver el estado y la función para actualizar la lista de carpetas
  return [folders, setFolders];
}
