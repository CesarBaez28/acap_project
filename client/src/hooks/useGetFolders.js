import { useEffect, useState } from "react"
import { API } from "../constants"

export function useGetFolders () {
  const [folders, setFolders] = useState()

  const loadFolders = async () => {
    try {
      const response = await fetch(API+'/folders/findAll', {method: 'GET'})
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