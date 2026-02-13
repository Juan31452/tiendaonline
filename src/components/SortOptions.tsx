import React from 'react';
import RadioOptionsHorizontal from './Buttons/RadioOptionsHorizontal';

// Las opciones de ordenación se definen aquí, en un solo lugar.
const sortOptions = [
  { value: 'newest', label: 'Más Nuevos' },
  { value: 'oldest', label: 'Más Antiguos' },
];

interface SortOptionsProps {
  activeSort: string;
  onSortChange: (value: string) => void;
}

/**
 * Componente que renderiza las opciones para ordenar la lista de productos.
 */
const SortOptions: React.FC<SortOptionsProps> = ({ activeSort, onSortChange }) => (
  <div className="my-3">
    <RadioOptionsHorizontal
      options={sortOptions}
      name="productSort"
      activeStatus={activeSort}
      onChange={onSortChange}
    />
  </div>
);

export default SortOptions;
