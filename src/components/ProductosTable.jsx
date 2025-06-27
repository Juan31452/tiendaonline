import React from 'react';

const ProductosTable = ({ productos }) => {
  if (!productos?.length) return null; // Nada que mostrar

  return (
    <>
      <h3>Productos cargados:</h3>
      <table
        border="1"
        cellPadding="8"
        style={{ width: '100%', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr>
            <th>IdProducto</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Color</th>
            <th>Talla</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p, idx) => (
            <tr key={p.IdProducto ?? idx}>
              <td>{p.IdProducto}</td>
              <td>{p.Descripcion}</td>
              <td>{p.Precio}</td>
              <td>{p.Color}</td>
              <td>{p.Talla}</td>
              <td>{p.Categoria}</td>
              <td>{p.Cantidad}</td>
              <td>{p.Estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductosTable;
// Este componente recibe un array de productos y los muestra en una tabla.
// Si no hay productos, no renderiza nada (retorna null).