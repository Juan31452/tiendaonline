// hooks/useProductPagination.js
import { useState, useEffect } from 'react';
import { Product } from '@/types/Producto'; 

type UseProductPaginationReturn = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  paginatedProducts: Product[];
  totalPages: number;
};

const useProductPagination = (
  products: Product[],
  itemsPerPage: number,
  filterFn: (product: Product) => boolean
): UseProductPaginationReturn => {
  const [currentPage, setCurrentPage] = useState<number>(1);

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
