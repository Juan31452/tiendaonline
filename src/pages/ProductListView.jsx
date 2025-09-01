import { useState, useEffect, useContext, useMemo } from 'react';
import useConsultas from '../hooks/useConsultas';
import useEstadisticasProductos from '../hooks/useEstadisticasProductos';
import useProductFilters from '../hooks/useProductFilters';

import Category from '../components/Buttons/Category';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import PaginationControls from '../components/Buttons/PaginationControls';
import RadioOptionsHorizontal from '../components/Buttons/RadioOptionsHorizontal';
import EstadisticasProductos from '../components/EstadisticasProductos';
import ModalDetalles from '../components/Modals/ModalDetalles';
import { AuthContext } from '../components/Context/AuthContext';
import MobileBottomNav from '../components/Buttons/MobileBottomNav';

// Constante para el tamaño de página
const PAGE_SIZE = 100;

const ProductListView = () => {
  const { role } = useContext(AuthContext);

  // Usamos el nuevo hook para manejar los filtros y la paginación.
  const {
    activeCategory, activeEstado, page, availableStates,
    handleCategoryChange, handleEstadoChange, setPage,
  } = useProductFilters(role);

  // Estado local para el modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Determina si el usuario puede ver el precio real
  const canViewPrice = useMemo(() => {
    const userRole = role?.toLowerCase();
    return userRole === 'admin' || userRole === 'vendedor';
  }, [role]);

  // Efecto para resetear el estado si el actual ya no está disponible
  // (por ejemplo, al cerrar sesión mientras se filtraba por "Vendido").
  useEffect(() => {
    if (!availableStates.some((state) => state.value === activeEstado)) {
      handleEstadoChange('Disponible');
    }
  }, [availableStates, activeEstado, handleEstadoChange]);

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
    fetchPage(page, PAGE_SIZE, activeCategory, activeEstado);
  }, [page, activeCategory, activeEstado, fetchPage]);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  const refresh = () => fetchPage(page, PAGE_SIZE, activeCategory, activeEstado);

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
          options={availableStates}
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
            product={{
              ...p,
              // Mostramos precio 0 si el usuario no tiene permisos
              Precio: canViewPrice ? p.Precio : 0,
            }}
            // Al hacer clic, pasamos el producto original al modal
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
        onFirst={() => handlePageChange(1)}
        onPrev={() => handlePageChange(page - 1)}
        onNext={() => handlePageChange(page + 1)}
        onLast={() => handlePageChange(pagination.totalPages)}
        onRefresh={refresh}
        currentCount={productos.length}
        totalCount={pagination.totalItems}
      />
      <MobileBottomNav />
    </div>
    
  );
};

export default ProductListView;
