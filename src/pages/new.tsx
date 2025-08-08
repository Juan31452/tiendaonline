import React from 'react';
import useProductLoader from '../hooks/useProductLoader';
import ProductListPage from './ProductListPage';
import Footer from '../components/Footer';
import { Product } from '../types/Producto';

const New: React.FC = () => {
  const { loading, allProducts, filteredProducts, setFilteredProducts } = useProductLoader();

  if (loading) return <div className="text-center py-5">Cargando productos...</div>;

  // Filtro personalizado para productos nuevos
  const filterFn = (product: Product): boolean =>
    ['nuevo'].includes(product.Estado?.toLowerCase?.() ?? '');

  // Aplica el filtro y ordena de mayor a menor por IdProducto
  const sortedFiltered: Product[] = filteredProducts
    .filter(filterFn)
    .sort((a, b) => Number(b.IdProducto) - Number(a.IdProducto));

  return (
    <div className="container mt-4" style={{ paddingTop: '10px' }}>
      <ProductListPage
        title="Nuevos Productos"
        allProducts={allProducts}
        filteredProducts={sortedFiltered}
        setFilteredProducts={setFilteredProducts}
        filterFn={filterFn}
        resumenEstados={['Nuevo']}
      />
      <Footer />
    </div>
  );
};

export default New;
