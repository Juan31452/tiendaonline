import axios from 'axios';
import Rutas from '../config/Rutas';

// Crea una instancia de Axios con configuración base
const apiAxios = axios.create({
  baseURL: `${Rutas.APIHOSTRemote}/api`, // Usando la ruta definida desde config/Rutas.js
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Petición (Request Interceptor)
// Se ejecuta ANTES de que cada petición sea enviada.
apiAxios.interceptors.request.use(
  (config) => {
    // Obtiene el token del localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Si el token existe, lo añade a la cabecera de autorización
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Maneja errores en la configuración de la petición
    return Promise.reject(error);
  }
);

// Interceptor de Respuesta (Response Interceptor)
// Se ejecuta DESPUÉS de recibir una respuesta (o un error).
apiAxios.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa (2xx), no hace nada.
  (error) => {
    // Si la respuesta es un error 401 (No autorizado)
    if (error.response && error.response.status === 401) {
      // 1. Limpia el token del almacenamiento local
      localStorage.removeItem('token');
      // 2. Redirige al usuario a la página de login
      window.location.href = '/login';
      // Opcional: podrías usar navigate('/login') de react-router-dom si manejas el estado globalmente
    }
    // Rechaza la promesa para que el error pueda ser manejado por el .catch() de la llamada original
    return Promise.reject(error);
  }
);

export default apiAxios;
