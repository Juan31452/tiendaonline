// src/components/Types.tsx
export type CategoryId =
  | 'Hombre'
  | 'Mujer'
  | 'Ninos'
  | 'Tecnologia'
  | 'Hogar'
  | 'Variedades'
  | 'todos';

export type EstadoProducto = 
  | 'Disponible' 
  | 'Vendido' 
  | 'Separado' 
  | 'Oferta';

export type Product = {
  IdProducto: string;
  Descripcion: string;
  Precio: number;
  Cantidad: number;
  Imagen?: string;
  Estado?: string;
  Categoria: CategoryId;
};
