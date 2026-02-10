import { useState, useCallback } from 'react';

/**
 * Hook para gestionar el estado y la lógica de la paginación.
 * @param {number} initialPage - La página inicial con la que comenzará el hook.
 * @returns {{
 *   page: number,
 *   setPage: Function,
 *   goToPage: Function,
 *   nextPage: Function,
 *   prevPage: Function
 * }}
 */
export const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);

  const goToPage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const nextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  }, []);

  return { page, setPage, goToPage, nextPage, prevPage };
};
