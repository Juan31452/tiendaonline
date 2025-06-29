
import Rutas from '../config/Rutas';

const { APIHOSTRemote, APIHOSTLocal } = Rutas; // Extrae APIHOSTRemote fuera del objeto ApiRoutes

const ApiRoutes = {
  
   NewsProductsRemote: `${APIHOSTRemote}/api/productos/crear-multiples`,
   listproductsRemote: `${APIHOSTRemote}/api/productos`,
   NewsProductsLocal: `${APIHOSTLocal}/api/productos/crear-multiples`,
   listproductsLocal: `${APIHOSTLocal}/api/productos`,
   BuscarporId : `${APIHOSTRemote}/api/productos`,

   // Puedes agregar más rutas según las necesidades de tu aplicación
};
 

export default ApiRoutes;