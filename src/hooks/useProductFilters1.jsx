import { useState, useMemo } from 'react';
import { productStates as ALL_PRODUCT_STATES, GUEST_PRODUCT_STATES } from '../constants/states';

/**
 * Hook personalizado para gestionar la lógica de filtrado de productos.
 * @param {string} userRole - El rol del usuario actual ('admin', 'vendedor', etc.).
 * @returns {object} - Estado y manejadores para los filtros.
 */
const useProductFilters = (userRole) => {
  // Estado para la categoría seleccionada
  const [activeCategory, setActiveCategory] = useState('todos');
  // Estado para el estado del producto seleccionado
  const [activeEstado, setActiveEstado] = useState('disponible');
  // Estado para la página actual
  const [page, setPage] = useState(1);

  // Determina qué estados de producto están disponibles para filtrar según el rol del usuario.
  // `useMemo` evita que este cálculo se repita en cada renderizado si el rol no ha cambiado.
  const availableStates = useMemo(() => {
    if (userRole === 'admin' || userRole === 'vendedor') {
      return ALL_PRODUCT_STATES; // El admin puede ver todos los estados
    }
    // Otros roles solo ven los estados de invitado (solo 'Disponible,Nuevo y Oferta')
    return GUEST_PRODUCT_STATES;
  }, [userRole]);

  // Manejador para cambiar la categoría y reiniciar la paginación
  const handleCategoryChange = (newCategory) => {
    setActiveCategory(newCategory);
    setPage(1); // Reinicia a la primera página al cambiar el filtro
  };

  // Manejador para cambiar el estado y reiniciar la paginación
  const handleEstadoChange = (newEstado) => {
    setActiveEstado(newEstado);
    setPage(1); // Reinicia a la primera página al cambiar el filtro
  };

  // Retorna todo el estado y las funciones que el componente necesitará
  return {
    activeCategory,
    activeEstado,
    page,
    availableStates,
    handleCategoryChange,
    handleEstadoChange,
    setPage, // Exportamos setPage para el componente de paginación
  };
};

export default useProductFilters;
