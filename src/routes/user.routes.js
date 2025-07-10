import { Router } from "express";
import { profile } from "../controllers/index.js";
import { requireToken } from "../middlewares/index.js";

const router = Router();

router.get("/me", requireToken, profile);

export default router;
