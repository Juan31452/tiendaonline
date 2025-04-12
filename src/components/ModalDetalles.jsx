import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalDetalles = ({ product, show, onHide }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={product.Imagen}
              alt={product.Descripcion}
              className="img-fluid rounded mb-3"
              style={{ 
                maxHeight: '400px', 
                width: 'auto',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400?text=Imagen+no+disponible';
                e.target.alt = 'Imagen no disponible';
              }}
            />
          </div>
          <div className="col-md-6">
            <h4 className="text-muted mb-3">{product.IdProducto}</h4>
            <h2 className="mb-4">{product.Descripcion}</h2>
            
            <div className="mb-4">
              <span className="badge bg-primary me-2 p-2">Talla: {product.Talla}</span>
              <span className="badge bg-success p-2">Disponibles: {product.Cantidad}</span>
            </div>
            
            <h3 className="text-primary mb-4">${product.Precio.toLocaleString()}</h3>
            
            
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetalles;