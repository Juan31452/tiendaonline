import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar 
      collapseOnSelect 
      expand="lg" 
      bg="light" 
      variant="light"
      fixed="top" // Esta propiedad hace que el navbar se fije en la parte superior
      style={{  zIndex: 1030,boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} // Opcional: añade sombra para mejor visibilidad
    >
      <Container>
        <Navbar.Brand as={Link} to="/">TiendaOnline</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" eventKey="1">Home</Nav.Link>
            <Nav.Link as={Link} to="/products" eventKey="2">Products</Nav.Link>
            <Nav.Link as={Link} to="/new" eventKey="3">New</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;