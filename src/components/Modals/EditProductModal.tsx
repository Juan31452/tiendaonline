import { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { CategoryId,EstadoProducto } from '../Types'; 

// Estado del producto como enum
//export type EstadoProducto = 'Disponible' | 'Vendido' | 'Separado' | 'Oferta';

interface ProductForm {
  IdProducto: string;
  Descripcion: string;
  Imagen: string;
  Precio: number;
  Color: string;
  Talla: string;
  Categoria: CategoryId;
  Cantidad: number;
  Estado: EstadoProducto;
}

interface EditProductModalProps {
  show: boolean;
  onHide: () => void;
  product: ProductForm | null;
  onSave: (product: ProductForm) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  show,
  onHide,
  product,
  onSave,
}) => {
  const [form, setForm] = useState<ProductForm>({
    IdProducto: '',
    Descripcion: '',
    Imagen: '',
    Precio: 0,
    Color: '',
    Talla: '',
    Categoria: 'Hombre',
    Cantidad: 0,
    Estado: 'Disponible',
  });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'Precio' || name === 'Cantidad') {
      setForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
                <Form.Select
                  name="Categoria"
                  value={form.Categoria}
                  onChange={handleChange}
                >
                  {(['Hombre', 'Mujer', 'Niños', 'Tecnología', 'Hogar', 'Variedades'] as CategoryId[]).map(
                    (cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    )
                  )}
                </Form.Select>
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
                  {(['Disponible', 'Vendido', 'Separado', 'Oferta'] as EstadoProducto[]).map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
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

