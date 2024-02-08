import { API } from "../constants"

export async function searchWithDates(search, initialDate, finalDate) {
  initialDate = new Date(initialDate).toISOString().replace(/T.*$/, 'T00:00:00');
  finalDate = new Date(finalDate).toISOString().replace(/T.*$/, 'T00:00:00');

  try {
    const response = await fetch(API + `/cintas/searchWithDates?search=${search}&begin=${initialDate}&end=${finalDate}`, {
      method: 'GET'
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}