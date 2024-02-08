import { API } from "../constants"

export async function getCintaByLabel (label) {
  try {
    const response = await fetch(API+`/cintas/findByLabel/${label}`, {method: 'GET'})
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}