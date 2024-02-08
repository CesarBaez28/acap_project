import { useEffect, useState } from "react";
import { API } from "../constants";
import { formatDateDataShipmentsReceived } from "../utils/formatDateData";

export function useGetReceivedCintasByStatusAndLocation(statusId, locationId) {
  const [shipmentsReceived, setShipmentsReceived] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const loadShipmentsReceived = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(API + `/receiveCintas/findByStatusAndLocationTo/${statusId}/${locationId}`, {
        method: 'GET'
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