import { API } from "../constants"

export async function saveShipmentNotification ({dataNotification}) {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  const isoDateString = date.toISOString();
  
  try {
    const response = await fetch(API+'/shipments/notifications/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
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