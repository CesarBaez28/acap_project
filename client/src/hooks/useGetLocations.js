import { useEffect, useState } from "react"
import { API, TOKEN_NAME } from '../constants'
import { getCookieValue } from '../utils/getCookieValue'

export function useGetLocations () {
  const token = getCookieValue(TOKEN_NAME)
  const [locations, setLocations] = useState()

  const loadLocations = async () => {
    try {
      const response = await fetch(API+'/location/findAll', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
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