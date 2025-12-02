// components/MobileBottomNav.jsx
import { useContext } from 'react'; // 👈 1. Importa useContext
import { NavLink } from 'react-router-dom'; // Importa NavLink
import { AuthContext } from '../Context/AuthContext.jsx'; // 👈 2. Importa tu AuthContext
import {myicons} from '../../constants/myicons'; // Importa los iconos desde el archivo de constantes
import '../../style/mobile-nav.css'; // estilos para la navegación móvil

const MobileBottomNav = () => {
  const { isAuthenticated, name, role } = useContext(AuthContext); // 👈 3. Obtiene los datos del contexto

  return (
    <nav className="mobile-bottom-nav">
      <NavLink to="/" className="nav-item">
        <img src={myicons.HOME}  alt="Home" />
        <span>Home</span>
      </NavLink>
       {/*  
      <a href="/new" className="nav-item">
        <img src={myicons.NEWS} alt="Usuario" />
        <span>Nuevo</span>
      </a>*/}
      {/*
      <a href="/verproductos" className="nav-item">
        <img src={myicons.OFFERS} alt="Productos" />
        <span>Lista</span> 
      </a> */}
      
      {/* 4. Renderizado condicional */}
      {isAuthenticated ? (
        // Si hay un usuario, muestra su nombre y rol
        <div className="nav-item">
          <img src={myicons.USERS} alt="Usuario" />
          <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>{name} ({role})</span>
        </div>
      ) : (
        // Si no hay usuario, muestra el enlace de Login
        <NavLink to="/login" className="nav-item">
          <img src={myicons.USERS} alt="Login" />
          <span>Usuario</span>
        </NavLink>
      )}
    </nav>
  );
};

export default MobileBottomNav;
