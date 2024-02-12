import { API } from "../constants"

export async function getSignatureImage (path) {
  try {
    const response = await fetch(API+`/signatures/downLoad`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({path: path})
    })
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  } catch (error) {
    throw new Error(error)
  }
}