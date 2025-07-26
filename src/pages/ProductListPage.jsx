// components/ProductListPage.jsx
import React from 'react';
import { useState } from 'react';
import useProductPagination from '../hooks/useProductPagination';
import CategoryFilterController from '../components/CategoryFilterController';
import ModalDetalles from '../components/Modals/ModalDetalles';
//import ProductCard  from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';
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
  //const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const itemsPerPage = 32;
  
  const {
    currentPage,
    setCurrentPage,
    paginatedProducts,
    totalPages
  } = useProductPagination(filteredProducts, itemsPerPage, filterFn);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginationProps = {
    currentPage,
    totalPages,
    onPageChange: handlePageChange,
  };

  const resumenProducts =
    selectedCategory === 'todos' ? allProducts : filteredProducts;

  return (
    <div className="container mt-4" style={{ paddingTop: '80px' }}>
      <h2 className="text-center mb-2">{title}</h2>

      <EstadoResumen
        products={resumenProducts}
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

      <ProductGrid
        products={paginatedProducts}
        onCardClick={handleCardClick}
      />

      <Pagination {...paginationProps} />

      {selectedProduct && (
        <ModalDetalles
          product={selectedProduct}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}

      <MobileBottomNav />
    </div>
  );
};

export default ProductListPage;