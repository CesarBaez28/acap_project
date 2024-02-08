import { ButtonPrimary } from "./ButtonPrimary"
import { ButtonSecundary } from "./ButtonSecondary"
import { DropZone } from "../components/DropZone"

import "../styles/components/contentDialogAddEvidence.css"
import { useState } from "react"
import { fileUpload } from "../api/fileUpload"
import { saveEvidenceData } from "../api/saveEvidenceData"

import { processedEvidenceData } from "../utils/processedEvidenceData"

export function ContentDialogAddEvidence({ setModalShow, setData, data }) {
  const [files, setFiles] = useState(null)

  const handleUpLoad = async () => {
    const folderName = data[0].folders.name
    const folder = data[0].folders
    await fileUpload(files, folderName)
    const evidence = await saveEvidenceData(folder, files)
    const processedEvidence = processedEvidenceData(evidence)
    setData([...data, { ...processedEvidence[0]}])
    setModalShow(false)
  }

  return <>
    <div className="drop-zone-add-file">
      <DropZone setFiles = {setFiles}/>
    </div>

    <div className="button-container-add-evidence">
      <ButtonSecundary
        styles={{ backgroundColor: "#FFF" }}
        type="button"
        onClick={() => setModalShow(false)}
      >
        Cancelar
      </ButtonSecundary>
      <ButtonPrimary onClick={handleUpLoad} type="submit">Guardar</ButtonPrimary>
    </div>
  </>
}