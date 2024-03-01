import { useEffect, useState } from "react"
import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export function useGetFolders () {
  const token = getCookieValue(TOKEN_NAME)
  const [folders, setFolders] = useState()

  const loadFolders = async () => {
    try {
      const response = await fetch(API+'/folders/findAll', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      const data =  await response.json()
      setFolders(data)
    } catch (error) {
      throw new Error(error)
    }
  } 

  useEffect(() => {
    loadFolders()
  },[])

  return [folders, setFolders]
}