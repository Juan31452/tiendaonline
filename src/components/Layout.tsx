import React, { useContext, useState, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/Context/AuthContext';
import '../style/navBar.css';

const Layout: FC = () => {
  const { isAuthenticated, name, role, logout } = useContext(AuthContext); // Asumiendo que AuthContext provee un valor tipado
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleClose = () => setExpanded(false);
  const handleToggle = () => setExpanded(!expanded);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-brand-group">
          <Link to="/" className="navbar-brand" onClick={handleClose}>
            Variedades JM
          </Link>
          {isAuthenticated && name && (
            <span className="navbar-user-greeting">Hi, {name}!</span>
          )}
        </div>

        <button
          className={`navbar-toggler ${expanded ? 'active' : ''}`}
          type="button"
          onClick={handleToggle}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-links-container ${expanded ? 'show' : ''}`}>
          <div className="navbar-links">
            <Link to="/" className="nav-link" onClick={handleClose}>Inicio</Link>

            {isAuthenticated && role === 'admin' && (
              <>
                <Link to="/uploadimage" className="nav-link" onClick={handleClose}>Nuevas Imágenes</Link>
                <Link to="/uploadjson" className="nav-link" onClick={handleClose}>Nuevos JSON</Link>
                <Link to="/listproducts" className="nav-link" onClick={handleClose}>Listar Productos</Link>
                {/*<Link to="/products" className="nav-link" onClick={handleClose}>Productos</Link>*/}
                { /*
                <Link to="/offers" className="nav-link" onClick={handleClose}>Ofertas</Link> */}
              </>
            )}

            {/*
            {isAuthenticated && ['admin', 'vendedor'].includes(role) && (
              <Link to="/verproductos" className="nav-link" onClick={handleClose}>Productos</Link>
            )}
            */}

            
            
            {/* <Link to="/new" className="nav-link" onClick={handleClose}>Nuevos</Link>
            <Link to="/verproductos" className="nav-link" onClick={handleClose}>Productos</Link> */}

            {!isAuthenticated ? (
              <Link to="/login" className="nav-link" onClick={handleClose}>Login</Link>
              
            ) : (
              <button className="nav-link-button" onClick={handleLogout}>
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Layout;
