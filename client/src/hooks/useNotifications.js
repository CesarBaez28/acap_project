import { useContext, useEffect, useState } from "react"
import { createSocket, onMessage } from "../api/webSocket"
import { UserContext } from "../contexts/userContext"

export function useNotifications() {
  const { user } = useContext(UserContext)
  const [notifications, setNotifications] = useState([])
  
  useEffect(() => {
    const socketInstance = createSocket(user.id)
  
    onMessage((message) => {
      const objectMessage = JSON.parse(message)
      setNotifications((prevNotifications) => [...prevNotifications, objectMessage])
    });
  
    // Limpia la conexión del socket cuando el componente se desmonta
    return () => {
      if (socketInstance) {
        socketInstance.close()
      }
    }

  }, [user])

  return [notifications, setNotifications]
}
