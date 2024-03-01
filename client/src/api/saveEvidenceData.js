import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue'

export async function saveEvidenceData(folder, files) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const filesArray = Array.isArray(files) ? files : [files]

    const evidence = filesArray.map((file) => {
      const fileSizeInMB = file.size / (1024 * 1024)
      const roundedFileSize = Math.ceil(fileSizeInMB * 10) / 10;
      return {
        path: `evidence/${folder.name}`,
        name: file.path,
        size: `${roundedFileSize} MB`,
        extension: file.type,
        evidenceDate: new Date(file.lastModifiedDate).toISOString(),
      }
    })

    const response = await fetch(API + '/evidence', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ folders: folder, evidence: evidence }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}
