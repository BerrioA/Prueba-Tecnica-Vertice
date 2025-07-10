# 📦 Prueba Técnica - VÉRTICE

Este proyecto es una API RESTful desarrollada con Node.js, Express y Sequelize para gestionar un sistema de autenticación de usuarios, productos y órdenes de compra.

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- JWT (Json Web Tokens)
- Helmet, CORS, Cookie-parser
- Express Validator

## 📁 Estructura del Proyecto

```
src/
├── config/                # Configuraciones de la base de datos
│   └── db.js
├── controllers/           # Controladores de cada módulo
├── middlewares/           # Middlewares (autenticación, validaciones, roles)
├── models/                # Modelos de datos con Sequelize
├── routes/                # Rutas agrupadas por dominio
├── services/              # Lógica de negocio separada
├── utils/                 # Utilidades como manejo de tokens
├── app.js                 # Configuración principal de la app
└── index.js               # Punto de entrada del servidor
```

## 📦 Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/prueba-tecnica-vertice.git
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz siguiendo el ejemplo `.env.example`:

```env
PORT=3000
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_NAME=vertice_db
DB_PORT=5432

JWT_SECRET=tu_clave_secreta
JWT_REFRESH=tu_clave_refresh
NODE_ENV=development
```

4. Corre las migraciones o sincroniza los modelos según tu estrategia.

5. Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

---

## 🧪 Endpoints Implementados

### 🔐 Autenticación
| Método | Ruta                 | Descripción                     |
|--------|----------------------|---------------------------------|
| POST   | `/auth/register`     | Registro de usuario             |
| POST   | `/auth/login`        | Inicio de sesión                |
| GET    | `/auth/refreshToken` | Generación de nuevo token       |
| GET    | `/me`                | Perfil del usuario autenticado  |

### 📦 Productos
| Método | Ruta                | Descripción                      |
|--------|---------------------|----------------------------------|
| GET    | `/products`         | Listado de todos los productos   |
| GET    | `/products/:id`     | Detalle de un producto           |
| POST   | `/products`         | Registro de producto (admin)     |

### 🧾 Órdenes
| Método | Ruta         | Descripción                              |
|--------|--------------|------------------------------------------|
| POST   | `/orders`    | Crear una orden con múltiples productos |
| GET    | `/orders`    | Historial de órdenes del usuario         |

---

## 🧠 Consideraciones

- Autenticación por JWT con expiración y refresh.
- Middleware de roles y validaciones.
- Los precios de órdenes se obtienen automáticamente del producto.
- Se usan transacciones para mayor integridad en órdenes.

---

## 📄 Extras

- Separación clara de responsabilidades (controllers, services, middlewares).
- Preparado para extensión con Docker, Postman o despliegue.

---

## 👨‍💻 Autor

- Alejandro L. Berrío O.