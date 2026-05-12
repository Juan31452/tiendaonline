import React, { createContext, useState, useEffect, ReactNode, FC, useContext } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

export interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  name: string | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// 1. No exportamos el contexto directamente para evitar el error de Vite
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { getToken, getUserRole, logout: logoutHook, login: loginApi, loading, error } = useLogin();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [name, setName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const userRole = getUserRole();
    const userName = localStorage.getItem('name');

    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
      setName(userName);
    }
    setLoadingAuth(false);
  }, [getToken, getUserRole]);

  const login = async (email: string, pass: string) => {
    const data = await loginApi(email, pass);
    if (data && data.token && data.user) {
      localStorage.setItem('name', data.user.name);
      setIsAuthenticated(true);
      setRole(data.user.role || null);
      setName(data.user.name);
      navigate('/'); // Redirigir aquí centraliza la lógica
    }
  };

  const logoutContext = () => {
    logoutHook();
    setIsAuthenticated(false);
    localStorage.removeItem('name');
    setRole(null);
    setName(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, name, login, logout: logoutContext, loading, error }}>
      {loadingAuth ? <div>Cargando...</div> : children}
    </AuthContext.Provider>
  );
};
