// components/MobileBottomNav.jsx
import { useContext } from 'react'; // 👈 1. Importa useContext
import { NavLink } from 'react-router-dom'; // Importa NavLink
import { AuthContext } from '../Context/AuthContext.jsx'; // 👈 2. Importa tu AuthContext
import {myicons} from '../../constants/myicons'; // Importa los iconos desde el archivo de constantes
import '../../style/mobile-nav.css'; // estilos para la navegación móvil

const MobileBottomNav = ({ onNewClick, onHomeClick,onOfferClick, onProfileClick }) => { // 1. Recibimos las funciones como props
  const { isAuthenticated, name, role } = useContext(AuthContext); // 👈 3. Obtiene los datos del contexto

  return (
    <nav className="mobile-bottom-nav">
      <button type="button" onClick={onHomeClick} className="nav-item">
        <img src={myicons.HOME}  alt="Home" />
        <span>Home</span>
      </button>

      <button type="button" onClick={onNewClick} className="nav-item"> {/* 2. Usamos un botón que llama a la función */}
        <img src={myicons.NEWS} alt="Nuevo" />
        <span>Nuevo</span>
      </button>

      <button type="button" onClick={onOfferClick} className="nav-item"> {/* 3. Botón para ofertas */}
        <img src={myicons.OFFERS} alt="Oferta" />
        <span>Oferta</span>
      </button>
              
      {/* 4. Renderizado condicional */}
      {isAuthenticated ? (
        // Si hay un agrega , muestra su nombre y rol
        <button type="button" onClick={onProfileClick} className="nav-item">
          <img src={myicons.USERS} alt="Usuario" />
          <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>{name} ({role})</span>
        </button>
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
