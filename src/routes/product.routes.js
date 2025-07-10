import express from "express";
import {
  getAllProducts,
  getProductById,
  registerProduct,
} from "../controllers/index.js";
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
app.get("/", getAllProducts);
app.get("/:productId", getProductById);

export default app;
