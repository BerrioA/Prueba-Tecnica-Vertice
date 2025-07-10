import express from "express";
import {
  validateUserRegister,
  loginValidation,
  requireRefreshToken,
} from "../middlewares/index.js";
import {
  registerUser,
  login,
  refreshToken,
  logout,
} from "../controllers/index.js";

const app = express();

app.post("/register", validateUserRegister, registerUser);
app.post("/login", loginValidation, login);
app.get("/refreshToken", requireRefreshToken, refreshToken);
app.post("/logout", logout);

export default app;
