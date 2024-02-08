import { API } from "../constants";

export async function login (employeeNumber, password, setErrors) {
  try {
    const response = await fetch(API+'/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ employeeNumber, password})
    })

    const data = await response.json()

    if (data?.error) { 
      setErrors({password: data.error})
      return false;
    }
    return data
  } catch (error) {
    setErrors({password: "Hubo un error en el servidor"})
  }
}