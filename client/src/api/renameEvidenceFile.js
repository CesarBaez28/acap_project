import { API } from "../constants"

export async function renameEvidenceFile (folderName, oldFileName, newFileName) {
  try {
    const response = await fetch(API+`/evidence/renameFile/${folderName}/${oldFileName}?newFileName=${newFileName}`,{
      method: 'PUT'
    })
    const data = await response.text()
    return data
  } catch (error) {
    throw new Error(error)
  }
}