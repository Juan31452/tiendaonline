// src/utils/agruparPorCategoria.ts
import { EstadisticaProducto, EstadisticasPorCategoria } from '@/types/Estadisticas';
import { CategoryId, EstadoProducto } from '@/types/Categoria';

const categoriasValidas: CategoryId[] = [
  'Hombre',
  'Mujer',
  'Ninos',
  'Tecnologia',
  'Hogar',
  'Variedades',
  'todos',
];

const estadosValidos: EstadoProducto[] = ['Disponible', 'Vendido', 'Separado', 'Oferta'];

const agruparPorCategoria = (
  datos: EstadisticaProducto[]
): EstadisticasPorCategoria[] => {
  return datos
    .filter(({ Categoria }) => categoriasValidas.includes(Categoria as CategoryId))
    .map(({ Categoria, estados }) => {
      const estadosFiltrados: Partial<Record<EstadoProducto, number>> = {};

      for (const [estado, cantidad] of Object.entries(estados)) {
        if (estadosValidos.includes(estado as EstadoProducto)) {
          estadosFiltrados[estado as EstadoProducto] = cantidad;
        }
      }

      return {
        Categoria: Categoria as CategoryId,
        estados: estadosFiltrados,
      };
    });
};

export default agruparPorCategoria;
