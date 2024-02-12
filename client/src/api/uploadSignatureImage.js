import { API } from "../constants"

export async function uploadSignatureImage (base64Image, directoryName) {
  try {
    const response = await fetch(API+`/signatures/upload`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({base64Image, directoryName})
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}