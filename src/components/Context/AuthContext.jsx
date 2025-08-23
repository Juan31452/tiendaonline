import React, { createContext, useState, useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { getToken, getUserRole, logout: logoutHook } = useLogin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
  const token = getToken();
  const userRole = getUserRole();  // <-- aquí lee el rol
  console.log("AuthProvider carga inicial:", { token, userRole });
  setIsAuthenticated(!!token);
  setRole(userRole);               // <-- setea el rol
  setLoadingAuth(false);
}, [getToken, getUserRole]);


  const loginContext = (token, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logoutContext = () => {
    logoutHook();
    setIsAuthenticated(false);
    setRole(null);
  };

  if (loadingAuth) return <div>Cargando...</div>; // evita render prematuro

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login: loginContext, logout: logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};