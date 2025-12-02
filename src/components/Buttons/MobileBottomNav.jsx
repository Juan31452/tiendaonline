// components/MobileBottomNav.jsx
import { useContext } from 'react'; // 👈 1. Importa useContext
import { NavLink } from 'react-router-dom'; // Importa NavLink
import { AuthContext } from '../Context/AuthContext.jsx'; // 👈 2. Importa tu AuthContext
import {myicons} from '../../constants/myicons'; // Importa los iconos desde el archivo de constantes
import '../../style/mobile-nav.css'; // estilos para la navegación móvil

const MobileBottomNav = ({ onNewClick }) => { // 1. Recibimos la función como prop
  const { isAuthenticated, name, role } = useContext(AuthContext); // 👈 3. Obtiene los datos del contexto

  return (
    <nav className="mobile-bottom-nav">
      <NavLink to="/" className="nav-item" end> {/* 'end' asegura que solo esté activo en la ruta exacta "/" */}
        <img src={myicons.HOME}  alt="Home" />
        <span>Home</span>
      </NavLink>

      <button type="button" onClick={onNewClick} className="nav-item"> {/* 2. Usamos un botón que llama a la función */}
        <img src={myicons.NEWS} alt="Nuevo" />
        <span>Nuevo</span>
      </button>
      
      {/*  
      <a href="/verproductos" className="nav-item">
        <img src={myicons.OFFERS} alt="Productos" />
        <span>Lista</span> 
      </a> */}
      
      {/* 4. Renderizado condicional */}
      {isAuthenticated ? (
        // Si hay un agrega , muestra su nombre y rol
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
