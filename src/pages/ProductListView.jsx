import { useContext, useMemo } from 'react';
import useEstadisticasProductos from '../hooks/useEstadisticasProductos';
import useProductModal from '../hooks/useProductModal';
import useProductData from '../hooks/useProductData';
import Category from '../components/Buttons/Category';
import ProductCard from '../components/ProductCard';
import PaginationControls from '../components/Buttons/PaginationControls';
import RadioOptionsHorizontal from '../components/Buttons/RadioOptionsHorizontal';
import EstadisticasProductos from '../components/EstadisticasProductos';
import ModalDetalles from '../components/Modals/ModalDetalles';
import { AuthContext } from '../components/Context/AuthContext';
import MobileBottomNav from '../components/Buttons/MobileBottomNav';
import ProductCardSkeleton from '../components/Skeletons/ProductCardSkeleton';
import AnnouncementBanner from '../components/AnnouncementBanner';

const ProductListView = () => {
  const { role } = useContext(AuthContext);

  // Hook que encapsula la data, filtros y paginación
  const {
    productos,
    pagination,
    loading: loadingList,
    error,
    page,
    activeCategory,
    activeEstado,
    availableStates,
    handleCategoryChange,
    handleEstadoChange,
    goToPage,
    refreshData,
  } = useProductData(role);

  // Usamos el hook para manejar el estado y la lógica del modal.
  const {
    isModalOpen, selectedProduct, openModal, closeModal,
  } = useProductModal();

  // Determina si el usuario puede ver el precio real
  const canViewPrice = useMemo(() => {
    const userRole = role?.toLowerCase();
    return userRole === 'admin' || userRole === 'vendedor';
  }, [role]);

  // ✅ Llamamos al hook de estadísticas SOLO si el usuario tiene el rol adecuado.
  // Esto evita hacer una llamada a la API que sabemos que va a fallar para invitados.
  const {
    estadisticas,
    loading: loadingEstadisticas,
    error: errorEstadisticas,
  } = useEstadisticasProductos({ enabled: canViewPrice }); // <-- Esta es la corrección clave

  // Lógica para el banner de anuncios
  const totalStats = estadisticas.find(e => e.Categoria === 'Todos');
  const ofertaCount = totalStats?.estados?.Oferta || 0;
  const nuevoCount = totalStats?.estados?.Nuevo || 0;

  return (
    <div className="container mt-4" style={{ paddingTop: '36px' }}>
      <h2 className="text-center mb-2">Lista de Productos</h2>

      {/* 1. Banner de ofertas (aparece primero) */}
      {ofertaCount > 0 && (
        <AnnouncementBanner storageKey="ofertas-banner-2023-11">
          ¡Atención! Tenemos <strong>{ofertaCount} productos en oferta</strong>. ¡No te los pierdas!
        </AnnouncementBanner>
      )}

      {/* 2. Banner de productos nuevos (aparece después) */}
      {nuevoCount > 0 && (
        <AnnouncementBanner storageKey="nuevos-banner-2023-11" icon="✨">
          ¡Novedades! Hay <strong>{nuevoCount} productos nuevos</strong> esperando por ti.
        </AnnouncementBanner>
      )}

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
      {role && (
        <EstadisticasProductos
          estadisticas={estadisticas}
          loading={loadingEstadisticas} // <-- Pasar el estado de carga
          error={errorEstadisticas}     // <-- Pasar el estado de error
          activeCategory={activeCategory}
        />
      )}

      {/* Grilla de productos */}
      <div className="row g-2">
        {loadingList ? (
          // Mostramos 8 esqueletos de carga mientras los datos se obtienen
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : (
          productos.map((p) => (
            <ProductCard
              key={p._id || p.IdProducto}
              product={{
                ...p,
                // Mostramos precio 0 si el usuario no tiene permisos
                Precio: canViewPrice ? p.Precio : 0,
              }}
              // Al hacer clic, pasamos el producto original al modal
              onClick={() => openModal(p)}
            />
          ))
        )}
      </div>

      {/* Modal detalles */}
      <ModalDetalles
        show={isModalOpen}
        product={selectedProduct}
        onHide={closeModal}
      />

      {/* Paginación */}
      <PaginationControls
        page={page}
        totalPages={pagination.totalPages}
        loading={loadingList}
        onFirst={() => goToPage(1)}
        onPrev={() => goToPage(page - 1)}
        onNext={() => goToPage(page + 1)}
        onLast={() => goToPage(pagination.totalPages)}
        onRefresh={refreshData}
        currentCount={productos.length}
        totalCount={pagination.totalItems}
      />
      <MobileBottomNav />
    </div>
    
  );
};

export default ProductListView;
