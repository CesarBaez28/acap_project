/* eslint-disable react/prop-types */
import { Formik, Form } from 'formik'
import { userValidationSchemaWithoutPositionAndbranchOffice } from '../validactionsSchemas/userValidactionSchema'
import { TextInput } from "../components/TextInput"
import { ButtonPrimary } from './ButtonPrimary'
import { ButtonSecundary } from './ButtonSecondary'
import { editUser } from '../api/editUser'

import '../styles/components/contentDialogProfile.css'

export function ContentDialogProfile({ setModalShow, setData, data }) {

  const initialValues = {
    username: data.username,
    employeeNumber: data.employeeNumber,
    email: data.email,
  }

  const handleEditProfile = async (values, resetForm) => {
    let { username, employeeNumber, email } = values
    const user = await editUser({userData: {id:data.id, username, employeeNumber, email, location: data.location, position: data.position, password: "", creationDate: data.creationDate, status: 1}})
    setData(user)
    resetForm()
    setModalShow(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userValidationSchemaWithoutPositionAndbranchOffice}
      onSubmit={(values, actions) => {
        handleEditProfile(values, actions.resetForm)
      }}
    >
      <Form>
        <TextInput
          label={'Nombre: '}
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

        <div className="button-container-profile-user">
          <ButtonSecundary type="button" onClick={() => setModalShow(false)}>Cancelar</ButtonSecundary>
          <ButtonPrimary type="submit">Guardar</ButtonPrimary>
        </div>
      </Form>
    </Formik>
  )
}