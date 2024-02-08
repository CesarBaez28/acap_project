import { useEffect, useState } from 'react'
import { API } from '../constants'

export function useGetBranchOffices () {
  const [branchOffices, setBranchOffices] = useState()

  const loadBranchOffices = async () => {
    try {
      const response = await fetch(API+'/branchOffices/findAll', {method: 'GET'})
      const data = await response.json()
      setBranchOffices(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect( () => {
    loadBranchOffices()
  }, [])

  return [branchOffices, setBranchOffices]
}