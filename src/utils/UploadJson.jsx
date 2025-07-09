import React, { useState } from 'react';
import axios from 'axios';
import ApiRoutes from '../api/ApiRoute';
import ProductosTable from '../components/ProductosTable';

const CargarJsonDesdeArchivos = () => {
  const [files, setFiles] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);          // ← ① estado loading

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
    setLoading(true);                                     // ← ② activa loading
    setMensaje('');

    try {
    const { data } = await axios.post(
      ApiRoutes.NewsProductsRemote, // Cambia a ApiRoutes.listproductsLocal si es necesario ',
      productos,                            // payload
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('✅ OK:', data);
    setMensaje(data.mensaje || 'Productos insertados correctamente');
  } catch (error) {
    console.error('❌ Error al enviar:', error);
    const msg = error.response?.data?.error || 'Error al insertar productos';
    setMensaje(msg);
  }
  setFiles([]); // Limpiar archivos después de enviar
  setProductos([]); // Limpiar productos después de enviar
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

      {mensaje && !loading && (
        <p style={{ marginTop: '10px', color: 'green' }}>{mensaje}</p>
      )}
    </div>
  );
};

export default CargarJsonDesdeArchivos;