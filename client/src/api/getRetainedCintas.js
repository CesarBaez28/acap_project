import { API } from "../constants"

export async function getRetainedCintas (locationId) {
  const date = new Date().toISOString().replace(/T.*$/, 'T00:00:00')

  try {
    const response = await fetch(API+`/cintas/getRetainedCintas/${date}/${locationId}`, {
      method: 'GET'
    })

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}