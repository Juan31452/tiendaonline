// src/hooks/useProductLoader.ts
import { useState, useEffect } from 'react';
import { productImports } from '../data/productImports';
import { Product } from '../types/Producto'; // Asegurate de tener este tipo

interface UseProductLoaderResult {
  loading: boolean;
  error: string | null;
  allProducts: Product[];
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const useProductLoader = (): UseProductLoaderResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Combina todos los productos de las importaciones
        const allImportedProducts: Product[] = Object.values(productImports).flat();
        // Elimina duplicados basados en IdProducto
        const uniqueProducts = Array.from(
          new Map(allImportedProducts.map(product => [product.IdProducto, product])).values()
        );
        setAllProducts(uniqueProducts);
        setFilteredProducts(uniqueProducts);
      } catch (err) {
        console.error(err);
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return {
    loading,
    error,
    allProducts,
    filteredProducts,
    setFilteredProducts,
  };
};

export default useProductLoader;
