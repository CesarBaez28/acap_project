import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function deleteEvidenceFile (folderName, fileName) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+`/evidence/deleteFile/${folderName}/${fileName}`, {
      method: 'DELETE',
      headers: {'Authorization': 'Bearer ' + token}
    })
    const data = await response.text()
    return data
  } catch (error) {
    throw new Error(error)
  }
}