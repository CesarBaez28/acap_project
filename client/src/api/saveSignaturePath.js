import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function saveSignaturePath (path) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+'/signatures/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({path})
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}