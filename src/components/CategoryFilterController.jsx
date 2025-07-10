// src/components/CategoryFilterController.jsx
import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import CategorySelector from './Buttons/CategorySelector';

/** Diccionario de categorías → palabras clave */
const KEYWORDS = {
  hombre:     ['hombre', 'masculino', 'caballero'],
  mujer:      ['mujer', 'femenino', 'dama'],
  nino:       ['niño', 'nino', 'niña', 'nina', 'infantil'],
  tecnologia: ['tecnolog', 'electron', 'digital', 'smart'],
  variedades: ['variedade', 'variedad', 'otros', 'general'],
  hogar:      ['hogar', 'casa', 'cocina', 'muebles'],
  todos:      [], // se gestiona aparte
};

/** Normaliza tildes y lowercase */
const normalize = (str = '') =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const CategoryFilterController = ({
  allProducts,
  setFilteredProducts,
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  /* ---------- helpers ---------- */
  const filterByKeywords = useCallback(
    (keywords) =>
      allProducts.filter((p) => {
        const cat = normalize(p.Categoria);
        const desc = normalize(p.Descripcion);
        return keywords.some((kw) => cat.includes(kw) || desc.includes(kw));
      }),
    [allProducts]
  );

  const applyFilter = useCallback(
    (cat) => {
      if (cat === 'todos') {
        setFilteredProducts(allProducts);
      } else {
        setFilteredProducts(filterByKeywords(KEYWORDS[cat] || []));
      }
    },
    [allProducts, filterByKeywords, setFilteredProducts]
  );

  /* ---------- handler ---------- */
  const handleSelectCategory = useCallback(
    (cat) => {
      if (cat === selectedCategory) return; // ya activa
      setSelectedCategory(cat);
      applyFilter(cat);
      onCategoryChange?.(cat);
    },
    [selectedCategory, applyFilter, onCategoryChange]
  );

  /* ---------- efecto inicial y cada vez que cambien productos ---------- */
  useEffect(() => {
    if (allProducts.length) {
      applyFilter(selectedCategory);
      onCategoryChange?.(selectedCategory);
    }
  }, [allProducts, selectedCategory, applyFilter, onCategoryChange]);

  return (
    <CategorySelector
      activeCategory={selectedCategory}
      onSelectCategory={handleSelectCategory}
    />
  );
};

export default CategoryFilterController;
