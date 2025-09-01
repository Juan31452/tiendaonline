# 🛍️ Tienda Online MERN

Este proyecto es una aplicación completa de comercio electrónico construida con el stack **MERN (MongoDB, Express, React, Node.js)**. La aplicación cuenta con un frontend moderno y reactivo y un backend robusto que gestiona productos, usuarios y autenticación.

## Fases del Proyecto

*   **Fase 1 (Completada):** Se construyó el frontend inicial con React, utilizando datos estáticos desde archivos JSON para simular la API.
*   **Fase 2 (En progreso):** Implementación del backend con Node.js, Express y MongoDB. Se ha creado la API para el CRUD de productos y se está migrando el frontend para consumir esta API.
*   **Fase 3 (En progreso):** Creación del sistema de usuarios y seguridad. Se ha implementado la autenticación basada en **JSON Web Tokens (JWT)**, incluyendo registro, login y manejo de expiración de tokens.

## 🚀 Funcionalidades Clave

- **Gestión de Productos:** Listado de productos con filtros dinámicos (categoría, estado) y paginación.
- **Búsqueda y Edición:** Búsqueda de productos por ID y edición a través de un modal interactivo.
- **Autenticación Segura:** Sistema de login y registro de usuarios utilizando JWT.
- **Manejo de Sesión:** Detección automática de tokens expirados con redirección al login.
- **Roles de Usuario:** Lógica para diferenciar las vistas y permisos entre `admin`, `vendedor` e invitados.
- **Estadísticas de Inventario:** Visualización de métricas relevantes sobre los productos.
- **Diseño Responsivo:** Interfaz adaptable a dispositivos móviles y de escritorio.

## 🏗️ Estructura del Proyecto

```
/
├── backend/                 # Código del servidor Node.js
│   ├── controllers/         # Lógica de negocio (controladores)
│   ├── middleware/          # Middlewares (ej. auth.js para JWT)
│   ├── models/              # Modelos de datos de Mongoose
│   └── routes/              # Definición de las rutas de la API
└── src/                     # Código del cliente React
    ├── api/                 # Configuración centralizada de Axios
    ├── components/          # Componentes de UI reutilizables
    ├── constants/           # Constantes de la aplicación (rutas, estados)
    ├── hooks/               # Hooks personalizados (useProductFilters, etc.)
    ├── pages/               # Componentes de página (vistas)
    └── utils/               # Funciones de utilidad
```

## ✨ Arquitectura y Componentes Destacados

La arquitectura del frontend se basa en la **composición de componentes y la extracción de lógica a hooks personalizados** para mantener el código limpio y escalable.

- **`apiAxios.js`**: Instancia centralizada de Axios que utiliza **interceptores** para:
  - Adjuntar automáticamente el token de autenticación a todas las peticiones protegidas.
  - Capturar globalmente las respuestas `401 Unauthorized` del backend, limpiar la sesión y redirigir al login.
- **`useProductFilters`**: Hook personalizado que encapsula toda la lógica de estado para los filtros de productos (categoría, estado) y la paginación.
- **`useConsultas`**: Hook encargado de realizar las peticiones a la API para obtener los productos, utilizando `apiAxios`.
- **`ProductListView.jsx`**: Actúa como un **componente orquestador**, utilizando los hooks para manejar la lógica y pasando los datos a los componentes de presentación.
- **Componentes de Presentación**: `ProductCard`, `ModalDetalles`, `PaginationControls`, etc., son componentes "tontos" que solo se encargan de renderizar la UI.

### Backend

El backend está desarrollado con Node.js, Express y MongoDB. Expone una API RESTful para gestionar productos y proximamente usuarios.

- **Rutas:** `routes/productos.js` y `routes/usuarios.js` definen los endpoints de la API.
- **Modelos:** `models/Producto.js` y `models/Usuario.js` definen los esquemas de datos con Mongoose.
- **Controladores:** La carpeta `controllers/` contiene la lógica de negocio para cada ruta.
- **Seguridad:** El middleware `middleware/auth.js` protege las rutas verificando la validez de los tokens JWT en cada petición.

## 🛠️ Cómo Ejecutar el Proyecto

### Prerrequisitos
- Node.js
- MongoDB (una instancia local o una URI de MongoDB Atlas)

### Backend
1.  Navega a la carpeta `backend`: `cd backend`
2.  Instala las dependencias: `npm install`
3.  Crea un archivo `.env` en la raíz de `backend/` y añade tus variables de entorno (ej. `MONGO_URI`, `JWT_SECRET`).
4.  Inicia el servidor de desarrollo: `npm run dev`

### Frontend
1.  En una nueva terminal, navega a la raíz del proyecto.
2.  Instala las dependencias: `npm install`
3.  Inicia la aplicación de React: `npm run dev`

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

---

**Autor:** [Juan Carlos Salazar]  
**Licencia:** MIT