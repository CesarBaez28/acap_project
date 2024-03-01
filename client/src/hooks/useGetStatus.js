import { useState, useEffect } from "react"
import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export function useGetStatus (filter) {
  const token = getCookieValue(TOKEN_NAME)
  const [status, setStatus] = useState()

  const loadStatus = async () => {
    try {
      const response = await fetch(API+'/status/findAll', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
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