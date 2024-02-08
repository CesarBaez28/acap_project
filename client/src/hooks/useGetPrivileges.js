import { useState, useEffect } from "react";
import { API } from "../constants";

export function useGetPrivileges () {
  const [privileges, setPrivileges] = useState()

  const loadPrivileges = async () => {
    try {
      const response = await fetch(API+'/privileges/findAll', {method: 'GET'})
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