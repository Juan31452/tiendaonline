// components/CategoryFilterController.jsx
import React, { useState, useEffect } from 'react';
import CategorySelector from './CategorySelector';

const CategoryFilterController = ({ allProducts, setFilteredProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const filterByKeywords = (keywords) => {
    return allProducts.filter(product => {
      const cat = product.Categoria?.toLowerCase() || '';
      const desc = product.Descripcion?.toLowerCase() || '';
      return keywords.some(keyword => cat.includes(keyword) || desc.includes(keyword));
    });
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);

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
        setFilteredProducts(filterByKeywords(['variedade', 'otros', 'variedad', 'general']));
        break;
      case 'hogar':
        setFilteredProducts(filterByKeywords(['hoga', 'casa', 'hogar', 'cocina', 'muebles']));
        break;
      case 'todos':
      default:
        setFilteredProducts(allProducts);
    }
  };

  // Opcional: aplicar filtro inicial si ya hay productos cargados
  useEffect(() => {
    if (allProducts.length > 0) {
      handleSelectCategory(selectedCategory);
    }
  }, []);

  return (
    <CategorySelector 
      activeCategory={selectedCategory}
      onSelectCategory={handleSelectCategory}
    />
  );
};

export default CategoryFilterController;
