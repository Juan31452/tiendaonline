// src/hooks/useProductModal.js
import { useState, useCallback } from 'react';

export const useProductModal = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback((product) => {
    setSelectedProduct(product);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    // Opcional: podrías esperar a que la animación termine para limpiar el producto
    // setTimeout(() => setSelectedProduct(null), 300);
    setSelectedProduct(null);
  }, []);

  return {
    selectedProduct,
    showModal,
    openModal,
    closeModal,
  };
};
