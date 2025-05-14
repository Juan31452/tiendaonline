import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ product }) => {
  if (!product) return null;

  const shareOnWhatsApp = () => {
    const {
      Descripcion = 'Producto',
      Imagen = '',
      Precio = 'N/A',
      Talla = 'N/A',
      Categoria = 'General',
      IdProducto = ''
    } = product;

    const message = `¡Mira este producto! 🛍️\n\n*${Descripcion}*\n\n` +
                    `Precio: $${Precio}\n` +
                    `Talla: ${Talla}\n` +
                    `Categoría: ${Categoria}\n` +
                    (Imagen ? `Imagen: ${Imagen}\n` : '') +
                    `Ver más: ${window.location.origin}/products/${IdProducto}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  return (
    <button 
      onClick={shareOnWhatsApp}
      className="btn btn-success d-flex align-items-center gap-2"
      style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
    >
      <FaWhatsapp size={20} />
      Compartir
    </button>
  );
};

export default WhatsAppButton;
