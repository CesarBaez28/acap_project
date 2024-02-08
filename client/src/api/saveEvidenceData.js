import { API } from "../constants";

export async function saveEvidenceData(folder, files) {
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folders: folder, evidence: evidence }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}
