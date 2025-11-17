import { useEffect, useCallback, useState } from 'react';
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

  // 1. Añadimos el estado para la ordenación. 'default' es el valor inicial.
  const [activeSort, setActiveSort] = useState('default');

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
    // 2. Pasamos el estado de ordenación a la función que obtiene los datos.
    fetchPage(page, PAGE_SIZE, activeCategory, activeEstado, activeSort);
  }, [page, activeCategory, activeEstado, activeSort, fetchPage, availableStates]);

  const refreshData = useCallback(() => {
    // 3. También incluimos la ordenación al refrescar los datos.
    fetchPage(page, PAGE_SIZE, activeCategory, activeEstado, activeSort);
  }, [page, activeCategory, activeEstado, activeSort, fetchPage]);

  // 4. Creamos un manejador para cambiar la ordenación que también resetea la página a 1.
  const handleSortChange = useCallback((newSort) => {
    setPage(1);
    setActiveSort(newSort);
  }, [setPage]);

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
    handleSortChange, // 5. Exportamos el nuevo manejador.
    refreshData,
    activeSort, // 6. Exportamos el estado de ordenación activo.
  };
};

export default useProductData;
