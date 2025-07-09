import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';


const WhatsAppButton = ({ product, className = '' }) => {
  if (!product) return null;

  // ✅ Imagen segura
  const rawImg = product.Imagen ?? '';
  const imageUrl = rawImg.startsWith('/') ? rawImg.slice(1) : rawImg;

  // ✅ Precio con separador latino
  const precio = Number(product.Precio ?? 0).toLocaleString('es-ES');

  const message = `¡Hola! Mira este producto:
ID: ${product.IdProducto}
🛍️ *${product.Descripcion}*
📏 Talla: ${product.Talla}
💲 Precio: $${precio}

📷 Imagen: ${imageUrl}`;

  const waLink = `https://wa.me/?text=${encodeURIComponent(message)}`;

 
  return (
    <>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-success d-inline-flex align-items-center gap-1 ${className}`}
      >
        <FaWhatsapp />
        Enviar por WhatsApp
      </a>

      
     
    </>
  );
};

export default WhatsAppButton;
// Nota: Este botón es para enviar mensajes de WhatsApp con detalles del producto.
// Si no hay producto, no renderiza nada.