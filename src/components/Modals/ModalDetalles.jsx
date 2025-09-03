import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WhatsAppButton from '../Buttons/WhatsAppButton';
import ButtonClose from '../Buttons/ButtonClose';
import '../../style/EditButton.css'; // estilos para el botón 
import { AuthContext } from '../Context/AuthContext';

const ModalDetalles = ({ product, show, onHide}) => {
  
  const { role } = useContext(AuthContext);

  if (!product) return null;

  // Determinar si el usuario tiene permisos para ver el precio real
  const userRole = role?.toLowerCase();
  const canViewPrice = userRole === 'admin' || userRole === 'vendedor';

  const displayPrice = canViewPrice ? product.Precio : 0;

  // Crear un objeto de producto para WhatsApp con el precio ajustado
  const productForWhatsApp = {
    ...product,
    Precio: displayPrice,
  };

  // Aumentar el z-index para que el modal se muestre sobre otros elementos fijos como la barra de navegación inferior.
  // El valor por defecto de Bootstrap es 1055. Ajústalo si es necesario.
  const modalStyle = {
    zIndex: 1060
  };

  const dialogClassName = product.Estado === 'Separado' ? 'modal-separado' : '';

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      style={modalStyle}
      dialogClassName={dialogClassName}
    >
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-1 px-2">
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
            <h3 className="mb-2">{product.Descripcion}</h3>

            <div className="mb-2 d-flex flex-wrap gap-2">
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
               {typeof displayPrice === 'number'
                ? `$${displayPrice.toLocaleString()}`
                : 'Precio no disponible'}
              </h3>
          </div>
        </div>
      </Modal.Body>

      {/* Footer con botón de WhatsApp y cerrar*/}
      <Modal.Footer className="py-1 px-2">
        {/* Se pasa el producto con el precio ajustado */}
        <WhatsAppButton product={productForWhatsApp} />
        <ButtonClose onClick={onHide} />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetalles;
