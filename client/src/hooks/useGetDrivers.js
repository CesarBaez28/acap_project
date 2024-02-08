import { useState, useEffect } from "react"
import { API } from "../constants";

export function useGetDrivers () {
  const [drivers, setDrivers] = useState(null)

  const loadData = async () => {
    try {
      const response = await fetch(API+'/drivers/findAll', { method: 'GET'})
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