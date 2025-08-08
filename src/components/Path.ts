// src/config/Path.ts

export const ROUTES = {
  PRIVATE: {
    PRODUCTS: '/products',
    UPLOAD_IMAGE: '/uploadimage',
    UPLOAD_JSON: '/uploadjson',
    LIST_PRODUCTS: '/listproducts',
    BACKEND: '/verproductos',
  },
  PUBLIC: {
    USER: '/user',
    NEW: '/new',
    OFFERS: '/offers',
  },
  ROOT: '/',
} as const;
