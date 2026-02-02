// components/ProductCard.tsx
import React from 'react';
import '../style/ProductCard.css'; // Aplicamos los nuevos estilos

// Definimos la interfaz para el producto
export interface Product {
  _id?: string;
  IdProducto: string | number;
  Imagen: string;
  Descripcion: string;
  Estado?: string;
  Precio?: number;
}

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
      className="col-6 col-md-4 col-lg-3 mb-3"
      role="button"
      tabIndex={0}
      onClick={() => onClick(product)} // ✅ CORRECCIÓN: Pasa el producto al hacer clic
      onKeyDown={(e) => e.key === 'Enter' && onClick(product)} // ✅ CORRECCIÓN: También aquí
    >
      {/* ─── Imagen ─── */}
      <div className="ratio ratio-1x1 bg-light overflow-hidden p-0">
        {/* p-0 = cero padding → adiós franja */}
        <img
          src={product.Imagen}
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
          <span className="text-primary fw-bold">
            ${product.Precio?.toLocaleString()}
          </span>
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
