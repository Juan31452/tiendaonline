import React, { useContext, useState} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/Context/AuthContext';
import '../style/navBar.css';
const NavBar = () => {
  const { isAuthenticated,role,name, logout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

 console.log("Renderizando NavBar - isAuthenticated:", isAuthenticated, "role:", role, "name:", name);
 
  const handleLogout = () => {
    logout(); // esto limpia token y rol, y actualiza estado
    setExpanded(false); // opcional: cerrar navbar en móvil
  };

  return (
<Navbar
  expanded={expanded}
  onToggle={() => setExpanded(!expanded)}
  collapseOnSelect
  expand="lg"
  bg="light"
  variant="light"
  fixed="top"
  style={{ zIndex: 1030, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
>
  <Container fluid className="d-flex align-items-center">
    {/* Título + nombre */}
    <div className="d-flex align-items-center me-4">
      <Navbar.Brand as={Link} to="/">Variedades JM</Navbar.Brand>
      {isAuthenticated && name && (
        <span className="text-dark fw-bold ms-3">Hola, {name}!</span>
      )}
    </div>

    {/* Menú */}
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto" onSelect={() => setExpanded(false)}>
        <Nav.Link as={Link} to="/">Inicio</Nav.Link>

        {isAuthenticated && role === 'admin' && (
          <>
            <Nav.Link as={Link} to="/products">Productos</Nav.Link>
            <Nav.Link as={Link} to="/uploadimage">Nuevas Imágenes</Nav.Link>
            <Nav.Link as={Link} to="/uploadjson">Nuevos JSON</Nav.Link>
            <Nav.Link as={Link} to="/listproducts">Listar Productos</Nav.Link>
          </>
        )}

        {isAuthenticated && ['admin','vendedor'].includes(role) && (
          <Nav.Link as={Link} to="/verproductos">Backend</Nav.Link>
        )}

        <Nav.Link as={Link} to="/offers">Ofertas</Nav.Link>
        <Nav.Link as={Link} to="/new">Nuevos</Nav.Link>

        {!isAuthenticated ? (
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        ) : (
          <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
};

export default NavBar;
