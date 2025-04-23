// components/CategorySelector.jsx
import React from 'react';

const CategorySelector = ({ onSelectCategory, activeCategory }) => {
  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'hombre', name: 'Hombre' },
    { id: 'mujer', name: 'Mujer' },
    { id: 'nino', name: 'Niños' },
    { id: 'tecnologia', name: 'Tecnología' },
    { id: 'variedades', name: 'Variedades' },
    { id: 'hogar', name: 'Hogar' }
  ];

  return (
    <div className="container-fluid px-0 mb-4">
      <div className="row flex-nowrap overflow-auto py-2 scrollbar-hidden" style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' }
      }}>
        <div className="col-auto d-flex gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`btn btn-sm rounded-pill flex-shrink-0 ${
                activeCategory === category.id 
                  ? 'btn-primary' 
                  : 'btn-outline-primary'
              }`}
              style={{
                whiteSpace: 'nowrap',
                padding: '0.5rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
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