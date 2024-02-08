import { API } from "../constants"

export async function saveDriver (name) {
  try {
    const response = await fetch(API+'/drivers/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },      
      body: JSON.stringify({name, status: 1})
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}