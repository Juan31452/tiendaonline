import { useCallback } from 'react';
import Loading from './Loading';
import ProductCard from './ProductCard';
import ModalDetalles from './Modals/ModalDetalles';
import useProductModal from '../hooks/useProductModal';
import '../style/BusquedaSemantica.css'; // 1. Importamos los nuevos estilos


const BusquedaSemantica = ({
  termino,
  setTermino,
  resultados,
  loading,
  error,
  limpiarBusqueda,
}) => {
  // Hook para manejar la apertura y cierre del modal de detalles
  const { isModalOpen, selectedProduct, openModal, closeModal } =
    useProductModal();

  // Usamos useCallback para optimizar la función
  const handleSelect = useCallback((producto) => {
    // Aquí nos aseguramos de pasar el objeto completo al modal
    openModal(producto);
  }, [openModal]);

  const handleClear = () => {
    limpiarBusqueda();
    closeModal();
  };

  return (
    <div className="busqueda-semantica-container">
      <h4 className="busqueda-semantica-title">Búsqueda Rapida</h4>
      <div className="d-flex gap-2 mb-3"> {/* Mantenemos d-flex para el layout */}
        <input
          type="search"
          className="form-control"
          placeholder="Escribe para buscar automáticamente..."
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
          aria-label="Término de búsqueda"
        />
        {/* El botón de buscar ya no es necesario */}
        <button type="button" onClick={handleClear} className="btn btn-secondary">
          Limpiar
        </button>
      </div>

      {loading && <Loading text="Buscando productos" />}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* 1. Si no está cargando, no hay errores y no hay resultados, mostramos un mensaje */}
      {!loading && !error && resultados.length === 0 && termino.trim() !== '' && (
        <div className="alert alert-info mt-3">No se encontraron productos que coincidan con tu búsqueda.</div>
      )}

      {/* 2. Solo mostramos la grilla si hay resultados */}
      {resultados.length > 0 && (
        <div>
          <h5 className="busqueda-semantica-results-header">Resultados de la búsqueda ({resultados.length})</h5>
          <div className="row g-2 busqueda-semantica-results-grid">
            {resultados.map((p) => {
              // ✅ Aquí está el console.log que pediste.
              console.log('Datos del producto `p` en BusquedaSemantica:', p);
              return (
                <ProductCard
                  key={p._id || p.IdProducto}
                  product={p}
                  onClick={() => handleSelect(p)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Modal para mostrar los detalles del producto seleccionado */}
      <ModalDetalles
        show={isModalOpen}
        product={selectedProduct}
        onHide={closeModal}
      />
    </div>
  );
};

export default BusquedaSemantica;
