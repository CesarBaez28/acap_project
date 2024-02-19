import { useContext, useEffect } from "react"
import { formatDate, getDataObject } from "../utils/formatDateData"
import { UserContext } from "../contexts/userContext"
import { getRetainedCintas } from "../api/getRetainedCintas"
import { getExpiredCintas } from "../api/getExpiredCintas"

export function useGetCintasNotifications(notifications, setNotifications) {
  const { user } = useContext(UserContext)

  const loadData = async () => {
    try {
      // Get expired and retained cintas
      const expiredCintas = await getExpiredCintas(user.location.id)
      const retainedCintas = await getRetainedCintas(user.location.id)

      // format date for expired cintas
      let formattedDateExpiredCintas = expiredCintas.map((item) => {
        const dateArray = item.expiryDate;
        const dateObject = getDataObject(dateArray)
        const formattedDate = formatDate(dateObject)
        return { ...item, formattedDate }
      })

      // format date for retained cintas
      let formattedDateRetainedCintas = retainedCintas.map((item) => {
        const dateArray = item.rententionDate;
        const dateObject = getDataObject(dateArray)
        const formattedDate = formatDate(dateObject)
        return { ...item, formattedDate }
      })

      let messages = formattedDateRetainedCintas.map((item) => ({
        message: `La cinta ${item.label} está retenida`,
        date: item.formattedDate
      }))

      messages = [
        ...messages,
        ...formattedDateExpiredCintas.map((item) => ({
          message: `La cinta ${item.label} ha expirado`,
          date: item.formattedDate
        }))
      ]

      setNotifications((prevNotifications) => {
        // filter duplicated notifications
        const uniqueMessages = messages.filter(
          (newNotification) =>
            !prevNotifications.some(
              (prevNotification) =>
                prevNotification.message === newNotification.message &&
                prevNotification.date === newNotification.date
            )
        );
        return [...prevNotifications, ...uniqueMessages];
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])
}