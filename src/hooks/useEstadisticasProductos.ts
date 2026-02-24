import { useState, useEffect } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';
import apiAxios from '../api/apiAxios';
import { Estadistica } from '../components/types';


/**
 * Interfaz para la respuesta de la API
 */
interface EstadisticasResponse {
  success: boolean;
  estadisticas: Estadistica[];
  totalProductos: number;
  message?: string;
}

/**
 * Interfaz para los parámetros del hook
 */
interface UseEstadisticasProductosOptions {
  enabled?: boolean;
}

/**
 * Interfaz para el retorno del hook
 */
interface UseEstadisticasProductosReturn {
  estadisticas: Estadistica[];
  totalProductos: number;
  loading: boolean;
  error: string | null;
}

/**
 * Hook personalizado para obtener estadísticas de productos
 * Este hook permite obtener estadísticas de productos agrupados por categoría y estado
 */
const useEstadisticasProductos = (
  { enabled = true }: UseEstadisticasProductosOptions = {}
): UseEstadisticasProductosReturn => {
  const [estadisticas, setEstadisticas] = useState<Estadistica[]>([]);
  const [totalProductos, setTotalProductos] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      // Si el hook no está habilitado, limpiamos el estado y no hacemos nada.
      setEstadisticas([]);
      setTotalProductos(0);
      setLoading(false);
      setError(null);
      return;
    }
    // AbortController para cancelar la petición si el componente se desmonta
    const controller = new AbortController();
    const { signal } = controller;

    const fetchEstadisticas = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        // ✅ Usamos la instancia de apiAxios que ya tiene los interceptores
        const { data } = await apiAxios.get<EstadisticasResponse>(
          ApiRoutes.EstadisticasProductos,
          {
            // El token se añade automáticamente gracias al interceptor
            signal,
          }
        );

        if (data.success) {
          // Es una buena práctica asegurarse que los datos son del tipo esperado
          setEstadisticas(
            Array.isArray(data.estadisticas) ? data.estadisticas : []
          );
          setTotalProductos(data.totalProductos || 0); // <-- ¡Aquí está la magia!
        } else {
          setError(data.message || 'Error al cargar estadísticas');
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          // Si la petición fue cancelada, no hacemos nada.
          console.log('Petición cancelada:', (err as Error).message);
          return;
        }
        const apiError = err as any;
        setError(
          apiError.response?.data?.message ||
            apiError.message ||
            'Error de red al obtener estadísticas'
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
  }, [enabled]);

  return {
    estadisticas,
    totalProductos, // <-- Ahora el total está disponible para tus componentes
    loading,
    error,
  };
};

export default useEstadisticasProductos;
