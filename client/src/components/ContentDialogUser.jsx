/* eslint-disable react/prop-types */
import { Formik, Form } from "formik"
import { TextInput } from "./TextInput"
import { CreatableInputSelect } from "./CreatableInputSelectFormik"
import { ButtonPrimary } from "./ButtonPrimary"
import { ButtonSecundary } from "./ButtonSecondary"
import { useGetPositions } from "../hooks/useGetPositions"
import { useGetPartialLocations } from "../hooks/useGetPartialLocations"

import '../styles/components/contentDialogUser.css'

import { savePosition } from "../api/savePosition"
import { saveLocation } from "../api/saveLocation"
import { editUserValidationSchema } from "../validactionsSchemas/userValidactionSchema"
import { InputSelect } from "./InputSelectWithFormik"

import { editUser } from "../api/editUser"

import { processedUserData } from "../utils/processedUserData"
import { setData as setDataUser } from "../utils/setData"

import { NOT_BRANCH_OFFICES } from "../constants"

export function ContentDialogUser({ data, setData, selectedItem, setModalShow }) {
  const [positions, setPositions] = useGetPositions()
  const [locations, setLocations] = useGetPartialLocations(NOT_BRANCH_OFFICES)

  const initialValues = {
    username: selectedItem.username,
    employeeNumber: selectedItem.employeeNumber,
    email: selectedItem.email,
    location: selectedItem.locationId,
    position: selectedItem.positionId,
    password: '',
    confirmPassword: '',
    status: selectedItem.status ? 1 : 0 // 1 = activo. 0 = inactivo
  }

  const handleEditUser = async (values, resetForm) => {
    let { username, employeeNumber, email, location, position, password, status } = values
    position = positions.find(({ id }) => id === position)
    location = locations.find(({ id }) => id === location )
    const user = await editUser({ userData: { id: selectedItem.id, username, employeeNumber, email, location, position, password, creationDate: selectedItem.creationDate, status } })
    const processedUser = processedUserData(user)
    setDataUser(data, processedUser, setData)
    resetForm()
    setModalShow(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editUserValidationSchema}
      onSubmit={(values, actions) => {
        handleEditUser(values, actions.resetForm)
      }}
    >
      <Form>
        <TextInput
          label={'Nombre de usuario: '}
          name='username'
          type='text'
          autoComplete='username'
        />
        <TextInput
          label={'Número de empleado: '}
          name='employeeNumber'
          type='text'
          autoComplete='employeeNumber'
        />
        <TextInput
          label={'Email: '}
          name='email'
          type='email'
          autoComplete='email'
        />
        <CreatableInputSelect
          data={locations}
          setData={setLocations}
          atributes={['location']}
          createFunction={saveLocation}
          label={'Sucursal: '}
          name='location'
        />
        <CreatableInputSelect
          data={positions}
          setData={setPositions}
          atributes={['position']}
          createFunction={savePosition}
          label={'Puesto: '}
          name='position'
        />
        <TextInput
          label={'Contraseña: '}
          name='password'
          type='password'
          autoComplete='password'
        />
        <TextInput
          label={'Confirme la contraseña: '}
          name='confirmPassword'
          type='password'
          autoComplete='confirmPassword'
        />

        <InputSelect
          label={'Estado: '}
          name='status'
          options={[{ value: 1, label: 'Activo' },
          { value: 0, label: 'Inactivo' }]}
        />

        <div className="button-container-edit-user">
          <ButtonSecundary type="button" onClick={() => setModalShow(false)}>Cancelar</ButtonSecundary>
          <ButtonPrimary type="submit">Guardar</ButtonPrimary>
        </div>
      </Form>
    </Formik>
  )
}