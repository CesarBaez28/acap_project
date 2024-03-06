/**
 * Proveedor de contexto y hook personalizado para la gestión del usuario y permisos.
 *
 * @typedef {Object} UserContextValue
 * @property {Object} user - Información del usuario.
 * @property {Array} permissions - Lista de permisos asociados al usuario.
 * @property {function} setUser - Función para actualizar la información del usuario.
 * @property {function} setPermissions - Función para actualizar la lista de permisos.
 * @property {function} updateUser - Función para actualizar la información del usuario y almacenar en localStorage.
 * @property {function} updatePermissions - Función para actualizar la lista de permisos y almacenar en localStorage.
 * @property {function} clearUser - Función para limpiar la información del usuario y permisos almacenados.
 */

import { createContext, useState, useEffect, useMemo, useCallback } from 'react';

/**
 * Contexto de usuario para gestionar la información del usuario y sus permisos.
 * @type {React.Context<UserContextValue>}
 */
export const UserContext = createContext();

/**
 * Proveedor de contexto para la gestión del usuario y permisos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos dentro del contexto.
 * @returns {React.ReactNode} - Componente proveedor del contexto.
 */
export const UserContextProvider = ({ children }) => {
  // Estados para el usuario, permisos y bandera de carga de datos
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Efecto para cargar datos del usuario y permisos desde localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUser(parsedData.user);
      setPermissions(parsedData.permissions);
    }
    setIsDataLoaded(true);
  }, []);

  /**
   * Función para actualizar la información del usuario y almacenar en localStorage.
   * @param {Object} userData - Información del usuario.
   */
  const updateUser = useCallback(
    (userData) => {
      setUser(userData);
      const dataToStore = {
        user: userData,
        permissions: permissions,
      };
      localStorage.setItem('userData', JSON.stringify(dataToStore));
    },
    [permissions]
  );

  /**
   * Función para actualizar la lista de permisos y almacenar en localStorage.
   * @param {Array} userPermissions - Lista de permisos asociados al usuario.
   */
  const updatePermissions = useCallback(
    (userPermissions) => {
      setPermissions(userPermissions);
      const dataToStore = {
        user: user,
        permissions: userPermissions,
      };
      localStorage.setItem('userData', JSON.stringify(dataToStore));
    },
    [user]
  );

  /**
   * Función para limpiar la información del usuario y permisos almacenados.
   */
  const clearUser = useCallback(() => {
    setUser({});
    setPermissions([]);
    localStorage.removeItem('userData');
  }, []);

  /**
   * Valor del contexto con las funciones y estados necesarios.
   * @type {UserContextValue}
   */
  const contextValue = useMemo(
    () => ({
      user,
      permissions,
      setUser,
      setPermissions,
      updateUser,
      updatePermissions,
      clearUser,
    }),
    [user, permissions, setUser, setPermissions, updateUser, updatePermissions, clearUser]
  );

  // Devolver el proveedor de contexto con los componentes hijos, condicionalmente renderizados
  return <UserContext.Provider value={contextValue}>{isDataLoaded ? children : null}</UserContext.Provider>;
};
