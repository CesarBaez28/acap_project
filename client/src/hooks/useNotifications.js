import { useContext, useEffect, useState } from "react";
import { createSocket, onMessage } from "../api/webSocket";
import { UserContext } from "../contexts/userContext";
import NotificationSound from "../assets/notification-sound-7062.mp3";

// Instancia del sonido de notificación
const notificationSound = new Audio(NotificationSound);

/**
 * Hook personalizado para gestionar las notificaciones mediante WebSocket.
 *
 * @returns {Array} - Estado que almacena las notificaciones, función para actualizar el estado de las notificaciones.
 */
export function useNotifications() {
  // Obtener el usuario actual del contexto
  const { user } = useContext(UserContext);

  // Estado para almacenar las notificaciones
  const [notifications, setNotifications] = useState([]);

  // Efecto para configurar el socket y gestionar las notificaciones
  useEffect(() => {
    // Crear una instancia del socket con el ID del usuario
    const socketInstance = createSocket(user.id);

    // Configurar la escucha de mensajes desde el socket
    onMessage((message) => {
      // Parsear el mensaje JSON recibido
      const objectMessage = JSON.parse(message);

      // Actualizar el estado con la nueva notificación
      setNotifications((prevNotifications) => [...prevNotifications, objectMessage]);

      // Reproducir el sonido de notificación
      notificationSound.play();
    });

    // Limpia la conexión del socket cuando el componente se desmonta
    return () => {
      if (socketInstance) {
        socketInstance.close();
      }
    };
  }, [user]);

  // Devolver el estado y la función para actualizar las notificaciones
  return [notifications, setNotifications];
}
