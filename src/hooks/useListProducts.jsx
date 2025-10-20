// src/hooks/useListProducts.js
import { useState, useCallback } from 'react';
import ApiRoutes from '../api/ApiRoute';
import toArray from '../utils/toArray';
import apiAxios from '../api/apiAxios';

const useListProducts = () => {
  const [productos, setProductos] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, totalItems: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPage = useCallback(async (pagina = 1, categoria = '', estado = '') => {
    setLoading(true);
    setError('');

    try {
      // Usamos la instancia apiAxios que ya gestiona la URL base y los tokens
      const { data } = await apiAxios.get(ApiRoutes.listproductsRemote, {
        params: {
          categoria,
          estado,
          page: pagina,
        },
      });

      // La respuesta del backend parece tener los productos dentro de un objeto
      setProductos(toArray(data.productos || []));
      setPagination(
        data.pagination ?? { totalPages: 1, totalItems: data.productos?.length || 0 }
      );
    } catch (err) {
      console.error('❌ GET productos:', err);
      setError(err.response?.data?.error || 'No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  }, []);

  return { productos, pagination, loading, error, fetchPage };
};
// Este hook permite listar productos con paginación y filtros opcionales
// Puedes usarlo en cualquier componente que necesite mostrar una lista de productos
export default useListProducts;