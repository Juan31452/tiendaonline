// components/MobileBottomNav.tsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import '../../style/mobile-nav.css';

// --- Iconos ---
// El problema de que los iconos no carguen se debe casi siempre a que la ruta o el nombre del archivo aquí no coincide
// con el archivo real en la carpeta `public`.

// PASO 1: Abre tu navegador, ve a la página y abre las "Herramientas de desarrollador" (F12 o clic derecho -> Inspeccionar).
// PASO 2: Ve a la pestaña "Consola" o "Red (Network)". Verás errores 404 (Not Found) para los iconos.
//          La URL que falla te dirá la ruta exacta que está buscando el navegador.
// PASO 3: Corrige las rutas o nombres de archivo a continuación para que coincidan con tus archivos reales.

const ICONS_BASE_PATH = '/assets/icons/'; // <- Asegúrate que esta carpeta exista en `public`

const myicons = {
  HOME: `${ICONS_BASE_PATH}home-solid.svg`,      // <- ¿Es .png o .svg? ¿Se llama 'home' o 'home-icon'?
  NEWS: `${ICONS_BASE_PATH}thumbs-up-outline.svg`,      // <- Revisa el nombre y la extensión.
  OFFERS: `${ICONS_BASE_PATH}star-outline.svg`,    // <- Revisa el nombre y la extensión.
  USERS: `${ICONS_BASE_PATH}user-solid.svg`,       // <- Revisa el nombre y la extensión.
};

// 1. Define los posibles filtros que este componente puede manejar.
// Esto hace que el código sea más seguro y fácil de entender.
export type NavFilter = 'home' | 'new' | 'offer';

interface MobileBottomNavProps {
  activeFilter: NavFilter;
  onFilterChange: (filter: NavFilter) => void;
  onProfileClick?: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeFilter,
  onFilterChange,
  onProfileClick,
}) => {
  const { isAuthenticated, name, role } = useContext(AuthContext);

  // 2. Helper para crear botones de filtro y evitar repetición.
  // También se encarga de aplicar la clase 'active' al botón correspondiente.
  const renderFilterButton = (
    filter: NavFilter,
    icon: string,
    label: string
  ) => {
    const isActive = activeFilter === filter;
    return (
      <button
        type="button"
        onClick={() => onFilterChange(filter)}
        className={`nav-item ${isActive ? 'active' : ''}`} // 3. Se añade la clase 'active' si el filtro coincide
        aria-pressed={isActive}
      >
        <img src={icon} alt={label} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <nav className="mobile-bottom-nav">
      {renderFilterButton('home', myicons.HOME, 'Home')}
      {renderFilterButton('new', myicons.NEWS, 'Nuevo')}
      {renderFilterButton('offer', myicons.OFFERS, 'Oferta')}

      {isAuthenticated ? (
        <button type="button" onClick={onProfileClick} className="nav-item">
          <img src={myicons.USERS} alt="Usuario" />
          <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
            {name} ({role})
          </span>
        </button>
      ) : (
        <NavLink to="/login" className="nav-item">
          <img src={myicons.USERS} alt="Login" />
          <span>Usuario</span>
        </NavLink>
      )}
    </nav>
  );
};

export default MobileBottomNav;
