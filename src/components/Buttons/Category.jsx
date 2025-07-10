import PropTypes from 'prop-types';
import { categories } from '../../constants/categories';

const Category = ({ activeCategory, onSelect, products = [] }) => {
  console.log('Products:', products);
  // Filtra los productos por categoría y estado
  const countByCategoryAndState = (categoryId, state) =>
    products.filter(
      (p) => p.category === categoryId && p.state?.toLowerCase() === state.toLowerCase()
    ).length;

  return (
    <div className="d-flex overflow-auto gap-2 py-1">
      {categories.map(({ id, name }) => {
        const availableCount = countByCategoryAndState(id, 'Disponible');
        const soldCount = countByCategoryAndState(id, 'Vendido');

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
