import { useState, useEffect } from "react";
import productosData from "../data/products_modified.json";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productosData);
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Productos</h1>
      
      <div className="row justify-content-center">
        {products.map((product, index) => (
          <div key={index} className="col-12 col-md-10 col-lg-6 mb-4">
            <div className="card mx-auto" style={{maxWidth: '500px'}}>
              <div className="row g-0">
                {/* Imagen - Centrada en móvil */}
                <div className="col-md-5 text-center">
                  <img
                    src={product.Imagen}
                    alt={product.Descripcion}
                    className="img-fluid p-2"
                    style={{
                      maxHeight: '180px',
                      width: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </div>
                
                {/* Contenido */}
                <div className="col-md-7">
                  <div className="card-body">
                  <h5 className="card-title text-center text-md-start">
                      {product.IdProducto}
                    </h5>
                    <h4 className="card-title text-center text-md-start">
                      {product.Descripcion}
                    </h4>
                    
                    <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2 mb-3">
                      <span className="badge bg-secondary">Talla: {product.Talla}</span>
                      <span className="badge bg-secondary">Cantidad: {product.Cantidad}</span>
                      <span className="badge bg-success">${product.Precio}</span>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
