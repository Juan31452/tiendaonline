import { useState, useEffect, ReactNode } from 'react';
import '../style/AnnouncementBanner.css';

interface AnnouncementBannerProps {
  children: ReactNode;
  icon?: string;
  storageKey?: string; // Opcional, por si decides volver a usarlo en el futuro
}

const AnnouncementBanner = ({ children, icon = "🎉" }: AnnouncementBannerProps) => {
  // Estado para controlar si el banner debe renderizarse.
  const [isVisible, setIsVisible] = useState<boolean>(true);
  // Estado para controlar la animación de cierre.
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // Función para iniciar el proceso de cierre.
  const handleClose = () => {
    setIsClosing(true);

    // Esperamos a que la animación CSS termine (500ms) antes de ocultar el componente.
    const animationTimer = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    return () => clearTimeout(animationTimer);
  };

  // Efecto para cerrar el banner automáticamente después de 1 minuto.
  useEffect(() => {
    if (isVisible && !isClosing) {
      const autoCloseTimer = setTimeout(() => {
        handleClose();
      }, 30000); // 30 segundos

      // Limpiamos el temporizador si el componente se desmonta o se cierra manualmente.
      return () => clearTimeout(autoCloseTimer);
    }
  }, [isVisible, isClosing]);

  if (!isVisible) {
    return null;
  }

  const bannerClasses = `announcement-banner ${isClosing ? 'closing' : ''}`;

  return (
    <div className={bannerClasses}>
      <span className="announcement-icon" role="img" aria-label="announcement">
        {icon}
      </span>
      <div className="announcement-content">{children}</div>
      <button type="button" className="announcement-close-btn" aria-label="Cerrar" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export default AnnouncementBanner;
