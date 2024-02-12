import { API } from "../constants"

export async function saveSignaturePath (path) {
  try {
    const response = await fetch(API+'/signatures/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({path})
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}