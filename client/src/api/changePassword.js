import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function changePassword(userId, currentPassword, newPassword) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API+`/users/update/password/${userId}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({currentPassword, newPassword})
    })

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error)
  }
}