import '../styles/screens/changePasswordScreen.css'
import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { MainContent } from '../components/MainContent'

import { Formik, Form } from 'formik'
import { changePasswordValidationSchema } from '../validactionsSchemas/changePasswordValidationSchema'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'

import { TextInput } from '../components/TextInput'
import { Card } from '../components/Card'
import { ButtonSecundaryLink } from '../components/ButtonSecondaryLink'
import { ButtonPrimary } from '../components/ButtonPrimary'

import { changePassword } from '../api/changePassword'
import { useNavigate } from 'react-router-dom'

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
}

const Content = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleChangePassword =  async (values, setErrors) => {
    const {currentPassword, newPassword } = values
    const data = await changePassword(user.id, currentPassword, newPassword)
    if (data?.error) { setErrors({currentPassword: data.error}); return; }
    setUser(data)
    navigate('/profile')
  }

  return <>
    <h2 className='title-change-password'>Cambiar contraseña</h2>

    <section className='section-input-chage-password col-md-5 col-xl-4'>
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordValidationSchema}
        onSubmit={(values, actions) => {
          handleChangePassword(values, actions.setErrors)
        }}
      >
        <Form>
          <TextInput
            label={'Contraseña actual: '}
            name='currentPassword'
            type='password'
            autoComplete='currentPassword'
          />
          <TextInput
            label={'Contraseña nueva: '}
            name='newPassword'
            type='password'
            autoComplete='newPassword'
          />
          <TextInput
            label={'Repita la contraseña: '}
            name='confirmPassword'
            type='password'
            autoComplete='confirmPassword'
          />

          <Card>
            <p className="p-info-card-password">
              La contraseña debe cumplir con las siguientes características:
            </p>
            <ul>
              <li>Debe tener al menos una minúscula.</li>
              <li>Debe contener al menos una mayúscula.</li>
              <li>Debe tener al menos un número. </li>
              <li>Tiene que tener un mínumo de 8 caracteres.</li>
            </ul>
          </Card>

          <div className='buttons-container-change-password'>
            <ButtonSecundaryLink href={"/profile"}>Cancelar</ButtonSecundaryLink>
            <ButtonPrimary type='submit'>Guardar</ButtonPrimary>
          </div>
        </Form>
      </Formik>
    </section>
  </>
}

export function ChangePasswordScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}