import useProductLoader from '../hooks/useProductLoader';
import ProductListPage from './ProductListPage';
import WhatsAppFloatingButton from '../components/Buttons/WhatsAppFloatingButton';

const Products= () => {
const { loading, allProducts, filteredProducts, setFilteredProducts } = useProductLoader();

  if (loading) return <div className="text-center py-5">Cargando productos...</div>;

  const filterFn = (product) =>
    ['separado','vendido'].includes(product.Estado?.toLowerCase());

  return (
    <div>
      <ProductListPage
        title="Productos Fuera de Stock"
        allProducts={allProducts}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        filterFn={filterFn}
        resumenEstados={['separado', 'vendido']}

      />

      <WhatsAppFloatingButton 
          phone="34622229467" 
          message="¡Hola! Estoy interesado en un producto de tu tienda." 
        />
    </div> 
 );
};

export default Products;

