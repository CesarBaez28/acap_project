import { API } from "../constants"

export async function deleteShipment (shipmentId) {
  try {
    const response = await fetch(API+`/shipments/deleteById/${shipmentId}`, {method: "DELETE"})
    const data = response.status
    return data
  } catch (error) {
    throw new Error(error)
  }
}