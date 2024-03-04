import { useState, useEffect } from "react"
import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export function useGetPositions () {
  const token = getCookieValue(TOKEN_NAME)
  const [positions, setPositions] = useState(null)

  const loadPositions = async () => {
    try {
      const response = await fetch(API+'/positions/findAll', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      const data = await response.json()
      setPositions(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    loadPositions()
  }, [])

  return [positions, setPositions]
}