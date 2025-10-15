import { useState } from 'react';
import '../style/AnnouncementBanner.css';

/**
 * Un banner de anuncios que se puede cerrar y que recuerda su estado en la sesión.
 * @param {object} props
 * @param {React.ReactNode} props.children - El contenido del banner (mensaje).
 * @param {string} props.storageKey - Clave única para guardar el estado en sessionStorage.
 * @param {string} [props.icon="🎉"] - Emoji o ícono para mostrar.
 */
const AnnouncementBanner = ({ children, storageKey, icon = "🎉" }) => {
  // El estado `show` se inicializa basado en sessionStorage para recordar si se cerró.
  const [show, setShow] = useState(
    sessionStorage.getItem(storageKey) !== 'closed'
  );

  // Si el banner no se debe mostrar, no renderizamos nada.
  if (!show) {
    return null;
  }

  // Función para cerrar el banner y guardar el estado.
  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem(storageKey, 'closed');
  };

  return (
    <div className="announcement-banner">
      <span className="announcement-icon" role="img" aria-label="announcement">
        {icon}
      </span>
      <div className="announcement-content">
        {children}
      </div>
      <button
        type="button"
        className="announcement-close-btn"
        aria-label="Cerrar"
        onClick={handleClose}
      >
        &times;
      </button>
    </div>
  );
};

export default AnnouncementBanner;
