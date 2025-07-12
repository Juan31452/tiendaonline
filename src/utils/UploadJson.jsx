import React, { useState } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';
import ProductosTable from '../components/ProductosTable';
import ModalMensaje from '../components/Modals/ModalMensaje';

const CargarJsonDesdeArchivos = () => {
  const [files, setFiles] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);          // ← ① estado loading
  const [mostrarModal, setMostrarModal] = useState(false);

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

  setLoading(true);
  setMensaje('');

  try {
    console.log('📦 Productos a enviar:', productos);

    const { data } = await axios.post(
      ApiRoutes.NewsProductsRemote,
      productos, // 👈 ENVÍA ARRAY DIRECTO
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
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