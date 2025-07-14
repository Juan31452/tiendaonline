import { useState } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';
import toArray from '../utils/toArray';

const useBuscarProductoPorId = () => {
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [showModal, setShowModal] = useState(false);

  const buscarProducto = async (id) => {
    if (!id.trim()) return;

    setLoading(true);
    setError('');
    setResultado(null);

    try {
      const { data } = await axios.get(`${ApiRoutes.BuscarporId}/${id.trim()}`);
      const arr = toArray(data);
      const obj = arr[0] ?? null;

      if (obj) {
        setResultado(obj);
        setShowModal(true);
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

  return {
    resultado,
    loading,
    error,
    showModal,
    buscarProducto,
    cerrarModal: () => setShowModal(false),
  };
};

export default useBuscarProductoPorId;
