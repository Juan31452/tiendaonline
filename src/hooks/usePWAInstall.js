import { useState, useEffect, useCallback } from 'react';

const usePWAInstall = () => {
  const [isStandalone, setIsStandalone] = useState(
    () => window.matchMedia('(display-mode: standalone)').matches
  );

  console.log(`[PWA Debug] ¿Standalone inicial? -> ${isStandalone}`);

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const canInstall = !!deferredPrompt && !isStandalone;

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('[PWA Debug] Evento "beforeinstallprompt" capturado.');
    };

    const handleAppInstalled = () => {
      console.log('[PWA Debug] PWA instalada con éxito.');
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    console.log(`[PWA Debug] canInstall actualizado -> ${canInstall}`);
  }, [canInstall]);

  const triggerInstall = useCallback(async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Muestra el diálogo de instalación
      // Espera a que el usuario responda al diálogo
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`[PWA Debug] El usuario ha ${outcome === 'accepted' ? 'aceptado' : 'rechazado'} la instalación.`);
      // Limpiamos el deferredPrompt ya que solo se puede usar una vez.
      // Si el usuario lo rechaza, el evento 'beforeinstallprompt' se volverá a disparar en el futuro.
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  return { canInstall, isStandalone, triggerInstall };
};

export default usePWAInstall;
