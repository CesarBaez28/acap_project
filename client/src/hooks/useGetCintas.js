import { useState, useEffect, useContext } from "react"
import { API } from "../constants"
import { processedCintasData } from "../utils/processedCintasData"
import { UserContext } from "../contexts/userContext"
import { filterCinta } from "../utils/filterCinta"

export function useGetCintas() {
  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const [cintas, setCintas] = useState()
  const [processedCintas, setProcessedCintas] = useState()

  const loadCintas = async () => {
    try {
      setIsLoading(true); 

      const response = await fetch(API + '/cintas/1', { method: 'GET' })
      const data = await response.json()
      const filterData = filterCinta(data, user.location.location)
      const newData = processedCintasData(filterData)
      setCintas(filterData)
      setProcessedCintas(newData)
    } catch (error) {
      throw new Error(error)
    } finally {
      setIsLoading(false); 
    }
  }

  useEffect(() => {
    loadCintas()
  }, [])

  return [cintas, setCintas, processedCintas, setProcessedCintas, isLoading, setIsLoading];
}