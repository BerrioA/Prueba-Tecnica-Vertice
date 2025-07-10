import { Router } from "express";
import {
  validateUserRegister,
  loginValidation,
  requireRefreshToken,
  validateExistingUser,
} from "../middlewares/index.js";
import {
  registerUser,
  login,
  refreshToken,
  logout,
} from "../controllers/index.js";

const router = Router();

router.post(
  "/register",
  validateUserRegister,
  validateExistingUser,
  registerUser
);
router.post("/login", loginValidation, login);
router.get("/refreshToken", requireRefreshToken, refreshToken);
router.post("/logout", logout);

export default router;
