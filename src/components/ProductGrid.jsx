// components/ProductGrid.jsx
import React, { useCallback } from 'react';
import ProductCard from './ProductCard';

const MemoizedProductCard = React.memo(({ product, onCardClick }) => {
  const handleClick = useCallback(() => {
    onCardClick(product);
  }, [product, onCardClick]);

  return <ProductCard product={product} onClick={handleClick} />;
});

const ProductGrid = ({ products, onCardClick }) => {
  if (products.length === 0) {
    return (
      <div className="col-12 text-center py-5">
        <div className="alert alert-warning">No hay productos en esta categoría</div>
      </div>
    );
  }

  return (
    <div className="row g-3">
      {products.map((product) => (
        <MemoizedProductCard
          key={product.IdProducto}
          product={product}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;