import React, { useState, useEffect } from 'react';
import useConsultas from '../hooks/useConsultas';
import useEditProduct from '../hooks/useEditProduct';
import useEstadisticasProductos from '../hooks/useEstadisticasProductos';

import Category from '../components/Buttons/Category';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import PaginationControls from '../components/Buttons/PaginationControls';
import EditProductModal from '../components/Modals/EditProductModal';
import RadioOptionsHorizontal from '../components/Buttons/RadioOptionsHorizontal';
import EstadisticasProductos from '../components/EstadisticasProductos';

// Puedes definir una interfaz para Producto si la tienes
// interface Producto { ... }

const ProductListView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [activeEstado, setActiveEstado] = useState<string>('Disponible');
  const { estadisticas, loading: loadingEstadisticas, error: errorEstadisticas } = useEstadisticasProductos();

  /* ---------- paginación ---------- */
  const [page, setPage] = useState<number>(1);

  /* Consultas */
  const {
    productos,
    pagination,
    loading: loadingList,
    error,
    fetchPage
  } = useConsultas();

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

  // Ejecutar cada vez que cambie categoría o estado
  useEffect(() => {
    fetchPage(1, 100, activeCategory, activeEstado);
  }, [activeCategory, activeEstado]);

  const handleCategoryChange = (newCategory: string) => {
    setActiveCategory(newCategory);
    console.log("Desde ProductListView", newCategory);
  };

  const handleEstadoChange = (estado: string) => {
    setActiveEstado(estado);
  };

  const handleCardClick = (product: any) => {
    console.log('Ver producto', product);
  };

  /* -------- handlers de paginación -------- */
  const prev = () => page > 1 && (fetchPage(page - 1), setPage(page - 1));
  const next = () => page < pagination.totalPages && (fetchPage(page + 1), setPage(page + 1));
  const first = () => page !== 1 && (fetchPage(1), setPage(1));
  const last = () => page !== pagination.totalPages &&
    (fetchPage(pagination.totalPages), setPage(pagination.totalPages));
  const refresh = () => fetchPage(page);

  return (
    <div className="container mt-4" style={{ paddingTop: '80px' }}>
      <h2 className="text-center mb-2">Lista de Productos</h2>

      {loadingList && <Loading text="Cargando productos" />}
      {saving && <Loading text="Guardando cambios" fullScreen />}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {saveError && <p style={{ color: 'crimson' }}>{saveError}</p>}

      {/* Filtro por categoría */}
      <Category
        activeCategory={activeCategory}
        onSelect={handleCategoryChange}
        products={productos}
      />

      {/* Filtro por estado horizontal */}
      <div className="my-3">
        <RadioOptionsHorizontal
          activeStatus={activeEstado}
          onChange={handleEstadoChange}
        />
      </div>

      {/* Estadísticas de productos */}
      <EstadisticasProductos
        estadisticas={estadisticas}
        loading={loadingEstadisticas}
        error={errorEstadisticas}
        activeCategory={activeCategory}
      />

      {/* Grilla de productos */}
      <div className="row g-2">
        {productos.map((p: any) => (
          <ProductCard
            key={p._id || p.IdProducto}
            product={p}
            onClick={() => handleCardClick(p)}
            onEdit={() => openModal(p)}
          />
        ))}
      </div>

      {/* Modal de edición */}
      <EditProductModal
        show={showModal}
        product={productSel}
        onHide={closeModal}
        onSave={(upd: any) => saveChanges(upd, refresh)}
      />

      {/* Paginador */}
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

export default ProductListView;