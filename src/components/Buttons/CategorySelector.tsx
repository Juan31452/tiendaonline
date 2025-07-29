// components/CategorySelector.tsx
import React from 'react';
import { categories } from '../../constants/categories';
import type { CategoryId } from '../Types';

type Category = typeof categories[number];

type Props = {
  onSelectCategory: (categoryId: CategoryId) => void;
  activeCategory: CategoryId;
};

const CategorySelector: React.FC<Props> = ({ onSelectCategory, activeCategory }) => {
  return (
    <div className="fixed-top bg-white" style={{ top: '56px' }}>
      <div className="container-fluid">
        <div className="d-flex overflow-auto gap-2 py-2">
          {categories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`btn btn-lg px-4 py-2 rounded-pill flex-shrink-0 ${
                activeCategory === category.id ? 'btn-primary' : 'btn-outline-primary'
              }`}
              style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
