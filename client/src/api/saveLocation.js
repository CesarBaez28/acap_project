import { API } from "../constants"

export async function saveLocation (location) {
  try {
    const response = await fetch(API+'/location/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },      
      body: JSON.stringify({location, description: "", status: 1})
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}