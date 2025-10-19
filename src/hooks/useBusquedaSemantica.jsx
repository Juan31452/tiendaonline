import { useState, useCallback } from 'react';
import apiAxios from '../api/apiAxios';
import ApiRoutes from '../api/ApiRoute';

/**
 * Hook para realizar búsquedas semánticas de productos en el backend.
 *
 * @returns {object} - Estado y funciones para la búsqueda.
 * @property {Array} resultados - Los productos encontrados.
 * @property {boolean} loading - Verdadero mientras se realiza la búsqueda.
 * @property {string} error - Mensaje de error si la búsqueda falla.
 * @property {Function} buscar - Función para ejecutar la búsqueda. Recibe el término como argumento.
 * @property {Function} limpiarResultados - Función para limpiar los resultados de búsqueda.
 */
const useBusquedaSemantica = () => {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const buscar = useCallback(async (termino) => {
    if (!termino || !termino.trim()) {
      setResultados([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Usamos apiAxios para llamar al endpoint con el parámetro 'search'
      const { data } = await apiAxios.get(ApiRoutes.BusquedaPersonalizada, {
        params: { search: termino.trim() },
      });
      setResultados(data.productos || []);
    } catch (err) {
      console.error('❌ Error en búsqueda semántica:', err);
      setError(err.response?.data?.message || 'Error al buscar productos.');
      setResultados([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const limpiarResultados = useCallback(() => setResultados([]), []);

  return { resultados, loading, error, buscar, limpiarResultados };
};

export default useBusquedaSemantica;
