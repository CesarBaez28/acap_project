import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function savePosition (position) {
  const token = getCookieValue(TOKEN_NAME)
  try {
    const response = await fetch(API+'/positions/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({description: "", position: position, status: 1})
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}