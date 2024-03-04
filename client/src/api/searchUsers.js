import { API, TOKEN_NAME } from "../constants"
import { processedUserData } from "../utils/processedUserData"
import { getCookieValue } from '../utils/getCookieValue'

export async function searchUsers (search, userId) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+`/users/search?search=${search}&userId=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    const data = await response.json()
    const processedData = processedUserData(data)
    return processedData
  } catch (error) {
    throw new Error(error)
  }
}