# 📦 Prueba Técnica - VÉRTICE

Bienvenido a la prueba técnica de desarrollo backend para VÉRTICE. Esta API RESTful permite registrar usuarios, autenticar sesiones, gestionar productos y crear órdenes de compra. Ha sido construida con Node.js, Express y Sequelize.

---

## 🚀 Tecnologías utilizadas

- **Node.js** (v22+)
- **Express.js**
- **Sequelize ORM**
- **PostgreSQL**
- **JWT (JSON Web Tokens)**
- **Express-Validator**
- **Helmet**, **CORS**, **Cookie-Parser**
- **Swagger** (Documentación interactiva)

---

## 📁 Estructura del Proyecto

```
src/
├── config/                # Configuraciones (DB)
├── controllers/           # Lógica de controladores por dominio
├── middlewares/           # Middlewares: auth, roles, validaciones
├── models/                # Modelos Sequelize
├── routes/                # Rutas agrupadas por recursos
├── services/              # Lógica de negocio por módulo
├── utils/                 # Tokens
├── docs/                  # Documentación Swagger
├── app.js                 # Configuración de app
└── index.js               # Inicio del servidor
```

---

## ⚙️ Requisitos Previos

- Node.js instalado (`v22+`)
- PostgreSQL en ejecución
- Cliente como Postman o Swagger UI

---

## 📦 Instalación y Ejecución

1. **Clona el repositorio**

```bash
git clone https://github.com/BerrioA/Prueba-Tecnica-Vertice.git
cd prueba-tecnica-vertice
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Crea tu archivo `.env`**

```env
PORT=3000
DB_NAME=nombre_de_tu_base_de_datos
DB_USER=usuario_postgres
DB_PASSWORD=tu_contraseña
HOST=localhost
DB_DIALECT=postgres
JWT_SECRET=clave_secreta_para_jwt
JWT_REFRESH=clave_refresh_jwt
SECRET_ENCRIPT=clave_para_hashear
NODE_ENV=developer

```

4. **Ejecuta la app**

```bash
npm run dev
```

5. **Base de datos**
   La base de datos se sincroniza automáticamente al iniciar la app. Asegúrate de que exista `vertice_db` en PostgreSQL.

---

## 🧪 Endpoints Implementados

### 🔐 Autenticación

| Método | Ruta                           | Descripción                              |
| ------ | ------------------------------ | ---------------------------------------- |
| POST   | `/auth/register`               | Registro de nuevo usuario (cliente)      |
| POST   | `/auth/login`                  | Inicio de sesión                         |
| GET    | `/auth/refreshToken`           | Renovación del token de acceso           |
| GET    | `/auth/logout`                 | Cierre de sesión                         |
| POST   | `/auth/private/register-admin` | Registro del primer admin (una sola vez) |

### 👤 Usuario

| Método | Ruta       | Descripción                   |
| ------ | ---------- | ----------------------------- |
| GET    | `/user/me` | Datos del usuario autenticado |

### 📦 Productos

| Método | Ruta            | Descripción                     |
| ------ | --------------- | ------------------------------- |
| GET    | `/products`     | Lista básica de productos       |
| GET    | `/products/:id` | Detalle completo de un producto |
| POST   | `/products`     | Registrar producto (solo admin) |

### 🧾 Órdenes

| Método | Ruta               | Descripción                         |
| ------ | ------------------ | ----------------------------------- |
| POST   | `/orders`          | Crear orden con múltiples productos |
| GET    | `/orders`          | Historial del usuario autenticado   |
| GET    | `/orders/allusers` | Ver todas las órdenes (solo admin)  |

---

## 🧠 Consideraciones Técnicas

- Autenticación vía JWT con expiración (`15min`) y refresh token (`15h`).
- Middleware de validación y protección de rutas (`requireToken`).
- Roles diferenciados (`Admin`, `Cliente`) protegidos con middlewares.
- Transacciones en la creación de órdenes para mantener integridad.
- Se evita pasar el precio manualmente; se toma desde el producto.
- Separación estricta por capas: **controller**, **service**, **model**.

---

## 📄 Documentación con Swagger

La documentación Swagger está disponible en:

```
GET /api-docs
```

Incluye:

- Schemas de entrada/salida
- Parámetros validados
- Ejemplos de payloads
- Mensajes de error

---

## 🧪 Testing (opcional)

La configuración para testing está lista (aunque no se incluyen tests):

```bash
npm test
```

---

## 📬 Postman (opcional)

También se incluye una colección Postman para facilitar las pruebas:

- `PT_TIENDAVERTICE.postman_collection.json`

---

## 🧠 Recomendaciones para el Evaluador

- Para registrar el primer administrador usar `/auth/register-admin` (una sola vez).
- Luego, registrar usuarios normales con `/auth/register`.
- Las rutas de productos y órdenes están protegidas según el rol.
- Revisar los middlewares `requireToken`, `verifyAdmin`, `verifyClient`.

---

## 👨‍💻 Autor

**Alejandro L. Berrío O.**  
Backend Developer – Prueba técnica VÉRTICE 2025  
[GitHub](https://github.com/BerrioA/Prueba-Tecnica-Vertice)
