import { API } from "../constants"

export async function changePassword(userId, currentPassword, newPassword) {
  try {
    const response = await fetch(API+`/users/update/password/${userId}`,{
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({currentPassword, newPassword})
    })

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error)
  }
}