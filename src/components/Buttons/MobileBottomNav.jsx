// components/MobileBottomNav.jsx
import { Home, User } from 'lucide-react'; // o cualquier icono que uses

const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center h-14 md:hidden z-50">
      <a href="/home" className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-600">
        <Home className="w-5 h-5" />
        <span>Home</span>
      </a>
      <a href="/usuario" className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-600">
        <User className="w-5 h-5" />
        <span>Usuario</span>
      </a>
    </nav>
  );
};

export default MobileBottomNav;
