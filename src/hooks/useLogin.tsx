import { useState, useCallback } from 'react';
import ApiRoutes from '../api/ApiRoute';
import apiAxios from '../api/apiAxios';

interface UserData {
  role: string;
  name: string;
  // Añade otras propiedades del usuario si las hay
}

interface LoginResponse {
  token: string;
  user: UserData;
  message: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiAxios.post<any>('/users/login', { email, password });

      console.log("Ruta de inicio de sesión:", ApiRoutes.Login);
      const result = response.data;
      console.log("Respuesta del servidor:", result);

      // Extraemos el contenido real (si viene envuelto en result.data lo usamos, si no, el result directo)
      const actualData = result.data || result;

      if (actualData?.token) localStorage.setItem("token", actualData.token);
      
      if (actualData?.user) {
        localStorage.setItem("role", actualData.user.role);
        localStorage.setItem("name", actualData.user.name);
      }

      return actualData as LoginResponse;
    } catch (err: any) {
      console.error("Error en login:", err.response?.data || err.message, err);
      setError(err.response?.data?.message || "Error al iniciar sesión");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback((): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name'); // Limpiar el nombre también al cerrar sesión
  }, []);

  const getToken = useCallback((): string | null => {
    return localStorage.getItem('token');
  }, []);

  const getUserRole = useCallback((): string | null => {
    return localStorage.getItem('role');
  }, []);

  return { login, logout, getToken, getUserRole, loading, error };
};