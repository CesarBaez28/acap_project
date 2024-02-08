import { API } from '../constants'

export async function updateNameEvidence (evidenceData, newName) {
  try {
    const response = await fetch(API+`/evidence/rename/${evidenceData.id}/${newName}`, {
      method: 'PUT',
    })
    const data = await response.text()
    console.log(data)
    return data
  } catch (error) {
    throw new Error(error)
  }
}