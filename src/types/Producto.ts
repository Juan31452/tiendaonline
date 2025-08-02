// src/types/Producto.ts

import type { CategoryId, EstadoProducto } from './Categoria';

export type Product = {
  IdProducto: string;
  Descripcion: string;
  Precio: number;
  Imagen?: string;
  Estado?: EstadoProducto;
  Categoria: CategoryId;
};
