// src/utils/normalizeProduct.ts
import { Product } from '../types/Producto';
import { EstadoProducto } from '../types/Categoria';

// Capitaliza la primera letra y pone el resto en minúsculas
function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

const estadosValidos: EstadoProducto[] = ['Disponible', 'Vendido', 'Separado', 'Oferta'];

export function parseEstado(estado: string): EstadoProducto | undefined {
  const estadoCap = capitalize(estado);
  if (estadosValidos.includes(estadoCap as EstadoProducto)) {
    return estadoCap as EstadoProducto;
  }
  return undefined;
}

export function normalizeProducts(rawProducts: any[]): Product[] {
  return rawProducts.map(p => ({
    ...p,
    Estado: p.Estado ? parseEstado(p.Estado) : undefined,
  }));
}
