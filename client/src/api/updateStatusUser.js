import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function updateStatusUser (id, state) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+`/users/update/status/${id}/${state}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    const data = await response.text()
    return data
  } catch (error) {
    throw new Error(error)
  }
}