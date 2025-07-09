import express from "express";
import { profile } from "../controllers/index.js";
import { requireToken } from "../middlewares/index.js";

const app = express();

app.get("/me", requireToken, profile);

export default app;
