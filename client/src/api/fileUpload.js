import { API } from "../constants";

export async function fileUpload(files, folder) {
  try {
    const formData = new FormData()

    formData.append('folderName', folder);

    for (const element of files) {
      formData.append('files', element);
    }
    
    const response = await fetch(API+'/evidence/uploadFiles', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()
    console.log(data)
  } catch (error) {
    throw new Error(error)
  }
}