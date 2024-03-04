import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function uploadSignatureImage (base64Image, directoryName) {
  const token = getCookieValue(TOKEN_NAME)
  try {
    const response = await fetch(API+`/signatures/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({base64Image, directoryName})
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}