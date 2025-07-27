// components/CategoryFilterController.jsx
import React, { useState, useEffect } from 'react';
import CategorySelector from './Buttons/CategorySelector';

/**
 * Filtra productos por categoría (palabras clave) y avisa al padre
 * cuál es la categoría seleccionada.
 */
const CategoryFilterController = ({
  allProducts,
  setFilteredProducts,
  onCategoryChange, // ✅ opcional: el padre se entera del cambio
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
      case 'Hombre':
        setFilteredProducts(filterByKeywords(['hombre', 'masculino', 'caballero']));
        break;
      case 'Mujer':
        setFilteredProducts(filterByKeywords(['mujer', 'femenino', 'dama']));
        break;
      case 'Ninos':
        setFilteredProducts(filterByKeywords(['niño', 'nino', 'niña', 'nina', 'infantil']));
        break;
      case 'Tecnologia':
        setFilteredProducts(filterByKeywords(['tecnolog', 'electron', 'digital', 'smart']));
        break;
      case 'Variedades':
        setFilteredProducts(filterByKeywords(['variedade', 'variedad', 'otros', 'general']));
        break;
      case 'Hogar':
        setFilteredProducts(filterByKeywords(['hoga', 'casa', 'hogar', 'cocina', 'muebles']));
        break;
      case 'Todos':
      default:
        setFilteredProducts(allProducts);
    }
  };

  // ------------ manejador principal ------------
  const handleSelectCategory = (categoryId) => {
    if (categoryId === selectedCategory) return; // Ya está activa
    setSelectedCategory(categoryId);
    applyFilter(categoryId);
    onCategoryChange?.(categoryId);
  };

  // ------------ efecto inicial ------------
  useEffect(() => {
    if (allProducts.length > 0) {
    //console.log('🧃 Productos recibidos en CategoryFilterController:', allProducts.length);
    //console.table(
      //allProducts.map(p => ({
        //Id: p.IdProducto,
        //Categoria: p.Categoria,
        //Descripcion: p.Descripcion?.slice(0, 50), // cortamos por si es muy larga
      //}))
    //);

    applyFilter(selectedCategory); // filtro inicial
    onCategoryChange?.(selectedCategory);
  }
}, [allProducts]);
  // ------------ renderizado ------------

  return (
    <CategorySelector
      activeCategory={selectedCategory}
      onSelectCategory={handleSelectCategory}
    />
  );
};

export default CategoryFilterController;
