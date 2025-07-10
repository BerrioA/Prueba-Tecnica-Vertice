# 📦 Prueba Técnica - VÉRTICE

Bienvenido a la prueba técnica de desarrollo backend para **VÉRTICE**.  
Esta API RESTful permite registrar usuarios, autenticar sesiones, gestionar productos y crear órdenes de compra.  
Ha sido construida con **Node.js**, **Express** y **PostgreSQL** siguiendo una arquitectura modular y escalable.

---

## 🚀 Tecnologías utilizadas

- **Node.js** (v22+)
- **Express.js**
- **Sequelize (ORM)**
- **PostgreSQL**
- **JWT (JSON Web Tokens)**
- **Swagger** (Documentación API)
- **Express-Validator**
- **Helmet**, **CORS**, **Cookie-Parser**
- **Docker** y **Docker Compose**

---

## 📁 Estructura del Proyecto

```
src/
├── config/                # Configuración DB
├── controllers/           # Controladores por módulo
├── middlewares/           # Middlewares: auth, roles, validaciones
├── models/                # Modelos de datos (Sequelize)
├── routes/                # Rutas por dominio
├── services/              # Lógica de negocio separada
├── utils/                 # Manejo de tokens
├── docs/                  # Configuración Swagger
├── app.js                 # App principal Express
└── index.js               # Punto de entrada del servidor
```

---

## ⚙️ Requisitos Previos

- Node.js v22+
- PostgreSQL (local o Docker)
- Postman o navegador (para probar API)
- Docker (opcional)

---

## 🛠️ Instalación Manual (sin Docker)

1. **Clona el repositorio**

```bash
git clone https://github.com/BerrioA/Prueba-Tecnica-Vertice
cd Prueba-Tecnica-Vertice
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Crea el archivo `.env` en la raíz**

```env
PORT=3000
DB_NAME=vertice_db
DB_USER=admin
DB_PASSWORD=admin123
HOST=localhost
DB_DIALECT=postgres
JWT_SECRET=clave_secreta
JWT_REFRESH=clave_refresh
SECRET_ENCRIPT=otra_clave
NODE_ENV=developer
```

4. **Ejecuta el servidor**

```bash
npm run dev
```

---

## 🚢 Dockerización

También puedes levantar el proyecto completo con **Docker + PostgreSQL** en segundos.

### 📂 Archivos incluidos

- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

### ▶️ Pasos para ejecutar con Docker

1. **Crear `.env` en la raíz (importante):**

```env
PORT=3000
DB_NAME=vertice_db
DB_USER=admin
DB_PASSWORD=admin123
HOST=db
DB_DIALECT=postgres
JWT_SECRET=clave_secreta
JWT_REFRESH=clave_refresh
SECRET_ENCRIPT=otra_clave
NODE_ENV=production
```

> ⚠️ Usa `HOST=db` ya que así se llama el servicio en Docker.

2. **Construir y ejecutar los contenedores**

```bash
docker-compose up --build
```

3. **Verifica en el navegador o Postman**

- API base: [http://localhost:3000](http://localhost:3000)
- Swagger docs: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

4. **Detener contenedores**

```bash
docker-compose down
```

---

## 🧪 Endpoints Implementados

### 🔐 Autenticación

| Método | Ruta                           | Descripción                              |
|--------|--------------------------------|------------------------------------------|
| POST   | `/auth/register`               | Registro de nuevo usuario (cliente)      |
| POST   | `/auth/login`                  | Inicio de sesión                         |
| GET    | `/auth/refreshToken`           | Renovación del token de acceso           |
| GET    | `/auth/logout`                 | Cierre de sesión                         |
| POST   | `/auth/private/register-admin` | Registro único del primer administrador  |

### 👤 Usuario

| Método | Ruta       | Descripción                   |
|--------|------------|-------------------------------|
| GET    | `/user/me` | Perfil del usuario autenticado|

### 📦 Productos

| Método | Ruta            | Descripción                     |
|--------|-----------------|---------------------------------|
| GET    | `/products`     | Lista básica de productos       |
| GET    | `/products/:id` | Detalle completo de un producto |
| POST   | `/products`     | Crear producto (solo admin)     |

### 🧾 Órdenes

| Método | Ruta               | Descripción                              |
|--------|--------------------|------------------------------------------|
| POST   | `/orders`          | Crear orden con múltiples productos      |
| GET    | `/orders`          | Ver historial de órdenes del usuario     |
| GET    | `/orders/allusers` | Ver todas las órdenes (solo admin)       |

---

## 📄 Documentación con Swagger

Disponible automáticamente al correr la API:

```
http://localhost:3000/api-docs
```

Incluye:

- Schemas de entrada/salida
- Parámetros validados
- Payloads de ejemplo
- Códigos de respuesta

---

## 📌 Consideraciones Técnicas

- Autenticación JWT con expiración y refresh token
- Validación de entrada con Express-Validator
- Protección de rutas por rol (`Admin`, `Cliente`)
- Transacciones para crear órdenes
- Lógica desacoplada (servicios, controladores, middlewares)

---

## 📦 Despliegue en Render (opcional)

La API puede desplegarse en [Render](https://render.com) configurando:

- **Start Command:** `npm start`
- **Docker Deploy:** activado
- Variables de entorno desde `.env`

---

## 👨‍💻 Autor

**Alejandro L. Berrío O.**  
Backend Developer – Prueba técnica VÉRTICE 2025

- 🌐 [GitHub](https://github.com/BerrioA)
- 💼 [LinkedIn](https://www.linkedin.com/in/alejandroberrio/)
- 📧 ingalejandroberrio@gmail.com
- 📱 300 430 1256
