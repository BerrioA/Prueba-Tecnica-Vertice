import {
  registerUser,
  login,
  refreshToken,
  logout,
} from "./auth.controller.js";
import { registerProduct } from "./product.controller.js";
import { profile } from "./user.controller.js";

export { registerUser, login, refreshToken, profile, registerProduct, logout };
