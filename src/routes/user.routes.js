import { Router } from "express";
import { profile } from "../controllers/index.js";
import { requireToken } from "../middlewares/index.js";

const router = Router();

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Obtener los datos del usuario autenticado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                   format: uuid
 *                   example: "bfa61741-73aa-4d95-86c8-b36a89f2f8c0"
 *                 name:
 *                   type: string
 *                   example: Alejandro
 *                 last_name:
 *                   type: string
 *                   example: Berrío
 *                 document_number:
 *                   type: string
 *                   example: "1007543678"
 *                 cellphone:
 *                   type: string
 *                   example: "3001234567"
 *                 email:
 *                   type: string
 *                   example: "alejandro@correo.com"
 *                 role:
 *                   type: string
 *                   example: Usuario
 *                 address:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     address:
 *                       type: string
 *                       example: "Cra 14 # 20-25"
 *                     city:
 *                       type: string
 *                       example: "Sincelejo"
 *                     state:
 *                       type: string
 *                       example: "Sucre"
 *                     zip_code:
 *                       type: string
 *                       example: "700001"
 *                     is_default:
 *                       type: boolean
 *                       example: true
 *       401:
 *         description: No autorizado – Token faltante o inválido
 *       500:
 *         description: Error interno del servidor
 */

router.get("/me", requireToken, profile);

export default router;
