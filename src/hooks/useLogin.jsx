import { useState } from 'react';
import ApiRoutes from '../api/ApiRoute';
import apiAxios from '../api/apiAxios'; // 1. Importamos la instancia correcta


export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiAxios.post('/users/login', { email, password }); // 2. Usamos apiAxios y una ruta relativa

      console.log("Ruta de inicio de sesión:", ApiRoutes.Login);
      console.log("Respuesta del servidor:", response.data);

      const token = response.data.token;
      const role = response.data.user.role; // 🔹 aquí está realmente
      console.log("Token recibido en useLogin:", token);
      console.log("Role recibido en useLogin:", role);
      // role debería venir del backend: "admin" o "vendedor"

      // Guardar token y rol en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

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
    localStorage.removeItem('role');
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const getUserRole = () => {
    return localStorage.getItem('role');
  };

  return { login, logout, getToken, getUserRole, loading, error };
}