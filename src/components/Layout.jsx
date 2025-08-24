import React, { useContext, useState} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/Context/AuthContext';
import '../style/navBar.css';

const NavBar = () => {
  const { isAuthenticated, name, role, logout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const handleClose = () => setExpanded(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

    console.log("Nombre desde contexto:", name);

  return (
    <Navbar
  expanded={expanded}
  onToggle={() => setExpanded(!expanded)}
  collapseOnSelect
  expand="lg"
  bg="light"
  variant="light"
  fixed="top"
  className="custom-navbar"
>
  <Container fluid className="d-flex align-items-center">
    <div className="d-flex align-items-center me-4">
      <Navbar.Brand as={Link} to="/" onClick={handleClose}>
        Variedades JM
      </Navbar.Brand>
      {isAuthenticated && name && (
        <span className="user-name">Hola, {name}!</span>
      )}
    </div>

    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/" onClick={handleClose}>Inicio</Nav.Link>

        {isAuthenticated && role === 'admin' && (
          <>
            <Nav.Link as={Link} to="/products" onClick={handleClose}>Productos</Nav.Link>
            <Nav.Link as={Link} to="/uploadimage" onClick={handleClose}>Nuevas Imágenes</Nav.Link>
            <Nav.Link as={Link} to="/uploadjson" onClick={handleClose}>Nuevos JSON</Nav.Link>
            <Nav.Link as={Link} to="/listproducts" onClick={handleClose}>Listar Productos</Nav.Link>
            <Nav.Link as={Link} to="/verproductos" onClick={handleClose}>Backend</Nav.Link>
          </>
        )}

        {isAuthenticated && ['admin','vendedor'].includes(role) && (
          <Nav.Link as={Link} to="/products" onClick={handleClose}>Productos</Nav.Link>          
        )}

        <Nav.Link as={Link} to="/offers" onClick={handleClose}>Ofertas</Nav.Link>
        <Nav.Link as={Link} to="/new" onClick={handleClose}>Nuevos</Nav.Link>

        {!isAuthenticated ? (
          <Nav.Link as={Link} to="/login" onClick={handleClose}>Login</Nav.Link>
        ) : (
          <Nav.Link onClick={() => { handleLogout(); handleClose(); }}>
            Cerrar sesión
          </Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};

export default NavBar;
