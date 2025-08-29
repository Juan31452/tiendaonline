// components/ProductListPage.jsx
import React, { useCallback, useMemo,useState } from 'react';
import useProductPagination from '../hooks/useProductPagination';
import CategoryFilterController from '../components/CategoryFilterController';
import ModalDetalles from '../components/Modals/ModalDetalles';
//import ProductCard  from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';
import EstadoResumen from '../components/EstadoResumen';
import Pagination from '../components/Pagination';
import MobileBottomNav from '../components/Buttons/MobileBottomNav';  
import NewMessages from '../components/Newmessages'; // Asegúrate de que la ruta sea correcta
// 1. Importamos el componente genérico de radio buttons
import RadioOptionsHorizontal from '../components/Buttons/RadioOptionsHorizontal';
// 2. Importamos SOLAMENTE la lista de estados que necesitamos
import { LIMITED_PRODUCT_STATES } from '../constants/states';



const ProductListPage = ({ 
  title,
  allProducts,
  filteredProducts,
  setFilteredProducts,
  filterFn,
  resumenEstados = [],

}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  //const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const itemsPerPage = 52;
  const [selectedStatus, setSelectedStatus] = useState('todos');
  
  // 2. Opciones para los radio buttons, incluyendo "Todos"
  const statusOptions = useMemo(
    () => [{ value: 'todos', label: 'Todos' }, ...LIMITED_PRODUCT_STATES],
    []
  );

  

  
  // 3. Aplica el filtro de estado sobre los productos ya filtrados por categoría
  const productsWithStatusFilter = useMemo(() => {
    if (title !== 'Productos Fuera de Stock' || selectedStatus === 'todos') {
      return filteredProducts;
    }
    return filteredProducts.filter(
      (p) => p.Estado?.toLowerCase() === selectedStatus.toLowerCase()
    );
  }, [filteredProducts, selectedStatus, title]);


  const {
    currentPage,
    setCurrentPage,
    paginatedProducts,
    totalPages
  } = useProductPagination(productsWithStatusFilter, itemsPerPage, filterFn); // 4. Usar la nueva lista filtrada


  const handleCardClick = useCallback((product) => {
    setSelectedProduct(product);
    setShowModal(true);
 }, []);

  const handlePageChange = (pageNum) => {
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

   const nuevosCount = allProducts.filter(
    (p) => p.Estado?.trim().toLowerCase() === 'nuevo'
  ).length;
  
  //console.log("estado",filterFn)
  return (
    <div className="container mt-4" style={{ paddingTop: '80px' }}>
      
      {/* Mostrar solo si no se está filtrando por "Nuevo" */}
      {title == 'Nuestros Productos' && <NewMessages cantidad={nuevosCount} />}

      <h2 className="text-center mb-2">{title}</h2>

      
      <EstadoResumen
        products={resumenProducts}
        estados={resumenEstados}
      />
              
      {/* 5. Renderizar condicionalmente los radio buttons */}
        {title === 'Productos Fuera de Stock' && (
          <div className="d-flex justify-content-center mt-3">
            <RadioOptionsHorizontal
              options={statusOptions}
              name="statusFilter"
              value={selectedStatus}
              onChange={setSelectedStatus}
            />
          </div>
        )}
    

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