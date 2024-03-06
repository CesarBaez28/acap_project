import { Header } from "../components/Header"
import { SideBar } from "../components/SideBar"
import { MainContent } from "../components/MainContent"
import { useGetPositions } from "../hooks/useGetPositions"
import { CreatableInputSelect } from "../components/CreatableInputSelect"
import { useState, useEffect, useContext } from "react"
import { savePosition } from "../api/savePosition"
import { getPermissions } from "../api/getPermissions"
import { assignPrivileges } from "../api/assignPrivileges"

import "../styles/screens/permissionsScreen.css"
import { useGetPrivileges } from "../hooks/useGetPrivileges"
import { removePrivileges } from "../api/removePrivileges"
import { UserContext } from "../contexts/userContext"

/**
 * Contenido específico de la pantalla de permisos de usuarios.
 * Permite asignar y gestionar permisos para usuarios según los puestos y privilegios disponibles.
 *
 * @returns {JSX.Element} - Elemento JSX que contiene la interfaz de la pantalla de permisos de usuarios.
 */
const Content = () => {
  // Contexto de usuario para acceder a la información del usuario actual
  const { user, updatePermissions } = useContext(UserContext);
  // Estado y hook para obtener los puestos disponibles
  const [positions, setPositions] = useGetPositions();
  // Estados para gestionar la selección de puesto, permisos del usuario y estados de los checkboxes
  const [value, setValue] = useState(null);
  const [userpermissions, setUserpermissions] = useState(null);
  const [privileges] = useGetPrivileges();
  const [checkboxStates, setCheckboxStates] = useState([]);

  /**
   * Maneja el cambio en los checkboxes al asignar o quitar un privilegio.
   *
   * @param {number} index - Índice del checkbox.
   * @param {object} item - Objeto que representa un privilegio.
   * @returns {void}
   */
  const handleOnChange = async (index, item) => {
    const newCheckboxStates = [...checkboxStates];
    const isChecked = newCheckboxStates[index];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);

    const position = positions.find(({ id }) => id === value);

    if (!isChecked) {
      const data = await assignPrivileges(position, item);
      setUserpermissions([...userpermissions, { ...data[0] }]);

      if (user.position.position === position.position) {
        updatePermissions(userpermissions);
      }

      return;
    }

    const data = await removePrivileges(position, item);

    if (user.position.position === position.position) {
      updatePermissions(data);
    }

    setUserpermissions(data);
  };

  /**
   * Activa los checkboxes según los privilegios asignados al usuario.
   *
   * @returns {void}
   */
  const activateCheckboxes = () => {
    if (userpermissions && privileges) {
      const newCheckboxStates = privileges.map((privilege) =>
        userpermissions.some(
          (userPrivilege) => userPrivilege.privileges.privilege === privilege.privilege
        )
      );
      setCheckboxStates(newCheckboxStates);
    }
  };

  // Efecto para activar los checkboxes al cargar los permisos o privilegios
  useEffect(() => {
    activateCheckboxes();
  }, [userpermissions, privileges]);

  // Renderizado del componente Content
  return (
    <>
      <h2 className="title-permissions-screen">Permisos de usuarios</h2>
      <div className="col-md-3 col-lg-2">
        {/* Selector creatable para elegir puestos */}
        <CreatableInputSelect
          placeholder={'Puestos'}
          optionsData={positions}
          setOptionsData={setPositions}
          setData={setUserpermissions}
          value={value}
          setValue={setValue}
          atributes={['position']}
          getDataFunction={getPermissions}
          createFunction={savePosition}
        />
      </div>

      {/* Sección de visualización de permisos asignados */}
      {userpermissions != null ? (
        <section className="section-permissions col-md-4 col-lg-3">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Permisos</legend>
            <div className="checkbox-group-permissions">
              {userpermissions &&
                privileges.map((item, index) => (
                  <div className="checkbox-container" key={index}>
                    <input
                      className="checkBox-permissions"
                      key={item.id}
                      type="checkbox"
                      checked={checkboxStates[index] || false}
                      onChange={() => handleOnChange(index, item)}
                    />
                    <p className="label-checkbox">{item.privilege}</p>
                  </div>
                ))}
            </div>
          </fieldset>
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};

/**
 * Componente que representa la pantalla de permisos de usuarios.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de permisos de usuarios.
 */
export function PermissionsScreen() {
  return (
    <>
      {/* Estructura principal de la página */}
      <SideBar />
      <Header />
      <MainContent content={<Content />} />
    </>
  );
}
