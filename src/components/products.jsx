import { useState, useEffect } from "react";
import productos11 from "../data/products_modified11.json";
import productos13 from "../data/products_modified13.json";
import productos12 from "../data/products_modified12.json";

import ModalDetalles from "./ModalDetalles"; // Importamos el componente modal

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const allProducts = [...productos11, ...productos12, ...productos13];
      const productMap = new Map();
      allProducts.forEach(product => {
        if (!productMap.has(product.IdProducto)) {
          productMap.set(product.IdProducto, product);
        }
      });
      setProducts(Array.from(productMap.values()));
    } catch (err) {
      console.error("Error al procesar productos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const truncateDescription = (text, maxLength = 10) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddToCart = () => {
    // Lógica para agregar al carrito
    console.log("Agregado al carrito:", selectedProduct);
    // setShowModal(false); // Opcional: cerrar modal al agregar
  };

  if (loading) return <div className="text-center py-5">Cargando productos...</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Productos</h1>
      
      <div className="row">
        {products.map((product) => (
          <div key={product.IdProducto} className="col-6 col-md-4 col-lg-3 mb-4">
            <div 
              className="card h-100 hover-shadow" 
              onClick={() => handleProductClick(product)}
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
            >
              <div className="text-center bg-light p-2" style={{ minHeight: '150px' }}>
                <img
                  src={product.Imagen}
                  alt={product.Descripcion}
                  className="img-fluid"
                  style={{ 
                    height: '120px', 
                    objectFit: 'contain',
                    maxWidth: '100%'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/120x120?text=Imagen+no+disponible';
                  }}
                />
              </div>
              <div className="card-body">
                <h6 className="card-title text-muted">{product.IdProducto}</h6>
                <h5 className="card-title" title={product.Descripcion}>
                  {truncateDescription(product.Descripcion, 25)}
                </h5>
                
                {/*<div className="d-flex flex-wrap gap-1 mb-2">
                  <span className="badge bg-secondary">Talla: {product.Talla}</span>
                  <span className="badge bg-secondary">Disponibles: {product.Cantidad}</span>
                </div>*/}

                <div className="fw-bold text-success">
                  ${typeof product.Precio === 'number' ? product.Precio.toLocaleString() : product.Precio}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles como componente separado */}
      <ModalDetalles 
        product={selectedProduct}
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}