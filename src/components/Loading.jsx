import '../style/Loading.css'; // pega el CSS de abajo

/**
 * @param {string}  text        Texto a mostrar (default: "Cargando")
 * @param {boolean} fullScreen  Si true, cubre toda la pantalla
 */
const Loading = ({ text = 'Cargando', fullScreen = false }) => {
  return (
    <div className={fullScreen ? 'loading-overlay' : 'loading-inline'}>
      <div className="loading-spinner" />
      <span className="loading-text">{text}…</span>
    </div>
  );
};

export default Loading;
