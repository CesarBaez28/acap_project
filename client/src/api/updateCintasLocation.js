import { API, TOKEN_NAME } from '../constants'
import { getCookieValue } from '../utils/getCookieValue'

export async function updateCintasLocation (cintas, location) {
  const token = getCookieValue(TOKEN_NAME)
  const ids = cintas.map(({id}) => id)

  try {
    const response = await fetch(API+'/cintas/changeLocations', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ids: ids, location: {id: location.value, location: location.label}})
    })
    const status = response.status
    return status
  } catch (error) {
    throw new Error(error)
  }
}