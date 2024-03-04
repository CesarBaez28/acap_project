import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function renameEvidenceFile (folderName, oldFileName, newFileName) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+`/evidence/renameFile/${folderName}/${oldFileName}?newFileName=${newFileName}`,{
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + token}
    })
    const data = await response.text()
    return data
  } catch (error) {
    throw new Error(error)
  }
}