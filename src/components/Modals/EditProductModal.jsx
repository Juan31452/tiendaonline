import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

/**
 * Modal para editar un producto
 *
 * Props:
 *  - show (bool)            → visibilidad
 *  - onHide ()              → cerrar sin guardar
 *  - product (obj|null)     → producto a editar
 *  - onSave (obj)           → callback con el objeto actualizado
 */
const EditProductModal = ({ show, onHide, product, onSave }) => {
  // estado local del formulario
  const [form, setForm] = useState({
    IdProducto : '',
    Descripcion: '',
    Imagen     : '', // opcional, si no se edita se deja vacío
    Precio     : 0,
    Color      : '',
    Talla      : '',
    Categoria  : '',
    Cantidad   : 0,
    Estado     : '',
  });

  /* cuando cambia 'product', precarga el form */
  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  /* handler genérico */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /* guardar */
  const handleSubmit = () => {
    onSave(form);   // delega la llamada API al padre
  };

  if (!product) return null; // no renderiza si no hay data

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
                  name="Descripcion"
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
