import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { categories } from '../../constants/categories';
//import { useEffect } from 'react';

const Category = ({ activeCategory, onSelect, products = [] }) => {
  const countByCategoryAndState = (categoryId, state) =>
  products.filter(
    (p) =>
      p.Categoria?.toString().trim().toLowerCase() === categoryId.toString().trim().toLowerCase() &&
      p.Estado?.toString().trim().toLowerCase() === state.toString().trim().toLowerCase()
  ).length;


  useEffect(() => {
    console.log(">>> products dentro de Category", products);
    //console.table(products);
    //console.log("Categoría activa", activeCategory);
    //console.log("Ejemplo de producto:", products[0]);
  }, [products]);



  return (
    <div className="d-flex overflow-auto gap-2 py-1">
      {categories.map(({ id, name }) => {
        const availableCount = countByCategoryAndState(id, 'Disponible');
        const soldCount = countByCategoryAndState(id, 'Vendido');
        console.log("Disponible", availableCount);
        console.log("Vendido", soldCount);
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`btn btn-sm rounded-pill flex-shrink-0 ${
              activeCategory === id ? 'btn-primary' : 'btn-outline-primary'
            }`}
            aria-pressed={activeCategory === id}
            type="button"
          >
            {name} — <span className="text-success">Disp: {availableCount}</span> |{' '}
            <span className="text-danger">Vend: {soldCount}</span>
          </button>
        );
      })}
    </div>
  );
};

Category.propTypes = {
  activeCategory: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Category;