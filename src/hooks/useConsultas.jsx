import { useState, useCallback } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';
import toArray from '../utils/toArray';

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

  const fetchPage = useCallback(async (page = 1, limit = 100, categoria = '',  estado = '') => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(ApiRoutes.ConsultaCategoria, {
        params: {
          ...(categoria && categoria !== 'todos' ? { categoria } : {}),
          ...(estado ? { estado } : {}),
          page,
          limit
        },
        headers: { Accept: 'application/json' },
      });
        console.log('Consultando con categoría:', categoria);
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