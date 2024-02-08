import { Form, Formik } from 'formik'
import '../styles/screens/LoginScreen.css'
import logo from '../assets/logo.png'
import { loginValidationSchema } from '../validactionsSchemas/loginValidation.js'
import { TextInput } from '../components/TextInput.jsx'
import { login } from '../api/login.js'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/userContext.jsx'

import { useContext } from 'react'
import { getPermissions } from '../api/getPermissions.js'

const initialValues = {
  employeeNumber: '',
  password: ''
}

export function LoginScreen() {
  const { setUser, setPermissions } = useContext(UserContext)
  const navigate = useNavigate()

  const loginHandler = async (values, resetForm, setErrors) => {
    const { employeeNumber, password } = values
    const result = await login(employeeNumber, password, setErrors)
    if ( result ) {
      const permissions = await getPermissions(result.position)

      const dataToStore = {
        user: result,
        permissions: permissions
      }
      
      localStorage.setItem('userData', JSON.stringify(dataToStore));

      setUser(result);
      setPermissions(permissions)
      resetForm();
      navigate('/dashboard');
    }
  }

  return (
    <section className='page-content'>
      <div className='login-container'>
        <section className='title-section'>
          <picture>
            <img width={245} height={150} src={logo} alt="logo Asociación Cibao ahorros y préstamos" />
          </picture>
          <div className='title-container'>
            <h2 className='title'>Sistema de Control de Cintas</h2>
          </div>
        </section>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={(values, actions) => {
            loginHandler(values, actions.resetForm, actions.setErrors)
          }}
        >
          <Form>
            <section className='input-section'>
              <TextInput
                label='Número de empleado'
                name='employeeNumber'
                type='text'
                autoComplete='employeeNumber'
              />
              <TextInput
                label='Password'
                name='password'
                type='password'
                autoComplete='current-password'
              />
            </section>

            <section className='button-section'>
              <div className='button-container'>
                <button className='button-primary' type='submit'>Iniciar sesión</button>
              </div>
            </section>
          </Form>
        </Formik>
      </div>
    </section>
  )
}