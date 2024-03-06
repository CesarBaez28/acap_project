import { SideBar } from "../components/SideBar"
import { Header } from "../components/Header"
import { MainContent } from "../components/MainContent"
import { ButtonPrimary } from "../components/ButtonPrimary.jsx"
import { ButtonSecundary } from "../components/ButtonSecondary.jsx"

import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { TextInput } from '../components/TextInput.jsx'
import { CreatableInputSelect } from "../components/CreatableInputSelectFormik.jsx"
import { cintaValidationSchema } from '../validactionsSchemas/cintaValidationSchema.js'

import '../styles/screens/createCintaScreen.css'
import { useGetLocations } from "../hooks/useGetLocations.js"
import { useGetStatus } from "../hooks/useGetStatus.js"
import { ButtonSecundaryLink } from "../components/ButtonSecondaryLink.jsx"
import { saveCinta } from "../api/saveCinta.js"
import { saveStatus } from "../api/saveStatus.js"
import { saveLocation } from "../api/saveLocation.js"
import { useState } from "react"

import { NOT_STATUS_CINTAS } from "../constants.js"

const currentDate = new Date();
const defaultRententionDate = new Date();
defaultRententionDate.setFullYear(currentDate.getFullYear() + 10);

const initialValues = {
  label: '',
  description: '',
  creationDate: currentDate.toISOString().split('T')[0],
  expireDate: currentDate.toISOString().split('T')[0],
  rententionDate: defaultRententionDate.toISOString().split('T')[0],
  location: '',
  statusCinta: 1 // means status cinta equal to vigente
};

/**
 * Contenido específico de la pantalla de registro de cinta de backup.
 *
 * @returns {JSX.Element} - Elemento JSX que contiene el formulario y la información relacionada con la creación de la cinta.
 */
const Content = () => {
  const [locations, setLocations] = useGetLocations();
  const [status, setStatus] = useGetStatus(NOT_STATUS_CINTAS);
  const navigate = useNavigate();
  const [addYears, setAddYears] = useState(currentDate.toISOString().split('T')[0]);

  /**
   * Función para agregar tres años a la fecha de expiración.
   */
  const addThreeYears = () => {
    const newExpireDate = new Date();
    newExpireDate.setFullYear(newExpireDate.getFullYear() + 3);
    setAddYears(newExpireDate.toISOString().split('T')[0]);
  }

  /**
   * Función para agregar cinco años a la fecha de expiración.
   */
  const addFiveYears = () => {
    const newExpireDate = new Date();
    newExpireDate.setFullYear(newExpireDate.getFullYear() + 5);
    setAddYears(newExpireDate.toISOString().split('T')[0]);
  }

  /**
   * Manejador de la creación de la cinta que realiza llamadas a la API para guardar información y navega a la página de inventario.
   *
   * @param {Object} values - Valores del formulario (label, descripción, fechas, ubicación, estado, etc.).
   * @param {Object} actions - Funciones del formulario proporcionadas por Formik.
   */
  const createCintaHandler = async (values, actions) => {
    let { label, description, creationDate, expireDate, rententionDate, location, statusCinta } = values;

    // Actualiza la fecha de expiración con la fecha con años adicionados
    expireDate = addYears;

    // Obtiene la ubicación y el estado correspondientes a los IDs seleccionados
    location = locations.find(({ id }) => id === location);
    statusCinta = status.find(({ id }) => id === statusCinta);

    // Llama a la API para guardar la cinta
    await saveCinta(label, description, creationDate, expireDate, rententionDate, location, statusCinta);

    // Navega a la página de inventario y resetea el formulario
    navigate('/inventory');
    actions.resetForm();
  }

  return (
    <>
      <h2 className="create-cinta-title">Registrar cinta de backup</h2>

      {/* Formulario Formik para gestionar el estado del formulario y las validaciones */}
      <div className="input-section-create-cinta col-md-3">
        <Formik
          initialValues={initialValues}
          validationSchema={cintaValidationSchema}
          onSubmit={(values, actions) => {
            createCintaHandler(values, actions);
          }}
        >
          <Form>
            {/* Campos de entrada para la información de la cinta */}
            <TextInput
              label={'Label: '}
              name='label'
              type='text'
              autoComplete='label'
            />
            <TextInput
              label={'Descripción: '}
              name='description'
              type='text'
              autoComplete='description'
            />

            {/* Selector creatable para la ubicación */}
            <CreatableInputSelect
              data={locations}
              setData={setLocations}
              attributes={['location']}
              createFunction={saveLocation}
              label={'Ubicación: '}
              name='location'
            />

            {/* Selector creatable para el estado */}
            <CreatableInputSelect
              data={status}
              setData={setStatus}
              attributes={['state']}
              createFunction={saveStatus}
              label={'Estado: '}
              name='statusCinta'
            />

            {/* Campos de entrada para las fechas */}
            <TextInput
              label={'Fecha de creación: '}
              name='creationDate'
              type='date'
              autoComplete='creationDate'
            />
            <div className="expiry-date-container">
              <div className="col-12">
                <TextInput
                  label={'Fecha de expiración: '}
                  name='expireDate'
                  type='date'
                  value={addYears}
                  autoComplete='expireDate'
                />
              </div>
              {/* Botones para agregar años a la fecha de expiración */}
              <div className="expiry-date-buttons-container">
                <div className="expiry-date-buttons">
                  <ButtonSecundary onClick={addThreeYears} styles={{ padding: '0.5rem', marginTop: '0.3rem', borderColor: "#CDCDCD" }} type="button">+3</ButtonSecundary>
                  <ButtonSecundary onClick={addFiveYears} styles={{ padding: '0.5rem', marginTop: '0.3rem', borderColor: "#CDCDCD" }} type="button">+5</ButtonSecundary>
                </div>
              </div>
            </div>
            <TextInput
              label={'Fecha de retención: '}
              name='rententionDate'
              type='date'
              autoComplete='rententionDate'
            />

            {/* Botones para cancelar o guardar la cinta */}
            <div className="button-container-create-cinta">
              <ButtonSecundaryLink href="/inventory" >Cancelar</ButtonSecundaryLink>
              <ButtonPrimary type="submit">Guardar</ButtonPrimary>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};


/**
 * Componente que representa la pantalla de registro de una cinta de backup.
 * Muestra un formulario con campos para la información de la cinta, como label, descripción, ubicación, estado, fechas, etc.
 * Incluye opciones para seleccionar una ubicación y estado existentes o crear nuevos en caso necesario.
 * Proporciona funcionalidad para añadir años a la fecha de expiración y manejar la creación de la cinta.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de registro de cinta de backup.
 */
export function CreateCintaScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}