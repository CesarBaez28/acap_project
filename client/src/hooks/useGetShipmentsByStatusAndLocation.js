import { useState, useEffect } from "react";
import { API, PENDING_STATUS_ID, TOKEN_NAME } from "../constants";
import { formatDateData } from "../utils/formatDateData";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Hook personalizado para obtener envíos por estado y ubicación desde la API.
 *
 * @param {string} locationId - ID de la ubicación de los envíos.
 * @returns {Array} - Un array que contiene la lista de envíos, la función para actualizarla y el estado de carga.
 */
export function useGetShipmentsByStatusAndLocation(locationId) {
  // Obtener el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Estados para almacenar la lista de envíos y el estado de carga
  const [shipments, setShipments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar envíos desde la API
  const loadShipments = async () => {
    try {
      // Indicar que la carga está en progreso
      setIsLoading(true);

      // Realizar la solicitud a la API para obtener envíos por estado y ubicación
      const response = await fetch(API + `/shipments/findByStatusAndLocation/${PENDING_STATUS_ID}/${locationId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      // Obtener y almacenar los datos de la respuesta
      const data = await response.json();
      const formattedData = formatDateData(data);
      setShipments(formattedData);
    } catch (error) {
      // Manejar errores durante la carga de datos
      throw new Error(error);
    } finally {
      // Indicar que la carga ha finalizado
      setIsLoading(false);
    }
  };

  // Efecto para cargar los envíos al montar el componente
  useEffect(() => {
    loadShipments();
  }, []);

  // Devolver los estados y funciones necesarios
  return [shipments, setShipments, isLoading];
}
