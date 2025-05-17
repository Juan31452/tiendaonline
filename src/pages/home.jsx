import { useProductLoader } from '../components/useProductLoader '; 
import ProductListPage from '../components/ProductListPage';

const Home = () => {
const { loading, allProducts, filteredProducts, setFilteredProducts } = useProductLoader();

  if (loading) return <div className="text-center py-5">Cargando productos...</div>;

  const filterFn = (product) =>
    ['disponible'].includes(product.Estado?.toLowerCase());

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

export default Home;