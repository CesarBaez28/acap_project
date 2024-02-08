import { API } from "../constants"

export async function deleteEvidenceFile (folderName, fileName) {
  try {
    const response = await fetch(API+`/evidence/deleteFile/${folderName}/${fileName}`, {method: 'DELETE'})
    const data = await response.text()
    return data
  } catch (error) {
    throw new Error(error)
  }
}