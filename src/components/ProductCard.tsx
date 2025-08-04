// components/ProductCard.tsx
import React from 'react';
import { Product } from '../types/Producto';



type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, onClick }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/150?text=Imagen+no+disponible';
  };

  return (
    <div
      className="col-6 col-md-4 col-lg-3 mb-3"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* ─── Imagen ─── */}
      <div className="ratio ratio-1x1 bg-light overflow-hidden p-0">
        <img
          src={product.Imagen}
          alt={product.Descripcion}
          className="w-100 h-100 object-fit-cover"
          onError={handleImageError}
        />
      </div>

      {/* ─── Detalles ─── */}
      <div className="card-body p-2">
        <small className="text-muted d-block">ID: {product.IdProducto}</small>

        <h6 className="card-title text-truncate" title={product.Descripcion}>
          {product.Descripcion}
        </h6>

        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-secondary">{product.Estado || 'Sin estado'}</span>
          <span className="text-primary fw-bold">
            ${product.Precio?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}, areEqual);

// Comparación personalizada para evitar renders innecesarios
function areEqual(prevProps: ProductCardProps, nextProps: ProductCardProps): boolean {
  return prevProps.product === nextProps.product;
}

export default ProductCard;
// Este componente muestra una tarjeta de producto con imagen, descripción, estado y precio.
// Permite hacer clic para ver más detalles del producto.