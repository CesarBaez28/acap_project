import { API, TOKEN_NAME } from '../constants'
import { getCookieValue } from '../utils/getCookieValue'

export async function logout () {
  const token = getCookieValue(TOKEN_NAME)
  try {
    const response = await fetch(API+'/logout', {
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + token}
    })
    
    const status = response.status
    return status
  } catch (error) {
    throw new Error(error)
  }
}