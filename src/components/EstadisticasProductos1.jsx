import React from 'react';
import '../style/EstadisticasProductos.css';
import ScrollingStats from './ScrollingStats'; // 1. Importamos el nuevo componente

const EstadisticasProductos = ({ estadisticas, loading, error, activeCategory }) => {
  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>;
  if (!estadisticas || estadisticas.length === 0) return <p>No hay estadísticas disponibles.</p>;
  
  // ✅ Lógica mejorada:
  // 1. Busca la categoría activa.
  // 2. Si no la encuentra (o si la activa es "todos"), usa la primera del array, que es "Todos".
  const categoriaActiva =
    estadisticas.find((e) => e.Categoria === activeCategory) ||
    estadisticas.find((e) => e.Categoria === 'Todos');
    
  // Si después de todo no hay nada, no renderizamos.
  if (!categoriaActiva) return null;

  return (
    <div className="estadisticas-container">
      <h5>Estadísticas para: <strong>{categoriaActiva.Categoria}</strong></h5>
      <ul className="estadisticas-list">
        {/* 2. Reemplazamos la lógica anterior por el nuevo componente */}
        <ScrollingStats estados={categoriaActiva.estados} />
      </ul>
    </div>
  );
};

export default EstadisticasProductos;
