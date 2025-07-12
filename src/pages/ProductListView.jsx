import { useEffect, useState } from 'react';
import useListProducts from '../hooks/useListProducts';
import useEditProduct from '../hooks/useEditProduct';

import Pagination from '../components/Pagination';
import EstadoResumen from '../components/EstadoResumen';
import ProductCard from '../components/ProductCard';
import EditProductModal from '../components/Modals/EditProductModal';
import Category from '../components/Buttons/Category';
import RadioOptionsHorizontal from '../components/Buttons/RadioOptionsHorizontal';
import Loading                from '../components/Loading';

const ESTADOS = ['disponible', 'separado', 'vendido', 'no se vende'];

const ProductListView = () => {
  const { productos, pagination, loading, error, fetchPage } = useListProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productState, setProductState] = useState('disponible');

  const {
    productSel,
    showModal: showEditModal,
    loading: saving,
    error: saveError,
    openModal,
    closeModal,
    saveChanges,
  } = useEditProduct();

  // 👇 Fetch dinámico según filtros
  useEffect(() => {
    const categoriaParam = selectedCategory || '';
    const estadoParam = productState.charAt(0).toUpperCase() + productState.slice(1); // capitaliza
    
  fetchPage(currentPage, categoriaParam, estadoParam);
}, [currentPage, selectedCategory, productState, fetchPage]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleCardClick = (product) => {
    openModal(product);
  };

  if (loading) return <Loading fullScreen />;

  if (error) return <p>❌ Error: {error}</p>;

  return (
    <div className="container mt-4" style={{ paddingTop: '80px' }}>
      <h2 className="text-center mb-2">Lista de Productos</h2>

      {/* Filtros activos */}
      <p className="text-muted mb-2 text-center">
        Filtro: <strong>{selectedCategory || 'Todas'}</strong> | Estado:{' '}
        <strong>{productState}</strong>
      </p>

      {/* Estado */}
      <RadioOptionsHorizontal
        onChange={(value) => {
          setProductState(value);
          setCurrentPage(1);
        }}
        defaultValue={productState}
      />

      {/* Categoría */}
      <div className="mb-3">
        <Category
          activeCategory={selectedCategory}
          onSelect={handleCategorySelect}
          products={productos} // <=== aquí pasamos los productos filtrados
        />
      </div>

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Resumen de estados */}
      <EstadoResumen products={productos} estados={ESTADOS} />

      {/* Productos */}
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

      {/* Paginación inferior */}
      <Pagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal de edición */}
      <EditProductModal
        show={showEditModal}
        onHide={closeModal}
        product={productSel}
        onSave={(updated) => saveChanges(updated, () => fetchPage(currentPage, selectedCategory, productState))}
        saving={saving}
        error={saveError}
      />
    </div>
  );
};

export default ProductListView;
// Este componente lista productos con paginación, filtros por categoría y estado, y permite editar productos.
// Utiliza hooks personalizados para manejar la lógica de negocio y componentes reutilizables para la UI