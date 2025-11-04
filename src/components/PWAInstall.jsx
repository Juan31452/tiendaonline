import React from 'react';
import usePWAInstall from '../hooks/usePWAInstall';
import '../App.css'; // Importamos los estilos globales donde está .pwa-install-button

/**
 * Componente que muestra un botón para instalar la PWA.
 * El botón solo es visible si la aplicación es instalable y no está ya instalada.
 */
const PWAInstall = () => {
  // Usamos el hook para obtener el estado y la función de instalación
  const { canInstall, triggerInstall } = usePWAInstall();

  // --- Lógica de Depuración ---
  // En modo desarrollo, siempre mostramos el botón para tener feedback visual.
  // En producción, podrías volver a la versión anterior: if (!canInstall) return null;
  const isDevelopment = import.meta.env.MODE === 'development';

  if (!isDevelopment && !canInstall) {
    return null; // En producción, no mostrar nada si no se puede instalar.
  }

  return (
    <button
      className={`btn pwa-install-button ${canInstall ? 'btn-success' : 'btn-secondary'}`}
      onClick={triggerInstall}
      disabled={!canInstall}
      title={canInstall ? 'Instalar la aplicación en tu dispositivo' : 'La aplicación no está lista para ser instalada. (Revisa la consola y la pestaña Application en DevTools)'}
    >
      {canInstall ? '📥 Instalar App' : '⏳ App no instalable'}
    </button>
  );
};

export default PWAInstall;
