import { useState, useCallback } from 'react';
import ApiRoutes from '../api/ApiRoute';
import apiAxios from '../api/apiAxios';

interface UserData {
  role: string;
  name: string;
  // Añade otras propiedades del usuario si las hay
}

// 1. Definimos una interfaz genérica para todas las respuestas de la API
interface ApiResponse<T> {
  success: boolean;
  data: T;
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
      // 2. Usamos la interfaz genérica en la petición de Axios
      const response = await apiAxios.post<ApiResponse<LoginResponse>>('/users/login', { email, password });

      console.log("Ruta de inicio de sesión:", ApiRoutes.Login);
      const result = response.data;
      console.log("Respuesta del servidor:", result);

      const actualData = result.data;

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