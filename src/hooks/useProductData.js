import { useEffect, useCallback } from 'react';
import { usePagination } from './usePagination';
import useProductFilters from './useProductFilters';
import useConsultas from './useConsultas';

const PAGE_SIZE = 100;

/**
 * Hook de alto nivel que encapsula la lógica de paginación,
 * filtrado y obtención de datos para la lista de productos.
 * @param {string} role - El rol del usuario actual.
 * @returns Un objeto con los datos de productos y los manejadores.
 */
export const useProductData = (role) => {
  const { page, setPage, goToPage } = usePagination(1);

  const {
    activeCategory,
    activeEstado,
    availableStates,
    handleCategoryChange,
    handleEstadoChange,
  } = useProductFilters(role, setPage);

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

  // Efecto para buscar datos cuando cambian los filtros o la página
  useEffect(() => {
    if (availableStates.length > 0 && !availableStates.some((state) => state.value === activeEstado)) {
      return;
    }
    fetchPage(page, PAGE_SIZE, activeCategory, activeEstado);
  }, [page, activeCategory, activeEstado, fetchPage, availableStates]);

  const refreshData = useCallback(() => {
    fetchPage(page, PAGE_SIZE, activeCategory, activeEstado);
  }, [page, activeCategory, activeEstado, fetchPage]);

  return {
    productos,
    pagination,
    loading,
    error,
    page,
    goToPage,
    activeCategory,
    activeEstado,
    availableStates,
    handleCategoryChange,
    handleEstadoChange,
    refreshData,
  };
};

export default useProductData;

