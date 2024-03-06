import '../styles/screens/Dashboard.css'
import { SideBar } from '../components/SideBar'
import { Header } from '../components/Header'
import { MainContent } from '../components/MainContent'
import { ACCESS } from '../constants'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { RenderCardMenu } from '../components/RenderCardMenu'

/**
 * Contenido específico del dashboard que muestra tarjetas de menú condicionales basadas en los permisos del usuario.
 * Utiliza el contexto de usuario para obtener los permisos y determinar qué tarjetas de menú deben mostrarse.
 *
 * @returns {JSX.Element} - Elemento JSX que contiene las tarjetas de menú condicionales.
 */
const Content = () => {
  const { permissions } = useContext(UserContext);

  /**
   * Función que verifica si el usuario tiene el privilegio correspondiente al identificador de acceso proporcionado.
   *
   * @param {string} accessId - Identificador de acceso que representa el privilegio requerido.
   * @returns {boolean} - Devuelve true si el usuario tiene el privilegio, de lo contrario, devuelve false.
   */
  const hasPermission = (accessId) => permissions.some(({ privileges }) => privileges.id === accessId);

  // Renderiza las tarjetas de menú condicionales basadas en los permisos del usuario
  return (
    <section className='menu-section'>
      {/* Tarjetas de menú para la sección de Movimientos */}
      {RenderCardMenu('Movimientos', hasPermission, [
        { label: 'Envíos', privilege: ACCESS.VIEW_SHIPMENTS, href: '/shipments' },
        { label: 'Mover', privilege: ACCESS.MOVE_DATA_CENTER, href: '/move' },
        { label: 'Recibidos', privilege: ACCESS.VIEW_RECEIVED_SHIPMENTS, href: '/receivedCintas' },
        { label: 'Recepción', privilege: ACCESS.RECEPTION, href: '/reception' },
        { label: 'Historial', privilege: ACCESS.VIEW_HISTORY_SHIPMENTS, href: '/shipments/history' },
      ])}

      {/* Tarjetas de menú para la sección de Gestión de inventario */}
      {RenderCardMenu('Gestión de inventario', hasPermission, [
        { label: 'Crear cinta de backup', privilege: ACCESS.CREATE_CINTA, href: '/createCinta' },
        { label: 'Ver inventario', privilege: ACCESS.VIEW_INVENTORY, href: '/inventory' },
      ])}

      {/* Tarjetas de menú para la sección de Evidencias */}
      {RenderCardMenu('Evidencias', hasPermission, [
        { label: 'Ver evidencias', privilege: ACCESS.VIEW_EVIDENCE, href: '/evidence' },
        { label: 'Crear carpeta de evidencias', privilege: ACCESS.VIEW_EVIDENCE, href: '/createFolder' },
      ])}

      {/* Tarjetas de menú para la sección de Gestión de usuarios */}
      {RenderCardMenu('Gestión de usuarios', hasPermission, [
        { label: 'Ver usuarios', privilege: ACCESS.VIEW_USERS, href: '/users' },
        { label: 'Crear usuario', privilege: ACCESS.CREATE_USER, href: '/createUser' },
        { label: 'Permisos', privilege: ACCESS.ASSING_PRIVILEGES, href: '/permissions' },
      ])}

      {/* Tarjetas de menú para la sección de Reportes */}
      {RenderCardMenu('Reportes', hasPermission, [
        { label: 'Generar reportes', privilege: ACCESS.REPORTS, href: '/reports' },
      ])}
    </section>
  );
};


/**
 * Componente que representa la pantalla principal del dashboard.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla principal del dashboard.
 */
export function Dashboard() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}