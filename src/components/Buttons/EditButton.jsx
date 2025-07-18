import React from 'react';
import '../../style/EditButton.css';

const EditButton = ({
  onClick,
  className = '',
  children, // 👈 permite contenido personalizado
  label = 'Editar', // fallback si no hay children
  ...props // permite pasar más props (ej: disabled, style)
}) => (
  <button
    type="button"
    className={`edit-button ${className}`}
    onClick={onClick}
    {...props}
  >
    <svg
      className="edit-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-8.25 8.25-2.646.884a.5.5 0 0 1-.632-.632l.884-2.646 8.25-8.25zM11.207 3L3 11.207v1.586h1.586L13.793 4.793 11.207 3z" />
    </svg>
    {children || label}
  </button>
);

export default EditButton;
