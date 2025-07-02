import React from 'react';

const ButtonClose = ({ onClick }) => (
    <button
        onClick={onClick}
        aria-label="Cerrar"
        className="button-close"
    >
        &times;
    </button>
);

export default ButtonClose;