import { useState, useEffect } from "react"
import { API } from "../constants"

export function useGetPositions () {
  const [positions, setPositions] = useState(null)

  const loadPositions = async () => {
    try {
      const response = await fetch(API+'/positions/findAll', {method: 'GET'})
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