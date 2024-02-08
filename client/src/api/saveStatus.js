import { API } from "../constants"

export async function saveStatus (state) {
  try {
    const response = await fetch(API+'/status/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },        
      body: JSON.stringify({state, description: ''})
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}