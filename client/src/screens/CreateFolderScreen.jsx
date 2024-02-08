import { SideBar } from "../components/SideBar"
import { Header } from "../components/Header"
import { MainContent } from "../components/MainContent"
import '../styles/screens/createFolder.css'

import { Formik, Form } from "formik"
import { folderValidationSchema } from "../validactionsSchemas/folderValidationSchema"
import { TextInput } from "../components/TextInput"
import { ButtonPrimary } from "../components/ButtonPrimary"
import { ButtonSecundaryLink } from "../components/ButtonSecondaryLink"
import { DropZone } from "../components/DropZone"
import { useState } from "react"
import { saveFolder } from "../api/saveFolder"
import { fileUpload } from "../api/fileUpload"
import { saveEvidenceData } from "../api/saveEvidenceData"

import { useNavigate } from 'react-router-dom'

const initialValues = {
  name: ''
}

const Content = () => {
  const [files, setFiles] = useState([])
  const navigate = useNavigate()

  const handleCreateFolder = async (values, resetForm) => {
    const { name } = values
    const folder = await saveFolder(name)
    await fileUpload(files, name)
    await saveEvidenceData(folder, files)
    navigate('/evidence')
    resetForm()
  }

  return <>
    <h2 className="title-create-folder">Crear carpeta de evidencias</h2>
    <section className="input-section-create-folder col-md-5 col-lg-3">
      <Formik
        initialValues={initialValues}
        validationSchema={folderValidationSchema}
        onSubmit={(values, actions) => {
          handleCreateFolder(values, actions.resetForm)
        }}
      >
        <Form>
          <TextInput
            label={'Nombre de la carpeta: '}
            name='name'
            type='text'
            autoComplete='name'
          />

          <div className="drop-zone-create-folder">
            <DropZone setFiles={setFiles} />
          </div>

          <div className="button-container-create-folder">
            <ButtonSecundaryLink href={'/evidence'}>Cancelar</ButtonSecundaryLink>
            <ButtonPrimary type="submit">Guardar</ButtonPrimary>
          </div>
        </Form>
      </Formik>
    </section>
  </>
}

export function CreateFolderScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}