import { FC } from 'react';
import { Product } from '../components/types'; // 👈 1. Importamos la interfaz global

// 2. La interfaz de props ahora usa el tipo Product importado.
interface EstadoResumenProps {
  products: Product[];
  estados?: string[];
}

const EstadoResumen: FC<EstadoResumenProps> = ({ products, estados = [] }) => {
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
