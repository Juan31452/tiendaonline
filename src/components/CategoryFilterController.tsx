// components/CategoryFilterController.tsx
import React, { useState, useEffect } from 'react';
import { applyFilter } from '../utils/filterUtils';
import CategorySelector from './Buttons/CategorySelector';
import type { Product, CategoryId } from '../components/Types';

type Props = {
  allProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  onCategoryChange?: (categoryId: CategoryId) => void;
};

const CategoryFilterController: React.FC<Props> = ({
  allProducts,
  setFilteredProducts,
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('todos');

  const handleSelectCategory = (categoryId: CategoryId) => {
    if (categoryId === selectedCategory) return;
    setSelectedCategory(categoryId);
    const filtered = applyFilter(categoryId, allProducts);
    setFilteredProducts(filtered);
    onCategoryChange?.(categoryId);
  };

  useEffect(() => {
    if (allProducts.length > 0) {
      console.log('🧃 Productos recibidos:', allProducts.length);
      const filtered = applyFilter(selectedCategory, allProducts);
      setFilteredProducts(filtered);
      onCategoryChange?.(selectedCategory);
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