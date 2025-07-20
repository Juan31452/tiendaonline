// src/hooks/useEstadisticasProductos.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';

const useEstadisticasProductos = () => {
  const [estadisticas, setEstadisticas] = useState([]);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState(null);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(ApiRoutes.EstadisticasProductos, {
          headers: { Accept: 'application/json' },
        });

        if (data.success) {
          setEstadisticas(data.estadisticas);
          console.log('Estadísticas obtenidas:', data.estadisticas);
        } else {
          setError(data.message || 'Error al cargar estadísticas');
        }
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || 'Error de red al obtener estadísticas'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []); // solo se ejecuta una vez al montar

  return {
    estadisticas,
    loading,
    error,
  };
};

export default useEstadisticasProductos;
// Este hook permite obtener estadísticas de productos agrupados por categoría y estado
// Puedes usarlo en cualquier componente que necesite mostrar estadísticas de productos