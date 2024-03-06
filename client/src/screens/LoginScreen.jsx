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
import { authenticate } from '../api/authenticate.js'

const initialValues = {
  employeeNumber: '',
  password: ''
}

/**
 * Componente que representa la pantalla de inicio de sesión.
 * Permite a los usuarios ingresar su número de empleado y contraseña para acceder al sistema.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de inicio de sesión.
 */
export function LoginScreen() {
  const { setUser, setPermissions } = useContext(UserContext);
  const navigate = useNavigate();

  /**
   * Manejador de inicio de sesión que realiza la autenticación del usuario.
   *
   * @param {Object} values - Valores del formulario, incluyendo el número de empleado y la contraseña.
   * @param {Function} resetForm - Función para restablecer el formulario después de un intento de inicio de sesión.
   * @param {Function} setErrors - Función para establecer mensajes de error en el formulario en caso de problemas de autenticación.
   */
  const loginHandler = async (values, resetForm, setErrors) => {
    const { employeeNumber, password } = values;

    // Intenta realizar el inicio de sesión utilizando la API de autenticación
    const result = await login(employeeNumber, password, setErrors);

    // Si el inicio de sesión es exitoso, obtiene los permisos del usuario y realiza la autenticación en el sistema
    if (result) {
      const permissions = await getPermissions(result.position);
      await authenticate(employeeNumber, password);

      // Almacena la información del usuario y sus permisos en el almacenamiento local
      const dataToStore = {
        user: result,
        permissions: permissions,
      };
      localStorage.setItem('userData', JSON.stringify(dataToStore));

      // Actualiza el estado global con la información del usuario y sus permisos
      setUser(result);
      setPermissions(permissions);

      // Restablece el formulario y navega al panel de control del usuario
      resetForm();
      navigate('/dashboard');
    }
  };

  return (
    <section className='page-content'>
      <div className='login-container'>
        {/* Sección de título con el logo y el nombre del sistema */}
        <section className='title-section'>
          <picture>
            <img width={245} height={150} src={logo} alt="logo Asociación Cibao ahorros y préstamos" />
          </picture>
          <div className='title-container'>
            <h2 className='title'>Sistema de Control de Cintas</h2>
          </div>
        </section>

        {/* Formulario de inicio de sesión utilizando Formik para la gestión del estado del formulario */}
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={(values, actions) => {
            loginHandler(values, actions.resetForm, actions.setErrors);
          }}
        >
          <Form>
            {/* Sección de entrada de datos (número de empleado y contraseña) */}
            <section className='input-section'>
              <TextInput
                label='Número de empleado'
                name='employeeNumber'
                type='text'
                autoComplete='employeeNumber'
              />
              <TextInput
                label='Contraseña'
                name='password'
                type='password'
                autoComplete='current-password'
              />
            </section>

            {/* Sección de botones (botón de inicio de sesión) */}
            <section className='button-section'>
              <div className='button-container'>
                <button className='button-primary' type='submit'>Iniciar sesión</button>
              </div>
            </section>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
