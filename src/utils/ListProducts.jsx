import { useEffect, useState } from 'react';
import ProductosTable          from '../components/ProductosTable';
import BuscarPorIdproducto     from '../utils/BuscarporIdproducto';
import Loading                 from '../components/Loading';
import PaginationControls      from '../components/Buttons/PaginationControls';
import useListProducts from '../hooks/useListProducts';
import useEditProduct  from '../hooks/useEditProduct';
import EditProductModal from '../components/Modals/EditProductModal';
import ModalDetalles from '../components/Modals/ModalDetalles';

// Importamos los hooks personalizados para listar y editar productos
const ListProducts = () => {
  /* ---------- paginación ---------- */
  const [page, setPage] = useState(1);

// Estado para el detalle del producto
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [showDetalle, setShowDetalle] = useState(false);

  const {
    productos,
    pagination,
    loading: loadingList,
    error,
    fetchPage,
  } = useListProducts();

  /* ---------- edición ---------- */
  const {
    productSel,
    showModal,
    loading: saving,
    error: saveError,
    openModal,
    closeModal,
    saveChanges,
  } = useEditProduct();

  /* carga inicial */
  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);
  // Ejecutar cada vez que cambie la página
  const handleView = (producto) => {
  setProductoDetalle(producto);
  setShowDetalle(true);
};
const handleCloseDetalle = () => {
  setShowDetalle(false);
  setProductoDetalle(null);
};
  /* -------- handlers de paginación -------- */
  const prev     = () => page > 1 && (fetchPage(page - 1), setPage(page - 1));
  const next     = () => page < pagination.totalPages && (fetchPage(page + 1), setPage(page + 1));
  const first    = () => page !== 1 && (fetchPage(1), setPage(1));
  const last     = () => page !== pagination.totalPages &&
                        (fetchPage(pagination.totalPages), setPage(pagination.totalPages));
  const refresh  = () => fetchPage(page);

  /* -------- UI -------- */
  return (
    <div style={{ padding: 80 }}>
      <h2>Productos — página {page}/{pagination.totalPages}</h2>
       
      {loadingList && <Loading text="Cargando productos" />}
      {saving      && <Loading text="Guardando cambios" fullScreen />}
      {error      &&  <p style={{ color: 'crimson' }}>{error}</p>}
      {saveError  &&  <p style={{ color: 'crimson' }}>{saveError}</p>}
      
      <BuscarPorIdproducto refresh={refresh} />

      {/* Tabla de productos */}
      <ProductosTable productos={productos} onEdit={openModal} onView={handleView} />

      {/* Modal de edición de producto */}
      <EditProductModal
        show={showModal}
        product={productSel}
        onHide={closeModal}
        onSave={(upd) => saveChanges(upd, refresh)}
      />

      {/* Modal de detalles del producto */}
      {/* Si no hay producto seleccionado, no renderiza nada */}
       <ModalDetalles
        product={productoDetalle}
        show={showDetalle}
        onHide={handleCloseDetalle}
      />
      {/* Paginación */}
      {/* 👉 Nuevo componente paginador con Inicio y Final */}
      <PaginationControls
        page={page}
        totalPages={pagination.totalPages}
        loading={loadingList}
        onFirst={first}
        onPrev={prev}
        onNext={next}
        onLast={last}
        onRefresh={refresh}
        currentCount={productos.length}
        totalCount={pagination.totalItems}
      />
    </div>
  );
};

export default ListProducts;
