// src/views/ProductListView.jsx
import { useEffect, useState } from 'react';
import useListProducts   from '../hooks/useListProducts';
import useEditProduct    from '../hooks/useEditProduct';

import Pagination        from '../components/Pagination';
import EstadoResumen     from '../components/EstadoResumen';
import ProductCard       from '../components/ProductCard';
import ModalDetalles     from '../components/Modals/ModalDetalles';
import EditProductModal  from '../components/Modals/EditProductModal';

const ESTADOS = ['disponible', 'separado', 'vendido', 'no se vende']; // 👈 en minúsculas

const ProductListView = () => {
  /* ---------- list hook ---------- */
  const { productos, pagination, loading, error, fetchPage } = useListProducts();
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------- edit hook ---------- */
  const {
    productSel,
    showModal: showEditModal,   // <- alias OK
    loading  : saving,          // <- alias OK
    error    : saveError,       // <- alias OK
    openModal,
    closeModal,
    saveChanges,
  } = useEditProduct();

  /* ---------- detalle modal ---------- */
  //const [selectedProduct, setSelectedProduct] = useState(null);
  //const [showModal, setShowModal] = useState(false);

  const handleCardClick = (product) => {
   // setSelectedProduct(product);
    //setShowModal(true);
    openModal(product); // usa el hook para abrir el modal};
  }
  
  /* ---------- fetch on page change ---------- */
  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage, fetchPage]);

  /* ---------- UI ---------- */
  if (loading) return <p>Cargando…</p>;
  if (error)   return <p>❌ Error: {error}</p>;

  return (
    <div className="container mt-4" style={{ paddingTop: '80px' }}>
      <h2 className="text-center mb-2">Lista de Productos</h2>

      <EstadoResumen products={productos} estados={ESTADOS} />

      {/* grid de productos */}
      <div className="row g-2">
        {productos.map((p) => (
          <ProductCard
            key={p._id || p.IdProducto}
            product={p}
            onClick={() => handleCardClick(p)}
            onEdit={() => openModal(p)}
          />
        ))}
      </div>

      {/* paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
      />

      {/* modal detalle 
      <ModalDetalles
        show={showModal}
        onHide={() => setShowModal(false)}
        product={selectedProduct}
      />
        */}
      {/* modal edición */}
      <EditProductModal
        show={showEditModal}
        onHide={closeModal}
        product={productSel}
        onSave={(updated) =>
          saveChanges(updated, () => fetchPage(currentPage))
        }
        saving={saving}
        error={saveError}
      />
    </div>
  );
};

export default ProductListView;
// This file is the main view for listing products, handling pagination, and editing product details.