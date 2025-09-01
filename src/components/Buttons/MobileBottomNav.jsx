// components/MobileBottomNav.jsx
import { NavLink } from 'react-router-dom'; // Importa NavLink
import {myicons} from '../../constants/myicons'; // Importa los iconos desde el archivo de constantes
import '../../style/mobile-nav.css'; // estilos para la navegación móvil

const MobileBottomNav = () => {
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
      
      <NavLink to="/login" className="nav-item">
        <img src={myicons.USERS} alt="Usuarios" />
        <span>Usuario</span>
      </NavLink>
    </nav>
  );
};

export default MobileBottomNav;
