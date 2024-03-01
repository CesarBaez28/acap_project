import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function getReceivedShipmentByLocationAndDate(locationId, begin, end) {
  const token = getCookieValue(TOKEN_NAME)
  begin = new Date(begin).toISOString().replace(/T.*$/, 'T00:00:00');
  end = new Date(end).toISOString().replace(/T.*$/, 'T23:59:59');
  
  try {
    const response = await fetch(API + `/receiveCintas/findByLocationToAndBetweenDate/${locationId}/${begin}/${end}`, { 
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    })
    
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error(error)
  }
}
