import { API } from "../constants"

export async function getReceivedShipmentByLocationAndDate(locationId, begin, end) {
  begin = new Date(begin).toISOString().replace(/T.*$/, 'T00:00:00');
  end = new Date(end).toISOString().replace(/T.*$/, 'T23:59:59');
  try {
    const response = await fetch(API + `/receiveCintas/findByLocationToAndBetweenDate/${locationId}/${begin}/${end}`, { method: 'GET' })
    
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error(error)
  }
}
