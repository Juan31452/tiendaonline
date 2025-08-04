import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Product } from '@/types/Producto'; // Ajusta el path según tu estructura

interface WhatsAppButtonProps {
  product: Product | null;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ product, className = '' }) => {
  if (!product) return null;

  // Imagen segura
  const rawImg = product.Imagen ?? '';
  const imageUrl = rawImg.startsWith('/') ? rawImg.slice(1) : rawImg;

  // Precio con separador latino
  const precio = Number(product.Precio ?? 0).toLocaleString('es-ES');

  // Truncar descripción si es demasiado larga
  const MAX_DESC_LENGTH = 50;
  const descripcionCorta =
    product.Descripcion?.length > MAX_DESC_LENGTH
      ? product.Descripcion.slice(0, MAX_DESC_LENGTH) + '...'
      : product.Descripcion;

  const message = `¡Hola! Mira este producto:
ID: ${product.IdProducto}
🛍️ *${descripcionCorta}*
📏 : ${product.Talla}
💲 : $${precio}

📷 Imagen: ${imageUrl}`;

  const waLink = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-success d-inline-flex align-items-center gap-1 ${className}`}
    >
      <FaWhatsapp />
      Enviar por WhatsApp
    </a>
  );
};

export default WhatsAppButton;

// Nota: Este botón es para enviar mensajes de WhatsApp con detalles del producto.
// Si no hay producto, no renderiza nada.