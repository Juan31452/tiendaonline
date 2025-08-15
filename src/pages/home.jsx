import useProductLoader from '../hooks/useProductLoader';
import ProductListPage from './ProductListPage';
import Newmessages from '../components/newmessages';
import Footer from '../components/Footer';

const Home = () => {
  const { loading, allProducts, filteredProducts, setFilteredProducts } = useProductLoader();

  if (loading) return <div className="text-center py-5">Cargando productos...</div>;

  const filterFn = (product) =>
    ['disponible'].includes(product.Estado?.toLowerCase());

// Calcular cuántos nuevos hay
  const nuevosCount = allProducts.filter(
    (p) => p.Estado?.trim().toLowerCase() === 'nuevo'
  ).length;

 
  return (
    <div className="container pt-3" style={{ paddingTop: '4px' }}>
       <Newmessages cantidad={nuevosCount} />

      <ProductListPage
        title="Nuestros Productos"
        allProducts={allProducts}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        filterFn={filterFn}
        resumenEstados={['disponible']}
      />

      <Footer />
    </div>
  );
};

export default Home;
