
import Rutas from '../config/Rutas';

const { APIHOSTRemote, APIHOSTLocal } = Rutas; // Extrae APIHOSTRemote fuera del objeto ApiRoutes

const ApiRoutes = {
  
   listproductsRemote: `${APIHOSTRemote}/api/productos/crear-multiples`,
   listproductsLocal: `${APIHOSTLocal}/api/productos/crear-multiples`,

   // Puedes agregar más rutas según las necesidades de tu aplicación
};
 

export default ApiRoutes;