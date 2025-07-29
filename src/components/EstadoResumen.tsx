// components/EstadoResumen.jsx
import React from 'react';

type Producto = {
  Estado?: string;
  // Puedes agregar más propiedades si las usas en otro lado
};

type EstadoResumenProps = {
  products: Producto[];
  estados?: string[];
};

const EstadoResumen: React.FC<EstadoResumenProps> = ({ products, estados = [] }) => {
  const contarPorEstado = (estado: string): number =>
    products.filter(
      (product) => product.Estado?.toLowerCase() === estado.toLowerCase()
    ).length;

  return (
    <div className="d-flex justify-content-center flex-wrap gap-3 text-muted mb-4">
      {estados.map((estado) => (
        <p className="mb-1" key={estado}>
          {estado.charAt(0).toUpperCase() + estado.slice(1)}:{' '}
          <strong>{contarPorEstado(estado)}</strong>
        </p>
      ))}
    </div>
  );
};

export default EstadoResumen;
