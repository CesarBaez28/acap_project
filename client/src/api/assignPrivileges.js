import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function assignPrivileges (position, privileges) {
  const token = getCookieValue(TOKEN_NAME)
  try {
    const response = await fetch(API+'/privileges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({position: position, privileges: [privileges]})
    })
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error(error)
  }
}