import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from "../utils/getCookieValue";

export async function getExpiredCintas(locationId) {
  const token = getCookieValue(TOKEN_NAME)
  const date = new Date().toISOString().replace(/T.*$/, 'T00:00:00');

  try {
    const response = await fetch(API+`/cintas/getExpiredCintas/${date}/${locationId}`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}