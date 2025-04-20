// ProductsUtils.js
import { ObjectProducts } from '../models/ObjectProducts.js';

// productsUtils.js
export function convertirAObjetoUnificado(productos11, productos12, productos13) {
    // Combinar todos los productos en un array
    const todosProductos = [...productos11, ...productos12, ...productos13];
    
    // Crear un objeto donde las claves son los IDs de producto
    const objetoProductos = todosProductos.reduce((acumulador, producto) => {
      // Verificar que el producto tenga ID
      if (producto?.IdProducto) {
        acumulador[producto.IdProducto] = {
          ...producto,
          // Puedes añadir transformaciones aquí si es necesario
          precioNumerico: parseFloat(producto.Precio) || 0,
          disponible: producto.Cantidad > 0
        };
      }
      return acumulador;
    }, {});
  
    return objetoProductos;
  }
  
  // Función alternativa que también elimina duplicados
  export function crearObjetoProductosUnico(productos11, productos12, productos13) {
    const objetoFinal = {};
    const todosProductos = [...productos11, ...productos12, ...productos13];
    
    todosProductos.forEach(producto => {
      if (producto?.IdProducto && !objetoFinal[producto.IdProducto]) {
        objetoFinal[producto.IdProducto] = producto;
      }
    });
    
    return objetoFinal;
  }