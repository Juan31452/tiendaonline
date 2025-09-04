// src/hooks/useEstadisticasProductos.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';

const useEstadisticasProductos = () => {
  const [estadisticas, setEstadisticas] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController para cancelar la petición si el componente se desmonta
    const controller = new AbortController();
    const { signal } = controller;

    const fetchEstadisticas = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(ApiRoutes.EstadisticasProductos, {
          headers: { Accept: 'application/json' },
          signal, // Asociar la señal al request
        });

        if (data.success) {
          // Es una buena práctica asegurarse que los datos son del tipo esperado
          setEstadisticas(Array.isArray(data.estadisticas) ? data.estadisticas : []);
          setTotalProductos(data.totalProductos || 0); // <-- ¡Aquí está la magia!
        } else {
          setError(data.message || 'Error al cargar estadísticas');
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          // Si la petición fue cancelada, no hacemos nada.
          console.log('Petición cancelada:', err.message);
          return;
        }
        setError(
          err.response?.data?.message || err.message || 'Error de red al obtener estadísticas'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();

    // Función de limpieza para cancelar la petición cuando el componente se desmonte
    return () => {
      controller.abort();
    };
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  return {
    estadisticas,
    totalProductos, // <-- Ahora el total está disponible para tus componentes
    loading,
    error,
  };
};

export default useEstadisticasProductos;
// Este hook permite obtener estadísticas de productos agrupados por categoría y estado
// Puedes usarlo en cualquier componente que necesite mostrar estadísticas de productos