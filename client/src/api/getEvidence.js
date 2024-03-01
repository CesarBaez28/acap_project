import { API, TOKEN_NAME } from "../constants"
import { processedEvidenceData } from "../utils/processedEvidenceData"
import { getCookieValue } from '../utils/getCookieValue' 

export async function getEvidence(folder) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+'/evidence/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(folder)
    })
    const data = await response.json()
    const processedData = processedEvidenceData(data)
    return processedData
  } catch (error) {
    throw new Error(error)
  }
}