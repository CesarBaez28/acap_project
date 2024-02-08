import { SideBar } from "../components/SideBar"
import { Header } from "../components/Header"
import { MainContent } from "../components/MainContent"
import '../styles/components/inventory.css'
import PlusSvg from '../assets/plus.svg?react'
import { ButtonCreateLink } from "../components/ButtonCreateLink"

import { InputAreaCinta } from "../components/InputAreaCinta"
import { Table } from "../components/TableCinta"
import { useGetCintas } from "../hooks/useGetCintas"
import { useContext } from "react"
import { UserContext } from "../contexts/userContext"
import { AccessibleOption } from "../components/AccesibleOption"
import { ACCESS } from "../constants"
import { LoadingIndicator } from "../components/LoadingIndicator"
import { ConditionalRender } from "../components/ConditionalRender"

const Content = () => {
  const { permissions } = useContext(UserContext)
  const [cintas, setCintas, processedCintas, setProcessedCintas, isLoading, setIsLoading] = useGetCintas()

  return <>
    <h2 className="inventory-title">Inventario de cintas</h2>

    <AccessibleOption
      permissions={permissions}
      privilegesId={ACCESS.CREATE_CINTA}
      Option={<ButtonCreateLink href={'/createCinta'} text={'Registrar cinta'} svg={<PlusSvg />} />}
    />

    <InputAreaCinta
      cintas={cintas}
      setCintas={setCintas}
      processedCintas={processedCintas}
      setProcessedCintas={setProcessedCintas}
      setIsLoading={setIsLoading}
    />

    <ConditionalRender isLoading={isLoading}>
      <Table
        columns={['Label: ', 'Ubicación:', 'Descripción', 'Creación:', 'Caduca:', 'Retención:', 'Estado:']}
        atributes={['label', 'location', 'description', 'creationDate', 'expiryDate', 'rententionDate', 'statusCinta']}
        data={cintas}
        setData={setCintas}
        processedData={processedCintas}
        setProcessedData={setProcessedCintas}
      />
    </ConditionalRender>
  </>
}

export function InventoryScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}