import { API } from "../constants"

export async function assignPrivileges (position, privileges) {
  try {
    const response = await fetch(API+'/privileges', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({position: position, privileges: [privileges]})
    })
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error(error)
  }
}