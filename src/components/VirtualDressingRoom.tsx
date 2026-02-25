import { FC, useState, useMemo } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Product } from './types';
import '../style/VirtualDressingRoom.css';

interface VirtualDressingRoomProps {
  show: boolean;
  onHide: () => void;
  products: Product[];
}

const VirtualDressingRoom: FC<VirtualDressingRoomProps> = ({ show, onHide, products }) => {
  const [selectedShirt, setSelectedShirt] = useState<Product | null>(null);
  const [selectedPants, setSelectedPants] = useState<Product | null>(null);

  // Imagen base de una silueta masculina (puedes cambiarla por una imagen local en tu carpeta public)
  const MANNEQUIN_IMG = '/assets/pictures/silueta_hombre.png'; 

  // 1. Filtramos los productos disponibles para el probador
  // Nota: Esto depende de cómo nombres tus productos en la descripción o categoría
  const { shirts, pants } = useMemo(() => {
    // Filtramos explícitamente por la categoría 'Hombre' para que coincida con la silueta
    const prendas = (products || []).filter(p => p.Categoria === 'Hombre');
    
    return {
      shirts: prendas.filter(p => {
        const desc = (p.Descripcion || '').toLowerCase();
        return desc.includes('camisa') || desc.includes('camiseta') || desc.includes('sudadera') || desc.includes('polo') || desc.includes('chaqueta') || desc.includes('chaleco');
      }),
      pants: prendas.filter(p => {
        const desc = (p.Descripcion || '').toLowerCase();
        return desc.includes('pantalón') || desc.includes('jeans') || desc.includes('short') || desc.includes('jogger') || desc.includes('bermuda');
      })
    };
  }, [products]);

  const handleReset = () => {
    setSelectedShirt(null);
    setSelectedPants(null);
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>👔 Probador Virtual (Beta)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="dressing-room-container">
          
          {/* ZONA DEL MODELO */}
          <div className="model-area">
            <div className="mannequin-wrapper">
              {/* Capa 1: El Maniquí Base */}
              <img 
                src={MANNEQUIN_IMG} 
                alt="Modelo Base" 
                className="layer-image layer-base" 
              />

              {/* Capa 2: Pantalones */}
              {selectedPants && (
                <img 
                  src={selectedPants.Imagen} 
                  alt="Pantalones seleccionados" 
                  className="layer-image layer-pants" 
                />
              )}

              {/* Capa 3: Camisas (van encima de los pantalones usualmente) */}
              {selectedShirt && (
                <img 
                  src={selectedShirt.Imagen} 
                  alt="Camisa seleccionada" 
                  className="layer-image layer-shirt" 
                />
              )}
            </div>
          </div>

          {/* ZONA DE SELECCIÓN */}
          <div className="controls-area">
            <div className="alert alert-info py-2">
              <small>💡 Selecciona prendas para ver cómo combinan los colores.</small>
            </div>

            {/* Selector de Camisas */}
            <div className="selector-section">
              <h5>Partes de Arriba ({shirts.length})</h5>
              {shirts.length === 0 && <p className="text-muted small">No se encontraron prendas superiores en esta página.</p>}
              <div className="items-grid">
                {shirts.map(product => (
                  <img 
                    key={product.IdProducto}
                    src={product.Imagen}
                    alt={product.Descripcion}
                    className={`img-fluid item-thumb ${selectedShirt?.IdProducto === product.IdProducto ? 'selected' : ''}`}
                    onClick={() => setSelectedShirt(product)}
                    title={product.Descripcion}
                  />
                ))}
              </div>
            </div>

            {/* Selector de Pantalones */}
            <div className="selector-section mt-3">
              <h5>Partes de Abajo ({pants.length})</h5>
              {pants.length === 0 && <p className="text-muted small">No se encontraron prendas inferiores en esta página.</p>}
              <div className="items-grid">
                {pants.map(product => (
                  <img 
                    key={product.IdProducto}
                    src={product.Imagen}
                    alt={product.Descripcion}
                    className={`img-fluid item-thumb ${selectedPants?.IdProducto === product.IdProducto ? 'selected' : ''}`}
                    onClick={() => setSelectedPants(product)}
                    title={product.Descripcion}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleReset}>
          Limpiar Todo
        </Button>
        <Button variant="primary" onClick={onHide}>
          Cerrar Probador
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VirtualDressingRoom;