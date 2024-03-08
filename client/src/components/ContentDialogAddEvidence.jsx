// Importa componentes y estilos necesarios
import { ButtonPrimary } from "./ButtonPrimary"
import { ButtonSecundary } from "./ButtonSecondary"
import { DropZone } from "../components/DropZone"
import "../styles/components/contentDialogAddEvidence.css"

import { useState } from "react";
import PropTypes from 'prop-types'

// Importa funciones de la API y utilidades
import { fileUpload } from "../api/fileUpload"
import { saveEvidenceData } from "../api/saveEvidenceData"

// Importa una función de utilidad para procesar datos de evidencia
import { processedEvidenceData } from "../utils/processedEvidenceData"

/**
 * Componente que representa el contenido del cuadro diálogo para agregar evidencias de cintas.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.setModalShow - Función para controlar la visibilidad del diálogo.
 * @param {function} props.setData - Función para actualizar los datos de evidencia.
 * @param {Array} props.data - Datos actuales de evidencia.
 * @returns {JSX.Element} - Elemento JSX que representa el contenido del diálogo para agregar evidencia.
 */
export function ContentDialogAddEvidence({ setModalShow, setData, data }) {
  // Estado para almacenar archivos seleccionados
  const [files, setFiles] = useState(null)

  // Manejador para la carga de archivos y guardado de evidencia
  const handleUpLoad = async () => {
    // Obtiene el nombre del directorio de la primera carpeta en los datos actuales
    const folderName = data[0].folders.name
    // Obtiene la información de la carpeta
    const folder = data[0].folders

    // Sube los archivos al servidor mediante la función fileUpload de la API
    await fileUpload(files, folderName)

    // Guarda los datos de la evidencia utilizando la función saveEvidenceData de la API
    const evidence = await saveEvidenceData(folder, files)

    // Procesa los datos de evidencia mediante la función processedEvidenceData de utilidad
    const processedEvidence = processedEvidenceData(evidence)

    // Actualiza los datos de evidencia con los nuevos datos procesados
    setData([...data, { ...processedEvidence[0]}])

    // Oculta el diálogo de agregar evidencia
    setModalShow(false)
  };

  // Retorna el contenido JSX del diálogo para agregar evidencia
  return (
    <>
      <div className="drop-zone-add-file">
        {/* Componente DropZone para seleccionar y visualizar archivos */}
        <DropZone setFiles={setFiles} />
      </div>

      <div className="button-container-add-evidence">
        {/* Botón secundario para cancelar la acción */}
        <ButtonSecundary
          styles={{ backgroundColor: "#FFF" }}
          type="button"
          onClick={() => setModalShow(false)}
        >
          Cancelar
        </ButtonSecundary>

        {/* Botón primario para realizar la carga y guardado de evidencia */}
        <ButtonPrimary onClick={handleUpLoad} type="submit">
          Guardar
        </ButtonPrimary>
      </div>
    </>
  );
}

ContentDialogAddEvidence.propTypes = {
  setModalShow: PropTypes.func,
  setData: PropTypes.func,
  data: PropTypes.array
}