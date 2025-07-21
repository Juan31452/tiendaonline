# Tienda Online MERN

Este proyecto es una tienda online construida con React (frontend) y Node.js/MongoDB (backend). Permite listar, buscar, editar y ver detalles de productos.

Primera Fase : se construyo solo el Front , donde los datos vienen de un archivo json, esta fase actualmente sigue vigente , pero los componentes mas adelante seran obsoletos.

Segunda Fase : aqui se esta implementado el backend tambien en una fase temprana , donde esta creada para ingreso ,edicion y visualizacion de productos, se sigue actualizando componentes.

Tercera fase : Se crearan usuarios en Backend y seguridad con token

## Estructura principal

- **src/components/**: Componentes reutilizables (botones, tablas, modales, etc).
- **src/pages/**: Vistas principales de la aplicación.
- **src/utils/**: Utilidades y componentes auxiliares.
- **src/hooks/**: Hooks personalizados para lógica de negocio.

## Funcionalidades

- **Listado de productos** con paginación.
- **Búsqueda** por ID de producto.
- **Estadísticas de producto** para visualizar métricas relevantes.
- **Visualización de detalles** de producto en un modal.
- **Botón de WhatsApp** para contacto rápido.
- **Paginación** con controles de navegación.

## Componentes destacados
### Backend

El backend está desarrollado con Node.js, Express y MongoDB. Expone una API RESTful para gestionar productos y proximamente usuarios.

- `routes/productos.js`: Rutas para operaciones CRUD de productos.
- `routes/usuarios.js`: Rutas para registro y autenticación de usuarios.
- `models/Producto.js`: Modelo Mongoose para productos.
- `models/Usuario.js`: Modelo Mongoose para usuarios.
- `middleware/auth.js`: Middleware para autenticación con JWT.
- `controllers/`: Lógica de negocio para productos y usuarios.

Incluye validación de datos, manejo de errores y proximamente autenticación basada en tokens JWT.
- `ProductosTable`: Muestra los productos en una tabla con botones de editar y ver.
- `EditProductModal`: Modal para editar productos.
- `ModalDetalles`: Modal para ver detalles de un producto.
- `PaginationControls`: Navegación entre páginas.
- `EditButton`: Botón reutilizable para acciones.

## Cómo ejecutar

1. Clona el repositorio.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia la app:
   ```bash
   npm start
   ```

## Personalización

Puedes modificar los componentes en `src/components` y las vistas en `src/pages` para adaptar la tienda a tus necesidades.

---

**Autor:** [Juan Carlos Salazar]  
**Licencia:** MIT