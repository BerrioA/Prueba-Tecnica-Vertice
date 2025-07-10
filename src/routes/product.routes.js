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

router.post(
  "/",
  requireToken,
  verifyAdmin,
  validateProductRegister,
  registerProduct
);
router.get("/", getAllProducts);
router.get("/:productId", validateProductId, getProductById);

export default router;
