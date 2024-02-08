import { API } from "../constants"
import { processedEvidenceData } from "../utils/processedEvidenceData"

export async function getEvidence(folder) {
  try {
    const response = await fetch(API+'/evidence/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(folder)
    })
    const data = await response.json()
    const processedData = processedEvidenceData(data)
    return processedData
  } catch (error) {
    throw new Error(error)
  }
}