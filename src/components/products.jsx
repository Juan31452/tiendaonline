import { useState, useEffect } from "react";
import productosData from "../data/products10.json";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productosData);
  }, []);

  return (
    <div className="container-fluid mt-4">
    <h1 className="text-center mb-4">Lista de Productos</h1>
    <ul className="list-unstyled">
      {products.map((product, index) => (
        <li key={index} className="border p-3 mb-3">
          <div className="row align-items-center text-center text-md-start">
            {/* Imagen */}
            <div className="col-12 mb-3">
              <img
                src={product.Imagen}
                alt={product.Descripcion}
                className="img-fluid w-100"
              />
            </div>

            {/* Detalles */}
            <div className="col-12">
              <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-start">
                <p className="me-md-3"><strong>Talla:</strong> {product.Talla}</p>
                <p className="me-md-3"><strong>Cantidad:</strong> {product.Cantidad}</p>
                <p><strong>Precio:</strong> ${product.Precio}</p>
              </div>
              <p className="mt-2">{product.Descripcion}</p>
            </div>

            {/* Botón */}
            <div className="col-12 text-center mt-3">
              <button className="btn btn-primary">Agregar al carrito</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>  );
}
