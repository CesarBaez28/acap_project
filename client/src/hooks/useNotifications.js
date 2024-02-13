import { useEffect, useState } from "react";
import { onMessage } from "../api/webSocket";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    onMessage((message) => {
      console.log('Nuevo mensaje: ', message);
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    });
  }, []);

  return notifications;
}
