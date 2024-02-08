import { API } from "../constants"

export async function getShipmentsByUserAndBetweenDates(userId, begin, end) {
  begin = new Date(begin).toISOString().replace(/T.*$/, 'T00:00:00');
  end = new Date(end).toISOString().replace(/T.*$/, 'T23:59:59');
  try {
    const response = await fetch(API + `/shipments/findByUserAndBetweenDates/${userId}/${begin}/${end}`, { method: 'GET' })
    
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error(error)
  }
}
