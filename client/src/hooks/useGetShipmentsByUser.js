import { useState, useEffect, useContext } from 'react'
import { API } from '../constants';
import { UserContext } from '../contexts/userContext';
import { formatDateData } from '../utils/formatDateData';

export function useGetShipmentsByUser() {
  const { user } = useContext(UserContext)
  const [shipments, setShipments] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const loadShipmets = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(API + `/shipments/fintTop15ByUser?userId=${user.id}`, { method: 'GET' })
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