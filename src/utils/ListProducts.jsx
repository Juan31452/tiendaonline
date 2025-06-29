import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProductosTable from '../components/ProductosTable';
import ApiRoutes from '../api/ApiRoute';
import BuscarPorIdproducto from './BuscarporIdproducto';
import toArray from './toArray'; // Normaliza la respuesta a un array

const ListProducts = () => {
  const [productos, setProductos] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, totalItems: 0 });
  const [page, setPage] = useState(1);          // ← página actual
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /** GET con page param -------------------------------------- */
  const fetchProductos = useCallback(async (pagina = 1) => {
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.get(ApiRoutes.listproductsRemote, {
        params : { page: pagina },               // 👈 asume `?page=N`
        headers: { Accept: 'application/json' },
      });

       setProductos(toArray(data));                // ← aquí
       setPagination(data.pagination ?? { totalPages: 1, totalItems: data.length });
       setPage(pagina);
    } catch (err) {
      console.error('❌ GET productos:', err);
      setError(err.response?.data?.error || 'No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  }, []);

  /** Carga inicial ------------------------------------------- */
  useEffect(() => { fetchProductos(1); }, [fetchProductos]);

  /* Handlers de paginado ------------------------------------- */
  const nextPage     = () => page < pagination.totalPages && fetchProductos(page + 1);
  const previousPage = () => page > 1 && fetchProductos(page - 1);

  /* Render --------------------------------------------------- */
  return (
    <div style={{ padding: 50 }}>
      <h2>Lista de productos (página {page} / {pagination.totalPages})</h2>

      {loading && <p>Cargando… ⏳</p>}
      {error   && <p style={{ color: 'crimson' }}>{error}</p>}
    
      <BuscarPorIdproducto /> {/* Componente para buscar por ID */}

      {/* Tabla de productos */}
      <ProductosTable productos={productos} />

      {/* Navegación */}
      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <button onClick={previousPage} disabled={loading || page === 1}>⬅︎ Anterior</button>
        <button onClick={nextPage}     disabled={loading || page === pagination.totalPages}>Siguiente ➡︎</button>
        <button onClick={() => fetchProductos(page)} disabled={loading}>🔄 Refrescar</button>
      </div>

      <p style={{ marginTop: 10 }}>
        Mostrando {productos.length} de {pagination.totalItems} productos
      </p>
    </div>
  );
};

export default ListProducts;
