import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../contexts/userContext"

export function PrivateRoute({ Element, requiredPermissions }) {
  const { user, permissions } = useContext(UserContext)

  // Verificar si el usuario está autenticado
  const isAuthenticated = !!user

  // Verifica si la ruta no necesita permisos de usuario
  if (requiredPermissions === undefined && isAuthenticated) { return <Element /> } 
  if (requiredPermissions === undefined && !isAuthenticated) { return <Navigate to="/login" /> } 

  const hasPermissions = permissions.some(({ privileges }) => privileges.id === requiredPermissions)

  if (isAuthenticated && hasPermissions) { return <Element /> } 
  return <Navigate to="/access/denied"/>
}