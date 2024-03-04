import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function saveFolder(folder) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API + '/folders/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ name: folder, description: "", status: 1 })
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}