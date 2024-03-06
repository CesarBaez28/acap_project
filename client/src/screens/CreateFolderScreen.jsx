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

/**
 * Contenido específico de la pantalla de creación de carpeta de evidencias..
 *
 * @returns {JSX.Element} - Elemento JSX que contiene el formulario y la información relacionada con la creación de carpeta.
 */
const Content = () => {
  const [files, setFiles] = useState([]); // Estado para gestionar los archivos seleccionados
  const navigate = useNavigate();

  /**
   * Manejador de la creación de carpeta que realiza llamadas a la API para crear la carpeta, subir archivos y guardar datos de evidencia.
   * Navega a la página de evidencias después de completar la creación y resetea el formulario.
   *
   * @param {Object} values - Valores del formulario (nombre de la carpeta).
   * @param {Function} resetForm - Función proporcionada por Formik para resetear el formulario después de la creación.
   */
  const handleCreateFolder = async (values, resetForm) => {
    const { name } = values;
    // Llama a la API para crear la carpeta
    const folder = await saveFolder(name);
    // Llama a la API para subir archivos
    await fileUpload(files, name);
    // Llama a la API para guardar datos de evidencia
    await saveEvidenceData(folder, files);
    // Navega a la página de evidencias y resetea el formulario
    navigate('/evidence');
    resetForm();
  }

  return (
    <>
      <h2 className="title-create-folder">Crear carpeta de evidencias</h2>

      {/* Formulario Formik para gestionar el estado del formulario y las validaciones */}
      <section className="input-section-create-folder col-md-5 col-lg-3">
        <Formik
          initialValues={initialValues}
          validationSchema={folderValidationSchema}
          onSubmit={(values, actions) => {
            handleCreateFolder(values, actions.resetForm);
          }}
        >
          <Form>
            {/* Campo de entrada para el nombre de la carpeta */}
            <TextInput
              label={'Nombre de la carpeta: '}
              name='name'
              type='text'
              autoComplete='name'
            />

            {/* Zona de arrastre para subir archivos */}
            <div className="drop-zone-create-folder">
              <DropZone setFiles={setFiles} />
            </div>

            {/* Botones para cancelar o guardar la carpeta */}
            <div className="button-container-create-folder">
              <ButtonSecundaryLink href={'/evidence'}>Cancelar</ButtonSecundaryLink>
              <ButtonPrimary type="submit">Guardar</ButtonPrimary>
            </div>
          </Form>
        </Formik>
      </section>
    </>
  );
};


/**
 * Componente que representa la pantalla de creación de una carpeta de evidencias.
 * Muestra un formulario con un campo para el nombre de la carpeta y una zona de arrastre para subir archivos.
 * Al enviar el formulario, realiza llamadas a la API para crear la carpeta, subir archivos y guardar datos de evidencia.
 * Navega a la página de evidencias después de completar la creación.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de creación de carpeta de evidencias.
 */
export function CreateFolderScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}