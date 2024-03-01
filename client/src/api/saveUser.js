import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function saveUser ({userData}) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+'/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + token 
      },
      body: JSON.stringify({...userData})
    })
    const data =  await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}