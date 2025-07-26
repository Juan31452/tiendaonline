// src/config/Path.ts

export const ROUTES = {
  PRIVATE: {
    PRODUCTS: '/products',
    NEW: '/new',
    UPLOAD_IMAGE: '/uploadimage',
    UPLOAD_JSON: '/uploadjson',
    LIST_PRODUCTS: '/listproducts',
    BACKEND: '/verproductos',
  },
  PUBLIC: {
    USER: '/user',
    OFFERS: '/offers',
  },
  ROOT: '/',
} as const;
