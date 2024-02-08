import '../styles/screens/Dashboard.css'
import { SideBar } from '../components/SideBar'
import { Header } from '../components/Header'
import { MainContent } from '../components/MainContent'
import { ACCESS } from '../constants'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { RenderCardMenu } from '../components/RenderCardMenu'

const Content = () => {
  const { permissions } = useContext(UserContext);
  const hasPermission = (accessId) => permissions.some(({ privileges }) => privileges.id === accessId);

  return (
    <section className='menu-section'>
      {RenderCardMenu('Movimientos', hasPermission, [
        { label: 'Envíos', privilege: ACCESS.VIEW_SHIPMENTS, href: '/shipments' },
        { label: 'Mover', privilege: ACCESS.MOVE_DATA_CENTER, href: '/move' },
        { label: 'Recibidos', privilege: ACCESS.VIEW_RECEIVED_SHIPMENTS, href: '/receivedCintas' },
        { label: 'Recepción', privilege: ACCESS.RECEPTION, href: '/reception' },
        { label: 'Historial', privilege: ACCESS.VIEW_HISTORY_SHIPMENTS, href: '/shipments/history' },
      ])}

      {RenderCardMenu('Gestión de inventario', hasPermission, [
        { label: 'Crear cinta de backup', privilege: ACCESS.CREATE_CINTA, href: '/createCinta' },
        { label: 'Ver inventario', privilege: ACCESS.VIEW_INVENTORY, href: '/inventory' },
      ])}

      {RenderCardMenu('Evidencias', hasPermission, [
        { label: 'Ver evidencias', privilege: ACCESS.VIEW_EVIDENCE, href: '/evidence' },
        { label: 'Crear carpeta de evidencias', privilege: ACCESS.VIEW_EVIDENCE, href: '/createFolder' },
      ])}

      {RenderCardMenu('Gestión de usuarios', hasPermission, [
        { label: 'Ver usuarios', privilege: ACCESS.VIEW_USERS, href: '/users' },
        { label: 'Crear usuario', privilege: ACCESS.CREATE_USER, href: '/createUser' },
        { label: 'Permisos', privilege: ACCESS.ASSING_PRIVILEGES, href: '/permissions' },
      ])}

      {RenderCardMenu('Reportes', hasPermission, [
        { label: 'Generar reportes', privilege: ACCESS.REPORTS, href: '/reports' },
      ])}
    </section>
  )
}


export function Dashboard() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}