import { useState, useEffect, useContext } from 'react'
import { API, TOKEN_NAME } from '../constants';
import { UserContext } from '../contexts/userContext';
import { formatDateData } from '../utils/formatDateData';
import { getCookieValue } from '../utils/getCookieValue'

export function useGetShipmentsByUser() {
  const token = getCookieValue(TOKEN_NAME)
  const { user } = useContext(UserContext)
  const [shipments, setShipments] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const loadShipmets = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(API + `/shipments/fintTop15ByUser?userId=${user.id}`, { 
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
    loadShipmets()
  }, [])

  return [shipments, setShipments, isLoading, setIsLoading]
}