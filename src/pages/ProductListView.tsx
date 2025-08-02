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

const ProductListView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [activeEstado, setActiveEstado] = useState<string>('Disponible');
  const [page, setPage] = useState<number>(1);

  /** Consultas de productos paginados **/
  const {
    productos,
    pagination,
    loading: loadingList,
    error,
    fetchPage
  } = useConsultas();

  /** Estadísticas agrupadas por categoría **/
  const {
    estadisticas,
    loading: loadingEstadisticas,
    error: errorEstadisticas
  } = useEstadisticasProductos();

  /** Manejo de edición de productos **/
  const {
    productSel,
    showModal,
    loading: saving,
    error: saveError,
    openModal,
    closeModal,
    saveChanges,
  } = useEditProduct();

  /** Disparar consulta al cambiar filtros */
  useEffect(() => {
    fetchPage(1, 100, activeCategory, activeEstado);
  }, [activeCategory, activeEstado]);

  /** Handlers */
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

  /** Paginación */
  const prev = () => page > 1 && (fetchPage(page - 1), setPage(page - 1));
  const next = () => page < pagination.totalPages && (fetchPage(page + 1), setPage(page + 1));
  const first = () => page !== 1 && (fetchPage(1), setPage(1));
  const last = () => page !== pagination.totalPages &&
    (fetchPage(pagination.totalPages), setPage(pagination.totalPages));
  const refresh = () => fetchPage(page);

  return (
    <div className="container mt-4" style={{ paddingTop: '80px' }}>
      <h2 className="text-center mb-2">Lista de Productos</h2>

      {/* Loaders y errores generales */}
      {loadingList && <Loading text="Cargando productos" />}
      {saving && <Loading text="Guardando cambios" fullScreen />}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {saveError && <p style={{ color: 'crimson' }}>{saveError}</p>}

      {/* Filtros */}
      <Category
        activeCategory={activeCategory}
        onSelect={handleCategoryChange}
      />

      <div className="my-3">
        <RadioOptionsHorizontal
          activeStatus={activeEstado}
          onChange={handleEstadoChange}
        />
      </div>

      {/* Estadísticas agrupadas */}
      <EstadisticasProductos
        estadisticas={estadisticas}
        loading={loadingEstadisticas}
        error={errorEstadisticas}
        activeCategory={activeCategory}
      />

      {/* Lista de productos */}
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

      {/* Modal para editar producto */}
      <EditProductModal
        show={showModal}
        product={productSel}
        onHide={closeModal}
        onSave={(upd: any) => saveChanges(upd, refresh)}
      />

      {/* Controles de paginación */}
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
