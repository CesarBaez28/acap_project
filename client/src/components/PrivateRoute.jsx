import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../contexts/userContext"
import PropTypes from 'prop-types'

/**
 * Componente `PrivateRoute` para gestionar las rutas privadas y controlar los permisos de acceso.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {JSX.Element} props.Element - Elemento JSX que representa el contenido de la ruta privada.
 * @param {number} props.requiredPermissions - ID de los permisos requeridos para acceder a la ruta.
 * @returns {JSX.Element} - Elemento JSX que representa el componente `PrivateRoute`.
 */
export function PrivateRoute({ Element, requiredPermissions }) {
  const { user, permissions } = useContext(UserContext)

  // Verificar si el usuario está autenticado
  const isAuthenticated = !!user

  // Verificar si la ruta no requiere permisos de usuario
  if (requiredPermissions === undefined && isAuthenticated) { return <Element /> } 
  if (requiredPermissions === undefined && !isAuthenticated) { return <Navigate to="/login" /> } 

  // Verificar si el usuario tiene los permisos requeridos
  const hasPermissions = permissions.some(({ privileges }) => privileges.id === requiredPermissions)

  if (isAuthenticated && hasPermissions) { return <Element /> } 

  // Redirigir a la página de acceso denegado si no se cumplen las condiciones anteriores
  return <Navigate to="/access/denied"/>
}

PrivateRoute.propTypes = {
  Element: PropTypes.elementType,
  requiredPermissions: PropTypes.number
}