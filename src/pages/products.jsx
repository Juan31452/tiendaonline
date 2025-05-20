import { useProductLoader } from '../components/useProductLoader '; 
import ProductListPage from '../components/ProductListPage';

const Products= () => {
const { loading, allProducts, filteredProducts, setFilteredProducts } = useProductLoader();

  if (loading) return <div className="text-center py-5">Cargando productos...</div>;

  const filterFn = (product) =>
    ['separado','vendido'].includes(product.Estado?.toLowerCase());

  return (
    <ProductListPage
      title="Nuestros Productos"
      allProducts={allProducts}
      filteredProducts={filteredProducts}
      setFilteredProducts={setFilteredProducts}
      filterFn={filterFn}
    />
 );
};

export default Products;

