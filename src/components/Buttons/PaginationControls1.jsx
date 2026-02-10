import PropTypes from 'prop-types';

const PaginationControls = ({
  page,
  totalPages,
  loading,
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
      <button onClick={onFirst}  disabled={loading || page === 1}>⏮ Inicio</button>
      <button onClick={onPrev}   disabled={loading || page === 1}>⬅︎ Anterior</button>
      <button onClick={onNext}   disabled={loading || page === totalPages}>Siguiente ➡︎</button>
      <button onClick={onLast}   disabled={loading || page === totalPages}>Final ⏭</button>
      <button onClick={onRefresh} disabled={loading}>🔄 Refrescar</button>
    </div>

    <p style={{ marginTop: 10 }}>
      Mostrando {currentCount} / {totalCount} productos
    </p>
  </div>
);

PaginationControls.propTypes = {
  page:         PropTypes.number.isRequired,
  totalPages:   PropTypes.number.isRequired,
  loading:      PropTypes.bool,
  onFirst:      PropTypes.func.isRequired,
  onPrev:       PropTypes.func.isRequired,
  onNext:       PropTypes.func.isRequired,
  onLast:       PropTypes.func.isRequired,
  onRefresh:    PropTypes.func.isRequired,
  currentCount: PropTypes.number.isRequired,
  totalCount:   PropTypes.number.isRequired,
};

PaginationControls.defaultProps = {
  loading: false,
};

export default PaginationControls;
// Compare this snippet from tiendaonline/src/pages/ProductListPage.jsx:
// import React, { useState, useEffect } from 'react';