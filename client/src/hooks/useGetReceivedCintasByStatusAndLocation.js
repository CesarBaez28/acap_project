import { useEffect, useState } from "react";
import { API, TOKEN_NAME } from "../constants";
import { formatDateDataShipmentsReceived } from "../utils/formatDateData";
import { getCookieValue } from '../utils/getCookieValue'

export function useGetReceivedCintasByStatusAndLocation(statusId, locationId) {
  const token = getCookieValue(TOKEN_NAME)
  const [shipmentsReceived, setShipmentsReceived] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const loadShipmentsReceived = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(API + `/receiveCintas/findByStatusAndLocationTo/${statusId}/${locationId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      const data = await response.json()
      const formattedData = formatDateDataShipmentsReceived(data)
      setShipmentsReceived(formattedData)
    } catch (error) {
      throw new Error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadShipmentsReceived()
  }, [])

  return [shipmentsReceived, setShipmentsReceived, isLoading, setIsLoading]
}