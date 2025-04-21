import { useState, useEffect } from 'react';
import productos11 from "../data/products_modified11.json";
import productos12 from "../data/products_modified12.json";
import productos13 from "../data/products_modified13.json";
import productos14 from "../data/products_modified14.json";
import CategorySelector from './CategorySelector';
import ModalDetalles from './ModalDetalles';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const combinedProducts = [...productos11, ...productos12, ...productos13, ...productos14];
      const uniqueProducts = Array.from(
        new Map(combinedProducts.map(product => [product.IdProducto, product])).values()
      );

      setAllProducts(uniqueProducts);
      setFilteredProducts(uniqueProducts);
    } catch (err) {
      console.error("Error al cargar productos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterByKeywords = (keywords) => {
    return allProducts.filter(product => {
      const cat = product.Categoria?.toLowerCase() || '';
      const desc = product.Descripcion?.toLowerCase() || '';
      return keywords.some(keyword => cat.includes(keyword) || desc.includes(keyword));
    });
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    switch (categoryId) {
      case 'hombre':
        setFilteredProducts(filterByKeywords(['hombre', 'masculino', 'caballero']));
        break;
      case 'mujer':
        setFilteredProducts(filterByKeywords(['mujer', 'femenino', 'dama']));
        break;
      case 'nino':
        setFilteredProducts(filterByKeywords(['niño', 'nino', 'niña', 'nina', 'infantil']));
        break;
      case 'tecnologia':
        setFilteredProducts(filterByKeywords(['tecnolog', 'electron', 'digital', 'smart']));
        break;
      case 'variedades':
          setFilteredProducts(filterByKeywords(['variedade', 'otros', 'variedad', 'general']));
          break;    
      case 'todos':
      default:
        setFilteredProducts(allProducts);
    }
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Subtítulo "Nuestros Productos" */}
      <h2 className="text-center mb-4">Nuestros Productos</h2>
      
      {/* Selector de categorías (siempre visible) */}
      <div className="sticky-top bg-white pt-2 pb-3 z-index-1020" style={{ top: '0' }}>
        <CategorySelector 
          onSelectCategory={handleSelectCategory}
          activeCategory={selectedCategory}
        />
      </div>
      
      <div className="row g-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.IdProducto} className="col-6 col-md-4 col-lg-3">
              <div
                className="card h-100 hover-shadow"
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
                  <h6 className="card-title text-truncate" title={product.Descripcion}>
                    {product.Descripcion}
                  </h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-secondary">
                      {product.Categoria || 'General'}
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

      <ModalDetalles
        product={selectedProduct}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
}
