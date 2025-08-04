// components/ProductListPage.tsx
import React, { useCallback, useMemo, useState } from 'react';
import useProductPagination from '../hooks/useProductPagination';
import CategoryFilterController from '../components/CategoryFilterController';
import ModalDetalles from '../components/Modals/ModalDetalles';
import ProductGrid from '../components/ProductGrid';
import EstadoResumen from '../components/EstadoResumen';
import Pagination from '../components/Pagination';
import MobileBottomNav from '../components/Buttons/MobileBottomNav';

import { Product } from '../types/Producto';
import { EstadoProducto } from '../types/Categoria';

interface ProductListPageProps {
  title: string;
  allProducts: Product[];
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  filterFn: (product: Product) => boolean;
  resumenEstados?: EstadoProducto[];
}

const ProductListPage: React.FC<ProductListPageProps> = ({
  title,
  allProducts,
  filteredProducts,
  setFilteredProducts,
  filterFn,
  resumenEstados = []
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const itemsPerPage = 32;

  const {
    currentPage,
    setCurrentPage,
    paginatedProducts,
    totalPages
  } = useProductPagination(filteredProducts, itemsPerPage, filterFn);

  const handleCardClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  }, []);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginationProps = {
    currentPage,
    totalPages,
    onPageChange: handlePageChange,
  };

  const resumenProducts = useMemo(() => {
    return selectedCategory === 'todos' ? allProducts : filteredProducts;
  }, [selectedCategory, allProducts, filteredProducts]);

  return (
    <div className="container mt-4" style={{ paddingTop: '80px' }}>
      <h2 className="text-center mb-2">{title}</h2>

      <EstadoResumen
        products={resumenProducts}
        estados={resumenEstados}
      />

      <Pagination {...paginationProps} />

      <div className="sticky-top bg-transparent pt-2 pb-3 z-index-1020" style={{ top: 0 }}>
        <CategoryFilterController
          allProducts={allProducts}
          setFilteredProducts={setFilteredProducts}
          onCategoryChange={setSelectedCategory}
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
