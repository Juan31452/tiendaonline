import { useState, useCallback } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';
import { Product } from '../components/Types'; // Ajusta esta ruta según dónde esté tu tipo

/**
 * Hook para gestionar edición de productos
 */
export default function useEditProduct() {
  /* ---------- estado ---------- */
  const [productSel, setProductSel] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /* ---------- abrir / cerrar ---------- */
  const openModal = useCallback((prod: Product) => {
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
    async (updatedObj: Product, onDone: () => void = () => {}) => {
      setLoading(true);
      setError('');

      try {
        await axios.put(
          `${ApiRoutes.EditarProducto}/${updatedObj.IdProducto}`,
          updatedObj,
          { headers: { 'Content-Type': 'application/json' } }
        );

        onDone();     // refresca la lista
        closeModal(); // cierra el modal
      } catch (err: any) {
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
