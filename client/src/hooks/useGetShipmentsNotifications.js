import { useContext, useEffect } from "react"
import { API, TOKEN_NAME } from "../constants"
import { UserContext } from "../contexts/userContext"
import { formatDateData } from "../utils/formatDateData"
import { getCookieValue } from "../utils/getCookieValue"

export function useGetShipmentsNotifications (notifications, setNotifications) {
  const token = getCookieValue(TOKEN_NAME)
  const { user } = useContext(UserContext)

  const loadData = async () => {
    try {
      const response = await fetch(API+`/shipments/notifications/findByLocation/${user.location.id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      
      const data = await response.json()

      const formattedDateData = formatDateData(data)
      const messages = formattedDateData.map((item) => ({
        message: item.message,
        date: item.formattedDate
      }))

      setNotifications(messages)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

}