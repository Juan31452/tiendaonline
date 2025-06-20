// src/components/useProductLoader.js
import { useState, useEffect } from 'react';
import { productImports } from './productImports'; 

const useProductLoader = () => {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Combina y elimina duplicados
        const combinedProducts = Object.values(productImports).flat();
        const uniqueProducts = Array.from(
          new Map(combinedProducts.map(product => [product.IdProducto, product])).values()
        );

        setAllProducts(uniqueProducts);
        setFilteredProducts(uniqueProducts);
      } catch (err) {
        setError("Error al cargar productos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Expone los estados y funciones que necesites
  return {
    loading,
    allProducts,
    filteredProducts,
    error,
    setFilteredProducts // Para permitir filtrados adicionales
  };
};


export default useProductLoader;