import { API, TOKEN_NAME } from '../constants'
import { getCookieValue } from '../utils/getCookieValue'

export async function updateNameEvidence (evidenceData, newName) {
  const token = getCookieValue(TOKEN_NAME)
  try {
    const response = await fetch(API+`/evidence/rename/${evidenceData.id}/${newName}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    const data = await response.text()
    return data
  } catch (error) {
    throw new Error(error)
  }
}