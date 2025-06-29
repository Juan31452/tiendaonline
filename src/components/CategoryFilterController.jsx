// components/CategoryFilterController.jsx
import React, { useState, useEffect } from 'react';
import CategorySelector from './CategorySelector';

/**
 * Filtra productos por categoría (palabras clave) y avisa al padre
 * cuál es la categoría seleccionada.
 */
const CategoryFilterController = ({
  allProducts,
  setFilteredProducts,
  onCategoryChange,          // ✅ nuevo callback opcional
}) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // ------------ helpers ------------
  const filterByKeywords = (keywords) =>
    allProducts.filter((product) => {
      const cat  = product.Categoria?.toLowerCase()   || '';
      const desc = product.Descripcion?.toLowerCase() || '';
      return keywords.some((kw) => cat.includes(kw) || desc.includes(kw));
    });

  const applyFilter = (categoryId) => {
    switch (categoryId) {
      case 'hombre':
        setFilteredProducts(filterByKeywords(['hombre', 'masculino', 'caballero']));
        break;
      case 'mujer':
        setFilteredProducts(filterByKeywords(['mujer', 'femenino', 'dama']));
        break;
      case 'nino':
        setFilteredProducts(filterByKeywords(['niño', 'nino', 'niña', 'nina', 'infantil']));
        break;
      case 'tecnologia':
        setFilteredProducts(filterByKeywords(['tecnolog', 'electron', 'digital', 'smart']));
        break;
      case 'variedades':
        setFilteredProducts(filterByKeywords(['variedade', 'variedad', 'otros', 'general']));
        break;
      case 'hogar':
        setFilteredProducts(filterByKeywords(['hoga', 'casa', 'hogar', 'cocina', 'muebles']));
        break;
      case 'todos':
      default:
        setFilteredProducts(allProducts);
    }
  };

  // ------------ manejador principal ------------
  const handleSelectCategory = (categoryId) => {
    if (categoryId === selectedCategory) return;          // ya está activa
    setSelectedCategory(categoryId);
    applyFilter(categoryId);
    onCategoryChange?.(categoryId);                       // ✅ avisa al padre
  };

  // ------------ efecto inicial ------------
  useEffect(() => {
    if (allProducts.length > 0) {
      applyFilter(selectedCategory);                      // filtro inicial
      onCategoryChange?.(selectedCategory);               // avisa al padre
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  return (
    <CategorySelector
      activeCategory={selectedCategory}
      onSelectCategory={handleSelectCategory}
    />
  );
};

export default CategoryFilterController;
