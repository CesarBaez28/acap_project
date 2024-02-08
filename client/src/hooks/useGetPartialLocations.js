import {useEffect, useState } from "react"
import { API } from '../constants'

export function useGetPartialLocations (filter) {
  const [locations, setLocations] = useState()

  const loadLocations = async () => {
    try {
      const response = await fetch(API+'/location/findAll', {method: 'GET'})
      const data = await response.json()
      const filterData = data.filter(item => !filter.includes(item.location))
      setLocations(filterData)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    loadLocations()
  }, [])

  return [locations, setLocations]
}