import { useState, useEffect } from "react"
import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from "../utils/getCookieValue";

export function useGetDrivers () {
  const token = getCookieValue(TOKEN_NAME)
  const [drivers, setDrivers] = useState(null)

  const loadData = async () => {
    try {
      const response = await fetch(API+'/drivers/findAll', { 
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      const data = await response.json();
      setDrivers(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return [drivers, setDrivers]
}