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

const Content = () => {
  const { user, permissions } = useContext(UserContext)
  const [usersData, setUsersData, isLoading, setIsLoading] = useGetUsers(true)
  const [searchValue, setSearchValue] = useState('')

  const getUsersInactives = async () => {
    setIsLoading(true)
    const data = await getUsers(false, user.id)
    setUsersData(data)
    setIsLoading(false)
  }

  const handleSearch = async () => {
    let data
    setIsLoading(true)

    if (searchValue === '') data = await getUsers(true, user.id)
    if (searchValue !== '') data = await searchUsers(searchValue, user.id)

    setUsersData(data)
    setIsLoading(false)
  }

  return <>
    <h2 className="title-user-screen">Usuarios</h2>

    <AccessibleOption
      permissions={permissions}
      privilegesId={ACCESS.CREATE_USER}
      Option={<ButtonCreateLink href={'/createUser'} text={'Registrar usuario'} svg={<PlusSvg />} />}
    />
    <div className="input-area-users">
      <div className="input-area-users-container">
        <div className="input-group-users col-12 col-md-3">
          <input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder='Nombre, puesto, número empleado'
            className="input-search-users col-12"
            type="search"
          />
          <button onClick={handleSearch} className="button-search-user">
            <span className="icon-search-users">
              <SearchSvg />
            </span>
          </button>
        </div>
        <div>
          <ButtonSecundary onClick={getUsersInactives}>Inactivos</ButtonSecundary>
        </div>
      </div>
    </div>

    <ConditionalRender isLoading={isLoading}>
      <Table
        columns={['Nombre: ', 'Número de empleado:', 'Correo:', 'Puesto:']}
        atributes={['username', 'employeeNumber', 'email', 'position']}
        data={usersData}
        setData={setUsersData}
      />
    </ConditionalRender>
  </>
}

export function UsersScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}