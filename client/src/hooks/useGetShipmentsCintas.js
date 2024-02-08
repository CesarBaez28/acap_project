import { useState, useEffect } from "react"
import { API } from "../constants"
import { processedShipmentsCintasData } from "../utils/processedShipmentsCintasData"

export function useGetShipmentsCintas (shipmentId) {
  const [shipmentsCintas, setShipmentsCintas] = useState(null)

  const loadShipementsCintas = async () => {
    try {
      const response = await fetch(API+`/shipments/getAllByShipment?id=${shipmentId}`,{ method: 'GET'})
      const data = await response.json();
      const processedData = processedShipmentsCintasData(data)
      setShipmentsCintas(processedData)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    loadShipementsCintas()
  }, [])

  return [shipmentsCintas, setShipmentsCintas]
}