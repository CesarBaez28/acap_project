import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from "../utils/getCookieValue"

export async function getCintas() {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API + '/cintas/1', { 
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}