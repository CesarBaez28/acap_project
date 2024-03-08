import PropTypes from 'prop-types'
import { Formik, Form } from "formik";
import { TextInput } from "./TextInput";
import { CreatableInputSelect } from "./CreatableInputSelectFormik";
import { ButtonPrimary } from "./ButtonPrimary";
import { ButtonSecundary } from "./ButtonSecondary";
import { useGetPositions } from "../hooks/useGetPositions";
import { useGetPartialLocations } from "../hooks/useGetPartialLocations";

import '../styles/components/contentDialogUser.css';

import { savePosition } from "../api/savePosition";
import { saveLocation } from "../api/saveLocation";
import { editUserValidationSchema } from "../validactionsSchemas/userValidactionSchema";
import { InputSelect } from "./InputSelectWithFormik";

import { editUser } from "../api/editUser";

import { processedUserData } from "../utils/processedUserData";
import { setData as setDataUser } from "../utils/setData";

import { NOT_BRANCH_OFFICES } from "../constants";

/**
 * Componente que representa el contenido del diálogo para editar usuarios.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.data - Datos de usuarios existentes.
 * @param {function} props.setData - Función para actualizar los datos de usuarios.
 * @param {Object} props.selectedItem - Elemento de usuario seleccionado para edición.
 * @param {function} props.setModalShow - Función para controlar la visibilidad del diálogo.
 * @returns {JSX.Element} - Elemento JSX que representa el contenido del diálogo de edición de usuarios.
 */
export function ContentDialogUser({ data, setData, selectedItem, setModalShow }) {
  const [positions, setPositions] = useGetPositions();
  const [locations, setLocations] = useGetPartialLocations(NOT_BRANCH_OFFICES);

  const initialValues = {
    username: selectedItem.username,
    employeeNumber: selectedItem.employeeNumber,
    email: selectedItem.email,
    location: selectedItem.locationId,
    position: selectedItem.positionId,
    password: '',
    confirmPassword: '',
    status: selectedItem.status ? 1 : 0 // 1 = activo. 0 = inactivo
  };

  /**
   * Manejador para editar un usuario.
   * @param {Object} values - Valores del formulario.
   * @param {function} resetForm - Función para restablecer el formulario.
   */
  const handleEditUser = async (values, resetForm) => {
    let { username, employeeNumber, email, location, position, password, status } = values;
    position = positions.find(({ id }) => id === position);
    location = locations.find(({ id }) => id === location);
    const user = await editUser({ userData: { id: selectedItem.id, username, employeeNumber, email, location, position, password, creationDate: selectedItem.creationDate, status } });
    const processedUser = processedUserData(user);
    setDataUser(data, processedUser, setData);
    resetForm();
    setModalShow(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editUserValidationSchema}
      onSubmit={(values, actions) => {
        handleEditUser(values, actions.resetForm);
      }}
    >
      <Form>
        {/* Campos de entrada de texto para el nombre de usuario, número de empleado y correo electrónico */}
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
          label={'Correo electrónico: '}
          name='email'
          type='email'
          autoComplete='email'
        />

        {/* Campos de selección creativa para la sucursal y el puesto */}
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

        {/* Campos de entrada de texto para la contraseña y su confirmación */}
        <TextInput
          label={'Contraseña: '}
          name='password'
          type='password'
          autoComplete='password'
        />
        <TextInput
          label={'Confirmar contraseña: '}
          name='confirmPassword'
          type='password'
          autoComplete='confirmPassword'
        />

        {/* Campo de selección de estado activo o inactivo */}
        <InputSelect
          label={'Estado: '}
          name='status'
          options={[{ value: 1, label: 'Activo' },
          { value: 0, label: 'Inactivo' }]}
        />

        {/* Contenedor de botones de acción */}
        <div className="button-container-edit-user">
          {/* Botón secundario para cancelar la edición del usuario */}
          <ButtonSecundary type="button" onClick={() => setModalShow(false)}>Cancelar</ButtonSecundary>
          {/* Botón primario para confirmar la edición del usuario */}
          <ButtonPrimary type="submit">Guardar</ButtonPrimary>
        </div>
      </Form>
    </Formik>
  );
}

ContentDialogUser.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
  selectedItem: PropTypes.object,
  setModalShow: PropTypes.func 
}