import { API } from "../constants"

export async function removePrivileges (position, privileges) {
  try {
    const response = await fetch(API+'/privileges/remove', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({position: position, privileges: [privileges]})
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}