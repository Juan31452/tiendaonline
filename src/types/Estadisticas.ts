// src/types/Estadisticas.ts


import { CategoryId, EstadoProducto } from './';

export interface EstadisticaProducto {
  categoria: CategoryId;
  estado: EstadoProducto;
  cantidad: number;
}

export interface EstadisticasPorCategoria {
  Categoria: CategoryId;
  estados: {
    [estado in EstadoProducto]?: number;
  };
}