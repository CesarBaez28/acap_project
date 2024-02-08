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

const Content = () => {
  const [locations, setlocations] = useGetLocations()
  const [status, setStatus] = useGetStatus(NOT_STATUS_CINTAS)
  const navigate = useNavigate()
  const [addYears, setAddYears] = useState(currentDate.toISOString().split('T')[0])

  const addThreeYears = () => {
    const newExpireDate = new Date();
    newExpireDate.setFullYear(newExpireDate.getFullYear() + 3);
    setAddYears(newExpireDate.toISOString().split('T')[0]);
  }

  const addFiveYears = () => {
    const newExpireDate = new Date();
    newExpireDate.setFullYear(newExpireDate.getFullYear() + 5);
    setAddYears(newExpireDate.toISOString().split('T')[0]);
  }

  const createCintaHandler = async (values, actions) => {
    let { label, description, creationDate, expireDate, rententionDate, location, statusCinta } = values
    expireDate = addYears;
    location = locations.find(({ id }) => id === location)
    statusCinta = status.find(({ id }) => id === statusCinta)
    await saveCinta(label, description, creationDate, expireDate, rententionDate, location, statusCinta)
    navigate('/inventory'); actions.resetForm()
  }

  return <>
    <h2 className="create-cinta-title">Registrar cinta de backup</h2>

    <div className="input-section-create-cinta col-md-3">
      <Formik
        initialValues={initialValues}
        validationSchema={cintaValidationSchema}
        onSubmit={(values, actions) => {
          createCintaHandler(values, actions)
        }}
      >
        <Form>
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

          <CreatableInputSelect
            data={locations}
            setData={setlocations}
            atributes={['location']}
            createFunction={saveLocation}
            label={'Ubicación: '}
            name='location'
          />

          <CreatableInputSelect
            data={status}
            setData={setStatus}
            atributes={['state']}
            createFunction={saveStatus}
            label={'Estado: '}
            name='statusCinta'
          />

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

          <div className="button-container-create-cinta">
            <ButtonSecundaryLink href="/inventory" >Cancelar</ButtonSecundaryLink>
            <ButtonPrimary type="submit">Guardar</ButtonPrimary>
          </div>
        </Form>
      </Formik>
    </div>
  </>
}

export function CreateCintaScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}