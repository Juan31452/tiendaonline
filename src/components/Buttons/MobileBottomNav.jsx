// components/MobileBottomNav.jsx
import {myicons} from '../../constants/myicons'; // Importa los iconos desde el archivo de constantes
import '../../style/mobile-nav.css'; // estilos para la navegación móvil

const MobileBottomNav = () => {
  return (
    <nav className="mobile-bottom-nav">
      <a href="/" className="nav-item">
        <img src={myicons.HOME}  alt="Home" />
        <span>Home</span>
      </a>
      <a href="/new" className="nav-item">
        <img src={myicons.NEWS} alt="Usuario" />
        <span>Nuevo</span>
      </a>
      <a href="/offers" className="nav-item">
        <img src={myicons.OFFERS} alt="Oferta" />
        <span>Oferta</span>
      </a>
      <a href="/login" className="nav-item">
        <img src={myicons.USERS} alt="Usuarios" />
        <span>Usuario</span>
      </a>
    </nav>
  );
};

export default MobileBottomNav;
