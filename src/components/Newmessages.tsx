import React from 'react';
import '../style/newmensagess.css';

interface NewmessagesProps {
  cantidad: number;
}

const Newmessages: React.FC<NewmessagesProps> = ({ cantidad }) => {
  if (cantidad <= 0) return null;

  return (
    <div className="new-messages">
      <span>🆕</span> {cantidad} {cantidad === 1 ? 'artículo nuevo' : 'artículos nuevos'} disponibles
    </div>
  );
};

export default Newmessages;
