import { FC } from 'react';
import { Product } from '../components/types'; // tipo global del producto
import ProductCard from './ProductCard';
import '../style/ProductGrid.css'; // Asumiendo que este archivo de estilos existe

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductGrid: FC<ProductGridProps> = ({ products, onProductSelect }) => {
  if (!products || products.length === 0) {
    return (
      <div className="alert alert-info mt-3" role="alert">
        No hay productos para mostrar con los filtros actuales.
      </div>
    );
  }

  return (
    <div className="row g-3">
      {products.map((product) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}>
          <ProductCard product={product} onClick={onProductSelect} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
