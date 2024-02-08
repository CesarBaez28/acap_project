import { useEffect, useState } from "react"
import { API } from '../constants'

export function useGetLocations () {
  const [locations, setLocations] = useState()

  const loadLocations = async () => {
    try {
      const response = await fetch(API+'/location/findAll', {method: 'GET'})
      const data = await response.json()
      setLocations(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    loadLocations()
  }, [])

  return [locations, setLocations]
}