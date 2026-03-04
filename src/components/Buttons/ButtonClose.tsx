import React from 'react';
import '../../style/ButtonClose.css';

interface ButtonCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Permite pasar cualquier prop de botón estándar, como `onClick` o `className`.
}

const ButtonClose: React.FC<ButtonCloseProps> = ({
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      type="button" // Buena práctica para evitar envíos de formulario accidentales
      onClick={onClick}
      aria-label="Cerrar"
      className={`button-close ${className}`}
      {...props}
    >
      &times;
    </button>
  );
};

export default ButtonClose;
