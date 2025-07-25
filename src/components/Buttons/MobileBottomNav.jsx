// components/MobileBottomNav.jsx
// import homeoutline from '../../../public/assets/icons/home-outline.svg';
// import useroutline from '../../../public/assets/icons/star-outline.svg';
// import offersonline from '../../../public/assets/icons/thumbs-up-outline.svg';

import '../../style/mobile-nav.css'; // estilos para la navegación móvil

const MobileBottomNav = () => {
  return (
    <nav className="mobile-bottom-nav">
      <a href="/" className="nav-item">
        <img src="/assets/icons/home-outline.svg" alt="Home" />
        <span>Home</span>
      </a>
      <a href="/new" className="nav-item">
        <img src="/assets/icons/star-outline.svg" alt="Usuario" />
        <span>Nuevo</span>
      </a>
      <a href="/offers" className="nav-item">
        <img src="/assets/icons/thumbs-up-outline.svg" alt="Oferta" />
        <span>Oferta</span>
      </a>
    </nav>
  );
};

export default MobileBottomNav;
