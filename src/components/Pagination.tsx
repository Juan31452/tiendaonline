import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center gap-2 my-4 flex-wrap">
      <button
        className="btn btn-outline-light btn-sm"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Anterior
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className="btn btn-outline-light btn-sm"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente →
      </button>
    </div>
  );
};

export default Pagination;
