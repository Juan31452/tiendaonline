// components/CategorySelector.jsx
import React from 'react';
import { categories } from '../../constants/categories'; // Importa las categorías desde un archivo separado

const CategorySelector = ({ onSelectCategory, activeCategory }) => {
  return (
      // Ajusta la altura para dejar espacio debajo del navbar
     <div className="fixed-top bg-white" style={{ top: '56px' }}> 
      <div className="container-fluid">
        <div className="d-flex overflow-auto gap-2 py-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`btn btn-sm rounded-pill flex-shrink-0 ${
                activeCategory === category.id 
                  ? 'btn-primary' 
                  : 'btn-outline-primary'
              }`}
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
