import { API, TOKEN_NAME } from "../constants";
import { getCookieValue } from '../utils/getCookieValue'

export async function fileUpload(files, folder) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const formData = new FormData()

    formData.append('folderName', folder);

    for (const element of files) {
      formData.append('files', element);
    }
    
    const response = await fetch(API+'/evidence/uploadFiles', {
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + token},
      body: formData
    })

    const data = await response.json()
    console.log(data)
  } catch (error) {
    throw new Error(error)
  }
}