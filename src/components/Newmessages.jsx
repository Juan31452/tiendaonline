import React from 'react';
import '../style/newmensagess.css';

const Newmessages = ({ cantidad }) => {
  if (cantidad <= 0) return null;

  return (
    <div className="new-messages">
      <span>🆕</span> {cantidad} {cantidad === 1 ? 'artículo nuevo' : 'artículos nuevos'} disponibles
    </div>
  );
};

export default Newmessages;

