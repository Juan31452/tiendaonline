// src/views/ProductListView.jsx
import useListProducts from '../hooks/useListProducts';
import Pagination from '../components/Pagination'; // ⬅️ tu componente original
import { useEffect, useState } from 'react';

const ProductListView = () => {
  const { productos, pagination, loading, error, fetchPage } = useListProducts();
  const [currentPage, setCurrentPage] = useState(1);

  // Cargar datos cuando cambia la página
  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage, fetchPage]);

  if (loading) return <p>Cargando...</p>;
  if (error)   return <p>❌ Error: {error}</p>;

  return (
    <div className="container mt-4" style={{ paddingTop: '80px' }}>
      
      <Pagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}   // ⬅️ actualiza local y dispara fetch
      />

       <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
         {JSON.stringify(productos, null, 2)}
       </pre>

      {/* Paginación con tu propio componente */}
      <Pagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}   // ⬅️ actualiza local y dispara fetch
      />
    </div>
  );
};

export default ProductListView;
