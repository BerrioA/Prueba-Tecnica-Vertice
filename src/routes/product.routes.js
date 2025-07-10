import express from "express";
import { registerProduct } from "../controllers/index.js";
import { requireToken, verifyAdmin } from "../middlewares/index.js";

const app = express();

app.post("/", requireToken, verifyAdmin, registerProduct);

export default app;
