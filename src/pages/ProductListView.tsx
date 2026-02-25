import { useContext, useMemo, useState, useEffect, FC } from 'react';

// Hooks
import useEstadisticasProductos from '../hooks/useEstadisticasProductos';
import useProductModal from '../hooks/useProductModal';
import useProductData from '../hooks/useProductData';
import useBusquedaSemantica from '../hooks/useBusquedaSemantica';

// Components
import Category from '../components/Buttons/Category';
import ProductCard from '../components/ProductCard';
import PaginationControls from '../components/Buttons/PaginationControls';
import RadioOptionsHorizontal from '../components/Buttons/RadioOptionsHorizontal';
import EstadisticasProductos from '../components/EstadisticasProductos';
import ModalDetalles from '../components/Modals/ModalDetalles';
import ProductCardSkeleton from '../components/Skeletons/ProductCardSkeleton';
import AnnouncementBanner from '../components/AnnouncementBanner';
import BusquedaSemantica from '../components/BusquedaSemantica';
import SortOptions from '../components/SortOptions';
// import MobileBottomNav from '../components/Buttons/MobileBottomNav';
import VirtualDressingRoom from '../components/VirtualDressingRoom'; // Importar el nuevo componente

// Context & Types
import { AuthContext } from '../components/Context/AuthContext';
import { Product, PaginationInfo, Estadistica } from '../components/types'; // Usando tipos globales

const ProductListView: FC = () => {
  const { role } = useContext(AuthContext);

  // --- Búsqueda Semántica ---
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');
  const { resultados, loading: loadingBusqueda, error: errorBusqueda, buscar, limpiarResultados } = useBusquedaSemantica();

  const isBusquedaActiva = terminoBusqueda.trim() !== '';

  // --- Estado para el Probador Virtual ---
  const [showDressingRoom, setShowDressingRoom] = useState(false);

  // --- Datos, Filtros y Paginación ---
  const {
    productos,
    pagination,
    loading: loadingList,
    error,
    page,
    activeCategory,
    activeEstado,
    availableStates,
    activeSort,
    handleCategoryChange,
    handleEstadoChange,
    handleSortChange,
    goToPage,
    refreshData,
  } = useProductData(role);

  // --- Modal ---
  const {
    isModalOpen, selectedProduct, openModal, closeModal,
  } = useProductModal();

  // --- Estadísticas ---
  const canFetchStats = useMemo(() => !!role && (role === 'admin' || role === 'vendedor'), [role]);
  const {
    estadisticas,
    loading: loadingEstadisticas,
    error: errorEstadisticas,
  } = useEstadisticasProductos({ enabled: canFetchStats });

  // --- Banner de Anuncios ---
  // Cast a 'any' para evitar errores si la interfaz Estadistica no define explícitamente 'estados'
  const totalStats = estadisticas?.find(e => e.Categoria === 'Todos') as any;
  const ofertaCount = totalStats?.estados?.Oferta || 0;
  const nuevoCount = totalStats?.estados?.Nuevo || 0;

  // --- Debounce para la búsqueda ---
  useEffect(() => {
    if (!isBusquedaActiva) {
      limpiarResultados();
      return;
    }
    const timerId = setTimeout(() => {
      buscar(terminoBusqueda);
    }, 500);

    return () => clearTimeout(timerId);
  }, [terminoBusqueda, buscar, limpiarResultados, isBusquedaActiva]);

  const limpiarBusquedaCompleta = () => {
    setTerminoBusqueda('');
    limpiarResultados();
  };

  return (
    <div className="container mt-4" style={{ paddingTop: '36px' }}>
      <h2 className="text-center mb-2">Lista de Productos</h2>

      <BusquedaSemantica
        termino={terminoBusqueda}
        setTermino={setTerminoBusqueda}
        resultados={resultados}
        loading={loadingBusqueda}
        error={errorBusqueda}
        limpiarBusqueda={limpiarBusquedaCompleta}
      />

      {ofertaCount > 0 && (
        <AnnouncementBanner storageKey="ofertas-banner-2023-11">
          ¡Atención! Tenemos <strong>{ofertaCount} productos en oferta</strong>. ¡No te los pierdas!
        </AnnouncementBanner>
      )}

      {nuevoCount > 0 && (
        <AnnouncementBanner storageKey="nuevos-banner-2023-11" icon="✨">
          ¡Novedades! Hay <strong>{nuevoCount} productos nuevos</strong> esperando por ti.
        </AnnouncementBanner>
      )}

      {/* Botón para abrir el Probador Virtual
      <div className="d-flex justify-content-center my-3">
        <button 
          className="btn btn-dark d-flex align-items-center gap-2 shadow-sm px-4 py-2"
          onClick={() => setShowDressingRoom(true)}
        >
          <span>👔</span> Probar Combinaciones (Beta)
        </button> 
      </div>*/}

      {!isBusquedaActiva && (
        <>
          {error && <p style={{ color: 'crimson' }}>{error}</p>}

          <Category
            activeCategory={activeCategory || 'Todos'}
            onSelect={handleCategoryChange}
            products={productos}
          />

          <div className="my-3">
            <RadioOptionsHorizontal
              options={availableStates}
            name="productStatus"
            activeStatus={activeEstado || 'Todos'}
            onChange={handleEstadoChange}
            />
          </div>

          <SortOptions
            activeSort={activeSort || 'newest'}
            onSortChange={handleSortChange}
          />

          {role && (
            <EstadisticasProductos
              estadisticas={estadisticas || null}
              loading={loadingEstadisticas || false}
              error={errorEstadisticas || null}
              activeCategory={activeCategory || 'Todos'}
            />
          )}

          <div className="row g-2">
            {loadingList ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              productos.map((p) => (
                <div className="col-6 col-md-4 col-lg-3" key={p.IdProducto}>
                  <ProductCard
                    product={p}
                    onClick={() => openModal(p)}
                  />
                </div>
              ))
            )}
          </div>

          <PaginationControls
            page={pagination.currentPage || 1}
            totalPages={pagination.totalPages || 1}
            loading={loadingList}
            onFirst={() => goToPage(1)}
            onPrev={() => goToPage((pagination.currentPage || 1) - 1)}
            onNext={() => goToPage((pagination.currentPage || 1) + 1)}
            onLast={() => goToPage(pagination.totalPages || 1)}
            onRefresh={refreshData}
            currentCount={productos.length}
            totalCount={pagination.totalItems}
          />
        </>
      )}

      <ModalDetalles
        show={isModalOpen}
        product={selectedProduct}
        onHide={closeModal}
      />

      {/* Modal del Probador Virtual
      <VirtualDressingRoom 
        show={showDressingRoom} 
        onHide={() => setShowDressingRoom(false)} 
        products={productos} // Le pasamos todos los productos cargados
      />

      {/* <MobileBottomNav
        onNewClick={() => handleEstadoChange('Nuevo')}
        onHomeClick={() => handleEstadoChange('Disponible')}
        onProfileClick={() => {}}
        onOfferClick={() => handleEstadoChange('Oferta')}
      /> */}
    </div>
  );
};

export default ProductListView;
