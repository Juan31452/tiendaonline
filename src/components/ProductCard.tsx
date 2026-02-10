// components/ProductCard.tsx
import React from 'react';
import { Product } from '../components/types'; // 👈 1. Importamos la interfaz global
import '../style/ProductCard.css'; // Aplicamos los nuevos estilos

// 2. La interfaz de props ahora usa el tipo Product importado.
interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard = React.memo<ProductCardProps>(({ product, onClick }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) =>
    (e.currentTarget.src =
      'https://via.placeholder.com/150?text=Imagen+no+disponible');

  return (
    <div
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={() => onClick(product)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(product)}
    >
      {/* ─── Imagen ─── */}
      <div className="ratio ratio-1x1 bg-light overflow-hidden p-0">
        {/* p-0 = cero padding → adiós franja */}
        <img
          src={product.Imagen || 'https://via.placeholder.com/150?text=Imagen+no+disponible'} // 4. Fallback para imagen
          alt={product.Descripcion}
          className="w-100 h-100 object-fit-cover" // llena y recorta
          onError={handleImageError}
        />
      </div>

      {/* ─── Detalles ─── */}
      <div className="card-body p-2">
        <small className="text-muted d-block">
          ID: {product.IdProducto}
        </small>

        <h6
          className="card-title text-truncate"
          title={product.Descripcion}
        >
          {product.Descripcion}
        </h6>

        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-secondary">
            {product.Estado || 'Sin estado'}
          </span>
          {product.Precio !== undefined && ( // 5. Renderizado condicional del precio
            <span className="text-primary fw-bold">
              ${product.Precio.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}, areEqual);

// 📌 Comparación personalizada para evitar renders innecesarios
function areEqual(prevProps: Readonly<ProductCardProps>, nextProps: Readonly<ProductCardProps>) {
  return prevProps.product === nextProps.product;
}

export default ProductCard;
