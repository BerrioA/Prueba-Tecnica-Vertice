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

router.post("/", requireToken, verifyClient, validateOrderCreate, createOrder);
router.get("/", requireToken, verifyClient, getOrdersByUser);
router.get("/allusers", requireToken, verifyAdmin, getAllOrders);

export default router;
