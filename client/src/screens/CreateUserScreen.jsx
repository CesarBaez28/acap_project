import { SideBar } from "../components/SideBar"
import { Header } from "../components/Header"
import { MainContent } from "../components/MainContent"

import { Formik, Form } from "formik"

import { createUserValidationSchema } from "../validactionsSchemas/userValidactionSchema"

import { TextInput } from "../components/TextInput"
import { CreatableInputSelect } from "../components/CreatableInputSelectFormik"
import { ButtonPrimary } from "../components/ButtonPrimary"
import { ButtonSecundaryLink } from "../components/ButtonSecondaryLink"

import "../styles/screens/createUserScreen.css"
import { useGetPositions } from "../hooks/useGetPositions"
import { useGetPartialLocations } from "../hooks/useGetPartialLocations"
import { savePosition } from "../api/savePosition"
import { Card } from "../components/Card"
import { saveUser } from "../api/saveUser"
import { saveLocation } from "../api/saveLocation"

import { useNavigate } from "react-router-dom"

import { NOT_BRANCH_OFFICES } from "../constants"

const initialValues = {
  username: '',
  employeeNumber: '',
  email: '',
  position: '',
  location: '',
  password: '',
  confirmPassword: '',
}

const Content = () => {
  const [positions, setPositions] = useGetPositions()
  const [locations, setLocations] = useGetPartialLocations(NOT_BRANCH_OFFICES)
  const navigate = useNavigate()

  const handleCreateUser = async (values, resetForm) => {
    let { username, employeeNumber, email, position, location, password } = values
    position = positions.find(({ id }) => id === position)
    location = locations.find(({ id }) => id === location)
    const creationDate = new Date().toISOString()
    await saveUser({ userData: { username, employeeNumber, email, location, position, password, creationDate, status: 1 } })
    resetForm()
    navigate('/users')
  }

  return <>
    <h2 className="create-user-title">Registrar usuario</h2>
    <div className="input-section-create-user col-md-5 col-xl-4">
      <Formik
        initialValues={initialValues}
        validationSchema={createUserValidationSchema}
        onSubmit={(values, actions) => {
          handleCreateUser(values, actions.resetForm)
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

          <div className="button-container-create-user">
            <ButtonSecundaryLink href="/users">Cancelar</ButtonSecundaryLink>
            <ButtonPrimary type="submit">Guardar</ButtonPrimary>
          </div>

          <article className="info-password">
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
          </article>

        </Form>
      </Formik>
    </div>
  </>
}

export function CreateUserScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}