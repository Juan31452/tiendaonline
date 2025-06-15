// src/components/WhatsAppFloatingButton.jsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloatingButton = ({ phone = '', message = '' }) => {
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-button"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppFloatingButton;
