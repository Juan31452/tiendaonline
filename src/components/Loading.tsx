import React from 'react';
import '../style/Loading.css';

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ text = 'Cargando', fullScreen = false }) => {
  return (
    <div className={fullScreen ? 'loading-overlay' : 'loading-inline'}>
      <div className="loading-spinner" />
      <span className="loading-text">{text}…</span>
    </div>
  );
};

export default Loading;
