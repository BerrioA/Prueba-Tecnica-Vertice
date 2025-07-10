import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUser,
} from "../controllers/index.js";
import {
  requireToken,
  validateOrderCreate,
  verifyAdmin,
  verifyClient,
} from "../middlewares/index.js";

const router = Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear una orden con múltiples productos
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_id
 *                     - quantity
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       format: uuid
 *                       example: "5e34371b-3406-4564-bc3c-78449b5aa527"
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       example: 2
 *     responses:
 *       201:
 *         description: Orden creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Orden creada correctamente.
 *                 order_id:
 *                   type: string
 *                   format: uuid
 *       400:
 *         description: La lista de productos es inválida o está vacía
 *       500:
 *         description: Error interno del servidor
 */

router.post("/", requireToken, verifyClient, validateOrderCreate, createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtener historial de órdenes del usuario autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   order_id:
 *                     type: string
 *                     format: uuid
 *                   total:
 *                     type: number
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         product_name:
 *                           type: string
 *                         unit_price:
 *                           type: number
 *                         quantity:
 *                           type: integer
 *                         subtotal:
 *                           type: number
 *       401:
 *         description: Token no válido o no enviado
 *       500:
 *         description: Error al obtener historial de órdenes
 */

router.get("/", requireToken, verifyClient, getOrdersByUser);
/**
 * @swagger
 * /orders/allusers:
 *   get:
 *     summary: Obtener todas las órdenes del sistema (solo para administradores)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las órdenes del sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   order_id:
 *                     type: string
 *                     format: uuid
 *                   user_name:
 *                     type: string
 *                   user_lastname:
 *                     type: string
 *                   total:
 *                     type: number
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         product_name:
 *                           type: string
 *                         unit_price:
 *                           type: number
 *                         quantity:
 *                           type: integer
 *                         subtotal:
 *                           type: number
 *       403:
 *         description: Acceso denegado (no administrador)
 *       500:
 *         description: Error interno del servidor
 */

router.get("/allusers", requireToken, verifyAdmin, getAllOrders);

export default router;
