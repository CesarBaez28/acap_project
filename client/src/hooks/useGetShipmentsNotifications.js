import { useContext, useEffect } from "react";
import { API, TOKEN_NAME } from "../constants";
import { UserContext } from "../contexts/userContext";
import { formatDateData } from "../utils/formatDateData";
import { getCookieValue } from "../utils/getCookieValue";

/**
 * Hook personalizado para obtener notificaciones de envíos desde la API y actualizar el estado de las notificaciones.
 *
 * @param {Array} notifications - El estado que almacena las notificaciones.
 * @param {function} setNotifications - Función para actualizar el estado de las notificaciones.
 */
export function useGetShipmentsNotifications(notifications, setNotifications) {
  // Obtener el token de la cookie
  const token = getCookieValue(TOKEN_NAME);

  // Obtener el usuario y su ubicación desde el contexto
  const { user } = useContext(UserContext);

  // Función para cargar las notificaciones de envíos desde la API
  const loadData = async () => {
    try {
      // Realizar la solicitud a la API para obtener notificaciones de envíos por ubicación
      const response = await fetch(API + `/shipments/notifications/findByLocation/${user.location.id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      // Obtener y procesar los datos de la respuesta
      const data = await response.json();
      const formattedDateData = formatDateData(data);

      // Mapear los datos para obtener mensajes y fechas formateadas
      const messages = formattedDateData.map((item) => ({
        message: item.message,
        date: item.formattedDate,
      }));

      // Actualizar el estado de las notificaciones
      setNotifications(messages);
    } catch (error) {
      // Manejar errores durante la carga de datos
      throw new Error(error);
    }
  };

  // Efecto para cargar las notificaciones al montar el componente
  useEffect(() => {
    loadData();
  }, []);
}
