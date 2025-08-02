
import { CategoryId, EstadoProducto } from '@/types';
import { Product } from '@/types/Producto';

function agruparPorCategoria(productos: Product[]) {
  const resultado: {
    [categoria in CategoryId]?: Record<EstadoProducto, number>;
  } = {};

  productos.forEach((p) => {
    const categoria = p.Categoria as CategoryId;
    const estado = p.Estado as EstadoProducto;

    if (!categoria || !(categoria in resultado || categoria in CategoryIdMap)) {
      console.warn("Producto sin categoría válida:", p);
      return; // ❌ Salta si no hay categoría válida
    }

    if (!resultado[categoria]) {
      resultado[categoria] = {
        Disponible: 0,
        Vendido: 0,
        Separado: 0,
        Oferta: 0,
      };
    }

    if (estado in resultado[categoria]!) {
      resultado[categoria]![estado]++;
    }
  });

  return resultado;
}

const CategoryIdMap = {
  Hombre: true,
  Mujer: true,
  Ninos: true,
  Tecnologia: true,
  Hogar: true,
  Variedades: true,
  todos: true,
};
export default agruparPorCategoria;
// Asegúrate de que CategoryIdMap contenga todas las categorías válidas
// y que coincida con las definidas en tu enum o tipo CategoryId.