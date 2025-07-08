// src/hooks/useListProducts.js
import { useState, useCallback } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';
import toArray from '../utils/toArray';

const useListProducts= () => {
  const [productos, setProductos]   = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, totalItems: 0 });
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  /** Pide una página y rellena el estado */
  const fetchPage = useCallback(async (pagina = 1) => {
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.get(ApiRoutes.listproductsRemote, {
        params : { page: pagina },
        headers: { Accept: 'application/json' },
      });

      setProductos(toArray(data)); // <- siempre array
      setPagination(
        data.pagination ?? { totalPages: 1, totalItems: data.length }
      );
    } catch (err) {
      console.error('❌ GET productos:', err);
      setError(err.response?.data?.error || 'No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  }, []);

  return { productos, pagination, loading, error, fetchPage };
}

export default useListProducts;