// components/EstadoResumen.jsx
const EstadoResumen = ({ products, estados = [] }) => {
  const contarPorEstado = (estado) =>
    products.filter(
      (product) => product.Estado?.toLowerCase() === estado.toLowerCase()
    ).length;

  return (
    <div  className="d-flex justify-content-center flex-wrap gap-3 text-muted mb-4">
      {estados.map((estado) => (
        <p className="mb-1" key={estado}>
          {estado.charAt(0).toUpperCase() + estado.slice(1)}:{' '}
          <strong>{contarPorEstado(estado)}</strong>
        </p>
      ))}
    </div>
  );
};

export default EstadoResumen;

