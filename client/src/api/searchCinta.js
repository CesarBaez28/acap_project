import { API } from '../constants'

export async function searchCinta(search) {
  try {
    const response = await fetch(API + `/cintas/search/${search}`, { method: 'GET' })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}