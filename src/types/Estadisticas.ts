// src/types/Estadisticas.ts


import { CategoryId, EstadoProducto } from './';

export interface EstadisticaProducto {
  Categoria: string;
  estados: Record<string, number>
}

export interface EstadisticasPorCategoria {
  Categoria: CategoryId;
  estados: Partial<Record<EstadoProducto, number>>;
};
