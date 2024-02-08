import { API } from "../constants"

export async function updateStatusUser (id, state) {
  try {
    const response = await fetch(API+`/users/update/status/${id}/${state}`, {method: 'PUT'})
    const data = await response.text()
    return data
  } catch (error) {
    throw new Error(error)
  }
}