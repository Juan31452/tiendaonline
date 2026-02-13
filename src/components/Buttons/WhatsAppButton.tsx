import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface Product {
  IdProducto: string | number;
  Imagen?: string;
  Precio?: number | string;
  Descripcion?: string;
  Talla?: string | number;
  [key: string]: any;
}

interface WhatsAppButtonProps {
  product: Product | null;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ product, className = '' }) => {
  if (!product) return null;

  // ✅ Imagen segura
  const rawImg = product.Imagen ?? '';
  const imageUrl = rawImg.startsWith('/') ? rawImg.slice(1) : rawImg;

  // ✅ Precio con separador latino
  const precio = Number(product.Precio ?? 0).toLocaleString('es-ES');

  // ✅ Truncar descripción si es demasiado larga
  const MAX_DESC_LENGTH = 50;
  const descripcion = product.Descripcion || '';
  const descripcionCorta =
    descripcion.length > MAX_DESC_LENGTH
      ? descripcion.slice(0, MAX_DESC_LENGTH) + '...'
      : descripcion;

  const message = `¡Hola! Mira este producto:
ID: ${product.IdProducto}
🛍️ *${descripcionCorta}*
📏 Talla: ${product.Talla}
💲 Precio: $${precio}

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
