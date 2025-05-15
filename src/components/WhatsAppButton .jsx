import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ product }) => {
  const shareOnWhatsApp = () => {
    const productUrl = `${window.location.origin}/products/${product.IdProducto}`;
    const encodedMessage = encodeURIComponent(productUrl);
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
