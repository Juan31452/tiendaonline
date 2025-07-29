// src/utils/filterUtils.ts
import type { CategoryId, Product } from '../components/Types';

export function applyFilter(categoryId: CategoryId, allProducts: Product[]): Product[] {
  const filterByKeywords = (keywords: string[]) =>
    allProducts.filter((product) => {
      const cat = product.Categoria?.toLowerCase() || '';
      const desc = product.Descripcion?.toLowerCase() || '';
      return keywords.some((kw) => cat.includes(kw) || desc.includes(kw));
    });

  switch (categoryId) {
    case 'Hombre':
      return filterByKeywords(['hombre', 'masculino', 'caballero']);
    case 'Mujer':
      return filterByKeywords(['mujer', 'femenino', 'dama']);
    case 'Ninos':
      return filterByKeywords(['niño', 'nino', 'niña', 'nina', 'infantil']);
    case 'Tecnologia':
      return filterByKeywords(['tecnolog', 'electron', 'digital', 'smart']);
    case 'Variedades':
      return filterByKeywords(['variedad', 'otros', 'general']);
    case 'Hogar':
      return filterByKeywords(['hogar', 'casa', 'cocina', 'muebles']);
    case 'todos':
    default:
      return allProducts;
  }
}
