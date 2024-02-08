import { API } from '../constants'
import { formatDateData } from '../utils/formatDateData';

export async function getShipmentsBetweenDate (startDate, endDate) {
  startDate = new Date(startDate).toISOString().replace(/T.*$/, 'T00:00:00');
  endDate = new Date(endDate).toISOString().replace(/T.*$/, 'T23:59:59');
  try {
    const response = await fetch(API+`/shipments/findByDateBetween/${startDate}/${endDate}`, {method: 'GET'})
    const data = await response.json()
    const formattedData = formatDateData(data)
    return formattedData
  } catch (error) {
    throw new Error(error)
  }
}