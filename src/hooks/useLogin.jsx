import { useState } from 'react';
import ApiRoutes from '../api/ApiRoute';
import axios from 'axios';


export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // 👇 con axios el login se hace con post
      const response = await axios.post(ApiRoutes.Login, { email, password });

      console.log("Ruta de inicio de sesión:", ApiRoutes.Login);
      console.log("Respuesta del servidor:", response.data);

      // Guardar token en localStorage
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (err) {
      console.error("Error en login:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Error al iniciar sesión");
      return null;
    } finally {
      setLoading(false);
    }
 };

  const logout = () => {
    localStorage.removeItem('token');
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  return { login, logout, getToken, loading, error };
}
