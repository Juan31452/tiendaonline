import { useState, useEffect } from 'react';
import '../style/AnnouncementBanner.css'; // Asegúrate de que este archivo exista y tenga los estilos.

/**
 * Un banner de anuncios que se puede cerrar y que recuerda su estado en la sesión.
 * @param {object} props
 * @param {React.ReactNode} props.children - El contenido del banner (mensaje).
 * @param {string} props.storageKey - Clave única para guardar el estado en sessionStorage.
 * @param {string} [props.icon="🎉"] - Emoji o ícono para mostrar.
 */
const AnnouncementBanner = ({ children, storageKey, icon = "🎉" }) => {
  // Estado para controlar si el banner debe renderizarse.
  const [isVisible, setIsVisible] = useState(
    sessionStorage.getItem(storageKey) !== 'closed'
  );
  // Estado para controlar la animación de cierre.
  const [isClosing, setIsClosing] = useState(false);

  // Efecto para cerrar el banner automáticamente después de 1 minuto.
  useEffect(() => {
    if (isVisible && !isClosing) {
      const autoCloseTimer = setTimeout(() => {
        handleClose();
      }, 30000); // 30 segundos

      // Limpiamos el temporizador si el componente se desmonta o se cierra manualmente.
      return () => clearTimeout(autoCloseTimer);
    }
  }, [isVisible, isClosing]); // Se ejecuta cuando el banner es visible y no se está cerrando.

  // Función para iniciar el proceso de cierre.
  const handleClose = () => {
    setIsClosing(true);
    sessionStorage.setItem(storageKey, 'closed');

    // Esperamos a que la animación CSS termine (500ms) antes de ocultar el componente.
    const animationTimer = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    return () => clearTimeout(animationTimer);
  };

  // Si el banner no es visible, no renderizamos nada.
  if (!isVisible) {
    return null;
  }

  // Construimos las clases CSS dinámicamente.
  const bannerClasses = `announcement-banner ${isClosing ? 'closing' : ''}`;

  return (
    <div className={bannerClasses}>
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
