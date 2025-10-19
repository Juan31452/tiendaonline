import { Modal } from 'react-bootstrap';
import WhatsAppButton from '../Buttons/WhatsAppButton';
import ButtonClose from '../Buttons/ButtonClose';
// Importamos los nuevos estilos para el modal
import '../../style/ModalDetalles.css'; 

const ModalDetalles = ({ product, show, onHide}) => {
  
  if (!product) return null;

  // El backend ya se encarga de enviar el precio solo a los roles autorizados.
  const displayPrice = product.Precio;

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

  // Clases para el diálogo del modal
  const dialogClassName = [
    'modal-detalles-dialog',
    product.Estado === 'Separado' ? 'modal-separado' : ''
  ].join(' ').trim();

  // Función para obtener la clase del badge según el estado
  const getBadgeClass = (estado) => {
    const estadoLower = estado?.toLowerCase();
    if (estadoLower === 'disponible') return 'badge-estado-disponible';
    if (estadoLower === 'separado') return 'badge-estado-separado';
    if (estadoLower === 'vendido') return 'badge-estado-vendido';
    return 'badge-estado-otro';
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      style={modalStyle}
      dialogClassName={dialogClassName}
    >
      <Modal.Header closeButton className="modal-detalles-header">
        <Modal.Title>Detalles del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-detalles-body">
        <div className="modal-detalles-content">
          <div className="modal-detalles-image-col">
            <img
              src={product.Imagen}
              alt={product.Descripcion}
              className="modal-detalles-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x400?text=Imagen+no+disponible';
                e.target.alt = 'Imagen no disponible';
              }}
            />
          </div>
          <div className="modal-detalles-info-col">
            <h4 className="modal-detalles-id">{product.IdProducto}</h4>
            <h3 className="modal-detalles-descripcion">{product.Descripcion}</h3>

            <div className="modal-detalles-badges">
              <span className="badge modal-detalles-badge bg-primary">Talla: {product.Talla}</span>
              <span className="badge modal-detalles-badge bg-success">Disponibles: {product.Cantidad}</span>
              <span className={`badge modal-detalles-badge ${getBadgeClass(product.Estado)}`}>
                Estado: {product.Estado}
              </span>
            </div>

             <h3 className="modal-detalles-precio">
               {displayPrice !== undefined && typeof displayPrice === 'number'
                ? `$${displayPrice.toLocaleString()}`
                : 'Precio no disponible'}
              </h3>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="modal-detalles-footer">
        <WhatsAppButton product={productForWhatsApp} />
        <ButtonClose onClick={onHide} />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetalles;
