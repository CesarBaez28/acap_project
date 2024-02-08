import { API } from "../constants"

export async function saveBranchOffice ({branchOffice}) {
  try {
    const response = await fetch(API+'/branchOffices/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(branchOffice)
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}