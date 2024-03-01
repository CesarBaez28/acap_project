import { API } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function saveShipmentNotification ({dataNotification}) {
  const token = getCookieValue()
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
    console.log(data)
    return data
  } catch (error) {
    throw new Error(error)
  }
}