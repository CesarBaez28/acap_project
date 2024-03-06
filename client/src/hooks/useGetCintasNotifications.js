import { useContext, useEffect } from "react";
import { formatDate, getDataObject } from "../utils/formatDateData";
import { UserContext } from "../contexts/userContext";
import { getRetainedCintas } from "../api/getRetainedCintas";
import { getExpiredCintas } from "../api/getExpiredCintas";

/**
 * Hook personalizado para obtener y gestionar notificaciones de cintas expiradas y retenidas.
 *
 * @param {Array} notifications - Estado que contiene las notificaciones existentes.
 * @param {function} setNotifications - Función para actualizar el estado de notificaciones.
 */
export function useGetCintasNotifications(notifications, setNotifications) {
  // Obtener el contexto del usuario
  const { user } = useContext(UserContext);

  // Función para cargar las notificaciones de cintas expiradas y retenidas
  const loadData = async () => {
    try {
      // Obtener las cintas expiradas y retenidas
      const expiredCintas = await getExpiredCintas(user.location.id);
      const retainedCintas = await getRetainedCintas(user.location.id);

      // Formatear las fechas para las cintas expiradas
      const formattedDateExpiredCintas = expiredCintas.map((item) => {
        const dateArray = item.expiryDate;
        const dateObject = getDataObject(dateArray);
        const formattedDate = formatDate(dateObject);
        return { ...item, formattedDate };
      });

      // Formatear las fechas para las cintas retenidas
      const formattedDateRetainedCintas = retainedCintas.map((item) => {
        const dateArray = item.rententionDate;
        const dateObject = getDataObject(dateArray);
        const formattedDate = formatDate(dateObject);
        return { ...item, formattedDate };
      });

      // Crear mensajes para las notificaciones
      let messages = formattedDateRetainedCintas.map((item) => ({
        message: `La cinta ${item.label} está retenida`,
        date: item.formattedDate,
      }));

      messages = [
        ...messages,
        ...formattedDateExpiredCintas.map((item) => ({
          message: `La cinta ${item.label} ha expirado`,
          date: item.formattedDate,
        })),
      ];

      // Actualizar el estado de notificaciones
      setNotifications((prevNotifications) => {
        // Filtrar notificaciones duplicadas
        const uniqueMessages = messages.filter(
          (newNotification) =>
            !prevNotifications.some(
              (prevNotification) =>
                prevNotification.message === newNotification.message &&
                prevNotification.date === newNotification.date
            )
        );
        return [...prevNotifications, ...uniqueMessages];
      });
    } catch (error) {
      // Manejar errores durante la carga
      throw new Error(error);
    }
  };

  // Efecto para cargar las notificaciones al montar el componente
  useEffect(() => {
    loadData();
  }, []);
}
