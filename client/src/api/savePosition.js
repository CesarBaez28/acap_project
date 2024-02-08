import { API } from "../constants"

export async function savePosition (position) {
  try {
    const response = await fetch(API+'/positions/save', {
      method: 'POST',
      headers: {'Content-Type': 'Application/json'},
      body: JSON.stringify({description: "", position: position, status: 1})
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}