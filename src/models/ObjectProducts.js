export class ObjectProducts {
    constructor(rawProduct) {
        // Asignación directa de propiedades
        this.id = rawProduct.IdProducto;
        this.nombre = rawProduct.Descripcion;
        this.imagen = rawProduct.Imagen;
        this.talla = rawProduct.Talla;
        this.precio = rawProduct.Precio;
        this.categoria = rawProduct.Categoria;
        this.estado = rawProduct.Estado;
    }
  }