import {
  registerUser,
  login,
  refreshToken,
  logout,
} from "./auth.controller.js";
import {
  getAllProducts,
  getProductById,
  registerProduct,
} from "./product.controller.js";
import { profile } from "./user.controller.js";
import { createOrder, getOrdersByUser } from "./order.controller.js";

export {
  registerUser,
  login,
  refreshToken,
  logout,
  profile,
  registerProduct,
  getAllProducts,
  getProductById,
  createOrder,
  getOrdersByUser,
};
