import { useState, useEffect } from "react";
import productosData from "../data/products10.json";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productosData);
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Productos</h1>
      <ul className="list-unstyled">
        {products.map((product, index) => (
          <li key={index} className="border p-3 mb-3">
            <div className="row align-items-center flex-column flex-md-row text-center text-md-start">
              {/* Imagen */}
              <div className="col-md-3 mb-3 text-center">
                <img
                  src={product.Imagen} 
                  alt={product.Descripcion}
                  className="img-fluid rounded"
                  style={{ maxWidth: "150px" }}
                />
                <h2 className="mt-2">{product.Color}</h2>
              </div>

              {/* Detalles */}
              <div className="col-md-6">
                <p><strong>Talla:</strong> {product.Talla} | <strong>Cantidad:</strong> {product.Cantidad} | <strong>Precio:</strong> ${product.Precio}</p>
              </div>

              {/* Botón */}
              <div className="col-md-3 text-center">
                <button className="btn btn-primary">Agregar al carrito</button>
              </div>
            </div>

            {/* Descripción */}
            <p className="mt-2">{product.Descripcion}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
