import PropTypes from 'prop-types';
import { categories } from '../../constants/categories';


const Category = ({ activeCategory, onSelect }) => {
  
  
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

Category.propTypes = {
  activeCategory: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      Categoria: PropTypes.string.isRequired,
      Estado: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Category;