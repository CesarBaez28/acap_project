import { createContext, useState, useEffect, useMemo, useCallback } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUser(parsedData.user);
      setPermissions(parsedData.permissions);
    }
    setIsDataLoaded(true);
  }, []);

  const updateUser = useCallback((userData) => {
    setUser(userData);
    const dataToStore = {
      user: userData,
      permissions: permissions,
    };
    localStorage.setItem('userData', JSON.stringify(dataToStore));
  }, [permissions]);

  const updatePermissions = useCallback((userPermissions) => {
    setPermissions(userPermissions);
    const dataToStore = {
      user: user,
      permissions: userPermissions,
    };
    localStorage.setItem('userData', JSON.stringify(dataToStore));
  }, [user]);

  const clearUser = useCallback(() => {
    setUser({});
    setPermissions([]);
    localStorage.removeItem('userData');
  }, []);

  const contextValue = useMemo(() => {
    return { user, permissions, setUser, setPermissions, updateUser, updatePermissions, clearUser };
  }, [user, permissions, setUser, setPermissions, updateUser, updatePermissions, clearUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {isDataLoaded ? children : null}
    </UserContext.Provider>
  );
};
