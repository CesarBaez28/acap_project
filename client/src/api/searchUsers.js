import { API } from "../constants"
import { processedUserData } from "../utils/processedUserData"

export async function searchUsers (search, userId) {
  try {
    const response = await fetch(API+`/users/search?search=${search}&userId=${userId}`, {method: 'GET'})
    const data = await response.json()
    const processedData = processedUserData(data)
    return processedData
  } catch (error) {
    throw new Error(error)
  }
}