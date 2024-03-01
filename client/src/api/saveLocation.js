import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function saveLocation (location) {
  const token = getCookieValue(TOKEN_NAME)
  
  try {
    const response = await fetch(API+'/location/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },      
      body: JSON.stringify({location, description: "", status: 1})
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}