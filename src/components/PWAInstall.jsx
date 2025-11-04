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

  // Si la app no se puede instalar, no renderizamos nada.
  if (!canInstall) {
    return null;
  }

  // Si se puede instalar, mostramos el botón.
  return (
    <button className="btn btn-success pwa-install-button" onClick={triggerInstall}>
      📥 Instalar App
    </button>
  );
};

export default PWAInstall;
