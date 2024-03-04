import { API, TOKEN_NAME } from "../constants"
import { formatDateDataShipmentsReceived } from "../utils/formatDateData";
import { getCookieValue } from '../utils/getCookieValue'

export async function getReceivedShipmentsBetweenDate (startDate, endDate) {
  const token = getCookieValue(TOKEN_NAME)
  startDate = new Date(startDate).toISOString().replace(/T.*$/, 'T00:00:00');
  endDate = new Date(endDate).toISOString().replace(/T.*$/, 'T23:59:59');
  
  try {
    const response = await fetch(API+`/receiveCintas/findByDateReceived/${startDate}/${endDate}`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token}
    })
    
    const data = await response.json()
    const formattedData = formatDateDataShipmentsReceived(data)
    return formattedData
  } catch (error) {
    throw new Error(error)
  }
}
  