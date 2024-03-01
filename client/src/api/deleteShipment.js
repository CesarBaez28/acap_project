import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from "../utils/getCookieValue"

export async function deleteShipment (shipmentId) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+`/shipments/deleteById/${shipmentId}`, {
      method: "DELETE",
      headers: {'Authorization': 'Bearer ' + token}
    })
    const data = response.status
    return data
  } catch (error) {
    throw new Error(error)
  }
}