import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProductosTable from '../components/ProductosTable';
import ApiRoutes from '../api/ApiRoute';

const ListProducts = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Función reutilizable para pedir datos via axios
  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      // 👇 Todo con axios
      const { data } = await axios.get(ApiRoutes.listproductsRemote, {
        headers: { 'Accept': 'application/json' },
        // Si necesitas token:
        // headers: { 'Authorization': `Bearer ${token}` }
      });

      // Asume que `data` ES el array de productos
      setProductos(data);
      console.log('✅ Productos obtenidos:', data);
    } catch (err) {
      console.error('❌ Error al obtener productos:', err);
      const msg =
        err.response?.data?.error || 'No se pudieron cargar los productos';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial
  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista completa de productos</h2>

      {loading && <p>Cargando… ⏳</p>}
      {error && !loading && (
        <p style={{ color: 'crimson' }}>{error}</p>
      )}

      <ProductosTable productos={productos} />

      {/* Botón para volver a llamar a axios */}
      <button
        onClick={fetchProductos}
        style={{ marginTop: '20px', padding: '8px 16px' }}
        disabled={loading}
      >
        🔄 {loading ? 'Actualizando…' : 'Recargar con axios'}
      </button>
    </div>
  );
};

export default ListProducts;
