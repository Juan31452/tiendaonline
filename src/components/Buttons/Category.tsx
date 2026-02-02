import React from 'react';
import { categories } from '../../constants/categories';

interface CategoryProps {
  activeCategory: string;
  onSelect: (id: string) => void;
  products?: any[]; // Se pasa desde el padre en algunos casos, aunque no se use internamente aquí.
}

const Category: React.FC<CategoryProps> = ({ activeCategory, onSelect }) => {
  return (
    <div className="d-flex overflow-auto gap-2 py-1">
      {categories.map(({ id, name }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`btn btn-sm rounded-pill flex-shrink-0 ${
            activeCategory === id ? 'btn-primary' : 'btn-outline-primary'
          }`}
          aria-pressed={activeCategory === id}
          type="button"
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default Category;
