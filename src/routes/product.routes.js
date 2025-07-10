import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  registerProduct,
} from "../controllers/index.js";
import {
  requireToken,
  validateProductId,
  validateProductRegister,
  verifyAdmin,
} from "../middlewares/index.js";

const router = Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Registrar un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: Cafetera Italiana Clásica
 *               description:
 *                 type: string
 *                 example: Cafetera de aluminio para preparar espresso en casa
 *               price:
 *                 type: number
 *                 example: 89.99
 *               stock:
 *                 type: integer
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: Electrodomésticos
 *     responses:
 *       201:
 *         description: Producto registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto registrado correctamente.
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

router.post(
  "/",
  requireToken,
  verifyAdmin,
  validateProductRegister,
  registerProduct
);
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos (solo información básica)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                   stock:
 *                     type: integer
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID con detalles completos
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del producto a consultar
 *     responses:
 *       200:
 *         description: Detalles del producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 category:
 *                   type: string
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:productId", validateProductId, getProductById);

export default router;
