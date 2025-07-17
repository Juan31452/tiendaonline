import { useState, useEffect } from 'react';
import useBuscarProductoPorId from '../hooks/useBuscarProductoPorId';
import useEditProduct from '../hooks/useEditProduct';
import EditProductModal from '../components/Modals/EditProductModal';

const BuscarPorIdproducto = ({ refresh }) => {
  const [id, setId] = useState('');

  // Hook para buscar producto por ID
  const {
    resultado,
    loading: buscando,
    error: errorBusqueda,
    buscarProducto,
    resetResultado,
  } = useBuscarProductoPorId();

  // Hook para editar producto
  const {
    productSel,
    showModal,
    loading: guardando,
    error: errorGuardado,
    openModal,
    closeModal,
    saveChanges,
  } = useEditProduct();

  // Cuando hay resultado válido, abre modal con ese producto
  useEffect(() => {
    if (resultado) openModal(resultado);
  }, [resultado, openModal]);

  const handleBuscar = () => {
    if (id.trim()) buscarProducto(id.trim());
  };

  return (
    <div className="p-3 border rounded">
      <h5>Buscar producto por ID</h5>
      <div className="d-flex gap-2 align-items-center mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="ID del producto"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleBuscar} disabled={buscando} className="btn btn-primary">
          🔍 {buscando ? 'Buscando…' : 'Buscar'}
        </button>
      </div>

      {errorBusqueda && <div className="text-danger mb-2">{errorBusqueda}</div>}

      {productSel && (
        <EditProductModal
          product={productSel}
          show={showModal}
          onHide={() => {
            closeModal();
            resetResultado(); // Limpiar resultado del hook de búsqueda
          }}
          onSave={(updatedProduct) => saveChanges(updatedProduct, refresh)}
          loading={guardando}
          error={errorGuardado}
        />
      )}
    </div>
  );
};

export default BuscarPorIdproducto;
