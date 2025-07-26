// PaginationControls.tsx
// Este componente maneja la paginación de productos en la lista.
import React from 'react';

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  loading?: boolean;
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLast: () => void;
  onRefresh: () => void;
  currentCount: number;
  totalCount: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  loading = false,
  onFirst,
  onPrev,
  onNext,
  onLast,
  onRefresh,
  currentCount,
  totalCount,
}) => (
  <div style={{ marginTop: 20 }}>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button onClick={onFirst} disabled={loading || page === 1}>⏮ Inicio</button>
      <button onClick={onPrev} disabled={loading || page === 1}>⬅︎ Anterior</button>
      <button onClick={onNext} disabled={loading || page === totalPages}>Siguiente ➡︎</button>
      <button onClick={onLast} disabled={loading || page === totalPages}>Final ⏭</button>
      <button onClick={onRefresh} disabled={loading}>🔄 Refrescar</button>
    </div>

    <p style={{ marginTop: 10 }}>
      Mostrando {currentCount} / {totalCount} productos
    </p>
  </div>
);

export default PaginationControls;
