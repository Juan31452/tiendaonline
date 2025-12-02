// components/MobileBottomNav.jsx
import { NavLink } from 'react-router-dom'; // Importa NavLink
import { useAuth } from '../../hooks/useAuth'; // 👈 1. Importa el hook de autenticación
import {myicons} from '../../constants/myicons'; // Importa los iconos desde el archivo de constantes
import '../../style/mobile-nav.css'; // estilos para la navegación móvil

const MobileBottomNav = () => {
  const { user } = useAuth(); // 👈 2. Obtiene el usuario del contexto de autenticación

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
      
      {/* 3. Renderizado condicional */}
      {user ? (
        // Si hay un usuario, muestra su nombre y rol
        <div className="nav-item">
          <img src={myicons.USERS} alt="Usuario" />
          <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>{user.nombre} ({user.rol})</span>
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
