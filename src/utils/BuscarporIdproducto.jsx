import { useState } from 'react';
import useBuscarProductoPorId from '../hooks/useBuscarProductoPorId';
import EditProductModal from '../components/Modals/EditProductModal';

const BuscarPorIdproducto = () => {
  const [id, setId] = useState('');

  const {
    resultado,
    loading,
    error,
    showModal,
    buscarProducto,
    cerrarModal,
  } = useBuscarProductoPorId();

  const handleBuscar = () => buscarProducto(id);

  return (
    <div style={{ marginBottom: 30 }}>
      <h3>Buscar producto por ID</h3>

      <input
        type="text"
        placeholder="Ej: 1.1"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ padding: 6, marginRight: 8 }}
      />
      <button onClick={handleBuscar} disabled={loading}>
        🔍 {loading ? 'Buscando…' : 'Buscar'}
      </button>

      {error && <p style={{ color: 'crimson', marginTop: 10 }}>{error}</p>}

      {resultado && (
        <EditProductModal
          product={resultado}       // ← producto a editar
          show={showModal}
          onHide={cerrarModal}
          onSave={(updatedProduct) => {
            // Aquí decides qué hacer con los datos guardados (ej: update UI o reenviar al backend)
            console.log('💾 Producto actualizado:', updatedProduct);
            cerrarModal(); // cierras el modal después de guardar
    }}
  />
      )}
    </div>
  );
};

export default BuscarPorIdproducto;
