import { useState, useEffect } from 'react';
import useConsultas from '../hooks/useConsultas';
import Category from '../components/Buttons/Category';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import PaginationControls from '../components/Buttons/PaginationControls';
import EditProductModal from '../components/Modals/EditProductModal';
import RadioOptionsHorizontal from '../components/Buttons/RadioOptionsHorizontal'; // 👈 importado

const ProductListView = () => {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [activeEstado, setActiveEstado] = useState('Disponible');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    productos,
    pagination,
    loading,
    error,
    fetchPage
  } = useConsultas();

  // Ejecutar cada vez que cambie categoría o estado
  useEffect(() => {
    fetchPage(1, 100, activeCategory, activeEstado);
  }, [activeCategory, activeEstado]);

  const handleCategoryChange = (newCategory) => {
    setActiveCategory(newCategory);
  };

  const handleEstadoChange = (estado) => {
    setActiveEstado(estado);
  };

  const handleCardClick = (product) => {
    console.log('Ver producto', product);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowEditModal(false);
  };

  return (
     <div className="container mt-4" style={{ paddingTop: '80px' }}>
      <h2 className="text-center mb-2">Lista de Productos</h2>


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

      {loading && <Loading fullScreen={false} />}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <>
          {/* Grilla de productos */}
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

          {/* Controles de paginación */}
          <PaginationControls
            pagination={pagination}
            onPageChange={(newPage) =>
              fetchPage(newPage, 100, activeCategory, activeEstado)
            }
          />
        </>
      )}

      {/* Modal de edición */}
      <EditProductModal
        show={showEditModal}
        onHide={closeModal}
        product={selectedProduct}
        onSave={() => {
          closeModal();
          fetchPage(1, 100, activeCategory, activeEstado);
        }}
      />
    </div>
  );
};

export default ProductListView;

// Este componente lista productos con paginación, filtros por categoría y estado, y permite editar productos.
// Utiliza hooks personalizados para manejar la lógica de negocio y componentes reutilizables para la UI