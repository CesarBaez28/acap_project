import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function saveBranchOffice ({branchOffice}) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+'/branchOffices/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(branchOffice)
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}