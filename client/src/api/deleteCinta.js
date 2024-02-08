import { API } from "../constants"

export async function deleteCinta (id) {
  try {
    const response = await fetch(API+`/cintas/delete/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: 3, state: 'Eliminado'})
    })
    return response.status
  } catch (error) {
    throw new Error(error)
  }
}