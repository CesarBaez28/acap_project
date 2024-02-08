import { API } from "../constants"
import { processedUserData } from "../utils/processedUserData"

export async function getUsers (state, usersId) {
  try {
    const response = await fetch(API+`/users/find/${state}/${usersId}`, { method: 'GET',})
    const data = await response.json()
    const processedData = processedUserData(data)
    return processedData
  } catch (error) {
    throw new Error(error)
  }
}