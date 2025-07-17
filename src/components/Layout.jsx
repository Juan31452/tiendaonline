import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WhatsAppFloatingButton from './Buttons/WhatsAppFloatingButton';


const NavBar = () => {
  const isLocalhost = window.location.hostname === 'localhost';

  return (
    <>
      <Navbar 
        collapseOnSelect 
        expand="lg" 
        bg="light" 
        variant="light"
        fixed="top"
        style={{ zIndex: 1030, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">Variedades JM</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" eventKey="1">Inicio</Nav.Link>
              {isLocalhost && (
                <>
                  <Nav.Link as={Link} to="/products" eventKey="4">Productos</Nav.Link>
                  <Nav.Link as={Link} to="/uploadimage" eventKey="5">Nuevas Imagens</Nav.Link>
                  <Nav.Link as={Link} to="/uploadjson" eventKey="6">Nuevos JSON</Nav.Link>
                  <Nav.Link as={Link} to="/listproducts" eventKey="7">Listar Productos</Nav.Link>
                  <Nav.Link as={Link} to="/verproductos" eventKey="8">Backend</Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to="/offers" eventKey="2">Ofertas</Nav.Link>
              <Nav.Link as={Link} to="/new" eventKey="3">Nuevos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
    </>
  );
};

export default NavBar;