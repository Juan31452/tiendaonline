import React, { createContext, useState, useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { getToken, logout: logoutHook } = useLogin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, [getToken]);

  const loginContext = (token) => {
    localStorage.setItem('token', token); // tu useLogin ya hace esto, pero aquí aseguramos el estado
    setIsAuthenticated(true);
  };

  const logoutContext = () => {
    logoutHook(); // limpia localStorage
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: loginContext, logout: logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};
