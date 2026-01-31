import React from 'react';
import '../style/newmensagess.css';

const Newmessages = ({ cantidad, estado }) => {
  if (cantidad <= 0 || !estado) return null;

  let emoji = '';
  let message = '';
  let className = 'new-messages';

  if (estado === 'nuevo') {
    emoji = '🆕';
    message = cantidad === 1 ? ' Nuevos' : 'Nuevos';
  } else if (estado === 'oferta') {
    emoji = '🔥';
    message = cantidad === 1 ? 'En oferta' : 'En oferta';
    className += ' offer-messages'; // Clase para estilos diferentes
  } else {
    return null;
  }

  return (
    <div className={className}>
      <span>{emoji}</span> {cantidad} {message}
    </div>
  );
};

export default Newmessages;
