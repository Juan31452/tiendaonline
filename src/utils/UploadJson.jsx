import React, { useState, useContext } from 'react';
import apiAxios from '../api/apiAxios'; // ✅ Usamos la instancia centralizada de Axios
import ApiRoutes from '../api/ApiRoute';
import ProductosTable from '../components/ProductosTable';
import ModalMensaje from '../components/Modals/ModalMensaje';
import { AuthContext } from '../components/Context/AuthContext';

const CargarJsonDesdeArchivos = () => {
  const { role } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);          // ← ① estado loading
  const [mostrarModal, setMostrarModal] = useState(false);
  const [vendedorId, setVendedorId] = useState('');

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
   

    setFiles(selectedFiles);
    console.log('Archivos seleccionados:', files);
    const allProductos = [];

    for (const file of selectedFiles) {
      if (file.type === 'application/json') {
        const content = await file.text();

        try {
          const data = JSON.parse(content);

          if (Array.isArray(data)) {
            allProductos.push(...data);
          } else {
            console.warn(`⚠️ ${file.name} no contiene un array. Ignorado.`);
          }
        } catch (err) {
          console.error(`❌ Error al parsear ${file.name}:`, err.message);
        }
      }
    }

    setProductos(allProductos);
  };

  const enviarProductos = async () => {
  if (productos.length === 0) {
    setMensaje('No hay productos para enviar');
    return;
  }

  // Validación para admin: si no hay ID en el input y los productos no lo traen en el JSON
  if (role === 'admin' && !vendedorId) {
    const algunSinVendedor = productos.some(p => !p.vendedor);
    if (algunSinVendedor) {
      setMensaje('Como administrador, debes especificar un ID de vendedor para asignar a los productos.');
      setMostrarModal(true);
      return;
    }
  }

  setLoading(true);
  setMensaje('');

  try {
    // Si es admin y especificó un ID, lo asignamos a todos los productos
    const productosAEnviar = (role === 'admin' && vendedorId)
      ? productos.map(p => ({ ...p, vendedor: vendedorId }))
      : productos;

    console.log('📦 Productos a enviar:', productosAEnviar);

    // Usamos apiAxios, que ya incluye el token y la configuración base
    const { data } = await apiAxios.post(
      ApiRoutes.NewsProductsRemote,
      productosAEnviar // 👈 ENVÍA ARRAY (posiblemente modificado con el vendedor)
    );

    console.log('✅ OK:', data);
    setMensaje(data.mensaje || 'Productos insertados correctamente');
    setMostrarModal(true); // 🎉 mostrar modal
    //setFiles([]);
    //setProductos([]);
  } catch (error) {
    console.error('❌ Error al enviar:', error);
    setMostrarModal(true); // 🎉 mostrar modal
    const msg =
      error.response?.data?.error || 'Error al insertar productos';
    setMensaje(msg);
  }

  setLoading(false);
};

  return (
<div style={{ padding: '20px' }}>
      <h2>Subir archivos JSON de productos</h2>

      {/* Campo para asignar vendedor (Solo visible para Admin) */}
      {role === 'admin' && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Asignar Vendedor (ID):
          </label>
          <input
            type="text"
            value={vendedorId}
            onChange={(e) => setVendedorId(e.target.value)}
            placeholder="Ingresa el ID del vendedor para estos productos"
            style={{ padding: '8px', width: '100%', maxWidth: '400px' }}
          />
        </div>
      )}

      <input
        type="file"
        multiple
        accept=".json"
        onChange={handleFileChange}
      />

      {/* 🪄  nuevo componente table */}
      <ProductosTable productos={productos} />

      {productos.length > 0 && (
        <button
          onClick={enviarProductos}
          style={{ marginTop: '20px', padding: '10px 20px' }}
        >
          {loading ? 'Enviando…' : 'Enviar al backend'}
        </button>
      )}

      {loading && <p style={{ marginTop: '10px' }}>Procesando… 🚀</p>}

      {mostrarModal && (
        <ModalMensaje
          mensaje={mensaje}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
};

export default CargarJsonDesdeArchivos;