// src/components/Types.tsx
export type CategoryId =
  | 'Hombre'
  | 'Mujer'
  | 'Ninos'
  | 'Tecnologia'
  | 'Hogar'
  | 'Variedades'
  | 'todos';

export type Product = {
  IdProducto: string;
  Descripcion: string;
  Precio: number;
  Imagen?: string;
  Estado?: string;
  Categoria: CategoryId;
};
