// components/MobileBottomNav.tsx
import React from 'react';
import { myicons } from '../../constants/myicons';
import '../../style/mobile-nav.css';

const MobileBottomNav: React.FC = () => {
  return (
    <nav className="mobile-bottom-nav">
      <a href="/" className="nav-item">
        <img src={myicons.HOME} alt="Home" />
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
    </nav>
  );
};

export default MobileBottomNav;

