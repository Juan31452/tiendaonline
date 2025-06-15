// components/ProductListPage.jsx
import { useState } from 'react';
import CategoryFilterController from './CategoryFilterController';
import ModalDetalles from './ModalDetalles';
import ProductCard from './ProductCard';
import EstadoResumen from './EstadoResumen';

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

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
   console.log('Filtered Products:', filteredProducts);
        
  return (
    <div className="container mt-4" style={{ paddingTop: '80px' }}>
      
      <h2 className="text-center mb-2">
        {title}
      </h2>
      
      {resumenEstados && resumenEstados.length > 0 && (
      <EstadoResumen products={filteredProducts} estados={resumenEstados} />
)}

      <div
        className="sticky-top bg-white pt-2 pb-3 z-index-1020"
        style={{ top: '0' }}
      > 
        <CategoryFilterController
          allProducts={allProducts}
          setFilteredProducts={setFilteredProducts}
        />
      </div>

      <div className="row g-3">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .filter(filterFn)
            .map((product) => (
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

      {selectedProduct && (
        <ModalDetalles
          product={selectedProduct}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ProductListPage;
