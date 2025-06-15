import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ product, className = '' }) => {
  if (!product) return null;

  const imageUrl = `${window.location.origin}/${product.Imagen.startsWith('/') ? product.Imagen.slice(1) : product.Imagen}`;
  const message = `¡Hola! Mira este producto:

🛍️ *${product.Descripcion}*
📏 Talla: ${product.Talla}
💲 Precio: $${product.Precio.toLocaleString()}

📷 Imagen: ${imageUrl}

`;

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-success d-flex align-items-center gap-2 ${className}`}
      style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
    >
      <FaWhatsapp size={20} />
      Compartir
    </a>
  );
};

export default WhatsAppButton;
