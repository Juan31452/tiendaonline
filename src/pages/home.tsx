// components/Home.tsx
import React from 'react';
import useProductLoader from '../hooks/useProductLoader';
import ProductListPage from './ProductListPage';
import Footer from '../components/Footer';

import { Product } from '../types/Producto';

const Home: React.FC = () => {
  const { loading, allProducts, filteredProducts, setFilteredProducts } = useProductLoader();

  if (loading) return <div className="text-center py-5">Cargando productos...</div>;

  const filterFn = (product: Product): boolean =>
  ['disponible'].includes(product.Estado?.toLowerCase?.() ?? '');

  return (
    <div className="container pt-3" style={{ paddingTop: '4px' }}>
      <ProductListPage
        title="Nuestros Productos"
        allProducts={allProducts}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        filterFn={filterFn}
        resumenEstados={['Disponible']}
      />

      <Footer
        message={`© ${new Date().getFullYear()} Variedades JM. Imágenes de productos cortesía de nuestros proveedores. Todos los derechos pertenecen a sus respectivas marcas.`}
      />
    </div>
  );
};

export default Home;
