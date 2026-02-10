/**
 * Interfaz que representa la estructura de un producto tal como se recibe de la API.
 */
export interface Product {
  _id: string;
  IdProducto: string;
  Descripcion: string;
  Imagen: string;
  Precio?: number; // Es opcional porque solo admins/vendedores lo ven.
  Estado?: string | null;
  Categoria?: string | null;
  vendedor?: string; // El ID del vendedor.
  Cantidad?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Interfaz para la información de paginación devuelta por la API.
 */
export interface PaginationInfo {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface Estadistica {
  Categoria: string;
  estados: { [key: string]: number };
}
