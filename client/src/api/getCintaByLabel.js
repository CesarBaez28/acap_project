import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function getCintaByLabel (label) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+`/cintas/findByLabel/${label}`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}