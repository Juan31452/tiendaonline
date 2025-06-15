import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ product, className = '' }) => {
  if (!product) return null;

  const phoneNumber = '573001112233'; // Tu número de WhatsApp
  const message = `¡Hola! Estoy interesado en este producto:

🔹 *${product.Descripcion}*
🆔 ID: ${product.IdProducto}
📏 Talla: ${product.Talla}
💲 Precio: $${product.Precio.toLocaleString()}

📷 Imagen: ${window.location.origin}/${product.Imagen}`;

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-success d-flex align-items-center gap-2 ${className}`}
    >
      <FaWhatsapp />
      Compartir
    </a>
  );
};

export default WhatsAppButton;
