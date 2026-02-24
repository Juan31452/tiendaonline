import { useState, useCallback } from 'react';

/**
 * Interfaz para el producto
 */
interface Product {
  IdProducto: string;
  Descripcion: string;
  Imagen: string;
  Precio: number;
  Color: string;
  Talla: string;
  Categoria: string;
  Cantidad: number;
  Estado: string;
}

/**
 * Interfaz para el retorno del hook
 */
interface UseProductModalReturn {
  isModalOpen: boolean;
  selectedProduct: Product | null;
  openModal: (product: Product) => void;
  closeModal: () => void;
}

/**
 * Hook personalizado para manejar el estado del modal de productos
 */
const useProductModal = (): UseProductModalReturn => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = useCallback((product: Product): void => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback((): void => {
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
