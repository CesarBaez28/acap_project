import { API } from "../constants"

export async function editUser ({userData}) {
  try {
    const response = await fetch(API+'/users', {
      method: 'PUT',
      headers: {'Content-Type': 'Application/json'},
      body: JSON.stringify({...userData})
    })
    const data =  await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}