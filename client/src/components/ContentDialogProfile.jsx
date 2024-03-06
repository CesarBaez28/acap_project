/* eslint-disable react/prop-types */
import { Formik, Form } from 'formik'
import { userValidationSchemaWithoutPositionAndBranchOffice } from '../validactionsSchemas/userValidactionSchema'
import { TextInput } from "../components/TextInput"
import { ButtonPrimary } from './ButtonPrimary'
import { ButtonSecundary } from './ButtonSecondary'
import { editUser } from '../api/editUser'

import '../styles/components/contentDialogProfile.css'

/**
 * Componente que representa el contenido del diálogo para editar el perfil de un usuario.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.setModalShow - Función para controlar la visibilidad del diálogo.
 * @param {function} props.setData - Función para actualizar los datos del usuario.
 * @param {Object} props.data - Datos actuales del usuario.
 * @returns {JSX.Element} - Elemento JSX que representa el contenido del diálogo para editar el perfil de un usuario.
 */
export function ContentDialogProfile({ setModalShow, setData, data }) {
  // Valores iniciales basados en los datos actuales del usuario
  const initialValues = {
    username: data.username,
    employeeNumber: data.employeeNumber,
    email: data.email,
  };

  // Manejador para editar el perfil del usuario
  const handleEditProfile = async (values, resetForm) => {
    let { username, employeeNumber, email } = values;

    // Realiza la edición del usuario mediante la función editUser de la API
    const user = await editUser({
      userData: {
        id: data.id,
        username,
        employeeNumber,
        email,
        location: data.location,
        position: data.position,
        password: "",
        creationDate: data.creationDate,
        status: 1
      }
    });

    // Actualiza los datos del usuario con los nuevos datos editados
    setData(user);

    // Reinicia el formulario y oculta el diálogo
    resetForm();
    setModalShow(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userValidationSchemaWithoutPositionAndBranchOffice}
      onSubmit={(values, actions) => {
        handleEditProfile(values, actions.resetForm);
      }}
    >
      <Form>
        {/* Componentes TextInput para los campos de edición */}
        <TextInput label={'Nombre: '} name='username' type='text' autoComplete='username' />
        <TextInput label={'Número de empleado: '} name='employeeNumber' type='text' autoComplete='employeeNumber' />
        <TextInput label={'Email: '} name='email' type='email' autoComplete='email' />

        {/* Contenedor de botones de acción */}
        <div className="button-container-profile-user">
          {/* Botón secundario para cancelar la acción */}
          <ButtonSecundary type="button" onClick={() => setModalShow(false)}>Cancelar</ButtonSecundary>
          {/* Botón primario para guardar los cambios */}
          <ButtonPrimary type="submit">Guardar</ButtonPrimary>
        </div>
      </Form>
    </Formik>
  );
}