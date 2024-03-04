import { useState, useEffect } from "react"
import { API, TOKEN_NAME } from "../constants"
import { processedShipmentsCintasData } from "../utils/processedShipmentsCintasData"
import { getCookieValue } from '../utils/getCookieValue'

export function useGetShipmentsCintas (shipmentId) {
  const token = getCookieValue(TOKEN_NAME)
  const [shipmentsCintas, setShipmentsCintas] = useState(null)

  const loadShipementsCintas = async () => {
    try {
      const response = await fetch(API+`/shipments/getAllByShipment?id=${shipmentId}`,{ 
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
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