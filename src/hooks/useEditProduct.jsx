import { useState, useCallback } from 'react';
import apiAxios from '../api/apiAxios'; // ✅ Importamos la instancia configurada
import ApiRoutes from '../api/ApiRoute';

/**
 * Hook para gestionar edición de productos
 *
 * Devuelve:
 *   productSel  -> producto seleccionado o null
 *   showModal   -> bool (visibilidad)
 *   loading     -> bool (true mientras hace PUT)
 *   error       -> string (error al guardar)
 *   openModal(p)-> abre modal con producto p
 *   closeModal() -> cierra modal
 *   saveChanges(updated, cb) -> PUT y callback cb() al terminar
 */
export default function useEditProduct() {
  /* ---------- estado ---------- */
  const [productSel, setProductSel] = useState(null);
  const [showModal,  setShowModal]  = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');

  /* ---------- abrir / cerrar ---------- */
  const openModal = useCallback((prod) => {
    setProductSel(prod);
    setShowModal(true);
    setError('');
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setProductSel(null);
    setError('');
  }, []);

  /* ---------- guardar cambios ---------- */
  const saveChanges = useCallback(
    async (updatedObj, onDone = () => {}) => {
      setLoading(true);
      setError('');

      try {
        // ✅ Usamos apiAxios para que el token de autorización se envíe automáticamente
        await apiAxios.put(
          `${ApiRoutes.EditarProducto}/${updatedObj.IdProducto}`,
          updatedObj,
          { headers: { 'Content-Type': 'application/json' } }
        );

        onDone();     // refresca la lista o lo que necesites
        closeModal(); // cierra el modal
      } catch (err) {
        console.error('❌ PUT producto:', err);
        setError(err.response?.data?.error || 'Error al guardar');
      } finally {
        setLoading(false);
      }
    },
    [closeModal]
  );

  /* ---------- exporta API del hook ---------- */
  return {
    productSel,
    showModal,
    loading,
    error,
    openModal,
    closeModal,
    saveChanges,
  };
}
