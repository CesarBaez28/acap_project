import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function deleteCinta (id) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+`/cintas/delete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({id: 3, state: 'Eliminado'})
    })
    return response.status
  } catch (error) {
    throw new Error(error)
  }
}