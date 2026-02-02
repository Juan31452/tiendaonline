import React, { useCallback } from 'react';
import Loading from './Loading';
import ProductCard from './ProductCard';
import ModalDetalles from './Modals/ModalDetalles';
import useProductModal from '../hooks/useProductModal';
import '../style/BusquedaSemantica.css'; // 1. Importamos los nuevos estilos

// 1. Definimos la interfaz para un producto para garantizar la consistencia de los datos.
interface Product {
  _id?: string;
  IdProducto: string | number;
  Imagen: string;
  Descripcion: string;
  Estado?: string;
  Precio?: number;
}

// 2. Definimos la interfaz para las props del componente, mejorando la legibilidad y seguridad.
interface BusquedaSemanticaProps {
  termino: string;
  setTermino: (value: string) => void;
  resultados: Product[];
  loading: boolean;
  error: string | null;
  limpiarBusqueda: () => void;
}

const BusquedaSemantica: React.FC<BusquedaSemanticaProps> = ({
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

  // Usamos useCallback para optimizar la función y tipamos el parámetro.
  const handleSelect = useCallback((producto: Product) => {
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTermino(e.target.value)}
          aria-label="Término de búsqueda"
        />
        {/* El botón de buscar ya no es necesario */}
        {termino.trim() !== '' && (
          <button type="button" onClick={handleClear} className="btn btn-secondary">
            Limpiar
          </button>
        )}
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
            {resultados.map((p) => (
              <ProductCard
                key={p._id || p.IdProducto}
                product={p}
                onClick={() => handleSelect(p)}
              />
            ))}
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
