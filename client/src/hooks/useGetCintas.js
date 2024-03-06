import { useState, useEffect, useContext } from "react";
import { API, TOKEN_NAME } from "../constants";
import { processedCintasData } from "../utils/processedCintasData";
import { UserContext } from "../contexts/userContext";
import { filterCinta } from "../utils/filterCinta";
import { getCookieValue } from "../utils/getCookieValue";

/**
 * Hook personalizado para obtener y gestionar la información de cintas desde la API.
 *
 * @returns {[Array, function, Array, function, boolean, function]} - Un array que contiene el estado bruto de las cintas,
 * la función para actualizar ese estado, el estado procesado de las cintas, la función para actualizar ese estado, el indicador de carga y la función para actualizar ese indicador.
 */
export function useGetCintas() {
  // Obtener el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Obtener el contexto del usuario
  const { user } = useContext(UserContext);

  // Estados para gestionar la carga de cintas
  const [isLoading, setIsLoading] = useState(true);

  // Estados para almacenar la información bruta y procesada de las cintas
  const [cintas, setCintas] = useState();
  const [processedCintas, setProcessedCintas] = useState();

  // Función para cargar las cintas desde la API
  const loadCintas = async () => {
    try {
      // Iniciar la carga
      setIsLoading(true);

      // Realizar la solicitud a la API para obtener la información de las cintas
      const response = await fetch(API + '/cintas/1', { 
        method: 'GET',
        credentials: 'include',
        headers: {'Authorization': 'Bearer ' + token}
      });

      // Convertir la respuesta a formato JSON
      const data = await response.json();

      // Filtrar las cintas según la ubicación del usuario
      const filterData = filterCinta(data, user.location.location);

      // Procesar los datos de las cintas
      const newData = processedCintasData(filterData);

      // Actualizar los estados con los datos obtenidos
      setCintas(filterData);
      setProcessedCintas(newData);
    } catch (error) {
      // Manejar errores durante la carga
      throw new Error(error);
    } finally {
      // Finalizar la carga
      setIsLoading(false);
    }
  };

  // Efecto para cargar las cintas al montar el componente
  useEffect(() => {
    loadCintas();
  }, []);

  // Retornar los estados y funciones relevantes
  return [cintas, setCintas, processedCintas, setProcessedCintas, isLoading, setIsLoading];
}
