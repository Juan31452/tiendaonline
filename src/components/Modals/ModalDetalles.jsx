import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WhatsAppButton from '../Buttons/WhatsAppButton';
import ButtonClose from '../Buttons/ButtonClose';
import '../../style/EditButton.css'; // estilos para el botón 

const ModalDetalles = ({ product, show, onHide}) => {
  
  //const isLocalhost = window.location.hostname === 'localhost';

  if (!product) return null;

 

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      style={{
        boxShadow: product.Estado === 'Separado'
          ? '0 4px 8px rgba(219, 143, 143, 0.2)'
          : 'none'
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-1 px-2 pb-5">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={product.Imagen}
              alt={product.Descripcion}
              className="img-fluid rounded mb-3"
              style={{
                maxHeight: '350px',
                width: 'auto',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x400?text=Imagen+no+disponible';
                e.target.alt = 'Imagen no disponible';
              }}
            />
          </div>
          <div className="col-md-6">
            <h4 className="text-muted mb-3">{product.IdProducto}</h4>
            <h3 className="mb-4">{product.Descripcion}</h3>

            <div className="mb-4 d-flex flex-wrap gap-2">
              <span className="badge bg-primary p-2">Talla: {product.Talla}</span>
              <span className="badge bg-success p-2">Disponibles: {product.Cantidad}</span>
              <span className={`badge p-2 ${
                product.Estado === 'Disponible' ? 'bg-success' :
                product.Estado === 'Separado' ? 'bg-danger bg-opacity-25 text-dark' :
                'bg-warning bg-opacity-50'
              }`}>
                Estado: {product.Estado}
              </span>
            </div>

             <h3 className="text-primary mb-2">
               {typeof product.Precio === 'number'
                ? `$${product.Precio.toLocaleString()}`
                : 'Precio no disponible'}
              </h3>
          </div>
        </div>

        <div className="d-flex flex-row justify-content-end align-items-center w-100 gap-2 mt-n2">
            <div className="btn-custom-padding">
              <WhatsAppButton product={product} />
            </div>
            <div className="btn-custom-padding">
              <ButtonClose onClick={onHide} />
            </div>
          </div>
          
      </Modal.Body>

      {/* Footer con botón de WhatsApp y cerrar*/}
      <Modal.Footer className="py-1 px-2">

        
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetalles;
