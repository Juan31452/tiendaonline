import { useState } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';
import toArray from '../utils/toArray';
import ModalDetalles from '../components/Modals/ModalDetalles';

const BuscarPorIdproducto = () => {
  const [id, setId]             = useState('');
  const [resultado, setResultado] = useState(null);   // ← objeto o null
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleBuscar = async () => {
    if (!id.trim()) return;

    setLoading(true);
    setError('');
    setResultado(null);

    try {
      const { data } = await axios.get(`${ApiRoutes.BuscarporId}/${id.trim()}`);

      const arr = toArray(data);        // → siempre array
      const obj = arr[0] ?? null;       // primer elemento o null

      if (obj) {
        setResultado(obj);
        setShowModal(true);             // 👈 abre modal
        console.log('✅ Producto encontrado:', obj);
      } else {
        setError('Producto no encontrado');
      }
    } catch (err) {
      console.error('❌ Buscar por ID:', err);
      setError(err.response?.data?.error || 'Producto no encontrado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <h3>Buscar producto por ID</h3>

      <input
        type="text"
        placeholder="Ej: 1.1"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ padding: 6, marginRight: 8 }}
      />
      <button onClick={handleBuscar} disabled={loading}>
        🔍 {loading ? 'Buscando…' : 'Buscar'}
      </button>

      {error && <p style={{ color: 'crimson', marginTop: 10 }}>{error}</p>}

      {/* Modal solo si hay producto */}
      {resultado && (
        <ModalDetalles
          product={resultado}           // objeto único
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default BuscarPorIdproducto;
