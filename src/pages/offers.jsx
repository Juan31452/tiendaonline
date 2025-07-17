import useProductLoader from '../hooks/useProductLoader';
import ProductListPage from './ProductListPage';
import Footer from '../components/Footer';

const Offers = () => {
    const { loading, allProducts, filteredProducts, setFilteredProducts } = useProductLoader();

  if (loading) return <div className="text-center py-5">Cargando productos...</div>;

  // Filtro personalizado para productos nuevos
  const filterFn = (product) =>
    ['ofertas'].includes(product.Estado?.toLowerCase());

  // Aplica el filtro y ordena de mayor a menor por IdProducto
  const sortedFiltered = filteredProducts
    .filter(filterFn)
    .sort((a, b) => b.IdProducto - a.IdProducto); // Orden descendente

    return (
        <div className="container mt-4" style={{ paddingTop: '10px' }}>
        <ProductListPage
        title="Nuevos Productos"
        allProducts={allProducts}
        filteredProducts={sortedFiltered} // Usamos el arreglo ordenado
        setFilteredProducts={setFilteredProducts}
        filterFn={filterFn}
        resumenEstados={['ofertas']}

    />
    <Footer />
  </div>  
    );
};

export default Offers;