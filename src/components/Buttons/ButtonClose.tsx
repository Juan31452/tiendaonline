import React, { useState } from 'react';

interface ButtonCloseProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            aria-label="Cerrar"
            className="button-close"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ color: isHovered ? 'crimson' : undefined }}
        >
            &times;
        </button>
    );
};

export default ButtonClose;
