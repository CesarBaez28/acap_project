import { useState, useEffect } from "react"
import { API } from "../constants"

export function useGetStatus (filter) {
  const [status, setStatus] = useState()

  const loadStatus = async () => {
    try {
      const response = await fetch(API+'/status/findAll', {method: 'GET'})
      const data = await response.json()
      const filterData = data.filter(item => !filter.includes(item.state))
      setStatus(filterData)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect( () => {
    loadStatus()
  }, [])

  return [status, setStatus]
}