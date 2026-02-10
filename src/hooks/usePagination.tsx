import { useState, useCallback, Dispatch, SetStateAction } from 'react';

interface UsePaginationReturn {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  goToPage: (newPage: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

/**
 * Hook para gestionar el estado y la lógica de la paginación.
 */
export const usePagination = (initialPage: number = 1): UsePaginationReturn => {
  const [page, setPage] = useState<number>(initialPage);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const nextPage = useCallback(() => {
    setPage((prevPage: number) => prevPage + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((prevPage: number) => (prevPage > 1 ? prevPage - 1 : 1));
  }, []);

  return { 
    page, 
    setPage, 
    goToPage, 
    nextPage, 
    prevPage 
  };
};