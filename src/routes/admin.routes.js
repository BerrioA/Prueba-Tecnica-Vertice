import { Router } from "express";
import { registerAdmin } from "../controllers/index.js";
import { validateAdminRegister } from "../middlewares/index.js";

const router = Router();

/**
 * @swagger
 * /api/ptvertice/v1/private/register-admin:
 *   post:
 *     summary: Registrar primer administrador del sistema
 *     tags: [Autenticación]
 *     description: Este endpoint permite registrar un único usuario con rol Administrador. Solo puede ser utilizado si aún no existe un administrador registrado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - last_name
 *               - document_number
 *               - cellphone
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alejandro
 *               last_name:
 *                 type: string
 *                 example: Berrío
 *               document_number:
 *                 type: string
 *                 example: "1007543678"
 *               cellphone:
 *                 type: string
 *                 example: "3001234567"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@admin.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Admin1234
 *     responses:
 *       201:
 *         description: Administrador registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Administrador registrado correctamente.
 *       403:
 *         description: Ya existe un administrador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Esta ruta ya no está disponible.
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Se ha presentado un error al intentar hacer el registro del administrador.
 */

router.post("/register-admin", validateAdminRegister, registerAdmin);

export default router;
