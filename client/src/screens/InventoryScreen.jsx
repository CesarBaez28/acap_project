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
import { ConditionalRender } from "../components/ConditionalRender"

/**
 * Contenido específico de la pantalla de inventario de cintas.
 * Permite al usuario registrar nuevas cintas, visualizar la información detallada y agregar cintas al inventario.
 * Renderiza condicionalmente la tabla de cintas mientras se carga la información.
 *
 * @returns {JSX.Element} - Elemento JSX que contiene la interfaz del inventario de cintas.
 */
const Content = () => {
  const { permissions } = useContext(UserContext);
  const [cintas, setCintas, processedCintas, setProcessedCintas, isLoading, setIsLoading] = useGetCintas();

  return (
    <>
      <h2 className="inventory-title">Inventario de cintas</h2>

      {/* Opción para registrar una nueva cinta (condicional basada en los permisos del usuario) */}
      <AccessibleOption
        permissions={permissions}
        privilegesId={ACCESS.CREATE_CINTA}
        Option={<ButtonCreateLink href={'/createCinta'} text={'Registrar cinta'} svg={<PlusSvg />} />}
      />

      {/* Área de entrada para cintas */}
      <InputAreaCinta
        cintas={cintas}
        setCintas={setCintas}
        processedCintas={processedCintas}
        setProcessedCintas={setProcessedCintas}
        setIsLoading={setIsLoading}
      />

      {/* Renderiza condicionalmente la tabla de cintas mientras se carga la información */}
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
  );
};


/**
 * Componente que representa la pantalla de inventario de cintas.
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de inventario de cintas.
 */
export function InventoryScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}