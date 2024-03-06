import { useState, useEffect } from "react";
import { API, TOKEN_NAME } from "../constants";
import { processedShipmentsCintasData } from "../utils/processedShipmentsCintasData";
import { getCookieValue } from '../utils/getCookieValue';

/**
 * Hook personalizado para obtener cintas asociadas a un envío desde la API.
 *
 * @param {string} shipmentId - Identificador del envío del cual se obtendrán las cintas.
 * @returns {Array} - Un array que contiene la lista de cintas asociadas al envío, y la función para actualizarla.
 */
export function useGetShipmentsCintas(shipmentId) {
  // Obtener el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Estado para almacenar la lista de cintas asociadas al envío
  const [shipmentsCintas, setShipmentsCintas] = useState(null);

  // Función para cargar cintas asociadas al envío desde la API
  const loadShipmentsCintas = async () => {
    try {
      // Realizar la solicitud a la API para obtener cintas asociadas al envío
      const response = await fetch(API + `/shipments/getAllByShipment?id=${shipmentId}`, { 
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      // Obtener y procesar los datos de la respuesta
      const data = await response.json();
      const processedData = processedShipmentsCintasData(data);
      setShipmentsCintas(processedData);
    } catch (error) {
      // Manejar errores durante la carga de datos
      throw new Error(error);
    }
  };

  // Efecto para cargar las cintas al montar el componente
  useEffect(() => {
    loadShipmentsCintas();
  }, []);

  // Devolver el estado y la función necesarios
  return [shipmentsCintas, setShipmentsCintas];
}
