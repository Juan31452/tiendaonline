import { useState, useEffect } from 'react';
import useConsultas from '../hooks/useConsultas';
import useEstadisticasProductos from '../hooks/useEstadisticasProductos';

import Category from '../components/Buttons/Category';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import PaginationControls from '../components/Buttons/PaginationControls';
import RadioOptionsHorizontal from '../components/Buttons/RadioOptionsHorizontal';
import EstadisticasProductos from '../components/EstadisticasProductos';
import ModalDetalles from '../components/Modals/ModalDetalles';
// Usamos la lista de constantes que ya tienes
import { productStates as ALL_PRODUCT_STATES } from '../constants/states';


const ProductListView = () => {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [activeEstado, setActiveEstado] = useState('Disponible');
  const [page, setPage] = useState(1);

  // Estado local para el modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    estadisticas,
    loading: loadingEstadisticas,
    error: errorEstadisticas,
  } = useEstadisticasProductos();

  const {
    productos,
    pagination,
    loading: loadingList,
    error,
    fetchPage,
  } = useConsultas();

  useEffect(() => {
    fetchPage(1, 100, activeCategory, activeEstado);
    setPage(1);
  }, [activeCategory, activeEstado]);

  const handleCategoryChange = (newCategory) => setActiveCategory(newCategory);
  const handleEstadoChange = (estado) => setActiveEstado(estado);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  /* -------- paginación -------- */
  const prev = () => page > 1 && (fetchPage(page - 1), setPage(page - 1));
  const next = () => page < pagination.totalPages && (fetchPage(page + 1), setPage(page + 1));
  const first = () => page !== 1 && (fetchPage(1), setPage(1));
  const last = () => page !== pagination.totalPages && (fetchPage(pagination.totalPages), setPage(pagination.totalPages));
  const refresh = () => fetchPage(page);

  return (
    <div className="container mt-4" style={{ paddingTop: '80px' }}>
      <h2 className="text-center mb-2">Lista de Productos</h2>

      {loadingList && <Loading text="Cargando productos" />}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {/* Filtro por categoría */}
      <Category
        activeCategory={activeCategory}
        onSelect={handleCategoryChange}
        products={productos}
      />

      {/* Filtro por estado */}
      <div className="my-3">
        <RadioOptionsHorizontal
          // 2. Pasamos la lista de opciones que queremos mostrar.
          options={ALL_PRODUCT_STATES}
          // 3. Damos un nombre al grupo de radio buttons.
          name="productStatus"
          // 4. Pasamos el valor actual y la función para cambiarlo.
          activeStatus={activeEstado}
          onChange={handleEstadoChange}
        />
      </div>

      {/* Estadísticas */}
      <EstadisticasProductos
        estadisticas={estadisticas}
        loading={loadingEstadisticas}
        error={errorEstadisticas}
        activeCategory={activeCategory}
      />

      {/* Grilla de productos */}
      <div className="row g-2">
        {productos.map((p) => (
          <ProductCard
            key={p._id || p.IdProducto}
            product={p}
            onClick={() => handleCardClick(p)}
          />
        ))}
      </div>

      {/* Modal detalles */}
      <ModalDetalles
        show={showModal}
        product={selectedProduct}
        onHide={closeModal}
      />

      {/* Paginación */}
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
