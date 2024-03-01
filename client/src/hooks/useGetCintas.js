import { useState, useEffect, useContext } from "react"
import { API, TOKEN_NAME } from "../constants"
import { processedCintasData } from "../utils/processedCintasData"
import { UserContext } from "../contexts/userContext"
import { filterCinta } from "../utils/filterCinta"
import { getCookieValue } from "../utils/getCookieValue"

export function useGetCintas() {
  const token = getCookieValue(TOKEN_NAME)
  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const [cintas, setCintas] = useState()
  const [processedCintas, setProcessedCintas] = useState()

  const loadCintas = async () => {
    try {
      setIsLoading(true); 

      const response = await fetch(API + '/cintas/1', { 
        method: 'GET', credentials: 'include',
        headers: {'Authorization': 'Bearer ' + token}
       })
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