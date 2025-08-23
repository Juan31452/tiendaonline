import React, { createContext, useState, useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { getToken, getUserRole, logout: logoutHook } = useLogin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [name, setName] = useState(null);

  useEffect(() => {
  const token = getToken();
  const userRole = getUserRole();
  setIsAuthenticated(!!token);
  setRole(userRole);
  setLoadingAuth(false);
}, []);


  const loginContext = (token, userRole,userName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('name', userName);
    setIsAuthenticated(true);
    setRole(userRole);
    setName(userName);
    setIsAuthenticated(true);
      setRole(userRole);
      setName(userName); // 🔹 importante para que NavBar reciba el nombre
      console.log("loginContext - isAuthenticated:", true, "role:", userRole, "name:", userName);
      };

  const logoutContext = () => {
    logoutHook();
    setIsAuthenticated(false);
     setRole(null);
     setName(null);
  };

  if (loadingAuth) return <div>Cargando...</div>; // evita render prematuro

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, name, login: loginContext, logout: logoutContext }}>
      {!loadingAuth && children} 
    </AuthContext.Provider>
  );
};