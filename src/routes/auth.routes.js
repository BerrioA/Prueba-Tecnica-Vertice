import { Router } from "express";
import {
  validateUserRegister,
  loginValidation,
  requireRefreshToken,
  validateExistingUser,
} from "../middlewares/index.js";
import {
  registerUser,
  login,
  refreshToken,
  logout,
} from "../controllers/index.js";

const router = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario (como cliente)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 required:
 *                   - name
 *                   - last_name
 *                   - document_number
 *                   - cellphone
 *                   - email
 *                   - password
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Juan
 *                   last_name:
 *                     type: string
 *                     example: Pérez
 *                   document_number:
 *                     type: string
 *                     example: 123456789
 *                   cellphone:
 *                     type: string
 *                     example: 3001234567
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: juan@example.com
 *                   password:
 *                     type: string
 *                     format: password
 *                     example: Test1234
 *               address:
 *                 type: object
 *                 required:
 *                   - address
 *                   - city
 *                   - state
 *                   - zip_code
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: Calle 123
 *                   city:
 *                     type: string
 *                     example: Bogotá
 *                   state:
 *                     type: string
 *                     example: Cundinamarca
 *                   zip_code:
 *                     type: string
 *                     example: 110111
 *                   is_default:
 *                     type: boolean
 *                     example: true
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario registrado correctamente.
 *       400:
 *         description: Error de validación de campos
 *       500:
 *         description: Error interno del servidor
 */

router.post(
  "/register",
  validateUserRegister,
  validateExistingUser,
  registerUser
);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión y retorna un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Test1234
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR...
 *                 expiresIn:
 *                   type: integer
 *                   example: 900
 *       403:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 */

router.post("/login", loginValidation, login);
/**
 * @swagger
 * /auth/refreshToken:
 *   get:
 *     summary: Genera un nuevo token de acceso a partir del refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token renovado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 expiresIn:
 *                   type: integer
 *       401:
 *         description: Refresh token inválido o expirado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/refreshToken", requireRefreshToken, refreshToken);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cierra sesión eliminando el refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cleared:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sesión cerrada correctamente.
 *       500:
 *         description: Error interno del servidor
 */

router.post("/logout", logout);

export default router;
