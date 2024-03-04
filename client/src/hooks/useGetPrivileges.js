import { useState, useEffect } from "react";
import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue'

export function useGetPrivileges () {
  const token = getCookieValue(TOKEN_NAME)
  const [privileges, setPrivileges] = useState()

  const loadPrivileges = async () => {
    try {
      const response = await fetch(API+'/privileges/findAll', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      const data = await response.json()
      setPrivileges(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect( () => {
    loadPrivileges()
  }, [])

  return [privileges, setPrivileges]
}