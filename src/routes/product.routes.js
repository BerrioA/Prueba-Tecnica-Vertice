import express from "express";
import { registerProduct } from "../controllers/index.js";
import {
  requireToken,
  validateProductRegister,
  verifyAdmin,
} from "../middlewares/index.js";

const app = express();

app.post(
  "/",
  requireToken,
  verifyAdmin,
  validateProductRegister,
  registerProduct
);

export default app;
