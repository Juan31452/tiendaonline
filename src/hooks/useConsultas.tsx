import { useState, useCallback } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';
import toArray from '../utils/toArray';

// Define los tipos para producto y paginación según tu modelo real

interface Producto {
  _id?: string;
  IdProducto?: string;
  Descripcion?: string;
  Precio?: number;
  Imagen?: string;
  Categoria?: string;
  Estado?: string;
  // ...otros campos
}

interface Pagination {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

const useConsultas = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    totalPages: 1,
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 0
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchPage = useCallback(
    async (
      page: number = 1,
      limit: number = 100,
      categoria: string = '',
      estado: string = ''
    ) => {
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
        setPagination(
          data.pagination || {
            totalPages: 1,
            totalItems: 0,
            currentPage: page,
            itemsPerPage: limit
          }
        );
      } catch (err: any) {
        console.error('Error al obtener productos:', err);
        setError(err.message || 'Error al cargar productos');
        setProductos([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    productos,
    pagination,
    loading,
    error,
    fetchPage
  };
};

export default useConsultas;