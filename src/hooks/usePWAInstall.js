import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para gestionar la instalación de la PWA (Add to Home Screen).
 *
 * @returns {object} - Un objeto con:
 *   - `canInstall`: Booleano que indica si la app se puede instalar.
 *   - `isStandalone`: Booleano que indica si la app ya se está ejecutando en modo standalone.
 *   - `triggerInstall`: Función para iniciar el aviso de instalación.
 */
const usePWAInstall = () => {
  // `isStandalone` comprueba si la app se abrió desde el icono de la pantalla de inicio.
  const [isStandalone, setIsStandalone] = useState(
    () => window.matchMedia('(display-mode: standalone)').matches
  );

  // `deferredPrompt` almacenará el evento que nos permite mostrar el aviso.
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // `canInstall` será true si podemos mostrar el aviso y la app no es standalone.
  const canInstall = !!deferredPrompt && !isStandalone;

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevenimos que el navegador muestre su propio aviso automáticamente.
      e.preventDefault();
      // Guardamos el evento para poder usarlo más tarde.
      setDeferredPrompt(e);
      console.log('Evento "beforeinstallprompt" capturado.');
    };

    // Escuchamos el evento que nos permite mostrar el aviso de instalación.
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Escuchamos el evento que se dispara después de que el usuario instala la app.
    window.addEventListener('appinstalled', () => {
      console.log('PWA instalada con éxito.');
      // Limpiamos el prompt porque ya no es necesario.
      setDeferredPrompt(null);
      setIsStandalone(true);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const triggerInstall = useCallback(async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Mostramos el aviso de instalación.
    }
  }, [deferredPrompt]);

  return { canInstall, isStandalone, triggerInstall };
};

export default usePWAInstall;
