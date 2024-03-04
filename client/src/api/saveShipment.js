import { API, PENDING_STATUS_ID, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function saveShipment ({dataShipment, cintas}) {
  const token = getCookieValue(TOKEN_NAME)
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  const isoDateString = date.toISOString();
  
  const status = { id: PENDING_STATUS_ID} 
  
  const cintasData = cintas.map(item => ({ id: item.id }));

  try {
    const response = await fetch(API+'/shipments/save', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json', 
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        shipment: {...dataShipment, status, date: isoDateString}, 
        cintas: cintasData
      })
    })

    const data = await response.json()
    return data
  } catch (error) {
    throw new(error)
  }
}