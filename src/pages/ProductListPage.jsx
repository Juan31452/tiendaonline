// components/ProductListPage.jsx
import { useState, useEffect } from 'react';
import CategoryFilterController from '../components/CategoryFilterController';
import ModalDetalles from '../components/Modals/ModalDetalles';
import ProductCard from '../components/ProductCard';
import EstadoResumen from '../components/EstadoResumen';
import Pagination from '../components/Pagination';
import MobileBottomNav from '../components/Buttons/MobileBottomNav';  

const ProductListPage = ({ 
  title,
  allProducts,
  filteredProducts,
  setFilteredProducts,
  filterFn,
  resumenEstados = []
}) => {

  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 32; // Cambia este valor según tus necesidades
 /* estado existente… */
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resetear página al cambiar productos
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  const filtered = filteredProducts.filter(filterFn);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
 // Decide qué lista usa el resumen: global o filtrada
  const resumenProducts =
    selectedCategory === 'todos' ? allProducts : filteredProducts;

  return (
    <div className="container mt-4" style={{ paddingTop: '80px' }}>
      <h2 className="text-center mb-2">{title}</h2>

      <EstadoResumen
        products={resumenProducts}   // ✅ cuenta por estado según categoría
        estados={resumenEstados}
        
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <div className="sticky-top bg-transparent pt-2 pb-3 z-index-1020" style={{ top: 0 }}>
        <CategoryFilterController
          allProducts={allProducts}
          setFilteredProducts={setFilteredProducts}
          onCategoryChange={setSelectedCategory}  // ✅ recibe la categoría
        />
      </div>

      <div className="row g-3">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard
              key={product.IdProducto}
              product={product}
              onClick={() => handleCardClick(product)}
            />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="alert alert-warning">
              No hay productos en esta categoría
            </div>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {selectedProduct && (
        <ModalDetalles
          product={selectedProduct}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
      
      <MobileBottomNav /> {/* Añadido el componente de navegación móvil */}
      
    </div>
  );
};

export default ProductListPage;
