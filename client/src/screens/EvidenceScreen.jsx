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

const Content = () => {
  const { permissions } = useContext(UserContext)
  const [modalShow, setModalShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [evidence, setEvidence] = useState(null)

  const handleDownLoadFolder = async () => {
    await downloadFolderOfEvidence(selectedOption.label)
  }

  return <>
    <h2 className="title-evidence">Evidencias</h2>

    <div className="input-area-evidence">
      <ButtonCreateLink href={'/createFolder'} svg={<PlusSvg />} text={'Crear carpeta'} />
      <div className="input-select-evidence-container">
        <InputSelect
          setData={setEvidence}
          value={selectedOption}
          setValue={setSelectedOption}
          atributes={['name']}
          placeholder={'Seleccionar carpeta'}
          getOptionsFunction={useGetFolders}
          getDataFunction={getEvidence}
        />

        {evidence !== null
          ?
          <div className="buttons-evidence-container">
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
            <ButtonSecundary
              styles={{padding: "0.56rem 1rem" }}
              type="button"
              onClick={handleDownLoadFolder}
            >
              Descargar carpeta
            </ButtonSecundary>
          </div>
          : <div></div>
        }
      </div>
      {evidence !== null
        ? <Table
          columns={['Nombre: ', 'Fecha:', 'Tamaño:', 'Tipo:']}
          atributes={['name', 'evidenceDate', 'size', 'extension']}
          data={evidence}
          setData={setEvidence}
        />
        : <div> </div>
      }

      <Dialog
        ContentDialog=
        {
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
}

export function EvidenceScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}