import { SideBar } from "../components/SideBar"
import { Header } from "../components/Header"
import { MainContent } from "../components/MainContent"
import { ButtonCreateLink } from "../components/ButtonCreateLink"
import { InputSelect } from "../components/InputSelectWithData"
import { Table } from "../components/TableEvidence"
import { ButtonSecundary } from "../components/ButtonSecondary"
import { Dialog } from "../components/Dialog"
import { ContentDialogAddEvidence } from "../components/ContentDialogAddEvidence"

import '../styles/screens/evidenceScreen.css'
import PlusSvg from '../assets/plus.svg?react'

import { useGetFolders } from "../hooks/useGetFolders"
import { useContext, useState } from "react"
import { getEvidence } from "../api/getEvidence"
import { AccessibleOption } from "../components/AccesibleOption"
import { UserContext } from "../contexts/userContext"
import { ACCESS } from "../constants"
import { downloadFolderOfEvidence } from "../api/downLoadFolderOfEvidence"

  /**
   * Contenido específico de la pantalla de gestión de evidencias.
   * Permite al usuario seleccionar una carpeta y visualizar sus evidencias asociadas.
   * Proporciona opciones para crear nuevas carpetas, añadir evidencias y descargar una carpeta de evidencias.
   *
   * @returns {JSX.Element} - Elemento JSX que contiene la interfaz de gestión de evidencias.
   */
  const Content = () => {
    const { permissions } = useContext(UserContext);
    const [modalShow, setModalShow] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [evidence, setEvidence] = useState(null);

    /**
     * Manejador de evento para descargar la carpeta de evidencias seleccionada.
     * Invoca la función de descarga de carpeta de evidencias con el nombre de la carpeta seleccionada.
     *
     * @async
     */
    const handleDownLoadFolder = async () => {
      await downloadFolderOfEvidence(selectedOption.label);
    };

    return (
      <>
        <h2 className="title-evidence">Evidencias</h2>

        <div className="input-area-evidence">
          {/* Botón para crear una nueva carpeta de evidencias */}
          <ButtonCreateLink href={'/createFolder'} svg={<PlusSvg />} text={'Crear carpeta'} />

          <div className="input-select-evidence-container">
            {/* Selector de carpeta de evidencias */}
            <InputSelect
              setData={setEvidence}
              value={selectedOption}
              setValue={setSelectedOption}
              atributes={['name']}
              placeholder={'Seleccionar carpeta'}
              getOptionsFunction={useGetFolders}
              getDataFunction={getEvidence}
            />

            {evidence !== null ? (
              <div className="buttons-evidence-container">
                {/* Opción para añadir evidencia (condicional basada en los permisos del usuario) */}
                <AccessibleOption
                  permissions={permissions}
                  privilegesId={ACCESS.ADD_EVIDENCE}
                  Option={
                    <ButtonSecundary
                      styles={{ padding: "0.56rem 1rem" }}
                      type="button"
                      onClick={() => setModalShow(true)}
                    >
                      Añadir evidencia
                    </ButtonSecundary>
                  }
                />
                
                {/* Botón para descargar la carpeta de evidencias seleccionada */}
                <ButtonSecundary
                  styles={{ padding: "0.56rem 1rem" }}
                  type="button"
                  onClick={handleDownLoadFolder}
                >
                  Descargar carpeta
                </ButtonSecundary>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          {/* Tabla que muestra las evidencias asociadas a la carpeta seleccionada */}
          {evidence !== null ? (
            <Table
              columns={['Nombre: ', 'Fecha:', 'Tamaño:', 'Tipo:']}
              atributes={['name', 'evidenceDate', 'size', 'extension']}
              data={evidence}
              setData={setEvidence}
            />
          ) : (
            <div> </div>
          )}

          {/* Diálogo para añadir evidencias a la carpeta seleccionada */}
          <Dialog
            ContentDialog={
              <ContentDialogAddEvidence
                setModalShow={setModalShow}
                data={evidence}
                setData={setEvidence}
              />
            }
            title={'Añadir evidencia'}
            open={modalShow}
          />
        </div>
      </>
    );
  };


/**
 * Componente que representa la pantalla de gestión de evidencias..
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de gestión de evidencias.
 */
export function EvidenceScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}