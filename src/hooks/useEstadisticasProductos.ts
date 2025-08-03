// src/hooks/useEstadisticasProductos.ts

import { useState, useEffect } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';
import { EstadisticaProducto, EstadisticasPorCategoria } from '@/types/Estadisticas';
import agruparPorCategoria from '../utils/agruparPorCategoria';

interface ApiResponse {
  success: boolean;
  estadisticas: EstadisticaProducto[];
  message?: string;
}

const useEstadisticasProductos = () => {
  const [estadisticas, setEstadisticas] = useState<EstadisticasPorCategoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<ApiResponse>(ApiRoutes.EstadisticasProductos, {
          headers: { Accept: 'application/json' },
        });

        if (response.data.success) {
          console.log('Respuesta de la API:', response.data);
          // Verificar que la respuesta contenga las estadísticas
          if (!response.data.estadisticas || !Array.isArray(response.data.estadisticas)) {
            throw new Error('Datos de estadísticas no válidos');
          }
          // Agrupar las estadísticas por categoría
          const agrupadas = agruparPorCategoria(response.data.estadisticas);
          setEstadisticas(agrupadas);
          console.log('¿Es array?', Array.isArray(agrupadas));
          console.log('Contenido:', agrupadas);
        } else {
          setError(response.data.message || 'Error al cargar estadísticas');
        }
      } catch (err: any) {
        setError(
          err?.response?.data?.message || err.message || 'Error de red al obtener estadísticas'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);

  return {
    estadisticas,
    loading,
    error,
  };
};

export default useEstadisticasProductos;
