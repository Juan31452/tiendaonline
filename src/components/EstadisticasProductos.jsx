import React from 'react';
import '../style/EstadisticasProductos.css';

const EstadisticasProductos = ({ estadisticas, loading, error, activeCategory }) => {
  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>;
  if (!estadisticas || estadisticas.length === 0) return <p>No hay estadísticas disponibles.</p>;

  // 🔍 Buscar solo la categoría activa
  const categoriaActiva = estadisticas.find(
    (cat) =>
      cat.Categoria?.toString().trim().toLowerCase() ===
      activeCategory?.toString().trim().toLowerCase()
  );

  if (!categoriaActiva) return <p>No hay datos para esta categoría.</p>;

  return (
    <div className="estadisticas-container">
      <h5>Estadísticas para: <strong>{categoriaActiva.Categoria}</strong></h5>
      <ul className="estadisticas-list">
        <li>
          {categoriaActiva.estados
            ? Object.entries(categoriaActiva.estados).map(([estado, total]) => (
                <span key={estado} className="estado-badge">
                  {estado}: {total}
                </span>
              ))
            : <span>Sin estados disponibles.</span>}
        </li>
      </ul>
    </div>
  );
};

export default EstadisticasProductos;
