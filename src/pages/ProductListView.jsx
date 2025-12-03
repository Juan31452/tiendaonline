import { useContext, useMemo, useState, useEffect } from 'react';
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
import BusquedaSemantica from '../components/BusquedaSemantica';
import useBusquedaSemantica from '../hooks/useBusquedaSemantica'; // 1. Importamos el hook de búsqueda
import SortOptions from '../components/SortOptions';

const ProductListView = () => {
  const { role } = useContext(AuthContext);

  // --- ✅ Lógica de Búsqueda Semántica (Estado levantado) ---
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const { resultados, loading: loadingBusqueda, error: errorBusqueda, buscar, limpiarResultados } = useBusquedaSemantica();

  // Determina si la búsqueda está activa (para ocultar la lista principal)
  const isBusquedaActiva = terminoBusqueda.trim() !== '';

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
    activeSort, // <-- 1. Recibimos el estado de ordenación activo
    handleCategoryChange,
    handleEstadoChange,
    handleSortChange, // <-- 2. Recibimos el manejador para cambiar la ordenación
    goToPage,
    refreshData,
  } = useProductData(role);

  // Usamos el hook para manejar el estado y la lógica del modal.
  const {
    isModalOpen, selectedProduct, openModal, closeModal,
  } = useProductModal();

  // El backend ya determina si el precio debe ser visible según el rol.
  // Si el usuario es admin/vendedor, el campo 'Precio' vendrá en la respuesta.
  // Si es invitado, el campo 'Precio' será undefined.
  const canFetchStats = useMemo(() => role === 'admin' || role === 'vendedor', [role]);

  // ✅ Llamamos al hook de estadísticas SOLO si el usuario tiene el rol adecuado.
  // Esto evita hacer una llamada a la API que sabemos que va a fallar para invitados.
  const {
    estadisticas,
    loading: loadingEstadisticas,
    error: errorEstadisticas,
  } = useEstadisticasProductos({ enabled: canFetchStats }); 

  // Lógica para el banner de anuncios
  const totalStats = estadisticas.find(e => e.Categoria === 'Todos');
  const ofertaCount = totalStats?.estados?.Oferta || 0;
  const nuevoCount = totalStats?.estados?.Nuevo || 0;

  // --- ✅ Lógica de Debounce para la búsqueda ---
  useEffect(() => {
    if (!isBusquedaActiva) {
      limpiarResultados();
      return;
    }
    const timerId = setTimeout(() => {
      buscar(terminoBusqueda);
    }, 500); // Espera 500ms

    return () => clearTimeout(timerId);
  }, [terminoBusqueda, buscar, limpiarResultados, isBusquedaActiva]);

  // Función para limpiar completamente la búsqueda
  const limpiarBusquedaCompleta = () => {
    setTerminoBusqueda('');
    limpiarResultados();
  };

  return (
    <div className="container mt-4" style={{ paddingTop: '36px' }}>
      <h2 className="text-center mb-2">Lista de Productos</h2>

      {/* Componente de búsqueda ahora recibe estado y funciones como props */}
      <BusquedaSemantica
        termino={terminoBusqueda}
        setTermino={setTerminoBusqueda}
        resultados={resultados}
        loading={loadingBusqueda}
        error={errorBusqueda}
        limpiarBusqueda={limpiarBusquedaCompleta}
      />

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

      {/* --- ✅ Renderizado Condicional --- */}
      {/* Si la búsqueda NO está activa, mostramos los filtros y la lista principal */}
      {!isBusquedaActiva && (
        <>
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
              options={availableStates}
              name="productStatus"
              activeStatus={activeEstado}
              onChange={handleEstadoChange}
            />
          </div>

          {/* Componente de ordenación */}
          <SortOptions
            activeSort={activeSort}
            onSortChange={handleSortChange}
          />

          {/* Estadísticas */}
          {role && (
            <EstadisticasProductos
              estadisticas={estadisticas}
              loading={loadingEstadisticas}
              error={errorEstadisticas}
              activeCategory={activeCategory}
            />
          )}

          {/* Grilla de productos */}
          <div className="row g-2">
            {loadingList ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              productos.map((p) => (
                <ProductCard
                  key={p._id || p.IdProducto}
                  product={p}
                  onClick={() => openModal(p)}
                />
              ))
            )}
          </div>

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
        </>
      )}

      {/* Modal detalles */}
      <ModalDetalles
        show={isModalOpen}
        product={selectedProduct}
        onHide={closeModal}
      />

      <MobileBottomNav
        // Le pasamos la función que, al ser llamada desde el botón, activará el filtro "Nuevo-Disponible,Oferta y perfil".
        onNewClick={() => handleEstadoChange('Nuevo')}
        onHomeClick={() => handleEstadoChange('Disponible')}
        onProfileClick={() => {}}
        onOfferClick={() => handleEstadoChange('Oferta')}
      />
    </div>
    
  );
};

export default ProductListView;
