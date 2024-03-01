import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function getCintasWithDates(initialDate, finalDate) {
  const token = getCookieValue(TOKEN_NAME)
  initialDate = new Date(initialDate).toISOString().replace(/T.*$/, 'T00:00:00');
  finalDate = new Date(finalDate).toISOString().replace(/T.*$/, 'T00:00:00');
  try {
    const response = await fetch(API + `/cintas/findByDate?begin=${initialDate}&end=${finalDate}&status=${1}`, {
      method: 'GET',
      headers: {'Authorization' : 'Bearer ' + token}
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}