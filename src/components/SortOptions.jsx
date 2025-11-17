import React from 'react';
import PropTypes from 'prop-types';
import RadioOptionsHorizontal from './Buttons/RadioOptionsHorizontal';

// Las opciones de ordenación se definen aquí, en un solo lugar.
const sortOptions = [
  { value: 'default', label: 'Por Defecto' },
  { value: 'newest', label: 'Más Nuevos' },
  { value: 'oldest', label: 'Más Antiguos' },
  { value: 'id_desc', label: 'ID Descendente' },
];

/**
 * Componente que renderiza las opciones para ordenar la lista de productos.
 */
const SortOptions = ({ activeSort, onSortChange }) => (
  <div className="my-3">
    <RadioOptionsHorizontal
      options={sortOptions}
      name="productSort"
      activeStatus={activeSort}
      onChange={onSortChange}
    />
  </div>
);

SortOptions.propTypes = {
  activeSort: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortOptions;
