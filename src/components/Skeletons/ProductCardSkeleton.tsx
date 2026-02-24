import React from 'react';
import '../../style/ProductCardSkeleton.css';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="col-6 col-md-4 col-lg-3 mb-3">
      <div className="skeleton-card">
        <div className="skeleton-image skeleton-animation" />
        <div className="skeleton-body">
          <div
            className="skeleton-line skeleton-animation"
            style={{ width: '50%' }}
          />
          <div className="skeleton-line skeleton-animation" />
          <div
            className="skeleton-line skeleton-animation"
            style={{ width: '75%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;