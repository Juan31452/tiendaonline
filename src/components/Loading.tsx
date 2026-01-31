import '../style/Loading.css';

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

const Loading = ({ text = 'Cargando', fullScreen = false }: LoadingProps) => {
  return (
    <div className={fullScreen ? 'loading-overlay' : 'loading-inline'}>
      <div className="loading-spinner" />
      <span className="loading-text">{text}…</span>
    </div>
  );
};

export default Loading;
