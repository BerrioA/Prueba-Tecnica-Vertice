import express from "express";
import { createOrder, getOrdersByUser } from "../controllers/index.js";
import { requireToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/", requireToken, createOrder);
router.get("/", requireToken, getOrdersByUser);

export default router;
