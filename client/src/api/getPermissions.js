import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function getPermissions (position) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+'/privileges/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(position)
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}