🛒 Tienda Online MERN

Este proyecto es una tienda online creada con el stack MERN (MongoDB, Express, React, Node.js), enfocada inicialmente en el frontend con datos mockeados y progresivamente migrada a una arquitectura completa con backend y autenticación.

✨ Características

Vista de productos por categoría.

Estadísticas de stock agrupadas por estado.

Filtro dinámico por categoría y búsqueda.

Modal de edición de productos.

Gestión visual con animaciones y diseño responsive.


🚧 Fases del Proyecto

Frontend con datos estáticos:

Estructura inicial con React + Vite.

Mock de productos (JSON local).


Conexión con Backend:

CRUD de productos con Node.js y MongoDB.

API REST para obtener productos reales.

Migración completa:

Migrar datos y lógica a servidor propio.

Control de estados y stock desde backend.

Usuarios y Autenticación (JWT):

Registro e inicio de sesión con tokens.

Gestión de usuarios, roles y permisos.


🧱 Estructura del Proyecto

ItemdaOnline/
├── dist/                         # Carpeta de construcción (output de producción)
├── node_modules/                 # Dependencias instaladas
├── public/                       # Assets públicos
│   ├── assets/                   # Recursos estáticos (imágenes, fuentes, etc.)
│   ├── icons/                    # Íconos de la aplicación
│   │   ├── react.svg             # Ícono de React
│   │   ├── vite.svg              # Ícono de Vite
│   └── _redirects                # Configuración de redirecciones (para despliegue)
│
├── src/                          # Código fuente principal
│   ├── api/                      # Llamadas a APIs (servicios)
│   ├── components/               # Componentes reutilizables
│   ├── config/                   # Configuraciones globales
│   ├── constants/                # Constantes de la aplicación
│   ├── data/                     # Datos estáticos/mocks
│   ├── hooks/                    # Custom Hooks de React
│   ├── models/                   # Modelos de datos/TypeScript
│   ├── pages/                    # Componentes de páginas/rutas
│   ├── style/                    # Estilos globales/theming
│   ├── types/                    # Tipos globales de TypeScript
│   ├── utils/                    # Funciones utilitarias
│   ├── App.css                   # Estilos principales
│   ├── App.tsx                   # Componente raíz de React
│   ├── index.css                 # Estilos globales
│   └── main.tsx                  # Punto de entrada de la aplicación
│
├── backend/                      # Juan31452/BackendTienda
│
├── .gitignore                    # Archivos ignorados por Git
├── eslint.config.js              # Configuración de ESLint
├── index.html                    # Plantilla HTML principal
├── package-lock.json             # Versiones exactas de dependencias
├── package.json                  # Configuración del proyecto y dependencias
├── README.md                     # Documentación del proyecto
├── tsconfig.json                 # Configuración de TypeScript
└── vite.config.js                # Configuración de Vite

🚀 Scripts Disponibles

npm run dev       # Inicia el servidor de desarrollo
npm run build     # Compila para producción
npm run preview   # Sirve el build generado

📦 Dependencias principales

React + TypeScript

Vite

Bootstrap / CSS personalizado

MongoDB (planeado)

Express / Node.js (en backend)

💡 Por hacer



📬 Autor

Desarrollado por Juan Carlos Salazar🚀

