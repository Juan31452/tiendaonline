// src/hooks/useProductModal.js
import { useState, useCallback } from 'react';

const useProductModal = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Opcional: podrías esperar a que la animación termine para limpiar el producto
    // setTimeout(() => setSelectedProduct(null), 300);
    setSelectedProduct(null);
  }, []);

  return {
    isModalOpen,
    selectedProduct,
    openModal,
    closeModal,
  };
};

export default useProductModal;
