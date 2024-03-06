import { useEffect, useState } from "react";
import { API, TOKEN_NAME } from "../constants";
import { formatDateDataShipmentsReceived } from "../utils/formatDateData";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Hook personalizado para obtener cintas recibidas por estado y ubicación desde la API.
 *
 * @param {string} statusId - ID del estado de las cintas.
 * @param {string} locationId - ID de la ubicación de las cintas.
 * @returns {Array} - Un array que contiene la lista de cintas recibidas, la función para actualizarla, el estado de carga y la función para actualizar el estado de carga.
 */
export function useGetReceivedCintasByStatusAndLocation(statusId, locationId) {
  // Obtener el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Estados para almacenar la lista de cintas recibidas y el estado de carga
  const [shipmentsReceived, setShipmentsReceived] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar cintas recibidas desde la API
  const loadShipmentsReceived = async () => {
    try {
      // Indicar que la carga está en progreso
      setIsLoading(true);

      // Realizar la solicitud a la API
      const response = await fetch(API + `/receiveCintas/findByStatusAndLocationTo/${statusId}/${locationId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      // Obtener y almacenar los datos de la respuesta
      const data = await response.json();
      const formattedData = formatDateDataShipmentsReceived(data);
      setShipmentsReceived(formattedData);
    } catch (error) {
      // Manejar errores durante la carga de datos
      throw new Error(error);
    } finally {
      // Indicar que la carga ha finalizado
      setIsLoading(false);
    }
  };

  // Efecto para cargar las cintas recibidas al montar el componente
  useEffect(() => {
    loadShipmentsReceived();
  }, []);

  // Devolver los estados y funciones necesarios
  return [shipmentsReceived, setShipmentsReceived, isLoading, setIsLoading];
}
