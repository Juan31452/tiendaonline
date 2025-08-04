// src/types/Producto.ts

import type { CategoryId, EstadoProducto } from './Categoria';

export type Product = {
  IdProducto: string;
  Descripcion: string;
  Talla: string;
  Cantidad: number;
  Precio: number;
  Imagen?: string;
  Estado?: EstadoProducto;
  Categoria: CategoryId;
};
