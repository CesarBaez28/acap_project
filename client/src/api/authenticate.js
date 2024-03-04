import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from "../utils/getCookieValue";

export async function authenticate (employeeNumber, password) {
  const token = getCookieValue(TOKEN_NAME)
  try {
    const response = await fetch(API+'/authenticate', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({username: employeeNumber, password})
    })
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error)
  }
}