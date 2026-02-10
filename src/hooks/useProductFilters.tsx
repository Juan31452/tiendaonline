import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { productStates as ALL_PRODUCT_STATES, GUEST_PRODUCT_STATES } from '../constants/states';

interface StateOption {
  value: string;
  label: string;
}

const useProductFilters = (
  userRole: string, 
  setPage?: Dispatch<SetStateAction<number>> // ← Tipo correcto
) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [activeEstado, setActiveEstado] = useState<string>('disponible');

  const availableStates = useMemo<StateOption[]>(() => {
    if (userRole === 'admin' || userRole === 'vendedor') {
      return ALL_PRODUCT_STATES;
    }
    return GUEST_PRODUCT_STATES;
  }, [userRole]);

  const handleCategoryChange = (newCategory: string) => {
    setActiveCategory(newCategory);
    if (setPage) {
      setPage(1);
    }
  };

  const handleEstadoChange = (newEstado: string) => {
    setActiveEstado(newEstado);
    if (setPage) {
      setPage(1);
    }
  };

  return {
    activeCategory,
    activeEstado,
    availableStates,
    handleCategoryChange,
    handleEstadoChange,
  };
};

export default useProductFilters;