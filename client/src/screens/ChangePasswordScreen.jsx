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

/**
 * Contenido específico de la pantalla de cambio de contraseña.
 *
 * @returns {JSX.Element} - Elemento JSX que contiene el formulario y la información relacionada con el cambio de contraseña.
 */
const Content = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  /**
   * Manejador de cambio de contraseña que realiza la llamada a la API para cambiar la contraseña.
   *
   * @param {Object} values - Valores del formulario (contraseña actual, nueva contraseña y confirmación).
   * @param {Function} setErrors - Función para establecer errores de validación.
   */
  const handleChangePassword = async (values, setErrors) => {
    const { currentPassword, newPassword } = values;
    const data = await changePassword(user.id, currentPassword, newPassword);

    if (data === 'Contraseña actual incorrecta') {
      setErrors({ currentPassword: data});
      return;
    }

    // Actualiza el contexto del usuario con la nueva información
    setUser(data);
    // Navega a la página de perfil después de cambiar la contraseña
    navigate('/profile');
  };

  return (
    <>
      <h2 className='title-change-password'>Cambiar contraseña</h2>

      {/* Formulario Formik para gestionar el estado del formulario y las validaciones */}
      <section className='section-input-chage-password col-md-5 col-xl-4'>
        <Formik
          initialValues={initialValues}
          validationSchema={changePasswordValidationSchema}
          onSubmit={(values, actions) => {
            handleChangePassword(values, actions.setErrors);
          }}
        >
          <Form>
            {/* Campos de entrada para la contraseña actual, nueva contraseña y confirmación */}
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

            {/* Información sobre las características de la contraseña en una tarjeta */}
            <Card>
              <p className="p-info-card-password">
                La contraseña debe cumplir con las siguientes características:
              </p>
              <ul>
                <li>Debe tener al menos una minúscula.</li>
                <li>Debe contener al menos una mayúscula.</li>
                <li>Debe tener al menos un número. </li>
                <li>Tiene que tener un mínimo de 8 caracteres.</li>
              </ul>
            </Card>

            {/* Botones para cancelar o guardar la nueva contraseña */}
            <div className='buttons-container-change-password'>
              <ButtonSecundaryLink href={"/profile"}>Cancelar</ButtonSecundaryLink>
              <ButtonPrimary type='submit'>Guardar</ButtonPrimary>
            </div>
          </Form>
        </Formik>
      </section>
    </>
  );
};

/**
 * Componente que representa la pantalla de cambio de contraseña.
 * Muestra un formulario con campos para la contraseña actual, nueva contraseña y confirmación de contraseña.
 * Incluye validaciones de esquema y realiza una llamada a la API para cambiar la contraseña del usuario.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de cambio de contraseña.
 */
export function ChangePasswordScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}