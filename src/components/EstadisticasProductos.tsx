// src/components/EstadisticasProductos.tsx
import React from 'react';
import { EstadisticasPorCategoria } from '@/types/Estadisticas';
import '../style/EstadisticasProductos.css';

interface Props {
  estadisticas: EstadisticasPorCategoria[];
  loading: boolean;
  error: string | null;
  activeCategory: string; // o CategoryId si lo tenés así
}

const EstadisticasProductos: React.FC<Props> = ({
  estadisticas,
  loading,
  error,
  activeCategory,
}) => {
  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="estadisticas-container">
      {Array.isArray(estadisticas) ? (
        estadisticas.map(({ Categoria, estados }) => (
          <div key={Categoria}>
            <h5>
              Estadísticas para: <strong>{Categoria}</strong>
            </h5>
            <ul className="estadisticas-list">
              {estados ? (
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
        ))
      ) : (
        <p>Estadísticas no disponibles.</p>
      )}
    </div>
  );
};

export default EstadisticasProductos;
