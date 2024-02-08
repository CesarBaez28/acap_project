import { API } from "../constants"

export async function getCintas() {
  try {
    const response = await fetch(API + '/cintas/1', { method: 'GET' })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}