/* eslint-disable react/prop-types */
import { Formik, Form } from "formik"
import { TextInput } from "./TextInput"
import { CreatableInputSelect } from "./CreatableInputSelectFormik"
import { ButtonPrimary } from "./ButtonPrimary"
import { ButtonSecundary } from "./ButtonSecondary"

import { useGetLocations } from "../hooks/useGetLocations"
import { useGetStatus } from "../hooks/useGetStatus"
import { saveLocation } from "../api/saveLocation"
import { saveStatus } from "../api/saveStatus"
import { saveCinta } from "../api/saveCinta"

import { NOT_STATUS_CINTAS } from "../constants"

import { processedCintasData } from "../utils/processedCintasData"
import { setData as setDataCinta } from '../utils/setData';

import { cintaValidationSchema } from "../validactionsSchemas/cintaValidationSchema"

export function ContentDialogEditCinta({ setModalShow, selectedItem, setData, data, processedData, setProcessedData }) {
  const [locations, setlocations] = useGetLocations()
  const [status, setStatus] = useGetStatus(NOT_STATUS_CINTAS)

  const initialValues = {
    label: selectedItem && selectedItem.label,
    description: selectedItem && selectedItem.description,
    creationDate: selectedItem && new Date(selectedItem.creationDateFull).toISOString().split('T')[0],
    expireDate: selectedItem && new Date(selectedItem.expiryDateFull).toISOString().split('T')[0],
    rententionDate: selectedItem && new Date(selectedItem.rententionDateFull).toISOString().split('T')[0],
    location: selectedItem && selectedItem.id_location,
    statusCinta: selectedItem && selectedItem.id_statusCinta
  };

  const editCintaHanlder = async (values, resetForm) => {
    let { label, description, creationDate, expireDate, rententionDate, location, statusCinta } = values
    location = locations.find(({ id }) => id === location)
    statusCinta = status.find(({ id }) => id === statusCinta)
    const dataCinta = await saveCinta(label, description, creationDate, expireDate, rententionDate, location, statusCinta, selectedItem.id)
    const newData = processedCintasData(dataCinta)
    setDataCinta(data, dataCinta, setData)
    setDataCinta(processedData, newData, setProcessedData)
    resetForm();
    setModalShow(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={cintaValidationSchema}
      onSubmit={(values, actions) => {
        editCintaHanlder(values, actions.resetForm)
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
        <TextInput
          label={'Fecha de expiración: '}
          name='expireDate'
          type='date'
          autoComplete='expireDate'
        />
        <TextInput
          label={'Fecha de retención: '}
          name='rententionDate'
          type='date'
          autoComplete='rententionDate'
        />
        <div className="button-container-create-cinta">
          <ButtonSecundary
            styles={{ backgroundColor: "#FFF" }}
            type="button"
            onClick={() => setModalShow(false)}
          >
            Cancelar
          </ButtonSecundary>
          <ButtonPrimary type="submit">Guardar</ButtonPrimary>
        </div>
      </Form>
    </Formik>
  )
}