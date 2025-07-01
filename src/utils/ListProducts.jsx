import { useEffect, useState } from 'react';
import ProductosTable from '../components/ProductosTable';
import useListProducts from '../hooks/useListProducts';
import BuscarPorIdproducto from './BuscarPorIdproducto';

const ListProducts = () => {
  const [page, setPage] = useState(1);

  /* Hook personalizado para cargar productos */
  // Este hook maneja la lógica de paginación y estado de carga
  const { productos, pagination, loading, error, fetchPage } =
    useListProducts();

  /* Carga inicial */
  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  /* Navegación */
  const next  = () => page < pagination.totalPages && (fetchPage(page + 1), setPage(page + 1));
  const prev  = () => page > 1 && (fetchPage(page - 1), setPage(page - 1));
  const refresh = () => fetchPage(page);

  /* UI */
  return (
    <div style={{ padding: 20 }}>
      <h2>Productos — página {page}/{pagination.totalPages}</h2>

      {loading && <p>Cargando… ⏳</p>}
      {error   && <p style={{ color: 'crimson' }}>{error}</p>}

      <BuscarPorIdproducto /> {/* Componente para buscar por ID */}

      <ProductosTable productos={productos} />

      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <button onClick={prev}    disabled={loading || page === 1}>⬅︎ Anterior</button>
        <button onClick={next}    disabled={loading || page === pagination.totalPages}>Siguiente ➡︎</button>
        <button onClick={refresh} disabled={loading}>🔄 Refrescar</button>
      </div>

      <p style={{ marginTop: 10 }}>
        Mostrando {productos.length} / {pagination.totalItems} productos
      </p>
    </div>
  );
};

export default ListProducts;
