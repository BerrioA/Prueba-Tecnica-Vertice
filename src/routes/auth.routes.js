import express from "express";
import {
  validateUserRegister,
  loginValidation,
  requireRefreshToken,
} from "../middlewares/index.js";
import { registerUser, login, refreshToken } from "../controllers/index.js";

const app = express();

app.post("/register", validateUserRegister, registerUser);
app.post("/login", loginValidation, login);
app.get("/refreshToken", requireRefreshToken, refreshToken);

export default app;
