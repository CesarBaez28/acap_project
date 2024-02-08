import { API } from "../constants"

export async function downloadFolderOfEvidence(folderName) {
  try {
    const response = await fetch(API + `/evidence/download/${folderName}`, {method: 'GET'});
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
