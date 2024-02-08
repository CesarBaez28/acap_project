import { API } from "../constants"

export async function deleteDataEvidence(file) {
  try {
    const evidence = [{
      id: file.id,
      path: file.path,
      name: file.name,
      size: file.size,
      extension: file.extension
    }]

    const response = await fetch(API+'/evidence/remove', {
      method: 'POST',
      headers: {'Content-Type': 'Application/json'},
      body: JSON.stringify({folders: file.folders, evidence: evidence})
    })

    const data = await response.json()
    console.log(data)
    return data
  }
  catch (error) {
    throw new Error(error)
  }
}