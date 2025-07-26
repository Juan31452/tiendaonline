import { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Button, Form, Row, Col, FormControlProps } from 'react-bootstrap';

interface ProductForm {
  IdProducto: string;
  Descripcion: string;
  Imagen: string;
  Precio: number;
  Color: string;
  Talla: string;
  Categoria: string;
  Cantidad: number;
  Estado: string;
}

interface EditProductModalProps {
  show: boolean;
  onHide: () => void;
  product: ProductForm | null;
  onSave: (product: ProductForm) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ show, onHide, product, onSave }) => {
  const [form, setForm] = useState<ProductForm>({
    IdProducto: '',
    Descripcion: '',
    Imagen: '',
    Precio: 0,
    Color: '',
    Talla: '',
    Categoria: '',
    Cantidad: 0,
    Estado: '',
  });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'Precio' || name === 'Cantidad' ? Number(value) : value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar producto {product.IdProducto}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row className="mb-2">
            <Col>
              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  name="Descripcion"
                  value={form.Descripcion}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <Form.Group>
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  name="Imagen"
                  value={form.Imagen}
                  onChange={handleChange}
                  placeholder="URL de la imagen (opcional)"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  name="Precio"
                  type="number"
                  value={form.Precio}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  name="Cantidad"
                  type="number"
                  value={form.Cantidad}
                  onChange={handleChange}
                  min="0"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Color</Form.Label>
                <Form.Control
                  name="Color"
                  value={form.Color}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Talla</Form.Label>
                <Form.Control
                  name="Talla"
                  value={form.Talla}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  name="Categoria"
                  value={form.Categoria}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="Estado"
                  value={form.Estado}
                  onChange={handleChange}
                >
                  <option value="">-- Selecciona --</option>
                  <option value="Disponible">Disponible</option>
                  <option value="Vendido">Vendido</option>
                  <option value="Separado">Separado</option>
                  <option value="Oferta">Oferta</option>
                  {/* añade más estados si los usas */}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
