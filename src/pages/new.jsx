import { useProductLoader } from '../components/useProductLoader '; 
import ProductListPage from '../components/ProductListPage';

const New = () => {
  const { loading, allProducts, filteredProducts, setFilteredProducts } = useProductLoader();

  if (loading) return <div className="text-center py-5">Cargando productos...</div>;

  // Filtro personalizado para productos nuevos
  const filterFn = (product) =>
    ['nuevo', 'nuevo ingreso'].includes(product.Estado?.toLowerCase());

  // Aplica el filtro y ordena de mayor a menor por IdProducto
  const sortedFiltered = filteredProducts
    .filter(filterFn)
    .sort((a, b) => b.IdProducto - a.IdProducto); // Orden descendente

  return (
    <ProductListPage
      title="Nuevos Productos"
      allProducts={allProducts}
      filteredProducts={sortedFiltered} // Usamos el arreglo ordenado
      setFilteredProducts={setFilteredProducts}
      filterFn={filterFn}
    />
  );
};

export default New;