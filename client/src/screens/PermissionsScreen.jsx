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

const Content = () => {
  const { user, updatePermissions } = useContext(UserContext)
  const [positions, setPositions] = useGetPositions()
  const [value, setValue] = useState(null)
  const [userpermissions, setUserpermissions] = useState(null)
  const [ privileges ] = useGetPrivileges()
  const [checkboxStates, setCheckboxStates] = useState([])

  const handleOnChange = async (index, item) => {
    const newCheckboxStates = [...checkboxStates];
    const isChecked = newCheckboxStates[index];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);

    const position = positions.find(({ id }) => id === value ) 

    if (!isChecked) {
      const data = await assignPrivileges(position, item)
      setUserpermissions([...userpermissions, { ...data[0]}])

      if (user.position.position === position.position) {
        updatePermissions(userpermissions)
      }

      return
    }

    const data = await removePrivileges(position, item)

    if (user.position.position === position.position) {
      updatePermissions(data)
    }

    setUserpermissions(data)
  }

  const activateCheckboxes = () => {
    if (userpermissions && privileges) {
      const newCheckboxStates = privileges.map((privilege) =>
        userpermissions.some(
          (userPrivilege) => userPrivilege.privileges.privilege === privilege.privilege
        )
      );
      setCheckboxStates(newCheckboxStates);
    }
  }

  useEffect(() => {
    activateCheckboxes();
  }, [userpermissions, privileges]);

  return <>
    <h2 className="title-permissions-screen">Permisos de usuarios</h2>
    <div className="col-md-3 col-lg-2">
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

    {userpermissions != null
      ? <section className="section-permissions col-md-4 col-lg-3">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Permisos</legend>
          <div className="checkbox-group-permissions">
            {userpermissions && privileges.map((item, index) => (
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
      : <div></div>
    }
  </>
}

export function PermissionsScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}