import { API } from "../constants"

export async function getPermissions (position) {

  try {
    const response = await fetch(API+'/privileges/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(position)
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}