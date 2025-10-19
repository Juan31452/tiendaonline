import { useState } from 'react';
import apiAxios from '../api/apiAxios';
import ApiRoutes from '../api/ApiRoute';
import toArray from '../utils/toArray';

const useBuscarProductoPorId = () => {
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  const buscarProducto = async (id) => {
    if (!id.trim()) return;

    setLoading(true);
    setError('');
    setResultado(null);

    try {
      // Usamos apiAxios, que ya incluye el token y la URL base
      const { data } = await apiAxios.get(
        `${ApiRoutes.BuscarporId}/${id.trim()}`
      );
      const arr = toArray(data);
      const obj = arr[0] ?? null;

      if (obj) {
        setResultado(obj);
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
    buscarProducto,
    resetResultado: () => setResultado(null),
  };
};

export default useBuscarProductoPorId;
