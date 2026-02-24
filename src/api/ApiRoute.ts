import Rutas from '../config/Rutas.json';

const { APIHOSTRemote, APIHOSTLocal } = Rutas;

const ApiRoutes = {
  NewsProductsRemote: `${APIHOSTRemote}/api/productos/crear-multiples`,
  listproductsRemote: `${APIHOSTRemote}/api/productos`,
  NewsProductsLocal: `${APIHOSTLocal}/api/productos/crear-multiples`,
  listproductsLocal: `${APIHOSTLocal}/api/productos`,
  BuscarporId: `${APIHOSTRemote}/api/productos`,
  EditarProducto: `${APIHOSTRemote}/api/productos`,
  ConsultaCategoria: `${APIHOSTRemote}/api/productos`,
  EstadisticasProductos: `${APIHOSTRemote}/api/productos/estadisticas`,
  Login: `${APIHOSTRemote}/api/users/login`,
  BusquedaPersonalizada: `${APIHOSTRemote}/api/productos/`,
  // Puedes agregar más rutas según las necesidades de tu aplicación
};

export default ApiRoutes;
