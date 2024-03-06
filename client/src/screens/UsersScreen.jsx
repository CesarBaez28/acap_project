import { SideBar } from "../components/SideBar"
import { Header } from "../components/Header"
import { MainContent } from "../components/MainContent"
import { ButtonCreateLink } from "../components/ButtonCreateLink"

import PlusSvg from '../assets/plus.svg?react'
import SearchSvg from '../assets/search.svg?react'

import '../styles/screens/usersScreen.css'
import { ButtonSecundary } from "../components/ButtonSecondary"

import { Table } from "../components/TableUsers"
import { useGetUsers } from "../hooks/useGetUsers"
import { getUsers } from "../api/getUsers"

import { useState, useContext } from "react"
import { searchUsers } from "../api/searchUsers"

import { UserContext } from "../contexts/userContext"
import { AccessibleOption } from "../components/AccesibleOption"
import { ACCESS } from "../constants"
import { ConditionalRender } from "../components/ConditionalRender"

/**
 * Componente que representa la pantalla de gestión de usuarios.
 * Permite visualizar, buscar, y gestionar usuarios, incluyendo la creación de nuevos usuarios.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de gestión de usuarios.
 */
const Content = () => {
  // Contexto del usuario para obtener información del usuario actual.
  const { user, permissions } = useContext(UserContext);
  // Estado para almacenar la lista de usuarios y gestionar la recarga de datos.
  const [usersData, setUsersData, isLoading, setIsLoading] = useGetUsers(true);
  // Estado para almacenar el valor de búsqueda en la barra de búsqueda.
  const [searchValue, setSearchValue] = useState('');

  // Función para obtener usuarios inactivos.
  const getUsersInactives = async () => {
    setIsLoading(true);
    const data = await getUsers(false, user.id);
    setUsersData(data);
    setIsLoading(false);
  };

  // Función para manejar la búsqueda de usuarios.
  const handleSearch = async () => {
    let data;
    setIsLoading(true);

    // Realiza la búsqueda de usuarios según el valor en la barra de búsqueda.
    if (searchValue === '') data = await getUsers(true, user.id);
    if (searchValue !== '') data = await searchUsers(searchValue, user.id);

    setUsersData(data);
    setIsLoading(false);
  };

  return (
    <>
      <h2 className="title-user-screen">Usuarios</h2>

      {/* Opción accesible para registrar nuevos usuarios, visible solo si el usuario tiene el privilegio necesario. */}
      <AccessibleOption
        permissions={permissions}
        privilegesId={ACCESS.CREATE_USER}
        Option={<ButtonCreateLink href={'/createUser'} text={'Registrar usuario'} svg={<PlusSvg />} />}
      />

      {/* Área de entrada para búsqueda y filtro de usuarios */}
      <div className="input-area-users">
        <div className="input-area-users-container">
          <div className="input-group-users col-12 col-md-3">
            {/* Barra de búsqueda para filtrar usuarios por nombre, puesto o número de empleado */}
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Nombre, puesto, número empleado'
              className="input-search-users col-12"
              type="search"
            />
            {/* Botón de búsqueda */}
            <button onClick={handleSearch} className="button-search-user">
              <span className="icon-search-users">
                <SearchSvg />
              </span>
            </button>
          </div>
          {/* Botón para mostrar usuarios inactivos */}
          <div>
            <ButtonSecundary onClick={getUsersInactives}>Inactivos</ButtonSecundary>
          </div>
        </div>
      </div>

      {/* Renderiza la tabla de usuarios condicionalmente según el estado de carga. */}
      <ConditionalRender isLoading={isLoading}>
        {/* Tabla para mostrar detalles de los usuarios */}
        <Table
          columns={['Nombre: ', 'Número de empleado:', 'Correo:', 'Puesto:']}
          atributes={['username', 'employeeNumber', 'email', 'position']}
          data={usersData}
          setData={setUsersData}
        />
      </ConditionalRender>
    </>
  );
};

/**
 * Componente principal que representa la pantalla de gestión de usuarios.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de gestión de usuarios.
 */
export function UsersScreen() {
  return (
    <>
      {/* Barra lateral */}
      <SideBar />
      {/* Barra de encabezado */}
      <Header />
      {/* Contenido principal que incluye la gestión de usuarios */}
      <MainContent content={<Content />} />
    </>
  )
}
