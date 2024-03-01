import { API, TOKEN_NAME } from "../constants"
import { getCookieValue } from '../utils/getCookieValue'

export async function downloadFolderOfEvidence(folderName) {
  const token = getCookieValue(TOKEN_NAME)

  try {
    const response = await fetch(API + `/evidence/download/${folderName}`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer '+ token}
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${folderName}.zip`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(error);
  }
}
