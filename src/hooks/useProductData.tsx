import { useEffect, useCallback, useState } from 'react';
import { usePagination } from './usePagination';
import useProductFilters from './useProductFilters';
import useConsultas from './useConsultas';
import { Product, PaginationInfo } from '../components/types';

const PAGE_SIZE = 100;

interface AvailableState {
  value: string;
  label: string;
}

export const useProductData = (role: string | null | undefined) => {
       // Si role es null/undefined, usar un valor por defecto
  const effectiveRole  = role || 'invitado';
  const { page, setPage, goToPage } = usePagination(1);

  // 1. Añadimos el estado para la ordenación. 'newest' es el valor inicial.
  const [activeSort, setActiveSort] = useState<string>('newest');

  const {
    activeCategory,
    activeEstado,
    availableStates,
    handleCategoryChange,
    handleEstadoChange,
  } = useProductFilters(effectiveRole, setPage);

  const {
    productos,
    pagination,
    loading,
    error,
    fetchPage,
  } = useConsultas();

  // Efecto para resetear el estado si el actual ya no está disponible
  useEffect(() => {
    if (availableStates.length > 0 && !availableStates.some((state) => state.value === activeEstado)) {
      handleEstadoChange('Disponible');
    }
  }, [availableStates, activeEstado, handleEstadoChange]);

   useEffect(() => {
    if (availableStates.length > 0 && !availableStates.some((state) => state.value === activeEstado)) {
      return;
    }
    fetchPage(page, PAGE_SIZE, activeCategory, activeEstado, activeSort, effectiveRole);
  }, [page, activeCategory, activeEstado, activeSort, fetchPage, availableStates, effectiveRole]);

  const refreshData = useCallback(() => {
    fetchPage(page, PAGE_SIZE, activeCategory, activeEstado, activeSort, effectiveRole);
  }, [page, activeCategory, activeEstado, activeSort, fetchPage, effectiveRole]);


  // 4. Creamos un manejador para cambiar la ordenación que también resetea la página a 1.
  const handleSortChange = useCallback((newSort: string) => {
    setPage(1);
    setActiveSort(newSort);
  }, [setPage]);

  return {
    productos,
    pagination: pagination as PaginationInfo,
    loading,
    error,
    page,
    goToPage,
    activeCategory,
    activeEstado,
    availableStates: availableStates as AvailableState[],
    handleCategoryChange,
    handleEstadoChange,
    handleSortChange, // 5. Exportamos el nuevo manejador.
    refreshData,
    activeSort, // 6. Exportamos el estado de ordenación activo.
  };
};

export default useProductData;