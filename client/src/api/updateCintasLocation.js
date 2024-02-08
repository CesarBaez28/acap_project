import { API } from '../constants'

export async function updateCintasLocation (cintas, location) {

  const ids = cintas.map(({id}) => id)

  try {
    const response = await fetch(API+'/cintas/changeLocations', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ids: ids, location: {id: location.value, location: location.label}})
    })
    const status = response.status
    return status
  } catch (error) {
    throw new Error(error)
  }
}