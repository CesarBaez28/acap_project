import { API } from "../constants"

export async function saveCintasReceived ({shipmetData}) {
  console.log(shipmetData)
  try {
    const response = await fetch(API+'/receiveCintas/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(shipmetData)
    })

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}