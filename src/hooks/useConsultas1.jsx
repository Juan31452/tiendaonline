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
  const fetchPage = useCallback(async (page = 1, limit = 100, categoria = '',  estado = '', sort = 'newest') => {
    setLoading(true);
    setError('');

    try {
      const response = await apiAxios.get(ApiRoutes.ConsultaCategoria, { // 2. Usa la instancia 'apiAxios' y una ruta relativa
        params: {
          ...(categoria && categoria !== 'todos' ? { categoria } : {}),
          ...(estado ? { estado } : {}),
          // Si 'sort' no es 'newest' (el nuevo default), lo enviamos. El backend ya asume 'newest' si no se especifica.
          ...(sort && sort !== 'newest' ? { sort } : {}),
          page,
          limit,
          // ✅ SOLUCIÓN: Añadimos un "cache buster" para evitar el caché del navegador.
          '_': new Date().getTime()
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