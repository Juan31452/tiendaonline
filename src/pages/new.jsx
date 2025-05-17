import { useProductLoader } from '../components/useProductLoader '; 
import ProductListPage from '../components/ProductListPage';

const New = () => {
 const { loading, allProducts, filteredProducts, setFilteredProducts } = useProductLoader();

  if (loading) return <div className="text-center py-5">Cargando productos...</div>;

  const filterFn = (product) =>
    ['nuevo', 'nuevo ingreso'].includes(product.Estado?.toLowerCase());

  return (
    <ProductListPage
      title="Nuevos Productos"
      allProducts={allProducts}
      filteredProducts={filteredProducts}
      setFilteredProducts={setFilteredProducts}
      filterFn={filterFn}
    />
  );
};

export default New;