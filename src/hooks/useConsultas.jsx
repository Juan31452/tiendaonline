import { useState, useCallback } from 'react';
import apiAxios from '../api/apiAxios'; // 1. Importa la instancia de Axios configurada
import toArray from '../utils/toArray';
import ApiRoutes from '../api/ApiRoute';

const useConsultas = () => {
  const [productos, setProductos] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Añadimos 'sort' como parámetro a la función.
  const fetchPage = useCallback(async (page = 1, limit = 100, categoria = '',  estado = '', sort = 'default') => {
    setLoading(true);
    setError('');

    try {
      const response = await apiAxios.get(ApiRoutes.ConsultaCategoria, { // 2. Usa la instancia 'apiAxios' y una ruta relativa
        params: {
          ...(categoria && categoria !== 'todos' ? { categoria } : {}),
          ...(estado ? { estado } : {}),
          // 2. Si 'sort' no es el valor por defecto, lo añadimos a los parámetros de la petición.
          ...(sort && sort !== 'default' ? { sort } : {}),
          page,
          limit
        },
        headers: { Accept: 'application/json' },
      });
        console.log('Consultando con categoría:', categoria);
        console.log('URL de la API:', ApiRoutes.ConsultaCategoria);
      const data = response.data;
      console.log('Productos en Data', data);

      setProductos(toArray(data.productos || []));
      setPagination(data.pagination || {
        totalPages: 1,
        totalItems: 0,
        currentPage: page,
        itemsPerPage: limit
      });
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setError(err.message || 'Error al cargar productos');
      setProductos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    productos,
    pagination,
    loading,
    error,
    fetchPage
  };
};

export default useConsultas;