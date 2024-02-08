import { API } from "../constants"

export async function saveCinta(label, description, creationDate, expiryDate, rententionDate, location, statusCinta, id) {
  creationDate = new Date(creationDate)
  expiryDate = new Date(expiryDate)
  rententionDate = new Date(rententionDate)

  try {
    const response = await fetch(API+'/cintas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...(id && { id }),
        location,
        statusCinta,
        label,
        description,
        creationDate,
        expiryDate,
        rententionDate,
        status: 1
      })
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}