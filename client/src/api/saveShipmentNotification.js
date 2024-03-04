import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function saveShipmentNotification ({dataNotification}) {
  const token = getCookieValue(TOKEN_NAME)
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  const isoDateString = date.toISOString();
  
  try {
    const response = await fetch(API+'/shipments/notifications/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        shipment: dataNotification.shipment,
        message: dataNotification.message,
        date: isoDateString
      })
    })

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}