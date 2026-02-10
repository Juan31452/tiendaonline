import { useState, useCallback } from 'react';
import apiAxios from '../api/apiAxios';
import toArray from '../utils/toArray';
import ApiRoutes from '../api/ApiRoute';
import { Product, PaginationInfo } from '../components/types';

interface UseConsultasReturn {
  productos: Product[];
  pagination: PaginationInfo;
  loading: boolean;
  error: string;
  fetchPage: (
    page?: number, 
    limit?: number, 
    categoria?: string, 
    estado?: string, 
    sort?: string,
    role?: string
  ) => Promise<void>;
}

const useConsultas = (): UseConsultasReturn => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    totalPages: 1,
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 0
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchPage = useCallback(async (
    page: number = 1,
    limit: number = 100,
    categoria: string = '',
    estado: string = '',
    sort: string = 'newest',
    role: string = 'invitado' 
  ) => {
    setLoading(true);
    setError('');

    try {
      const response = await apiAxios.get(ApiRoutes.ConsultaCategoria, {
        params: {
          ...(categoria && categoria !== 'todos' ? { categoria } : {}),
          ...(estado ? { estado } : {}),
          ...(sort && sort !== 'newest' ? { sort } : {}),
          page,
          limit,
          '_': new Date().getTime()
        },
        headers: { Accept: 'application/json' },
         // Si necesitas enviar el rol en headers:
        ...(role ? { 'X-User-Role': role } : {})
      });

      console.log('Consultando con categoría:', categoria);
      console.log('URL de la API:', ApiRoutes.ConsultaCategoria);
      
      const data = response.data;
      console.log('Productos en Data', data);

      setProductos(toArray(data.productos || []) as Product[]);
      setPagination(data.pagination || {
        totalPages: 1,
        totalItems: 0,
        currentPage: page,
        itemsPerPage: limit
      });
    } catch (err: any) {
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