import React from 'react';

interface ButtonCloseProps {
  onClick: () => void;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Cerrar"
    className="button-close"
  >
    &times;
  </button>
);

export default ButtonClose;
