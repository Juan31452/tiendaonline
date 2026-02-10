import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';
import { useLogin } from '../../hooks/useLogin';

export interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  name: string | null;
  login: (token: string, userRole: string, userName: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { getToken, getUserRole, logout: logoutHook } = useLogin();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
  const token = getToken();
  const userRole = getUserRole();
  const userName = localStorage.getItem('name'); // 🔹 Recupera el nombre también

  setIsAuthenticated(!!token);
  setRole(userRole);
  setName(userName); // 🔹 Esto mantiene el nombre en el contexto
  setLoadingAuth(false);
}, []);


  const loginContext = (token: string, userRole: string, userName: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('name', userName);
    setIsAuthenticated(true);
    setRole(userRole);
    setName(userName);
      console.log("loginContext - isAuthenticated:", true, "role:", userRole, "name:", userName);
      };

  const logoutContext = () => {
    logoutHook();
    setIsAuthenticated(false);
    localStorage.removeItem('name'); // Aseguramos limpiar el nombre también
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
