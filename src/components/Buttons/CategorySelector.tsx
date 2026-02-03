// components/CategorySelector.jsx
import React from 'react';
import { categories } from '../../constants/categories'; // Importa las categorías desde un archivo separado

interface CategorySelectorProps {
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory, activeCategory }) => {
  return (
      // Ajusta la altura para dejar espacio debajo del navbar
     <div className="fixed-top bg-white" style={{ top: '60px' }}> 
      <div className="container-fluid">
        <div className="d-flex overflow-auto gap-2 py-2">
          {categories.map(category => (
            <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`btn btn-lg px-4 py-2 rounded-pill flex-shrink-0 ${
                  activeCategory === category.id
                    ? 'btn-primary'
                    : 'btn-outline-primary'
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
