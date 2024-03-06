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

/**
 * Contenido específico de la pantalla de registro de usuario.
 * Utiliza el formulario Formik para gestionar el estado del formulario y las validaciones.
 * Realiza llamadas a la API para obtener posiciones y ubicaciones, y para guardar la información del nuevo usuario.
 *
 * @returns {JSX.Element} - Elemento JSX que contiene el formulario y la información relacionada con la creación de usuario.
 */
const Content = () => {
  const [positions, setPositions] = useGetPositions(); // Estado para gestionar las posiciones disponibles
  const [locations, setLocations] = useGetPartialLocations(NOT_BRANCH_OFFICES); // Estado para gestionar las ubicaciones disponibles
  const navigate = useNavigate();

  /**
   * Manejador de la creación de usuario que realiza llamadas a la API para obtener datos de ubicación y posición,
   * guarda la información del nuevo usuario y navega a la página de usuarios después de completar la creación.
   *
   * @param {Object} values - Valores del formulario (nombre de usuario, número de empleado, email, etc.).
   * @param {Function} resetForm - Función proporcionada por Formik para resetear el formulario después de la creación.
   */
  const handleCreateUser = async (values, resetForm) => {
    let { username, employeeNumber, email, position, location, password } = values;
    // Obtiene la posición y la ubicación correspondientes a los IDs seleccionados
    position = positions.find(({ id }) => id === position);
    location = locations.find(({ id }) => id === location);
    const creationDate = new Date().toISOString();
    // Llama a la API para guardar la información del nuevo usuario
    await saveUser({
      userData: {
        username,
        employeeNumber,
        email,
        location,
        position,
        password,
        creationDate,
        status: 1 // Status predeterminado, podría ser configurado según requerimientos
      }
    });
    // Navega a la página de usuarios y resetea el formulario
    navigate('/users');
    resetForm();
  }

  return (
    <>
      <h2 className="create-user-title">Registrar usuario</h2>

      {/* Formulario Formik para gestionar el estado del formulario y las validaciones */}
      <div className="input-section-create-user col-md-5 col-xl-4">
        <Formik
          initialValues={initialValues}
          validationSchema={createUserValidationSchema}
          onSubmit={(values, actions) => {
            handleCreateUser(values, actions.resetForm);
          }}
        >
          <Form>
            {/* Campos de entrada para la información del nuevo usuario */}
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

            {/* Selector creatable para la sucursal */}
            <CreatableInputSelect
              data={locations}
              setData={setLocations}
              attributes={['location']}
              createFunction={saveLocation}
              label={'Sucursal: '}
              name='location'
            />

            {/* Selector creatable para el puesto */}
            <CreatableInputSelect
              data={positions}
              setData={setPositions}
              attributes={['position']}
              createFunction={savePosition}
              label={'Puesto: '}
              name='position'
            />

            {/* Campos de entrada para la contraseña y confirmación */}
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

            {/* Botones para cancelar o guardar el usuario */}
            <div className="button-container-create-user">
              <ButtonSecundaryLink href="/users">Cancelar</ButtonSecundaryLink>
              <ButtonPrimary type="submit">Guardar</ButtonPrimary>
            </div>

            {/* Información sobre las características de la contraseña en una tarjeta */}
            <article className="info-password">
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
            </article>
          </Form>
        </Formik>
      </div>
    </>
  );
};


/**
 * Componente que representa la pantalla de registro de usuario. *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de registro de usuario.
 */
export function CreateUserScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}