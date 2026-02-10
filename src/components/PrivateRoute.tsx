import React, { useContext, FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol del usuario no está en la lista de roles permitidos (o si no tiene rol),
  // lo redirigimos a la página de inicio para evitar errores de tipo.
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
