// hooks/useProductPagination.js
import { useState, useEffect } from 'react';

const useProductPagination = (products, itemsPerPage, filterFn) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = products.filter(filterFn);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  return {
    currentPage,
    setCurrentPage,
    paginatedProducts,
    totalPages,
  };
};

export default useProductPagination;
