// components/ProductListPage.jsx
import { useState } from 'react';
import CategoryFilterController from './CategoryFilterController';
import ModalDetalles from './ModalDetalles';

const ProductListPage = ({ 
  title,
  allProducts,
  filteredProducts,
  setFilteredProducts,
  filterFn 
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
   console.log('Filtered Products:', filteredProducts);
        
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{title}</h2>

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
              <div key={product.IdProducto} className="col-6 col-md-4 col-lg-3">
                <div
                  onClick={() => handleCardClick(product)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="text-center bg-light p-2" style={{ minHeight: '150px' }}>
                    <img
                      src={product.Imagen}
                      alt={product.Descripcion}
                      className="img-fluid"
                      style={{ height: '120px', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=Imagen+no+disponible';
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <small className="text-muted">ID: {product.IdProducto}</small>
                    <h6 className="card-title text-truncate" title={product.Descripcion}>
                      {product.Descripcion}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-secondary">
                        {product.Estado || 'Sin estado'}
                      </span>
                      <span className="text-success fw-bold">
                        ${product.Precio?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
