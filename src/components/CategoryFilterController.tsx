// components/CategoryFilterController.jsx
import React, { useState, useEffect, useCallback } from 'react';
import CategorySelector from './Buttons/CategorySelector';
import { categories as CATEGORIES } from '../constants/categories';

interface Product {
  IdProducto: string | number;
  Descripcion?: string;
  Categoria?: string;
  [key: string]: any;
}

interface CategoryFilterControllerProps {
  allProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  onCategoryChange?: (categoryId: string) => void;
}

const CategoryFilterController: React.FC<CategoryFilterControllerProps> = ({
  allProducts,
  setFilteredProducts,
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Función principal de filtrado
  const applyFilter = useCallback((categoryId: string) => {
    // Encontrar la categoría seleccionada
    let targetCategory = CATEGORIES[0]; // Por defecto "todos"
    for (let i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === categoryId) {
        targetCategory = CATEGORIES[i];
        break;
      }
    }

    // Si es "todos", retornar todos los productos
    if (targetCategory.id === 'todos') {
      setFilteredProducts(allProducts);
      onCategoryChange?.(categoryId);
      return;
    }

    // Filtrar productos basado en keywords
    const filtered = allProducts.filter(product => {
      const cat = product.Categoria?.toLowerCase() || '';
      const desc = product.Descripcion?.toLowerCase() || '';
      
      for (let i = 0; i < targetCategory.keywords.length; i++) {
        if (cat.includes(targetCategory.keywords[i]) || desc.includes(targetCategory.keywords[i])) {
          return true;
        }
      }
      return false;
    });

    setFilteredProducts(filtered);
    onCategoryChange?.(categoryId);
  }, [allProducts, setFilteredProducts, onCategoryChange]);

  // Manejar cambio de categoría
  const handleSelectCategory = useCallback((categoryId: string) => {
    if (categoryId === selectedCategory) return;
    setSelectedCategory(categoryId);
    applyFilter(categoryId);
  }, [selectedCategory, applyFilter]);

  // Aplicar filtro inicial
  useEffect(() => {
    if (allProducts.length > 0) {
      applyFilter(selectedCategory);
    }
  }, [allProducts]);

  return (
    <CategorySelector
      activeCategory={selectedCategory}
      onSelectCategory={handleSelectCategory}
    />
  );
};

export default CategoryFilterController;