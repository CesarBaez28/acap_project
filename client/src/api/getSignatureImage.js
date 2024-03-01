import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function getSignatureImage (path) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+`/signatures/downLoad`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({path: path})
    })
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  } catch (error) {
    throw new Error(error)
  }
}