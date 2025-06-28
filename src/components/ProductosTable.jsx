import React from 'react';

/** -----------------------------------------------------------
 * Utilidad para formatear fechas ISO → "26/06/2025 21:56"
 * ----------------------------------------------------------- */
const formatearFecha = (iso) => {
  if (!iso) return '';
  return new Date(iso).toLocaleString(); // .toLocaleDateString() si quieres solo la fecha
};

/** -----------------------------------------------------------
 * Lee cualquier formato y devuelve un array de filas
 * ----------------------------------------------------------- */
const normalizarProductos = (input) => {
  if (Array.isArray(input)) {
    return input; // ya es array
  }
  if (Array.isArray(input?.productos)) {
    return input.productos; // viene como { productos: [...] }
  }
  if (Array.isArray(input?.docs)) {
    return input.docs; // formato mongoose paginate
  }
  return []; // no hay nada que mostrar
};

const ProductosTable = ({ productos }) => {
  const rows = normalizarProductos(productos);

  // DEBUG opcional
  console.log('🛒 ProductosTable renderizado con:', rows);

  if (!rows.length) return <p>No hay productos para mostrar 🙃</p>;

  return (
    <>
      <h4>Productos cargados:</h4>
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
            <th>Creado</th>
            <th>Actualizado</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((p, idx) => (
            <tr key={p.IdProducto ?? p._id ?? idx}>
              <td>{p.IdProducto}</td>
              <td>{p.Descripcion}</td>
              <td>{p.Precio}</td>
              <td>{p.Color}</td>
              <td>{p.Talla}</td>
              <td>{p.Categoria}</td>
              <td>{p.Cantidad}</td>
              <td>{p.Estado}</td>
              <td>{formatearFecha(p.createdAt)}</td>
              <td>{formatearFecha(p.updatedAt)}</td>
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