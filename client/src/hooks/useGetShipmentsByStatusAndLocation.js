import { useState, useEffect } from "react";
import { API, PENDING_STATUS_ID } from "../constants";
import { formatDateData } from "../utils/formatDateData";

export function useGetShipmentsByStatusAndLocation (locationId) {
  const [shipments, setShipments] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadShipments = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(API+`/shipments/findByStatusAndLocation/${PENDING_STATUS_ID}/${locationId}`, {method: 'GET'})
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