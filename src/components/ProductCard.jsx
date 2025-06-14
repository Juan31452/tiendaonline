// components/ProductCard.jsx
const ProductCard = ({ product, onClick }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150?text=Imagen+no+disponible';
  };

  return (
    <div
      className="col-6 col-md-4 col-lg-3"
      onClick={onClick}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      style={{ cursor: 'pointer' }}
    >
      <div className="text-center bg-light p-2" style={{ minHeight: '150px' }}>
        <img
          src={product.Imagen}
          alt={product.Descripcion}
          className="img-fluid"
          style={{ height: '120px', objectFit: 'contain' }}
          onError={handleImageError}
        />
      </div>
      <div className="card-body">
        <small className="text-muted">ID: {product.IdProducto}</small>
        <h6 className="card-title text-truncate" title={product.Descripcion}>
          {product.Descripcion}
        </h6>
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-secondary">
            {product.Estado || 'Sin estado'}
          </span>
          <span className="text-success fw-bold">
            ${product.Precio?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
