import React from 'react';
import '../style/ScrollingStats.css'; // Importamos los nuevos estilos

// Definimos los estados que queremos mostrar y su orden
const ESTADOS_A_MOSTRAR = ['Disponible', 'Vendido', 'Separado', 'Nuevo', 'Oferta'];

interface ScrollingStatsProps {
  estados?: { [key: string]: number } | null;
}

const ScrollingStats: React.FC<ScrollingStatsProps> = ({ estados }) => {
  if (!estados) {
    return <span>Sin estados disponibles.</span>;
  }

  // Creamos los elementos de las estadísticas para poder duplicarlos fácilmente.
  const statsItems = ESTADOS_A_MOSTRAR.map((estado) => {
    // Si el estado no existe en los datos, su total será 0.
    const total = estados[estado] || 0;
    return (
      <div key={estado} className="scrolling-stats-item">
        {/* Añadimos una clase dinámica para el color, ej: "estado-badge-disponible" */}
        <span
          className={`estado-badge estado-badge-${estado.toLowerCase()}`}
        >
          {`${estado}: ${total}`}
        </span>
      </div>
    );
  });


  return (
    <div className="scrolling-stats-container">
      {/* 1. Envolvemos los items en un único contenedor para la animación */}
      <div className="scrolling-stats-track">
        {statsItems}
        {statsItems}
      </div>
    </div>
  );
};

export default ScrollingStats;
