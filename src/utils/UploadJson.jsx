import React, { useState } from 'react';
import axios from 'axios';

const CargarJsonDesdeArchivos = () => {
  const [files, setFiles] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');

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
    try {
    const { data } = await axios.post(
      'http://localhost:4000/api/productos/crear-multiples',
      productos,                            // payload
      { headers: { 'Content-Type': 'application/json' } }
    );

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

      {productos.length > 0 && (
        <>
          <h3>Productos cargados:</h3>
          <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>IdProducto</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Color</th>
                <th>Talla</th>
                <th>Categoria</th>
                <th>Cantidad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p, i) => (
                <tr key={i}>
                  <td>{p.IdProducto}</td>
                  <td>{p.Descripcion}</td>
                  <td>{p.Precio}</td>
                  <td>{p.Color}</td>
                  <td>{p.Talla}</td>
                  <td>{p.Categoria}</td>
                  <td>{p.Cantidad}</td>
                  <td>{p.Estado}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={enviarProductos} style={{ marginTop: '20px', padding: '10px 20px' }}>
            Enviar al backend
          </button>
        </>
      )}

      {mensaje && <p style={{ marginTop: '10px', color: 'green' }}>{mensaje}</p>}
    </div>
  );
};

export default CargarJsonDesdeArchivos;
