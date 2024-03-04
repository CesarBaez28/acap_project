import { useState, useEffect } from "react";
import { API, PENDING_STATUS_ID, TOKEN_NAME } from "../constants";
import { formatDateData } from "../utils/formatDateData";
import { getCookieValue } from '../utils/getCookieValue'

export function useGetShipmentsByStatusAndLocation (locationId) {
  const token = getCookieValue(TOKEN_NAME)
  const [shipments, setShipments] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadShipments = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(API+`/shipments/findByStatusAndLocation/${PENDING_STATUS_ID}/${locationId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      const data = await response.json()
      const formattedData = formatDateData(data)
      setShipments(formattedData)
    } catch (error) {
      throw new Error(error)
    } finally {
      setIsLoading(false)
    }
  } 

  useEffect(() => {
    loadShipments()
  }, [])

  return [shipments, setShipments, isLoading]
}