import { API } from "../constants"

export async function saveFolder (folder) {
 try {
  const response = await fetch(API+'/folders/save', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: folder, description: "", status: 1})
  })
  const data = await response.json()
  return data
 } catch (error) {
  throw new Error(error)
 } 
}