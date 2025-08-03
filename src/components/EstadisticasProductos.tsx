// src/components/EstadisticasProductos.tsx
import React from 'react';
import { EstadisticasPorCategoria } from '@/types/Estadisticas';
import '../style/EstadisticasProductos.css';

interface Props {
  estadisticas: EstadisticasPorCategoria[];
  loading: boolean;
  error: string | null;
  activeCategory: string; // o CategoryId si tienes
}

const EstadisticasProductos: React.FC<Props> = ({
  estadisticas,
  loading,
  error,
  activeCategory,
}) => {
  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filtra solo la categoría activa
  const datosFiltrados = estadisticas.filter(e => e.Categoria === activeCategory);

  if (datosFiltrados.length === 0) {
    return <p>No hay datos para la categoría: {activeCategory}</p>;
  }

  return (
    <div className="estadisticas-container">
      {datosFiltrados.map(({ Categoria, estados }) => (
        <div key={Categoria}>
          <h5>
            Estadísticas para: <strong>{Categoria}</strong>
          </h5>
          <ul className="estadisticas-list">
            {estados && Object.entries(estados).length > 0 ? (
              Object.entries(estados).map(([estado, total]) => (
                <li key={estado} className="estado-badge">
                  {estado}: {total}
                </li>
              ))
            ) : (
              <li>Sin estados disponibles.</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EstadisticasProductos;
