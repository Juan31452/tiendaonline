import { FC } from 'react';
import { Product } from '../types'; // 1. Importamos el tipo global

/**
 * Props para el componente WhatsAppButton.
 * Acepta un objeto 'product' que sigue la interfaz global.
 */
interface WhatsAppButtonProps {
  product: Product;
  phoneNumber?: string; // Opcional: número de teléfono al que se enviará el mensaje
}

/**
 * Un botón que genera un enlace de WhatsApp con un mensaje predefinido
 * basado en los detalles del producto, manejando precios opcionales.
 */
const WhatsAppButton: FC<WhatsAppButtonProps> = ({
  product,
  phoneNumber = '34622229467', // Reemplaza con tu número por defecto
}) => {
  // 2. Construimos el mensaje base
  let message = `¡Hola! Estoy interesado en el producto:\n\n`;
  message += `*Producto:* ${product.Descripcion || 'Descripción no disponible'}\n`;
  message += `*ID:* ${product.IdProducto}\n`;

  // 3. Añadimos el precio al mensaje SOLO si existe y es un número
  if (product.Precio !== undefined && typeof product.Precio === 'number') {
    message += `*Precio:* $${product.Precio.toLocaleString()}\n`;
  } else {
    // Si no hay precio, podemos pedir que lo consulten
    message += `\nQuisiera consultar el precio y la disponibilidad.`;
  }

  // 4. Codificamos el mensaje para que sea seguro en una URL
  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-success fw-bold"
    >
      Contactar por WhatsApp
    </a>
  );
};

export default WhatsAppButton;
